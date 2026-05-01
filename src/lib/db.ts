import mongoose from "mongoose";
import dns from "node:dns";

// Force Google/Cloudflare public DNS for SRV lookups
dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);
dns.setDefaultResultOrder("ipv4first");

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local",
  );
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000; // doubles each retry

function isConnected(): boolean {
  return (
    cached.conn !== null && mongoose.connection.readyState === 1 // 1 = connected
  );
}

async function connectWithRetry(): Promise<typeof mongoose> {
  const opts: mongoose.ConnectOptions = {
    bufferCommands: false,
    serverSelectionTimeoutMS: 10000, // fail fast if server unreachable
    socketTimeoutMS: 45000,
    heartbeatFrequencyMS: 15000, // detect dead connections sooner
    family: 4, // force IPv4 — avoids IPv6 DNS resolution failures
    retryWrites: true,
    retryReads: true,
  };

  let lastError: unknown;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const conn = await mongoose.connect(MONGODB_URI!, opts);
      return conn;
    } catch (err: any) {
      lastError = err;
      const isDnsError =
        err?.code === "ECONNREFUSED" ||
        err?.code === "ENOTFOUND" ||
        err?.code === "ETIMEOUT" ||
        err?.syscall === "querySrv";

      if (isDnsError && attempt < MAX_RETRIES) {
        const delay = RETRY_DELAY_MS * Math.pow(2, attempt - 1);
        console.warn(
          `[db] MongoDB DNS/connection error (attempt ${attempt}/${MAX_RETRIES}), retrying in ${delay}ms...`,
          err.code || err.syscall,
        );
        await new Promise((r) => setTimeout(r, delay));
      } else {
        throw err;
      }
    }
  }

  throw lastError;
}

async function dbConnect() {
  // Return existing healthy connection
  if (isConnected()) {
    return cached.conn;
  }

  // Clear stale connection state
  if (cached.conn && mongoose.connection.readyState !== 1) {
    console.warn("[db] Stale connection detected, reconnecting...");
    cached.conn = null;
    cached.promise = null;
    try {
      await mongoose.disconnect();
    } catch {
      // ignore disconnect errors
    }
  }

  if (!cached.promise) {
    cached.promise = connectWithRetry();
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    cached.conn = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;

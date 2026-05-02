import { NextRequest } from "next/server";
import crypto from "node:crypto";
import AnalyticsVisit from "@/models/AnalyticsVisit";
import dbConnect from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";
import { jsonNoStore, tooManyRequests } from "@/lib/http";
import { rateLimitRequest } from "@/lib/ratelimit";

const VISITOR_COOKIE = "portfolio_visitor_id";
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

type AnalyticsBody = {
  path?: string;
  referrer?: string;
};

function cleanPath(path: unknown): string {
  if (typeof path !== "string" || !path.startsWith("/")) return "/";
  return path.slice(0, 200);
}

function cleanText(value: unknown, maxLength = 500): string {
  if (typeof value !== "string") return "";
  return value.slice(0, maxLength);
}

function startOfToday() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

export async function POST(req: NextRequest) {
  try {
    const limit = await rateLimitRequest(req, {
      keyPrefix: "analytics:post",
      limit: 120,
      windowMs: 60_000,
    });
    if (!limit.ok) return tooManyRequests(limit.retryAfterSeconds);

    const body = (await req.json().catch(() => ({}))) as AnalyticsBody;
    const path = cleanPath(body.path);

    if (path.startsWith("/admin") || path.startsWith("/api")) {
      return jsonNoStore({ tracked: false });
    }

    await dbConnect();

    const existingVisitorId = req.cookies.get(VISITOR_COOKIE)?.value;
    const visitorId = existingVisitorId || crypto.randomUUID();

    await AnalyticsVisit.create({
      visitorId,
      path,
      referrer: cleanText(body.referrer),
      userAgent: cleanText(req.headers.get("user-agent") || "", 300),
    });

    const res = jsonNoStore({ tracked: true });
    if (!existingVisitorId) {
      res.cookies.set(VISITOR_COOKIE, visitorId, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: ONE_YEAR_SECONDS,
      });
    }

    return res;
  } catch (error) {
    console.error("Analytics POST error:", error);
    return jsonNoStore({ error: "Failed to track visit" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const authed = await isAuthenticated();
    if (!authed) {
      return jsonNoStore({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const today = startOfToday();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const [
      totalVisits,
      uniqueVisitors,
      todayVisits,
      todayUniqueVisitors,
      last7Days,
      popularPages,
    ] = await Promise.all([
      AnalyticsVisit.countDocuments(),
      AnalyticsVisit.distinct("visitorId").then((ids) => ids.length),
      AnalyticsVisit.countDocuments({ createdAt: { $gte: today } }),
      AnalyticsVisit.distinct("visitorId", { createdAt: { $gte: today } }).then(
        (ids) => ids.length,
      ),
      AnalyticsVisit.aggregate([
        { $match: { createdAt: { $gte: sevenDaysAgo } } },
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
            },
            visits: { $sum: 1 },
            uniqueVisitors: { $addToSet: "$visitorId" },
          },
        },
        { $sort: { _id: 1 } },
        {
          $project: {
            _id: 0,
            date: "$_id",
            visits: 1,
            uniqueVisitors: { $size: "$uniqueVisitors" },
          },
        },
      ]),
      AnalyticsVisit.aggregate([
        { $group: { _id: "$path", visits: { $sum: 1 } } },
        { $sort: { visits: -1 } },
        { $limit: 5 },
        { $project: { _id: 0, path: "$_id", visits: 1 } },
      ]),
    ]);

    return jsonNoStore({
      totalVisits,
      uniqueVisitors,
      todayVisits,
      todayUniqueVisitors,
      last7Days,
      popularPages,
    });
  } catch (error) {
    console.error("Analytics GET error:", error);
    return jsonNoStore({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}

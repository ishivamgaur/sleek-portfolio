import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ResumePage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-24 pb-12 min-h-screen flex flex-col">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Resume</h1>
        <p className="text-muted-foreground mt-2">My professional background and qualifications.</p>
      </div>

      <Card className="flex-1 min-h-[600px] flex flex-col overflow-hidden bg-muted/30 border-border/50">
        <CardContent className="flex-1 p-0 flex flex-col">
          {/* Replace this src with your Google Drive PDF preview link */}
          {/* e.g., https://drive.google.com/file/d/YOUR_FILE_ID/preview */}
          <iframe 
            src="" 
            className="w-full flex-1 border-0"
            title="Resume PDF"
            allow="autoplay"
          >
            <div className="flex items-center justify-center h-full p-8 text-center text-muted-foreground">
              <p>Please add your Google Drive preview link to the iframe src in <code>src/app/resume/page.tsx</code>.</p>
            </div>
          </iframe>
        </CardContent>
      </Card>
    </div>
  );
}

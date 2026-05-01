import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("shimmer rounded-md bg-muted/60 border border-muted/80", className)}
      {...props}
    />
  );
}

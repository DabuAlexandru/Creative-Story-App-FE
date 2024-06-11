import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonCommentComponent = () => {
  return (
    <div className="p-6 mb-4 bg-slate-800 rounded-lg shadow">
      <div className="mb-4">
        <div className="ml-4 text-slate-500 flex gap-2 items-center">
          <Skeleton className="size-[32px] rounded-full" />
          <Skeleton className="h-[20px] w-[100px]" />
        </div>
      </div>
      <div>
        <Skeleton className="h-[24px] w-full mb-4" />
        <div className="flex justify-between items-center">
          <Skeleton className="h-[20px] w-[200px]" />
        </div>
      </div>
    </div>
  );
};

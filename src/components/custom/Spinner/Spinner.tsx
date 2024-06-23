import { cn } from "@/lib/utils";

// component from: https://github.com/shadcn-ui/ui/discussions/1694#discussioncomment-7851248

export interface ISVGProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

const Spinner = ({
  size = 24,
  className,
  ...props
}: ISVGProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("animate-spin", className)}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
};

export const StyledSpinner = (props: ISVGProps) => {
  return <Spinner size={48} className="text-slate-500" {...props} />
}

export default Spinner
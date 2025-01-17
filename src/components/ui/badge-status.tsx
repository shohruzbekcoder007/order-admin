import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeStatusVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      variant: {
        completed: "bg-green-100 text-green-700",
        processing: "bg-purple-100 text-purple-700",
        rejected: "bg-red-100 text-red-700",
        declined: "bg-orange-100 text-orange-700",
      },
    },
    defaultVariants: {
      variant: "completed",
    },
  }
)

interface BadgeStatusProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeStatusVariants> {}

export function BadgeStatus({ className, variant, ...props }: BadgeStatusProps) {
  return (
    <span className={cn(badgeStatusVariants({ variant }), className)} {...props} />
  )
}
import { cn } from "lib/utils";
import * as React from "react";

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
	orientation?: "horizontal" | "vertical";
}

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
	({ className, orientation = "horizontal", ...props }, ref) => {
		return (
			<div
				ref={ref}
				role="separator"
				aria-orientation={orientation}
				className={cn(
					"bg-textSecondary/30 dark:bg-textSecondary",
					orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
					className,
				)}
				{...props}
			>&nbsp;</div>
		);
	},
);

Separator.displayName = "Separator";

export { Separator };

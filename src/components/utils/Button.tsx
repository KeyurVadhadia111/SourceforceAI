import { cn } from "lib/utils";
import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "default" | "outline" | "link" | "none";
	size?: "default" | "sm" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant = "default", size = "default", ...props }, ref) => {
		const baseClasses =
			"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm sm:text-base transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:!cursor-not-allowed disabled:opacity-50 cursor-pointer";

		const variantClasses = {
			default: "border border-primary bg-primary text-white hover:bg-primary/90",
			outline: "border border-border bg-transparent dark:text-textDark",
			link: "text-primary",
			none: "",
		};

		const sizeClasses = {
			default: "px-4 py-[11px] sm:py-[15px]",
			sm: "px-3 py-2 !rounded-lg",
			lg: "px-8 sm:py-[15px] py-[10px]",
		};

		return (
			<button
				type="button"
				className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
				ref={ref}
				{...props}
			/>
		);
	},
);
Button.displayName = "Button";

export { Button };

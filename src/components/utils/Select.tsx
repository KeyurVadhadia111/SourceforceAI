import { cn } from "lib/utils";
import * as React from "react";
import Icon from "./Icon";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
	error?: string;
	icon?: string;
	variant?: "default" | "secondary" | "transparentBorder";
	children: any;
	label?: string;
	required?: boolean;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
	({ className, error, icon, children, variant = "default", id = "select", label, required, ...props }, ref) => {
		// const methods = useFormContext();

		return (
			<div className="relative w-full">
				{label && (
					<label
						className="leading-[150%] text-text dark:text-textDark 
					 sm:mb-2 mb-1.5 block sm:text-base text-xs font-medium">
						{label}
						{required && <span className="text-error">*</span>}
					</label>
				)}
				<div className="relative w-full">
					{icon && (
						<div
							className={cn(
								"absolute left-2 z-1 sm:w-11 sm:h-11 w-9 h-9 transform top-1/2 -translate-y-1/2 rounded-[22px] flex items-center justify-center",
								variant === "default" && "bg-fgc dark:bg-fgcDark",
								variant === "secondary" && "bg-white dark:bg-fgcDark",
							)}>
							<Icon className="w-5 h-5 text-neutral-400" icon={icon} />
						</div>
					)}
					<select
						className={cn(
							"bg-none sm:h-[60px] h-[48px] gap-2.5 px-3 sm:px-6 py-[15px] rounded-[56px] flex items-center relative self-stretch w-full font-normal text-text sm:text-sm text-xs tracking-[0] leading-[150%] transition-colors placeholder:text-textSecondary dark:placeholder:text-textDark/50  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm border sm:py-[17px] dark:text-textDark custom-select",
							variant === "default" && "bg-white dark:bg-fgcDark border-transparent",
							variant === "secondary" && "bg-fgc dark:bg-fgcDark border-transparent",
							variant === "transparentBorder" &&
							"bg-transparent border border-border focus-visible:ring-primary",
							error
								? "!border !border-red-500 focus-visible:!ring-red-500"
								: "focus-visible:ring-neutral-300",
							className,
							icon && " indent-[50px] !pl-2",
						)}
						ref={ref}
						id={id}
						{...props}>
						{children}
					</select>

					<label
						htmlFor={id}
						className={cn(
							"absolute right-2 z-1 sm:w-11 sm:h-11 w-9 h-9 transform top-1/2 -translate-y-1/2 rounded-[22px] flex items-center justify-center",
							variant === "default" && "bg-fgc dark:bg-fgcDark  text-neutral-400",
							variant === "secondary" && "bg-white dark:bg-fgcDark text-black",
						)}>
						<Icon icon={"chevron-down"} className="h-6 w-6 cursor-pointer" />
					</label>
				</div>

				{error && (
					<span className="text-red-500 px-5 inline-block">
						{error && (
							<>
								<span>{error}</span>
							</>
						)}
						&nbsp;
					</span>
				)}
			</div>
		);
	},
);

export default Select;

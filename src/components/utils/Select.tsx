import { cn } from "lib/utils";
import * as React from "react";
import Icon from "./Icon";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
	error?: string;
	icon?: string;
	variant?: "default" | "secondary";
	children: any;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
	({ className, error, icon, children, variant = "default", id = "select", ...props }, ref) => {
		// const methods = useFormContext();

		return (
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
						"bg-none pr-0 sm:h-[60px] h-[48px] gap-2.5 pl-2 py-[15px] rounded-[56px] flex items-center relative self-stretch w-full font-normal text-text [font-family:'Satoshi-Regular',Helvetica] sm:text-sm text-xs tracking-[0] leading-[150%] transition-colors placeholder:text-textSecondary dark:placeholder:text-textDark/50  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm border border-transparent sm:py-[17px] dark:text-textDark custom-select",
						variant === "default" && "bg-white dark:bg-fgcDark",
						variant === "secondary" && "bg-fgc dark:bg-fgcDark",
						error
							? "!border !border-red-500 focus-visible:!ring-red-500"
							: "focus-visible:ring-neutral-300",
						className,
						icon && " indent-[50px]",
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

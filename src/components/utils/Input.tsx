import { cn } from "lib/utils";
import * as React from "react";
import Icon from "./Icon";
import { useAppState } from "./useAppState";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	error?: string;
	label?: string;
	required?: boolean;
	icon?: string;
	postIcon?: string;
	variant?: "default" | "secondary" | "transparentBorder" | "secondaryTransparentIcon";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	(
		{
			className,
			type = "text",
			error,
			icon,
			variant = "default",
			label,
			required,
			postIcon,
			disabled = false,
			...props
		},
		ref,
	) => {
		// const methods = useFormContext();
		const inputType = type || "";
		const [showPassword, setShowPassword] = React.useState(false);
		const [{ isDark }, setAppState] = useAppState();
		return (
			<div className="relative w-full">
				{label && (
					<label className="leading-[150%] text-text dark:text-textDark sm:mb-2 mb-1.5 block sm:text-base text-xs font-medium">
						{label}
						{required && <span className="text-error ml-1">*</span>}
					</label>
				)}
				<div className="relative w-full">
					{icon && (
						<div
							className={cn(
								"absolute left-2 z-1 sm:w-11 sm:h-11 w-8 h-8 transform top-1/2 -translate-y-1/2 rounded-[22px] flex items-center justify-center",
								variant === "default" && "bg-fgc dark:bg-fgcDarkcircle/20",
								variant === "secondary" && "bg-white dark:bg-fgcDarkcircle/20 dark:text-textDark",
								variant === "secondaryTransparentIcon" && "bg-transparent dark:bg-fgcDarkcircle/20",
								disabled && "bg-transparent",
							)}>
							<Icon className="sm:w-5 sm:h-5 w-4 h-4" icon={icon} />
						</div>
					)}
					<input
						type={inputType == "password" && showPassword ? "text" : inputType}
						className={cn(
							"sm:h-[60px] h-[48px] gap-2.5 px-3 sm:px-6 py-[15px] rounded-[56px] flex items-center relative self-stretch w-full text-text text-xs sm:text-sm tracking-[0] leading-[150%] transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text dark:placeholder:text-textDark/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 border sm:py-[17px] dark:text-textDark font-satoshi font-medium ",
							variant === "default" && "bg-white dark:bg-fgcDark border-transparent",
							variant === "secondary" && "bg-fgc dark:bg-fgcDark border-transparent",
							variant === "secondaryTransparentIcon" && "bg-fgc dark:bg-fgcDark border-transparent",
							variant === "transparentBorder" &&
							"bg-transparent border border-border dark:border-borderDark focus-visible:ring-primary",
							error
								? "!border !border-red-500 focus-visible:!ring-red-500"
								: "focus-visible:ring-neutral-300",
							inputType === "number" &&
							  "appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-inner-spin-button]:m-0 [-moz-appearance:textfield]",
							className,
							icon && "sm:pl-[61px] pl-[44px]",
						)}
						style={inputType === "number" ? { MozAppearance: 'textfield' } : {}}
						disabled={disabled}
						ref={ref}
						{...props}
					/>
					{inputType == "password" && (
						<div
							className={cn(
								"absolute right-[3px] top-[18px] sm:right-2 sm:top-5 z-1 w-9 h-9 sm:w-11 sm:h-11 mt-[-12.00px] mb-[-12.00px] bg-fgc rounded-[22px] flex items-center justify-center cursor-pointer",
								variant === "default" && "bg-fgc dark:bg-fgcDark",
								variant === "secondary" && "bg-white dark:bg-fgcDark",
								variant === "secondaryTransparentIcon" && "bg-transparent",
								disabled && "!bg-transparent",
							)}
							onClick={() => setShowPassword(!showPassword)}>
							<Icon
								icon={
									showPassword
										? isDark
											? "eye-dark"
											: "eye"
										: isDark
											? "eye-slash-dark"
											: "eye-slash"
								}
								className="sm:h-5 sm:w-5 h-4 w-4 cursor-pointer  text-neutral-400"
							/>
						</div>
					)}
					{postIcon && (
						<div
							className={cn(
								"absolute right-2 z-1 sm:w-11 sm:h-11 w-9 h-9 transform top-1/2 -translate-y-1/2 rounded-[22px] flex items-center justify-center",
								variant === "default" && "bg-fgc dark:bg-fgcDarkcircle/20",
								variant === "secondary" && "bg-white dark:bg-fgcDarkcircle/20",
								variant === "secondaryTransparentIcon" && "bg-transparent",
								disabled && "!bg-transparent",
							)}>
							<Icon className="sm:w-5 sm:h-5 w-4 h-4" icon={postIcon} />
						</div>
					)}
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

Input.displayName = "Input";

export { Input };

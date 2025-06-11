import { cn } from "lib/utils";
import * as React from "react";
import Icon from "./Icon";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	error?: string;
	icon?: string;
	variant?: "default" | "secondary";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type = "text", error, icon, variant = "default", ...props }, ref) => {
		// const methods = useFormContext();
		const inputType = type || "";
		const [showPassword, setShowPassword] = React.useState(false);

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
				<input
					type={inputType == "password" && showPassword ? "text" : inputType}
					className={cn(
						"sm:h-[60px] h-[48px] gap-2.5 pl-2 pr-6 py-[15px] rounded-[56px] flex items-center relative self-stretch w-full font-normal text-text [font-family:'Satoshi-Regular',Helvetica] text-sm tracking-[0] leading-[21px] transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text dark:placeholder:text-textDark/50  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm border border-transparent sm:py-[17px] px-5 dark:text-textDark",
						variant === "default" && "bg-white dark:bg-fgcDark",
						variant === "secondary" && "bg-fgc dark:bg-fgcDark",
						error
							? "!border !border-red-500 focus-visible:!ring-red-500"
							: "focus-visible:ring-neutral-300",
						className,
						icon && " pl-[62px]",
					)}
					ref={ref}
					{...props}
				/>
				{inputType == "password" && (
					<div
						className="absolute right-2 top-5 z-1 w-11 h-11 mt-[-12.00px] mb-[-12.00px] bg-fgc rounded-[22px] flex items-center justify-center cursor-pointer"
						onClick={() => setShowPassword(!showPassword)}>
						<Icon
							icon={showPassword ? "eye" : "eye-slash"}
							className="h-5 w-5 cursor-pointer  text-neutral-400"
						/>
					</div>
				)}
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

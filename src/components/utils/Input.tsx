import { cn } from "lib/utils";
import * as React from "react";
import Icon from "./Icon";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	error?: string;
	icon?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type = "text", error, icon, ...props }, ref) => {
	// const methods = useFormContext();
	const inputType = type || "";
	const [showPassword, setShowPassword] = React.useState(false);

	return (
		<div className="relative w-full">
			{icon && (
				<div className="absolute left-2 top-5 z-1 w-11 h-11 mt-[-12.00px] mb-[-12.00px] bg-fgc rounded-[22px] flex items-center justify-center">
					<Icon
						className="w-5 h-5 text-neutral-400"
						icon={icon}
					/>
				</div>
			)}
			<input
				type={inputType == "password" && showPassword ? "text" : inputType}
				className={cn(
					"h-[60px] gap-2.5 pl-2 pr-6 py-5 bg-white dark:bg-fgcDark rounded-[56px] flex items-center relative self-stretch w-full text-sm sm:text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-textSecondary dark:placeholder:text-textDark/50  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm border border-transparent sm:py-[17px] px-5 font-normal text-text dark:text-textDark",
					error ? "!border !border-red-500 focus-visible:!ring-red-500" : "focus-visible:ring-neutral-300",
					className,
					icon && ' pl-[62px]'
				)}
				ref={ref}
				{...props}
			/>
			{inputType == "password" && (
				<div className="absolute right-2 top-5 z-1 w-11 h-11 mt-[-12.00px] mb-[-12.00px] bg-fgc rounded-[22px] flex items-center justify-center cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
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
});

Input.displayName = "Input";

export { Input };

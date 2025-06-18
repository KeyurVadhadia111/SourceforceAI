import React, { useState, useRef, ChangeEvent } from "react";

interface OtpInputProps {
	onOtpChange: (otp: string) => void;
	disbaled?: boolean;
	className?: string;
	containerClass?: string;
	otpDigit?: number;
}

const OtpInput: React.FC<OtpInputProps> = ({
	onOtpChange,
	disbaled,
	className = "",
	containerClass = "",
	otpDigit = 4,
}) => {
	const [otp, setOtp] = useState<string[]>(Array(otpDigit).fill(""));
	const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

	const handleInputChange = (index: number, value: string) => {
		// Additional condition to handle input greater than or equal to 10 or length greater than 1
		if (+value >= 10 || value?.length > 1) {
			value = Math.abs(+value % 10).toString();
		}

		const newOtp = [...otp];
		newOtp[index] = value;

		setOtp(newOtp);

		// Combine all OTP values into one string
		const combinedOtp = newOtp.join("");
		onOtpChange(combinedOtp);

		// Move to the next input if available
		if (index < otpDigit - 1 && value !== "") {
			inputRefs.current[index + 1]?.focus();
		}
	};

	const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, index: number) => {
		const pastedData = e.clipboardData.getData("Text");
		if (pastedData.length === otpDigit && /^[0-9]{4}$/.test(pastedData)) {
			e.preventDefault();

			const newOtp = pastedData.split("");
			setOtp(newOtp);
			onOtpChange(pastedData);

			// Focus on the last input field
			inputRefs.current[otpDigit - 1]?.focus();
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
		// Handle the 'Backspace' key
		if (e.key === "Backspace" && index > 0) {
			// Prevent the default behavior of the Backspace key
			e.preventDefault();

			if (e.currentTarget.value) {
				// Set the previous input value to an empty string
				handleInputChange(index, "");
				// Move focus to the previous input
				inputRefs.current[index]?.focus();
			} else {
				// Set the previous input value to an empty string
				handleInputChange(index - 1, "");
				// Move focus to the previous input
				inputRefs.current[index - 1]?.focus();
			}
		}
	};

	return (
		<div className={`${containerClass} flex gap-4 phone:gap-3 sm:gap-6 justify-center otp-input`}>
			{otp.map((value, index) => (
				<input
					key={index}
					ref={el => (inputRefs.current[index] = el as any)}
					type="number"
					maxLength={1}
					value={value}
					onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(index, e.target.value)}
					disabled={disbaled}
					onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(e, index)}
					onPaste={(e: React.ClipboardEvent<HTMLInputElement>) => handlePaste(e, index)}
					placeholder="-"
					className={`OTPInput ${className} w-[36px] sm:w-[60px] h-[36px] sm:h-[60px] rounded-full phone:w-10 focus:ring-0 text-center focus:outline-none appearance-none border-black/10 text-text dark:text-textDark font-medium focus:border-gray-400 bg-bgc dark:bg-bgcDark text-sm sm:text-base`}
					style={{
						WebkitAppearance: "none", // For Chrome, Edge, and Safari
						MozAppearance: "textfield", // For Firefox
					}}
				/>
			))}
		</div>
	);
};

export default OtpInput;

import { Button } from "components/utils/Button";
import { Card, CardContent } from "components/utils/Card";
import { Input } from "components/utils/Input";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAppState } from "components/utils/useAppState";
import { toast } from "components/utils/toast";
import { useState, useEffect } from "react";
import OtpInput from "components/common/otpInput";
import CountDown from "components/common/CountDown";
import Icon from "components/utils/Icon";

function ForgotPasswordPage() {
	const [{ isDark, userDetails }, setAppState] = useAppState();
	const [step, setStep] = useState(1);
	const [countDownTimer, setCountDownTimer] = useState(Date.now() + 10);
	const [currentSlide, setCurrentSlide] = useState(0);

	const slides = [
		{
			title: "Find High-Quality and Dependable",
			description: "Discover top-rated, reliable suppliers instantly with our AI-powered sourcing tool.",
			image: "/assets/images/auth-bg/login-left.png",
		},
		{
			title: "Connect with Trusted Partners",
			description: "Build lasting relationships with verified suppliers that meet your quality standards.",
			image: "/assets/images/auth-bg/login-left.png",
		},
		{
			title: "Streamline Your Sourcing",
			description: "Save time and reduce costs with our efficient supplier discovery platform.",
			image: "/assets/images/auth-bg/login-left.png",
		},
	];

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentSlide(prev => (prev + 1) % slides.length);
		}, 5000); // Change slide every 5 seconds

		return () => clearInterval(timer);
	}, []);

	const schema = yup.object({
		email: yup.string().email("Invalid email").required("Email is required"),
		otp: yup
			.string()
			.optional()
			.when([], {
				is: () => step === 2,
				then: schema =>
					schema
						.required("OTP is required")
						.matches(/^\d{6}$/, "Invalid OTP. Please enter 6 digits")
						.min(6, "OTP must be 6 digits")
						.max(6, "OTP must be 6 digits"),
				otherwise: schema => schema.optional(),
			}),
		password: yup
			.string()
			.optional()
			.when([], {
				is: () => step === 3,
				then: schema =>
					schema.required("Password is required").min(8, "Password must be at least 8 characters"),
				otherwise: schema => schema.optional(),
			}),
		confirmPassword: yup
			.string()
			.optional()
			.when([], {
				is: () => step === 3,
				then: schema =>
					schema
						.required("Confirm password is required")
						.oneOf([yup.ref("password")], "Passwords must match"),
				otherwise: schema => schema.optional(),
			}),
	});

	type IForgotPasswordFormData = yup.InferType<typeof schema>;

	const {
		register,
		handleSubmit,
		reset,
		setValue,
		trigger,
		formState: { errors },
	} = useForm<any>({
		resolver: yupResolver(schema),
		defaultValues: {
			email: "",
			otp: "",
			password: "",
			confirmPassword: "",
		},
	});

	const onSubmit = (data: IForgotPasswordFormData) => {
		if (step === 1) {
			// Send OTP to email
			toast.success("OTP sent to your email!");
			setStep(2);
			setCountDownTimer(Date.now() + 60000);
			return;
		}

		if (step === 2) {
			// Verify OTP
			toast.success("OTP verified successfully!");
			setStep(3);
			return;
		}

		if (step === 3) {
			// Reset password
			toast.success("Password reset successfully!");
			setStep(4);
			reset();
			return;
		}
	};

	const resendOtp = () => {
		setCountDownTimer(Date.now() + 60000);
		toast.success("OTP resent to your email!");
	};

	return (
		<>
			<div className="bg-fgc flex flex-row justify-center w-full">
				<div className="flex items-center bg-fgc w-full overflow-hidden relative">
					{/* Start Left side */}
					<div className="hidden sm:flex flex-col w-full items-center justify-center px-0 py-8 h-screen gap-6 bg-primary">
						<div className="flex flex-col items-center gap-6 relative w-full justify-center">
							<div className="relative">
								<img
									className="h-[60px] w-auto cursor-pointer"
									alt="Objects"
									src="/assets/images/logo/logo-full.svg"
								/>
							</div>

							<img className="relative w-[550px] h-auto" alt="Image" src={slides[currentSlide].image} />

							<div className="flex flex-col w-[445px] gap-5 items-center relative flex-[0_0_auto]">
								<div className="flex flex-col gap-4 self-stretch w-full items-center relative flex-[0_0_auto]">
									<div className="w-[525px] ml-[-40.00px] mr-[-40.00px] text-white relative mt-[-1.00px] font-bold text-4xl text-center tracking-[0] leading-[50.4px] transition-opacity duration-500">
										{slides[currentSlide].title}
									</div>

									<p className="text-white relative w-[429px] font-normal text-base text-center tracking-[0] leading-6 transition-opacity duration-500">
										{slides[currentSlide].description}
									</p>
								</div>

								<div className="inline-flex gap-4 items-center relative flex-[0_0_auto]">
									{slides.map((_, index) => (
										<div
											key={index}
											onClick={() => setCurrentSlide(index)}
											className={`relative w-[60px] h-[5px] bg-white rounded-[30px] transition-opacity duration-300 cursor-pointer ${index === currentSlide ? "opacity-100" : "opacity-20"
												}`}
										/>
									))}
								</div>
							</div>
						</div>
					</div>

					{/* Start Right side */}
					<div className="flex flex-col w-full items-center gap-6 h-screen justify-center px-4 sm:px-0">
						<div className="flex flex-col items-center gap-4 relative w-full max-w-[448px]">
							{step === 4 ? (
								<>
									<div className="w-[177px] h-[177px] bg-green-100 rounded-full mx-auto  flex items-center justify-center p-[26px]">
										<Icon
											icon="check"
											className="w-full h-full text-white bg-primary rounded-full p-5 rotate-1"
										/>
									</div>
									<div className="text-center">
										<h1 className="font-bold sm:text-5xl sm:leading-[72px] text-2xl mb-2.5">
											<span className="text-text dark:text-textDark">Reset Success</span>
										</h1>
										<p className="font-normal text-textSecondary dark:text-textDark sm:text-base text-xs tracking-[0.80px] leading-6">
											Your password has been reset
										</p>
										<Link to="/login" className="block w-full mt-6">
											<Button type="button" className="w-full">
												Go to Sign in
											</Button>
										</Link>
									</div>
								</>
							) : (
								<>
									<div className="flex flex-col items-center gap-4 relative self-stretch w-full">
										<h1 className="self-stretch text-text relative font-bold text-4xl text-center tracking-[0] leading-[50.4px]">
											{step === 1 && "Forgot Password?"}
											{step === 2 && "Verify Your Email"}
											{step === 3 && "Reset Your Password"}
										</h1>

										<p className="text-textSecondary relative w-[429px] font-normal text-base text-center tracking-[0] leading-6">
											{step === 1 &&
												"Enter your email address and we'll send you instructions to reset your password."}
											{step === 2 &&
												"We have sent a verification code to your email ID. Please check."}
											{step === 3 &&
												"Enter your new password below. Make sure it's strong and memorable."}
										</p>
									</div>

									<form
										onSubmit={handleSubmit(onSubmit)}
										className="flex flex-col w-full items-start gap-6 relative self-stretch">
										<div className="flex flex-col w-full gap-6">
											{step === 1 && (
												<Input
													icon="envelope"
													placeholder="Email"
													{...register("email")}
													error={errors?.email?.message?.toString()}
												/>
											)}

											{step === 2 && (
												<div className="flex flex-col gap-2">
													<OtpInput
														onOtpChange={(otp: string) => {
															setValue("otp", otp);
															trigger("otp");
														}}
													/>
													{errors?.otp && (
														<span className="text-red-500 text-sm">
															{errors.otp.message?.toString()}
														</span>
													)}
												</div>
											)}

											{step === 3 && (
												<>
													<Input
														icon="lock-key"
														type="password"
														placeholder="New Password"
														{...register("password")}
														error={errors?.password?.message?.toString()}
													/>
													<Input
														icon="lock-key"
														type="password"
														placeholder="Confirm New Password"
														{...register("confirmPassword")}
														error={errors?.confirmPassword?.message?.toString()}
													/>
												</>
											)}
										</div>

										<Button size="lg" type="submit" className="w-full">
											{step === 1 && "Continue"}
											{step === 2 && "Verify"}
											{step === 3 && "Reset Password"}
										</Button>
									</form>

									{step === 2 && (
										<div className="flex items-center justify-center gap-2 text-sm sm:text-base">
											<span className="font-normal text-text dark:text-textDark text-center">
												Didn't receive the code?
											</span>
											<CountDown targetTime={countDownTimer} onCountDownComplete={resendOtp} />
										</div>
									)}

									<div className="flex items-center justify-center gap-2">
										<span className="font-normal text-textSecondary text-base text-center leading-6">
											Back to
										</span>
										<Link
											to="/login"
											className="font-bold text-text text-base text-center leading-6">
											Sign in
										</Link>
									</div>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default ForgotPasswordPage;

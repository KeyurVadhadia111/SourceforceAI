import { Button } from "components/utils/Button";
import { Input } from "components/utils/Input";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Resolver } from "react-hook-form";
import { useAppState } from "components/utils/useAppState";
import { toast } from "components/utils/toast";
import { useState, useEffect } from "react";
import OtpInput from "components/common/otpInput";
import CountDown from "components/common/CountDown";
import Icon from "components/utils/Icon";
import { Separator } from "components/utils/Separator";

interface RegisterFormData {
	fullName: string;
	email: string;
	password: string;
	confirmPassword: string;
	otp: string;
}

const registerSchema = yup.object<RegisterFormData>({
	fullName: yup.string().required("Full Name is required"),
	email: yup.string().email("Invalid email").required("Email is required"),
	password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
	confirmPassword: yup
		.string()
		.required("Please confirm your password")
		.oneOf([yup.ref("password")], "Passwords must match"),
	otp: yup.string().when("$step", {
		is: 2,
		then: schema => schema.required("OTP is required").matches(/^\d{4}$/, "Invalid OTP. Please enter 4 digits"),
		otherwise: schema => schema.optional(),
	}),
});

function Register() {
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
		}, 5000);

		return () => clearInterval(timer);
	}, []);
	const {
		register,
		handleSubmit,
		getValues,
		setValue,
		trigger,
		formState: { errors },
	} = useForm<RegisterFormData>({
		resolver: yupResolver(registerSchema) as unknown as Resolver<RegisterFormData>,
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: "",
			otp: "",
			fullName: "",
		},
		mode: "all",
	});
	const onSubmit: SubmitHandler<RegisterFormData> = data => {
		if (step === 1) {
			// Proceed to email verification
			toast.success("Verification code sent to your email!");
			setStep(2);
			setCountDownTimer(Date.now() + 300000); // 5 minutes
			return;
		}

		if (step === 2) {
			// Verify OTP and complete registration
			if (data.otp?.length === 4) {
				const userDetails = {
					email: data.email,
					_id: Math.floor(Math.random() * 10000000000).toString(),
				};
				localStorage.setItem("auth", JSON.stringify(userDetails));
				setAppState({ userDetails });
				setStep(3);
				toast.success("Email verified successfully!");
			} else {
				toast.error("Please enter a valid verification code");
			}
			return;
		}
	};

	const resendOtp = () => {
		setCountDownTimer(Date.now() + 300000);
		toast.success("Verification code resent to your email!");
	};

	return (
		<div className="bg-fgc flex flex-row justify-center w-full">
			<div className="flex items-center bg-fgc w-full overflow-hidden relative">
				{/* Start Left side */}
				<div className="hidden sm:flex flex-col w-full items-center justify-center px-0 py-8 h-screen gap-6 bg-primary">
					<div className="flex flex-col items-center gap-6 relative w-full justify-center">
						<div className="relative">
							<img
								className="h-[60px] w-auto cursor-pointer"
								alt="Logo"
								src="/assets/images/logo/logo-full.svg"
							/>
						</div>

						<img className="relative w-[550px] h-auto" alt="Image" src={slides[currentSlide].image} />

						<div className="flex flex-col w-[445px] gap-5 items-center relative flex-[0_0_auto]">
							<div className="flex flex-col gap-4 self-stretch w-full items-center relative flex-[0_0_auto]">
								<div className="w-[520px] pl-[50.00px] pr-[50.00px] text-white relative mt-[-1.00px] font-bold text-4xl text-center tracking-[0] leading-[50.4px] transition-opacity duration-500">
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
										className={`relative w-[60px] h-[5px] bg-white rounded-[30px] transition-opacity duration-300 cursor-pointer ${
											index === currentSlide ? "opacity-100" : "opacity-20"
										}`}
									/>
								))}
							</div>
						</div>
					</div>
				</div>

				{/* Start Right side */}
				<div className="flex flex-col w-full items-center gap-6 h-screen justify-center px-4 sm:px-0">
					<div className="flex flex-col items-center gap-8 relative w-full max-w-[448px]">
						{step === 3 ? (
							<div className="text-center flex flex-col gap-8 w-full">
								<img
									src="assets/images/create-acc.svg"
									alt=""
									className="w-[279px] h-[177.09] self-center"
								/>
								<div className="">
									<div className="flex flex-col gap-4">
										<h1 className="self-stretch text-text relative font-bold text-4xl text-center tracking-[0] leading-[50px]">
											Account Created Successfully!
										</h1>

										<p className="text-gray-500">
											Your account has been successfully verified and is now fully activated.
										</p>
									</div>
								</div>

								<Link to="/">
									<Button size="lg" className="w-full">
										Continue
									</Button>
								</Link>
							</div>
						) : (
							<>
								<div className="flex flex-col items-center gap-4 relative self-stretch w-full">
									<h1 className="self-stretch text-text relative font-bold text-4xl text-center tracking-[0] leading-[50.4px]">
										{step === 1 && "Sign Up to Sourceforce AI"}
										{step === 2 && "Verify Your Email"}
									</h1>

									<div className="flex flex-col items-center gap-2 relative self-stretch w-full">
										<p className="text-textSecondary relative w-[429px] font-normal text-base text-center tracking-[0] leading-6">
											{step === 1 &&
												"Create your free account to find trusted suppliers instantly with AI-powered precision."}
											{step === 2 && "We've sent a 4-digit verification code to"}
										</p>
										{step === 2 && (
											<p className="text-primary relative w-[429px] font-normal text-base text-center tracking-[0] leading-6">
												{getValues("email")}
											</p>
										)}
									</div>
								</div>

								<div className="flex flex-col w-full px-6 items-center gap-6 relative flex-[0_0_auto]">
									{step === 1 && (
										<>
											<div className="inline-flex items-center gap-[30px] relative flex-[0_0_auto]">
												<div className="flex w-[72px] h-[72px] items-center justify-center gap-3 p-4 relative bg-white rounded-[52px]">
													<Icon
														icon={"google"}
														className="h-[30px] w-[30px] cursor-pointer"
													/>
												</div>

												<div className="flex w-[72px] h-[72px] items-center justify-center gap-3 p-4 relative bg-white rounded-[52px]">
													<Icon
														icon={"linkedin"}
														className="h-[30px] w-[30px] cursor-pointer"
													/>
												</div>

												<div className="flex w-[72px] h-[72px] items-center justify-center gap-3 p-4 relative bg-white rounded-[52px]">
													<Icon icon={"apple"} className="h-[30px] w-[30px] cursor-pointer" />
												</div>
											</div>

											<div className="flex w-full px-11 items-center justify-center gap-5 relative">
												<Separator className="" />

												<div className="relative w-fit mt-[-1.00px] font-medium text-text text-lg text-center tracking-[0] leading-[23.4px] whitespace-nowrap">
													or
												</div>

												<Separator className="" />
											</div>
										</>
									)}{" "}
									<form
										onSubmit={handleSubmit(onSubmit)}
										className="flex flex-col w-full items-start gap-6 relative self-stretch">
										<div className="flex flex-col w-full gap-4">
											{step === 1 && (
												<>
													<Input
														icon="user"
														placeholder="Full Name"
														{...register("fullName")}
														error={errors?.fullName?.message?.toString()}
													/>
													<Input
														icon="envelope"
														placeholder="Email"
														{...register("email")}
														error={errors?.email?.message?.toString()}
													/>
													<Input
														icon="lock-key"
														type="password"
														placeholder="Password"
														{...register("password")}
														error={errors?.password?.message?.toString()}
													/>
													<Input
														icon="lock-key"
														type="password"
														placeholder="Confirm Password"
														{...register("confirmPassword")}
														error={errors?.confirmPassword?.message?.toString()}
													/>
												</>
											)}

											{step === 2 && (
												<div className="flex flex-col gap-2">
													<OtpInput
														otpDigit={4}
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

											<Button size="lg" type="submit" className="w-full mt-2">
												{step === 1 && "Sign Up"}
												{step === 2 && "Verify Email"}
											</Button>
										</div>
									</form>
								</div>
								{step === 2 && (
									<div
										onClick={() => {
											setStep(step - 1);
										}}
										className="flex items-center justify-center gap-2 text-sm sm:text-base">
										<span className="font-normal text-text dark:text-textDark text-center">
											Back
										</span>
									</div>
								)}

								{step === 1 && (
									<div className="flex items-center justify-center gap-2">
										<span className="font-normal text-textSecondary text-base text-center leading-6">
											Already have an account?
										</span>
										<Link
											to="/login"
											className="font-bold text-text text-base text-center leading-6">
											Sign In
										</Link>
									</div>
								)}
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Register;

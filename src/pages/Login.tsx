import { Button } from "components/utils/Button";
import { Input } from "components/utils/Input";
import { Separator } from "components/utils/Separator";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Icon from "components/utils/Icon";
import { useAppState } from "components/utils/useAppState";
import { toast } from "components/utils/toast";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Login() {
	const [{ isDark, userDetails }, setAppState] = useAppState();
	const [currentSlide, setCurrentSlide] = useState(0);
	const navigate = useNavigate();
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
		password: yup.string().required("Password is required").min(8, "Password must be at least 8 characters"),
		remember: yup.boolean().default(false).required(),
	});
	type ILoginFormData = yup.InferType<typeof schema>;

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<ILoginFormData>({
		resolver: yupResolver(schema),
		defaultValues: {
			email: "",
			password: "",
			// remember: false,
		},
	});

	const onSubmit = (data: ILoginFormData) => {
		const userDetails = JSON.parse(JSON.stringify(data));
		userDetails._id = Math.floor(Math.random() * 10000000000).toString();
		localStorage.setItem("auth", JSON.stringify(userDetails));
		setAppState({ userDetails: userDetails });
		toast.success("Login successful!");
		reset();
		navigate("/news-sourcing-request");
	};

	return (
		<>
			<div className="bg-fgc flex flex-row justify-center w-full">
				<div className="flex items-center bg-fgc dark:bg-bgcDark w-full overflow-hidden relative">
					{/* Start Left side */}
					<div className="hidden lg:flex flex-col w-full items-center justify-center-safe  px-0 py-8 h-screen gap-6 bg-primary dark:bg-fgcDark overflow-auto self-stretch">
						<div className="flex flex-col items-center gap-6 relative w-full justify-center px-0 sm:px-5 xl:px-0">
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
					<div className="flex flex-col w-full items-center gap-6 h-[calc(100vh-56px)] lg:h-screen p-6 sm:px-0 justify-start lg:justify-center-safe overflow-auto sm:py-8">
						<div className="flex flex-col items-center sm:gap-8 gap-6 relative w-full max-w-[448px] ">
							<div className="flex flex-col items-center sm:gap-4 gap-[14px] relative self-stretch w-full">
								<p className="self-stretch text-text dark:text-textDark relative mt-[-1.00px] font-bold sm:text-4xl text-[26px] leading-[36px] text-center tracking-[0] sm:leading-[50px]">
									Sign in to Sourceforce AI
								</p>

								<p className="text-textSecondary dark:text-textSecondaryDark relative w-[429px] mt-[2px] sm:mt-0 font-normal sm:text-base text-[14px] text-center tracking-[0] sm:leading-6 leading-[21px]">
									Please Enter Your Details to Sign In.
								</p>
							</div>

							<div className="flex flex-col w-full sm:px-6 items-center gap-6 relative flex-[0_0_auto]">
								<div className="inline-flex items-center sm:gap-[30px] gap-4 relative flex-[0_0_auto]">
									<div className="flex sm:w-[72px] w-[42px] sm:h-[72px] h-[42px] items-center justify-center gap-3 p-[9.33px] sm:p-4 relative bg-white dark:bg-fgcDark rounded-[52px]">
										<Icon
											icon={"google"}
											className="sm:h-[30px] sm:w-[30px] w-[17.5px] h-[17.5px] cursor-pointer"
										/>
									</div>

									<div className="flex sm:w-[72px] w-[42px] sm:h-[72px] h-[42px] items-center justify-center gap-3 p-[9.33px] sm:p-4 relative bg-white dark:bg-fgcDark rounded-[52px]">
										<Icon
											icon={"linkedin"}
											className="sm:h-[30px] sm:w-[30px] w-[17.5px] h-[17.5px] cursor-pointer"
										/>
									</div>

									<div className="flex sm:w-[72px] w-[42px] sm:h-[72px] h-[42px] items-center justify-center gap-3 p-[9.33px] sm:p-4 relative bg-white dark:bg-fgcDark rounded-[52px]">
										<Icon
											icon={"apple"}
											className="sm:h-[30px] sm:w-[30px] w-[17.5px] h-[17.5px] cursor-pointer dark:text-textDark"
										/>
									</div>
								</div>

								<div className="flex w-[315px] sm:w-full h-[23px] sm:px-11 items-center justify-center sm:gap-5 gap-[12px] relative ">
									<Separator className=" !w-full !mt-[-2px]" />

									<div className="relative w-fit sm:mt-[-1.00px] font-medium text-text dark:text-textDark sm:text-lg text-[14px] text-center tracking-[0] leading-[23px] whitespace-nowrap">
										or
									</div>

									<Separator className="!w-full !mt-[-2px]" />
								</div>

								<form
									onSubmit={handleSubmit(onSubmit)}
									className="flex flex-col items-start gap-6 relative self-stretch w-full flex-[0_0_auto]">
									<div className="flex-col gap-4 flex-[0_0_auto] flex items-center relative self-stretch w-full">
										<div className="w-full">
											<Input
												className=""
												icon={isDark ? "envelope-dark" : "envelope"}
												placeholder="Email"
												{...register("email")}
												error={errors?.email?.message?.toString()}
											/>
										</div>
										<div className="w-full">
											<Input
												icon={isDark ? "lock-key-dark" : "lock-key"}
												type="password"
												placeholder="Password"
												{...register("password")}
												error={errors?.password?.message?.toString()}
											/>
										</div>

										<div className="relative w-fit font-medium text-text dark:text-textDark sm:text-base text-[14px] text-right tracking-[0] sm:leading-6 leading-[21px] mt-[1px] whitespace-nowrap">
											<Link to="/forgot-password">Forgot Password?</Link>
										</div>
									</div>

									<Button size="lg" type="submit" className="w-full !px-6 !py-[14px] !h-12 sm:!h-14">
										Continue
									</Button>
								</form>
							</div>

							<div className="inline-flex items-center sm:gap-2 gap-[6px] relative flex-[0_0_auto] -mt-[3px] sm:mt-0">
								<div className="relative w-fit font-medium text-textSecondary dark:text-textSecondaryDark sm:text-base text-[14px] text-center tracking-[0] sm:leading-6 leading-[21px] whitespace-nowrap">
									Don’t have an account?
								</div>

								<Link
									to={"/register"}
									className="relative w-fit sm:mt-[-1.00px] mt-[2px] font-bold text-text dark:text-primary sm:text-base text-[14px] text-center tracking-[0] sm:leading-6 leading-[21px] whitespace-nowrap">
									Sign Up
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Login;

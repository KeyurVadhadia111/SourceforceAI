import { Menu, Transition } from "@headlessui/react";
import { sidebarItems } from "components/common/Sidebar";
import { Button } from "components/utils/Button";
import Icon from "components/utils/Icon";
import ProfileMenu from "components/utils/ProfileMenu";
import { Separator } from "components/utils/Separator";
import { useAppState } from "components/utils/useAppState";
import { cn } from "lib/utils";
import { Fragment, use, useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
	const [{ isDark, userDetails, isExpanded, isResponsiveMenu }, setAppState] = useAppState();
	const [activeItem, setActiveItem] = useState(sidebarItems[0]);

	useEffect(() => {
		setAppState({ userDetails: JSON.parse(localStorage.getItem("auth") || "{}") });
		// Check for dark mode preference
		if (localStorage.theme === "dark") {
			// setThemeMode(true);
			setAppState({ isDark: true });
		}
		if (window.matchMedia("(prefers-color-scheme: dark)").matches && localStorage?.theme === undefined) {
			// setThemeMode(true);
			setAppState({ isDark: true });
		}
	}, []);

	const setThemeMode = (isDark: boolean) => {
		if (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches) {
			// document.documentElement.classList.add("dark");
			isDark = true;
		}
		if (isDark) {
			document.documentElement.classList.remove("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
		setAppState({ isDark: isDark });
	};

	return (
		<div className="sm:bg-transparent bg-text relative -ml-px">
			<div className="flex w-full items-center justify-between sm:px-8 sm:py-6 py-3 px-6 relative">
				<div className="inline-flex items-center gap-2.5 relative flex-[0_0_auto]">
					<img className="relative h-8 sm:hidden block" alt="Group" src="/assets/images/logo/logo-full.png" />
					{!isExpanded ? (
						<>
							<img
								className="relative w-[189.66px] h-[21.2px] sm:block hidden"
								alt="Union"
								src="assets/images/logo/union-9.svg"
							/>
							<div className="relative w-6 h-6 sm:block hidden text-textSecondary">
								<Icon className=" w-6 h-6" icon="chevron-down" />
							</div>
						</>
					) : (
						""
					)}
				</div>
				<div className="relative sm:hidden block ">
					{/* <Icon
						onClick={() => {
							setAppState({ isResponsiveMenu: true });
						}}
						icon="bars-3"
						className=" w-6 h-6 text-white"
					/> */}
					<Menu as="div" className="relative">
						<div>
							<Menu.Button className="">
								{({ active, open }) =>
									open ? (
										<Icon icon="x-mark" className=" w-6 h-6 text-white" />
									) : (
										<Icon icon="bars-3" className=" w-6 h-6 text-white" />
									)
								}
							</Menu.Button>
						</div>
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100"
							leaveTo="opacity-0">
							<div className="fixed inset-0 z-[9] bg-black/50" />
						</Transition.Child>
						<Transition
							as={Fragment}
							enter="transform transition ease-in-out duration-300"
							enterFrom="translate-x-full opacity-0"
							enterTo="translate-x-0 opacity-100"
							leave="transform transition ease-in-out duration-200"
							leaveFrom="translate-x-0 opacity-100"
							leaveTo="translate-x-full opacity-0">
							<Menu.Items
								className={cn(
									"fixed min-w-[250px] w-[250px] m-px",
									"right-0 top-0 z-10",
									"rounded-none",
									"border-border dark:border-border-dark dark:border bg-text",
									"ring-1 ring-black ring-opacity-0",
									"focus:outline-none min-h-screen",
								)}>
								<div className={`relative transition-all duration-300 ease-in-out min-h-screen`}>
									<div className="inline-flex flex-col items-center justify-between p-6 relative flex-[0_0_auto] w-full h-[100dvh]">
										<div className="inline-flex flex-col items-start gap-6 relative flex-[0_0_auto] w-full">
											<img
												className={`relative h-[42px] w-full}`}
												alt="Group"
												src={`/assets/images/logo/logo-primary-full.svg`}
											/>

											<div
												className={`inline-flex flex-col gap-3 relative flex-[0_0_auto] w-full items-start`}>
												{sidebarItems.map(item => {
													return (
														<Menu.Item key={item.id}>
															{({ close }) => (
																<Link
																	to={item.url || ""}
																	onClick={() => {
																		close();
																	}}
																	className={`relative h-8 flex items-center justify-center transition-all duration-300 rounded-xl`}>
																	{item.url === location.pathname && (
																		<div className="absolute w-[3px] h-[32px] top-[0] -left-6 bg-primary rounded-full"></div>
																	)}
																	<div className="w-8 h-8 flex items-center justify-center">
																		<Icon
																			icon={item.icon || ""}
																			className={`w-[18px] h-[18px]`}
																		/>
																	</div>
																	<span className="font-medium text-textDark">
																		{item.title}
																	</span>
																</Link>
															)}
														</Menu.Item>
													);
												})}
											</div>
										</div>

										<div className="flex flex-col gap-3 w-full">
											<Menu.Item>
												{({ close }) => (
													<Link
														to={"/profile"}
														onClick={() => {
															close();
														}}
														className="w-full flex items-center gap-2">
														<img
															className="relative w-8 h-8"
															alt="Photo by evan wise"
															src="/assets/images/photo-by-evan-wise.png"
														/>

														<div className="transition-all  duration-300 text-textDark flex flex-col items-start gap-0.5">
															<div className="font-medium text-xs">James Forgey</div>
															<div className="font-medium text-[8px]">
																James121@gmail.com
															</div>
														</div>
													</Link>
												)}
											</Menu.Item>
											<Link to={"/login"} className="w-full flex items-center gap-2">
												<div className="w-8 h-8 flex items-center justify-center">
													<Icon icon="logout" className={`w-[18px] h-[18px]`} />
												</div>

												<div className="text-sm leading-[150%] font-medium text-textDark">
													logout
												</div>
											</Link>
											<div className="inline-flex items-center w-full gap-2 relative">
												<div className="inline-flex items-center p-0.5 relative flex-[0_0_auto] bg-tgc rounded-[100px]">
													<div className="flex w-6 h-6 items-center justify-center gap-2.5 px-[3px] py-0.5 relative bg-white rounded-[100px]">
														<Icon className="relative w-4 h-4" icon="cloud-sun" />
													</div>

													<div className="flex w-6 h-6 items-center justify-center gap-2.5 px-[3px] py-0.5 relative rounded-[100px] overflow-hidden">
														<Icon className="relative w-4 h-4" icon="cloud-moon" />
													</div>
												</div>

												<Button className="inline-flex items-center justify-center gap-1 px-4 !py-1 relative flex-[0_0_auto] bg-primary rounded-[40px]">
													<Icon className="relative w-4 h-4" icon="export" />

													<div className="relative w-fit  text-white !text-xs tracking-[0] leading-[150%] whitespace-nowrap">
														Share
													</div>
												</Button>
											</div>
										</div>
									</div>
								</div>
							</Menu.Items>
						</Transition>
					</Menu>
				</div>
				<div className="hidden sm:inline-flex items-center gap-4 relative flex-[0_0_auto]">
					<div className="inline-flex items-center p-1 relative flex-[0_0_auto] bg-tgc rounded-[100px]">
						<div
							onClick={() => {
								setThemeMode(false);
							}}
							className={cn(
								"cursor-pointer flex w-12 h-12 items-center justify-center gap-2.5 px-[3px] py-0.5 relative rounded-[100px]",
								!isDark && "bg-white",
							)}>
							<Icon className="relative w-6 h-6 text-primary" icon="cloud-sun" />
						</div>

						<div
							onClick={() => {
								setThemeMode(true);
							}}
							className={cn(
								"cursor-pointer flex w-12 h-12 items-center justify-center gap-2.5 px-[3px] py-0.5 relative rounded-[100px]",
								isDark && "bg-white",
							)}>
							<Icon className="relative w-6 h-6" icon="cloud-moon" />
						</div>
					</div>

					<Button className="inline-flex items-center justify-center gap-3 px-[31px] py-4 relative text-white flex-[0_0_auto] bg-primary rounded-[40px]">
						<Icon className="relative w-6 h-6" icon="export" />

						<div className="relative w-fit tracking-[0.079px] font-bold text-base leading-6 whitespace-nowrap">
							Share
						</div>
					</Button>
				</div>
			</div>
			<Separator className="-mt-px" />
		</div>
	);
}

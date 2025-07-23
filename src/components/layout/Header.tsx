import { Menu, Transition } from "@headlessui/react";
import { sidebarItems } from "components/common/Sidebar";
import { Button } from "components/utils/Button";
import Icon from "components/utils/Icon";
import ProfileMenu from "components/utils/ProfileMenu";
import { Separator } from "components/utils/Separator";
import { useAppState } from "components/utils/useAppState";
import { cn } from "lib/utils";
import { Fragment, use, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const shareOptions = [
	{ label: 'Whatsapp', url: 'https://web.whatsapp.com/' },
	{ label: 'Email', url: 'https://accounts.google.com/' },
	{ label: 'Linkedin', url: 'https://www.linkedin.com/' },
];

export default function Header() {
	const [{ isDark, userDetails, isExpanded, isResponsiveMenu }, setAppState] = useAppState();
	const [activeItem, setActiveItem] = useState(sidebarItems[0]);
	const [query, setQuery] = useState("");
	const navigate = useNavigate();
	const location = useLocation();
	const buttonRef = useRef<HTMLButtonElement>(null);
	const [dropUp, setDropUp] = useState(false);
	const [alignRight, setAlignRight] = useState(false);
	const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

	const handleOpen = () => {
		const rect = buttonRef.current?.getBoundingClientRect();
		if (rect) {
			const spaceBelow = window.innerHeight - rect.bottom;
			const dropdownHeight = shareOptions.length * 40;
			setDropUp(spaceBelow < dropdownHeight);

			const dropdownWidth = 160;
			const spaceRight = window.innerWidth - rect.left;
			const spaceLeft = rect.right;

			if (spaceRight < dropdownWidth && spaceLeft >= dropdownWidth) {
				setAlignRight(true);
			} else {
				setAlignRight(false);
			}
		}
	};

	useEffect(() => {
		setAppState({ searchQuery: query });
	}, [query]);

	useEffect(() => {
		setIsMobileSearchOpen(false);
	}, [location.pathname]);


	useEffect(() => {
		if (query.trim()) {
			// Trigger search or update global state/store
			console.log("Global search for:", query);
		}
	}, [query]);

	useEffect(() => {
		setAppState({ userDetails: JSON.parse(localStorage.getItem("auth") || "{}") });
		// Check for dark mode preference
		if (localStorage.theme === "dark") {
			setThemeMode(true);
			setAppState({ isDark: true });
		}
		if (window.matchMedia("(prefers-color-scheme: dark)").matches && localStorage?.theme === undefined) {
			setThemeMode(true);
			setAppState({ isDark: true });
		}
	}, []);

	const setThemeMode = (isDark: boolean) => {
		if (isDark) {
			document.documentElement.classList.add("dark");
			localStorage.theme = "dark";
		} else {
			document.documentElement.classList.remove("dark");
			localStorage.theme = "light";
		}
		setAppState({ isDark });
	};


	return (
		<div className="md:bg-transparent dark:md:bg-transparent bg-text dark:bg-fgcDark relative -ml-px">
			<div className={`flex w-full items-center ${isMobileSearchOpen ? "sm:justify-between justify-center" : "justify-between"} md:px-8 md:py-3 py-3 px-6 relative`}>
				{isExpanded && (
					<div className="hidden sm:block"></div>
				)}
				<div className="inline-flex md:hidden lg:inline-flex items-center gap-2.5 relative flex-[0_0_auto]">
					<img className={`relative h-8 md:hidden block ${isMobileSearchOpen ? "hidden" : "bolck"}`} alt="Group" src="/assets/images/logo/logo-full.png" />
					{!isExpanded ? (
						<>
							{/* <img
								className="relative w-[189.66px] h-[21.2px] md:block hidden"
								alt="Union"
								src="assets/images/logo/union-9.svg"
							/> */}
							{isDark ? (
								<img
									className="relative w-[189.66px] h-[21.2px] md:block hidden"
									src="assets/images/logo/union-dark.svg"
									alt="Logo Dark"
								/>
							) : (
								<img
									className="relative w-[189.66px] h-[18px] md:block hidden"
									src="assets/images/logo/union-9.svg"
									alt="Logo Light"
								/>
							)}

						</>
					) : (
						""
					)}
				</div>
				<div className="min-lg:hidden block"></div>
				<div className="relative md:hidden flex items-center gap-3">
					<div className="flex w-full items-center gap-3">
						{!isMobileSearchOpen ? (
							<Icon
								icon="search"
								className="w-6 h-6 text-white cursor-pointer"
								onClick={() => setIsMobileSearchOpen(true)}
							/>
						) : (
							<div className="relative w-[100%]">
								<input
									type="text"
									placeholder="Search here..."
									autoFocus
									className="h-8 pl-10 pr-3 w-[300px] bg-white dark:bg-fgcDark text-text dark:text-textDark border border-border dark:border-borderDark rounded-full focus:outline-none"
									value={query}
									onChange={(e) => setQuery(e.target.value)}
									onKeyDown={(e) => {
										if (e.key === "Enter" && query.trim()) {
											navigate(`/search-results?query=${encodeURIComponent(query)}`);
										}
									}}
								/>
								<Icon icon="search" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-textSecondary" />

							</div>
						)}
						{isMobileSearchOpen && (
							<Icon
								icon="close-circle"
								className=" w-6 h-6 text-white font-bold cursor-pointer"
								onClick={() => {
									setIsMobileSearchOpen(false);
									setQuery("");
								}}
							/>
						)}
					</div>
					<Menu as="div" className={`relative ${isMobileSearchOpen ? "hidden" : "bolck"}`}>
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
									"right-0 top-0 z-20",
									"rounded-none",
									"border-border dark:border-border-dark dark:border bg-text dark:bg-fgcDark",
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
												<div className="inline-flex items-center p-0.5 relative flex-[0_0_auto] bg-tgc dark:bg-bgcDark rounded-[100px]">
													<div onClick={() => {
														setThemeMode(false);
													}}
														className={cn(
															"flex w-6 h-6 items-center justify-center rounded-[100px]",
															"bg-transparent",
															!isDark && "bg-white"
														)}
													>
														<Icon className="relative w-4 h-4" icon="cloud-sun" />
													</div>

													<div onClick={() => {
														setThemeMode(true);
													}}
														className={cn(
															"flex w-6 h-6 items-center justify-center rounded-[100px]",
															"bg-transparent",
															isDark && "bg-white"
														)}
													>
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
				<div className="hidden md:inline-flex items-center gap-4 relative flex-[0_0_auto]">
					{location.pathname !== "/news-sourcing-request" && (
						<div className="hidden md:block relative sm:w-auto w-full">
							<div
								className="absolute left-2 z-1 sm:w-11 sm:h-11 w-8 h-8 transform top-1/2 -translate-y-1/2 rounded-[22px] flex items-center justify-center">
								<Icon className="sm:w-4 sm:h-4 w-4 h-4 text-text dark:text-textDark" icon="search" />
							</div>
							<input type="text" placeholder="Search here...." className="h-10 gap-2.5 px-10 sm:px-10 sm:pl-12 sm:w-auto w-full py-[15px] sm:py-[23px] flex items-center relative self-stretch bg-white dark:bg-fgcDark text-text dark:text-textDark border border-border dark:border-borderDark rounded-4xl focus-visible:outline-none"
								value={query}
								onChange={(e) => setQuery(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === "Enter" && query.trim()) {
										navigate(`/search-results?query=${encodeURIComponent(query)}`);
									}
								}}
							/>
						</div>
					)}
					<div className="inline-flex items-center p-1 relative flex-[0_0_auto] bg-tgc dark:bg-fgcDark rounded-[100px]">
						<div
							onClick={() => {
								setThemeMode(false);
							}}
							className={cn(
								"cursor-pointer flex w-10 h-10 items-center justify-center gap-2.5 px-[3px] py-0.5 relative rounded-[100px]",
								!isDark && "bg-white",
							)}>
							<Icon className="relative w-6 h-6 text-primary" icon="cloud-sun" />
						</div>

						<div
							onClick={() => {
								setThemeMode(true);
							}}
							className={cn(
								"cursor-pointer flex w-10 h-10 items-center justify-center gap-2.5 px-[3px] py-0.5 relative rounded-[100px]",
								isDark && "bg-white",
							)}>
							<Icon className="relative w-6 h-6" icon="cloud-moon" />
						</div>
					</div>

					{/* <Button className="inline-flex items-center justify-center gap-3 px-[31px] py-4 relative text-white flex-[0_0_auto] bg-primary rounded-[40px]">
						<Icon className="relative w-6 h-6" icon="export" />

						<div className="relative w-fit tracking-[0.079px] font-bold text-base leading-6 whitespace-nowrap">
							Share
						</div>
					</Button> */}
					<Menu as="div" className="relative inline-block text-left">
						<Menu.Button
							ref={buttonRef}
							onClick={handleOpen}
							className="inline-flex items-center justify-center gap-3 px-[31px] py-3 relative text-white flex-[0_0_auto] bg-primary rounded-[40px] focus:outline-none"
						>
							<Icon className="relative w-5 h-5" icon="export" />
							<div className="relative w-fit tracking-[0.079px] font-bold text-sm leading-6 whitespace-nowrap">
								Share
							</div>
						</Menu.Button>

						<Menu.Items
							className={cn(
								'absolute z-20 w-30 rounded-md bg-white dark:bg-fgcDark shadow-lg focus:outline-none',
								dropUp ? 'bottom-full left-0 mb-2' : 'top-full right-0 mt-2',
								alignRight ? 'left-0' : 'right-0'
							)}
						>
							<div className="py-1">
								{shareOptions.map(({ label, url }) => (
									<Menu.Item key={label}>
										{({ active }) => (
											<button
												onClick={() => window.open(url, '_blank')}
												className={cn(
													'block w-full text-left text-textSecondary dark:text-textSecondaryDark px-4 py-2 text-sm',
													active ? 'bg-tgc/70 dark:bg-bgcDark/30' : ''
												)}
											>
												{label}
											</button>
										)}
									</Menu.Item>
								))}
							</div>
						</Menu.Items>
					</Menu>
				</div>
			</div>
			<Separator className="-mt-px" />
		</div>
	);
}

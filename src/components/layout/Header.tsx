import { Menu, Transition } from "@headlessui/react";
import { sidebarItems } from "components/common/Sidebar";
import { classNames } from "components/utils";
import { Button } from "components/utils/Button";
import Icon from "components/utils/Icon";
import { useAppState } from "components/utils/useAppState";
import { cn } from "lib/utils";
import { Fragment, use, useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
	const [{ isDark, userDetails, isExpanded }, setAppState] = useAppState();
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
		<div className="sm:bg-transparent bg-text">
			<div className="flex w-full items-center justify-between sm:px-8 sm:py-6 py-3 px-6 relative border-b border-border ">
				<div className="inline-flex items-center gap-2.5 relative flex-[0_0_auto]">
					{!isExpanded ? (
						<>
							<img className="relative h-8 sm:hidden block" alt="Group" src="/assets/images/logo/logo-full.png" />
							<img
								className="relative w-[189.66px] h-[21.2px] sm:block hidden"
								alt="Union"
								src="assets/images/logo/union-9.svg"
							/>
							<div className="relative w-6 h-6 sm:block hidden text-textSecondary">
								<Icon className=" w-6 h-6" icon="chevron-down" />
							</div>
						</>
					) : ''}
				</div>
				<div className="relative sm:hidden block ">
					<Menu as="div" className="relative">
						<div>
							<Menu.Button className="p-1.5">
								{({ active, open }) =>
									open ? (
										<Icon icon="x-mark" className=" w-6 h-6 text-white" />
									) : (
										<Icon icon="bars-3" className=" w-6 h-6 text-white" />
									)
								}
							</Menu.Button>
						</div>
						<Transition
							as={Fragment}
							enter="transition ease-out duration-100"
							enterFrom="transform opacity-0 scale-95"
							enterTo="transform opacity-100 scale-100"
							leave="transition ease-in duration-75"
							leaveFrom="transform opacity-100 scale-100"
							leaveTo="transform opacity-0 scale-95">
							<Menu.Items
								className={classNames(
									"fixed w-full h-full m-px",
									"right-0 z-10",
									"mt-2",
									"rounded-none",
									"border-border dark:border-border-dark dark:border bg-bgc dark:bg-bgc-dark",
									"ring-1 ring-black ring-opacity-",
									"focus:outline-none",
								)}>
								<Menu.Item>
									{({ active }) => (
										<div className="px-4 py-2 flex gap-2 items-center border-b border-border dark:border-border-dark">
											<Icon icon="user" size={32} />
											<div>
												<div>signed in as</div>
												<div className="text-textSecondary dark:text-textSecondary-dark">
													{userDetails?.email}
												</div>
											</div>
										</div>
									)}
								</Menu.Item>
								{sidebarItems.map((item, index) => {
									if (item.isHide) return null;

									return (
										<Menu.Item key={index}>
											{({ active }) => (
												<Link
													onClick={() => {
														setActiveItem(item);
													}}
													to={item.url || "#"}
													className={classNames(
														item.id === activeItem.id ? " text-primary font-medium" : "",
														"block px-4 py-3 text-sm shadow-sm",
														"hover:bg-fgc dark:hover:bg-fgc-dark hover:text-primary",
													)}>
													{item.icon && (
														<Icon
															icon={item.icon}
															className="float-left mr-3 w-6 h-6 bg-text p-0.5 rounded-full"
															aria-hidden="true"
														/>
													)}
													{item.title}
												</Link>
											)}
										</Menu.Item>
									);
								})}
								<div className="inline-flex items-center gap-4 relative flex-[0_0_auto]">
									<div className="inline-flex items-center p-1 relative flex-[0_0_auto] bg-tgc rounded-[100px]">
										<div className="flex w-12 h-12 items-center justify-center gap-2.5 px-[3px] py-0.5 relative bg-white rounded-[100px]">
											<Icon className="relative w-6 h-6" icon="cloud-sun" />
										</div>

										<div className="flex w-12 h-12 items-center justify-center gap-2.5 px-[3px] py-0.5 relative rounded-[100px] overflow-hidden">
											<Icon className="relative w-6 h-6" icon="cloud-moon" />
										</div>
									</div>

									<Button className="inline-flex items-center justify-center gap-3 px-8 py-4 relative flex-[0_0_auto] bg-primary rounded-[40px]">
										<Icon className="relative w-6 h-6" icon="export" />

										<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Bold',Helvetica] font-bold text-white text-base tracking-[0] leading-6 whitespace-nowrap">
											Share
										</div>
									</Button>
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

					<Button className="inline-flex items-center justify-center gap-3 px-8 py-4 relative text-white flex-[0_0_auto] bg-primary rounded-[40px]">
						<Icon className="relative w-6 h-6" icon="export" />

						<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Bold',Helvetica] font-bold text-base tracking-[0] leading-6 whitespace-nowrap">
							Share
						</div>
					</Button>
				</div>
			</div>
		</div>
	);
}

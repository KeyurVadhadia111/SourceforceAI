import { MenuItemProps } from "components/utils/datatypes";
import Icon from "components/utils/Icon";
import MenuComponent from "components/utils/MenuComponent";
import ProfileMenu from "components/utils/ProfileMenu";
import { useAppState } from "components/utils/useAppState";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export const sidebarItems: MenuItemProps[] = [
	{
		title: "New Sourcing Request",
		icon: "asterisk-simple",
		url: "/news-sourcing-request",
		active: false,
		id: 1,
	},
	{
		title: "Supplier Search Filters",
		icon: "cube-focus",
		url: "/supplier-search-summary",
		active: false,
		id: 2,
	},
	{
		title: "Manufacturer Directory",
		icon: "factory",
		url: "#",
		active: false,
		id: 3,
	},
	{
		title: "Market Intelligence",
		icon: "presentation-chart",
		url: "#",
		active: false,
		id: 4,
	},
	{
		title: "Saved Suppliers",
		icon: "heart-half",
		url: "/saved-manufacturers",
		active: false,
		id: 5,
	},
	{
		title: "Compliance Check",
		icon: "policy",
		url: "#",
		active: false,
		id: 6,
	},
	{
		title: "Supplier Messages",
		icon: "chat-circle-text",
		url: "/rfq-center",
		active: false,
		id: 7,
	},
];

export default function Sidebar() {
	const [{ isDark, isExpanded }, setAppState] = useAppState();
	const sidebarRef = useRef<HTMLDivElement>(null);

	const handleClickOutside = (event: MouseEvent) => {
		if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
			setAppState({ isExpanded: false });
			localStorage.setItem("sidebarExpanded", "false");
		}
	};

	const toggleSidebar = () => {
		const newState = !isExpanded;
		setAppState({ isExpanded: newState });
		localStorage.setItem("sidebarExpanded", JSON.stringify(newState));
	};

	/* useEffect(() => {
		if (isExpanded) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isExpanded]); */

	useEffect(() => {
		setAppState({ userDetails: JSON.parse(localStorage.getItem("auth") || "{}") });
		// Check for dark mode preference
		if (localStorage.theme === "dark") {
			// setThemeMode(true);
			// setAppState({ isDark: true });
		}
		if (window.matchMedia("(prefers-color-scheme: dark)").matches && localStorage?.theme === undefined) {
			// setThemeMode(true);
			// setAppState({ isDark: true });
		}
	}, []);

	const setThemeMode = (isDark: boolean) => {
		if (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches) {
			// document.documentElement.classList.add("dark");
			isDark = true;
		}
		if (isDark) {
			// document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
		setAppState({ isDark: isDark });
	};

	return (
		<>
			<div
				ref={sidebarRef}
				className={`sidebar relative ${isExpanded ? "min-w-[270px] w-[270px]" : "w-[104px]"} transition-all duration-300 ease-in-out md:block hidden bg-text dark:bg-fgcDark`}>
				<div
					onClick={toggleSidebar}
					className={`sidebar-btn absolute w-6 h-6 top-10 -right-3 bg-white rounded-[100px] lg:block hidden z-10 cursor-pointer hover:bg-gray-50 transition-colors ${
						isExpanded ? "rotate-180" : ""
					}`}>
					<div className="relative w-4 h-4 top-1 left-1 flex justify-center items-center">
						<Icon className="w-4 h-4" icon="chevron-right" />
					</div>
				</div>
				<div className="inline-flex flex-col items-center justify-between p-6 relative flex-[0_0_auto] w-full h-screen overflow-auto">
					<div className="inline-flex flex-col items-start gap-12 relative flex-[0_0_auto] w-full">
						<img
							className={`relative  h-14 ${isExpanded ? "w-full" : "w-14"}`}
							alt="Group"
							src={`/assets/images/logo/${isExpanded ? "logo-primary-full.svg" : "logo-primary.svg"}`}
						/>

						<div
							className={`inline-flex flex-col gap-3 relative flex-[0_0_auto] w-full ${isExpanded ? "items-start" : "items-center"}`}>
							{sidebarItems.map(item => {
								return (
									<Link
										key={item.id}
										to={item.url || ""}
										className={`relative h-14 flex items-center justify-center transition-all duration-300 rounded-xl`}>
										{item.url === location.pathname && (
											<div className="absolute w-[3px] h-[59px] top-[0] -left-6 bg-primary rounded-full"></div>
										)}
										<div className="w-14 h-14 flex items-center justify-center">
											<Icon icon={item.icon || ""} className={`w-8 h-8`} />
										</div>
										{isExpanded && <span className="font-medium text-textDark">{item.title}</span>}
									</Link>
								);
							})}
						</div>
					</div>

					<div className=" w-full flex items-center gap-2">
						<ProfileMenu />

						{isExpanded && (
							<div className="transition-all  duration-300 text-textDark flex flex-col items-start gap-2">
								<div className="font-medium">James Forgey</div>
								<div className="font-medium text-[10px]">James121@gmail.com</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
}

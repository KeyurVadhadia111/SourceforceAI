import { MenuItemProps } from "components/utils/datatypes";
import Icon from "components/utils/Icon";
import { useAppState } from "components/utils/useAppState";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export const sidebarItems: MenuItemProps[] = [
	{
		title: "Sourcing Request",
		icon: "asterisk-simple",
		url: "/news-sourcing-request",
		active: false,
		id: 1,
	},
	{
		title: "Suppliers",
		icon: "cube-focus",
		url: "/news-sourcing-request",
		active: false,
		id: 2,
	},
	{
		title: "Factory",
		icon: "factory",
		url: "/news-sourcing-request",
		active: false,
		id: 3,
	},
	{
		title: "Presentation",
		icon: "presentation-chart",
		url: "/news-sourcing-request",
		active: false,
		id: 4,
	},
	{
		title: "Manufacturers",
		icon: "heart-half",
		url: "/news-sourcing-request",
		active: false,
		id: 5,
	},
	{
		title: "RFQs",
		icon: "policy",
		url: "/news-sourcing-request",
		active: false,
		id: 6,
	},
	{
		title: "Terms & Conditions",
		icon: "chat-circle-text",
		url: "/news-sourcing-request",
		active: false,
		id: 7,
	},
];

export default function Sidebar() {
	const [{ isDark, userDetails }, setAppState] = useAppState();
	const [isOpen, setIsOpen] = useState(false);
	const sidebarRef = useRef<HTMLDivElement>(null);
	const [sidebarItem, setSidebarItem] = useState(sidebarItems[0]);
	const handleClickOutside = (event: MouseEvent) => {
		if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
			setIsOpen(false); // Close the sidebar
		}
	};

	useEffect(() => {
		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen]);

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
		if (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches) {
			document.documentElement.classList.add("dark");
			isDark = true;
		}
		if (isDark) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
		setAppState({ isDark: isDark });
	};

	return (
		<>
			<div className="w-[104px] sm:block hidden">
				<div className=" inline-flex flex-col items-center justify-between p-6 relative flex-[0_0_auto] bg-[#1e2d2a] h-full">
					<div className="inline-flex flex-col items-start gap-12 relative flex-[0_0_auto]">
						<img className="relative w-14 h-14" alt="Group" src="/assets/images/logo/logo-primary.svg" />

						<div className="inline-flex flex-col items-start gap-3 relative flex-[0_0_auto]">
							{sidebarItems.map(item => {
								return (
									<Link
										key={item.id}
										to={item.url || ""}
										onClick={() => {
											setSidebarItem(item);
										}}
										className="relative w-14 h-14 flex items-center justify-center">
										{item.id === sidebarItem.id && (
											<img
												className="absolute w-[3px] h-[59px] top-[0] -left-6"
												alt="Line"
												src="https://c.animaapp.com/wtIZUsNi/img/line-3-7.svg"
											/>
										)}
										<Icon icon={item.icon || ""} className="w-8 h-8" />
									</Link>
								);
							})}
						</div>
					</div>

					<img
						className="relative w-14 h-14 object-cover"
						alt="Photo by evan wise"
						src="https://c.animaapp.com/wtIZUsNi/img/photo-by-evan-wise-9@2x.png"
					/>
				</div>
			</div>
		</>
	);
}

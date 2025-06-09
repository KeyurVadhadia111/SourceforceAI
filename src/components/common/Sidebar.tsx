import { Button, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Icon from "components/utils/Icon";
import { Separator } from "components/utils/Separator";
import { useAppState } from "components/utils/useAppState";
import { use, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
// import SimpleBar from "simplebar-react";

export default function Sidebar() {
	const [{ isDark, userDetails }, setAppState] = useAppState();
	const [isOpen, setIsOpen] = useState(false);
	const sidebarRef = useRef<HTMLDivElement>(null);
	const location = useLocation();

	const navItems = [
		{ title: "Home", href: "/", authRequired: false },
		{ title: "Radar & Maps", href: "#", authRequired: true },
		{ title: "Weather A.I.", href: "/weather-ai", authRequired: false },
		{ title: "Go Premium", href: "/premium-plan", authRequired: true },
		{ title: "Top Stories", href: "/top-stories", authRequired: false },
		{ title: "Alerts", href: "/alerts", authRequired: false },
		{ title: "Setting", href: "/settings", authRequired: true },
	];

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
			<div className="w-[104px]">
				<div className=" inline-flex flex-col items-center justify-between p-6 relative flex-[0_0_auto] bg-[#1e2d2a] h-dvh">
					<div className="inline-flex flex-col items-start gap-12 relative flex-[0_0_auto]">
						<img
							className="relative w-14 h-14"
							alt="Group"
							src="/assets/images/logo/logo-primary.svg"
						/>

						<div className="inline-flex flex-col items-start gap-3 relative flex-[0_0_auto]">
							<div className="relative w-14 h-14 flex items-center justify-center">
								<Icon icon="asterisk-simple" className="w-8 h-8" />
							</div>

							<div className="relative w-14 h-14 flex items-center justify-center">
								<Icon icon="cube-focus" className="w-8 h-8" />
							</div>

							<div className="relative w-14 h-14 flex items-center justify-center">
								<Icon icon="factory" className="w-8 h-8" />
							</div>

							<div className="relative w-14 h-14 flex items-center justify-center">
								<Icon icon="presentation-chart" className="w-8 h-8" />
							</div>

							<div className="relative w-14 h-14 flex items-center justify-center">
								<Icon icon="heart-half" className="w-8 h-8" />
							</div>

							<div className="relative w-14 h-14 flex items-center justify-center">
								<Icon icon="policy" className="w-8 h-8" />
							</div>

							<div className="relative w-14 h-14 flex items-center justify-center">
								<Icon icon="chat-circle-text" className="w-8 h-8" />
							</div>
						</div>
					</div>

					<img
						className="relative w-14 h-14 object-cover"
						alt="Photo by evan wise"
						src="https://c.animaapp.com/wtIZUsNi/img/photo-by-evan-wise-9@2x.png"
					/>

					<img
						className="absolute w-[3px] h-[59px] top-[126px] left-px"
						alt="Line"
						src="https://c.animaapp.com/wtIZUsNi/img/line-3-7.svg"
					/>
				</div>
			</div>
		</>
	);
}

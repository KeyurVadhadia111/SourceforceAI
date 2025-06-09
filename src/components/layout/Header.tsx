import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Sidebar from "components/common/Sidebar";
import Icon from "components/utils/Icon";
import ProfileMenu from "components/utils/ProfileMenu";
import { useAppState } from "components/utils/useAppState";
import { use, useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
	const [{ isDark, userDetails }, setAppState] = useAppState();

	// Navigation menu items
	const navItems = [
		{ title: "Home", href: "/", authRequired: false },
		{ title: "Radar & Maps", href: "/radar-maps", authRequired: true },
		{ title: "Weather A.I.", href: "/weather-ai", authRequired: false },
		{ title: "Go Premium", href: "/premium-plan", authRequired: true },
		{ title: "Top Stories", href: "/top-stories", authRequired: false },
		{ title: "Severe Weather", href: "/severe-weather", authRequired: false },
	];

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
		<div className="">
			<div className="flex w-full items-center justify-between px-8 py-6 relative border-b border-[#ced6d3] ">
				<div className="inline-flex items-center gap-2.5 relative flex-[0_0_auto]">
					<img
						className="relative w-[189.66px] h-[21.2px]"
						alt="Union"
						src="https://c.animaapp.com/wtIZUsNi/img/union-9.svg"
					/>

					<div className="relative w-6 h-6">
						<img
							className="w-3 h-1.5 top-[9px] absolute left-1.5"
							alt="Direction down"
							src="https://c.animaapp.com/wtIZUsNi/img/direction-down-9@2x.png"
						/>
					</div>
				</div>

				<div className="inline-flex items-center gap-4 relative flex-[0_0_auto]">
					<div className="inline-flex items-center p-1 relative flex-[0_0_auto] bg-[#eef1f0] rounded-[100px]">
						<div className="flex w-12 h-12 items-center justify-center gap-2.5 px-[3px] py-0.5 relative bg-white rounded-[100px]">
							<img
								className="relative w-6 h-6"
								alt="Cloud sun"
								src="https://c.animaapp.com/wtIZUsNi/img/cloudsun-7.svg"
							/>
						</div>

						<div className="flex w-12 h-12 items-center justify-center gap-2.5 px-[3px] py-0.5 relative rounded-[100px] overflow-hidden">
							<img
								className="relative w-6 h-6"
								alt="Cloud moon"
								src="https://c.animaapp.com/wtIZUsNi/img/cloudmoon-9.svg"
							/>
						</div>
					</div>

					<div className="inline-flex items-center justify-center gap-3 px-8 py-4 relative flex-[0_0_auto] bg-[#529e7e] rounded-[40px]">
						<img
							className="relative w-6 h-6"
							alt="Export"
							src="https://c.animaapp.com/wtIZUsNi/img/export-9.svg"
						/>

						<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Bold',Helvetica] font-bold text-white text-base tracking-[0] leading-6 whitespace-nowrap">
							Share
						</div>
					</div>
				</div>

				<div className="absolute w-6 h-6 top-10 -left-3 bg-white rounded-[100px]">
					<div className="relative w-4 h-4 top-1 left-1">
						<img
							className="w-1 h-2 top-1 absolute left-1.5"
							alt="Direction right"
							src="https://c.animaapp.com/wtIZUsNi/img/direction-right-9@2x.png"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

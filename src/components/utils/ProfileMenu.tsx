import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useAppState } from "./useAppState";
import { Link } from "react-router-dom";
import Icon from "./Icon";

interface Props {}

const ProfileMenu: React.FC<Props> = () => {
	const [{ isDark, userDetails }, setAppState] = useAppState();

	return (
		<Menu as="div" className="relative">
			<div>
				<MenuButton className="relative flex rounded-full bg-bgc dark:!bg-text border border-bgc dark:border-text text-sm focus:ring-0 focus:outline-hidden cursor-pointer">
					<span className="absolute -inset-1" />
					<span className="sr-only">Open user menu</span>
					<img
						className="relative w-12 h-12"
						alt="Photo by evan wise"
						src="/assets/images/photo-by-evan-wise.png"
					/>
				</MenuButton>
			</div>
			<MenuItems
				modal={false}
				transition
				anchor="bottom start"
				className="absolute right-0 z-10 w-48 origin-top-right rounded-md bg-bgc dark:bg-fgcDark shadow-[0_20px_35px_rgba(0,0,0,0.05)] ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in [--anchor-gap:4px] sm:[--anchor-gap:8px]">
				<Menu.Item>
					{({ active }) => (
						<div className="px-4 py-2 text-sm font-medium items-center border-b border-border dark:border-border-dark">
							<div className="leading-[150%]">signed in as</div>
							<div className="text-textSecondary dark:text-textDark truncate">
								{userDetails?.email || "riddhi@gmail.com"}
							</div>
						</div>
					)}
				</Menu.Item>
				<div className="py-1.5">
					<MenuItem>
						<Link
							to="/profile"
							className={`flex gap-2 items-center px-4 py-1.5 text-sm data-focus:bg-gray-100 data-focus:outline-hidden hover:bg-bgc dark:hover:bg-bgcDark font-medium ${location.pathname === "/profile" ? "text-primary" : "text-text dark:text-textDark"}`}>
								<Icon icon={isDark ? "user-dark" : "user"} className={`w-[18px] h-[18px]`} />
							Profile
						</Link>
					</MenuItem>

					<MenuItem>
						<Link
							to="/login"
							className="flex gap-2 items-center px-4 py-1.5 text-sm text-text dark:text-textDark data-focus:bg-gray-100 data-focus:outline-hidden hover:bg-bgc dark:hover:bg-bgcDark font-medium"
							onClick={() => {
								localStorage.removeItem("auth");
								setAppState({ userDetails: {} });
							}}>
								<Icon icon={isDark ? "logout" : "logout-light"} className={`w-[18px] h-[18px]`} />
							Logout
						</Link>
					</MenuItem>
				</div>
			</MenuItems>
		</Menu>
	);
};

export default ProfileMenu;

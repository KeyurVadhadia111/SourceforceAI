import { Menu, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useAppState } from "./useAppState";
import Icon from "./Icon";
import { cn } from "lib/utils";
import { MenuProps } from "./datatypes";

const MenuComponent: React.FC<MenuProps> = ({ items, children, isProfile = false, className }) => {
	const [{ user }, setAppState] = useAppState();
	return (
		<Menu as="div" className="relative">
			<div>
				<Menu.Button className="p-1.5">{children}</Menu.Button>
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
					className={cn(
						"absolute",
						"right-0 z-10",
						"mt-2",
						"w-max",
						"rounded-xl",
						"border-border dark:border-border-dark dark:border bg-bgc dark:bg-bgc-dark",
						"ring-1 ring-black ring-opacity-",
						"focus:outline-none",
						className,
					)}>
					{isProfile && user && (
						<Menu.Item>
							{({ active }) => (
								<div className="px-4 py-2 flex gap-2 items-center border-b border-border dark:border-border-dark">
									<Icon icon="user-circle" size={32} />
									<div>
										<div>{user?.firstName}</div>
										<div className="text-textSecondary dark:text-textSecondary-dark">
											{user?.email}
										</div>
									</div>
								</div>
							)}
						</Menu.Item>
					)}
					{items.map((item, index) => {
						if (item.isHide) return null;

						return (
							<Menu.Item key={index}>
								{({ active }) => (
									<Link
										onClick={item.onClick}
										to={item.url || "#"}
										className={cn(
											active || item.active ? "bg-fgc dark:bg-fgc-dark  text-primary" : "",
											"block px-4 py-2 text-sm",
											"hover:bg-fgc dark:hover:bg-fgc-dark",
											item.className,
											// index === 0 && "rounded-t-xl",
											// items.filter(item => !item.isHide)?.length - 1 === index && "rounded-b-xl",
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
					<div className="inline-flex items-center gap-4 relative justify-center">
						<div className="inline-flex items-center p-1 relative flex-[0_0_auto] bg-tgc rounded-[100px]">
							<div className="flex w-12 h-12 items-center justify-center gap-2.5 px-[3px] py-0.5 relative bg-white rounded-[100px]">
								<Icon className="relative w-6 h-6" icon="cloud-sun" />
							</div>

							<div className="flex w-12 h-12 items-center justify-center gap-2.5 px-[3px] py-0.5 relative rounded-[100px] overflow-hidden">
								<Icon className="relative w-6 h-6" icon="cloud-moon" />
							</div>
						</div>

						<div className="inline-flex items-center justify-center gap-3 px-8 py-4 relative flex-[0_0_auto] bg-primary rounded-[40px]">
							<Icon className="relative w-6 h-6" icon="export" />

							<div className="relative w-fit mt-[-1.00px]  font-bold text-white text-base tracking-[0] leading-6 whitespace-nowrap">
								Share
							</div>
						</div>
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
};

export default MenuComponent;

import { Button } from "components/utils/Button";
import Icon from "components/utils/Icon";
import { useAppState } from "components/utils/useAppState";
import { cn } from "lib/utils";
import { GetHelp } from "pages/HelpAndSupportPage";
import React from "react";
import { Link } from "react-router-dom";
import SimpleBar from "simplebar-react";

const ProfileLayout: React.FC<{ children: any; title: string; desc: string }> = ({ children, desc, title }) => {
	const [{ isProfileSettingTab = true, isMobile }, setAppState] = useAppState();
	const tabItems = [
		{
			label: "Profile",
			url: "/profile",
		},
		{
			label: "Subscription",
			url: "/subscription",
		},
		{
			label: "Security",
			url: "/security",
		},
		{
			label: "Help & Support",
			url: "/help-support",
		},
	];
	return (
		<SimpleBar className="sm:h-[calc(100dvh-72px)] h-[calc(100dvh-56px)]">
			{" "}
			<div className="flex flex-col items-start gap-6 sm:p-[23px] p-6 relative self-stretch w-full flex-[0_0_auto] sm:border border-border dark:border-borderDark">
				<div className="flex lg:flex-row flex-col items-start justify-between relative self-stretch w-full flex-[0_0_auto] sm:gap-8 gap-4">
					<div className="flex flex-col lg:w-[242px] w-full items-start sm:gap-10 gap-6 relative">
						<div className="relative [font-family:'Satoshi',Helvetica] font-bold text-text dark:text-textDark sm:text-[32px] text-lg  sm:leading-[45px] leading-[25px] tracking-[0px]">
							Settings
						</div>
						{/* {(isProfileSettingTab) && ( */}
						<div className={`flex-col items-start sm:gap-4 gap-3 relative self-stretch w-full flex-[0_0_auto] ${!isProfileSettingTab ? "hidden" : "flex"} lg:flex`}>
							{tabItems.map((tab, ind) => {
								return (
									<Link
										key={"profile_tab_" + ind}
										to={tab.url}
										onClick={() => {
											setAppState({ isProfileSettingTab: false });
										}}
										className={cn(
											"flex items-center gap-2.5 sm:px-[30px] px-[20px] sm:py-3.5 py-[13.5px] relative self-stretch w-full rounded-[40px]",
											location.pathname === tab.url
												? "bg-primary text-white"
												: "bg-fgc dark:bg-fgcDark text-text dark:text-textDark",
										)}>
										<div className="relative w-fit [font-family:'Satoshi',Helvetica] font-medium sm:text-base text-sm tracking-[0] sm:!leading-[24px] !leading-[21px] whitespace-nowrap">
											{tab.label}
										</div>
									</Link>
								);
							})}
						</div>
						{/* )} */}
					</div>

					{/* {(!isProfileSettingTab) && ( */}
					<div className={`flex flex-col lg:w-[calc(100%-274px)] w-full items-center sm:gap-[30px] gap-4 sm:p-[29px] p-[15px] relative bg-white dark:bg-bgcDark sm:rounded-[20px] rounded-2xl border border-border dark:border-borderDark ${isProfileSettingTab ? "hidden" : "flex"} lg:flex`}>
						<div className="flex flex-col items-start gap-2 relative self-stretch w-full">
							<div className="relative  flex items-center gap-3">
								<div className="lg:!hidden w-[18px] h-[18px] flex justify-center items-center">
									<Icon
										onClick={() => {
											setAppState({ isProfileSettingTab: true });
										}}
										icon="chevron-left"
										size={9}
										className="dark:text-textDark"
									/>
								</div>
								<div className="max-sm:w-[calc(100%-30px)] [font-family:'Satoshi',Helvetica] font-bold text-text dark:text-textDark sm:text-2xl text-lg sm:leading-[33px] leading-[25px] tracking-normal">
									{title}
								</div>
							</div>

							<div className="relative self-stretch [font-family:'Satoshi',Helvetica] font-normal text-textSecondary dark:text-textSecondaryDark sm:text-base text-xs tracking-[0] leading-[150%]">
								{desc}
							</div>
						</div>

						<div className="w-full h-px dark:h-[0.5px] bg-border dark:border-borderDark" />

						{children}
					</div>
					{/* )} */}
					{location.pathname === "/help-support" && !isProfileSettingTab && (
						<div className="flex w-full sm:hidden">
							<GetHelp />
						</div>
					)}
				</div>
			</div>
		</SimpleBar>
	);
};

export default ProfileLayout;

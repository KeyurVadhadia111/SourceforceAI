import { Button } from "components/utils/Button";
import Icon from "components/utils/Icon";
import { useAppState } from "components/utils/useAppState";
import { cn } from "lib/utils";
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
		<SimpleBar className="sm:h-[calc(100dvh-104px)] h-[calc(100dvh-56px)]">
			{" "}
			<div className="flex flex-col items-start gap-6 sm:p-[23px] p-6 relative self-stretch w-full flex-[0_0_auto] sm:border border-border">
				<div className="flex sm:flex-row flex-col items-start justify-between relative self-stretch w-full flex-[0_0_auto] sm:gap-8 gap-4">
					<div className="flex flex-col sm:w-[242px] w-full items-start sm:gap-10 gap-6 relative">
						<div className="relative [font-family:'Satoshi',Helvetica] font-bold text-text sm:text-[32px] text-lg  sm:leading-[45px] leading-[25px] tracking-[0px]">
							Settings
						</div>
						{(isProfileSettingTab || !isMobile) && (
							<div className="flex flex-col items-start sm:gap-4 gap-3 relative self-stretch w-full flex-[0_0_auto] ">
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
													: "bg-fgc text-text",
											)}>
											<div className="relative w-fit [font-family:'Satoshi',Helvetica] font-medium sm:text-base text-sm tracking-[0] sm:!leading-[24px] !leading-[21px] whitespace-nowrap">
												{tab.label}
											</div>
										</Link>
									);
								})}
							</div>
						)}
					</div>

					{(!isProfileSettingTab || !isMobile) && (
						<div className="flex flex-col sm:w-[calc(100%-274px)] w-full items-center sm:gap-[30px] gap-4 sm:p-[29px] p-[15px] relative bg-white sm:rounded-[20px] rounded-2xl border border-border">
							<div className="flex flex-col items-start gap-2 relative self-stretch w-full">
								<div className="relative  flex items-center gap-3">
									<div className="sm:!hidden w-[18px] h-[18px] flex justify-center items-center">
										<Icon
											onClick={() => {
												setAppState({ isProfileSettingTab: true });
											}}
											icon="chevron-left"
											size={9}
										/>
									</div>
									<div className="max-sm:w-[calc(100%-30px)] [font-family:'Satoshi',Helvetica] font-bold text-text sm:text-2xl text-lg sm:leading-[33px] leading-[25px] tracking-normal">
										{title}
									</div>
								</div>

								<div className="relative self-stretch [font-family:'Satoshi',Helvetica] font-normal text-textSecondary sm:text-base text-xs tracking-[0] leading-[150%]">
									{desc}
								</div>
							</div>

							<div className="w-full h-px bg-border" />

							{children}
						</div>
					)}
					{isMobile && location.pathname === "/help-support" && (
						<div className="flex flex-col items-center sm:gap-6 gap-4 relative self-stretch w-full border border-border dark:border-borderDark sm:p-[23px] p-[15px] rounded-2xl">
							<img src="/assets/images/customer-service-agent-1.svg" className="sm:h-[118px] h-[60px]" />
							<div className="flex flex-col gap-2 items-center text-center">
								<div className="[font-family:'Satoshi',Helvetica] font-bold sm:text-2xl text-lg sm:leading-[100%] leading-[140%] tracking-[0]">
									Get help
								</div>
								<div className="[font-family:'Satoshi',Helvetica] font-normal sm:text-base text-xs leading-[150%] tracking-[0] text-textSecondary">
									Our dedicated support team is here to assist you with any inquiries you may have.
								</div>
							</div>
							<Button className="w-full !py-[13px]">Get Help</Button>
						</div>
					)}
				</div>
			</div>
		</SimpleBar>
	);
};

export default ProfileLayout;

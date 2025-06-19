import ProfileLayout from "components/common/ProfileLayout";
import { Button } from "components/utils/Button";
import Icon from "components/utils/Icon";
import { Separator } from "components/utils/Separator";
import React from "react";

const HelpAndSupportPage = () => {
	return (
		<>
			<ProfileLayout title="Help & Support" desc="We're here to help, anytime you need us.">
				<div className="flex xl:flex-row flex-col gap-[30px] w-full">
					<div className="flex flex-col items-start sm:gap-6 gap-4 relative self-stretch w-full sm:border border-border dark:border-borderDark sm:p-[23px] rounded-2xl">
						<div className="flex sm:items-start items-center sm:gap-6 gap-4 relative self-stretch w-full">
							<div className="relative w-14 h-14 bg-fgc rounded-[28px] flex justify-center items-center">
								<Icon className="w-6 h-6" icon="phone" />
							</div>

							<div className="flex flex-col items-start sm:gap-1.5 gap-0 relative flex-1 grow">
								<div className="relative self-stretch [font-family:'Satoshi',Helvetica] font-bold text-text sm:text-xl text-base tracking-[0] leading-[150%]">
									Call
								</div>

								<div className="relative w-fit [font-family:'Satoshi',Helvetica] font-medium text-textSecondary sm:text-base text-xs tracking-[0] leading-[150%] whitespace-nowrap">
									+12019881578
								</div>
							</div>
						</div>

						<Separator className="!bg-border" />

						<div className="flex sm:items-start items-center sm:gap-6 gap-4 relative self-stretch w-full">
							<div className="relative w-14 h-14 bg-fgc rounded-[28px] flex justify-center items-center">
								<Icon className="w-6 h-6" icon="envelope" />
							</div>

							<div className="flex flex-col items-start sm:gap-1.5 gap-0 relative flex-1 grow">
								<div className="relative self-stretch [font-family:'Satoshi',Helvetica] font-bold text-text sm:text-xl text-base tracking-[0] leading-[150%]">
									Email
								</div>

								<div className="relative w-fit [font-family:'Satoshi',Helvetica] font-medium text-textSecondary sm:text-base text-xs tracking-[0] leading-[150%] whitespace-nowrap">
									sourceforce.info@gmail.com
								</div>
							</div>
						</div>
						<Separator className="!bg-border" />

						<div className="flex items-center sm:gap-6 gap-4 relative self-stretch w-full">
							<div className="relative w-14 h-14 bg-fgc rounded-[28px] flex justify-center items-center">
								<Icon className="w-6 h-6" icon="location" />
							</div>

							<div className="flex flex-col items-start sm:gap-1.5 gap-0 relative flex-1 grow">
								<div className="relative self-stretch [font-family:'Satoshi',Helvetica] font-bold text-text sm:text-xl text-base tracking-[0] leading-[150%]">
									Address
								</div>

								<p className="relative w-fit [font-family:'Satoshi',Helvetica] font-medium text-textSecondary sm:text-base text-xs tracking-[0] leading-[150%] sm:max-w-[311px] max-w-[180px]">
									640, DuBuque Estates, 139 Jeremy Vista Delaware, Bednarmouth, USA, 46259-5731
								</p>
							</div>
						</div>
					</div>
					<div className="hidden w-full sm:flex">
						<GetHelp />
					</div>
				</div>
			</ProfileLayout>
		</>
	);
};

export default HelpAndSupportPage;

export const GetHelp: React.FC<{ className?: string }> = ({ className }) => {
	return (
		<div
			className={`flex flex-col items-center sm:gap-6 gap-4 relative self-stretch w-full border border-border dark:border-borderDark sm:p-[23px] p-[15px] rounded-2xl ${className}`}>
			<img src="/assets/images/customer-service-agent-1.svg" className="sm:h-[118px] h-[60px]" />
			<div className="flex flex-col gap-2 items-center text-center">
				<div className="[font-family:'Satoshi',Helvetica] font-bold sm:text-2xl text-lg sm:leading-[100%] leading-[25px] tracking-[0]">
					Get help
				</div>
				<div className="font-normal sm:text-base text-xs leading-[150%] tracking-[0] text-textSecondary sm:max-w-[380px] mx-auto">
					Our dedicated support team is here to assist you with any inquiries you may have.
				</div>
			</div>
			<Button className="w-full py-[14px] sm:!py-[15px]">
				<div className="font-bold text-xs sm:text-base leading-[150%]">Get Help</div>
			</Button>
		</div>
	);
};

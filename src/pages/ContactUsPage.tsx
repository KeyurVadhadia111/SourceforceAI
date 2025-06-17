import Icon from "components/utils/Icon";
import { Input } from "components/utils/Input";
import SimpleBar from "simplebar-react";

const ContactUsPage = () => {
	return (
		<div>
			<SimpleBar className="sm:h-[calc(100dvh-104px)] h-[calc(100dvh-56px)] w-full">
				<div className="flex flex-col items-start justify-center sm:gap-6 gap-4 p-6 relative w-full sm:-mt-px sm:-mb-px sm:border-t sm:border-b border-border">
					<div className="relative w-fit [font-family:'Satoshi',Helvetica] font-bold text-text sm:text-2xl text-lg tracking-[0] leading-[150%] whitespace-nowrap">
						Contact Us
					</div>

					<div className="flex w-full sm:flex-row flex-col items-start gap-8 relative ">
						<div className="flex flex-col items-start sm:gap-5 gap-4 relative flex-1 grow w-full">
							<div className="relative w-fit [font-family:'Satoshi',Helvetica] font-bold text-text text-xl tracking-[0] leading-[150%] whitespace-nowrap">
								Send us a Message
							</div>

							<div className="flex flex-col items-start sm:gap-8 gap-4 sm:p-[30px] p-4 relative self-stretch w-full  bg-tgc sm:rounded-3xl rounded-2xl">
								<div className="flex flex-col items-start sm:gap-8 gap-5 relative self-stretch w-full">
									<div className="flex flex-col items-start sm:gap-6 gap-4 relative self-stretch w-full ">
										<Input
											placeholder="Your Name"
											postIcon="user"
											className="sm:!text-sm !text-xs sm:!pl-6 sm:!pr-2 sm:!pt-5 sm:!pb-5 !pl-4 !pt-2 !pb-2 !pr-1"
										/>
										<Input
											placeholder="Email"
											postIcon="envelope"
											className="sm:!text-sm !text-xs sm:!pl-6 sm:!pr-2 sm:!pt-5 sm:!pb-5 !pl-4 !pt-2 !pb-2 !pr-1"
										/>
										<Input
											placeholder="Phone Number"
											postIcon="phone"
											className="sm:!text-sm !text-xs sm:!pl-6 sm:!pr-2 sm:!pt-5 sm:!pb-5 !pl-4 !pt-2 !pb-2 !pr-1"
										/>
										<textarea
											name="message"
											id="message"
											placeholder="Message"
											className="sm:h-[116px] h-[72px] bg-white dark:bg-fgcDark border-transparent [font-family:'Satoshi',Helvetica] font-medium placeholder:text-text text-text sm:text-sm text-xs tracking-[0] leading-[150%] sm:rounded-[20px] rounded-2xl resize-none w-full sm:pl-6 sm:pr-2 sm:py-5 pl-4 pt-2 pb-2 pr-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border-0 focus-visible:ring-neutral-300"></textarea>
									</div>

									<div className="inline-flex items-center justify-center gap-3 px-8 sm:py-4 py-[15px] relative  bg-primary rounded-[40px]">
										<div className="relative w-fit [font-family:'Satoshi',Helvetica] font-bold text-white sm:text-base text-xs tracking-[0] leading-[150%] whitespace-nowrap">
											Submit
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="flex flex-col items-start gap-5 relative flex-1 grow">
							<div className="relative w-fit [font-family:'Satoshi',Helvetica] font-bold text-text text-xl tracking-[0] leading-[30px] whitespace-nowrap">
								Contact Information
							</div>

							<div className="flex flex-col items-start gap-8 relative self-stretch w-full ">
								<div className="flex items-start sm:gap-6 gap-3 sm:px-[23px] sm:py-[29px] p-[15px] relative self-stretch w-full  sm:rounded-3xl rounded-2xl border border-border">
									<div className="relative sm:w-14 sm:h-14 w-9 h-9 bg-fgc rounded-[28px] flex justify-center items-center">
										<Icon className="sm:w-[19px] sm:h-[19px] w-4 h-4" icon="phone" />
									</div>

									<div className="flex flex-col items-start sm:gap-1.5 gap-1 relative flex-1 grow">
										<div className="relative self-stretch [font-family:'Satoshi',Helvetica] font-bold text-text sm:text-xl text-base tracking-[0] leading-[150%]">
											Call
										</div>

										<div className="relative w-fit [font-family:'Satoshi',Helvetica] font-medium text-textSecondary sm:text-base text-xs tracking-[0] leading-[150%] whitespace-nowrap">
											+12019881578
										</div>
									</div>
								</div>

								<div className="flex items-start sm:gap-6 gap-3 sm:px-[23px] sm:py-[29px] p-[15px] relative self-stretch w-full  sm:rounded-3xl rounded-2xl border border-border">
									<div className="relative sm:w-14 sm:h-14 w-9 h-9 bg-fgc rounded-[28px] flex justify-center items-center">
										<Icon className="sm:w-[19px] sm:h-[19px] w-4 h-4" icon="envelope" />
									</div>

									<div className="flex flex-col items-start sm:gap-1.5 gap-1 relative flex-1 grow">
										<div className="relative self-stretch [font-family:'Satoshi',Helvetica] font-bold text-text sm:text-xl text-base tracking-[0] leading-[150%]">
											Email
										</div>

										<div className="relative w-fit [font-family:'Satoshi',Helvetica] font-medium text-textSecondary sm:text-base text-xs tracking-[0] leading-[150%] whitespace-nowrap">
											sourceforce.info@gmail.com
										</div>
									</div>
								</div>

								<div className="flex sm:items-center sm:gap-6 gap-3 sm:px-[23px] sm:py-[29px] p-[15px] relative self-stretch w-full  sm:rounded-3xl rounded-2xl border border-border">
									<div className="relative sm:w-14 sm:h-14 w-9 h-9 bg-fgc rounded-[28px] flex justify-center items-center">
										<Icon className="sm:w-[19px] sm:h-[19px] w-4 h-4" icon="location" />
									</div>

									<div className="flex flex-col items-start sm:gap-1.5 gap-1 relative flex-1 grow">
										<div className="relative self-stretch [font-family:'Satoshi',Helvetica] font-bold text-text sm:text-xl text-base tracking-[0] leading-[150%]">
											Address
										</div>

										<p className="relative w-fit [font-family:'Satoshi',Helvetica] font-medium text-textSecondary sm:text-base text-xs tracking-[0] leading-[150%] sm:max-w-[311px]">
											640, DuBuque Estates, 139 Jeremy Vista Delaware, Bednarmouth, USA,
											46259-5731
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</SimpleBar>
		</div>
	);
};

export default ContactUsPage;

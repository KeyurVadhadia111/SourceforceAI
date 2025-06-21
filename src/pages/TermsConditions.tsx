import Icon from "components/utils/Icon";
import SimpleBar from "simplebar-react";

const TermsConditions = () => {
	return (
		<div>
			<SimpleBar className="sm:h-[calc(100dvh-104px)] h-[calc(100dvh-56px)] w-full">
				<div className="flex flex-col items-start justify-center sm:gap-6 gap-4 p-6 sm:pt-[23px] sm:pb-[23px] relative w-full flex-[0_0_auto] sm:border-t sm:border-b border-border">
					<div className="relative w-fit font-bold text-text dark:text-textDark sm:text-2xl text-lg tracking-[0] leading-[150%] whitespace-nowrap">
						Legal Notices
					</div>
					<div className="flex flex-col items-start sm:gap-5 gap-4 sm:px-2 py-0 relative flex-[0_0_auto] ">
						<div className="flex flex-col items-start sm:gap-3 gap-2 relative self-stretch w-full flex-[0_0_auto] ">
							<p className="relative self-stretch font-bold text-text dark:text-textDark sm:text-base text-sm tracking-[0] leading-[150%] -mt-px sm:mt-0">
								Last Updated: 02 June 2025
							</p>

							<p className="relative self-stretch font-medium text-textSecondary dark:text-textSecondaryDark sm:text-sm text-xs tracking-[0] leading-[150%] mt-0.5 sm:mt-0 ">
								Welcome to Sourceforce AI. These Terms &amp; Conditions outline the rules and
								regulations for the use of our platform and services.
							</p>
						</div>

						<div className="flex flex-col items-start sm:gap-3 gap-2 relative self-stretch w-full flex-[0_0_auto] -mt-px sm:-mt-0">
							<div className="flex items-center gap-2 relative self-stretch font-bold text-text dark:text-textDark sm:text-base text-sm tracking-[0] leading-[150%] pl-[4px]">
								<span>1.</span>
								<span>Acceptance of Terms</span>
							</div>

							<p className="relative self-stretch font-medium text-textSecondary dark:text-textSecondaryDark sm:text-sm text-xs tracking-[0] leading-[150%] mt-px sm:mt-0">
								By accessing this website or using our sourcing assistant, you agree to comply with
								these terms. If you do not agree, please refrain from using our services.
							</p>
						</div>

						<div className="flex flex-col items-start sm:gap-3 gap-2 relative self-stretch w-full flex-[0_0_auto]">
							<div className="relative self-stretch font-bold text-text dark:text-textDark sm:text-base text-sm tracking-[0] leading-[150%] -mt-0.5 sm:mt-0 pl-[4px]">
								2. Use of Platform
							</div>

							<div className="flex flex-col items-start sm:gap-2.5 gap-2 relative self-stretch w-full flex-[0_0_auto] sm:-ml-px">
								<p className="relative self-stretch font-bold text-text dark:text-textDark sm:text-sm text-xs tracking-[0] leading-[150%] mt-px sm:mt-0">
									You may use Sourceforce AI only for lawful business purposes:
								</p>

								<div className="flex flex-col w-[308px] items-start sm:gap-2 gap-1.5 relative flex-[0_0_auto] mt-px sm:-mt-0">
									<div className="inline-flex items-center sm:gap-2.5 gap-1.5 relative flex-[0_0_auto]">
										<div className="sm:w-4 sm:h-4 w-[14px] h-[14px] border border-primary rounded-full flex items-center justify-center -mt-0.5 sm:-mt-0">
											<Icon icon="check" className="text-primary" size={10} />
										</div>
										<div className="relative w-fit font-medium text-textSecondary dark:text-textSecondaryDark sm:text-sm text-xs tracking-[0] leading-[150%] whitespace-nowrap">
											Submitting sourcing requests (RFQs)
										</div>
									</div>

									<div className="inline-flex items-center sm:gap-2.5 gap-1.5 relative flex-[0_0_auto]">
										<div className="sm:w-4 sm:h-4 w-[14px] h-[14px] border border-primary rounded-full flex items-center justify-center -mt-0.5 sm:-mt-0">
											<Icon icon="check" className="text-primary" size={10} />
										</div>
										<div className="relative w-fit font-medium text-textSecondary dark:text-textSecondaryDark sm:text-sm text-xs tracking-[0] leading-[150%] whitespace-nowrap">
											Reviewing supplier information
										</div>
									</div>

									<div className="flex items-center sm:gap-2.5 gap-1.5 relative self-stretch w-full flex-[0_0_auto]">
										<div className="sm:w-4 sm:h-4 w-[14px] h-[14px] border border-primary rounded-full flex items-center justify-center -mt-0.5 sm:-mt-0">
											<Icon icon="check" className="text-primary" size={10} />
										</div>
										<div className="relative w-fit font-medium text-textSecondary dark:text-textSecondaryDark sm:text-sm text-xs tracking-[0] leading-[150%] whitespace-nowrap">
											Communicating professionally with suppliers
										</div>
									</div>
								</div>
							</div>

							<div className="flex flex-col items-start sm:gap-2.5 gap-2 relative self-stretch w-full flex-[0_0_auto] -mt-px sm:-mt-0 sm:-ml-px">
								<div className="relative self-stretch font-bold text-text dark:text-textDark sm:text-sm text-xs tracking-[0] leading-[150%]">
									You must not:
								</div>

								<div className="flex flex-col w-[285px] items-start sm:gap-2 gap-1.5 relative flex-[0_0_auto] mt-px sm:-mt-0">
									<div className="flex items-center sm:gap-2.5 gap-1.5 relative self-stretch w-full flex-[0_0_auto]">
										<div className="sm:w-4 sm:h-4 w-[14px] h-[14px] border border-error rounded-full flex items-center justify-center -mt-0.5 sm:-mt-0">
											<Icon icon="x-mark" className="text-error" size={10} />
										</div>

										<p className="relative w-fit font-medium text-textSecondary dark:text-textSecondaryDark sm:text-sm text-xs tracking-[0] leading-[150%] whitespace-nowrap">
											Use bots or scraping tools to extract data
										</p>
									</div>

									<div className="flex items-center sm:gap-2.5 gap-1.5 relative self-stretch w-full flex-[0_0_auto]">
										<div className="sm:w-4 sm:h-4 w-[14px] h-[14px] border border-error rounded-full flex items-center justify-center -mt-0.5 sm:-mt-0">
											<Icon icon="x-mark" className="text-error" size={10} />
										</div>

										<p className="relative w-fit font-medium text-textSecondary dark:text-textSecondaryDark sm:text-sm text-xs tracking-[0] leading-[150%] whitespace-nowrap">
											Impersonate another person or company
										</p>
									</div>

									<div className="flex items-center sm:gap-2.5 gap-1.5 relative">
										<div className="sm:w-4 sm:h-4 w-[14px] h-[14px] border border-error rounded-full flex items-center justify-center -mt-0.5 sm:-mt-0">
											<Icon icon="x-mark" className="text-error" size={10} />
										</div>

										<p className="relative w-fit font-medium text-textSecondary dark:text-textSecondaryDark sm:text-sm text-xs tracking-[0] leading-[150%] whitespace-nowrap">
											Share misleading or false RFQ details
										</p>
									</div>
								</div>
							</div>
						</div>

						<div className="flex flex-col items-start sm:gap-3 gap-2 relative self-stretch w-full flex-[0_0_auto] -mt-0.5 sm:-mt-0">
							<div className="relative self-stretch font-bold text-text dark:text-textDark sm:text-base text-sm tracking-[0] leading-[150%] pl-[4px] -bg-conic-0">
								3. Account Responsibilities
							</div>

							<p className="relative self-stretch font-medium text-textSecondary dark:text-textSecondaryDark sm:text-sm text-xs tracking-[0] leading-[150%] mt-0.5 sm:-mt-0">
								You are responsible for keeping your login credentials secure. Any activity under your
								account will be assumed to be performed by you.
							</p>
						</div>

						<div className="flex flex-col items-start sm:gap-3 gap-2 relative self-stretch w-full flex-[0_0_auto] -mt-0.5 sm:-mt-0">
							<div className="relative self-stretch font-bold text-text dark:text-textDark sm:text-base text-sm tracking-[0] leading-[150%] pl-[3.5px]">
								4. Supplier Listings &amp; Data
							</div>

							<p className="relative self-stretch font-medium text-textSecondary dark:text-textSecondaryDark sm:text-sm text-xs tracking-[0] leading-[150%] mt-0.5 sm:-mt-0">
								While we verify supplier data to the best of our ability, we do not guarantee accuracy
								or performance. Engage with suppliers at your own discretion.
							</p>
						</div>

						<div className="flex flex-col items-start sm:gap-3 gap-2 relative self-stretch w-full flex-[0_0_auto] -mt-0.5 sm:-mt-0">
							<div className="relative self-stretch font-bold text-text dark:text-textDark sm:text-base text-sm tracking-[0] leading-[150%] pl-[4px]">
								5. Intellectual Property
							</div>

							<p className="relative self-stretch font-medium text-textSecondary dark:text-textSecondaryDark sm:text-sm text-xs tracking-[0] leading-[150%] mt-0.5 sm:-mt-0">
								All platform content including the Sourceforce AI assistant, designs, logos, and
								supplier analytics are the property of Sourceforce AI Inc. Unauthorized use is
								prohibited.
							</p>
						</div>

						<div className="flex flex-col items-start sm:gap-3 gap-2 relative self-stretch w-full flex-[0_0_auto]">
							<div className="relative self-stretch font-bold text-text dark:text-textDark sm:text-base text-sm tracking-[0] leading-[150%] pl-[4px]">
								6. Limitation of Liability
							</div>

							<p className="relative self-stretch font-medium text-textSecondary dark:text-textSecondaryDark sm:text-sm text-xs tracking-[0] leading-[150%]">
								Sourceforce AI is not liable for any direct or indirect damages arising from supplier
								interactions, delayed responses, or platform interruptions.
							</p>
						</div>

						<div className="flex flex-col items-start sm:gap-3 gap-2 relative self-stretch w-full flex-[0_0_auto] -mt-0.5 sm:-mt-0">
							<div className="flex items-center gap-1.5 relative self-stretch font-bold text-text dark:text-textDark sm:text-base text-sm tracking-[0] leading-[150%] pl-[4px]">
								<span>7.</span>
								<span>Termination</span>
							</div>

							<p className="relative self-stretch font-medium text-textSecondary dark:text-textSecondaryDark sm:text-sm text-xs tracking-[0] leading-[150%] mt-0.5 sm:-mt-0">
								We reserve the right to suspend or terminate your account if you violate these terms or
								engage in abusive behavior.
							</p>
						</div>

						<div className="flex flex-col items-start sm:gap-3 gap-2 relative self-stretch w-full flex-[0_0_auto]">
							<div className="relative self-stretch font-bold text-text dark:text-textDark sm:text-base text-sm tracking-[0] leading-[150%] pl-[4px]">
								8. Governing Law
							</div>

							<p className="relative self-stretch font-medium text-textSecondary dark:text-textSecondaryDark sm:text-sm text-xs tracking-[0] leading-[150%]">
								These Terms shall be governed and interpreted in accordance with the laws of the Hong
								Kong Special Administrative Region.
							</p>
						</div>
					</div>
				</div>
			</SimpleBar>
		</div>
	);
};

export default TermsConditions;

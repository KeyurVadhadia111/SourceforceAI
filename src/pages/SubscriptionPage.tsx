import ProfileLayout from "components/common/ProfileLayout";
import { Button } from "components/utils/Button";
import Icon from "components/utils/Icon";
import { useAppState } from "components/utils/useAppState";

const SubscriptionPage = () => {
	const [{ isExpanded }, setAppState] = useAppState();

	const subscriptionPlans = [
		{
			title: "Basic",
			price: 29,
			frequency: "month",
			description: "Lorem Ipsum is simply dummy text of the",
			features: [
				"100 AI Chat Queries/month",
				"Basic Support",
				"Standard Response Time",
				"Basic Analytics",
				"Email Support",
			],
			buttonText: "Get started",
			isPopular: false,
		},
		{
			title: "Professional",
			price: 99,
			frequency: "month",
			description: "Lorem Ipsum is simply dummy text of the",
			features: [
				"500 AI Chat Queries/month",
				"Priority Support",
				"Faster Response Time",
				"Advanced Analytics",
				"24/7 Email & Chat Support",
				"Custom Integrations",
			],
			buttonText: "Get started",
			isPopular: true,
		},
		{
			title: "Enterprise",
			price: 299,
			frequency: "month",
			description: "Lorem Ipsum is simply dummy text of the",
			features: [
				"2000 AI Chat Queries",
				"Dedicated Support Team",
				"Instant Response Time",
				"Custom Analytics",
				"24/7 Priority Support",
				"SLA Guarantee",
			],
			buttonText: "Get started",
			isPopular: false,
		},
	];

	return (
		<ProfileLayout title="Subscription" desc="Choose the perfect plan for your business needs">
			<div className={`grid xl:grid-cols-3 lg:grid-cols-1 md:grid-cols-1 grid-cols-1 items-start gap-4 relative w-full flex-[0_0_auto] ${isExpanded ? "md:!grid-cols-1 lg:!grid-cols-1" : ""}`}>
				{subscriptionPlans.map((plan, ind) => {
					return (
						<div
							key={"subscription_pan_" + ind}
							className="overflow-hidden flex flex-col items-start sm:gap-6 gap-4 sm:px-[23px] px-[15px] sm:py-[29px] py-[19px] relative flex-1 bg-white dark:bg-bgcDark rounded-2xl border border-border dark:border-borderDark h-auto self-stretch">
							<div className="flex flex-col items-start sm:gap-2 gap-1.5 relative self-stretch w-full flex-[0_0_auto]">
								<div className="self-stretch [font-family:'Satoshi',Helvetica] font-medium sm:text-2xl text-base relative text-text dark:text-textDark tracking-[0] leading-[100%]">
									{plan.title}
								</div>

								<p className="relative self-stretch [font-family:'Satoshi',Helvetica] font-normal text-textSecondary dark:text-textSecondaryDark sm:text-base text-xs tracking-[0] leading-[150%]">
									{plan.description}
								</p>
							</div>

							<p className="relative self-stretch [font-family:'Rubik',Helvetica] font-normal text-text dark:text-textDark sm:text-[32px] text-[20px] tracking-[0] leading-[150%]">
								<span className="font-bold">${plan.price}</span>

								<span className="sm:text-xl text-base leading-[150%]">/{plan.frequency}</span>
							</p>

							<Button className="w-full sm:!py-4 !py-[15px] !border-0">
								<div className="relative w-fit [font-family:'Satoshi',Helvetica] font-bold text-white sm:text-base text-xs tracking-[0] leading-[150%] whitespace-nowrap">
									{plan.buttonText}
								</div>
							</Button>

							<div className="relative self-stretch w-full h-px bg-border dark:border-borderDark" />

							<div className="relative self-stretch [font-family:'Satoshi',Helvetica] font-medium text-text dark:text-textDark sm:text-lg text-sm tracking-[0] leading-[100%]">
								Includes
							</div>

							<div className="flex flex-col items-start sm:gap-5 gap-3 relative self-stretch w-full flex-[0_0_auto]">
								{plan.features.map((item, i) => {
									return (
										<div
											key={"features_" + i}
											className="flex items-center sm:gap-3 gap-2 relative w-full">
											<div className="relative sm:p-0.5 sm:w-6 sm:h-6 w-4 h-4 p-[1.33px] flex items-center justify-center bg-primary rounded-full">
												<Icon icon="check" className="sm:w-3.5 sm:h-3.5 w-2 h-2 text-white" />
											</div>

											<div className="relative [font-family:'Satoshi',Helvetica] font-normal text-text dark:text-textDark sm:text-base text-xs tracking-[0] leading-[150%]">
												{item}
											</div>
										</div>
									);
								})}
							</div>
							{plan.isPopular && (
								<div className="inline-flex items-center gap-2 sm:pl-1.5 sm:pr-3 sm:py-1.5 pl-1 py-0.5 pr-2 absolute top-0 right-0 bg-primary sm:rounded-[0px_0px_0px_16px] rounded-[0px_0px_0px_12px]">
									<div className="relative sm:w-5 sm:h-5 w-[14px] h-[14px] bg-white rounded-[10px] flex justify-center items-center">
										<Icon
											className="absolute sm:w-2.5 sm:h-[9px] w-1.5 h-1.5 text-primary"
											icon="star"
										/>
									</div>

									<div className="relative w-fit [font-family:'Satoshi',Helvetica] font-normal text-white sm:text-sm text-xs tracking-[0] sm:leading-[21px] leading-[18px] whitespace-nowrap">
										Popular
									</div>
								</div>
							)}
						</div>
					);
				})}
			</div>
		</ProfileLayout>
	);
};

export default SubscriptionPage;

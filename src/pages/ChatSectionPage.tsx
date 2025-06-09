import { classNames } from "components/utils";
import { Button } from "components/utils/Button";
import Icon from "components/utils/Icon";
import React from "react";
import SimpleBar from "simplebar-react";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={classNames("p-6 rounded-xl border bg-card text-card-foreground shadow", className)}
		{...props}
	/>
));

function Badge({ className, variant, ...props }: any) {
	return (
		<div
			className={classNames(
				`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground`,
				className,
			)}
			{...props}
		/>
	);
}

const ChatSectionPage = () => {
	const engagementPoints = [
		"Identify the common characteristics and features of leading B2B platforms that facilitate high engagement and positive feedback.",
		"Research best practices for optimizing company profiles and listings on B2B platforms to attract attention and encourage interaction.",
		"Investigate the primary factors that contribute to high response rates from potential clients or partners on B2B platforms, including...",
	];
	const statistics = [
		{
			icon: "supplier",
			value: "14",
			label: "Suppliers Found",
		},
		{
			icon: "rating",
			value: "4.3",
			label: "Avg Rating",
		},
		{
			icon: "review",
			value: "89%",
			label: "Response Rate",
		},
		{
			icon: "blueprint",
			value: "85094090",
			label: "HS Code",
		},
	];

	// Data for filter tags
	const filterTags = ["Kitchen Appliances", "Portable", "OEM Available"];

	// Data for suppliers
	const suppliers = [
		{
			id: 1,
			name: "TechCorp Manufacturing",
			logo: "/random-pp-2.svg",
			country: "China",
			rating: "4.8",
			badges: ["VIP", "Verified"],
			moq: "500 pieces",
			location: "Dongguan, Guangdong",
			responseRate: "95% response",
			tags: ["Kitchen Appliances", "Portable", "OEM Available"],
		},
		{
			id: 2,
			name: "Global Tools Ltd",
			logo: "/random-pp.svg",
			country: "China",
			rating: "4.8",
			badges: ["VIP"],
			moq: "500 pieces",
			location: "Guangzhou, Guangdong",
			responseRate: "94% response",
			tags: ["Portable", "OEM Available"],
		},
		{
			id: 3,
			name: "Pacific Electronics",
			logo: "/random-pp-3.svg",
			country: "China",
			rating: "4.8",
			badges: ["Verified"],
			moq: "500 pieces",
			location: "Ningbo, Zhejiang",
			responseRate: "90% response",
			tags: ["Kitchen Appliances", "OEM Available"],
		},
		{
			id: 4,
			name: "BlendTech Manufacturing",
			logo: "/random-pp-1.svg",
			country: "China",
			rating: "4.8",
			badges: ["VIP", "Verified"],
			moq: "500 pieces",
			location: "Dongguan, Guangdong",
			responseRate: "87% response",
			tags: ["OEM Available"],
		},
	];

	return (
		<div className="flex w-full">
			<section className="flex flex-col w-[445px] border-r border-[#ced6d3] self-stretch items-center justify-start overflow-auto">
				<SimpleBar className="flex flex-col h-[calc(100dvh-287px)] overflow-auto justify-start gap-6 w-full p-6 pb-0">
					{/* User query */}
					<div className="flex flex-col items-end gap-2.5 pl-[72px] pr-0 py-0 w-full">
						<Card className="w-full bg-[#eef1f0] rounded-[20px] p-5 shadow-none border-none">
							<div className="">
								<p className="font-normal text-[#1e2d2a] text-sm leading-[21px]">
									I need top suppliers for portable blenders from China with high response rates and
									good reviews.
								</p>
							</div>
						</Card>
					</div>

					{/* AI response section */}
					<div className="flex flex-col items-start gap-4">
						<div>
							{/* AI icon */}
							<Icon className="relative w-10 h-10 text-primary" icon="ai" />
							{/* AI response text */}
							<p className="font-normal text-[#1e2d2a] text-base leading-6 w-full">
								Here are top-rated suppliers for portable blenders from China. Filtered by high response
								rates (&gt;85%) and average rating above 4.0.
							</p>
						</div>

						{/* B2B Platform Engagement Indicators card */}
						<Card className="w-full bg-[#eef1f0] rounded-[20px] p-5 shadow-none border-none">
							<div className="flex flex-col gap-4">
								<h3 className="font-bold text-[#1e2d2a] text-sm leading-[21px]">
									B2B Platform Engagement Indicators
								</h3>

								<div className="flex flex-col gap-3">
									{engagementPoints.map((point, index) => (
										<p key={index} className="font-normal text-[#1e2d2a] text-sm leading-[21px]">
											{point}
										</p>
									))}

									<button className="text-left font-bold text-[#529e7e] text-sm leading-[21px]">
										Read More
									</button>
								</div>
							</div>
						</Card>

						{/* Action buttons */}
						<div className="flex items-center gap-3">
							<Icon icon="like" className="w-5 h-5" />

							<Icon icon="dislike" className="w-5 h-5" />

							<Icon icon="share-network" className="w-5 h-5" />

							<Icon icon="kebab" className="w-5 h-5" />
						</div>
					</div>
				</SimpleBar>

				{/* Input area */}
				<div className="p-6 w-full">
					<Card className="mt-auto w-full border border-solid border-[#ced6d3] rounded-[20px] p-5">
						<div className=" flex flex-col gap-5">
							<p className="text-[#5f726e] text-base leading-6">Ask anything...</p>

							<div className="flex items-center justify-between w-full">
								<div className="flex items-center gap-2.5">
									<div className="w-10 h-10 bg-[#eef1f0] !rounded-full p-2.5 cursor-pointer">
										<Icon
											icon="plus"
											className="w-full h-full bg-primary p-1 text-textDark rounded-full align-baseline"
										/>
									</div>

									<Button
										variant="none"
										className="h-10 flex items-center gap-2.5 px-4 py-2.5 bg-[#eef1f0] rounded-[90px]">
										<Icon icon="magnifying-glass-outline" className="w-5 h-5" />
										<span className="font-medium text-[#5f726e] text-sm leading-[21px]">
											Company SearchIcon
										</span>
									</Button>
								</div>

								<div className="w-10 h-10 bg-primary !rounded-full p-2.5 cursor-pointer">
									<Icon icon="send" className="w-full h-full text-white align-baseline mb-1" />
								</div>
							</div>
						</div>
					</Card>
				</div>
			</section>
			<SimpleBar className="flex flex-col border border-solid border-[#ced6d3] w-[calc(100%-445px)] h-[calc(100dvh-105px)] overflow-auto">
				{/* Header */}
				<div className="flex items-center justify-between p-6 border-b border-[#ced6d3]">
					<h2 className="font-bold text-[#1e2d2a] text-xl leading-[30px]">Best Match Summary</h2>

					<div className="flex items-center gap-3">
						<button className="inline-flex items-center justify-center gap-2 whitespace-nowrap !bg-[#eef1f0] px-5 py-2.5 !text-[#5f726e] !rounded-full !border-none text-sm">
							Export
							<svg width="10" height="5" fill="none" viewBox="0 0 10 5" className="ml-1">
								<path
									d="M1 1l4 3 4-3"
									stroke="#5F726E"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</button>

						<button className="inline-flex items-center justify-center gap-2 whitespace-nowrap !bg-[#eef1f0] px-5 py-2.5 !text-[#5f726e] !rounded-full !border-none text-sm">
							Create
							<svg width="10" height="5" fill="none" viewBox="0 0 10 5" className="ml-1">
								<path
									d="M1 1l4 3 4-3"
									stroke="#5F726E"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</button>
					</div>
				</div>

				{/* Statistics */}
				<div className="flex items-start gap-6 pt-6 pb-4 px-6 border-b border-[#ced6d3]">
					{statistics.map((stat, index) => (
						<div key={index} className="flex items-start gap-4 flex-1">
							<div className="flex w-10 h-10 items-center justify-center p-2 bg-[#f8f8f8] rounded-full">
								<Icon icon={stat.icon} className="w-5 h-5" />
							</div>
							<div className="flex flex-col gap-2">
								<div className="font-bold text-[#1e2d2a] text-xl leading-[26px]">{stat.value}</div>
								<div className="font-medium text-[#5f726e] text-sm leading-[21px]">{stat.label}</div>
							</div>
						</div>
					))}
				</div>

				{/* Filter Tags */}
				<div className="flex items-center gap-6 pt-4 pb-6 px-6 border-b border-[#ced6d3]">
					<div className="font-medium text-[#1e2d2a] text-sm leading-[21px]">Best Match Summary</div>
					<div className="flex flex-wrap gap-2.5">
						{filterTags.map((tag, index) => (
							<Badge
								key={index}
								variant="outline"
								className="px-6 py-2.5 h-10 !rounded-full text-[#5f726e] text-sm font-medium border-[#ced6d3]">
								{tag}
							</Badge>
						))}
					</div>
				</div>

				{/* Results */}
				<div className="flex flex-col gap-6 p-6 relative">
					<div className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
						<p className="relative w-fit [font-family:'Satoshi-Bold',Helvetica] font-bold text-[#1e2d2a] text-2xl tracking-[0] leading-9 whitespace-nowrap">
							Results (32)
						</p>

						<div className="inline-flex items-start justify-center gap-3 relative flex-[0_0_auto]">
							<div className="flex w-10 h-10 items-center justify-center gap-2.5 p-2 relative bg-[#eef1f0] rounded-[50px]">
								<img
									className="relative w-5 h-5"
									alt="Checkerboard"
									src="https://c.animaapp.com/wtIZUsNi/img/checkerboard-4.svg"
								/>
							</div>

							<div className="flex w-10 h-10 items-center justify-center gap-2.5 p-2 relative bg-[#eef1f0] rounded-[50px]">
								<img
									className="relative w-5 h-5"
									alt="Square half bottom"
									src="https://c.animaapp.com/wtIZUsNi/img/squarehalfbottom-4.svg"
								/>
							</div>

							<div className="inline-flex h-10 items-center gap-2 px-4 py-2.5 relative flex-[0_0_auto] bg-[#eef1f0] rounded-[90px]">
								<img
									className="relative w-5 h-5"
									alt="Circles three plus"
									src="https://c.animaapp.com/wtIZUsNi/img/circlesthreeplus.svg"
								/>

								<div className="relative w-fit mt-[-1.50px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#5f726e] text-sm tracking-[0] leading-[21px] whitespace-nowrap">
									Filter
								</div>
							</div>
						</div>
					</div>

					{/* Supplier Cards */}
					<div className="w-full">
						<div className="grid grid-cols-2 items-start gap-6 relative w-full">
							<div className="flex flex-col items-start justify-center gap-4 p-4 relative flex-1 grow bg-white rounded-[20px] border border-solid border-[#ced6d3]">
								<div className="flex flex-col items-start gap-3 relative self-stretch w-full flex-[0_0_auto]">
									<div className="flex items-start gap-8 relative self-stretch w-full flex-[0_0_auto]">
										<div className="flex items-start justify-between relative flex-1 grow">
											<div className="inline-flex items-center gap-3 relative flex-[0_0_auto]">
												<img
													className="relative w-[42.5px] h-[42px] ml-[-0.50px]"
													alt="Random PP"
													src="https://c.animaapp.com/wtIZUsNi/img/random-pp-15.svg"
												/>

												<div className="inline-flex items-start gap-3 relative flex-[0_0_auto]">
													<div className="inline-flex flex-col items-start gap-1 relative flex-[0_0_auto]">
														<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Bold',Helvetica] font-bold text-[#1e2d2a] text-base text-center tracking-[0] leading-6 whitespace-nowrap">
															Global Tools Ltd
														</div>

														<div className="inline-flex items-center gap-2.5 relative flex-[0_0_auto]">
															<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#5f726e] text-sm tracking-[0] leading-[21px] whitespace-nowrap">
																China
															</div>

															<div className="relative w-1.5 h-1.5 bg-[#ced6d3] rounded-[3px]" />

															<div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
																<img
																	className="relative w-[11.07px] h-[10.62px]"
																	alt="Star"
																	src="https://c.animaapp.com/wtIZUsNi/img/star-5-27.svg"
																/>

																<div className="[font-family:'Satoshi-Regular',Helvetica] font-normal text-[#5f726e] relative w-fit mt-[-1.00px] text-sm tracking-[0] leading-[21px] whitespace-nowrap">
																	4.8
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>

											<img
												className="relative w-6 h-6"
												alt="Bookmark simple"
												src="https://c.animaapp.com/wtIZUsNi/img/bookmarksimple-15.svg"
											/>
										</div>
									</div>

									<div className="flex h-[26px] items-center gap-2.5 relative self-stretch w-full">
										<div className="inline-flex items-center gap-2.5 relative self-stretch flex-[0_0_auto]">
											<div className="inline-flex items-center justify-center gap-2 px-3 py-1 relative flex-[0_0_auto] bg-[#f5b14c1a] rounded-[30px] border-[0.5px] border-solid border-[#f5b14c]">
												<img
													className="relative w-4 h-4"
													alt="Crown"
													src="https://c.animaapp.com/wtIZUsNi/img/crown-26.svg"
												/>

												<div className="relative w-fit mt-[-0.50px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#f5b14c] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
													VIP
												</div>
											</div>
										</div>
									</div>
								</div>

								<div className="flex items-start justify-between relative self-stretch w-full flex-[0_0_auto]">
									<div className="inline-flex flex-col items-start justify-center gap-3 relative flex-[0_0_auto]">
										<div className="inline-flex items-center gap-2.5 relative flex-[0_0_auto]">
											<img
												className="relative w-5 h-5"
												alt="Cube"
												src="https://c.animaapp.com/wtIZUsNi/img/cube-30.svg"
											/>

											<div className="relative w-fit [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#1e2d2a] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
												MOQ: 500 pieces
											</div>
										</div>

										<div className="inline-flex items-center gap-2.5 relative flex-[0_0_auto]">
											<img
												className="relative w-5 h-5"
												alt="Map pin area"
												src="https://c.animaapp.com/wtIZUsNi/img/mappinarea-28.svg"
											/>

											<div className="relative w-fit [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#1e2d2a] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
												Guangzhou, Guangdong
											</div>
										</div>
									</div>

									<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#529e7e] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
										94% response
									</div>
								</div>

								<div className="flex flex-wrap w-[361.5px] h-[34px] items-start gap-[10px_10px] relative">
									<div className="inline-flex items-center gap-2.5 px-4 py-2 relative flex-[0_0_auto] rounded-[90px] border border-solid border-[#ced6d3]">
										<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#5f726e] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
											Portable
										</div>
									</div>

									<div className="inline-flex items-center gap-2.5 px-4 py-2 relative flex-[0_0_auto] rounded-[90px] border border-solid border-[#ced6d3]">
										<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#5f726e] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
											OEM Available
										</div>
									</div>
								</div>

								<div className="flex items-center gap-4 relative self-stretch w-full flex-[0_0_auto]">
									<div className="flex h-10 items-center justify-center gap-4 px-8 py-1.5 relative flex-1 grow rounded-[50px] overflow-hidden border border-solid border-[#529e7e]">
										<div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
											<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#529e7e] text-sm tracking-[0] leading-[22px] whitespace-nowrap">
												View Profile
											</div>
										</div>
									</div>

									<div className="flex h-10 items-center justify-center gap-2.5 px-8 py-1.5 relative flex-1 grow bg-[#529e7e] rounded-[50px] overflow-hidden">
										<div className="relative w-fit [font-family:'Satoshi-Medium',Helvetica] font-medium text-white text-sm tracking-[0] leading-[22px] whitespace-nowrap">
											Send RFQ
										</div>
									</div>
								</div>
							</div>

							<div className="flex flex-col items-start justify-center gap-4 p-4 relative flex-1 grow bg-white rounded-[20px] border border-solid border-[#ced6d3]">
								<div className="flex flex-col items-start gap-3 relative self-stretch w-full flex-[0_0_auto]">
									<div className="flex items-start gap-8 relative self-stretch w-full flex-[0_0_auto]">
										<div className="flex items-start justify-between relative flex-1 grow">
											<div className="inline-flex items-center gap-3 relative flex-[0_0_auto]">
												<img
													className="relative w-[42px] h-[42px]"
													alt="Random PP"
													src="https://c.animaapp.com/wtIZUsNi/img/random-pp-16.svg"
												/>

												<div className="inline-flex items-start gap-3 relative flex-[0_0_auto]">
													<div className="inline-flex flex-col items-start gap-1 relative flex-[0_0_auto]">
														<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Bold',Helvetica] font-bold text-[#1e2d2a] text-base text-center tracking-[0] leading-6 whitespace-nowrap">
															TechCorp Manufacturing
														</div>

														<div className="inline-flex items-center gap-2.5 relative flex-[0_0_auto]">
															<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#5f726e] text-sm tracking-[0] leading-[21px] whitespace-nowrap">
																China
															</div>

															<div className="relative w-1.5 h-1.5 bg-[#ced6d3] rounded-[3px]" />

															<div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
																<img
																	className="relative w-[11.07px] h-[10.62px]"
																	alt="Star"
																	src="https://c.animaapp.com/wtIZUsNi/img/star-5-22.svg"
																/>

																<div className="relative w-fit mt-[-1.00px] opacity-70 [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#5f726e] text-xs text-right tracking-[0] leading-[18px] whitespace-nowrap">
																	4.8
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>

											<img
												className="relative w-6 h-6"
												alt="Bookmark simple"
												src="https://c.animaapp.com/wtIZUsNi/img/bookmarksimple-13.svg"
											/>
										</div>
									</div>

									<div className="flex h-[26px] items-center gap-2.5 relative self-stretch w-full">
										<div className="inline-flex items-center gap-2.5 relative self-stretch flex-[0_0_auto]">
											<div className="inline-flex items-center justify-center gap-2 px-3 py-1 relative flex-[0_0_auto] bg-[#f5b14c1a] rounded-[30px] border-[0.5px] border-solid border-[#f5b14c]">
												<img
													className="relative w-4 h-4"
													alt="Crown"
													src="https://c.animaapp.com/wtIZUsNi/img/crown-21.svg"
												/>

												<div className="relative w-fit mt-[-0.50px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#f5b14c] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
													VIP
												</div>
											</div>

											<div className="inline-flex items-center justify-center gap-2 px-3 py-0 relative self-stretch flex-[0_0_auto] bg-[#67c6941a] rounded-[30px] border-[0.5px] border-solid border-[#529e7e]">
												<img
													className="relative w-4 h-4"
													alt="Target"
													src="https://c.animaapp.com/wtIZUsNi/img/target-15.svg"
												/>

												<div className="relative w-fit [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#529e7e] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
													Verified
												</div>
											</div>
										</div>
									</div>
								</div>

								<div className="flex items-start justify-between relative self-stretch w-full flex-[0_0_auto]">
									<div className="inline-flex flex-col items-start justify-center gap-3 relative flex-[0_0_auto]">
										<div className="inline-flex items-center gap-2.5 relative flex-[0_0_auto]">
											<img
												className="relative w-5 h-5"
												alt="Cube"
												src="https://c.animaapp.com/wtIZUsNi/img/cube-22.svg"
											/>

											<div className="relative w-fit [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#1e2d2a] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
												MOQ: 500 pieces
											</div>
										</div>

										<div className="inline-flex items-center gap-2.5 relative flex-[0_0_auto]">
											<img
												className="relative w-5 h-5"
												alt="Map pin area"
												src="https://c.animaapp.com/wtIZUsNi/img/mappinarea-23.svg"
											/>

											<div className="relative w-fit [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#1e2d2a] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
												Dongguan, Guangdong
											</div>
										</div>
									</div>

									<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#529e7e] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
										95% response
									</div>
								</div>

								<div className="flex flex-wrap w-[361.5px] h-[34px] items-start gap-[10px_10px] relative">
									<div className="inline-flex items-center gap-2.5 px-4 py-2 relative flex-[0_0_auto] rounded-[90px] border border-solid border-[#ced6d3]">
										<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#5f726e] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
											Kitchen Appliances
										</div>
									</div>

									<div className="inline-flex items-center gap-2.5 px-4 py-2 relative flex-[0_0_auto] rounded-[90px] border border-solid border-[#ced6d3]">
										<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#5f726e] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
											Portable
										</div>
									</div>

									<div className="inline-flex items-center gap-2.5 px-4 py-2 relative flex-[0_0_auto] rounded-[90px] border border-solid border-[#ced6d3]">
										<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#5f726e] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
											OEM Available
										</div>
									</div>
								</div>

								<div className="flex items-center gap-4 relative self-stretch w-full flex-[0_0_auto]">
									<div className="flex h-10 items-center justify-center gap-4 px-8 py-1.5 relative flex-1 grow rounded-[50px] overflow-hidden border border-solid border-[#529e7e]">
										<div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
											<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#529e7e] text-sm tracking-[0] leading-[22px] whitespace-nowrap">
												View Profile
											</div>
										</div>
									</div>

									<div className="flex h-10 items-center justify-center gap-2.5 px-8 py-1.5 relative flex-1 grow bg-[#529e7e] rounded-[50px] overflow-hidden">
										<div className="relative w-fit [font-family:'Satoshi-Medium',Helvetica] font-medium text-white text-sm tracking-[0] leading-[22px] whitespace-nowrap">
											Send RFQ
										</div>
									</div>
								</div>
							</div>

							<div className="flex flex-col items-start justify-center gap-4 p-4 relative flex-1 grow bg-white rounded-[20px] border border-solid border-[#ced6d3]">
								<div className="flex flex-col items-start gap-3 relative self-stretch w-full flex-[0_0_auto]">
									<div className="flex items-start gap-8 relative self-stretch w-full flex-[0_0_auto]">
										<div className="flex items-start justify-between relative flex-1 grow">
											<div className="inline-flex items-center gap-3 relative flex-[0_0_auto]">
												<img
													className="relative w-[42.5px] h-[42px] ml-[-0.50px]"
													alt="Random PP"
													src="https://c.animaapp.com/wtIZUsNi/img/random-pp-17.svg"
												/>

												<div className="inline-flex items-start gap-3 relative flex-[0_0_auto]">
													<div className="inline-flex flex-col items-start gap-1 relative flex-[0_0_auto]">
														<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Bold',Helvetica] font-bold text-[#1e2d2a] text-base text-center tracking-[0] leading-6 whitespace-nowrap">
															Global Tools Ltd
														</div>

														<div className="inline-flex items-center gap-2.5 relative flex-[0_0_auto]">
															<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#5f726e] text-sm tracking-[0] leading-[21px] whitespace-nowrap">
																China
															</div>

															<div className="relative w-1.5 h-1.5 bg-[#ced6d3] rounded-[3px]" />

															<div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
																<img
																	className="relative w-[11.07px] h-[10.62px]"
																	alt="Star"
																	src="https://c.animaapp.com/wtIZUsNi/img/star-5-23.svg"
																/>

																<div className="[font-family:'Satoshi-Regular',Helvetica] font-normal text-[#5f726e] relative w-fit mt-[-1.00px] text-sm tracking-[0] leading-[21px] whitespace-nowrap">
																	4.8
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>

											<img
												className="relative w-6 h-6"
												alt="Bookmark simple"
												src="https://c.animaapp.com/wtIZUsNi/img/bookmarksimple-11.svg"
											/>
										</div>
									</div>

									<div className="flex h-[26px] items-center gap-2.5 relative self-stretch w-full">
										<div className="inline-flex items-center gap-2.5 relative self-stretch flex-[0_0_auto]">
											<div className="inline-flex items-center justify-center gap-2 px-3 py-1 relative flex-[0_0_auto] bg-[#f5b14c1a] rounded-[30px] border-[0.5px] border-solid border-[#f5b14c]">
												<img
													className="relative w-4 h-4"
													alt="Crown"
													src="https://c.animaapp.com/wtIZUsNi/img/crown-22.svg"
												/>

												<div className="relative w-fit mt-[-0.50px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#f5b14c] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
													VIP
												</div>
											</div>
										</div>
									</div>
								</div>

								<div className="flex items-start justify-between relative self-stretch w-full flex-[0_0_auto]">
									<div className="inline-flex flex-col items-start justify-center gap-3 relative flex-[0_0_auto]">
										<div className="inline-flex items-center gap-2.5 relative flex-[0_0_auto]">
											<img
												className="relative w-5 h-5"
												alt="Cube"
												src="https://c.animaapp.com/wtIZUsNi/img/cube-23.svg"
											/>

											<div className="relative w-fit [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#1e2d2a] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
												MOQ: 500 pieces
											</div>
										</div>

										<div className="inline-flex items-center gap-2.5 relative flex-[0_0_auto]">
											<img
												className="relative w-5 h-5"
												alt="Map pin area"
												src="https://c.animaapp.com/wtIZUsNi/img/mappinarea-24.svg"
											/>

											<div className="relative w-fit [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#1e2d2a] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
												Guangzhou, Guangdong
											</div>
										</div>
									</div>

									<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#529e7e] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
										94% response
									</div>
								</div>

								<div className="flex flex-wrap w-[361.5px] h-[34px] items-start gap-[10px_10px] relative">
									<div className="inline-flex items-center gap-2.5 px-4 py-2 relative flex-[0_0_auto] rounded-[90px] border border-solid border-[#ced6d3]">
										<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#5f726e] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
											Portable
										</div>
									</div>

									<div className="inline-flex items-center gap-2.5 px-4 py-2 relative flex-[0_0_auto] rounded-[90px] border border-solid border-[#ced6d3]">
										<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#5f726e] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
											OEM Available
										</div>
									</div>
								</div>

								<div className="flex items-center gap-4 relative self-stretch w-full flex-[0_0_auto]">
									<div className="flex h-10 items-center justify-center gap-4 px-8 py-1.5 relative flex-1 grow rounded-[50px] overflow-hidden border border-solid border-[#529e7e]">
										<div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
											<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#529e7e] text-sm tracking-[0] leading-[22px] whitespace-nowrap">
												View Profile
											</div>
										</div>
									</div>

									<div className="flex h-10 items-center justify-center gap-2.5 px-8 py-1.5 relative flex-1 grow bg-[#529e7e] rounded-[50px] overflow-hidden">
										<div className="relative w-fit [font-family:'Satoshi-Medium',Helvetica] font-medium text-white text-sm tracking-[0] leading-[22px] whitespace-nowrap">
											Send RFQ
										</div>
									</div>
								</div>
							</div>

							<div className="flex flex-col items-start justify-center gap-4 p-4 relative flex-1 grow bg-white rounded-[20px] border border-solid border-[#ced6d3]">
								<div className="flex flex-col items-start gap-3 relative self-stretch w-full flex-[0_0_auto]">
									<div className="flex items-start gap-8 relative self-stretch w-full flex-[0_0_auto]">
										<div className="flex items-start justify-between relative flex-1 grow">
											<div className="inline-flex items-center gap-3 relative flex-[0_0_auto]">
												<img
													className="relative w-[42px] h-[42px]"
													alt="Random PP"
													src="https://c.animaapp.com/wtIZUsNi/img/random-pp-18.svg"
												/>

												<div className="inline-flex items-start gap-3 relative flex-[0_0_auto]">
													<div className="inline-flex flex-col items-start gap-1 relative flex-[0_0_auto]">
														<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Bold',Helvetica] font-bold text-[#1e2d2a] text-base text-center tracking-[0] leading-6 whitespace-nowrap">
															BlendTech Manufacturing
														</div>

														<div className="inline-flex items-center gap-2.5 relative flex-[0_0_auto]">
															<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#5f726e] text-sm tracking-[0] leading-[21px] whitespace-nowrap">
																China
															</div>

															<div className="relative w-1.5 h-1.5 bg-[#ced6d3] rounded-[3px]" />

															<div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
																<img
																	className="relative w-[11.07px] h-[10.62px]"
																	alt="Star"
																	src="https://c.animaapp.com/wtIZUsNi/img/star-5-27.svg"
																/>

																<div className="[font-family:'Satoshi-Regular',Helvetica] font-normal text-[#5f726e] relative w-fit mt-[-1.00px] text-sm tracking-[0] leading-[21px] whitespace-nowrap">
																	4.8
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>

											<img
												className="relative w-6 h-6"
												alt="Bookmark simple"
												src="https://c.animaapp.com/wtIZUsNi/img/bookmarksimple-12.svg"
											/>
										</div>
									</div>

									<div className="flex h-[26px] items-center gap-2.5 relative self-stretch w-full">
										<div className="inline-flex items-center gap-2.5 relative self-stretch flex-[0_0_auto]">
											<div className="inline-flex items-center justify-center gap-2 px-3 py-1 relative flex-[0_0_auto] bg-[#f5b14c1a] rounded-[30px] border-[0.5px] border-solid border-[#f5b14c]">
												<img
													className="relative w-4 h-4"
													alt="Crown"
													src="https://c.animaapp.com/wtIZUsNi/img/crown-26.svg"
												/>

												<div className="relative w-fit mt-[-0.50px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#f5b14c] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
													VIP
												</div>
											</div>

											<div className="inline-flex items-center justify-center gap-2 px-3 py-0 relative self-stretch flex-[0_0_auto] bg-[#67c6941a] rounded-[30px] border-[0.5px] border-solid border-[#529e7e]">
												<img
													className="relative w-4 h-4"
													alt="Target"
													src="https://c.animaapp.com/wtIZUsNi/img/target-19.svg"
												/>

												<div className="relative w-fit [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#529e7e] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
													Verified
												</div>
											</div>
										</div>
									</div>
								</div>

								<div className="flex items-start justify-between relative self-stretch w-full flex-[0_0_auto]">
									<div className="inline-flex flex-col items-start justify-center gap-3 relative flex-[0_0_auto]">
										<div className="inline-flex items-center gap-2.5 relative flex-[0_0_auto]">
											<img
												className="relative w-5 h-5"
												alt="Cube"
												src="https://c.animaapp.com/wtIZUsNi/img/cube-30.svg"
											/>

											<div className="relative w-fit [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#1e2d2a] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
												MOQ: 500 pieces
											</div>
										</div>

										<div className="inline-flex items-center gap-2.5 relative flex-[0_0_auto]">
											<img
												className="relative w-5 h-5"
												alt="Map pin area"
												src="https://c.animaapp.com/wtIZUsNi/img/mappinarea-28.svg"
											/>

											<div className="relative w-fit [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#1e2d2a] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
												Dongguan, Guangdong
											</div>
										</div>
									</div>

									<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#529e7e] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
										87% response
									</div>
								</div>

								<div className="flex flex-wrap w-[361.5px] h-[34px] items-start gap-[10px_10px] relative">
									<div className="inline-flex items-center gap-2.5 px-4 py-2 relative flex-[0_0_auto] rounded-[90px] border border-solid border-[#ced6d3]">
										<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#5f726e] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
											OEM Available
										</div>
									</div>
								</div>

								<div className="flex items-center gap-4 relative self-stretch w-full flex-[0_0_auto]">
									<div className="flex h-10 items-center justify-center gap-4 px-8 py-1.5 relative flex-1 grow rounded-[50px] overflow-hidden border border-solid border-[#529e7e]">
										<div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
											<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#529e7e] text-sm tracking-[0] leading-[22px] whitespace-nowrap">
												View Profile
											</div>
										</div>
									</div>

									<div className="flex h-10 items-center justify-center gap-2.5 px-8 py-1.5 relative flex-1 grow bg-[#529e7e] rounded-[50px] overflow-hidden">
										<div className="relative w-fit [font-family:'Satoshi-Medium',Helvetica] font-medium text-white text-sm tracking-[0] leading-[22px] whitespace-nowrap">
											Send RFQ
										</div>
									</div>
								</div>
							</div>

							<div className="flex flex-col items-start justify-center gap-4 p-4 relative flex-1 grow bg-white rounded-[20px] border border-solid border-[#ced6d3]">
								<div className="flex flex-col items-start gap-3 relative self-stretch w-full flex-[0_0_auto]">
									<div className="flex items-center gap-8 relative self-stretch w-full flex-[0_0_auto]">
										<div className="flex items-start justify-between relative flex-1 grow">
											<div className="inline-flex items-center gap-3 relative flex-[0_0_auto]">
												<img
													className="relative w-[42px] h-[42px]"
													alt="Random PP"
													src="https://c.animaapp.com/wtIZUsNi/img/random-pp-19.svg"
												/>

												<div className="inline-flex items-start gap-3 relative flex-[0_0_auto]">
													<div className="inline-flex flex-col items-start gap-1 relative flex-[0_0_auto]">
														<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Bold',Helvetica] font-bold text-[#1e2d2a] text-base text-center tracking-[0] leading-6 whitespace-nowrap">
															Pacific Electronics
														</div>

														<div className="inline-flex items-center gap-2.5 relative flex-[0_0_auto]">
															<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#5f726e] text-sm tracking-[0] leading-[21px] whitespace-nowrap">
																China
															</div>

															<div className="relative w-1.5 h-1.5 bg-[#ced6d3] rounded-[3px]" />

															<div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
																<img
																	className="relative w-[11.07px] h-[10.62px]"
																	alt="Star"
																	src="https://c.animaapp.com/wtIZUsNi/img/star-5-22.svg"
																/>

																<div className="[font-family:'Satoshi-Regular',Helvetica] font-normal text-[#5f726e] relative w-fit mt-[-1.00px] text-sm tracking-[0] leading-[21px] whitespace-nowrap">
																	4.8
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>

											<img
												className="relative w-6 h-6"
												alt="Bookmark simple"
												src="https://c.animaapp.com/wtIZUsNi/img/bookmarksimple-13.svg"
											/>
										</div>
									</div>

									<div className="flex h-[26px] items-center gap-2.5 relative self-stretch w-full">
										<div className="inline-flex items-center gap-2.5 relative self-stretch flex-[0_0_auto]">
											<div className="inline-flex items-center justify-center gap-2 px-3 py-0 relative self-stretch flex-[0_0_auto] bg-[#67c6941a] rounded-[30px] border-[0.5px] border-solid border-[#529e7e]">
												<img
													className="relative w-4 h-4"
													alt="Target"
													src="https://c.animaapp.com/wtIZUsNi/img/target-15.svg"
												/>

												<div className="relative w-fit [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#529e7e] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
													Verified
												</div>
											</div>
										</div>
									</div>
								</div>

								<div className="flex items-start justify-between relative self-stretch w-full flex-[0_0_auto]">
									<div className="inline-flex flex-col items-start justify-center gap-3 relative flex-[0_0_auto]">
										<div className="inline-flex items-center gap-2.5 relative flex-[0_0_auto]">
											<img
												className="relative w-5 h-5"
												alt="Cube"
												src="https://c.animaapp.com/wtIZUsNi/img/cube-22.svg"
											/>

											<div className="relative w-fit [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#1e2d2a] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
												MOQ: 500 pieces
											</div>
										</div>

										<div className="inline-flex items-center gap-2.5 relative flex-[0_0_auto]">
											<img
												className="relative w-5 h-5"
												alt="Map pin area"
												src="https://c.animaapp.com/wtIZUsNi/img/mappinarea-23.svg"
											/>

											<div className="relative w-fit [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#1e2d2a] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
												Ningbo, Zhejiang
											</div>
										</div>
									</div>

									<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#529e7e] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
										90% response
									</div>
								</div>

								<div className="flex flex-wrap w-[361.5px] h-[34px] items-start gap-[10px_10px] relative">
									<div className="inline-flex items-center gap-2.5 px-4 py-2 relative flex-[0_0_auto] rounded-[90px] border border-solid border-[#ced6d3]">
										<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#5f726e] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
											Kitchen Appliances
										</div>
									</div>

									<div className="inline-flex items-center gap-2.5 px-4 py-2 relative flex-[0_0_auto] rounded-[90px] border border-solid border-[#ced6d3]">
										<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#5f726e] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
											OEM Available
										</div>
									</div>
								</div>

								<div className="flex items-center gap-4 relative self-stretch w-full flex-[0_0_auto]">
									<div className="flex h-10 items-center justify-center gap-4 px-8 py-1.5 relative flex-1 grow rounded-[50px] overflow-hidden border border-solid border-[#529e7e]">
										<div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
											<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#529e7e] text-sm tracking-[0] leading-[22px] whitespace-nowrap">
												View Profile
											</div>
										</div>
									</div>

									<div className="flex h-10 items-center justify-center gap-2.5 px-8 py-1.5 relative flex-1 grow bg-[#529e7e] rounded-[50px] overflow-hidden">
										<div className="relative w-fit [font-family:'Satoshi-Medium',Helvetica] font-medium text-white text-sm tracking-[0] leading-[22px] whitespace-nowrap">
											Send RFQ
										</div>
									</div>
								</div>
							</div>

							<div className="flex flex-col items-start justify-center gap-4 p-4 relative flex-1 grow bg-white rounded-[20px] border border-solid border-[#ced6d3]">
								<div className="flex flex-col items-start gap-3 relative self-stretch w-full flex-[0_0_auto]">
									<div className="flex items-start gap-8 relative self-stretch w-full flex-[0_0_auto]">
										<div className="flex items-start justify-between relative flex-1 grow">
											<div className="inline-flex items-center gap-3 relative flex-[0_0_auto]">
												<img
													className="relative w-[42px] h-[42px]"
													alt="Random PP"
													src="https://c.animaapp.com/wtIZUsNi/img/random-pp-20.svg"
												/>

												<div className="inline-flex items-start gap-3 relative flex-[0_0_auto]">
													<div className="inline-flex flex-col items-start gap-1 relative flex-[0_0_auto]">
														<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Bold',Helvetica] font-bold text-[#1e2d2a] text-base text-center tracking-[0] leading-6 whitespace-nowrap">
															BlendTech Manufacturing
														</div>

														<div className="inline-flex items-center gap-2.5 relative flex-[0_0_auto]">
															<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#5f726e] text-sm tracking-[0] leading-[21px] whitespace-nowrap">
																China
															</div>

															<div className="relative w-1.5 h-1.5 bg-[#ced6d3] rounded-[3px]" />

															<div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
																<img
																	className="relative w-[11.07px] h-[10.62px]"
																	alt="Star"
																	src="https://c.animaapp.com/wtIZUsNi/img/star-5-23.svg"
																/>

																<div className="[font-family:'Satoshi-Regular',Helvetica] font-normal text-[#5f726e] relative w-fit mt-[-1.00px] text-sm tracking-[0] leading-[21px] whitespace-nowrap">
																	4.8
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>

											<img
												className="relative w-6 h-6"
												alt="Bookmark simple"
												src="https://c.animaapp.com/wtIZUsNi/img/bookmarksimple-17.svg"
											/>
										</div>
									</div>

									<div className="flex h-[26px] items-center gap-2.5 relative self-stretch w-full">
										<div className="inline-flex items-center gap-2.5 relative self-stretch flex-[0_0_auto]">
											<div className="inline-flex items-center justify-center gap-2 px-3 py-1 relative flex-[0_0_auto] bg-[#f5b14c1a] rounded-[30px] border-[0.5px] border-solid border-[#f5b14c]">
												<img
													className="relative w-4 h-4"
													alt="Crown"
													src="https://c.animaapp.com/wtIZUsNi/img/crown-22.svg"
												/>

												<div className="relative w-fit mt-[-0.50px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#f5b14c] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
													VIP
												</div>
											</div>

											<div className="inline-flex items-center justify-center gap-2 px-3 py-0 relative self-stretch flex-[0_0_auto] bg-[#67c6941a] rounded-[30px] border-[0.5px] border-solid border-[#529e7e]">
												<img
													className="relative w-4 h-4"
													alt="Target"
													src="https://c.animaapp.com/wtIZUsNi/img/target-14.svg"
												/>

												<div className="relative w-fit [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#529e7e] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
													Verified
												</div>
											</div>
										</div>
									</div>
								</div>

								<div className="flex items-start justify-between relative self-stretch w-full flex-[0_0_auto]">
									<div className="inline-flex flex-col items-start justify-center gap-3 relative flex-[0_0_auto]">
										<div className="inline-flex items-center gap-2.5 relative flex-[0_0_auto]">
											<img
												className="relative w-5 h-5"
												alt="Cube"
												src="https://c.animaapp.com/wtIZUsNi/img/cube-23.svg"
											/>

											<div className="relative w-fit [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#1e2d2a] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
												MOQ: 500 pieces
											</div>
										</div>

										<div className="inline-flex items-center gap-2.5 relative flex-[0_0_auto]">
											<img
												className="relative w-5 h-5"
												alt="Map pin area"
												src="https://c.animaapp.com/wtIZUsNi/img/mappinarea-24.svg"
											/>

											<div className="relative w-fit [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#1e2d2a] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
												Dongguan, Guangdong
											</div>
										</div>
									</div>

									<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#529e7e] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
										87% response
									</div>
								</div>

								<div className="flex flex-wrap w-[361.5px] h-[34px] items-start gap-[10px_10px] relative">
									<div className="inline-flex items-center gap-2.5 px-4 py-2 relative flex-[0_0_auto] rounded-[90px] border border-solid border-[#ced6d3]">
										<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#5f726e] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
											OEM Available
										</div>
									</div>
								</div>

								<div className="flex items-center gap-4 relative self-stretch w-full flex-[0_0_auto]">
									<div className="flex h-10 items-center justify-center gap-4 px-8 py-1.5 relative flex-1 grow rounded-[50px] overflow-hidden border border-solid border-[#529e7e]">
										<div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
											<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#529e7e] text-sm tracking-[0] leading-[22px] whitespace-nowrap">
												View Profile
											</div>
										</div>
									</div>

									<div className="flex h-10 items-center justify-center gap-2.5 px-8 py-1.5 relative flex-1 grow bg-[#529e7e] rounded-[50px] overflow-hidden">
										<div className="relative w-fit [font-family:'Satoshi-Medium',Helvetica] font-medium text-white text-sm tracking-[0] leading-[22px] whitespace-nowrap">
											Send RFQ
										</div>
									</div>
								</div>
							</div>

							<div className="flex flex-col items-start justify-center gap-4 p-4 relative flex-1 grow bg-white rounded-[20px] border border-solid border-[#ced6d3]">
								<div className="flex flex-col items-start gap-3 relative self-stretch w-full flex-[0_0_auto]">
									<div className="flex items-start gap-8 relative self-stretch w-full flex-[0_0_auto]">
										<div className="flex items-start justify-between relative flex-1 grow">
											<div className="inline-flex items-center gap-3 relative flex-[0_0_auto]">
												<img
													className="relative w-[42.5px] h-[42px] ml-[-0.50px]"
													alt="Random PP"
													src="https://c.animaapp.com/wtIZUsNi/img/random-pp-21.svg"
												/>

												<div className="inline-flex items-start gap-3 relative flex-[0_0_auto]">
													<div className="inline-flex flex-col items-start gap-1 relative flex-[0_0_auto]">
														<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Bold',Helvetica] font-bold text-[#1e2d2a] text-base text-center tracking-[0] leading-6 whitespace-nowrap">
															Global Tools Ltd
														</div>

														<div className="inline-flex items-center gap-2.5 relative flex-[0_0_auto]">
															<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#5f726e] text-sm tracking-[0] leading-[21px] whitespace-nowrap">
																China
															</div>

															<div className="relative w-1.5 h-1.5 bg-[#ced6d3] rounded-[3px]" />

															<div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
																<img
																	className="relative w-[11.07px] h-[10.62px]"
																	alt="Star"
																	src="https://c.animaapp.com/wtIZUsNi/img/star-5-27.svg"
																/>

																<div className="[font-family:'Satoshi-Regular',Helvetica] font-normal text-[#5f726e] relative w-fit mt-[-1.00px] text-sm tracking-[0] leading-[21px] whitespace-nowrap">
																	4.8
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>

											<img
												className="relative w-6 h-6"
												alt="Bookmark simple"
												src="https://c.animaapp.com/wtIZUsNi/img/bookmarksimple-15.svg"
											/>
										</div>
									</div>

									<div className="flex h-[26px] items-center gap-2.5 relative self-stretch w-full">
										<div className="inline-flex items-center gap-2.5 relative self-stretch flex-[0_0_auto]">
											<div className="inline-flex items-center justify-center gap-2 px-3 py-1 relative flex-[0_0_auto] bg-[#f5b14c1a] rounded-[30px] border-[0.5px] border-solid border-[#f5b14c]">
												<img
													className="relative w-4 h-4"
													alt="Crown"
													src="https://c.animaapp.com/wtIZUsNi/img/crown-26.svg"
												/>

												<div className="relative w-fit mt-[-0.50px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#f5b14c] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
													VIP
												</div>
											</div>
										</div>
									</div>
								</div>

								<div className="flex items-start justify-between relative self-stretch w-full flex-[0_0_auto]">
									<div className="inline-flex flex-col items-start justify-center gap-3 relative flex-[0_0_auto]">
										<div className="inline-flex items-center gap-2.5 relative flex-[0_0_auto]">
											<img
												className="relative w-5 h-5"
												alt="Cube"
												src="https://c.animaapp.com/wtIZUsNi/img/cube-30.svg"
											/>

											<div className="relative w-fit [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#1e2d2a] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
												MOQ: 500 pieces
											</div>
										</div>

										<div className="inline-flex items-center gap-2.5 relative flex-[0_0_auto]">
											<img
												className="relative w-5 h-5"
												alt="Map pin area"
												src="https://c.animaapp.com/wtIZUsNi/img/mappinarea-28.svg"
											/>

											<div className="relative w-fit [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#1e2d2a] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
												Guangzhou, Guangdong
											</div>
										</div>
									</div>

									<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#529e7e] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
										94% response
									</div>
								</div>

								<div className="flex flex-wrap w-[361.5px] h-[34px] items-start gap-[10px_10px] relative">
									<div className="inline-flex items-center gap-2.5 px-4 py-2 relative flex-[0_0_auto] rounded-[90px] border border-solid border-[#ced6d3]">
										<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#5f726e] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
											Portable
										</div>
									</div>

									<div className="inline-flex items-center gap-2.5 px-4 py-2 relative flex-[0_0_auto] rounded-[90px] border border-solid border-[#ced6d3]">
										<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#5f726e] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
											OEM Available
										</div>
									</div>
								</div>

								<div className="flex items-center gap-4 relative self-stretch w-full flex-[0_0_auto]">
									<div className="flex h-10 items-center justify-center gap-4 px-8 py-1.5 relative flex-1 grow rounded-[50px] overflow-hidden border border-solid border-[#529e7e]">
										<div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
											<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#529e7e] text-sm tracking-[0] leading-[22px] whitespace-nowrap">
												View Profile
											</div>
										</div>
									</div>

									<div className="flex h-10 items-center justify-center gap-2.5 px-8 py-1.5 relative flex-1 grow bg-[#529e7e] rounded-[50px] overflow-hidden">
										<div className="relative w-fit [font-family:'Satoshi-Medium',Helvetica] font-medium text-white text-sm tracking-[0] leading-[22px] whitespace-nowrap">
											Send RFQ
										</div>
									</div>
								</div>
							</div>

							<div className="flex flex-col items-start justify-center gap-4 p-4 relative flex-1 grow bg-white rounded-[20px] border border-solid border-[#ced6d3]">
								<div className="flex flex-col items-start gap-3 relative self-stretch w-full flex-[0_0_auto]">
									<div className="flex items-start gap-8 relative self-stretch w-full flex-[0_0_auto]">
										<div className="flex items-start justify-between relative flex-1 grow">
											<div className="inline-flex items-center gap-3 relative flex-[0_0_auto]">
												<img
													className="relative w-[42px] h-[42px]"
													alt="Random PP"
													src="https://c.animaapp.com/wtIZUsNi/img/random-pp-22.svg"
												/>

												<div className="inline-flex items-start gap-3 relative flex-[0_0_auto]">
													<div className="inline-flex flex-col items-start gap-1 relative flex-[0_0_auto]">
														<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Bold',Helvetica] font-bold text-[#1e2d2a] text-base text-center tracking-[0] leading-6 whitespace-nowrap">
															TechCorp Manufacturing
														</div>

														<div className="inline-flex items-center gap-2.5 relative flex-[0_0_auto]">
															<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#5f726e] text-sm tracking-[0] leading-[21px] whitespace-nowrap">
																China
															</div>

															<div className="relative w-1.5 h-1.5 bg-[#ced6d3] rounded-[3px]" />

															<div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
																<img
																	className="relative w-[11.07px] h-[10.62px]"
																	alt="Star"
																	src="https://c.animaapp.com/wtIZUsNi/img/star-5-22.svg"
																/>

																<div className="relative w-fit mt-[-1.00px] opacity-70 [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#5f726e] text-xs text-right tracking-[0] leading-[18px] whitespace-nowrap">
																	4.8
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>

											<img
												className="relative w-6 h-6"
												alt="Bookmark simple"
												src="https://c.animaapp.com/wtIZUsNi/img/bookmarksimple-16.svg"
											/>
										</div>
									</div>

									<div className="flex h-[26px] items-center gap-2.5 relative self-stretch w-full">
										<div className="inline-flex items-center gap-2.5 relative self-stretch flex-[0_0_auto]">
											<div className="inline-flex items-center justify-center gap-2 px-3 py-1 relative flex-[0_0_auto] bg-[#f5b14c1a] rounded-[30px] border-[0.5px] border-solid border-[#f5b14c]">
												<img
													className="relative w-4 h-4"
													alt="Crown"
													src="https://c.animaapp.com/wtIZUsNi/img/crown-21.svg"
												/>

												<div className="relative w-fit mt-[-0.50px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#f5b14c] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
													VIP
												</div>
											</div>

											<div className="inline-flex items-center justify-center gap-2 px-3 py-0 relative self-stretch flex-[0_0_auto] bg-[#67c6941a] rounded-[30px] border-[0.5px] border-solid border-[#529e7e]">
												<img
													className="relative w-4 h-4"
													alt="Target"
													src="https://c.animaapp.com/wtIZUsNi/img/target-15.svg"
												/>

												<div className="relative w-fit [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#529e7e] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
													Verified
												</div>
											</div>
										</div>
									</div>
								</div>

								<div className="flex items-start justify-between relative self-stretch w-full flex-[0_0_auto]">
									<div className="inline-flex flex-col items-start justify-center gap-3 relative flex-[0_0_auto]">
										<div className="inline-flex items-center gap-2.5 relative flex-[0_0_auto]">
											<img
												className="relative w-5 h-5"
												alt="Cube"
												src="https://c.animaapp.com/wtIZUsNi/img/cube-22.svg"
											/>

											<div className="relative w-fit [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#1e2d2a] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
												MOQ: 500 pieces
											</div>
										</div>

										<div className="inline-flex items-center gap-2.5 relative flex-[0_0_auto]">
											<img
												className="relative w-5 h-5"
												alt="Map pin area"
												src="https://c.animaapp.com/wtIZUsNi/img/mappinarea-23.svg"
											/>

											<div className="relative w-fit [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#1e2d2a] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
												Dongguan, Guangdong
											</div>
										</div>
									</div>

									<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#529e7e] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
										95% response
									</div>
								</div>

								<div className="flex flex-wrap w-[361.5px] h-[34px] items-start gap-[10px_10px] relative">
									<div className="inline-flex items-center gap-2.5 px-4 py-2 relative flex-[0_0_auto] rounded-[90px] border border-solid border-[#ced6d3]">
										<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#5f726e] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
											Kitchen Appliances
										</div>
									</div>

									<div className="inline-flex items-center gap-2.5 px-4 py-2 relative flex-[0_0_auto] rounded-[90px] border border-solid border-[#ced6d3]">
										<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#5f726e] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
											Portable
										</div>
									</div>

									<div className="inline-flex items-center gap-2.5 px-4 py-2 relative flex-[0_0_auto] rounded-[90px] border border-solid border-[#ced6d3]">
										<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#5f726e] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
											OEM Available
										</div>
									</div>
								</div>

								<div className="flex items-center gap-4 relative self-stretch w-full flex-[0_0_auto]">
									<div className="flex h-10 items-center justify-center gap-4 px-8 py-1.5 relative flex-1 grow rounded-[50px] overflow-hidden border border-solid border-[#529e7e]">
										<div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
											<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#529e7e] text-sm tracking-[0] leading-[22px] whitespace-nowrap">
												View Profile
											</div>
										</div>
									</div>

									<div className="flex h-10 items-center justify-center gap-2.5 px-8 py-1.5 relative flex-1 grow bg-[#529e7e] rounded-[50px] overflow-hidden">
										<div className="relative w-fit [font-family:'Satoshi-Medium',Helvetica] font-medium text-white text-sm tracking-[0] leading-[22px] whitespace-nowrap">
											Send RFQ
										</div>
									</div>
								</div>
							</div>

							<div className="flex flex-col items-start justify-center gap-4 p-4 relative flex-1 grow bg-white rounded-[20px] border border-solid border-[#ced6d3]">
								<div className="flex flex-col items-start gap-3 relative self-stretch w-full flex-[0_0_auto]">
									<div className="flex items-start gap-8 relative self-stretch w-full flex-[0_0_auto]">
										<div className="flex items-start justify-between relative flex-1 grow">
											<div className="inline-flex items-center gap-3 relative flex-[0_0_auto]">
												<img
													className="relative w-[42.5px] h-[42px] ml-[-0.50px]"
													alt="Random PP"
													src="https://c.animaapp.com/wtIZUsNi/img/random-pp-23.svg"
												/>

												<div className="inline-flex items-start gap-3 relative flex-[0_0_auto]">
													<div className="inline-flex flex-col items-start gap-1 relative flex-[0_0_auto]">
														<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Bold',Helvetica] font-bold text-[#1e2d2a] text-base text-center tracking-[0] leading-6 whitespace-nowrap">
															Global Tools Ltd
														</div>

														<div className="inline-flex items-center gap-2.5 relative flex-[0_0_auto]">
															<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#5f726e] text-sm tracking-[0] leading-[21px] whitespace-nowrap">
																China
															</div>

															<div className="relative w-1.5 h-1.5 bg-[#ced6d3] rounded-[3px]" />

															<div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
																<img
																	className="relative w-[11.07px] h-[10.62px]"
																	alt="Star"
																	src="https://c.animaapp.com/wtIZUsNi/img/star-5-23.svg"
																/>

																<div className="[font-family:'Satoshi-Regular',Helvetica] font-normal text-[#5f726e] relative w-fit mt-[-1.00px] text-sm tracking-[0] leading-[21px] whitespace-nowrap">
																	4.8
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>

											<img
												className="relative w-6 h-6"
												alt="Bookmark simple"
												src="https://c.animaapp.com/wtIZUsNi/img/bookmarksimple-17.svg"
											/>
										</div>
									</div>

									<div className="flex h-[26px] items-center gap-2.5 relative self-stretch w-full">
										<div className="inline-flex items-center gap-2.5 relative self-stretch flex-[0_0_auto]">
											<div className="inline-flex items-center justify-center gap-2 px-3 py-1 relative flex-[0_0_auto] bg-[#f5b14c1a] rounded-[30px] border-[0.5px] border-solid border-[#f5b14c]">
												<img
													className="relative w-4 h-4"
													alt="Crown"
													src="https://c.animaapp.com/wtIZUsNi/img/crown-22.svg"
												/>

												<div className="relative w-fit mt-[-0.50px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#f5b14c] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
													VIP
												</div>
											</div>
										</div>
									</div>
								</div>

								<div className="flex items-start justify-between relative self-stretch w-full flex-[0_0_auto]">
									<div className="inline-flex flex-col items-start justify-center gap-3 relative flex-[0_0_auto]">
										<div className="inline-flex items-center gap-2.5 relative flex-[0_0_auto]">
											<img
												className="relative w-5 h-5"
												alt="Cube"
												src="https://c.animaapp.com/wtIZUsNi/img/cube-23.svg"
											/>

											<div className="relative w-fit [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#1e2d2a] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
												MOQ: 500 pieces
											</div>
										</div>

										<div className="inline-flex items-center gap-2.5 relative flex-[0_0_auto]">
											<img
												className="relative w-5 h-5"
												alt="Map pin area"
												src="https://c.animaapp.com/wtIZUsNi/img/mappinarea-24.svg"
											/>

											<div className="relative w-fit [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#1e2d2a] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
												Guangzhou, Guangdong
											</div>
										</div>
									</div>

									<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#529e7e] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
										94% response
									</div>
								</div>

								<div className="flex flex-wrap w-[361.5px] h-[34px] items-start gap-[10px_10px] relative">
									<div className="inline-flex items-center gap-2.5 px-4 py-2 relative flex-[0_0_auto] rounded-[90px] border border-solid border-[#ced6d3]">
										<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#5f726e] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
											Portable
										</div>
									</div>

									<div className="inline-flex items-center gap-2.5 px-4 py-2 relative flex-[0_0_auto] rounded-[90px] border border-solid border-[#ced6d3]">
										<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#5f726e] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
											OEM Available
										</div>
									</div>
								</div>

								<div className="flex items-center gap-4 relative self-stretch w-full flex-[0_0_auto]">
									<div className="flex h-10 items-center justify-center gap-4 px-8 py-1.5 relative flex-1 grow rounded-[50px] overflow-hidden border border-solid border-[#529e7e]">
										<div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
											<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#529e7e] text-sm tracking-[0] leading-[22px] whitespace-nowrap">
												View Profile
											</div>
										</div>
									</div>

									<div className="flex h-10 items-center justify-center gap-2.5 px-8 py-1.5 relative flex-1 grow bg-[#529e7e] rounded-[50px] overflow-hidden">
										<div className="relative w-fit [font-family:'Satoshi-Medium',Helvetica] font-medium text-white text-sm tracking-[0] leading-[22px] whitespace-nowrap">
											Send RFQ
										</div>
									</div>
								</div>
							</div>
						</div>
						{/* <ScrollBar orientation="vertical" /> */}
					</div>
				</div>
			</SimpleBar>
		</div>
	);
};

export default ChatSectionPage;

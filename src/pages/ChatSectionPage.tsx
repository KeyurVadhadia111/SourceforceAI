import { classNames } from "components/utils";
import { Button } from "components/utils/Button";
import Icon from "components/utils/Icon";
import React, { useEffect, useState } from "react";
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

interface Tag {
	label: string;
}

interface Supplier {
	id: string;
	name: string;
	image: string;
	country: string;
	rating: number;
	isBookmarked: boolean;
	isVIP: boolean;
	isVerified: boolean;
	moq: number;
	location: string;
	responseRate: number;
	tags: Tag[];
}

const suppliers: Supplier[] = [
	{
		id: "1",
		name: "Global Tools Ltd",
		image: "https://c.animaapp.com/wtIZUsNi/img/random-pp-15.svg",
		country: "China",
		rating: 4.8,
		isBookmarked: false,
		isVIP: true,
		isVerified: false,
		moq: 500,
		location: "Guangzhou, Guangdong",
		responseRate: 94,
		tags: [{ label: "Portable" }, { label: "OEM Available" }],
	},
	{
		id: "2",
		name: "TechCorp Manufacturing",
		image: "https://c.animaapp.com/wtIZUsNi/img/random-pp-16.svg",
		country: "China",
		rating: 4.8,
		isBookmarked: false,
		isVIP: true,
		isVerified: true,
		moq: 500,
		location: "Dongguan, Guangdong",
		responseRate: 95,
		tags: [{ label: "Kitchen Appliances" }, { label: "Portable" }, { label: "OEM Available" }],
	},
	{
		id: "1",
		name: "Global Tools Ltd",
		image: "https://c.animaapp.com/wtIZUsNi/img/random-pp-15.svg",
		country: "China",
		rating: 4.8,
		isBookmarked: false,
		isVIP: true,
		isVerified: false,
		moq: 500,
		location: "Guangzhou, Guangdong",
		responseRate: 94,
		tags: [{ label: "Portable" }, { label: "OEM Available" }],
	},
	{
		id: "3",
		name: "Pacific Electronics",
		image: "https://c.animaapp.com/wtIZUsNi/img/random-pp-19.svg",
		country: "China",
		rating: 4.8,
		isBookmarked: false,
		isVIP: false,
		isVerified: true,
		moq: 500,
		location: "Ningbo, Zhejiang",
		responseRate: 90,
		tags: [{ label: "Kitchen Appliances" }, { label: "OEM Available" }],
	},
	{
		id: "1",
		name: "Global Tools Ltd",
		image: "https://c.animaapp.com/wtIZUsNi/img/random-pp-15.svg",
		country: "China",
		rating: 4.8,
		isBookmarked: false,
		isVIP: true,
		isVerified: false,
		moq: 500,
		location: "Guangzhou, Guangdong",
		responseRate: 94,
		tags: [{ label: "Portable" }, { label: "OEM Available" }],
	},
	{
		id: "4",
		name: "BlendTech Manufacturing",
		image: "https://c.animaapp.com/wtIZUsNi/img/random-pp-18.svg",
		country: "China",
		rating: 4.8,
		isBookmarked: false,
		isVIP: true,
		isVerified: true,
		moq: 500,
		location: "Dongguan, Guangdong",
		responseRate: 87,
		tags: [{ label: "OEM Available" }],
	},
	{
		id: "3",
		name: "Pacific Electronics",
		image: "https://c.animaapp.com/wtIZUsNi/img/random-pp-19.svg",
		country: "China",
		rating: 4.8,
		isBookmarked: false,
		isVIP: false,
		isVerified: true,
		moq: 500,
		location: "Ningbo, Zhejiang",
		responseRate: 90,
		tags: [{ label: "Kitchen Appliances" }, { label: "OEM Available" }],
	},
];

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

	const [bookmarkedSuppliers, setBookmarkedSuppliers] = useState<Set<string>>(new Set());
	const [loading, setLoading] = useState(true);
	const [displaySuppliers, setDisplaySuppliers] = useState<Supplier[]>([]);
	const [showSummary, setShowSummary] = useState(false);

	useEffect(() => {
		// Simulating API call
		const fetchSuppliers = async () => {
			setLoading(true);
			try {
				// Replace with actual API call
				await new Promise(resolve => setTimeout(resolve, 1000));
				setDisplaySuppliers(suppliers);
			} catch (error) {
				console.error("Error fetching suppliers:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchSuppliers();
	}, []);

	const toggleBookmark = (supplierId: string) => {
		setBookmarkedSuppliers(prev => {
			const newBookmarks = new Set(prev);
			if (newBookmarks.has(supplierId)) {
				newBookmarks.delete(supplierId);
			} else {
				newBookmarks.add(supplierId);
			}
			return newBookmarks;
		});
	};

	function useIsMobile() {
		const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
		useEffect(() => {
			const onResize = () => setIsMobile(window.innerWidth <= 768);
			window.addEventListener("resize", onResize);
			return () => window.removeEventListener("resize", onResize);
		}, []);
		return isMobile;
	}

	const isMobile = useIsMobile();
	return (
		<div className="flex w-full md:flex-row flex-col">
			{(!isMobile || !showSummary) && (
				<section className="flex flex-col md:w-[445px] w-full md:border-r border-[#ced6d3] self-stretch items-center justify-start overflow-auto">
					<SimpleBar className="flex flex-col sm:h-[calc(100dvh-287px)] h-[calc(100dvh-242px)] overflow-auto justify-start gap-6 w-full p-6 py-0 sm:py-6">
						{/* User query */}
						<div className="flex flex-col items-end gap-2.5 pl-[72px] pr-0 py-0 w-full sm:mb-0 mb-4">
							<Card className="w-full bg-[#eef1f0] rounded-[20px] sm:p-5 p-4 shadow-none border-none">
								<div className="">
									<p className="font-normal text-[#1e2d2a] sm:text-sm text-xs leading-[150%] [font-family:'Satoshi-Bold',Helvetica]">
										I need top suppliers for portable blenders from China with high response rates
										and good reviews.
									</p>
								</div>
							</Card>
						</div>

						{/* AI response section */}
						<div className="flex flex-col items-start sm:gap-4 gap-[14px]">
							<div className="flex flex-col sm:gap-0 gap-1.5">
								{/* AI icon */}
								<Icon className="relative w-10 sm:h-10 h-[30px] text-primary" icon="ai" />
								{/* AI response text */}
								<p className="font-normal text-[#1e2d2a] w-full leading-[150%] [font-family:'Satoshi-Bold',Helvetica]">
									Here are top-rated suppliers for portable blenders from China. Filtered by high
									response rates (&gt;85%) and average rating above 4.0.
								</p>
							</div>

							{/* B2B Platform Engagement Indicators card */}
							<Card className="w-full bg-[#eef1f0] rounded-[20px] sm:p-5 p-4 shadow-none border-none">
								<div className="flex flex-col sm:gap-4 gap-3">
									<h3 className="font-bold text-[#1e2d2a] sm:text-sm text-xs leading-[150%] [font-family:'Satoshi-Bold',Helvetica]">
										B2B Platform Engagement Indicators
									</h3>

									<div className="flex flex-col sm:gap-3 gap-2.5">
										{engagementPoints.map((point, index) => (
											<p
												key={index}
												className="font-normal text-[#1e2d2a] sm:text-sm text-xs leading-[150%] [font-family:'Satoshi-Bold',Helvetica]">
												{point}
											</p>
										))}

										<button
											onClick={() => setShowSummary(true)}
											className="text-left font-bold text-[#529e7e] sm:text-sm text-xs leading-[150%] [font-family:'Satoshi-Bold',Helvetica]">
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
					<div className="sm:p-6 p-6 pb-0 w-full">
						<Card className="mt-auto w-full !shadow-none border border-solid border-[#ced6d3] rounded-[20px] sm:p-5 !p-4">
							<div className=" flex flex-col gap-5">
								<textarea
									id="message"
									placeholder="Ask anything..."
									className="w-full text-[#5f726e] border-none border-[#ced6d3] focus:outline-none focus:ring-0 focus:ring-[#529e7e] resize-none leading-[150%] [font-family:'Satoshi-Bold',Helvetica]"
									rows={1}
								/>
								{/* <p className="text-[#5f726e] leading-6">Ask anything...</p> */}

								<div className="flex items-center justify-between w-full flex-wrap sm:gap-0 gap-2">
									<div className="flex items-center gap-2.5">
										<div className="sm:w-10 sm:h-10 w-[34px] h-[34px] bg-[#eef1f0] !rounded-full sm:p-2.5 p-2 cursor-pointer">
											<Icon
												icon="plus"
												className="w-full h-full bg-primary p-1 text-textDark rounded-full align-baseline"
											/>
										</div>

										<Button
											variant="none"
											className="sm:h-10 h-[34px] flex items-center gap-2.5 sm:px-4 sm:py-2.5 py-2 px-[14px] bg-[#eef1f0] rounded-[90px]">
											<Icon icon="magnifying-glass-outline" className="w-5 h-5" />
											<span className="font-medium text-[#5f726e] text-sm leading-[21px]">
												Company SearchIcon
											</span>
										</Button>
									</div>

									<div className="sm:w-10 sm:h-10 w-[34px] h-[34px] bg-primary !rounded-full sm:p-2.5 p-2 cursor-pointer">
										<Icon icon="send" className="w-full h-full text-white align-baseline mb-1" />
									</div>
								</div>
							</div>
						</Card>
					</div>
				</section>
			)}
			{/* Summary Section */}
			{(!isMobile || showSummary) && (
				<SimpleBar className="flex flex-col w-full md:border border-solid border-[#ced6d3] md:w-[calc(100%-445px)] h-[calc(100dvh-105px)] overflow-auto sm:px-0 px-6">
					{/* Header */}
					<div className="flex items-center flex-wrap justify-between sm:p-6 pb-4 border-b border-[#ced6d3] sm:gap-0 gap-4">
						<div className="flex items-center gap-2">
							<div className="md:hidden block h-6 w-6 p-0.5">
								<Icon
									icon="arrow-up"
									className="-rotate-90 h-full w-full align-baseline"
									onClick={() => {
										setShowSummary(false);
									}}
								/>
							</div>
							<h2 className="font-bold text-[#1e2d2a] sm:text-xl leading-[150%] text-base">
								Best Match Summary
							</h2>
						</div>

						<div className="flex items-center gap-3 flex-wrap sm:pl-0 pl-8">
							<button className="inline-flex items-center justify-center gap-2 whitespace-nowrap !bg-[#eef1f0] px-5 sm:py-2.5 py-2 !text-[#5f726e] !rounded-full !border-none sm:text-sm text-xs leading-[150%]">
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

							<button className="inline-flex items-center justify-center gap-2 whitespace-nowrap !bg-[#eef1f0] px-5 sm:py-2.5 py-2 !text-[#5f726e] !rounded-full !border-none sm:text-sm text-xs leading-[150%]">
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
					<div className="flex items-start flex-wrap sm:gap-6 gap-4 sm:pt-6 pb-4 sm:px-6 pt-4 border-b border-[#ced6d3]">
						{statistics.map((stat, index) => (
							<div key={index} className="flex items-start gap-4 flex-1">
								<div className="flex sm:w-10 sm:h-10 w-[32px] h-[32px] items-center justify-center p-2 bg-[#f8f8f8] rounded-full">
									<Icon icon={stat.icon} className="sm:w-5 sm:h-5 w-4 h-4" />
								</div>
								<div className="flex flex-col sm:gap-2 gap-1.5">
									<div className="font-bold text-[#1e2d2a] sm:text-xl text-base leading-[130%]">
										{stat.value}
									</div>
									<div className="font-medium text-[#5f726e] sm:text-sm text-xs text-nowrap leading-[150%]">
										{stat.label}
									</div>
								</div>
							</div>
						))}
					</div>

					{/* Filter Tags */}
					<div className="flex items-center flex-wrap sm:gap-6 pt-4 sm:pb-6 sm:px-6 pb-4 gap-4 border-b border-[#ced6d3]">
						<div className="font-medium text-[#1e2d2a] sm:text-sm text-xs leading-[150%]">
							Best Match Summary
						</div>
						<div className="flex flex-wrap sm:gap-2.5 gap-2">
							{filterTags.map((tag, index) => (
								<Badge
									key={index}
									variant="outline"
									className="sm:px-6 sm:py-2.5 !px-4 !py-1.5 sm:h-10 h-[30px] !rounded-full text-[#5f726e] sm:text-sm text-xs leading-[150%] !font-medium !border-[#ced6d3] [font-family:'Satoshi-Bold',Helvetica]">
									{tag}
								</Badge>
							))}
						</div>
					</div>

					{/* Results */}
					<div className="flex flex-col gap-6 sm:p-6 py-4 relative">
						<div className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
							<p className="relative w-fit [font-family:'Satoshi-Bold',Helvetica] font-bold text-[#1e2d2a] sm:text-2xl tracking-[0] text-base leading-[150%] whitespace-nowrap">
								Results (32)
							</p>

							<div className="inline-flex items-start justify-center gap-3 relative flex-[0_0_auto]">
								<div className="flex sm:w-10 sm:h-10 w-[34px] h-[34px] items-center justify-center gap-2.5 p-2 relative bg-[#eef1f0] rounded-[50px]">
									<img
										className="relative sm:w-5 sm:h-5 w-[17px] h-[17px]"
										alt="Checkerboard"
										src="https://c.animaapp.com/wtIZUsNi/img/checkerboard-4.svg"
									/>
								</div>

								<div className="flex sm:w-10 sm:h-10 w-[34px] h-[34px] items-center justify-center gap-2.5 p-2 relative bg-[#eef1f0] rounded-[50px]">
									<img
										className="relative sm:w-5 sm:h-5 w-[17px] h-[17px]"
										alt="Square half bottom"
										src="https://c.animaapp.com/wtIZUsNi/img/squarehalfbottom-4.svg"
									/>
								</div>

								<div className="inline-flex sm:h-10 h-[34px] items-center gap-2 px-4 py-2.5 relative flex-[0_0_auto] bg-[#eef1f0] rounded-[90px]">
									<img
										className="relative sm:w-5 sm:h-5 w-[17px] h-[17px]"
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
							<div className="grid sm:grid-cols-2 grid-cols-1 items-start gap-6 relative w-full">
								{loading ? (
									// Loading skeleton
									<>
										{[1, 2, 3, 4].map(index => (
											<div
												key={`skeleton-${index}`}
												className="flex flex-col gap-4 p-4 animate-pulse bg-white rounded-[20px] border border-solid border-[#ced6d3]">
												<div className="flex items-center gap-3">
													<div className="w-[42px] h-[42px] bg-gray-200 rounded-full"></div>
													<div className="flex-1">
														<div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
														<div className="h-4 bg-gray-200 rounded w-1/2"></div>
													</div>
												</div>
												<div className="h-[26px] bg-gray-200 rounded w-1/3"></div>
												<div className="h-[34px] bg-gray-200 rounded"></div>
												<div className="flex gap-4">
													<div className="h-10 bg-gray-200 rounded-full flex-1"></div>
													<div className="h-10 bg-gray-200 rounded-full flex-1"></div>
												</div>
											</div>
										))}
									</>
								) : (
									displaySuppliers.map(supplier => (
										<div
											key={supplier.id}
											className="flex flex-col h-full items-start justify-center sm:gap-4 gap-3 sm:p-4 p-3 relative flex-1 grow bg-white rounded-[20px] border border-solid border-[#ced6d3]">
											<div className="flex flex-col items-start sm:gap-3 gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
												<div className="flex items-start gap-8 relative self-stretch w-full flex-[0_0_auto]">
													<div className="flex items-start justify-between relative flex-1 grow">
														<div className="inline-flex items-center gap-3 relative flex-[0_0_auto]">
															<img
																className="relative sm:w-[42px] sm:h-[42px] w-[32px] h-[32px]"
																alt={`${supplier.name} logo`}
																src={supplier.image}
															/>

															<div className="inline-flex items-start sm:gap-3 sgap-2.5 relative flex-[0_0_auto]">
																<div className="inline-flex flex-col items-start gap-1 relative flex-[0_0_auto]">
																	<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Bold',Helvetica] font-bold text-[#1e2d2a] text-center tracking-[0] leading-[150%] whitespace-nowrap truncate">
																		{supplier.name}
																	</div>

																	<div className="inline-flex items-center gap-2.5 relative flex-[0_0_auto]">
																		<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#5f726e] sm:text-sm tracking-[0] leading-[150%] whitespace-nowrap text-xs">
																			{supplier.country}
																		</div>

																		<div className="relative w-1.5 h-1.5 bg-[#ced6d3] rounded-[3px]" />

																		<div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
																			<Icon
																				icon="star"
																				size={11}
																				className="text-[#F5B14C]"
																			/>
																			<div className="[font-family:'Satoshi-Regular',Helvetica] font-normal text-[#5f726e] relative w-fit mt-[-1.00px] sm:text-sm text-xs tracking-[0] leading-[150%] whitespace-nowrap">
																				{supplier.rating}
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>

														<button
															onClick={() => toggleBookmark(supplier.id)}
															className="relative w-6 h-6 hover:opacity-80 transition-opacity">
															<Icon
																icon={
																	bookmarkedSuppliers.has(supplier.id)
																		? "bookmark-fill"
																		: "bookmark"
																}
																size={24}
																className={
																	bookmarkedSuppliers.has(supplier.id)
																		? "text-[#529e7e]"
																		: "text-[#CED6D3]"
																}
															/>
														</button>
													</div>
												</div>

												<div className="flex sm:h-[26px] h-[22px] items-center gap-2.5 relative self-stretch w-full">
													<div className="inline-flex items-center gap-2.5 relative self-stretch flex-[0_0_auto]">
														{supplier.isVIP && (
															<div className="inline-flex items-center justify-center gap-2 sm:px-3 px-1.5 sm:py-1 py-0.5 relative flex-[0_0_auto] bg-[#f5b14c1a] rounded-[30px] border-[0.5px] border-solid border-[#f5b14c]">
																<Icon
																	icon="crown"
																	className="text-[#F5B14C] sm:w-4 sm:h-4 w-[14px] h-[14px]"
																/>
																<div className="relative w-fit mt-[-0.50px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#f5b14c] sm:text-xs text-[10px] tracking-[0] leading-[150%] whitespace-nowrap">
																	VIP
																</div>
															</div>
														)}

														{supplier.isVerified && (
															<div className="inline-flex items-center justify-center gap-2 sm:px-3 px-1.5 sm:py-0 py-0.5 relative self-stretch flex-[0_0_auto] bg-[#67c6941a] rounded-[30px] border-[0.5px] border-solid border-[#529e7e]">
																<Icon
																	icon="shield-check"
																	className="text-[#529e7e] sm:w-4 sm:h-4 w-[14px] h-[14px]"
																/>
																<div className="relative w-fit [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#529e7e] sm:text-xs text-[10px] tracking-[0] leading-[150%]  whitespace-nowrap">
																	Verified
																</div>
															</div>
														)}
													</div>
												</div>
											</div>

											<div className="flex items-start justify-between relative self-stretch w-full flex-[0_0_auto]">
												<div className="inline-flex flex-col items-start justify-center sm:gap-3 gap-2.5 relative flex-[0_0_auto]">
													<div className="inline-flex items-center gap-2.5 relative flex-[0_0_auto]">
														<Icon
															icon="cube"
															className="sm:w-5 sm:h-5 w-4 h-4 text-[#657471]"
														/>
														<div className="relative w-fit [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#1e2d2a] sm:text-xs tracking-[0] leading-[150%] text-[10px] whitespace-nowrap">
															MOQ: {supplier.moq} pieces
														</div>
													</div>

													<div className="inline-flex items-center gap-2.5 relative flex-[0_0_auto]">
														<Icon
															icon="map-pin"
															className="sm:w-5 sm:h-5 w-4 h-4 text-[#657471]"
														/>
														<div className="relative w-fit [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#1e2d2a] sm:text-xs tracking-[0] leading-[150%] text-[10px] whitespace-nowrap">
															{supplier.location}
														</div>
													</div>
												</div>

												<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#529e7e] sm:text-xs tracking-[0] leading-[150%] text-[10px] whitespace-nowrap">
													{supplier.responseRate}% response
												</div>
											</div>

											<div className="flex flex-wrap items-start sm:gap-[10px_10px] relative gap-2">
												{supplier.tags.map((tag, index) => (
													<div
														key={index}
														className="inline-flex items-center gap-2.5 px-4 sm:py-2 py-[5px] relative flex-[0_0_auto] rounded-[90px] border border-solid border-[#ced6d3]">
														<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#5f726e] sm:text-xs text-[10px] tracking-[0] leading-[150%] whitespace-nowrap">
															{tag.label}
														</div>
													</div>
												))}
											</div>

											<div className="flex items-center sm:gap-4 gap-3 relative self-stretch w-full flex-[0_0_auto]">
												<button className="flex sm:h-10 h-[34px] items-center justify-center gap-4 px-8 py-1.5 relative flex-1 grow rounded-[50px] overflow-hidden border border-solid border-[#529e7e] hover:bg-[#529e7e10] transition-colors">
													<div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
														<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#529e7e] sm:text-sm text-xs tracking-[0] leading-[150%] whitespace-nowrap">
															View Profile
														</div>
													</div>
												</button>

												<button className="flex sm:h-10 h-[34px] items-center justify-center gap-2.5 px-8 py-1.5 relative flex-1 grow bg-[#529e7e] rounded-[50px] overflow-hidden hover:bg-[#408968] transition-colors">
													<div className="relative w-fit [font-family:'Satoshi-Medium',Helvetica] font-medium text-white sm:text-sm text-xs tracking-[0] leading-[150%] whitespace-nowrap">
														Send RFQ
													</div>
												</button>
											</div>
										</div>
									))
								)}
							</div>
							{/* <ScrollBar orientation="vertical" /> */}
						</div>
					</div>
				</SimpleBar>
			)}
		</div>
	);
};

export default ChatSectionPage;

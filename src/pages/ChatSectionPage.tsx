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
		tags: [
			{ label: "Portable" },
			{ label: "OEM Available" }
		]
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
		tags: [
			{ label: "Kitchen Appliances" },
			{ label: "Portable" },
			{ label: "OEM Available" }
		]
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
		tags: [
			{ label: "Portable" },
			{ label: "OEM Available" }
		]
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
		tags: [
			{ label: "Kitchen Appliances" },
			{ label: "OEM Available" }
		]
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
		tags: [
			{ label: "Portable" },
			{ label: "OEM Available" }
		]
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
		tags: [
			{ label: "OEM Available" }
		]
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
		tags: [
			{ label: "Kitchen Appliances" },
			{ label: "OEM Available" }
		]
	}
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
							{loading ? (
								// Loading skeleton
								<>
									{[1, 2, 3, 4].map((index) => (
										<div
											key={`skeleton-${index}`}
											className="flex flex-col gap-4 p-4 animate-pulse bg-white rounded-[20px] border border-solid border-[#ced6d3]"
										>
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
								displaySuppliers.map((supplier) => (
									<div
										key={supplier.id}
										className="flex flex-col items-start justify-center gap-4 p-4 relative flex-1 grow bg-white rounded-[20px] border border-solid border-[#ced6d3]"
									>
										<div className="flex flex-col items-start gap-3 relative self-stretch w-full flex-[0_0_auto]">
											<div className="flex items-start gap-8 relative self-stretch w-full flex-[0_0_auto]">
												<div className="flex items-start justify-between relative flex-1 grow">
													<div className="inline-flex items-center gap-3 relative flex-[0_0_auto]">
														<img
															className="relative w-[42px] h-[42px]"
															alt={`${supplier.name} logo`}
															src={supplier.image}
														/>

														<div className="inline-flex items-start gap-3 relative flex-[0_0_auto]">
															<div className="inline-flex flex-col items-start gap-1 relative flex-[0_0_auto]">
																<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Bold',Helvetica] font-bold text-[#1e2d2a] text-base text-center tracking-[0] leading-6 whitespace-nowrap">
																	{supplier.name}
																</div>

																<div className="inline-flex items-center gap-2.5 relative flex-[0_0_auto]">
																	<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#5f726e] text-sm tracking-[0] leading-[21px] whitespace-nowrap">
																		{supplier.country}
																	</div>

																	<div className="relative w-1.5 h-1.5 bg-[#ced6d3] rounded-[3px]" />

																	<div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
																		<Icon icon="star" size={11} className="text-[#F5B14C]" />
																		<div className="[font-family:'Satoshi-Regular',Helvetica] font-normal text-[#5f726e] relative w-fit mt-[-1.00px] text-sm tracking-[0] leading-[21px] whitespace-nowrap">
																			{supplier.rating}
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>

													<button
														onClick={() => toggleBookmark(supplier.id)}
														className="relative w-6 h-6 hover:opacity-80 transition-opacity"
													>
														<Icon
															icon={bookmarkedSuppliers.has(supplier.id) ? "bookmark-fill" : "bookmark"}
															size={24}
															className={bookmarkedSuppliers.has(supplier.id) ? "text-[#529e7e]" : "text-[#CED6D3]"}
														/>
													</button>
												</div>
											</div>

											<div className="flex h-[26px] items-center gap-2.5 relative self-stretch w-full">
												<div className="inline-flex items-center gap-2.5 relative self-stretch flex-[0_0_auto]">
													{supplier.isVIP && (
														<div className="inline-flex items-center justify-center gap-2 px-3 py-1 relative flex-[0_0_auto] bg-[#f5b14c1a] rounded-[30px] border-[0.5px] border-solid border-[#f5b14c]">
															<Icon icon="crown" size={16} className="text-[#F5B14C]" />
															<div className="relative w-fit mt-[-0.50px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#f5b14c] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
																VIP
															</div>
														</div>
													)}

													{supplier.isVerified && (
														<div className="inline-flex items-center justify-center gap-2 px-3 py-0 relative self-stretch flex-[0_0_auto] bg-[#67c6941a] rounded-[30px] border-[0.5px] border-solid border-[#529e7e]">
															<Icon icon="shield-check" size={16} className="text-[#529e7e]" />
															<div className="relative w-fit [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#529e7e] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
																Verified
															</div>
														</div>
													)}
												</div>
											</div>
										</div>

										<div className="flex items-start justify-between relative self-stretch w-full flex-[0_0_auto]">
											<div className="inline-flex flex-col items-start justify-center gap-3 relative flex-[0_0_auto]">
												<div className="inline-flex items-center gap-2.5 relative flex-[0_0_auto]">
													<Icon icon="cube" size={20} className="text-[#657471]" />
													<div className="relative w-fit [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#1e2d2a] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
														MOQ: {supplier.moq} pieces
													</div>
												</div>

												<div className="inline-flex items-center gap-2.5 relative flex-[0_0_auto]">
													<Icon icon="map-pin" size={20} className="text-[#657471]" />
													<div className="relative w-fit [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#1e2d2a] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
														{supplier.location}
													</div>
												</div>
											</div>

											<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#529e7e] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
												{supplier.responseRate}% response
											</div>
										</div>

										<div className="flex flex-wrap w-[361.5px] h-[34px] items-start gap-[10px_10px] relative">
											{supplier.tags.map((tag, index) => (
												<div
													key={index}
													className="inline-flex items-center gap-2.5 px-4 py-2 relative flex-[0_0_auto] rounded-[90px] border border-solid border-[#ced6d3]"
												>
													<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#5f726e] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
														{tag.label}
													</div>
												</div>
											))}
										</div>

										<div className="flex items-center gap-4 relative self-stretch w-full flex-[0_0_auto]">
											<button className="flex h-10 items-center justify-center gap-4 px-8 py-1.5 relative flex-1 grow rounded-[50px] overflow-hidden border border-solid border-[#529e7e] hover:bg-[#529e7e10] transition-colors">
												<div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
													<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#529e7e] text-sm tracking-[0] leading-[22px] whitespace-nowrap">
														View Profile
													</div>
												</div>
											</button>

											<button className="flex h-10 items-center justify-center gap-2.5 px-8 py-1.5 relative flex-1 grow bg-[#529e7e] rounded-[50px] overflow-hidden hover:bg-[#408968] transition-colors">
												<div className="relative w-fit [font-family:'Satoshi-Medium',Helvetica] font-medium text-white text-sm tracking-[0] leading-[22px] whitespace-nowrap">
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
		</div>
	);
};

export default ChatSectionPage;

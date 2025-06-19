import React, { useEffect, useState } from "react";
import Icon from "components/utils/Icon";
import SideMenu from "components/common/SideMenu";
import SupplierCard, { Supplier } from "components/common/SupplierCard";
import { useAppState } from "components/utils/useAppState";
import { suppliers } from "components/utils/consts";
import SimpleBar from "simplebar-react";
import { Button } from "components/utils/Button";
import { cn } from "lib/utils";
import { Badge, Card } from "components/utils/Card";
import { Separator } from "components/utils/Separator";
import { Input } from "components/utils/Input";

const categories = [
	{ title: "LED Light Strips", icon: "" },
	{ title: "Wireless Chargers", icon: "" },
	{ title: "Silicone Phone Cases", icon: "" },
	{ title: "Portable Blenders", icon: "" },
	{ title: "More", icon: "menu" },
];

const NewsSourcingRequest = () => {
	const [step, setStep] = useState(1);
	const [{ isDark, isExpanded }, setAppState] = useAppState();

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
	const [isOpen, setIsOpen] = useState(false);
	const [attachedFiles, setAttachedFiles] = useState<File[]>([]);

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
		const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
		useEffect(() => {
			const onResize = () => setIsMobile(window.innerWidth <= 1024);
			window.addEventListener("resize", onResize);
			return () => window.removeEventListener("resize", onResize);
		}, []);
		return isMobile;
	}

	const handleViewProfile = (supplierId: string) => {
		// Implement view profile functionality
		console.log("View profile for supplier:", supplierId);
	};

	const handleSendRFQ = (supplierId: string) => {
		// Implement RFQ functionality
		console.log("Send RFQ for supplier:", supplierId);
	};

	const isMobile = useIsMobile();

	const handleSend = () => {
		setStep(2);
	};
	return (
		<div
			className={cn(
				"flex px-0 sm:px-5 w-full py-6 sm:py-0",
				step === 1
					? "flex-col justify-center items-center sm:h-[calc(100dvh-104px)] h-[calc(100dvh-56px)]"
					: "lg:flex-row flex-col",
			)}>
			{/* Content */}
			<div className={cn("w-full", step === 1 ? "max-w-[858px]" : "lg:w-[445px] sm:border-r sm:border-border")}>
				{step === 1 ? (
					<>
						<div className="flex flex-col items-center sm:justify-center justify-start overflow-auto w-full px-6 sm:px-0 sm:gap-4 gap-[14px]">
							<h1 className="sm:text-[40px] text-[32px] text-center text-text leading-[150%] font-light  tracking-[-0.1px] [font-family:'Outfit',Helvetica]">
								Find High-Quality and{" "}
								<div className="font-bold tracking-[-0.1px]">Dependable Suppliers</div>
							</h1>
							<p className="sm:text-base text-sm leading-[150%] text-center text-textSecondary max-w-2xl tracking-[0.21px]">
								Discover top-rated, reliable suppliers instantly with our AI-powered sourcing tool.
								Ensure quality and consistency for every product with smart supplier recommendations.
							</p>
						</div>
						{/* Categories */}
						<div className="flex flex-wrap justify-center gap-3 sm:gap-4 sm:mb-6 mb-4 sm:mt-12 mt-8 sm:px-0 px-6">
							{categories.map((category, index) => (
								<div
									key={index}
									className="flex items-center border border-border rounded-full sm:px-[19px] px-[15px] sm:!py-[8.5px] text-text font-normal cursor-pointer py-[5px]">
									<span className="text-text sm:text-sm text-xs sm:leading-[21px] leading-[18px] flex sm:gap-[10px] gap-1 items-center">
										{category.title}
										{category.icon && <Icon icon={category.icon} size={14} />}
									</span>
								</div>
							))}
						</div>
					</>
				) : (
					<>
						{(!isMobile || !showSummary) && (
							<section className="flex flex-col w-full self-stretch items-center justify-start overflow-auto">
								<SimpleBar
									className={cn(
										"flex flex-col overflow-auto justify-start gap-6 w-full p-6 py-0 sm:py-6 -ml-px",
										"sm:h-[calc(100dvh-274px)] h-[calc(100dvh-248px)]",
									)}>
									{/* User query */}
									<div className="flex flex-col items-end gap-2.5 pl-[72px] pr-0 py-0 w-full sm:mb-6 mb-4">
										<Card className="w-full bg-tgc rounded-[20px] sm:!p-5 !p-4 shadow-none border-none">
											<div className="">
												<p className="font-normal text-text sm:text-sm text-xs leading-[150%] ">
													I need top suppliers for portable blenders from China with high
													response rates and good reviews.
												</p>
											</div>
										</Card>
									</div>

									{/* AI response section */}
									<div className="flex flex-col items-start sm:gap-4 gap-[14px]">
										<div className="flex flex-col sm:gap-4 gap-3.5 items-start">
											{/* AI icon */}
											{/* <Icon
												className="relative sm:w-[33px] sm:h-6 h-[22px] w-[30.25px] text-primary"
												icon="ai"
											/> */}
											<img
												src="/assets/images/ai.svg"
												className="sm:w-[33px] sm:h-[24px] w-[30.25px] h-[22px]"
											/>
											{/* AI response text */}
											<p className="font-normal text-text w-full leading-[150%] ">
												Here are top-rated suppliers for portable blenders from China. Filtered
												by high response rates (&gt;85%) and average rating above 4.0.
											</p>
										</div>

										{/* B2B Platform Engagement Indicators card */}
										<Card className="w-full bg-tgc rounded-[20px] sm:!p-5 !p-4 shadow-none border-none">
											<div className="flex flex-col sm:gap-4 gap-3">
												<h3 className="font-bold text-text sm:text-sm text-xs leading-[150%] ">
													B2B Platform Engagement Indicators
												</h3>

												<div className="flex flex-col sm:gap-3 gap-2.5">
													{engagementPoints.map((point, index) => (
														<p
															key={index}
															className="font-normal text-text sm:text-sm text-xs leading-[150%] ">
															{point}
														</p>
													))}

													<button
														onClick={() => setShowSummary(true)}
														className="text-left font-bold text-primary sm:text-sm text-xs leading-[150%] ">
														Read More
													</button>
												</div>
											</div>
										</Card>

										{/* Action buttons */}
										<div className="flex items-center gap-3">
											<Icon icon="like" className="sm:w-5 sm:h-5 h-4 w-4" />

											<Icon icon="dislike" className="sm:w-5 sm:h-5 h-4 w-4" />

											<Icon icon="share-network" className="sm:w-5 sm:h-5 h-4 w-4" />
											<Icon icon="kebab" className="sm:w-5 sm:h-5 h-4 w-4" />
										</div>
									</div>
								</SimpleBar>
							</section>
						)}
					</>
				)}

				{/* Message Input Section */}
				{(!isMobile || !showSummary) && (
					<div className={step === 2 ? "sm:p-6 p-6 pb-0 w-full" : "px-6 sm:px-0 sm:pb-0 pb-[37px]"}>
						<label
							htmlFor="message"
							className={cn(
								"bg-fgc rounded-xl flex flex-col w-full",
								step === 1 ? "sm:p-6 p-4 sm:gap-12 gap-6" : "sm:p-4 p-4 gap-6",
							)}>
							{attachedFiles.length > 0 && (
								<div className="flex items-center gap-1 mb-1 flex-wrap">
									{attachedFiles.map((file, idx) => {
										const isImage = file.type.startsWith("image/");
										return (
											<div
												key={file.name + idx}
												className={cn(
													"relative flex items-center  bg-tgc",
													isImage
														? "rounded-full p-0 w-11 h-11 min-w-[44px] min-h-[44px] max-w-[44px] max-h-[44px] overflow-hidden justify-center"
														: "rounded-full px-3 py-1 min-w-[180px] max-w-[260px] h-[44px] gap-1",
												)}
												style={{ marginRight: 4, marginBottom: 4 }}>
												{isImage ? (
													<>
														<img
															src={URL.createObjectURL(file)}
															alt={file.name}
															className="w-full h-full object-cover"
															style={{ borderRadius: "9999px" }}
															onLoad={e =>
																URL.revokeObjectURL((e.target as HTMLImageElement).src)
															}
														/>
														<button
															type="button"
															className="absolute top-0 right-0 z-10 flex items-center justify-center bg-white rounded-full shadow-sm w-5 h-5 m-0.5"
															style={{ boxShadow: "0 1px 4px 0 rgba(0,0,0,0.10)" }}
															onClick={() =>
																setAttachedFiles(prev =>
																	prev.filter((_, i) => i !== idx),
																)
															}
															aria-label={`Remove ${file.name}`}>
															<Icon
																icon="x-mark"
																className="w-3 h-3 text-textTurnery hover:text-textSecondary"
															/>
														</button>
													</>
												) : (
													<>
														<Icon icon="file" className="w-6 h-6 text-primary mr-2" />
														<div className="flex flex-col min-w-0 ml-1">
															<span className="text-text font-medium text-xs truncate max-w-[140px]">
																{file.name}
															</span>
															<span className="text-textSecondary text-[10px] leading-tight truncate max-w-[140px]">
																{file.type
																	? file.type.split("/")[1]?.toUpperCase()
																	: "File"}
															</span>
														</div>
														<button
															type="button"
															className="absolute top-0 right-0 z-10 flex items-center justify-center bg-white rounded-full shadow-sm w-5 h-5 m-0.5"
															style={{ boxShadow: "0 1px 4px 0 rgba(0,0,0,0.10)" }}
															onClick={() =>
																setAttachedFiles(prev =>
																	prev.filter((_, i) => i !== idx),
																)
															}
															aria-label={`Remove ${file.name}`}>
															<Icon
																icon="x-mark"
																className="w-3 h-3 text-textTurnery hover:text-textSecondar"
															/>
														</button>
													</>
												)}
											</div>
										);
									})}
								</div>
							)}
							<div className="flex items-center w-full">
								<textarea
									id="message"
									placeholder="Message..."
									className={cn(
										"border-none border-border focus:outline-none focus:ring-0 focus:ring-primary resize-none leading-[150%]",
										step === 1 ? "sm:w-full w-[calc(100%-32px)]" : "w-[calc(100%-32px)]",
									)}
									rows={1}
								/>

								<button
									onClick={() => {
										handleSend();
									}}
									className={cn(
										"flex items-center justify-center bg-primary rounded-full text-white w-8 h-8",
										step === 1 ? "sm:hidden" : "",
									)}>
									<Icon icon="send" size={16} />
								</button>
							</div>
							<div
								className={cn(
									"flex flex-row-reverse justify-between items-center flex-wrap",
									step == 1 ? "sm:gap-4 gap-[9px] sm:!flex-row !flex-row-reverse" : "sm:gap-1",
								)}>
								{/* Attach */}
								<label className="cursor-pointer">
									<Input
										type="file"
										className="hidden"
										onChange={e => {
											const files = e.target.files ? Array.from(e.target.files) : [];
											if (files.length > 0) {
												setAttachedFiles(prev => [...prev, ...files]);
											}
										}}
									/>
									<div
										className={cn(
											"flex items-center bg-white rounded-full",
											step === 1
												? "sm:px-4 px-2.5 py-2 sm:py-[10px] sm:gap-2 gap-1"
												: "sm:px-3 px-2.5 py-2 sm:py-[10px] sm:gap-2 gap-1",
										)}>
										<Icon
											icon="paperclip"
											className={cn(
												step === 1
													? "sm:h-[20px] sm:w-[20px] h-[14px] w-[14px]"
													: "sm:h-[18px] sm:w-[18px] h-[14px] w-[14px]",
											)}
										/>
										<span className="text-textSecondary sm:text-sm text-xs  leading-[16px] sm:leading-[18px] tracking-[0.045px]">
											Attach
										</span>
									</div>
								</label>
								<div
									className={cn(
										"flex flex-row",
										step === 1 ? "sm:gap-4 gap-[9px]" : "sm:gap-[15px] gap-[9px]",
									)}>
									{/* Company Search */}
									<button
										className={cn(
											"flex items-center bg-white rounded-full",
											step === 1
												? "sm:px-4 px-2.5 py-2 sm:py-[10px] sm:gap-2 gap-1"
												: "sm:px-3 px-2.5 py-2 sm:py-[10px] sm:gap-2 gap-1",
										)}>
										<Icon
											icon="magnifying-glass"
											className={cn(
												step === 1
													? "sm:h-[20px] sm:w-[20px] h-[14px] w-[14px]"
													: "sm:h-[18px] sm:w-[18px] h-[14px] w-[14px",
											)}
										/>
										<span className="text-textSecondary sm:text-sm text-xs  leading-[16px] sm:leading-[18px] tracking-[0.01px]">
											Company Search
										</span>
									</button>
									{/* Pro */}
									<button
										className={cn(
											"flex items-center bg-white rounded-full",
											step === 1
												? "sm:px-4 px-2.5 py-2 sm:py-[10px] sm:gap-2 gap-1"
												: "sm:px-3 px-2.5 py-2 sm:py-[10px] sm:gap-2 gap-1",
										)}>
										<Icon
											icon="crown-fill"
											className={cn(
												step === 1
													? "sm:h-[20px] sm:w-[20px] h-[14px] w-[14px]"
													: "sm:h-[18px] sm:w-[18px] h-[14px] w-[14px]",
											)}
										/>
										<span className="flex sm:gap-2 gap-1">
											<span className="text-textSecondary sm:text-sm text-xs  leading-[16px] sm:leading-[18px] tracking-[0.295px]">
												Pro
											</span>
											<Icon
												icon="chevron-down"
												className={cn(
													"text-textSecondary",
													step === 1
														? "sm:w-5 sm:h-5 w-[14px] h-[14px]"
														: "w-[14px] h-[14px]",
												)}
											/>
										</span>
									</button>
									{/* Send */}
									{step === 1 && (
										<button
											onClick={() => {
												handleSend();
											}}
											className="hidden sm:flex items-center justify-center bg-primary rounded-full sm:w-10 sm:h-10 text-white w-8 h-8">
											<Icon icon="send" size={20} />
										</button>
									)}
								</div>
							</div>
						</label>
					</div>
				)}
			</div>
			{/* Summary Section */}
			{(!isMobile || showSummary) && step === 2 && (
				<SimpleBar
					className={`flex transition-[width] duration-100 flex-col w-full md:border border-solid border-border ${isExpanded ? "lg:w-[calc(100%-445px)]" : "lg:w-[calc(100%-445px)]"} h-[calc(100dvh-105px)] overflow-auto sm:px-0 px-6`}>
					{/* Header */}
					<div className="flex items-center flex-wrap justify-between sm:p-6 sm:pl-[23px] sm:mt-[-1px] pb-4 sm:gap-0 gap-4">
						<div className="flex items-center gap-4 sm:gap-2 ">
							<div className="lg:hidden block h-6 w-6 p-0.5">
								<Icon
									icon="arrow-up"
									className="-rotate-90 h-full w-full align-baseline"
									onClick={() => {
										setShowSummary(false);
									}}
								/>
							</div>
							<h2 className="font-bold text-text sm:text-xl leading-[150%] text-base">
								Best Match Summary
							</h2>
						</div>

						<div className="flex items-center gap-3 flex-wrap sm:pl-0 pl-10">
							<button className="inline-flex items-center justify-center sm:gap-2.5 gap-2 whitespace-nowrap !bg-tgc px-4 sm:py-[10px] py-2 sm:px-[24px] !text-textSecondary !rounded-full !border-none sm:text-sm text-xs leading-[150%] sm:leading-[100%] font-medium">
								<span className="self-center">Export</span>
								<Icon icon="chevron-down" className="text-textSecondary sm:w-5 sm:h-5 w-4 h-4" />
							</button>

							<button className="inline-flex items-center justify-center sm:gap-2.5 gap-2 whitespace-nowrap !bg-tgc sm:px-[24px] px-4 sm:py-[10px] py-2 !text-textSecondary !rounded-full !border-none sm:text-sm text-xs leading-[150%] sm:leading-[100%]">
								<span className="self-center">Create</span>

								<Icon icon="chevron-down" className="text-textSecondary sm:w-5 sm:h-5 w-4 h-4" />
							</button>
						</div>
					</div>
					<Separator className="-mt-px" />

					{/* Statistics */}
					<div className="flex items-start flex-wrap sm:gap-6 gap-4 sm:pt-[24px] sm:pb-[15px] pb-[14px] sm:px-6 sm:pl-[23px] pt-4">
						{statistics.map((stat, index) => (
							<div key={index} className="flex items-start gap-4 sm:gap-6 flex-1">
								<div className="flex sm:w-10 sm:h-10 w-[32px] h-[32px] items-center justify-center p-2 bg-fgc rounded-full">
									<Icon icon={stat.icon} className="sm:w-5 sm:h-5 w-4 h-4" />
								</div>
								<div className="flex flex-col sm:gap-2 gap-1.5">
									<div className="font-bold text-text sm:text-xl text-base leading-[21px] sm:leading-[26px]">
										{stat.value}
									</div>
									<div className="font-medium text-textSecondary sm:text-sm text-xs text-nowrap leading-[150%]">
										{stat.label}
									</div>
								</div>
							</div>
						))}
					</div>
					<Separator className="" />

					{/* Filter Tags */}
					<div className="flex items-center flex-wrap sm:gap-6 sm:pt-4 pt-[14px] sm:pb-[23px] sm:px-6 pb-[15px] sm:pl-[23px] gap-4 border-b border-border">
						<div className="font-medium text-text sm:text-sm text-xs leading-[150%]">
							Best Match Summary
						</div>
						<div className="flex flex-wrap sm:gap-2.5 gap-2">
							{filterTags.map((tag, index) => (
								<Badge
									key={index}
									variant="outline"
									className="sm:!px-6 sm:!py-2.5 !px-4 !py-1.5 sm:h-10 h-[30px] !rounded-full text-textSecondary sm:text-sm text-xs leading-[150%] !font-medium !border-border">
									{tag}
								</Badge>
							))}
						</div>
					</div>

					{/* Results */}
					<div className="flex flex-col gap-4 sm:gap-6 sm:p-6 sm:pb-[23px] sm:pl-[23px] sm:pr-[23px] py-4 relative">
						<div className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
							<p className="font-bold text-text sm:text-xl tracking-[0] text-base leading-[150%] whitespace-nowrap">
								Results (32)
							</p>

							<div className="inline-flex items-start justify-center gap-2 sm:gap-3 relative flex-[0_0_auto]">
								<Button
									variant="none"
									className="flex sm:w-10 sm:h-10 w-[34px] h-[34px] items-center justify-center gap-2.5 sm:!p-2 !p-[6px] relative bg-tgc rounded-[50px]">
									<Icon className="relative sm:w-5 sm:h-5 w-[17px] h-[17px]" icon="checker-board" />
								</Button>

								<Button
									variant="none"
									className="flex sm:w-10 sm:h-10 w-[34px] h-[34px] items-center justify-center gap-2.5 sm:!p-2 !p-[6px] relative bg-tgc rounded-[50px]">
									<Icon
										className="relative sm:w-5 sm:h-5 w-[17px] h-[17px]"
										icon="square-half-bottom"
									/>
								</Button>

								<Button
									variant="none"
									onClick={() => {
										setIsOpen(true);
									}}
									className="inline-flex sm:h-10 h-[34px] items-center gap-[6px] sm:gap-2 sm:px-4 px-[14px] py-2 sm:py-2.5 relative flex-[0_0_auto] bg-tgc rounded-[90px]">
									<Icon className="relative sm:w-5 sm:h-5 w-4 h-4" icon="circles-three-plus" />

									<div className="relative w-fit mt-[-1.50px] font-medium text-textSecondary text-sm leading-[21px] whitespace-nowrap tracking-tighter">
										Filter
									</div>
								</Button>
							</div>
						</div>

						{/* Supplier Cards */}
						<div className="w-full">
							<div
								className={`grid 3xl:grid-cols-3 md:grid-cols-1 ${isExpanded ? " 2xl:grid-cols-2" : "2xl:grid-cols-2"} xl:grid-cols-2  lg:grid-cols-1 sm:grid-cols-1 grid-cols-1 items-start sm:gap-6 relative gap-4 w-full`}>
								{loading ? (
									// Loading skeleton
									<>
										{[1, 2, 3, 4].map(index => (
											<div
												key={`skeleton-${index}`}
												className="flex flex-col gap-4 p-4 animate-pulse bg-white rounded-[20px] border border-solid border-border">
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
										<SupplierCard
											key={supplier.id}
											supplier={supplier}
											isBookmarked={bookmarkedSuppliers.has(supplier.id)}
											onBookmarkToggle={toggleBookmark}
											onViewProfile={() => handleViewProfile(supplier.id)}
											onSendRFQ={() => handleSendRFQ(supplier.id)}
										/>
									))
								)}
							</div>
						</div>
					</div>
				</SimpleBar>
			)}
			{isOpen && <SideMenu isOpen={isOpen} setIsOpen={setIsOpen} />}
		</div>
	);
};

export default NewsSourcingRequest;

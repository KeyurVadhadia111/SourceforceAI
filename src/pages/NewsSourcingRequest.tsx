import React, { JSX, useEffect, useRef, useState } from "react";
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
import { Menu } from "@headlessui/react";
import FilterTag from "components/common/FilterTag";
import RfqSupplierListCard from "components/common/SupplierListCard";
import { useLocation, useNavigate } from "react-router-dom";
import { prepareDataForExport, exportAsCSV, exportAsExcel, exportAsPDF } from "components/utils/ExportData";
import { toast } from "components/utils/toast";
import SentRfqPopup from "components/common/SentRfqPopup";
import ChatHistorySidebar from "components/ChatHistorySidebar";

const categories = [
	{ title: "LED Light Strips", icon: "" },
	{ title: "Wireless Chargers", icon: "" },
	{ title: "Silicone Phone Cases", icon: "" },
	{ title: "Portable Blenders", icon: "" },
	{ title: "More", icon: "menu" },
];

const options = ["Basic", "Professional", "Enterprise"];
const exportOptions = ['PDF', 'CSV', 'Excel'];
const createOptions = ['New RFQ'];


interface FilterTag {
	id: string;
	label: string;
}

const initialFilterTags: FilterTag[] = [
	{ id: "country", label: "China" },
	{ id: "delivery", label: "1–3 Days" },
	{ id: "price", label: "$3 – $12" },
	{ id: "payment", label: "Credit/Debit" },
	{ id: "certification", label: "ISO Certified" },
];


const NewsSourcingRequest = () => {
	const [step, setStep] = useState(1);
	const [{ isDark, isExpanded, supplierSearchQueries, searchQuery }, setAppState] = useAppState();
	const [selected, setSelected] = useState("Basic");
	const [dropUp, setDropUp] = useState(false);
	const buttonRef = useRef<HTMLButtonElement>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [alignRight, setAlignRight] = useState(false);
	const [reactions, setReactions] = useState<{ [index: number]: "like" | "dislike" | null }>({});
	const [layout, setLayout] = useState<"grid" | "list">("grid");
	const [filterTags, setFilterTags] = useState<FilterTag[]>(supplierSearchQueries);
	const location = useLocation();
	const navigate = useNavigate();
	const [isSentPopupOpen, setIsSentPopupOpen] = useState(false);
	const [selectedSupplierId, setSelectedSupplierId] = useState<string | null>(null);
	const handleReaction = (index: number, type: "like" | "dislike") => {
		setReactions((prev) => ({
			...prev,
			[index]: prev[index] === type ? null : type,
		}));
	};


	useEffect(() => {
		setFilterTags(supplierSearchQueries);

		return () => {
			true;
		};
	}, [supplierSearchQueries]);


	const handleOpen = () => {
		const rect = buttonRef.current?.getBoundingClientRect();
		if (rect) {
			const spaceBelow = window.innerHeight - rect.bottom;
			const dropdownHeight = options.length * 360;
			setDropUp(spaceBelow < dropdownHeight);

			const dropdownWidth = 160;
			const spaceRight = window.innerWidth - rect.left;
			const spaceLeft = rect.right;

			if (spaceRight < dropdownWidth && spaceLeft >= dropdownWidth) {
				setAlignRight(true);
			} else {
				setAlignRight(false);
			}
		}
	};

	const handlePopoverOpen = () => {
		const rect = buttonRef.current?.getBoundingClientRect();
		if (rect) {
			const spaceBelow = window.innerHeight - rect.bottom;
			const dropdownHeight = createOptions.length * 40;
			setDropUp(spaceBelow < dropdownHeight);

			const dropdownWidth = 160;
			const spaceRight = window.innerWidth - rect.left;
			const spaceLeft = rect.right;

			if (spaceRight < dropdownWidth && spaceLeft >= dropdownWidth) {
				setAlignRight(true);
			} else {
				setAlignRight(false);
			}
		}
	};


	// const engagementPoints = [
	// 	"Identify the common characteristics and features of leading B2B platforms that facilitate high engagement and positive feedback.",
	// 	"Research best practices for optimizing company profiles and listings on B2B platforms to attract attention and encourage interaction.",
	// 	"Investigate the primary factors that contribute to high response rates from potential clients or partners on B2B platforms, including...",
	// ];
	const statistics = [
		{
			icon: "supplier",
			value: suppliers.length.toString(),
			label: "Suppliers Found",
		},
		// {
		// 	icon: "rating",
		// 	value: "4.3",
		// 	label: "Avg Rating",
		// },
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
	// const filterTags = ["Kitchen Appliances", "Portable", "OEM Available"];

	const [bookmarkedSuppliers, setBookmarkedSuppliers] = useState<Set<string>>(new Set());
	const [loading, setLoading] = useState(true);
	const [displaySuppliers, setDisplaySuppliers] = useState<Supplier[]>([]);
	const [showSummary, setShowSummary] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
	const [showHistory, setShowHistory] = useState(false);
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const autoResizeTextarea = () => {
		if (textareaRef.current) {
			textareaRef.current.style.height = 'auto';
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
		}
	};

	// const state = location.state as {
	// 	defaultTab?: "inbox" | "sent";
	// 	filteredSuppliers?: Supplier[];
	// };
	// Update messages state to support files property for user messages
	const [messages, setMessages] = useState<
		Array<{
			text?: string;
			from: string;
			files?: Array<{
				name: string;
				type: string;
				url: string;
				isImage: boolean;
			}>;
		}>
	>([
		// {
		// 	text: "Here are top-rated suppliers for portable blenders from China. Filtered by high response rates (>85%) and average rating above 4.0.",
		// 	from: "ai",
		// },
	]);
	const [inputValue, setInputValue] = useState("");
	const simpleBarRef = useRef<any>(null);

	// useEffect(() => {
	// 	if (state?.filteredSuppliers?.length) {
	// 		setDisplaySuppliers(state.filteredSuppliers);
	// 		setLoading(false);
	// 	} else {
	// 		setLoading(true);
	// 		setDisplaySuppliers(suppliers);
	// 		setLoading(false);
	// 	}
	// }, []);

	// useEffect(() => {
	// 	// Simulating API call
	// 	const fetchSuppliers = async () => {
	// 		setLoading(true);
	// 		try {
	// 			setDisplaySuppliers(suppliers);
	// 		} catch (error) {
	// 			console.error("Error fetching suppliers:", error);
	// 		} finally {
	// 			setLoading(false);
	// 		}
	// 	};

	// 	fetchSuppliers();
	// }, []);

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
		console.log("isMobile", isMobile)
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

	// const handleSendRFQ = (supplierId: string) => {
	// 	navigate("/rfq-center", { state: { defaultTab: "sent" } });
	// 	console.log("Send RFQ for supplier:", supplierId);
	// 	toast.success("Send RFQ successful!");

	// };

	const handleSendRFQ = (supplierId: string) => {
		setIsSentPopupOpen(true);
		setSelectedSupplierId(supplierId);
	};

	const confirmSendRFQ = () => {
		if (!selectedSupplierId) return;

		navigate("/rfq-center", { state: { defaultTab: "sent" } });
		toast.success("RFQ Sent successfully!!");
		setSelectedSupplierId(null);
	};

	const handleRemoveFilter = (tagId: string) => {
		setFilterTags(prevTags => prevTags.filter(tag => tag.id !== tagId));
		setAppState({ supplierSearchQueries: supplierSearchQueries.filter((tag: any) => tag.id !== tagId) });
	};

	const isMobile = useIsMobile();
	const [hasSentMessage, setHasSentMessage] = useState(false);

	// Update handleSend to include files in user messages
	const handleSend = () => {
		if (!inputValue.trim() && attachedFiles.length === 0) return;
		const trimmedInput = inputValue.trim().toLowerCase();
		let shouldShowSummary = false;

		let aiResponse = "We are looking into your request, Thank you !";

		if (trimmedInput === "hello") {
			aiResponse = "Hello there! What information are you looking for today?";
		} else if (trimmedInput.includes("how are you")) {
			aiResponse =
				"I'm doing well, thank you for asking! I'm ready to help you find the trade data you need. What are you looking for?";
		} else if (trimmedInput.includes("list of supplier")) {
			shouldShowSummary = true;
			aiResponse =
				"Here are top-rated suppliers for portable blenders from China, filtered by high response rates (above 85%) and average ratings over 4.0.";
		}

		const userMessage = {
			text: inputValue,
			from: "user",
			files:
				attachedFiles.length > 0
					? attachedFiles.map(file => ({
						name: file.name,
						type: file.type,
						url: URL.createObjectURL(file),
						isImage: file.type.startsWith("image/"),
					}))
					: undefined,
		};

		const aiMessage = {
			text: aiResponse,
			from: "ai",
		};

		setIsLoading(true);
		setTimeout(() => {
			setMessages(prev => [...prev, userMessage, aiMessage]);

			// Now set summary only after message is displayed
			if (shouldShowSummary) {
				setShowSummary(true);
				setStep(2);
			}

			setIsLoading(false);
			setHasSentMessage(true);
		}, 1500);

		setInputValue("");
		setAttachedFiles([]);
		if (textareaRef.current) {
			textareaRef.current.style.height = "auto";
		}
	};



	useEffect(() => {
		if (simpleBarRef.current) {
			// For SimpleBar, always scroll to the bottom of the scrollable area
			const scrollEl = simpleBarRef.current.getScrollElement
				? simpleBarRef.current.getScrollElement()
				: simpleBarRef.current.el;
			if (scrollEl) {
				// Use setTimeout to ensure DOM is updated before scrolling
				setTimeout(() => {
					scrollEl.scrollTo({ top: scrollEl.scrollHeight, behavior: "smooth" });
				}, 0);
			}
		}
	}, [messages]);

	const handleSelectHistory = (selectedText: string) => {
		if (isMobile) {
			setShowSummary(false);
		}
		setShowHistory(false);
		setIsLoading(true);

		const updatedUserMsg = {
			text: selectedText,
			from: "user",
		};

		const updatedAiMsg = {
			text: "This is the updated AI reply for the selected history item.",
			from: "ai",
		};

		setTimeout(() => {
			setMessages(prev => {
				const newMessages = [...prev];

				// Remove last two messages (user + ai)
				if (newMessages.length >= 2) {
					newMessages.splice(newMessages.length - 2, 2, updatedUserMsg, updatedAiMsg);
				} else {
					newMessages.push(updatedUserMsg, updatedAiMsg);
				}

				return newMessages;
			});

			setHasSentMessage(true);
			setIsLoading(false);
		}, 500);
	};

	useEffect(() => {
		autoResizeTextarea();
	}, []);

	return (
		<div
			className={cn(
				// min-[1025px]:lg:px-5
				"relative flex px-0 w-full py-4 sm:py-0",
				step === 1
					? `${showSummary && isMobile ? "lg:flex-row" : "flex-col"} justify-center px-5 lg:px-0 items-center sm:h-[calc(100dvh-72px)] h-[calc(100dvh-56px)] overflow-auto`
					: "min-[1025px]:lg:flex-row flex-col",
			)}>
			<div className={`absolute z-10 cursor-pointer ${step === 1 ? "top-4 right-4" : "top-5 right-2"}`}
				onClick={() => setShowHistory(true)}
			>
				<Icon icon={`${isDark ? "history-open-dark" : "history-open"}`} className="w-6 h-6" />
			</div>
			<ChatHistorySidebar isOpen={showHistory} onClose={() => setShowHistory(false)} onSelectHistory={handleSelectHistory} />
			{/* Content */}
			<div className={cn("relative w-full", step === 1 ? "max-w-[858px]" : "xl:w-[420px] sm:border-r sm:border-border sm:dark:border-borderDark")}>
				{step === 1 && !hasSentMessage ? (
					<>
						{isLoading ? (
							<div className="w-full flex items-center justify-center gap-2 h-full">
								<div className="flex items-center gap-2">
									<div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
								</div>
							</div>
						) : (
							<>
								<div className="flex flex-col items-center sm:justify-center justify-start overflow-auto w-full px-6 sm:px-0 sm:gap-3 gap-[14px]">
									<h1 className="sm:text-[36px] text-[32px] text-center text-text dark:text-textDark leading-[150%] font-light  tracking-[-0.1px] [font-family:'Outfit',Helvetica]">
										Find High-Quality and{" "}
										<div className="font-bold tracking-[-0.1px]">Dependable Suppliers</div>
									</h1>
									<p className="sm:text-base text-sm leading-[150%] text-center text-textSecondary dark:text-textDark max-w-2xl tracking-[0.21px]">
										Discover top-rated, reliable suppliers instantly with our AI-powered sourcing tool.
										Ensure quality and consistency for every product with smart supplier recommendations.
									</p>
								</div>
								{/* Categories */}
								<div className="flex flex-wrap justify-center gap-3 sm:gap-4 sm:mb-5 mb-4 sm:mt-6 mt-8 sm:px-0 px-6">
									{categories.map((category, index) => (
										<div
											key={index}
											className="flex items-center border border-border dark:border-borderDark rounded-full sm:px-[19px] px-[15px] sm:!py-[8.5px] text-text dark:text-textDark font-normal cursor-pointer py-[5px]"
											onClick={() => {
												if (category.title !== "More") {
													setInputValue(category.title);
												}
											}}
										>
											<span className="text-text dark:text-textDark sm:text-sm text-xs sm:leading-[21px] leading-[18px] flex sm:gap-[10px] gap-1 items-center">
												{category.title}
												{category.icon && isDark ?
													<img
														src="assets/images/icon/document-dark.svg"
														alt="Preview"
														className="w-[14px] h-[14px]"
													/>
													:
													<Icon icon={category.icon} size={14} />
												}
											</span>
										</div>
									))}
								</div>
							</>
						)}
					</>
				) : (
					<>
						{(!isMobile || !showSummary) && (
							<section className="flex flex-col w-full self-stretch items-center justify-start">
								<SimpleBar
									ref={simpleBarRef}
									className={cn(
										"flex flex-col overflow-auto justify-start gap-6 w-full  -ml-px",
										"sm:h-[calc(100dvh-250px)] h-[calc(100dvh-248px)]",
										isLoading ? "sm:py-10 sm:px-6 pb-10 px-6" : "sm:py-10 sm:px-6 pb-10 px-6"
									)}>
									<div className="flex flex-col gap-6 w-full">
										{/* Default AI response section */}
										<div className="flex flex-col items-start sm:gap-4 gap-[14px]">
											{/* <div className="flex flex-col sm:gap-4 gap-3.5 items-start">
												<img
													src="/assets/images/ai.svg"
													className="sm:w-[33px] sm:h-[24px] w-[30.25px] h-[22px]"
												/>
												<p className="font-normal text-text dark:text-textDark w-full leading-[150%] ">
													Here are top-rated suppliers for portable blenders from China.
													Filtered by high response rates (&gt;85%) and average rating above
													4.0.
												</p>
											</div> */}
											{/* <Card className="w-full bg-tgc dark:bg-fgcDark rounded-[20px] sm:!p-5 !p-4 shadow-none border-none">
												<div className="flex flex-col sm:gap-4 gap-3">
													<h3 className="font-bold text-text dark:text-textDark sm:text-sm text-xs leading-[150%] ">
														B2B Platform Engagement Indicators
													</h3>

													<div className="flex flex-col sm:gap-3 gap-2.5">
														{engagementPoints.map((point, index) => (
															<p
																key={index}
																className="font-normal text-text dark:text-textDark sm:text-sm text-xs leading-[150%] ">
																{point}
															</p>
														))}

														<button
															onClick={() => {
																setStep(2)
																setShowSummary(true)
															}}
															className="text-left font-bold text-primary sm:text-sm text-xs leading-[150%] ">
															Read More
														</button>
													</div>
												</div>
											</Card> */}

											{/* Action buttons */}
											{/* <div className="flex items-center gap-3">
												<Icon
													onClick={() => handleReaction(10000, "like")}
													icon={
														isDark
															? reactions[10000] === "like"
																? "like-dark-fill"
																: "like-dark"
															: reactions[10000] === "like"
																? "like-fill"
																: "like"
													}
													className="sm:w-5 sm:h-5 h-4 w-4 cursor-pointer"
												/>
												<Icon
													onClick={() => handleReaction(11000, "dislike")}
													icon={
														isDark
															? reactions[11000] === "dislike"
																? "dislike-dark-fill"
																: "dislike-dark"
															: reactions[11000] === "dislike"
																? "dislike-fill"
																: "dislike"
													}
													className="sm:w-5 sm:h-5 h-4 w-4 cursor-pointer"
												/>

												<Menu as="div" className="relative inline-block text-left">
													<Menu.Button className="focus:outline-none"
														ref={buttonRef}
														onClick={handleOpen}
													>
														<Icon
															icon={isDark ? "sharenetwork-dark" : "share-network"}
															className="sm:w-5 sm:h-5 h-4 w-4"
														/>
													</Menu.Button>

													<Menu.Items
														className={cn(
															"absolute z-10 w-40 rounded-md bg-white dark:bg-fgcDark shadow-lg focus:outline-none",
															dropUp ? "bottom-full mb-2" : "top-full mt-2"
														)}
													>
														<div className="py-1">
															{[
																{ label: 'Whatsapp' },
																{ label: 'Email' },
																{ label: 'Linkedin' },
															].map(({ label }) => (
																<Menu.Item key={label}>
																	{({ active }) => (
																		<button
																			className={cn(
																				"block w-full text-left text-textSecondary dark:text-textSecondaryDark px-4 py-2 text-sm",
																				active ? "bg-tgc/70 dark:bg-bgcDark/30" : ""
																			)}
																		>
																			{label}
																		</button>
																	)}
																</Menu.Item>
															))}
														</div>
													</Menu.Items>
												</Menu>

												<Menu as="div" className="relative inline-block text-left">
													<Menu.Button className="focus:outline-none">
														<Icon
															icon={isDark ? "kebab-dark" : "kebab"}
															className="sm:w-5 sm:h-5 h-4 w-4"
														/>
													</Menu.Button>

													<Menu.Items className={cn(
														"absolute z-10 w-40 rounded-md bg-white dark:bg-fgcDark shadow-lg focus:outline-none",
														dropUp ? "bottom-full mb-2" : "top-full mt-2"
													)}>
														<div className="py-1">
															{[
																{ label: 'Report Messages' },
																{ label: 'Mark as unread' },
															].map(({ label }) => (
																<Menu.Item key={label}>
																	{({ active }) => (
																		<button
																			className={cn(
																				"block w-full text-left text-textSecondary dark:text-textSecondaryDark px-4 py-2 text-sm",
																				active ? "bg-tgc/70 dark:bg-bgcDark/30" : ""
																			)}
																		>
																			{label}
																		</button>
																	)}
																</Menu.Item>
															))}
														</div>
													</Menu.Items>
												</Menu>
											</div> */}
										</div>

										{/* Render additional user/AI chat pairs with flex and gap */}
										{messages.reduce<JSX.Element[]>((acc, msg, idx, arr) => {
											if (msg.from === "user") {
												acc.push(
													<div key={`qapair-${idx}`} className="flex flex-col gap-6 w-full">
														<div className="flex flex-col items-end gap-2.5 pl-[72px] pr-0 py-0 w-full">
															{/* Show images/files above the question text, like ChatGPT */}
															{msg.files && msg.files.length > 0 && (
																<div className="flex flex-wrap gap-2 mb-2 justify-end">
																	{msg.files.map((file, i) =>
																		file.isImage ? (
																			<span
																				key={file.url}
																				className="relative inline-block">
																				<img
																					src={file.url}
																					alt={file.name}
																					className="w-full h-full object-cover rounded-lg"
																				/>
																			</span>
																		) : (
																			<span
																				key={file.url}
																				className="flex flex-col items-end">
																				<span className="flex items-center px-3 py-2 bg-fgc dark:bg-fgcDark rounded-lg text-xs w-48">
																					<Icon
																						icon="file"
																						className="w-5 h-5 mr-2 text-primary"
																					/>
																					<span className="truncate flex-1">
																						{file.name}
																					</span>
																				</span>
																			</span>
																		),
																	)}
																</div>
															)}
															{msg.text && (
																<Card className="w-auto max-w-full bg-tgc dark:bg-fgcDark rounded-[20px] sm:!p-5 !p-4 shadow-none border-none">
																	<p
																		lang="en"
																		className="font-normal text-text dark:text-textDark sm:text-sm text-xs leading-[150%] break-words hyphens-auto">
																		{msg.text}
																	</p>
																</Card>
															)}
														</div>
														{arr[idx + 1] && arr[idx + 1].from === "ai" && (
															<div className="flex flex-col items-start sm:gap-4 gap-[14px]">
																<div className="flex flex-col sm:gap-4 gap-3.5 items-start">
																	<img
																		src="/assets/images/ai.svg"
																		className="sm:w-[33px] sm:h-[24px] w-[30.25px] h-[22px]"
																	/>
																	<p className="font-normal text-text dark:text-textDark w-full leading-[150%] ">
																		{arr[idx + 1].text}
																	</p>
																</div>
																<div className="flex items-center gap-3">
																	<Icon
																		onClick={() => handleReaction(idx + 1, "like")}
																		icon={
																			isDark
																				? reactions[idx + 1] === "like"
																					? "like-dark-fill"
																					: "like-dark"
																				: reactions[idx + 1] === "like"
																					? "like-fill"
																					: "like"
																		}
																		className="sm:w-5 sm:h-5 h-4 w-4 cursor-pointer"
																	/>
																	<Icon
																		onClick={() => handleReaction(idx + 1, "dislike")}
																		icon={
																			isDark
																				? reactions[idx + 1] === "dislike"
																					? "dislike-dark-fill"
																					: "dislike-dark"
																				: reactions[idx + 1] === "dislike"
																					? "dislike-fill"
																					: "dislike"
																		}
																		className="sm:w-5 sm:h-5 h-4 w-4 cursor-pointer"
																	/>
																	<Menu as="div" className="relative inline-block text-left">
																		<Menu.Button className="focus:outline-none"
																			ref={buttonRef}
																			onClick={handleOpen}
																		>
																			<Icon
																				icon={isDark ? "sharenetwork-dark" : "share-network"}
																				className="sm:w-5 sm:h-5 h-4 w-4"
																			/>
																		</Menu.Button>

																		<Menu.Items
																			className={cn(
																				"absolute z-10 w-30 rounded-md bg-white dark:bg-fgcDark shadow-lg focus:outline-none",
																				dropUp ? "bottom-full left-0 mb-2" : "top-full right-0 mt-2",
																				alignRight ? "left-0" : "right-0"
																			)}
																		>
																			<div className="py-1">
																				{[
																					{ label: 'Whatsapp', url: "https://web.whatsapp.com/" },
																					{ label: 'Email', url: "https://accounts.google.com/" },
																					{ label: 'Linkedin', url: "https://www.linkedin.com/" },
																				].map(({ label, url }) => (
																					<Menu.Item key={label}>
																						{({ active }) => (
																							<button
																								onClick={() => {
																									if (url) window.open(url, "_blank");
																								}}
																								className={cn(
																									"block w-full text-left text-textSecondary dark:text-textSecondaryDark px-4 py-2 text-sm",
																									active ? "bg-tgc/70 dark:bg-bgcDark/30" : ""
																								)}
																							>
																								{label}
																							</button>
																						)}
																					</Menu.Item>
																				))}
																			</div>
																		</Menu.Items>
																	</Menu>

																	<Menu as="div" className="relative inline-block text-left">
																		<Menu.Button
																			ref={buttonRef}
																			onClick={handleOpen}
																			className="focus:outline-none">
																			<Icon
																				icon={isDark ? "kebab-dark" : "kebab"}
																				className="sm:w-5 sm:h-5 h-4 w-4"
																			/>
																		</Menu.Button>

																		<Menu.Items className={cn(
																			"absolute z-10 w-40 rounded-md bg-white dark:bg-fgcDark shadow-lg focus:outline-none",
																			dropUp ? "bottom-full left-0 mb-2" : "top-full right-0 mt-2",
																			alignRight ? "left-0" : "right-0"
																		)}>
																			<div className="py-1">
																				{[
																					{ label: 'Report Messages' },
																					{ label: 'Mark as unread' },
																				].map(({ label }) => (
																					<Menu.Item key={label}>
																						{({ active }) => (
																							<button
																								className={cn(
																									"block w-full text-left text-textSecondary dark:text-textSecondaryDark px-4 py-2 text-sm",
																									active ? "bg-tgc/70 dark:bg-bgcDark/30" : ""
																								)}
																							>
																								{label}
																							</button>
																						)}
																					</Menu.Item>
																				))}
																			</div>
																		</Menu.Items>
																	</Menu>
																</div>
															</div>
														)}
													</div>,
												);
											}
											return acc;
										}, [])}
									</div>
									{isLoading && (
										<div className="flex items-center justify-center gap-2 w-full">
											<div className="flex items-center gap-2">
												<div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
											</div>
										</div>
									)}
								</SimpleBar>
							</section>
						)}
					</>
				)}
				{/* Message Input Section */}
				{(!isMobile || !showSummary) && (
					<div className={step === 2 ? "sm:absolute sticky bottom-0 sm:p-6 p-6 pb-0 w-full" : "sticky bottom-0 w-full sm:px-0 sm:pb-0"}>
						<label
							htmlFor="message"
							className={cn(
								"bg-fgc dark:bg-tgcDark rounded-xl flex flex-col w-full",
								step === 1 ? "sm:p-6 p-4 px-0 sm:gap-6 gap-6" : "sm:p-4 p-4 gap-6",
							)}>
							{attachedFiles.length > 0 && (
								<div className="flex items-center gap-1 mb-1 flex-wrap">
									{attachedFiles.map((file, idx) => {
										const isImage = file.type.startsWith("image/");
										return (
											<div
												key={file.name + idx}
												className={cn(
													"relative flex items-center  bg-tgc dark:bg-fgcDark",
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
															className="absolute top-0 right-0 z-10 flex items-center justify-center bg-white dark:bg-fgcDark rounded-full shadow-sm w-5 h-5 m-0.5"
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
															<span className="text-text dark:text-textDark font-medium text-xs truncate max-w-[140px]">
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

							<div className="flex items-center w-full sm:px-0 px-4">
								<textarea
									id="message"
									ref={textareaRef}
									placeholder="Message..."
									className={cn(
										"border-none border-border dark:border-borderDark text-text dark:text-textDark focus:outline-none focus:ring-0 focus:ring-primary resize-none leading-[150%] max-h-[90px] overflow-y-auto",
										step === 1 ? "sm:w-full w-[calc(100%-32px)]" : "w-[calc(100%-32px)]",
									)}
									rows={1}
									value={inputValue}
									onChange={e => {
										setInputValue(e.target.value)
										autoResizeTextarea();
									}}
									onKeyDown={e => {
										if (e.key === "Enter" && !e.shiftKey) {
											e.preventDefault();
											handleSend();
										}
									}}
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
									step == 1 ? "sm:gap-4 gap-[9px] !flex-row sm:px-0 px-2" : "!flex-row sm:gap-1",
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
											"flex items-center bg-white dark:bg-fgcDark rounded-full",
											step === 1
												? "sm:px-4 px-2.5 py-2 sm:py-[10px] sm:gap-2 gap-1"
												: "sm:px-3 px-2.5 py-2 sm:py-[10px] sm:gap-2 gap-1",
										)}>
										<Icon
											icon={isDark ? "paperclip-dark" : "paperclip"}
											className={cn(
												step === 1
													? "sm:h-[20px] sm:w-[20px] h-[14px] w-[14px]"
													: "sm:h-[18px] sm:w-[18px] h-[14px] w-[14px]",
											)}
										/>
										{/* <span className="text-textSecondary dark:text-textDark sm:text-sm text-xs  leading-[16px] sm:leading-[18px] tracking-[0.045px]">
											Attach
										</span> */}
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
											"flex items-center bg-white dark:bg-fgcDark rounded-full",
											step === 1
												? "sm:px-4 px-2.5 py-2 sm:py-[10px] sm:gap-2 gap-1"
												: "sm:px-3 px-2.5 py-2 sm:py-[10px] sm:gap-2 gap-1",
										)}>
										<Icon
											icon={isDark ? "magnifyingglass-dark" : "magnifying-glass"}
											className={cn(
												step === 1
													? "sm:h-[20px] sm:w-[20px] h-[14px] w-[14px]"
													: "sm:h-[18px] sm:w-[18px] h-[14px] w-[14px",
											)}
										/>
										<span className="text-textSecondary dark:text-textDark sm:text-sm text-xs  leading-[16px] sm:leading-[18px] tracking-[0.01px]">
											Company Search
										</span>
									</button>
									{/* Pro */}
									<Menu as="div" className="relative inline-block text-left">
										<Menu.Button
											ref={buttonRef}
											onClick={handleOpen}
											className={cn(
												"flex items-center bg-white dark:bg-fgcDark rounded-full",
												step === 1
													? "sm:px-4 px-2.5 py-2 sm:py-[10px] sm:gap-2 gap-1"
													: "sm:px-3 px-2.5 py-2 sm:py-[10px] sm:gap-2 gap-1"
											)}
										>
											<Icon
												icon={isDark ? "crown-dark" : "crown-fill"}
												className={cn(
													step === 1
														? "sm:h-[20px] sm:w-[20px] h-[14px] w-[14px]"
														: "sm:h-[18px] sm:w-[18px] h-[14px] w-[14px]"
												)}
											/>
											<span className="flex sm:gap-2 gap-1">
												<span className="text-textSecondary dark:text-textDark sm:text-sm text-xs leading-[16px] sm:leading-[18px] tracking-[0.295px] w-8 sm:w-auto truncate">
													{selected}
												</span>
												<Icon
													icon="chevron-down"
													className={cn(
														"text-textSecondary dark:text-textDark",
														step === 1 ? "sm:w-5 sm:h-5 w-4 h-4" : "w-4 h-4"
													)}
												/>
											</span>
										</Menu.Button>

										<Menu.Items
											className={cn(
												"absolute z-10 w-40 origin-top-right rounded-md bg-white dark:bg-fgcDark shadow-lg focus:outline-none",
												dropUp ? "bottom-full mb-2" : "top-full mt-2"
											)}
										>
											<div className="py-1">
												{options.map((option) => (
													<Menu.Item key={option}>
														{({ active }) => (
															<button
																onClick={() => setSelected(option)}
																className={cn(
																	"block w-full text-left text-textSecondary dark:text-textSecondaryDark px-4 py-2 text-sm",
																	active ? "bg-tgc/70 dark:bg-bgcDark/30" : "",
																	option === selected ? "font-bold" : ""
																)}
															>
																{option}
															</button>
														)}
													</Menu.Item>
												))}
											</div>
										</Menu.Items>
									</Menu>

									{/* <button
										className={cn(
											"flex items-center bg-white dark:bg-fgcDark rounded-full",
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
											<span className="text-textSecondary dark:text-textDark sm:text-sm text-xs  leading-[16px] sm:leading-[18px] tracking-[0.295px]">
												Pro
											</span>
											<Icon
												icon="chevron-down"
												className={cn(
													"text-textSecondary dark:text-textDark",
													step === 1 ? "sm:w-5 sm:h-5 w-4 h-4" : "w-4 h-4",
												)}
											/>
										</span>
									</button> */}
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
			{step === 2 && (!isMobile || showSummary) && (
				<SimpleBar
					className={`flex transition-[width] duration-100 flex-col w-full md:border border-solid border-border dark:border-borderDark ${isExpanded ? "xl:w-[calc(100%-420px)]" : "xl:w-[calc(100%-420px)]"} h-[calc(100dvh-72px)] overflow-auto sm:px-0 px-6`}>
					{/* Header */}
					<div className="flex items-center flex-wrap justify-between sm:p-6 sm:py-4 sm:pr-8 sm:pl-4 sm:mt-[-1px] pb-4 sm:gap-0 gap-4">
						<div className="flex items-center gap-4 sm:gap-2 ">
							<div className="block h-6 w-6 p-0.5">
								<Icon
									icon="arrow-up"
									className="-rotate-90 h-full w-full text-text dark:text-textDark align-baseline cursor-pointer"
									onClick={() => {
										setShowSummary(false);
										setStep(1)
									}}
								/>
							</div>
							<h2 className="font-bold text-text dark:text-textDark sm:text-xl leading-[150%] text-base">
								Best Match Summary
							</h2>
						</div>

						<div className="flex items-center gap-3 flex-wrap sm:pl-0 pl-10">
							<Menu as="div" className="relative inline-block text-left">
								<Menu.Button
									ref={buttonRef}
									onClick={handlePopoverOpen}
									className={cn(
										"flex items-center gap-2 bg-white dark:bg-fgcDark rounded-full px-3 py-2",
										"text-sm text-textSecondary dark:text-textDark"
									)}
								>
									<Icon icon="download" className="w-4 h-4" />
									<span className="self-center">Export</span>
									<Icon icon="chevron-down" className="w-4 h-4" />
								</Menu.Button>

								<Menu.Items
									className={cn(
										"absolute z-10 w-40 rounded-md bg-white dark:bg-fgcDark shadow-lg focus:outline-none",
										dropUp ? "bottom-full mb-2" : "top-full mt-2",
										alignRight ? "right-0" : "left-0"
									)}
								>

									<div className="py-1">
										{exportOptions.map(option => (
											<Menu.Item key={option}>
												{({ active }) => (
													<button
														className={cn(
															"block w-full text-left px-4 py-2 text-sm text-textSecondary dark:text-textSecondaryDark",
															active ? "bg-tgc/70 dark:bg-bgcDark/30" : ""
														)}
														onClick={() => {
															const data = prepareDataForExport(suppliers); // Use your actual `suppliers` array
															if (option === "CSV") exportAsCSV(data);
															else if (option === "Excel") exportAsExcel(data);
															else if (option === "PDF") exportAsPDF(data);
														}}
													>
														{option}
													</button>
												)}
											</Menu.Item>
										))}
									</div>
								</Menu.Items>
							</Menu>

							{/* Create Dropdown */}
							<Menu as="div" className="relative inline-block text-left">
								<Menu.Button
									ref={buttonRef}
									onClick={handlePopoverOpen}
									className={cn(
										"flex items-center gap-2 bg-white dark:bg-fgcDark rounded-full px-3 py-2",
										"text-sm text-textSecondary dark:text-textDark"
									)}
								>
									<span className="self-center">Create</span>
									<Icon icon="chevron-down" className="w-4 h-4" />
								</Menu.Button>

								<Menu.Items
									className={cn(
										"absolute z-10 w-40 rounded-md bg-white dark:bg-fgcDark shadow-lg focus:outline-none",
										dropUp ? "bottom-full mb-2" : "top-full mt-2",
										alignRight ? "right-0" : "left-0"
									)}
								>

									<div className="py-1">
										{createOptions.map(option => (
											<Menu.Item key={option}>
												{({ active }) => (
													<button
														className={cn(
															"block w-full text-left px-4 py-2 text-sm text-textSecondary dark:text-textSecondaryDark",
															active ? "bg-tgc/70 dark:bg-bgcDark/30" : ""
														)}
													>
														{option}
													</button>
												)}
											</Menu.Item>
										))}
									</div>
								</Menu.Items>
							</Menu>
						</div>
					</div>
					<Separator className="-mt-px" />

					{/* Statistics */}
					<div className="flex items-start flex-wrap sm:gap-6 gap-4 sm:pt-4 sm:pb-4 pb-[14px] sm:px-4 pt-4">
						{statistics.map((stat, index) => (
							<div key={index} className="flex items-start gap-4 sm:gap-4 flex-1">
								<div className="flex sm:w-10 sm:h-10 w-[32px] h-[32px] items-center justify-center p-2 bg-fgc dark:bg-fgcDark rounded-full">
									{isDark ?
										<img
											src={`assets/images/icon/${stat.icon}-dark.svg`}
											alt="Preview"
											className="w-5 h-5"
										/>
										:
										<Icon icon={stat.icon} className="sm:w-5 sm:h-5 w-4 h-4" />
									}
								</div>
								<div className="flex flex-col">
									<div className="font-bold text-text dark:text-textDark sm:text-xl text-base leading-[21px] sm:leading-[26px]">
										{stat.value}
									</div>
									<div className="font-medium text-textSecondary dark:text-textDark sm:text-sm text-xs text-nowrap leading-[150%]">
										{stat.label}
									</div>
								</div>
							</div>
						))}
					</div>
					<Separator className="" />

					{/* Filter Tags */}
					<div className="flex items-center flex-wrap sm:gap-4 sm:pt-4 pt-[14px] sm:pb-4 sm:px-4 pb-[15px] gap-4 border-b border-border dark:border-borderDark">
						<div className="font-medium text-text dark:text-textDark sm:text-sm text-xs leading-[150%]">
							Best Match Summary
						</div>
						<div className="flex flex-wrap sm:gap-2.5 gap-2">
							{filterTags.map(tag => (
								<FilterTag key={tag.id} id={tag.id} label={tag.label} onRemove={handleRemoveFilter} />
							))}
						</div>
					</div>

					{/* Results */}
					<div className="flex flex-col gap-4 sm:gap-4 sm:p-6 sm:py-4 sm:pl-4 sm:pr-4 py-4 relative">
						<div className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
							<p className="font-bold text-text dark:text-textDark sm:text-xl tracking-[0] text-base leading-[150%] whitespace-nowrap">
								Results ({suppliers.length})
							</p>

							<div className="inline-flex items-start justify-center gap-2 sm:gap-3 relative flex-[0_0_auto]">
								<Button
									onClick={() => setLayout("grid")}
									variant="none"
									className={cn(
										"flex sm:w-10 sm:h-10 w-[34px] h-[34px] items-center justify-center gap-2.5 sm:!p-2 !p-[6px] rounded-[50px]",
										layout === "grid" ? "bg-primary dark:bg-primary" : "bg-tgc dark:bg-fgcDark"
									)}>
									<Icon className="relative sm:w-5 sm:h-5 w-[17px] h-[17px]" icon={isDark ? "checkerboard-dark" : "checker-board"} />
								</Button>

								<Button
									onClick={() => setLayout("list")}
									variant="none"
									className={cn(
										"flex sm:w-10 sm:h-10 w-[34px] h-[34px] items-center justify-center gap-2.5 sm:!p-2 !p-[6px] rounded-[50px]",
										layout === "list" ? "bg-primary dark:bg-primary" : "bg-tgc dark:bg-fgcDark"
									)}>
									<Icon
										className="relative sm:w-5 sm:h-5 w-[17px] h-[17px]"
										icon={isDark ? "squarehalfbottom-dark" : "square-half-bottom"}
									/>
								</Button>

								<Button
									variant="none"
									onClick={() => {
										setIsOpen(true);
									}}
									className="inline-flex sm:h-10 h-[34px] items-center gap-[6px] sm:gap-2 sm:px-4 px-[14px] py-2 sm:py-2.5 relative flex-[0_0_auto] bg-tgc dark:bg-fgcDark rounded-[90px]">
									<Icon className="relative sm:w-5 sm:h-5 w-4 h-4" icon={isDark ? "circles-three-plus-dark" : "circles-three-plus"} />

									<div className="relative w-fit mt-[-1.50px] font-medium text-textSecondary dark:text-textDark text-sm leading-[21px] whitespace-nowrap tracking-tighter">
										Filter
									</div>
								</Button>
							</div>
						</div>

						{/* Supplier Cards */}
						<div className="w-full">
							<div
								className={cn(
									"grid items-start sm:gap-4 gap-4 w-full",
									layout === "grid"
										? "grid-cols-1 sm:grid-cols-2 2xl:grid-cols-2 3xl:grid-cols-3"
										: "grid-cols-1"
								)}>
								{loading ? (
									// Loading skeleton
									<>
										{[1, 2, 3, 4].map(index => (
											<div
												key={`skeleton-${index}`}
												className="flex flex-col gap-4 p-4 animate-pulse bg-white dark:bg-fgcDark rounded-[20px] border border-solid border-border dark:border-borderDark">
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
									layout === "grid" ? (
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
									) : (
										displaySuppliers.map(supplier => (
											<RfqSupplierListCard
												key={supplier.id}
												supplier={supplier}
												isBookmarked={bookmarkedSuppliers.has(supplier.id)}
												onBookmarkToggle={toggleBookmark}
												onViewProfile={() => handleViewProfile(supplier.id)}
												onSendRFQ={() => handleSendRFQ(supplier.id)}
											/>
										))
									)
								)}
							</div>
						</div>
					</div>
				</SimpleBar>
			)}
			{isOpen && <SideMenu isOpen={isOpen} setIsOpen={setIsOpen} />}
			{isSentPopupOpen && (
				<SentRfqPopup
					isOpen={isSentPopupOpen}
					setIsOpen={setIsSentPopupOpen}
					onConfirm={confirmSendRFQ}
					name={null}
					itemType="RFQ"
				/>
			)}

		</div>
	);
};

export default NewsSourcingRequest;

import React, { useState } from "react";
import Icon from "components/utils/Icon";
import { Button } from "components/utils/Button";
import { useAppState } from "components/utils/useAppState";
import DeletePopup from "./DeletePopup";

interface Tag {
	label: string;
}

export interface Supplier {
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
	status: string;
}

interface SupplierCardProps {
	supplier: Supplier;
	isBookmarked: boolean;
	onBookmarkToggle: (id: string) => void;
	onViewProfile?: () => void;
	onSendRFQ?: () => void;
}

const RfqSupplierListCard: React.FC<SupplierCardProps> = ({ supplier,
	isBookmarked,
	onBookmarkToggle,
	onViewProfile,
	onSendRFQ, }) => {
	const [{ isDark }, setAppState] = useAppState();
	const [isDeleteOpen, setIsDeleteOpen] = useState(false);
	const [deleteItemType, setDeleteItemType] = useState("RFQ");
	return (
		<>
			<div className={`flex flex-col items-start justify-center lg:gap-4 gap-3 lg:p-4 p-[11px] w-full relative flex-1 grow ${Number(supplier.id) % 2 ? "bg-[#F9F9F9] dark:bg-fgcDark" : "bg-white dark:bg-bgcDark border-l border-r border-border dark:border-borderDark"} self-stretch`}>
				<div className="flex flex-col items-start lg:gap-3 gap-[10px] relative self-stretch w-full flex-[0_0_auto]">
					<div className="flex items-start gap-8 relative self-stretch w-full flex-[0_0_auto]">
						<div className="flex items-start justify-between relative flex-1 grow">
							<div className="inline-flex items-center gap-2 lg:gap-3 relative flex-[0_0_auto]">
								<div className="relative">
									<img
										className="relative lg:w-6 lg:h-6 w-[32px] h-[32px]"
										alt={`${supplier.name} logo`}
										src={supplier.image}
									/>
									<div className={`w-2 h-2 rounded-full absolute bottom-0 right-0 ${supplier.status === "online" ? "bg-green" : ""}`}></div>
								</div>
								<div className="inline-flex items-start lg:gap-3 gap-2.5 relative flex-[0_0_auto]">
									<div className="inline-flex flex-col items-start lg:gap-1 gap-0.5 relative flex-[0_0_auto]">
										<div className="relative dark:text-textDark lg:w-[150px] font-bold leading-[150%] whitespace-nowrap truncate">
											{supplier.name}
										</div>
										<div className="block lg:hidden">
											{supplier.tags && supplier.tags.length > 0 && (
												<div className="w-[76%] flex-grow truncate whitespace-nowrap overflow-hidden">
													{supplier.tags.map((tag, i) => (
														<span
															key={i}
															className="text-sm text-textSecondary dark:text-textSecondaryDark"
														>
															{tag.label}
															{i < supplier.tags.length - 1 && " -"}
														</span>
													))}
												</div>
											)}
										</div>
										<div className="hidden lg:inline-flex items-center gap-2 lg:gap-2.5 relative">
											{/* <Icon icon={isDark ? "map-pin-dark" : "map-pin"} className="lg:w-5 lg:h-5 w-4 h-4 " /> */}

											<div className="relative w-fit text-textSecondary dark:text-textSecondaryDark lg:text-xs tracking-[0] leading-[150%] whitespace-nowrap text-xs">
												{supplier.country}
											</div>
											<div className="inline-flex items-center gap-2 lg:gap-2.5 relative">
												<div className="dark:text-textDark relative w-fit font-medium lg:text-xs tracking-[0] leading-[150%] text-[10px] whitespace-nowrap">
													{supplier.location}
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* <div className="hidden lg:inline-flex items-center gap-2 lg:gap-2.5 relative">
								<Icon icon={isDark ? "map-pin-dark" : "map-pin"} className="lg:w-5 lg:h-5 w-4 h-4 " />

								<div className="relative w-fit text-textSecondary dark:text-textSecondaryDark lg:text-xs tracking-[0] leading-[150%] whitespace-nowrap text-xs">
									{supplier.country}
								</div>
								<div className="inline-flex items-center gap-2 lg:gap-2.5 relative">
									<div className="dark:text-textDark relative w-fit font-medium lg:text-xs tracking-[0] leading-[150%] text-[10px] whitespace-nowrap">
										{supplier.location}
									</div>
								</div>
							</div> */}
							<div className="hidden lg:inline-flex justify-between items-center gap-2 lg:gap-2.5 relative flex-[0_0_auto]">
								<Icon icon={isDark ? "cube-dark" : "cube"} className="lg:w-5 lg:h-5 w-4 h-4 " />
								<div className="dark:text-textDark relative w-fit  font-medium lg:text-xs tracking-[0] leading-[150%] text-[10px] whitespace-nowrap">
									MOQ {supplier.moq} pieces
								</div>
							</div>
							<div className="hidden lg:block relative w-fit mt-[-1.00px]  font-medium text-primary lg:text-xs tracking-[0] leading-[150%] text-[10px] whitespace-nowrap">
								{supplier.responseRate}% response
							</div>
							<button
								onClick={() => onBookmarkToggle(supplier.id)}
								className="absolute right-0 top-0 sm:static sm:w-6 sm:h-6 w-5 h-5 hover:opacity-80 transition-opacity flex-shrink-0"
							>
								<Icon
									icon={
										isBookmarked
											? "bookmark-fill"
											: isDark
												? "bookmark-dark"
												: "bookmark"
									}
									size={24}
									className={`${isBookmarked ? "text-primary" : "text-border"
										} sm:w-6 sm:h-6 w-5 h-5`}
								/>
							</button>
						</div>
					</div>
				</div>

				{/* <div className="flex flex-wrap items-start lg:gap-[10px_10px] relative gap-2 h-full">
					{supplier.tags.map((tag, index) => (
						<div
							key={index}
							className="inline-flex items-center gap-2.5 px-[13px] lg:px-[15px] lg:py-[7px] py-[4.5px] relative flex-[0_0_auto] rounded-[90px] border border-border dark:border-borderDark">
							<div className="relative w-fit font-medium text-textSecondary dark:text-textDark lg:text-xs text-[10px] tracking-[0] leading-[150%] whitespace-nowrap">
								{tag.label}
							</div>
						</div>
					))}
				</div> */}

				<div className={`flex lg:flex-row flex-col items-center justify-center lg:gap-4 gap-3 relative w-full flex-[0_0_auto]`}>
					<div className="flex items-center w-full gap-2">
						{/* <Icon icon="message" className="w-3.5 h-3.5 text-black dark:text-textDark" /> */}
						{/* <div className=" dark:text-textDark lg:text-xs text-[10px] leading-[150%] font-normal w-[97%]">
							High-quality LED strips with 5-year warranty.
						</div> */}
						<div className="flex flex-wrap items-start lg:gap-[10px_10px] relative gap-2 h-full">
							{supplier.tags.map((tag, index) => (
								<div
									key={index}
									className="inline-flex items-center gap-2.5 px-[13px] lg:px-[15px] lg:py-[7px] py-[4.5px] relative flex-[0_0_auto] rounded-[90px] border border-border dark:border-borderDark">
									<div className="relative w-fit font-medium text-textSecondary dark:text-textDark lg:text-xs text-[10px] tracking-[0] leading-[150%] whitespace-nowrap">
										{tag.label}
									</div>
								</div>
							))}
						</div>
					</div>
					<Button
						className="!hidden lg:h-10 h-[34px] text-sm !text-primary border-primary hover:bg-primary/10 flex-1"
						onClick={onViewProfile}
						variant="outline">
						View Profile
					</Button>
					<Button className="lg:h-10 h-[34px] w-full lg:!w-[100px] text-sm" onClick={onSendRFQ}>
						Send RFQ
					</Button>
				</div>
			</div>

			<DeletePopup
				isOpen={isDeleteOpen}
				setIsOpen={setIsDeleteOpen}
				name={{ name: "Dummy Name" }}
				onDelete={() => {
					console.log("Pretend delete");
				}}
				itemType={deleteItemType}
			/>
		</>
	);
};

export default RfqSupplierListCard;

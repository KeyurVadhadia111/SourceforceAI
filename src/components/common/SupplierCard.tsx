import React from "react";
import Icon from "components/utils/Icon";
import { Button } from "components/utils/Button";
import { useAppState } from "components/utils/useAppState";

interface Tag {
	id?: string;
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
	lastSeen?: string;
}

interface SupplierCardProps {
	supplier: Supplier;
	isBookmarked: boolean;
	onBookmarkToggle: (id: string) => void;
	onViewProfile?: () => void;
	onSendRFQ?: () => void;
}

const SupplierCard: React.FC<SupplierCardProps> = ({
	supplier,
	isBookmarked,
	onBookmarkToggle,
	onViewProfile,
	onSendRFQ,
}) => {
	const [{ isDark }, setAppState] = useAppState();
	return (
		<div className="flex flex-col h-full items-start justify-center sm:gap-4 gap-3 sm:px-3 sm:p-[15px] p-[11px] relative flex-1 grow bg-white dark:bg-fgcDark rounded-[20px] border border-border dark:border-borderDark self-stretch">
			<div className="flex flex-col items-start sm:gap-3 gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
				<div className="flex items-start gap-8 relative self-stretch w-full flex-[0_0_auto]">
					<div className="flex items-start justify-between gap-3 w-full">
						{/* Left: Image + Supplier Details */}
						<div className="flex items-start gap-3 flex-1 min-w-0">
							<div className="relative">
								<img
									className="sm:w-[42px] sm:h-[42px] w-[32px] h-[32px] flex-shrink-0"
									alt={`${supplier.name} logo`}
									src={supplier.image}
								/>
								<div className={`w-2 h-2 rounded-full absolute bottom-1 right-0 ${supplier.status === "online" ? "bg-green" : ""}`}></div>
							</div>
							{/* Text container */}
							<div className="flex flex-col gap-1 flex-1 min-w-0">
								{/* Supplier Name (wraps to next line if needed) */}
								<div className="font-bold text-start leading-[150%] text-text dark:text-textDark break-words whitespace-normal">
									{supplier.name}
								</div>

								{/* Country + Rating */}
								<div className="flex items-center gap-2.5 text-xs sm:text-sm text-textSecondary dark:text-textSecondaryDark flex-wrap">
									{/* <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-border rounded-[3px]" /> */}
									<span>{supplier.country}</span>
									{/* <div className="flex items-center gap-1">
										<Icon icon="star" className="text-yellow w-[14px] h-[14px] sm:w-4 sm:h-4" />
										<span>{supplier.rating}</span>
									</div> */}
								</div>
							</div>
						</div>

						{/* Right: Bookmark icon */}
						<button
							onClick={() => onBookmarkToggle(supplier.id)}
							className="sm:w-6 sm:h-6 w-5 h-5 hover:opacity-80 transition-opacity flex-shrink-0"
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

				<div className="flex sm:h-[26px] h-[22px] items-center gap-2.5 relative self-stretch w-full">
					<div className="inline-flex items-center gap-2 sm:gap-2.5 relative self-stretch flex-[0_0_auto]">
						{supplier.isVIP && (
							<div className="inline-flex items-center justify-center gap-1.5 sm:gap-2 sm:px-3 px-[10px] sm:py-1 py-0.5 relative flex-[0_0_auto] bg-yellow/10 rounded-[30px] border-[0.5px] border-solid border-yellow h-full">
								<Icon icon="crown" className="text-yellow sm:w-4 sm:h-4 w-[14px] h-[14px]" />
								<div className="relative w-fit font-medium text-yellow sm:text-xs text-[10px] tracking-[0] leading-[150%] whitespace-nowrap">
									VIP
								</div>
							</div>
						)}

						{supplier.isVerified && (
							<div className="inline-flex items-center justify-center gap-1.5 sm:gap-2 sm:px-3 px-[10px] sm:py-0 py-0.5 relative self-stretch flex-[0_0_auto] bg-primary/10 rounded-[30px] border-[0.5px] border-solid border-primary h-full">
								<Icon icon="target" className="text-primary sm:w-4 sm:h-4 w-[14px] h-[14px]" />
								<div className="relative w-fit  font-medium text-primary sm:text-xs text-[10px] tracking-[0] leading-[150%] whitespace-nowrap">
									Verified
								</div>
							</div>
						)}
					</div>
				</div>
			</div>

			<div className="flex items-start justify-between relative w-full">
				<div className="inline-flex flex-col items-start justify-center sm:gap-3 gap-2.5 relative w-full">
					<div className="inline-flex justify-between items-start gap-2.5 relative w-full">
						<div className="inline-flex items-center gap-2 sm:gap-2.5 relative w-full">
							<Icon icon={isDark ? "cube-dark" : "cube"} className="sm:w-5 sm:h-5 w-4 h-4 " />
							<div className="relative w-fit dark:text-textDark font-medium sm:text-xs tracking-[0] leading-[150%] text-[10px] whitespace-nowrap">
								MOQ: {supplier.moq} pieces
							</div>
						</div>
						<div className="relative w-fit font-medium text-primary sm:text-xs tracking-[0] leading-[150%] text-[10px] whitespace-nowrap">
							{supplier.responseRate}% response
						</div>
					</div>

					<div className="inline-flex items-center gap-2 sm:gap-2.5 relative flex-[0_0_auto]">
						<Icon icon={isDark ? "map-pin-dark" : "map-pin"} className="sm:w-5 sm:h-5 w-4 h-4 " />
						<div className="relative w-fit dark:text-textDark font-medium sm:text-xs tracking-[0] leading-[15px] sm:leading-[18px] text-[10px] whitespace-nowrap">
							{supplier.location}
						</div>
					</div>
				</div>
			</div>

			<div className="flex flex-wrap items-start sm:gap-[10px_10px] relative gap-2 h-full">
				{supplier.tags.map((tag, index) => (
					<div
						key={index}
						className="inline-flex items-center gap-2.5 px-[14px] sm:px-[15px] sm:py-[7px] py-[4.5px] relative flex-[0_0_auto] rounded-[90px] border border-border dark:border-borderDark">
						<div className="relative w-fit font-medium text-textSecondary dark:text-textDark sm:text-xs text-[10px] tracking-[0] leading-[150%] whitespace-nowrap">
							{tag.label}
						</div>
					</div>
				))}
			</div>

			<div className="flex items-center flex-row-reverse sm:gap-4 gap-3 relative self-stretch w-full">
				<Button
					className="sm:h-10 h-[34px] grow sm:text-sm text-xs !text-primary border-primary hover:bg-primary/10 w-full !font-medium"
					onClick={onViewProfile}
					variant="outline">
					View Profile
				</Button>
				<Button className="sm:h-10 h-[34px] sm:text-sm text-xs w-1/2 !font-medium" onClick={onSendRFQ}>
					Send RFQ
				</Button>
			</div>
		</div>
	);
};

export default SupplierCard;

import React from "react";
import Icon from "components/utils/Icon";
import { Button } from "components/utils/Button";

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
	return (
		<div className="flex flex-col h-full items-start justify-center sm:gap-4 gap-3 sm:p-4 p-3 relative flex-1 grow bg-white rounded-[20px] outline outline-solid outline-border">
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
								<div className="inline-flex flex-col items-start gap-0.5 sm:gap-1 relative flex-[0_0_auto]">
									<div className="relative w-fit [font-family:'Satoshi-Bold',Helvetica] font-bold text-center tracking-[0] leading-[150%] whitespace-nowrap truncate">
										{supplier.name}
									</div>

									<div className="inline-flex items-center gap-2.5 relative flex-[0_0_auto]">
										<div className="relative w-fit text-textSecondary sm:text-sm tracking-[0] leading-[150%] whitespace-nowrap text-xs">
											{supplier.country}
										</div>

										<div className="relative w-1.5 h-1.5 bg-border rounded-[3px]" />

										<div className="flex items-center gap-1 relative flex-[0_0_auto]">
											<Icon icon="star" className="text-yellow w-4 h-4" />
											<div className="text-textSecondary relative w-fit sm:text-sm text-xs tracking-[0] leading-[150%] whitespace-nowrap">
												{supplier.rating}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<button
							onClick={() => onBookmarkToggle(supplier.id)}
							className="relative sm:w-6 sm:h-6 w-5 h-5 hover:opacity-80 transition-opacity">
							<Icon
								icon={isBookmarked ? "bookmark-fill" : "bookmark"}
								size={24}
								className={
									isBookmarked ? "text-primary w-5 h-5" : "text-border sm:w-6 sm:h-6 !w-5 !h-5"
								}
							/>
						</button>
					</div>
				</div>

				<div className="flex sm:h-[26px] h-[22px] items-center gap-2.5 relative self-stretch w-full">
					<div className="inline-flex items-center gap-2.5 relative self-stretch flex-[0_0_auto]">
						{supplier.isVIP && (
							<div className="inline-flex items-center justify-center gap-2 sm:px-3 px-1.5 sm:py-1 py-0.5 relative flex-[0_0_auto] bg-yellow/10 rounded-[30px] border-[0.5px] border-solid border-yellow">
								<Icon icon="crown" className="text-yellow sm:w-4 sm:h-4 w-[14px] h-[14px]" />
								<div className="relative w-fit font-medium text-yellow sm:text-xs text-[10px] tracking-[0] leading-[150%] whitespace-nowrap">
									VIP
								</div>
							</div>
						)}

						{supplier.isVerified && (
							<div className="inline-flex items-center justify-center gap-2 sm:px-3 px-1.5 sm:py-0 py-0.5 relative self-stretch flex-[0_0_auto] bg-primary/10 rounded-[30px] border-[0.5px] border-solid border-primary">
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
					<div className="inline-flex justify-between items-center gap-2.5 relative w-full">
						<div className="inline-flex items-center gap-2.5 relative w-full">
							<Icon icon="cube" className="sm:w-5 sm:h-5 w-4 h-4 " />
							<div className="relative w-fit  font-medium sm:text-xs tracking-[0] leading-[150%] text-[10px] whitespace-nowrap">
								MOQ: {supplier.moq} pieces
							</div>
						</div>
						<div className="relative w-fit  font-medium text-primary sm:text-xs tracking-[0] leading-[150%] text-[10px] whitespace-nowrap">
							{supplier.responseRate}% response
						</div>
					</div>

					<div className="inline-flex items-center gap-2.5 relative flex-[0_0_auto]">
						<Icon icon="map-pin" className="sm:w-5 sm:h-5 w-4 h-4 " />
						<div className="relative w-fit  font-medium sm:text-xs tracking-[0] leading-[15px] sm:leading-[18px] text-[10px] whitespace-nowrap">
							{supplier.location}
						</div>
					</div>
				</div>
			</div>

			<div className="flex flex-wrap items-start sm:gap-[10px_10px] relative gap-2">
				{supplier.tags.map((tag, index) => (
					<div
						key={index}
						className="inline-flex items-center gap-2.5 px-[14px] sm:px-4 sm:py-2 py-[5.5px] relative flex-[0_0_auto] rounded-[90px] outline outline-solid outline-border">
						<div className="relative w-fit font-medium text-textSecondary sm:text-xs text-[10px] tracking-[0] leading-[150%] whitespace-nowrap">
							{tag.label}
						</div>
					</div>
				))}
			</div>

			<div className="flex items-center sm:gap-4 gap-3 relative self-stretch w-full flex-[0_0_auto]">
				<Button
					className="sm:h-10 h-[34px] grow sm:text-sm text-xs text-primary border-primary hover:bg-primary/10"
					onClick={onViewProfile}
					variant="outline">
					View Profile
				</Button>
				<Button className="sm:h-10 h-[34px] grow sm:text-sm text-xs" onClick={onSendRFQ}>
					Send RFQ
				</Button>
			</div>
		</div>
	);
};

export default SupplierCard;

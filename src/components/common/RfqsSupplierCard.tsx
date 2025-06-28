import React, { useState } from "react";
import Icon from "components/utils/Icon";
import { Button } from "components/utils/Button";
import { useAppState } from "components/utils/useAppState";
import DeletePopup from "./DeletePopup";
import { useNavigate } from "react-router-dom";

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
	isRfqSent: boolean;
	onViewProfile?: () => void;
	onSendRFQ?: () => void;
}

const RfqSupplierCard: React.FC<SupplierCardProps> = ({ supplier, isRfqSent, onViewProfile, onSendRFQ }) => {
	const [{ isDark }, setAppState] = useAppState();
	const [isDeleteOpen, setIsDeleteOpen] = useState(false);
	const [deleteItemType, setDeleteItemType] = useState("RFQ");
	const [dataName, setDataName] = useState("");
	const navigate = useNavigate();
	return (
		<>
			<div className="flex flex-col items-start justify-center sm:gap-4 gap-3 sm:p-[15px] p-[11px] relative flex-1 grow bg-white dark:bg-fgcDark rounded-2xl sm:rounded-[20px] border border-border dark:border-borderDark self-stretch">
				<div className="flex flex-col items-start sm:gap-3 gap-[10px] relative self-stretch w-full flex-[0_0_auto]">
					<div className="flex items-start gap-8 relative self-stretch w-full flex-[0_0_auto]">
						<div className="flex items-start justify-between relative flex-1 grow">
							<div className="inline-flex items-center gap-2 sm:gap-3 relative flex-[0_0_auto]">
								<div className="relative">
									<img
										className="relative sm:w-[42px] sm:h-[42px] w-[32px] h-[32px]"
										alt={`${supplier.name} logo`}
										src={supplier.image}
									/>
									<div className={`w-2 h-2 rounded-full absolute bottom-1 right-0 ${supplier.status === "online" ? "bg-green" : ""}`}></div>
								</div>


								<div className="inline-flex items-start sm:gap-3 gap-2.5 relative flex-[0_0_auto]">
									<div className="inline-flex flex-col items-start sm:gap-1 gap-0.5 relative flex-[0_0_auto]">
										<div className="relative dark:text-textDark w-fit font-bold text-center leading-[150%] whitespace-nowrap truncate">
											{supplier.name}
										</div>

										{isRfqSent ? (
											<div className="sm:text-sm text-xs leading-[150%] text-textSecondary dark:text-textSecondaryDark">
												To: PlastiCorp Industries
											</div>
										) : (
											<div className="inline-flex items-center gap-2 sm:gap-2.5 relative">
												{/* <div className="relative sm:!w-1.5 sm:!h-1.5 !w-1 !h-1 bg-border rounded-[3px]" /> */}
												<div className="relative w-fit text-textSecondary dark:text-textSecondaryDark sm:text-sm tracking-[0] leading-[150%] whitespace-nowrap text-xs">
													{supplier.country}
												</div>


												{/* <div className="flex items-center gap-0.5 sm:gap-1 relative flex-[0_0_auto]">
													<Icon
														icon="star"
														className="text-yellow sm:!w-4 sm:!h-4 !w-[14px] !h-[14px]"
													/>
													<div className="text-textSecondary dark:text-textSecondaryDark relative w-fit sm:text-xs text-[10px] tracking-[0] leading-[150%] whitespace-nowrap">
														{supplier.rating}
													</div>
												</div> */}
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="flex sm:h-[26px] h-[22px] items-center gap-2 sm:gap-2.5 relative self-stretch w-full">
						<div className="inline-flex items-center gap-2 sm:gap-2.5 relative self-stretch flex-[0_0_auto]">
							{supplier.isVIP && !isRfqSent && (
								<div className="inline-flex items-center justify-center gap-1.5 sm:gap-2 sm:px-[11.5px] px-[10.5px] sm:py-[3.5px] py-[2.5px] relative flex-[0_0_auto] bg-yellow/10 rounded-[30px] border-[0.5px] border-yellow h-full">
									<Icon icon="crown" className="text-yellow sm:w-4 sm:h-4 w-[14px] h-[14px]" />
									<div className="relative w-fit font-medium text-yellow sm:text-xs text-[10px] tracking-[0] leading-[150%] whitespace-nowrap">
										VIP
									</div>
								</div>
							)}

							{supplier.isVerified && !isRfqSent && (
								<div className="inline-flex items-center justify-center gap-1.5 sm:gap-2 sm:px-3 px-[10px] sm:py-0 py-[1px] relative self-stretch flex-[0_0_auto] bg-primary/10 rounded-[30px] border-[0.5px] border-solid border-primary">
									<Icon icon="target" className="text-primary sm:w-4 sm:h-4 w-[14px] h-[14px]" />
									<div className="relative w-fit  font-medium text-primary sm:text-xs text-[10px] tracking-[0] leading-[150%] whitespace-nowrap">
										Verified
									</div>
								</div>
							)}

							{isRfqSent && (
								<div className="inline-flex items-center justify-center gap-2 sm:px-3 px-[10px] sm:py-0 py-0.5 relative self-stretch flex-[0_0_auto] bg-teal/10 rounded-[30px] border-[0.5px] border-primary">
									<div className="relative w-fit font-medium text-teal sm:text-xs text-[10px] tracking-[0] leading-[150%] whitespace-nowrap">
										Quoted
									</div>
								</div>
							)}
						</div>
					</div>
				</div>

				{!isRfqSent && (
					<div className="dark:text-textDark sm:text-sm text-xs leading-[150%] font-medium">
						Industrial LED Strips - Waterproof IP67
					</div>
				)}

				<div className="flex items-start justify-between relative self-stretch w-full">
					<div className="inline-flex flex-col items-start justify-center sm:gap-3 gap-2.5 relative w-full">
						<div className="inline-flex items-center relative w-full justify-between">
							<div className="inline-flex justify-between items-center gap-2 sm:gap-2.5 relative flex-[0_0_auto]">
								<Icon icon={isDark ? "cube-dark" : "cube"} className="sm:w-5 sm:h-5 w-4 h-4 " />
								<div className="dark:text-textDark relative w-fit  font-medium sm:text-xs tracking-[0] leading-[150%] text-[10px] whitespace-nowrap">
									{isRfqSent ? "Items" : "MOQ"}: {supplier.moq} pieces
								</div>
							</div>
							<div className="relative w-fit mt-[-1.00px]  font-medium text-primary sm:text-xs tracking-[0] leading-[150%] text-[10px] whitespace-nowrap">
								{supplier.responseRate}% response
							</div>
						</div>

						
							<div className="inline-flex items-center gap-2 sm:gap-2.5 relative flex-[0_0_auto]">
								<Icon icon={isDark ? "coins-dark" : "coins"} className="sm:w-5 sm:h-5 w-4 h-4 " />
								<div className="dark:text-textDark relative w-fit  font-medium sm:text-xs tracking-[0] leading-[150%] text-[10px] whitespace-nowrap">
									Target: $0.15 per piece
								</div>
							</div>
						
							<div className="inline-flex items-center gap-2 sm:gap-2.5 relative">
								<Icon icon={isDark ? "map-pin-dark" : "map-pin"} className="sm:w-5 sm:h-5 w-4 h-4 " />
								<div className="dark:text-textDark relative w-fit font-medium sm:text-xs tracking-[0] leading-[150%] text-[10px] whitespace-nowrap">
									{supplier.location}
								</div>
							</div>
						
					</div>
				</div>

				<div className="gap-1 flex flex-col">
					<div className="text-textSecondary dark:text-textSecondaryDark sm:text-xs text-[10px] leading-[150%] font-normal">Message:</div>
					<div className="dark:text-textDark sm:text-xs text-[10px] leading-[150%] font-normal">
						{isRfqSent
							? "Food-grade material required, white color preferred"
							: "High-quality LED strips with 5-year warranty. MOQ: 1000 pieces. Sample available."}
					</div>
				</div>

				<div className="flex flex-wrap items-start sm:gap-[10px_10px] relative gap-2 h-full">
					{supplier.tags.map((tag, index) => (
						<div
							key={index}
							className="inline-flex items-center gap-2.5 px-[13px] sm:px-[15px] sm:py-[7px] py-[4.5px] relative flex-[0_0_auto] rounded-[90px] border border-border dark:border-borderDark">
							<div className="relative w-fit font-medium text-textSecondary dark:text-textDark sm:text-xs text-[10px] tracking-[0] leading-[150%] whitespace-nowrap">
								{tag.label}
							</div>
						</div>
					))}
				</div>

				<div className={`flex items-center ${isRfqSent ? "justify-between" : "flex-row-reverse"} sm:gap-4 gap-3 relative self-stretch w-full flex-[0_0_auto]`}>
					{isRfqSent && (
						<div
							onClick={() => {
								setDeleteItemType("RFQ");
								setDataName(supplier.name)
								setIsDeleteOpen(true);
							}}
							className="cursor-pointer sm:h-11 sm:w-11 border border-error rounded-full h-[34px] w-[34px] flex justify-center items-center sm:text-sm text-xs hover:bg-error/10">
							<Icon icon="trash" className="w-5 h-5 text-error" />
						</div>
					)}
					<Button
						className="!hidden sm:h-10 h-[34px] text-sm !text-primary border-primary hover:bg-primary/10 flex-1"
						onClick={onViewProfile}
						variant="outline">
						View Profile
					</Button>
					{isRfqSent && (
						<div className="">
						</div>
					)}
					{isRfqSent ? (
						<Button className="sm:h-10 h-[34px] !w-1/2 text-sm" onClick={onSendRFQ}>
							Edit
						</Button>
					) : (
						<Button
							className="sm:h-10 h-[34px] !w-1/2 text-sm"
							onClick={() => {
								localStorage.setItem('selectedSupplier', JSON.stringify(supplier));
								navigate("/supplier-messages", {
									state: {
										filteredSuppliers: [supplier],
									},
								})
							}}
						>
							View
						</Button>
					)}
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
				dataName={dataName}
			/>
		</>
	);
};

export default RfqSupplierCard;

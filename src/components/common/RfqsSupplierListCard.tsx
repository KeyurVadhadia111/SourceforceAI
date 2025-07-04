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

const RfqSupplierListCard: React.FC<SupplierCardProps> = ({ supplier, isRfqSent, onViewProfile, onSendRFQ }) => {
	const [{ isDark }, setAppState] = useAppState();
	const [isDeleteOpen, setIsDeleteOpen] = useState(false);
	const [deleteItemType, setDeleteItemType] = useState("RFQ");
	const navigate = useNavigate();

	return (
		<>
			<div className={`flex flex-col items-start justify-center lg:gap-4 gap-3 lg:p-4 p-[11px] w-full relative flex-1 grow ${Number(supplier.id) % 2 ? "bg-[#F9F9F9] dark:bg-fgcDark" : "bg-white dark:bg-bgcDark border-l border-r border-border dark:border-borderDark"} self-stretch`}>
				<div className="flex flex-col items-start lg:gap-3 gap-[10px] relative self-stretch w-full flex-[0_0_auto]">
					<div className="flex items-start gap-8 relative self-stretch w-full flex-[0_0_auto]">
						<div className="flex items-start justify-between relative w-full">
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
										<div className="relative dark:text-textDark w-[150px] font-bold leading-[150%] whitespace-nowrap truncate">
											{supplier.name}
										</div>
										<div className="block lg:hidden">
											{supplier.tags && supplier.tags.length > 0 && (
												<div className="w-[100%] truncate">
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
									</div>
								</div>
							</div>
							{isRfqSent ? (
								<div className="hidden lg:block lg:text-sm text-xs leading-[150%] text-textSecondary dark:text-textSecondaryDark">
									To: PlastiCorp Industries
								</div>
							) : (
								<div className="hidden lg:inline-flex items-center gap-2 lg:gap-2.5 relative">
									<Icon icon={isDark ? "map-pin-dark" : "map-pin"} className="lg:w-5 lg:h-5 w-4 h-4 " />

									<div className="relative w-fit text-textSecondary dark:text-textSecondaryDark lg:text-xs tracking-[0] leading-[150%] whitespace-nowrap text-xs">
										{supplier.country}
									</div>
									<div className="inline-flex items-center gap-2 lg:gap-2.5 relative">
										<div className="dark:text-textDark relative w-fit font-medium lg:text-xs tracking-[0] leading-[150%] text-[10px] whitespace-nowrap">
											{supplier.location}
										</div>
									</div>
								</div>
							)}
							{isRfqSent && (
								<div className="hidden lg:inline-flex items-center gap-2 lg:gap-2.5 relative flex-[0_0_auto]">
									<Icon icon={isDark ? "coins-dark" : "coins"} className="lg:w-5 lg:h-5 w-4 h-4 " />
									<div className="dark:text-textDark relative w-fit  font-medium lg:text-xs tracking-[0] leading-[150%] text-[10px] whitespace-nowrap">
										Target: $0.15 per piece:
									</div>
								</div>
							)}
							{!isRfqSent && (
								<div className="hidden lg:block dark:text-textDark lg:text-sm text-xs leading-[150%] font-medium">
									Industrial LED Strips - Waterproof IP67
								</div>
							)}
							<div className="hidden lg:inline-flex justify-between items-center gap-2 lg:gap-2.5 relative flex-[0_0_auto]">
								<Icon icon={isDark ? "cube-dark" : "cube"} className="lg:w-5 lg:h-5 w-4 h-4 " />
								<div className="dark:text-textDark relative w-fit  font-medium lg:text-xs tracking-[0] leading-[150%] text-[10px] whitespace-nowrap">
									{isRfqSent ? "Items" : "MOQ"}: {supplier.moq} pieces
								</div>
							</div>
							<div className="hidden lg:block relative w-fit mt-[-1.00px]  font-medium text-primary lg:text-xs tracking-[0] leading-[150%] text-[10px] whitespace-nowrap">
								{supplier.responseRate}% response
							</div>
						</div>
					</div>
				</div>

				<div className={`flex lg:flex-row flex-col items-center justify-center lg:gap-4 gap-2 relative w-full flex-[0_0_auto]`}>
					<div className="flex items-center w-full gap-2">
						<Icon icon="message" className="w-3.5 h-3.5 text-black dark:text-textDark" />
						<div className=" dark:text-textDark lg:text-xs text-[10px] leading-[150%] font-normal w-[97%]">
							{isRfqSent
								? "Food-grade material required, white color preferred"
								: "High-quality LED strips with 5-year warranty. Illuminate your projects with our premium-grade LED strips. High-quality LED strips with 5-year warranty. Illuminate your projects with our premium-grade LED strips. "}
						</div>
					</div>
					<div className="flex flex-row lg:w-auto w-full gap-2 lg:items-start items-center lg:justify-start justify-center">
						{isRfqSent && (
							<div
								onClick={() => {
									setDeleteItemType("RFQ");
									setIsDeleteOpen(true);
								}}
								className="cursor-pointer lg:h-9 lg:w-[66px] border border-error rounded-full h-[30px] w-[36px] flex justify-center items-center lg:text-sm text-xs hover:bg-error/10">
								<Icon icon="trash" className="w-5 h-5 text-error" />
							</div>
						)}
						<Button
							className="!hidden lg:h-10 h-[34px] text-sm !text-primary border-primary hover:bg-primary/10 flex-1"
							onClick={onViewProfile}
							variant="outline">
							View Profile
						</Button>
						{isRfqSent && (
							<div className="">
							</div>
						)}
						{isRfqSent ? (
							<Button className="lg:h-10 h-[34px] w-full lg:!w-full text-sm" onClick={onSendRFQ}>
								Edit
							</Button>
						) : (
							<Button className="lg:h-10 h-[34px] w-full lg:!w-[100px] text-sm"
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

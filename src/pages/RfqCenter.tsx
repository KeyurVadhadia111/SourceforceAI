import RfqSupplierCard from "components/common/RfqsSupplierCard";
import { Supplier } from "components/common/SupplierCard";
import CreateRfqPopup from "components/CreateRfqPopup";
import { Button } from "components/utils/Button";
import { suppliers } from "components/utils/consts";
import Icon from "components/utils/Icon";
import { cn } from "lib/utils";
import { useEffect, useState } from "react";
import SimpleBar from "simplebar-react";

const RfqCenter = () => {
	const [bookmarkedSuppliers, setBookmarkedSuppliers] = useState<Set<string>>(new Set());
	const [loading, setLoading] = useState(true);
	const [displaySuppliers, setDisplaySuppliers] = useState<Supplier[]>([]);
	const [isOpen, setIsOpen] = useState(false);
	const [selectedTab, setSelectedTab] = useState<"inbox" | "sent">("inbox");

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

	const handleViewProfile = (supplierId: string) => {
		// Implement view profile functionality
		console.log("View profile for supplier:", supplierId);
	};

	const handleSendRFQ = (supplierId: string) => {
		// Implement RFQ functionality
		console.log("Send RFQ for supplier:", supplierId);
	};

	return (
		<div>
			<SimpleBar className="sm:h-[calc(100dvh-105px)] h-[calc(100dvh-57px)]">
				<div className="flex flex-col sm:gap-6 gap-4 sm:p-6 p-6 relative">
					<div className="flex flex-col sm:gap-4">
						<div className="relative w-fit [font-family:'Satoshi-Bold',Helvetica] font-bold text-text sm:text-2xl tracking-[0] text-lg leading-[150%] whitespace-nowrap">
							RFQs Center
						</div>
						<div className="flex items-center justify-between relative self-stretch w-full flex-wrap gap-3">
							<div className="inline-flex items-center relative flex-[0_0_auto] border-b border-[#ced6d3]">
								<div
									onClick={() => {
										setSelectedTab("inbox");
									}}
									className={cn(
										"cursor-pointer inline-flex items-center justify-center gap-2 sm:px-8 px-[15px] sm:py-4 py-2 relative flex-[0_0_auto] border-b-2 sm:h-[54px] h-[34px]",
										selectedTab === "inbox"
											? "border-[#529e7e] text-primary font-bold "
											: "border-transparent text-[#5f726e] font-normal",
									)}>
									<div className="relative w-fit [font-family:'Satoshi',Helvetica] sm:text-base text-xs sm:leading-[1.4] leading-[150%]">
										Inbox
									</div>
								</div>
								<div
									onClick={() => {
										setSelectedTab("sent");
									}}
									className={cn(
										"cursor-pointer inline-flex items-center justify-center gap-2 sm:px-8 px-[15px] sm:py-4 py-2 relative flex-[0_0_auto] border-b-2 sm:h-[54px] h-[34px]",
										selectedTab === "sent"
											? "border-[#529e7e] text-primary font-bold "
											: "border-transparent text-[#5f726e] font-normal",
									)}>
									<div className="relative w-fit [font-family:'Satoshi',Helvetica] sm:text-base text-xs sm:leading-[1.4] leading-[150%]">
										Sent
									</div>
								</div>
							</div>

							<div className="inline-flex items-center justify-center sm:gap-3 gap-2 relative flex-[0_0_auto]">
								<Button
									variant="none"
									className="flex sm:w-10 sm:h-10 w-[34px] h-[34px] items-center justify-center gap-2.5 !p-2 relative bg-tgc rounded-[50px]">
									<Icon className="relative sm:w-5 sm:h-5 w-[17px] h-[17px]" icon="checker-board" />
								</Button>

								<Button
									variant="none"
									className="flex sm:w-10 sm:h-10 w-[34px] h-[34px] items-center justify-center gap-2.5 !p-2 relative bg-tgc rounded-[50px]">
									<Icon
										className="relative sm:w-5 sm:h-5 w-[17px] h-[17px]"
										icon="square-half-bottom"
									/>
								</Button>

								<Button
									onClick={() => {
										setIsOpen(true);
									}}
									className="inline-flex items-center justify-center sm:!gap-2.5 !gap-1.5 sm:!px-4 !px-3 !py-2 relative flex-[0_0_auto] bg-[#529e7e] rounded-[40px]">
									<div className="flex w-4 h-4 text-white rounded-full border border-white p-0.5 items-center justify-center">
										<Icon icon="plus" className="h-full w-full" />
									</div>

									<div className="relative w-fit [font-family:'Satoshi-Medium',Helvetica] font-medium text-white sm:text-sm text-xs tracking-[0] sm:leading-[21px] leading-[150%] whitespace-nowrap">
										Create RFQ
									</div>
								</Button>
							</div>
						</div>
					</div>

					{/* Supplier Cards */}
					<div className="w-full">
						<div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-start sm:gap-6 gap-4 relative w-full">
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
									<RfqSupplierCard
										key={supplier.id}
										supplier={supplier}
										isRfqSent={selectedTab === "inbox" ? false : true}
										onViewProfile={() => handleViewProfile(supplier.id)}
										onSendRFQ={() => handleSendRFQ(supplier.id)}
									/>
								))
							)}
						</div>
					</div>
				</div>
			</SimpleBar>
			{isOpen && <CreateRfqPopup isOpen={isOpen} setIsOpen={setIsOpen} />}
		</div>
	);
};

export default RfqCenter;

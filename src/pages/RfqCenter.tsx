import CreateRfqPopup from "components/common/CreateRfqPopup";
import RfqSupplierCard from "components/common/RfqsSupplierCard";
import { Supplier } from "components/common/SupplierCard";
import { Button } from "components/utils/Button";
import { RfqCenterInbox, RfqCenterSent } from "components/utils/consts";
import Icon from "components/utils/Icon";
import { useAppState } from "components/utils/useAppState";
import { cn } from "lib/utils";
import { useEffect, useState } from "react";
import SimpleBar from "simplebar-react";

const RfqCenter = () => {
	const [{ isDark, isExpanded }, setAppState] = useAppState();
	const [bookmarkedSuppliers, setBookmarkedSuppliers] = useState<Set<string>>(new Set());
	const [loading, setLoading] = useState(true);
	const [listInbox, setListInbox] = useState<Supplier[]>([]);
	const [listSent, setListSent] = useState<Supplier[]>([]);
	const [isOpen, setIsOpen] = useState(false);
	const [selectedTab, setSelectedTab] = useState<"inbox" | "sent">("inbox");

	useEffect(() => {
		// Simulating API call
		const fetchSuppliers = async () => {
			setLoading(true);
			try {
				// Replace with actual API call
				await new Promise(resolve => setTimeout(resolve, 1000));
				setListInbox(RfqCenterInbox);
				setListSent(RfqCenterSent);
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
			<SimpleBar className="sm:h-[calc(100dvh-105px)] h-[calc(100dvh-57px)] -ml-px">
				<div className="flex flex-col sm:gap-6 gap-4 sm:p-6 p-6 relative">
					<div className="flex flex-col sm:gap-4 gap-3">
						<div className="relative w-fit  font-bold text-text dark:text-textDark sm:text-2xl tracking-[0] text-lg leading-[150%] whitespace-nowrap">
							RFQs Center
						</div>
						<div className="flex items-center sm:justify-between relative self-stretch w-full flex-wrap gap-3 ">
							<div className="inline-flex items-center relative flex-[0_0_auto]">
								<div
									onClick={() => {
										setSelectedTab("inbox");
									}}
									className={cn(
										"cursor-pointer inline-flex items-center justify-center gap-2 sm:px-8 px-[13.745px] sm:py-4 py-2 sm:pb-[14px] pb-[7px] relative flex-[0_0_auto] border-b sm:border-b-2 border-border sm:h-[54px] h-[34px] box-border",
										selectedTab === "inbox"
											? "border-primary text-primary font-bold "
											: "border-border text-textSecondary dark:text-textSecondaryDark font-normal",
									)}>
									<div className="relative w-fit  sm:text-base text-xs sm:leading-[1.4] leading-[150%]">
										Inbox
									</div>
								</div>
								<div
									onClick={() => {
										setSelectedTab("sent");
									}}
									className={cn(
										"cursor-pointer inline-flex items-center justify-center gap-2 sm:px-8 px-[17.54px] sm:py-4 py-2 sm:pb-[14px] pb-[7px] relative flex-[0_0_auto] border-b sm:border-b-2 border-border sm:h-[54px] h-[34px]",
										selectedTab === "sent"
											? "border-primary text-primary font-bold "
											: "border-border text-textSecondary dark:text-textSecondaryDark font-normal",
									)}>
									<div className="relative w-fit  sm:text-base text-xs sm:leading-[1.4] leading-[150%]">
										Sent
									</div>
								</div>
							</div>

							<div className="inline-flex items-center justify-center sm:gap-3 gap-2 relative flex-[0_0_auto]">
								<Button
									variant="none"
									className="flex sm:w-10 sm:h-10 w-[34px] h-[34px] items-center justify-center gap-2.5 !p-[6px] sm:!p-2 relative bg-tgc dark:bg-fgcDark rounded-[50px]">
									<Icon className="relative sm:w-5 sm:h-5 w-[17px] h-[17px]" icon={isDark ? "checkerboard-dark" : "checker-board"} />
								</Button>

								<Button
									variant="none"
									className="flex sm:w-10 sm:h-10 w-[34px] h-[34px] items-center justify-center gap-2.5 !p-2 relative bg-tgc dark:bg-fgcDark rounded-[50px]">
									<Icon
										className="relative sm:w-5 sm:h-5 w-[17px] h-[17px]"
										icon={isDark? "squarehalfbottom-dark" : "square-half-bottom"}
									/>
								</Button>

								<Button
									onClick={() => {
										setIsOpen(true);
									}}
									className="inline-flex items-center justify-center sm:!gap-2.5 !gap-1.5 sm:!px-4 !px-[11px] !py-[7px] relative flex-[0_0_auto] bg-primary rounded-[40px]">
									<div className="flex w-4 h-4 text-white rounded-full outline outline-white p-0.5 items-center justify-center">
										<Icon icon="plus" className="h-full w-full" />
									</div>

									<div className="relative w-fit font-medium text-white sm:text-sm text-xs sm:leading-[21px]  leading-[150%] whitespace-nowrap">
										Create RFQ
									</div>
								</Button>
							</div>
						</div>
					</div>

					{/* Supplier Cards */}
					<div className="w-full">
						<div
							className={`grid 3xl:grid-cols-4 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 grid-cols-1 items-start sm:gap-6 gap-4 relative w-full ${isExpanded ? "md:grid-cols-1" : "md:grid-cols-2"}`}>
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
								(selectedTab === "inbox" ? listInbox : listSent).map(supplier => (
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

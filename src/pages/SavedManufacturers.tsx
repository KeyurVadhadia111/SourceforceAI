import SupplierCard, { Supplier } from "components/common/SupplierCard";
import { Button } from "components/utils/Button";
import { suppliersSearchFilter } from "components/utils/consts";
import Icon from "components/utils/Icon";
import { useAppState } from "components/utils/useAppState";
import React, { useEffect, useState } from "react";
import SimpleBar from "simplebar-react";

const SavedManufacturers = () => {
	const [{ isExpanded }, setAppState] = useAppState();
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
				setDisplaySuppliers(suppliersSearchFilter);
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
				<div className="flex flex-col sm:gap-6 gap-4 p-6 relative">
					<div className="flex items-center justify-between relative self-stretch w-full flex-wrap gap-4">
						<p className="relative w-fit font-bold text-text sm:text-2xl tracking-[0] text-lg leading-[150%] whitespace-nowrap">
							Saved manufacturers (14 Results)
						</p>

						<div className="inline-flex items-start justify-center  gap-2 sm:gap-3 relative flex-[0_0_auto]">
							<Button
								variant="none"
								className="flex sm:w-10 sm:h-10 w-[34px] h-[34px] items-center justify-center gap-2.5 !p-2 relative bg-tgc rounded-[50px]">
								<Icon className="relative sm:w-5 sm:h-5 w-[17px] h-[17px]" icon="checker-board" />
							</Button>

							<Button
								variant="none"
								className="flex sm:w-10 sm:h-10 w-[34px] h-[34px] items-center justify-center gap-2.5 !p-2 relative bg-tgc rounded-[50px]">
								<Icon className="relative sm:w-5 sm:h-5 w-[17px] h-[17px]" icon="square-half-bottom" />
							</Button>
						</div>
					</div>

					{/* Saved manufacturers */}
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
		</div>
	);
};

export default SavedManufacturers;

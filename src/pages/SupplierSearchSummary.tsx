import SideMenu from "components/common/SideMenu";
import SupplierCard, { Supplier } from "components/common/SupplierCard";
import { Button } from "components/utils/Button";
import { suppliers } from "components/utils/consts";
import Icon from "components/utils/Icon";
import { useAppState } from "components/utils/useAppState";
import React, { useEffect, useState } from "react";
import SimpleBar from "simplebar-react";
import FilterTag from "components/common/FilterTag";

interface FilterTag {
	id: string;
	label: string;
}

const initialFilterTags: FilterTag[] = [
	{ id: "country", label: "China" },
	{ id: "delivery", label: "1-3 Days" },
	{ id: "price", label: "$3 - $12" },
	{ id: "rating", label: "4+ Stars" },
	{ id: "payment", label: "Credit/Debit" },
	{ id: "certification", label: "ISO Certified" },
];

const SupplierSearchSummary = () => {
	const [{ isDark, isExpanded, supplierSearchQueries }, setAppState] = useAppState();
	const [filterTags, setFilterTags] = useState<FilterTag[]>(supplierSearchQueries);
	const [bookmarkedSuppliers, setBookmarkedSuppliers] = useState<Set<string>>(new Set());
	const [loading, setLoading] = useState(true);
	const [displaySuppliers, setDisplaySuppliers] = useState<Supplier[]>([]);
	const [isOpen, setIsOpen] = useState(false);

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

	useEffect(() => {
		setFilterTags(supplierSearchQueries);

		return () => {
			true;
		};
	}, [supplierSearchQueries]);

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

	const handleRemoveFilter = (tagId: string) => {
		setFilterTags(prevTags => prevTags.filter(tag => tag.id !== tagId));
		setAppState({ supplierSearchQueries: supplierSearchQueries.filter((tag: any) => tag.id !== tagId) });
	};

	return (
		<div>
			<SimpleBar className="sm:h-[calc(100dvh-105px)] h-[calc(100dvh-57px)]">
				<div className="flex flex-col sm:gap-6 gap-4 p-6 relative">
					<div className="flex items-center justify-between relative self-stretch w-full flex-wrap gap-3">
						<p className="relative w-fit  font-bold text-text sm:text-2xl tracking-[0] text-lg leading-[150%] whitespace-nowrap">
							Supplier Search Summary (59 Results)
						</p>

						<div className="inline-flex items-start justify-center gap-2 sm:gap-3 relative flex-[0_0_auto]">
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

							<Button
								variant="none"
								onClick={() => {
									setIsOpen(true);
								}}
								className="inline-flex sm:h-10 h-[34px] items-center gap-2 sm:!px-4 !px-3 !py-2 sm:!py-2.5 relative flex-[0_0_auto] bg-tgc rounded-[90px]">
								<Icon className="relative sm:w-5 sm:h-5 w-[16px] h-[16px]" icon="circles-three-plus" />

								<div className="relative w-fit mt-[-1.50px] font-medium text-textSecondary text-sm tracking-[0] leading-[18px] sm:leading-[21px] whitespace-nowrap">
									Filter
								</div>
							</Button>
						</div>
					</div>

					<div className="inline-flex items-center sm:gap-4 gap-2 flex-wrap">
						{filterTags.map(tag => (
							<FilterTag key={tag.id} id={tag.id} label={tag.label} onRemove={handleRemoveFilter} />
						))}
					</div>

					{/* Supplier Cards */}
					<div className="w-full">
						<div
							className={`grid 3xl:grid-cols-4 ${isExpanded ? "2xl:grid-cols-3" : "2xl:grid-cols-3"} xl:grid-cols-3 md:grid-cols-2 lg:grid-cols-2 sm:grid-cols-1 grid-cols-1 items-start sm:gap-6 gap-4 relative w-full`}>
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
			{isOpen && <SideMenu isOpen={isOpen} openFrom={'supplierSearch'} setIsOpen={setIsOpen} />}
		</div>
	);
};

export default SupplierSearchSummary;

import { Dialog, DialogPanel, Transition } from "@headlessui/react";
import { cn } from "lib/utils";
import { Button } from "components/utils/Button";
import { countryOptions } from "components/utils/consts";
import Icon from "components/utils/Icon";
import { Input } from "components/utils/Input";
import Select from "components/utils/Select";
import { useAppState } from "components/utils/useAppState";
import React, { Fragment, useEffect, useState } from "react";
import SimpleBar from "simplebar-react";

type RequestType = {
	isOpen: boolean;
	setIsOpen: (fl: boolean) => void;
	openFrom?: string;
};

type VerificationStatus = "VIP" | "Verified" | "New" | "Unverified" | string;
type ShippingTime = "1-3 Days" | "Standard" | "Longer" | string;
type PaymentMethod = "paypal" | "bank-transfer" | "credit-debit" | "crypto" | string;
type Certification = "ISO" | "CE" | "FDA" | "Other" | string;

type Option<T> = {
	value: T;
	label: string;
	icon?: string;
};

const SelectBox: React.FC<{
	selected: boolean;
	onClick: () => void;
	label: string;
	icon?: string;
	className?: any;
}> = ({ onClick, selected, label, icon, className = "" }) => {
	return (
		<div
			onClick={() => {
				onClick();
			}}
			className={`cursor-pointer  flex items-center justify-center sm:gap-3 gap-2 sm:px-8 px-[23px] py-[11px] sm:py-[13px] relative rounded-[50px] border border-solid ${selected ? "border-primary  bg-primary/10 text-primary" : "border-border bg-white text-text"} ${className}`}>
			{icon && <Icon className="sm:w-5 sm:h-5 w-4 h-4 text-primary" icon={icon} />}
			<div className="sm:text-base text-sm leading-[22px] whitespace-nowrap">{label}</div>
		</div>
	);
};

const SideMenu: React.FC<RequestType> = ({ isOpen, setIsOpen, openFrom }) => {
	const [{ user }, setAppState] = useAppState();
	const [supplierSearchQueries, setSupplierSearchQueries] = useState<any>([]);

	// Initialize state with empty values
	const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>("");
	const [shippingTime, setShippingTime] = useState<ShippingTime>("");
	const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("");
	const [certifications, setCertifications] = useState<Certification>("");
	const [minimumRating, setMinimumRating] = useState<number>(0);
	const [location, setLocation] = useState("");
	const [excludeCountries, setExcludeCountries] = useState("");
	const [supplierType, setSupplierType] = useState("");
	const [price, setPrice] = useState<{ min: undefined | number; max: undefined | number }>({
		min: undefined,
		max: undefined,
	});

	useEffect(() => {
		let queries: any = [];
		if (openFrom === "supplierSearch") {
			queries = [
				{ id: "country", label: "China" },
				{ id: "shippingTime", label: "1-3 Days" },
				{ id: "price", label: "$3 - $12" },
				{ id: "rating", label: "4+ Stars" },
				{ id: "payment", label: "Credit/Debit" },
				{ id: "certification", label: "ISO Certified" },
				{ id: "verificationStatus", label: "Verified" },
			];

			// Initialize all state variables based on queries
			setVerificationStatus(queries.find((tag: any) => tag.id === "verificationStatus")?.label || "");
			setShippingTime(queries.find((tag: any) => tag.id === "shippingTime")?.label || "");
			setPaymentMethod(
				paymentOptions.find(
					payment => payment.label === queries?.find((tag: any) => tag.id === "payment")?.label,
				)?.value || "",
			);
			setCertifications(queries.find((tag: any) => tag.id === "certification")?.label || "");

			const ratingStr = queries.find((tag: any) => tag.id === "rating")?.label || "";
			setMinimumRating(ratingStr ? parseInt(ratingStr) : 0);

			setLocation(queries.find((tag: any) => tag.id === "country")?.label || "");
			setExcludeCountries(queries.find((tag: any) => tag.id === "excludeCountries")?.label?.split(": ")[1] || "");
			setSupplierType(queries.find((tag: any) => tag.id === "supplierType")?.label || "");

			const priceTag = queries.find((tag: any) => tag.id === "price")?.label || "";
			const [min, max] = priceTag.replace(/\$/g, "").split(" - ");
			setPrice({
				min: min ? +min : undefined,
				max: max ? +max : undefined,
			});
		} else {
			queries = [
				{ id: "country", label: "" },
				{ id: "shippingTime", label: "" },
				{ id: "price", label: "" },
				{ id: "rating", label: "" },
				{ id: "payment", label: "" },
				{ id: "certification", label: "" },
				{ id: "verificationStatus", label: "" },
			];
			// Reset all state variables
			setVerificationStatus("");
			setShippingTime("");
			setPaymentMethod("");
			setCertifications("");
			setMinimumRating(0);
			setLocation("");
			setExcludeCountries("");
			setSupplierType("");
			setPrice({ min: undefined, max: undefined });
		}
		setSupplierSearchQueries(queries);
	}, [openFrom]);

	const supplierTypes = [
		{ value: "manufacturer", label: "Manufacturer" },
		{ value: "wholesaler", label: "Wholesaler" },
		{ value: "distributor", label: "Distributor" },
		{ value: "retailer", label: "Retailer" },
		{ value: "importer", label: "Importer" },
		{ value: "exporter", label: "Exporter" },
		{ value: "service_provider", label: "Service Provider" },
		{ value: "dropshipper", label: "Dropshipper" },
		{ value: "contractor", label: "Contractor" },
		{ value: "consultant", label: "Consultant" },
		{ value: "trader", label: "Trader" },
		{ value: "agent", label: "Agent" },
		{ value: "local_vendor", label: "Local Vendor" },
		{ value: "international_vendor", label: "International Vendor" },
	];

	const verificationOptions: Option<VerificationStatus>[] = [
		{ value: "VIP", label: "VIP" },
		{ value: "Verified", label: "Verified" },
		{ value: "New", label: "New" },
		{ value: "Unverified", label: "Unverified" },
	];

	const shippingOptions: Option<ShippingTime>[] = [
		{ value: "1-3 Days", label: "Fast Shipping (1-3 Days)" },
		{ value: "4-7 Days", label: "Standard Shipping (4-7 Days)" },
		{ value: "8+ Days", label: "Longer Shipping (8+ Days)" },
	];

	const certificationOptions: Option<Certification>[] = [
		{ value: "ISO Certified", label: "ISO Certified" },
		{ value: "CE Certified", label: "CE Certified" },
		{ value: "FDA Approved", label: "FDA Approved" },
		{ value: "Other Certifications", label: "Other Certifications" },
	];

	const paymentOptions: Option<PaymentMethod>[] = [
		{ value: "paypal", label: "PayPal", icon: "paypal" },
		{ value: "bank-transfer", label: "Bank Transfer", icon: "bank" },
		{ value: "credit-debit", label: "Credit/Debit", icon: "credit-debit-card" },
		{ value: "crypto", label: "Cryptocurrency", icon: "bitcoin" },
	];

	const handleApplyFilter = () => {
		const filters: any[] = [];

		if (verificationStatus) {
			filters.push({ id: "verificationStatus", label: verificationStatus });
		}

		if (shippingTime) {
			filters.push({ id: "shippingTime", label: shippingTime });
		}

		if (paymentMethod) {
			filters.push({ id: "payment", label: paymentMethod });
		}

		if (certifications) {
			filters.push({ id: "certification", label: certifications });
		}

		if (minimumRating) {
			filters.push({ id: "rating", label: `${minimumRating}+ Stars` });
		}

		if (location) {
			filters.push({ id: "country", label: location });
		}

		if (excludeCountries) {
			filters.push({ id: "excludeCountries", label: `Exclude: ${excludeCountries}` });
		}

		if (supplierType) {
			filters.push({ id: "supplierType", label: supplierType });
		}

		if (price.min !== undefined || price.max !== undefined) {
			const min = price.min ?? 0;
			const max = price.max !== undefined ? price.max : "Any";
			filters.push({ id: "price", label: `$${min} - $${max}` });
		}

		setAppState({ supplierSearchQueries: filters });
		setIsOpen(false);
	};

	const handleResetFilter = () => {
		setAppState({ supplierSearchQueries: [] });
		setVerificationStatus("");
		setShippingTime("");
		setPaymentMethod("");
		setCertifications("");
		setMinimumRating(0);
		setLocation("");
		setExcludeCountries("");
		setSupplierType("");
		price.max = undefined;
		price.min = undefined;
		setPrice({ ...price });
	};

	if (!isOpen) return null;

	return (
		<Transition.Root show={isOpen} as={Fragment}>
			<Dialog
				as="div"
				className="relative z-[100]"
				onClose={() => {
					setIsOpen(false);
				}}>
				<Transition.Child
					as={Fragment}
					enter="transform transition ease-in-out duration-300"
					enterFrom="translate-x-full opacity-0"
					enterTo="translate-x-0 opacity-100"
					leave="transform transition ease-in-out duration-200"
					leaveFrom="translate-x-0 opacity-100"
					leaveTo="translate-x-full opacity-0">
					<div className="fixed inset-0 sm:bg-black/50" />
				</Transition.Child>

				<div className="fixed inset-0">
					<div className="flex justify-end items-center w-full min-h-full text-center">
						<Transition.Child
							as={Fragment}
							enter="transform transition ease-in-out duration-300"
							enterFrom="translate-x-full opacity-0"
							enterTo="translate-x-0 opacity-100"
							leave="transform transition ease-in-out duration-200"
							leaveFrom="translate-x-0 opacity-100"
							leaveTo="translate-x-full opacity-0">
							<DialogPanel
								className={cn(
									"relative",
									`sm:w-[900px] w-full sm:mt-0 mt-[60px]`,
									"text-left align-middle h-full bg-bgc transition-all transform dark:bg-fgcDark",
								)}>
								<div className="flex flex-col items-start relative sm:px-0">
									<div className="w-full px-6 sm:px-0">
										<div className="flex items-center justify-between sm:p-[30px] pb-4  relative self-stretch w-full flex-[0_0_auto] border-b border-border">
											<div className="relative w-fit font-bold text-text sm:text-2xl text-lg text-center sm:leading-[34px] leading-[25px] whitespace-nowrap">
												Supplier Search Filters
											</div>
											<div className="inline-flex items-center justify-center sm:h-[30px] sm:w-[30px]  w-[20px] h-[20px]">
												<Icon
													onClick={() => {
														setIsOpen(false);
													}}
													icon="x-mark"
													className="cursor-pointer sm:w-[26.88px] sm:h-[26.88px] w-[20px] h-[20px] border-1 rounded-full sm:p-1 p-0.5"
												/>
											</div>
										</div>
									</div>

									<SimpleBar className="px-6 sm:px-0 sm:h-[calc(100dvh-212px)] h-[calc(100dvh-237px)] w-full">
										<div className="flex flex-col items-start gap-4 sm:gap-[30px] sm:p-[30px] py-4 relative self-stretch w-full">
											<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center sm:gap-6 gap-4 relative w-full flex-wrap">
												<Input
													icon="map-pin"
													placeholder="Supplier Location"
													variant="secondary"
													// value={location}
													onChange={e => {
														setLocation(e.target.value);
													}}
												/>
												<Select
													icon="prohibit"
													variant="secondary"
													id="12"
													value={excludeCountries}
													onChange={e => {
														setExcludeCountries(e.target.value);
													}}>
													<option value="">Exclude Countries</option>
													{countryOptions.map(country => (
														<option key={country.value} value={country.value}>
															{country.label}
														</option>
													))}
												</Select>
												<Select
													icon="prohibit"
													variant="secondary"
													id="234"
													value={supplierType}
													onChange={e => {
														setSupplierType(e.target.value);
													}}>
													<option value="">Supplier Type</option>
													{supplierTypes.map(type => (
														<option key={type.value} value={type.value}>
															{type.label}
														</option>
													))}
												</Select>
											</div>

											<div className="flex flex-col items-start sm:gap-4 gap-[14px] relative self-stretch w-full flex-[0_0_auto]">
												<div className="relative w-fit font-medium text-text sm:text-xl text-base leading-[150%] whitespace-nowrap">
													Verification Status
												</div>

												<div className="flex items-center sm:justify-between relative flex-wrap w-full sm:gap-0 gap-4">
													{" "}
													{verificationOptions.map(item => {
														return (
															<SelectBox
																key={item.value}
																label={item.label}
																onClick={() => {
																	setVerificationStatus(item.value);
																}}
																selected={verificationStatus === item.value}
																className="sm:!min-w-[198px]"
															/>
														);
													})}
												</div>
											</div>

											<div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
												<div className="relative font-medium text-text sm:text-xl text-base leading-[150%] whitespace-nowrap">
													Shipping Time
												</div>

												<div className="flex items-center sm:gap-0 gap-4 sm:justify-between relative flex-wrap w-full">
													{" "}
													{shippingOptions.map(item => {
														return (
															<SelectBox
																key={item.value}
																label={item.label}
																onClick={() => {
																	setShippingTime(item.value);
																}}
																selected={shippingTime === item.value}
																className="sm:!min-w-[269.33px]"
															/>
														);
													})}
												</div>
											</div>

											<div className="flex flex-col items-start gap-4 relative w-full">
												<div className="relative w-full font-medium text-text sm:text-xl text-base leading-[150%] whitespace-nowrap">
													Payment Methods
												</div>{" "}
												<div className="flex flex-wrap sm:flex-nowrap items-center gap-4 sm:justify-between relative overflow-x-auto">
													{paymentOptions.map(item => (
														<SelectBox
															key={item.value}
															label={item.label}
															icon={item.icon}
															onClick={() => {
																setPaymentMethod(item.value);
															}}
															selected={paymentMethod === item.value}
															className="sm:!min-w-[198px]"
														/>
													))}
												</div>
											</div>

											<div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
												<div className="relative w-full font-medium text-text sm:text-xl text-base leading-[150%] whitespace-nowrap">
													Certifications
												</div>{" "}
												<div className="flex items-center gap-4 sm:gap-0 sm:justify-between relative flex-wrap w-full">
													{" "}
													{certificationOptions.map(item => (
														<SelectBox
															key={item.value}
															label={item.label}
															onClick={() => {
																setCertifications(item.value);
															}}
															selected={certifications === item.value}
															className="sm:!w-[198px]"
														/>
													))}
												</div>
											</div>

											<div className="flex items-center gap-x-12 gap-y-4 relative self-stretch w-full flex-wrap">
												<div className="relative font-medium text-text sm:text-xl text-base leading-[150%] whitespace-nowrap">
													Price Range ($)
												</div>

												<div className="flex sm:gap-5 gap-4 relative">
													<Input
														icon="coins"
														placeholder="Min Price"
														type="number"
														variant="secondary"
														className="sm:!w-[315px]"
														// value={price.min}
														onChange={e => {
															price.min = +e.target.value;
															setPrice({ ...price });
														}}
													/>
													<Input
														icon="coins"
														placeholder="Max Price"
														type="number"
														variant="secondary"
														className="sm:!w-[315px]"
														// value={price.max}
														onChange={e => {
															price.max = +e.target.value;
															setPrice({ ...price });
														}}
													/>
												</div>
											</div>

											<div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
												<div className="relative w-fit font-medium text-text sm:text-xl text-base leading-[150%] whitespace-nowrap">
													Minimum Rating
												</div>{" "}
												<div className="flex items-center gap-4 relative flex-wrap w-full">
													{[1, 2, 3, 4, 5].map(rating => (
														<SelectBox
															key={rating}
															label={rating.toString()}
															icon="star-fill"
															onClick={() => {
																setMinimumRating(rating);
															}}
															selected={minimumRating === rating}
															className="sm:!min-w-[155.2px] sm:!px-[31px] sm:!py-[13px] !py-[9px] px-[23px]"
														/>
													))}
												</div>
											</div>
										</div>
									</SimpleBar>

									<div className="w-full px-6 sm:px-0">
										<div className="flex items-center justify-end gap-[223px] sm:p-[30px] py-6 relative self-stretch w-full flex-[0_0_auto] border-t border-border">
											<div className="inline-flex items-center sm:gap-4 gap-[14px] relative flex-[0_0_auto]">
												<Button
													onClick={() => {
														handleResetFilter();
													}}
													variant="outline"
													className="!border-primary sm:gap-2.5 gap-2 sm:pl-10 sm:pr-6 sm:py-4 p-[14px] sm:!w-[207px]">
													<div className="re font-medium text-primary sm:text-base text-sm leading-[150%] whitespace-nowrap">
														Reset All Filters
													</div>

													<Icon
														icon="x-mark"
														className="cursor-pointer w-[22px] h-[22px] border rounded-full p-0.5 border-primary text-primary"
													/>
												</Button>

												<Button
													onClick={() => {
														handleApplyFilter();
													}}
													className="sm:gap-2.5 gap-2 px-8 py-4 sm:!w-[187px]">
													<div className="re font-medium text-white sm:text-base text-sm leading-[150%] whitespace-nowrap ">
														Apply Filters
													</div>
												</Button>
											</div>
										</div>
									</div>
								</div>
							</DialogPanel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
};

export default SideMenu;

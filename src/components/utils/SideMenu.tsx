import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useAppState } from "./useAppState";
import Modal from "components/layout/modal";
import { Button } from "./Button";
import { classNames } from ".";
import { Dialog, Transition } from "@headlessui/react";
import Icon from "./Icon";
import { Input } from "./Input";
import Select from "./Select";
import { countryOptions } from "./consts";

type RequestType = {
	isOpen: boolean;
	setIsOpen: (fl: boolean) => void;
};

type VerificationStatus = "VIP" | "Verified" | "New" | "Unverified";
type ShippingTime = "Fast" | "Standard" | "Longer";
type PaymentMethod = "paypal" | "bank-transfer" | "credit-debit" | "crypto";
type Certification = "ISO" | "CE" | "FDA" | "Other";

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
	iconClass?: string;
}> = ({ onClick, selected, label, icon, className = "", iconClass = "" }) => {
	return (
		<div
			onClick={() => {
				onClick();
			}}
			className={`cursor-pointer  flex items-center justify-center sm:gap-2.5 gap-2 sm:px-8 px-[24px] py-3 sm:py-[14px] relative rounded-[50px] outline outline-solid ${selected ? "outline-primary  bg-primary/10 text-primary" : "outline-border bg-white text-text "} ${className}`}>
			{icon && <Icon className={`sm:w-5 sm:h-5 w-4 h-4 text-primary ${iconClass}`} icon={icon} />}
			<div className="sm:text-base text-sm leading-[22px] whitespace-nowrap">{label}</div>
		</div>
	);
};

const SideMenu: React.FC<RequestType> = ({ isOpen, setIsOpen }) => {
	const [{ user }, setAppState] = useAppState();

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
		{ value: "Fast", label: "Fast Shipping (1-3 Days) " },
		{ value: "Standard", label: "Standard Shipping (4-7 Days)" },
		{ value: "Longer", label: "Longer Shipping (8+ Days) " },
	];

	const certificationOptions: Option<Certification>[] = [
		{ value: "ISO", label: "ISO Certified" },
		{ value: "CE", label: "CE Certified" },
		{ value: "FDA", label: "FDA Approved" },
		{ value: "Other", label: "Other Certifications" },
	];

	const paymentOptions: Option<PaymentMethod>[] = [
		{ value: "paypal", label: "PayPal", icon: "paypal" },
		{ value: "bank-transfer", label: "Bank Transfer", icon: "bank" },
		{ value: "credit-debit", label: "Credit/Debit", icon: "credit-debit-card" },
		{ value: "crypto", label: "Cryptocurrency", icon: "bitcoin" },
	];

	const [verificationStatus, setVerificationStatus] = useState<"VIP" | "Verified" | "New" | "Unverified">("VIP");
	const [shippingTime, setShippingTime] = useState<"Fast" | "Standard" | "Longer">("Fast");
	const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("paypal");
	const [certifications, setCertifications] = useState<"ISO" | "CE" | "FDA" | "Other">("ISO");
	const [minimumRating, setMinimumRating] = useState<number>(5);

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
							<Dialog.Panel
								className={classNames(
									"relative",
									`sm:w-[900px] w-full sm:mt-0 mt-[32px]`,
									"text-left align-middle h-full bg-bgc transition-all transform dark:bg-fgcDark",
								)}>
								<div className="flex flex-col items-start relative sm:px-0">
									<div className="w-full px-6 sm:px-0">
										<div className="flex items-center justify-between sm:p-[30px] sm:pb-[29.34px] pt-6 pb-[15.34px] relative self-stretch w-full flex-[0_0_auto] border-b border-border">
											<div className="relative w-fit font-bold text-text sm:text-2xl text-lg text-center sm:leading-[34px] leading-[25px] whitespace-nowrap">
												Supplier Search Filters
											</div>

											<Icon
												onClick={() => {
													setIsOpen(false);
												}}
												icon="x-mark"
												className="cursor-pointer sm:w-[30px] sm:h-[30px] w-[20px] h-[20px] border-1 rounded-full sm:p-1 p-0.5"
											/>
										</div>
									</div>

									<div className="px-6 sm:px-0 overflow-y-auto sm:h-[calc(100dvh-208px)] h-[calc(100dvh-212px)] w-full">
										<div className="flex flex-col items-start gap-4 sm:gap-[30px] sm:p-[30px] py-4 relative self-stretch w-full">
											<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center sm:gap-6 gap-4 relative w-full flex-wrap">
												<Input
													icon="map-pin"
													placeholder="Supplier Location"
													variant="secondary"
													className="!pl-[56px] sm:!pl-[62px]"
												/>
												<Select icon="prohibit" variant="secondary" id="12">
													<option value="Exclude Countries">Exclude Countries</option>
													{countryOptions.map(country => (
														<option key={country.value} value={country.value}>
															{country.label}
														</option>
													))}
												</Select>
												<Select icon="prohibit" variant="secondary" id="234">
													<option value="Supplier Type">Supplier Type</option>
													{supplierTypes.map(type => (
														<option key={type.value} value={type.value}>
															{type.label}
														</option>
													))}
												</Select>
											</div>

											<div className="flex flex-col items-start sm:gap-4 gap-[14px] relative self-stretch w-full flex-[0_0_auto]">
												<div className="font-medium text-text sm:text-xl text-base tracking-[0.05px] leading-[150%] whitespace-nowrap">
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
												<div className="relative w-fit font-medium text-text sm:text-xl text-base tracking-[0] leading-[150%] whitespace-nowrap">
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
												<div className="relative w-full font-medium text-text sm:text-xl text-base tracking-[0] leading-[150%] whitespace-nowrap">
													Payment Methods
												</div>{" "}
												<div className="flex flex-wrap items-center gap-4 sm:gap-0 sm:justify-between relative w-full">
													{paymentOptions.map(item => (
														<SelectBox
															key={item.value}
															label={item.label}
															icon={item.icon}
															onClick={() => {
																setPaymentMethod(item.value);
															}}
															selected={paymentMethod === item.value}
															className="sm:!min-w-[198px]  sm:!px-8 !px-[23px]"
														/>
													))}
												</div>
											</div>

											<div className="flex flex-col items-start sm:gap-4 gap-[16px] relative self-stretch w-full flex-[0_0_auto]">
												<div className="relative w-fit font-medium text-text sm:text-xl text-base tracking-[0] leading-[150%] whitespace-nowrap">
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
															className="sm:!min-w-[198px]"
														/>
													))}
												</div>
											</div>

											<div className="flex items-center gap-x-12 gap-y-4 relative self-stretch w-full flex-wrap">
												<div className="relative w-fit font-medium text-text sm:text-xl text-base tracking-[0] leading-[150%] whitespace-nowrap">
													Price Range ($)
												</div>

												<div className="flex sm:gap-5 gap-4 relative">
													<Input
														icon="coins"
														placeholder="Min Price"
														type="number"
														variant="secondary"
														className="sm:!w-[315px]"
													/>
													<Input
														icon="coins"
														placeholder="Max Price"
														type="number"
														variant="secondary"
														className="sm:!w-[315px]"
													/>
												</div>
											</div>

											<div className="flex flex-col items-start sm:gap-4 gap-[16px] relative self-stretch w-full flex-[0_0_auto]">
												<div className="relative font-medium text-text sm:text-xl text-base tracking-[0] leading-[150%] whitespace-nowrap">
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
															className="sm:!min-w-[155.2px] sm:!py-[14px] !py-2.5"
															iconClass="sm:!h-5 !h-[14px] sm:!w-5 !w-[15px]"
														/>
													))}
												</div>
											</div>
										</div>
									</div>

									<div className="w-full px-6 sm:px-0">
										<div className="flex items-center justify-end gap-[223px] sm:p-[30px] pt-[15.34px] pb-0  relative self-stretch w-full flex-[0_0_auto] border-t border-border">
											<div className="inline-flex items-center sm:gap-4 gap-[14px] relative flex-[0_0_auto]">
												<Button
													variant="outline"
													className="!border-primary sm:gap-2.5 gap-2 sm:!pl-10 sm:!pr-6 sm:py-[15.34px] py-[12.34px] !px-[14.5px] sm:!w-[207px]">
													<div className="relative font-medium text-primary sm:text-base text-sm leading-[150%] whitespace-nowrap">
														Reset All Filters
													</div>

													<Icon
														icon="x-mark"
														className="cursor-pointer w-[22px] h-[22px] border rounded-full p-0.5 border-primary text-primary"
													/>
												</Button>

												<Button
													onClick={() => {
														setIsOpen(false);
													}}
													className="sm:gap-2.5 gap-2 px-8 !py-[12.84px] sm:!w-[187px] sm:py-![15.34px] !w-[155.5px]">
													<div className="relative font-medium text-white sm:text-base text-sm tracking-[0] leading-[150%] whitespace-nowrap ">
														Apply Filters
													</div>
												</Button>
											</div>
										</div>
									</div>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
};

export default SideMenu;

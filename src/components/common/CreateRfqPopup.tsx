import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { cn } from "lib/utils";
import Icon from "components/utils/Icon";
import { Input } from "components/utils/Input";
import Select from "components/utils/Select";
import { countryOptions } from "components/utils/consts";
import { Button } from "components/utils/Button";
import SimpleBar from "simplebar-react";

type RequestType = {
	isOpen: boolean;
	setIsOpen: (fl: boolean) => void;
	isEdit?: boolean;
	supplier?: any;
};


const CreateRfqPopup: React.FC<RequestType> = ({ isOpen, setIsOpen, supplier, isEdit = false }) => {

	const [productTitle, setProductTitle] = useState("");
	const [selectedSupplier, setSelectedSupplier] = useState("");
	const [category, setCategory] = useState("");
	const [country, setCountry] = useState("");
	const [quantity, setQuantity] = useState("");
	const [unit, setUnit] = useState("");
	const [targetPrice, setTargetPrice] = useState("");
	const [hsCode, setHsCode] = useState("");
	const [shippingAddress, setShippingAddress] = useState("");
	const [message, setMessage] = useState("");

	useEffect(() => {
		if (isEdit && supplier) {
			setProductTitle("LED Strip Lights 5050 SMD");
			setSelectedSupplier(supplier.name || "Dummy Supplier");
			setCategory("Electronics");
			setCountry("IN");
			setQuantity("1000");
			setUnit("pieces");
			setTargetPrice("$1.50");
			setHsCode("8543.70.00");
			setShippingAddress("123, Dummy Street, Mumbai");
			setMessage("Please ensure quality and timely delivery.");
			setSelectedImage(null);
		} else {
			// Clear fields when not in edit mode (i.e., Create RFQ)
			setProductTitle("");
			setSelectedSupplier("");
			setCategory("");
			setCountry("");
			setQuantity("");
			setUnit("");
			setTargetPrice("");
			setHsCode("");
			setShippingAddress("");
			setMessage("");
			setSelectedImage(null);
		}
	}, [isEdit, supplier]);


	const [selectedImage, setSelectedImage] = useState<string | null>(null);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const imageUrl = URL.createObjectURL(file);
			setSelectedImage(imageUrl);
		}
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
							<Dialog.Panel
								className={cn(
									"relative",
									`sm:w-3/4 w-full sm:mt-0 mt-[60px]`,
									"text-left align-middle h-full bg-bgc dark:bg-bgcDark transition-all transform",
								)}>
								<div className="flex flex-col items-start relative sm:px-0">
									<div className="w-full px-6 sm:px-0">
										<div className="flex items-center justify-between sm:p-[30px] pt-6 pb-4 relative self-stretch w-full flex-[0_0_auto] border-b border-border dark:border-borderDark">
											<div className="relative w-fit font-bold text-text dark:text-textDark sm:text-2xl text-lg text-center leading-[140%] whitespace-nowrap">
												{isEdit ? "Edit RFQ" : "Create New RFQ"}
											</div>

											<Icon
												onClick={() => {
													setIsOpen(false);
												}}
												icon="x-mark"
												className="dark:text-textDark cursor-pointer sm:w-[30px] sm:h-[30px] w-[20px] h-[20px] border-1 rounded-full sm:p-1 p-0.5"
											/>
										</div>
									</div>

									<SimpleBar className="px-6 sm:px-0 sm:h-[calc(100dvh-208px)] h-[calc(100dvh-237px)] w-full">
										{" "}
										<div className="grid sm:grid-cols-2 grid-cols-1 sm:gap-[30px] gap-4 sm:p-[30px] py-6">
											<Input
												variant="transparentBorder"
												placeholder="e.g., LED Strip Lights 5050 SMD"
												label="Product Title"
												className="placeholder:text-textSecondary dark:placeholder:text-textSecondaryDark dark:bg-fgcDark placeholder:text-sm"
												value={productTitle}
												onChange={(e) => setProductTitle(e.target.value)}
												required
											/>
											<Select
												variant="transparentBorder"
												label="Supplier"
												className="placeholder:text-textSecondary dark:placeholder:text-textSecondaryDark dark:bg-fgcDark placeholder:text-sm"
												value={selectedSupplier}
												onChange={(e: any) => setSelectedSupplier(e.target.value)}
											>
												<option value="">Select Supplier</option>
												<option value="Dummy Supplier">Dummy Supplier</option>
											</Select>

											<Select
												variant="transparentBorder"
												label="Product Category"
												className="placeholder:text-textSecondary dark:placeholder:text-textSecondaryDark dark:bg-fgcDark placeholder:text-sm"
												value={category}
												onChange={(e: any) => setCategory(e.target.value)}
											>
												<option value="">Select Category</option>
												<option value="Electronics">Electronics</option>
												<option value="Lighting">Lighting</option>
											</Select>

											<Select
												variant="transparentBorder"
												label="Preferred Country of Origin"
												className="placeholder:text-textSecondary dark:placeholder:text-textSecondaryDark dark:bg-fgcDark placeholder:text-sm "
												value={country}
												onChange={(e: any) => setCountry(e.target.value)}
											>
												<option value="">Select Country</option>
												{countryOptions.map(country => (
													<option key={country.value} value={country.value}>
														{country.label}
													</option>
												))}
											</Select>

											<Input
												variant="transparentBorder"
												placeholder="e.g., 5000"
												label="Quantity Required"
												className="placeholder:text-textSecondary dark:placeholder:text-textSecondaryDark dark:bg-fgcDark placeholder:text-sm flex-1"
												value={quantity}
												onChange={(e: any) => setQuantity(e.target.value)}
												required
											/>
											<Select
												variant="transparentBorder"
												label="Unit of Measurement"
												className="placeholder:text-textSecondary dark:placeholder:text-textSecondaryDark dark:bg-fgcDark placeholder:text-sm w-40"
												value={unit}
												onChange={(e: any) => setUnit(e.target.value)}
											>
												<option value="">Select Unit</option>
												<option value="pieces">Pieces</option>
												<option value="sets">Sets</option>
												<option value="units">Units</option>
											</Select>
											<Input
												variant="transparentBorder"
												placeholder="e.g., $1.50 per piece"
												label="Target Price (Optional)"
												className="placeholder:text-textSecondary dark:placeholder:text-textSecondaryDark dark:bg-fgcDark placeholder:text-sm flex-1"
												value={targetPrice}
												onChange={(e: any) => setTargetPrice(e.target.value)}
											/>

											<Input
												variant="transparentBorder"
												placeholder="e.g., 8543.70.00"
												label="HS Code (Optional)"
												className="placeholder:text-textSecondary dark:placeholder:text-textSecondaryDark dark:bg-fgcDark placeholder:text-sm w-40"
												value={hsCode}
												onChange={(e: any) => setHsCode(e.target.value)}
											/>
											<Icon
												icon="information-circle"
												className="w-5 h-5 text-textSecondary mt-7"
											/>
											<div className="sm:col-span-2">
												<Input
													variant="transparentBorder"
													placeholder="Enter your Shipping Address"
													label="Shipping Address"
													className="placeholder:text-textSecondary dark:placeholder:text-textSecondaryDark dark:bg-fgcDark placeholder:text-sm"
													value={shippingAddress}
													onChange={(e: any) => setShippingAddress(e.target.value)}
												/>
											</div>

											<div className="sm:col-span-2">
												<Input
													placeholder="Any Specific Requirements, Quality Standards, or additional information..."
													variant="transparentBorder"
													label="Message/Note"
													className="placeholder:text-textSecondary dark:placeholder:text-textSecondaryDark dark:bg-fgcDark placeholder:text-sm"
													value={message}
													onChange={(e: any) => setMessage(e.target.value)}
												/>
											</div>

											<div className="sm:col-span-2">
												<label className="pl-1 leading-[150%] text-text dark:text-textDark [font-family:'Satoshi-Regular',Helvetica] sm:mb-2 mb-1.5 block sm:text-base text-xs">
													Reference File (Optional)
												</label>
												<div className="relative">
													<input
														type="file"
														name="imageUpload"
														id="imageUpload"
														className="hidden"
														accept="image/*"
														onChange={handleImageChange}
													/>
													{selectedImage ? (
														<label htmlFor="imageUpload" className="rounded-lg w-full">
															<img
																src={selectedImage}
																alt="Preview"
																className="w-full rounded-lg"
															/>
														</label>
													) : (
														<label
															htmlFor="imageUpload"
															className="border border-dashed border-border dark:border-borderDark rounded-lg sm:py-4 py-3 px-5 flex flex-col items-center justify-center gap-3">
															<Icon
																icon="cloud-arrow-up"
																className="sm:w-8 sm:h-8 w-6 h-6 text-textSecondary dark:text-textSecondaryDark"
															/>
															<div className="text-center text-textSecondary dark:text-textSecondaryDark">
																<p className="[font-family:'Satoshi-Regular',Helvetica] sm:text-base text-xs leading-[150%]">
																	Drag & drop your image here or{" "}
																	<span className="text-primary cursor-pointer">
																		Browse
																	</span>
																</p>
															</div>
															<div className="text-center text-textSecondary dark:text-textSecondaryDark">
																<p className="sm:text-xs text-[10px] [font-family:'Satoshi',Helvetica] leading-[150%]">
																	Support Files (PNG, JPG)
																</p>
																<p className="sm:text-[10px] text-[8px] font-light [font-family:'Satoshi',Helvetica] leading-[150%]">
																	Max: 15 MB
																</p>
															</div>
														</label>
													)}
												</div>
											</div>
										</div>
									</SimpleBar>

									<div className="w-full px-6 sm:px-0">
										<div className="flex items-center justify-end gap-[223px] sm:p-[30px] py-6 relative self-stretch w-full flex-[0_0_auto] border-t border-border dark:border-borderDark">
											<div className="inline-flex items-center sm:gap-4 gap-[14px] relative flex-[0_0_auto]">
												<Button
													onClick={() => {
														setIsOpen(false);
													}}
													variant="outline"
													className="!border-primary sm:gap-2.5 gap-2 px-8 py-4">
													<div className="relative [font-family:'Satoshi-Medium',Helvetica] font-medium text-primary sm:text-base text-sm leading-[150%] whitespace-nowrap">
														Cancel
													</div>
												</Button>

												<Button
													onClick={() => {
														setIsOpen(false);
													}}
													className="sm:gap-2.5 gap-2 px-8 py-4">
													<div className="relative w-fit [font-family:'Satoshi-Medium',Helvetica] font-medium text-white sm:text-base text-sm tracking-[0] leading-[150%] whitespace-nowrap">
														{isEdit ? "Save RFQ" : "Create RFQ"}
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

export default CreateRfqPopup;

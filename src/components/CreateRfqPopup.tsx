import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { cn } from "lib/utils";
import Icon from "./utils/Icon";
import { Input } from "./utils/Input";
import Select from "./utils/Select";
import { Button } from "./utils/Button";
import { countryOptions } from "./utils/consts";
import { Separator } from "./utils/Separator";

type RequestType = {
	isOpen: boolean;
	setIsOpen: (fl: boolean) => void;
};

const CreateRfqPopup: React.FC<RequestType> = ({ isOpen, setIsOpen }) => {
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
									`sm:max-w-[900px] w-full sm:mt-0 mt-[56px]`,
									"text-left align-middle h-full bg-bgc transition-all transform dark:bg-fgcDark",
								)}>
								<div className="flex flex-col sm:gap-0 gap-4 items-start relative sm:px-0">
									<div className="w-full px-6 sm:px-0">
										<div className="flex items-start justify-between sm:p-[30px] pt-6 relative w-full flex-[0_0_auto]">
											<div className="relative w-fit font-bold text-text sm:text-2xl text-lg text-center leading-[140%] whitespace-nowrap">
												Create New RFQ
											</div>

											<Icon
												onClick={() => {
													setIsOpen(false);
												}}
												icon="x-mark-circle"
												className="cursor-pointer sm:w-[30px] sm:h-[30px] w-[20px] h-[20px]"
											/>
										</div>
									</div>
									<div className="px-6 sm:px-[30px] w-full">
										<Separator />
									</div>
									<div className="px-6 sm:px-0 overflow-y-auto sm:h-[calc(100dvh-208px)] h-[calc(100dvh-239px)] w-full">
										{" "}
										<div className="grid sm:grid-cols-2 grid-cols-1 sm:gap-[30px] gap-4 sm:p-[30px] py-0">
											<Input
												variant="transparentBorder"
												placeholder="e.g., LED Strip Lights 5050 SMD"
												label="Product Title"
												className="placeholder:text-textSecondary placeholder:text-sm"
												required
											/>
											<Select
												variant="transparentBorder"
												label="Supplier"
												className="placeholder:text-textSecondary placeholder:text-sm">
												<option value="">Select Supplier</option>
												<option value="Supplier 1">Supplier 1</option>
											</Select>

											<Select
												variant="transparentBorder"
												label="Product Category"
												className="placeholder:text-textSecondary placeholder:text-sm">
												<option value="">Select Category</option>
											</Select>

											<Select
												variant="transparentBorder"
												label="Preferred Country of Origin"
												className="placeholder:text-textSecondary placeholder:text-sm ">
												<option value="">Select Country</option>
												{countryOptions.map(country => (
													<option key={country.value} value={country.value}>
														{country.label}
													</option>
												))}
											</Select>

											<Input
												variant="transparentBorder"
												placeholder="e.g., 1000"
												label="Quantity Required"
												className="placeholder:text-textSecondary placeholder:text-sm flex-1"
												required
											/>
											<Select
												variant="transparentBorder"
												label="Unit of Measurement"
												className="placeholder:text-textSecondary placeholder:text-sm w-40">
												<option value="">Select Unit</option>
												<option value="pieces">Pieces</option>
												<option value="sets">Sets</option>
												<option value="units">Units</option>
											</Select>
											<Input
												variant="transparentBorder"
												placeholder="e.g., $1.50 per piece"
												label="Target Price (Optional)"
												className="placeholder:text-textSecondary placeholder:text-sm flex-1"
											/>

											<Input
												variant="transparentBorder"
												placeholder="e.g., 8541.41.00"
												label="HS Code (Optional)"
												className="placeholder:text-textSecondary placeholder:text-sm w-40"
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
													className="placeholder:text-textSecondary placeholder:text-sm"
												/>
											</div>

											<div className="sm:col-span-2">
												<Input
													placeholder="Any Specific Requirements, Quality Standards, or additional information..."
													variant="transparentBorder"
													label="Message/Note"
													className="placeholder:text-textSecondary placeholder:text-sm"
												/>
											</div>

											<div className="sm:col-span-2">
												<label className="leading-[150%] text-text dark:text-textDark sm:mb-2 mb-1.5 block sm:text-base text-xs font-medium">
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
															className="border border-dashed border-border rounded-lg sm:py-4 py-3 px-5 flex flex-col items-center justify-center gap-3">
															<Icon
																icon="cloud-arrow-up"
																className="sm:w-8 sm:h-8 w-6 h-6 text-textSecondary"
															/>
															<div className="text-center text-textSecondary">
																<p className="sm:text-base text-xs leading-[150%]">
																	Drag & drop your image here or{" "}
																	<span className="text-primary cursor-pointer">
																		Browse
																	</span>
																</p>
															</div>
															<div className="text-center text-textSecondary">
																<p className="sm:text-xs text-[10px]  leading-[150%]">
																	Supports PNG, JPG
																</p>
																<p className="sm:text-[10px] text-[8px] font-light  leading-[150%]">
																	Max: 15 MB
																</p>
															</div>
														</label>
													)}
												</div>
											</div>
										</div>
									</div>
									<div className="block sm:hidden px-6 sm:px-[30px] w-full">
										<Separator />
									</div>

									<div className="w-full px-6 sm:px-0">
										<div className="flex items-center justify-end gap-[223px] sm:p-[30px] pb-6 relative self-stretch w-full flex-[0_0_auto]">
											<div className="inline-flex items-center sm:gap-4 gap-[14px] relative flex-[0_0_auto]">
												<Button
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
														Create RFQ
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

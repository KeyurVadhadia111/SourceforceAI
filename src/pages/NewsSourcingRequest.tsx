import React, { useState } from "react";
import ChatSectionPage from "./ChatSectionPage";
import Icon from "components/utils/Icon";

const categories = [
	{ title: "LED Light Strips", icon: "" },
	{ title: "Wireless Chargers", icon: "" },
	{ title: "Silicone Phone Cases", icon: "" },
	{ title: "Portable Blenders", icon: "" },
	{ title: "More", icon: "menu" },
];

const NewsSourcingRequest = () => {
	const [step, setStep] = useState(1);
	return (
		<div className="flex flex-col justify-center items-center w-full py-6 sm:py-0">
			{/* Content */}
			{step === 1 && (
				<>
					<div className="sm:h-[calc(100dvh-322px)] h-[calc(100dvh-396px)] flex flex-col items-center sm:justify-center justify-start overflow-auto w-full px-6 sm:px-0">
						<h1 className="sm:text-[40px] text-[32px] text-center text-[#1e2d2a] sm:mb-4 leading-[150%] [font-family:'Outfit',sans-serif] mb-[14px]">
							Find High-Quality and <div className="font-bold ">Dependable Suppliers</div>
						</h1>
						<p className="text-base leading-[150%] text-center text-[#657471] max-w-2xl [font-family:'Outfit',sans-serif]">
							Discover top-rated, reliable suppliers instantly with our AI-powered sourcing tool. Ensure
							quality and consistency for every product with smart supplier recommendations.
						</p>
					</div>

					<div className="max-w-[858px] w-full px-6 sm:px-0">
						{/* Categories */}
						<div className="flex flex-wrap justify-center gap-3 mb-4">
							{categories.map((category, index) => (
								<div
									key={index}
									className="flex items-center border border-[#CED6D3] rounded-full px-5 sm:py-[9px] text-[#1E2D2A] font-normal cursor-pointer py-[5px]">
									<span className="text-[#1e2d2a] sm:text-sm text-xs leading-[150%] [font-family:'Satoshi-Medium',Helvetica] flex gap-1 items-center">
										{category.title}
										{category.icon && <Icon icon={category.icon} size={14} />}
									</span>
								</div>
							))}
						</div>

						{/* Message Input Section */}
						<label
							htmlFor="message"
							className="bg-[#F8F8F8] rounded-xl sm:p-6 p-4 flex flex-col gap-6 w-full">
							<textarea
								id="message"
								placeholder="Message..."
								className="w-full border-none border-[#ced6d3] focus:outline-none focus:ring-0 focus:ring-[#529e7e] resize-none [font-family:'Satoshi-Regular',Helvetica] leading-[150%]"
								rows={1}
							/>
							<div className="flex flex-row justify-between items-center flex-wrap gap-4">
								{/* Attach */}
								<button className="flex items-center bg-white rounded-full sm:px-4 px-3 py-2 sm:gap-2 gap-1.5">
									{/* Replace with your own Icon */}
									<Icon icon="paperclip" className="sm:h-[20px] sm:w-[20px] h-4 w-4" />
									<span className="text-[#5F726E] sm:text-sm text-xs">Attach</span>
								</button>
								<div className="flex flex-row sm:gap-4 gap-[14px]">
									{/* Company Search */}
									<button className="flex items-center bg-white rounded-full sm:px-4 px-3 py-2 sm:gap-2 gap-1.5">
										<Icon icon="magnifying-glass" className="sm:h-[20px] sm:w-[20px] h-4 w-4" />
										<span className="text-[#5F726E] sm:text-sm text-xs">Company Search</span>
									</button>
									{/* Pro */}
									<button className="flex items-center bg-white rounded-full sm:px-4 px-3 py-2 sm:gap-2 gap-1.5">
										<Icon icon="crown" className="sm:h-[20px] sm:w-[20px] h-4 w-4" />
										<span className="text-[#5F726E] sm:text-sm text-xs">Pro</span>
										<svg width="10" height="5" fill="none" viewBox="0 0 10 5" className="ml-1">
											<path
												d="M1 1l4 3 4-3"
												stroke="#5F726E"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									</button>
									{/* Send */}
									<button
										onClick={() => {
											setStep(2);
										}}
										className="flex items-center justify-center bg-[#529E7E] rounded-full sm:w-10 sm:h-10 text-white w-8 h-8">
										<Icon icon="arrow-up" size={16} />
									</button>
								</div>
							</div>
						</label>
					</div>
				</>
			)}
			{step === 2 && <ChatSectionPage />}
		</div>
	);
};

export default NewsSourcingRequest;

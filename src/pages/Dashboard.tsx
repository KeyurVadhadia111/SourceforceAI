import React, { useState } from "react";
import { Link } from "react-router-dom";
import ChatSectionPage from "./ChatSectionPage";
import Icon from "components/utils/Icon";
import Sidebar from "components/common/Sidebar";

const categories = [
	{ title: "LED Light Strips", icon: "" },
	{ title: "Wireless Chargers", icon: "" },
	{ title: "Silicone Phone Cases", icon: "" },
	{ title: "Portable Blenders", icon: "" },
	{ title: "More", icon: "menu" },
];

const Dashboard = () => {
	const [step, setStep] = useState(1);
	return (
		<div className="flex flex-col justify-center items-center w-full">
			{/* Content */}
			{step === 1 && (
				<>
					<div className="h-[calc(100dvh-366px)] flex flex-col items-center justify-center overflow-auto w-full">
						<h1 className="text-[40px] text-center text-[#1e2d2a] mb-4 leading-[150%] [font-family:'Satoshi-Bold',Helvetica]">
							Find High-Quality and <div className="font-bold ">Dependable Suppliers</div>
						</h1>
						<p className="text-base eading-[150%] text-center text-[#657471] max-w-2xl [font-family:'Satoshi-Regular',Helvetica]">
							Connect with trustworthy manufacturers and suppliers worldwide. Our advanced AI helps
							you find the perfect match for your business needs.
						</p>
					</div>

					<div className="max-w-[858px] w-full">
						{/* Categories */}
						<div className="flex flex-wrap justify-center gap-3 mb-6">
							{categories.map((category, index) => (
								<div
									key={index}
									className="flex items-center border border-[#CED6D3] rounded-full px-5 py-[9px] text-[#1E2D2A] font-normal cursor-pointer">
									<span className="text-[#1e2d2a] text-sm leading-[150%] [font-family:'Satoshi-Medium',Helvetica] flex gap-1 items-center">
										{category.title}
										{category.icon && <Icon icon={category.icon} size={14} />}
									</span>
								</div>
							))}
						</div>

						{/* Message Input Section */}
						<label
							htmlFor="message"
							className="bg-[#F8F8F8] rounded-xl p-6 flex flex-col gap-2 w-full">
							<textarea
								id="message"
								placeholder="Message..."
								className="w-full max-h-[64px] border-none border-[#ced6d3] focus:outline-none focus:ring-0 focus:ring-[#529e7e] resize-none [font-family:'Satoshi-Regular',Helvetica]"
								rows={3}
							/>
							<div className="flex flex-row justify-between items-center">
								{/* Attach */}
								<button className="flex items-center bg-white rounded-full px-4 py-2 gap-2">
									{/* Replace with your own Icon */}
									<Icon icon="paperclip" size={20} />
									<span className="text-[#5F726E] text-sm">Attach</span>
								</button>
								<div className="flex flex-row gap-4">
									{/* Company Search */}
									<button className="flex items-center bg-white rounded-full px-4 py-2 gap-2">
										<Icon icon="magnifying-glass" size={20} />
										<span className="text-[#5F726E] text-sm">Company Search</span>
									</button>
									{/* Pro */}
									<button className="flex items-center bg-white rounded-full px-4 py-2 gap-2">
										<Icon icon="crown" size={20} />
										<span className="text-[#5F726E] text-sm">Pro</span>
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
										className="flex items-center justify-center bg-[#529E7E] rounded-full w-10 h-10 text-white">
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

export default Dashboard;

import React from "react";
import { Link } from "react-router-dom";

const categories = ["LED Light Strips", "Wireless Chargers", "Silicone Phone Cases", "Portable Blenders", "More"];

const Dashboard2 = () => {
	return (
		<>
			<div className="bg-white w-full" data-model-id="68:2636">
				<div className="bg-white overflow-hidden">
					<div className="relative w-[1441px] h-[1208px] -left-px">
						<div className="flex w-[1441px] h-[1080px] items-start absolute top-0 left-0">
							<div className="inline-flex flex-col h-[1080px] items-center justify-between p-6 relative flex-[0_0_auto] bg-[#1e2d2a]">
								<div className="inline-flex flex-col items-start gap-12 relative flex-[0_0_auto]">
									<img
										className="relative w-14 h-14"
										alt="Group"
										src="assets/images/logo/logo-primary.svg"
									/>

									<div className="inline-flex flex-col items-start gap-3 relative flex-[0_0_auto]">
										<div className="relative w-14 h-14">
											<img
												className="absolute w-8 h-8 top-3 left-3"
												alt="Asterisk simple"
												src="assets/images/asterisksimple-7.svg"
											/>
										</div>

										<div className="relative w-14 h-14">
											<img
												className="absolute w-8 h-8 top-3 left-3"
												alt="Cube focus"
												src="assets/images/cubefocus-9.svg"
											/>
										</div>

										<div className="relative w-14 h-14">
											<img
												className="absolute w-8 h-8 top-3 left-3"
												alt="Factory"
												src="assets/images/factory-9.svg"
											/>
										</div>

										<div className="relative w-14 h-14">
											<img
												className="absolute w-8 h-8 top-3 left-3"
												alt="Presentation chart"
												src="assets/images/presentationchart-9.svg"
											/>
										</div>

										<div className="relative w-14 h-14">
											<img
												className="absolute w-8 h-8 top-3 left-3"
												alt="Heart half"
												src="assets/images/hearthalf-9.svg"
											/>
										</div>

										<div className="relative w-14 h-14">
											<img
												className="absolute w-8 h-8 top-3 left-3"
												alt="Policy"
												src="assets/images/policy-1-7.svg"
											/>
										</div>

										<div className="relative w-14 h-14">
											<img
												className="absolute w-8 h-8 top-3 left-3"
												alt="Chat circle text"
												src="assets/images/chatcircletext-7.svg"
											/>
										</div>
									</div>
								</div>

								<img
									className="relative w-14 h-14 object-cover"
									alt="Photo by evan wise"
									src="assets/images/photo-by-evan-wise.png"
								/>

								<img
									className="absolute w-[3px] h-[59px] top-[126px] left-px"
									alt="Line"
									src="assets/images/line-3-7.svg"
								/>
							</div>

							<div className="flex w-[1337px] items-center justify-between px-8 py-6 relative border-b [border-bottom-style:solid] border-[#ced6d3]">
								<div className="inline-flex items-center gap-2.5 relative flex-[0_0_auto]">
									<img
										className="relative w-[189.66px] h-[21.2px]"
										alt="Union"
										src="assets/images/logo/union-9.svg"
									/>

									<div className="relative w-6 h-6">
										<img
											className="w-3 h-1.5 top-[9px] absolute left-1.5"
											alt="Direction down"
											src="assets/images/direction-down.png"
										/>
									</div>
								</div>

								<div className="inline-flex items-center gap-4 relative flex-[0_0_auto]">
									<div className="inline-flex items-center p-1 relative flex-[0_0_auto] bg-[#eef1f0] rounded-[100px]">
										<div className="flex w-12 h-12 items-center justify-center gap-2.5 px-[3px] py-0.5 relative bg-white rounded-[100px]">
											<img
												className="relative w-6 h-6"
												alt="Cloud sun"
												src="assets/images/cloudsun-7.svg"
											/>
										</div>

										<div className="flex w-12 h-12 items-center justify-center gap-2.5 px-[3px] py-0.5 relative rounded-[100px] overflow-hidden">
											<img
												className="relative w-6 h-6"
												alt="Cloud moon"
												src="assets/images/cloudmoon-9.svg"
											/>
										</div>
									</div>

									<div className="inline-flex items-center justify-center gap-3 px-8 py-4 relative flex-[0_0_auto] bg-[#529e7e] rounded-[40px]">
										<img
											className="relative w-6 h-6"
											alt="Export"
											src="assets/images/export-9.svg"
										/>

										<div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Bold',Helvetica] font-bold text-white text-base tracking-[0] leading-6 whitespace-nowrap">
											Share
										</div>
									</div>
								</div>

								<div className="absolute w-6 h-6 top-10 -left-3 bg-white rounded-[100px]">
									<div className="relative w-4 h-4 top-1 left-1">
										<img
											className="w-1 h-2 top-1 absolute left-1.5"
											alt="Direction right"
											src="assets/images/direction-right.png"
										/>
									</div>
								</div>
							</div>
						</div>

						<div className="flex flex-col w-[1337px] items-start absolute top-[104px] left-[104px] border border-solid border-[#ced6d3]">
							<div className="flex flex-col items-start gap-6 p-6 relative self-stretch w-full flex-[0_0_auto]">
								{/* <Div /> */}
								<div className="min-h-screen flex flex-col items-center justify-center bg-white">
									{/* Headline */}
									<div className="mt-[230px] text-center">
										<h1 className="font-outfit text-[40px] leading-[60px] font-light text-[#1E2D2A]">
											Find High-Quality and{" "}
											<span className="font-bold">Dependable Suppliers</span>
										</h1>
									</div>
									{/* Subheadline */}
									<div className="mt-2 text-[#5F726E] text-[16px] font-medium leading-6 text-center max-w-xl">
										Discover top-rated, reliable suppliers instantly with our AI-powered sourcing
										tool. Ensure quality and consistency for every product with smart supplier
										recommendations.
									</div>
									{/* Categories */}
									<div className="flex flex-row gap-4 mt-[48px]">
										{categories.map((cat, idx) => (
											<button
												key={cat}
												className="flex items-center border border-[#CED6D3] rounded-full px-5 py-2 text-[#1E2D2A] text-base font-normal">
												{cat}
												{cat === "More" && (
													<span className="ml-2">
														{/* Replace with your own SVG or Icon component */}
														<svg width="14" height="14" fill="none" viewBox="0 0 14 14">
															<path
																d="M5 3l4 4-4 4"
																stroke="#529E7E"
																strokeWidth="2"
																strokeLinecap="round"
																strokeLinejoin="round"
															/>
														</svg>
													</span>
												)}
											</button>
										))}
									</div>
									{/* Message Box */}
									<div className="bg-[#F8F8F8] rounded-xl p-6 flex flex-col gap-12 mt-2 mb-6 w-[858px] max-w-full">
										<div className="text-[#1E2D2A] text-[16px] font-medium leading-6">
											Message...
										</div>
										<div className="flex flex-row justify-between items-center">
											{/* Attach */}
											<button className="flex items-center bg-white rounded-full px-4 py-2 gap-2">
												{/* Replace with your own Icon */}
												<svg width="20" height="20" fill="none" viewBox="0 0 20 20">
													<circle cx="10" cy="10" r="9" stroke="#529E7E" strokeWidth="2" />
												</svg>
												<span className="text-[#5F726E] text-sm">Attach</span>
											</button>
											<div className="flex flex-row gap-4">
												{/* Company Search */}
												<button className="flex items-center bg-white rounded-full px-4 py-2 gap-2">
													<svg width="20" height="20" fill="none" viewBox="0 0 20 20">
														<rect
															x="3"
															y="3"
															width="14"
															height="14"
															rx="7"
															stroke="#529E7E"
															strokeWidth="2"
														/>
													</svg>
													<span className="text-[#5F726E] text-sm">Company Search</span>
												</button>
												{/* Pro */}
												<button className="flex items-center bg-white rounded-full px-4 py-2 gap-2">
													<svg width="20" height="20" fill="none" viewBox="0 0 20 20">
														<rect
															x="3"
															y="3"
															width="14"
															height="14"
															rx="7"
															stroke="#529E7E"
															strokeWidth="2"
														/>
													</svg>
													<span className="text-[#5F726E] text-sm">Pro</span>
													<svg
														width="10"
														height="5"
														fill="none"
														viewBox="0 0 10 5"
														className="ml-1">
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
												<button className="flex items-center justify-center bg-[#529E7E] rounded-full w-10 h-10">
													<svg width="10" height="14" fill="none" viewBox="0 0 10 14">
														<path
															d="M5 1v12M1 5l4-4 4 4"
															stroke="#fff"
															strokeWidth="2"
															strokeLinecap="round"
															strokeLinejoin="round"
														/>
													</svg>
												</button>
											</div>
										</div>
									</div>
								</div>
								<div className="absolute w-1.5 h-[150px] top-[311px] left-[1322px] bg-[#1e2d2a] rounded-[100px]" />

								{/* <Frame1 /> */}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Dashboard2;

import React from "react";

export const KeyTradePartners: React.FC = () => {
  return (
    <div className="flex flex-col items-start justify-center gap-4 p-4 relative self-stretch w-full flex-[0_0_auto] rounded-2xl border border-solid border-[#e0e0e0]">
      <div className="flex items-center gap-4 relative self-stretch w-full flex-[0_0_auto]">
        <div className="flex flex-col items-start gap-4 relative w-full">
          <div className="flex items-start gap-1 relative self-stretch w-full flex-[0_0_auto]">
            <div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
              <div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Bold',Helvetica] font-bold text-[#1e2d2a] text-base sm:text-xl tracking-[0] leading-[30px] whitespace-nowrap">
                Key Trade Partners
              </div>

              <div className="relative w-fit [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#1e2d2a] text-xs sm:text-sm tracking-[0] leading-[21px] whitespace-nowrap">
                (8 Supplier Found)
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-4 px-4 py-6 relative self-stretch w-full flex-[0_0_auto] bg-white rounded-2xl overflow-auto">
            <div className="flex items-center gap-8 pt-0 pb-4 px-0 self-stretch w-full border-b [border-bottom-style:solid] relative flex-[0_0_auto] border-[#eeeeee]">
              <div className="flex w-full items-center gap-2 pl-0 pr-4 py-0 relative self-stretch">
                <div className="inline-flex flex-col items-start gap-2 relative flex-[0_0_auto]">
                  <div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Bold',Helvetica] font-bold text-[#1e2d2a] text-sm sm:text-base text-center tracking-[0] leading-6 whitespace-nowrap">
                    Suppliers
                  </div>

                  <div className="inline-flex items-center justify-center gap-2.5 px-3 py-2 relative flex-[0_0_auto] bg-white rounded-[100px] border border-solid border-[#eeeeee]">
                    <div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#1e2d2a] text-[8px] sm:text-xs text-center tracking-[0] leading-[18px] whitespace-nowrap">
                      United States, China
                    </div>

                    <div className="relative w-4 h-4 rotate-90">
                      <div className="relative w-1 h-[7px] top-1 left-1.5">
                        <img
                          className="absolute w-[7px] h-1 top-px -left-px"
                          alt="Vector stroke"
                          src="#"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex w-full items-center gap-2 pl-0 pr-4 py-0 relative self-stretch">
                <div className="inline-flex flex-col gap-1 flex-[0_0_auto] items-start relative">
                  <div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Bold',Helvetica] font-bold text-[#1e2d2a] text-sm sm:text-base text-center tracking-[0] leading-6 whitespace-nowrap">
                    Shipment Activity
                  </div>

                  <div className="inline-flex justify-center px-0 py-2 rounded-lg items-center gap-2.5 relative flex-[0_0_auto] bg-white">
                    <div className="mt-[-1.00px] text-xs text-center leading-[18px] relative w-fit [font-family:'Satoshi-Medium',Helvetica] text-[8px] sm:text-xs font-medium text-[#1e2d2a] tracking-[0] whitespace-nowrap">
                      24/06/2024 - 20/06/2025
                    </div>

                    <div className="relative w-4 h-4 rotate-90">
                      <div className="relative w-1 h-[7px] top-1 left-1.5">
                        <img
                          className="absolute w-[7px] h-1 top-px -left-px"
                          alt="Vector stroke"
                          src="#"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex w-full items-center gap-2 pl-0 pr-4 py-0 relative self-stretch">
                <div className="inline-flex flex-col gap-1 flex-[0_0_auto] items-start relative">
                  <div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Bold',Helvetica] font-bold text-[#1e2d2a] text-sm sm:text-base text-center tracking-[0] leading-6 whitespace-nowrap">
                    Total Shipments
                  </div>

                  <img
                    className="relative flex-[0_0_auto]"
                    alt="Frame"
                    src="V"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pl-0 pr-4 py-0 relative flex-1 grow">
                <div className="flex flex-col gap-1 flex-1 grow items-start relative">
                  <div className="self-stretch [font-family:'Satoshi-Bold',Helvetica] font-bold text-[#1e2d2a] relative mt-[-1.00px] text-sm sm:text-base tracking-[0] leading-6">
                    Product Descriptions
                  </div>

                  <div className="flex px-4 py-2 self-stretch w-full rounded-[100px] border border-solid border-[#eeeeee] items-center gap-2.5 relative flex-[0_0_auto] bg-white">
                    <img
                      className="relative w-3 h-3"
                      alt="Group"
                      src="#"
                    />

                    <div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#1e2d2a] text-[8px] sm:text-xs tracking-[0] leading-[18px] whitespace-nowrap">
                      Search Description
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Partner rows - Actmax */}
            <div className="flex items-center gap-8 relative w-full">
              <div className="w-full flex items-center gap-2 pl-0 pr-4 py-0 relative">
                <div className="inline-flex flex-col gap-1 items-start relative">
                  <div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#1e2d2a] text-sm sm:text-base text-center tracking-[0] leading-6 whitespace-nowrap">
                    Actmax
                  </div>

                  <div className="relative w-fit [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#1e2d2a] text-[10px] sm:text-xs text-center leading-[18px] tracking-[0] whitespace-nowrap">
                    Malaysia
                  </div>
                </div>
              </div>

              <div className="h-11 w-full flex items-center gap-2 pl-0 pr-4 py-0 relative">
                {/* Activity chart */}
                <div className="flex flex-col w-full gap-2 self-stretch mr-[-16.00px] items-start relative">
                  <div className="flex flex-col items-start p-[0.85px] relative flex-1 self-stretch w-full grow">
                    <div className="flex flex-col items-start relative flex-1 self-stretch w-full grow">
                      <div className="flex items-center relative flex-1 self-stretch w-full grow">
                        <div className="relative flex-1 self-stretch grow">
                          <div className="relative w-[216px] h-[42px]">
                            {/* Chart grid and data */}
                            <div className="flex-col w-[216px] h-[42px] justify-between px-[0.11px] py-[0.64px] absolute top-0 left-0 flex items-start">
                              {[...Array(6)].map((_, i) => (
                                <img
                                  key={i}
                                  className={`relative self-stretch w-full h-px ${i === 0 ? 'mt-[-0.11px]' : i === 5 ? 'mb-[-0.89px]' : ''}`}
                                  alt="Line"
                                  src={i === 5 ? "#" : "#"}
                                />
                              ))}
                            </div>

                            <div className="flex w-[216px] h-[42px] items-start justify-between px-[0.11px] py-[0.64px] absolute top-0 left-0">
                              {[...Array(7)].map((_, i) => (
                                <img
                                  key={i}
                                  className={`relative self-stretch w-px ${i === 0 ? 'ml-[-0.11px]' : i === 6 ? 'mr-[-0.89px]' : ''}`}
                                  alt="Line"
                                  src="#"
                                />
                              ))}
                            </div>

                            {/* Chart data */}
                            <div className="flex w-[216px] h-[41px] items-start absolute top-px left-0">
                              {/* Chart columns */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full flex items-center gap-2 pl-0 pr-4 py-0 relative self-stretch">
                <div className="inline-flex flex-col items-start gap-2 px-0 py-2 relative flex-[0_0_auto] bg-white rounded-lg">
                  <div className="inline-flex items-center gap-3 relative flex-[0_0_auto]">
                    <div className="inline-flex gap-1.5 items-center relative flex-[0_0_auto]">
                      <div className="relative w-2 h-2 bg-[#0077cc] rounded" />
                      <div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#1e2d2a] text-xs sm:text-sm tracking-[0] leading-[21px] whitespace-nowrap">
                        Toys
                      </div>
                    </div>
                    <div className="inline-flex gap-1.5 items-center relative flex-[0_0_auto]">
                      <div className="bg-[#f5b14c] relative w-2 h-2 rounded" />
                      <div className="w-fit mt-[-1.00px] [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#1e2d2a] whitespace-nowrap relative text-xs sm:text-sm tracking-[0] leading-[21px]">
                        Electric motors
                      </div>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-3 relative flex-[0_0_auto]">
                    <div className="inline-flex gap-1.5 items-center relative flex-[0_0_auto]">
                      <div className="bg-[#cb0a0e] relative w-2 h-2 rounded" />
                      <div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#1e2d2a] text-xs sm:text-sm tracking-[0] leading-[21px] whitespace-nowrap">
                        Essential oils
                      </div>
                    </div>
                    <div className="inline-flex gap-1.5 items-center relative flex-[0_0_auto]">
                      <div className="bg-[#529e7e] relative w-2 h-2 rounded" />
                      <div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#1e2d2a] text-xs sm:text-sm tracking-[0] leading-[21px] whitespace-nowrap">
                        Toys
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full flex items-center gap-2 pl-0 pr-4 py-0 relative">
                <div className="flex flex-col items-start gap-2 relative">
                  <div className="relative mt-[-1.00px] [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#1e2d2a] text-xs tracking-[0] leading-[18px]">
                    Hard Disc Drive
                  </div>

                  <div className="relative [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#1e2d2a] text-xs tracking-[0] leading-[18px]">
                    HS Codes: (8471.70)
                  </div>
                </div>
              </div>
            </div>

            <img
              className="relative self-stretch w-full h-px object-cover"
              alt="Line"
              src="#"
            />

            {/* Additional partner rows would go here */}
          </div>
        </div>
      </div>
    </div>
  );
};

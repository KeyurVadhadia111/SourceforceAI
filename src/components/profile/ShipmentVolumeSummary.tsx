import React from "react";

export const ShipmentVolumeSummary: React.FC = () => {
  return (
    <div className="flex flex-col items-start justify-center gap-4 p-4 relative self-stretch w-full flex-[0_0_auto] rounded-2xl border border-solid border-[#e0e0e0]">
      <div className="flex items-center gap-4 relative self-stretch w-full flex-[0_0_auto]">
        <div className="flex flex-col items-start gap-4 relative flex-1 grow">
          <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex items-center gap-1 relative self-stretch w-full flex-[0_0_auto]">
              <div className="w-fit [font-family:'Satoshi-Bold',Helvetica] font-bold text-xl leading-[30px] whitespace-nowrap relative mt-[-1.00px] text-[#1e2d2a] tracking-[0]">
                Shipment Volume Summary
              </div>
            </div>

            <div className="flex items-center relative self-stretch w-full flex-[0_0_auto]">
              <div className="inline-flex items-center relative flex-[0_0_auto] mr-[-19.00px] border-b-2 [border-bottom-style:solid] border-[#ced6d3]">
                <div className="inline-flex items-center justify-center gap-2 p-4 relative flex-[0_0_auto] border-b-2 [border-bottom-style:solid] border-[#529e7e]">
                  <div className="relative w-fit mt-[-2.00px] [font-family:'Satoshi-Bold',Helvetica] font-bold text-[#529e7e] text-base tracking-[0] leading-[normal]">
                    Lanes used
                  </div>
                </div>

                <div className="inline-flex items-center justify-center gap-2 p-4 relative flex-[0_0_auto]">
                  <div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#5f726e] text-base tracking-[0] leading-[normal]">
                    Containers used
                  </div>
                </div>

                <div className="inline-flex items-center justify-center gap-2 p-4 relative flex-[0_0_auto]">
                  <div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#5f726e] text-base tracking-[0] leading-[normal]">
                    Notify parties
                  </div>
                </div>

                <div className="inline-flex items-center justify-center gap-2 p-4 relative flex-[0_0_auto]">
                  <div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#5f726e] text-base tracking-[0] leading-[normal]">
                    SCAC codes
                  </div>
                </div>

                <div className="inline-flex items-center justify-center gap-2 p-4 relative flex-[0_0_auto]">
                  <div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#5f726e] text-base tracking-[0] leading-[normal]">
                    Ports shipped from
                  </div>
                </div>

                <div className="inline-flex items-center justify-center gap-2 p-4 relative flex-[0_0_auto]">
                  <div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#5f726e] text-base tracking-[0] leading-[normal]">
                    Ports shipped to
                  </div>
                </div>

                <div className="inline-flex items-center justify-center gap-2 p-4 relative flex-[0_0_auto]">
                  <div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#5f726e] text-base tracking-[0] leading-[normal]">
                    States shipped to
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start gap-2 px-0 py-2 relative self-stretch w-full flex-[0_0_auto]">
              <div className="flex flex-col items-start gap-6 px-4 py-6 relative self-stretch w-full flex-[0_0_auto] bg-white rounded-2xl">
                <div className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
                  <div className="flex flex-col items-center gap-8 relative flex-1 grow">
                    <div className="relative w-[287px] mt-[-1.00px] ml-[-7.83px] mr-[-7.83px] [font-family:'Satoshi-Bold',Helvetica] font-bold text-[#1e2d2a] text-xl text-center tracking-[0] leading-8">
                      FCL vs LCL Shipments
                    </div>

                    <div className="flex flex-col items-center gap-6 relative self-stretch w-full flex-[0_0_auto]">
                      <div className="relative w-[270.88px] h-[140px]">
                        {/* Pie chart visualization */}
                      </div>

                      <div className="inline-flex flex-col items-center gap-1.5 relative flex-[0_0_auto]">
                        <div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
                          <div className="relative w-3.5 h-3.5 bg-[url(#)] bg-[100%_100%]" />

                          <div className="relative w-[151.04px] h-6 mt-[-1.00px] [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#1e2d2a] text-base text-center tracking-[0] leading-6 whitespace-nowrap">
                            FCL: 473 shipments
                          </div>
                        </div>

                        <div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
                          <div className="relative w-3.5 h-3.5 bg-[url(#)] bg-[100%_100%]" />

                          <div className="relative w-[139.82px] h-6 mt-[-1.00px] [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#1e2d2a] text-base text-center tracking-[0] leading-6 whitespace-nowrap">
                            LCL: 97 shipments
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-8 relative flex-1 grow">
                    <p className="relative w-72 mt-[-1.00px] ml-[-8.33px] mr-[-8.33px] [font-family:'Satoshi-Bold',Helvetica] font-bold text-[#1e2d2a] text-xl text-center tracking-[0] leading-8">
                      Shipments Breakdown by Bill Type
                    </p>

                    <div className="flex flex-col w-[288.67px] items-center gap-6 relative flex-[0_0_auto] ml-[-8.67px] mr-[-8.67px]">
                      <div className="relative w-[287.67px] h-[140px]">
                        {/* Pie chart visualization */}
                      </div>

                      <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
                        <div className="inline-flex flex-col items-center gap-3 relative flex-[0_0_auto]">
                          <div className="inline-flex flex-col items-center gap-1.5 relative flex-[0_0_auto]">
                            <div className="flex w-[196px] items-center gap-2 relative flex-[0_0_auto]">
                              <div className="relative w-4 h-4 bg-[#1e2d2a]" />

                              <div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#1e2d2a] text-base tracking-[0] leading-6 whitespace-nowrap">
                                House: 559 Shipments
                              </div>
                            </div>
                          </div>

                          <div className="inline-flex flex-col items-center gap-1.5 relative flex-[0_0_auto]">
                            <div className="inline-flex items-center gap-2 relative flex-[0_0_auto]">
                              <div className="relative w-4 h-4 bg-[#529e7e]" />

                              <div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#1e2d2a] text-base tracking-[0] leading-6 whitespace-nowrap">
                                Regular: 11 Shipments
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-8 relative flex-1 grow">
                    <div className="relative self-stretch mt-[-1.00px] [font-family:'Satoshi-Bold',Helvetica] font-bold text-[#1e2d2a] text-xl text-center tracking-[0] leading-8">
                      Notify Party Stats
                    </div>

                    <div className="flex flex-col items-center gap-6 relative self-stretch w-full flex-[0_0_auto]">
                      <div className="relative w-[199.27px] h-[182.61px]">
                        {/* Pie chart visualization */}
                      </div>

                      <div className="flex flex-col h-12 items-start relative self-stretch w-full">
                        <div className="flex flex-col items-center pl-[5.53px] pr-[15.53px] py-0 relative self-stretch w-full flex-[0_0_auto]">
                          <div className="relative w-[265.83px] h-6 ml-[-7.78px] mr-[-7.78px]">
                            <div className="absolute top-[7px] left-0 w-3.5 h-3.5 bg-[url(#)] bg-[100%_100%]" />

                            <p className="absolute w-[249px] h-6 -top-px left-[18px] [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#1e2d2a] text-base text-center tracking-[0] leading-6 whitespace-nowrap">
                              with Notify Party: 200 shipments
                            </p>
                          </div>

                          <div className="relative w-[288.94px] h-6 ml-[-19.33px] mr-[-19.33px]">
                            <div className="absolute top-[7px] left-0 w-3.5 h-3.5 bg-[url(#)] bg-[100%_100%]" />

                            <p className="absolute w-[273px] h-6 -top-px left-[18px] [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#1e2d2a] text-base text-center tracking-[0] leading-6 whitespace-nowrap">
                              without Notify Party: 370 shipments
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
              <div className="w-[275px] items-center flex gap-2 relative">
                <div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
                  <img
                    className="relative flex-[0_0_auto]"
                    alt="Frame"
                    src="#"
                  />

                  <p className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-normal text-[#1e2d2a] text-base text-center tracking-[0] leading-6 whitespace-nowrap">
                    <span className="font-medium">
                      Shanghai &gt; Long Beach, Ca{" "}
                    </span>
                  </p>

                  <img
                    className="relative flex-[0_0_auto]"
                    alt="Frame"
                    src="#"
                  />
                </div>
              </div>

              <div className="inline-flex items-center flex-[0_0_auto] gap-2 relative">
                <div className="inline-flex flex-col gap-1 flex-[0_0_auto] items-start relative">
                  <div className="mt-[-1.00px] [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#1e2d2a] text-base leading-6 whitespace-nowrap relative w-fit tracking-[0]">
                    128
                  </div>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 relative flex-[0_0_auto]">
                <div className="inline-flex flex-col gap-1 flex-[0_0_auto] items-start relative">
                  <div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#529e7e] text-base text-center tracking-[0] leading-6 whitespace-nowrap">
                    $212,520
                  </div>
                </div>
              </div>
            </div>

            {/* Additional shipping lanes would go here */}
          </div>
        </div>
      </div>
    </div>
  );
};

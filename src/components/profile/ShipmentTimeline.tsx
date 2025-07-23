import React from "react";

export const ShipmentTimeline: React.FC = () => {
  return (
    <div className="flex flex-col items-start justify-center gap-4 p-3 md:p-4 relative self-stretch w-full flex-[0_0_auto] rounded-2xl border border-solid border-[#e0e0e0]">
      <div className="flex items-center gap-4 relative self-stretch w-full flex-[0_0_auto]">
        <div className="flex flex-col items-start gap-4 relative flex-1 grow">
          <div className="flex items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
            <p className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Bold',Helvetica] font-bold text-[#1e2d2a] text-base md:text-xl tracking-[0] leading-[30px]">
              Shipment Timeline: Sea Freight Volume Over Years
            </p>
          </div>

          <div className="flex flex-col h-[404px] items-start gap-2 p-2.5 md:p-4 relative self-stretch w-full bg-white rounded-3xl">
            <div className="flex sm:flex-row flex-col gap-2.5 items-start justify-between relative self-stretch w-full flex-[0_0_auto]">
              <div className="inline-flex flex-col items-start justify-center gap-3 relative flex-[0_0_auto]">
                <div className="inline-flex items-center gap-2.5 relative flex-[0_0_auto]">
                  <div className="relative w-5 h-5">
                    <div className="relative w-4 h-[17px] top-px left-0.5">
                      <img
                        className="absolute w-2 h-3 top-[5px] left-px"
                        alt="Vector"
                        src="#"
                      />

                      <img
                        className="absolute w-4 h-[17px] top-0 left-0"
                        alt="Vector"
                        src="#"
                      />
                    </div>
                  </div>

                  <p className="relative w-fit [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#1e2d2a] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
                    Showing data from Jan 2024 to Dec 2024
                  </p>
                </div>
              </div>

              <div className="inline-flex items-center gap-4 relative flex-[0_0_auto]">
                <div className="inline-flex items-center justify-center gap-2.5 px-3 py-2 relative flex-[0_0_auto] bg-white rounded-[322px] border border-solid border-[#529e7e]">
                  <div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#529e7e] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
                    Last 1 Year
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start p-2 relative flex-1 self-stretch w-full grow">
              <div className="flex flex-col items-start relative flex-1 self-stretch w-full grow">
                <div className="flex items-center relative flex-1 self-stretch w-full grow">
                  <div className="inline-flex flex-col items-end justify-between px-1 py-0 relative self-stretch flex-[0_0_auto]">
                    <div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#000000b2] text-xs tracking-[0] leading-[normal]">
                      30k
                    </div>

                    <div className="relative w-fit [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#000000b2] text-xs tracking-[0] leading-[normal]">
                      20k
                    </div>

                    <div className="relative w-fit [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#000000b2] text-xs tracking-[0] leading-[normal]">
                      10k
                    </div>

                    <div className="relative w-fit [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#000000b2] text-xs tracking-[0] leading-[normal]">
                      5k
                    </div>

                    <div className="relative w-fit [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#000000b2] text-xs tracking-[0] leading-[normal]">
                      1k
                    </div>

                    <div className="relative w-fit [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#000000b2] text-xs tracking-[0] leading-[normal]">
                      0
                    </div>
                  </div>

                  <img
                    className="relative flex-1 self-stretch grow"
                    alt="Graphi grid"
                    src="#"
                  />
                </div>

                <div className="pl-[29px] pr-0 pt-0 pb-2 relative self-stretch w-full flex-[0_0_auto] -mt-0.5 flex items-start">
                  {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((month) => (
                    <div key={month} className="flex flex-col items-end relative flex-1 grow">
                      <div className="self-stretch [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#000000b2] text-xs text-center leading-[normal] relative mt-[-1.00px] tracking-[0]">
                        {month}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-start justify-center gap-[0px_0px] relative self-stretch w-full flex-[0_0_auto]">
                <div className="inline-flex flex-wrap items-center justify-center gap-[0px_8px] px-2 py-0 relative flex-[0_0_auto]">
                  <div className="inline-flex items-center gap-1 p-1 relative flex-[0_0_auto]">
                    <div className="relative w-4 h-4">
                      <div className="relative w-px h-px top-2 left-2">
                        <div className="relative w-2 h-2 -top-1 -left-1 bg-[#529e7e] border border-solid border-white" />
                      </div>
                    </div>

                    <div className="mt-[-1.00px] [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#000000b2] text-xs leading-[normal] relative w-fit tracking-[0]">
                      2024
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

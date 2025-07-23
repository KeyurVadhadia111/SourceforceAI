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

            
          </div>

          <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
              <div className="w-[275px] items-center flex gap-2 relative">
                <div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
                  
                </div>
              </div>

              <div className="inline-flex items-center flex-[0_0_auto] gap-2 relative">
                <div className="inline-flex flex-col gap-1 flex-[0_0_auto] items-start relative">
                  
                </div>
              </div>

              <div className="inline-flex items-center gap-2 relative flex-[0_0_auto]">
                <div className="inline-flex flex-col gap-1 flex-[0_0_auto] items-start relative">
                  
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

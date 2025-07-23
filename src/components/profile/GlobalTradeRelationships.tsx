import React from "react";

export const GlobalTradeRelationships: React.FC = () => {
  return (
    <div className="flex flex-col items-start justify-center gap-4 p-4 relative self-stretch w-full flex-[0_0_auto] rounded-2xl border border-solid border-[#e0e0e0]">
      <div className="flex items-center justify-center gap-4 relative self-stretch w-full flex-[0_0_auto]">
        <div className="flex flex-col items-start gap-4 relative flex-1 grow">
          <div className="flex items-center gap-1 relative self-stretch w-full flex-[0_0_auto]">
            <div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
              <p className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Bold',Helvetica] font-bold text-[#1e2d2a] text-xl tracking-[0] leading-[30px] whitespace-nowrap">
                Top 10 Global Trade Relationships
              </p>

              <div className="relative w-fit [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#1e2d2a] text-sm tracking-[0] leading-[21px] whitespace-nowrap">
                {" "}
                (Top 10)
              </div>
            </div>
          </div>

          <div className="inline-flex items-center relative flex-[0_0_auto] border-b-2 [border-bottom-style:solid] border-[#ced6d3]">
            <div className="inline-flex items-center justify-center gap-2 px-8 py-4 relative flex-[0_0_auto] border-b-2 [border-bottom-style:solid] border-[#529e7e]">
              <div className="relative w-fit mt-[-2.00px] [font-family:'Satoshi-Bold',Helvetica] font-bold text-[#529e7e] text-base tracking-[0] leading-[normal]">
                Graph view
              </div>
            </div>

            <div className="inline-flex items-center justify-center gap-2 px-8 py-4 relative flex-[0_0_auto]">
              <div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#5f726e] text-base tracking-[0] leading-[normal]">
                List view
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center relative self-stretch w-full flex-[0_0_auto]">
            <div className="inline-flex items-center justify-center gap-2 px-8 py-4 relative flex-[0_0_auto]">
              <div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#004e66] text-base tracking-[0] leading-6">
                No data available
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center relative self-stretch w-full flex-[0_0_auto]">
            <div className="inline-flex items-center justify-center gap-2 px-8 py-4 relative flex-[0_0_auto]">
              <div className="relative w-[163px] mt-[-1.00px] [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#004e66] text-base tracking-[0] leading-6">
                This company : Google
              </div>
            </div>

            <div className="inline-flex items-center justify-center gap-2 px-8 py-4 relative flex-[0_0_auto]">
              <div className="relative w-[108px] mt-[-1.00px] [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#004e66] text-base tracking-[0] leading-6">
                Its suppliers: 7
              </div>
            </div>

            <div className="inline-flex items-center justify-center gap-2 px-8 py-4 relative flex-[0_0_auto]">
              <p className="relative w-[284px] mt-[-1.00px] [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#004e66] text-base tracking-[0] leading-6">
                Other companies using the supplier : 23
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

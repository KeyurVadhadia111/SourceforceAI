import React from "react";

export const LatestShipments: React.FC = () => {
  return (
    <div className="flex flex-col items-start justify-center gap-4 p-4 relative self-stretch w-full flex-[0_0_auto] rounded-2xl border border-solid border-[#e0e0e0]">
      <div className="flex items-center gap-4 relative self-stretch w-full flex-[0_0_auto]">
        <div className="flex flex-col items-start gap-4 relative flex-1 grow">
          <div className="flex items-center gap-1 relative self-stretch w-full flex-[0_0_auto]">
            <div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
              <p className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Bold',Helvetica] font-bold text-[#1e2d2a] text-xl tracking-[0] leading-[30px] whitespace-nowrap">
                Latest Sea Freight Shipment Records
              </p>

              <div className="relative w-fit [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#1e2d2a] text-sm tracking-[0] leading-[21px] whitespace-nowrap">
                {" "}
                (Top 10)
              </div>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
};

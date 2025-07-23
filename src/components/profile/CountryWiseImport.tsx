import React from "react";

export const CountryWiseImport: React.FC = () => {
  return (
    <div className="flex flex-col items-start justify-center gap-4 p-4 relative self-stretch w-full flex-[0_0_auto] rounded-2xl border border-solid border-[#e0e0e0]">
      <div className="flex items-center gap-4 relative self-stretch w-full flex-[0_0_auto]">
        <div className="flex flex-col items-start gap-4 relative flex-1 grow">
          <div className="flex items-center gap-1 relative self-stretch w-full flex-[0_0_auto]">
            <div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
              <div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Bold',Helvetica] font-bold text-[#1e2d2a] text-xl tracking-[0] leading-[30px] whitespace-nowrap">
                Country-Wise Import Volume Distribution
              </div>

              <div className="relative w-fit [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#1e2d2a] text-sm tracking-[0] leading-[21px] whitespace-nowrap">
                {" "}
                (Top 10)
              </div>
            </div>
          </div>

          <div className="relative w-[954px] h-[534.32px] bg-neutral-100 overflow-hidden">
            <div className="relative w-[1294px] h-[629px] top-[-97px] left-[15px]">
              <div className="absolute w-[1294px] h-[629px] top-0 left-0">
                {/* World map visualization */}
                <p className="absolute top-[579px] left-[683px] [font-family:'Satoshi-Bold',Helvetica] font-bold text-[19.3px] leading-[28.9px] whitespace-nowrap text-[#1e2d2a] tracking-[0]">
                  570 sea shipments in total
                </p>
              </div>

              <div className="inline-flex items-center gap-[4.82px] absolute top-[601px] left-[27px]">
                <div className="relative w-[17.59px] h-[17.59px] bg-white rounded-[8.79px]" />

                <div className="inline-flex flex-col items-start gap-[4.82px] relative flex-[0_0_auto]">
                  <div className="relative w-fit mt-[-0.80px] [font-family:'Satoshi-Bold',Helvetica] font-bold text-[5.7px] leading-[8.5px] whitespace-nowrap text-[#1e2d2a] tracking-[0]">
                    219 shipments
                  </div>

                  <div className="relative w-fit [font-family:'Satoshi-Bold',Helvetica] font-bold text-[5.7px] leading-[8.5px] whitespace-nowrap text-[#1e2d2a] tracking-[0]">
                    1 shipments
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

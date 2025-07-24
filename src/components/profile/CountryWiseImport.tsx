import React from "react";

export const CountryWiseImport: React.FC = () => {
  return (
    <div className="flex flex-col items-start justify-center gap-4 p-3 sm:p-4 relative self-stretch w-full flex-[0_0_auto] rounded-2xl border border-solid border-[#e0e0e0]">
      <div className="flex items-center gap-4 relative self-stretch w-full flex-[0_0_auto]">
        <div className="flex flex-col items-start gap-4 relative flex-1 grow">
          <div className="flex items-center gap-1 relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex flex-wrap items-center gap-1 relative">
              <div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Bold',Helvetica] font-bold text-[#1e2d2a] text-base sm:text-xl tracking-[0] leading-[30px]">
                Country-Wise Import Volume Distribution
              </div>

              <div className="relative w-fit [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#1e2d2a] text-xs sm:text-sm tracking-[0] leading-[21px] ">
                {" "}
                (Top 10)
              </div>
            </div>
          </div>

          <div className="relative w-full h-[170px] sm:h-[534.32px]  bg-[url('assets/images/VolumeDistribution.png')] bg-contain bg-center overflow-hidden">
            <div className="relative w-full top-[140px] sm:top-[-97px] left-[55%] sm:left-[15px]">
              <div className="absolute w-full top-0 left-0">
                {/* World map visualization */}
                <p className="absolute sm:top-[579px] sm:right-10 [font-family:'Satoshi-Bold',Helvetica] font-bold text-[10px] sm:text-[19.3px] leading-[28.9px] whitespace-nowrap text-[#1e2d2a] tracking-[0]">
                  570 sea shipments in total
                </p>
              </div>

              <div className="inline-flex items-center gap-[4.82px] absolute -left-[50%] sm:top-[601px] sm:left-[27px]">
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

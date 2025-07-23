import React from "react";

export const AIConfidenceScore: React.FC = () => {
  return (
    <div className="flex flex-col items-start justify-center gap-4 px-3 py-[11px] sm:p-4 relative self-stretch w-full flex-[0_0_auto] rounded-2xl border border-solid border-[#529e7e] bg-[linear-gradient(90deg,rgba(239,252,250,1)_0%,rgba(239,247,254,1)_100%)]">
      <div className="flex items-center gap-4 relative self-stretch w-full flex-[0_0_auto]">
        <div className="flex flex-col items-start sm:gap-2 relative flex-1 grow">
          <div className="flex items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
            <div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Bold',Helvetica] font-bold text-[#1e2d2a] text-base sm:text-xl tracking-[0] leading-[30px] whitespace-nowrap">
              AI Confidence Score
            </div>
          </div>

          <p className="relative w-fit [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#1e2d2a] text-sm sm:text-base tracking-[0] leading-[22px] whitespace-nowrap">
            Low Risk • Reliable Supplier
          </p>
        </div>

        <div className="relative w-fit [font-family:'Satoshi-Bold',Helvetica] font-bold text-[#058650] text-lg sm:text-2xl tracking-[0] leading-9 whitespace-nowrap">
          92%
        </div>
      </div>
    </div>
  );
};

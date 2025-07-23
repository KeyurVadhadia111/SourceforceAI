import React from "react";

export const CompanyTags: React.FC = () => {
  return (
    <div className="gap-2 px-6 py-4 bg-[#f9f9f9] flex flex-col items-start relative self-stretch w-full flex-[0_0_auto] rounded-2xl">
      <div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
        <p className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#1e2d2a] text-xl tracking-[0] leading-[30px] whitespace-nowrap">
          {" "}
          Company Tags &amp; Classification
        </p>
      </div>

      <div className="flex flex-wrap items-start gap-[12px_12px] relative self-stretch w-full flex-[0_0_auto]">
        {/* Sample tags */}
        <div className="inline-flex gap-2 px-4 py-2 flex-[0_0_auto] bg-white rounded items-center relative">
          <div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#1e2d2a] text-base tracking-[0] leading-6 whitespace-nowrap">
            router
          </div>

          <div className="mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#529e7e] text-base leading-6 whitespace-nowrap relative w-fit tracking-[0]">
            108
          </div>
        </div>

        <div className="inline-flex gap-2 px-4 py-2 flex-[0_0_auto] bg-white rounded items-center relative">
          <div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#1e2d2a] text-base tracking-[0] leading-6 whitespace-nowrap">
            rout
          </div>

          <div className="mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#529e7e] text-base leading-6 whitespace-nowrap relative w-fit tracking-[0]">
            108
          </div>
        </div>

        <div className="inline-flex gap-2 px-4 py-2 flex-[0_0_auto] bg-white rounded items-center relative">
          <div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#1e2d2a] text-base tracking-[0] leading-6 whitespace-nowrap">
            route
          </div>

          <div className="mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#529e7e] text-base leading-6 whitespace-nowrap relative w-fit tracking-[0]">
            108
          </div>
        </div>

        {/* More tags would go here */}
      </div>
    </div>
  );
};

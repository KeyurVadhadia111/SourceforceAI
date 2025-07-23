import React, { useState } from "react";

interface DataItem {
  label: string;
  value: number;
  bgColor: string;
}

export const YearlyImportActivity: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"year" | "month">("year");

  const yearlyData: DataItem[] = [
    { label: "2019-2020", value: 980, bgColor: "#ffefef" },
    { label: "2020-2021", value: 1250, bgColor: "#fff0f0" },
    { label: "2021-2022", value: 1680, bgColor: "#ffe5e5" },
    { label: "2022-2023", value: 2100, bgColor: "#ffd6d6" },
    { label: "2023-2024", value: 2450, bgColor: "#ffcaca" },
    { label: "2024-2025", value: 2450, bgColor: "#ffbaba" },
  ];

  const monthlyData: DataItem[] = [
    { label: "Jan 2025", value: 300, bgColor: "#ffefef" },
    { label: "Feb 2025", value: 280, bgColor: "#fff0f0" },
    { label: "Mar 2025", value: 320, bgColor: "#ffe5e5" },
    { label: "Apr 2025", value: 260, bgColor: "#ffd6d6" },
    { label: "May 2025", value: 310, bgColor: "#ffcaca" },
    { label: "Jun 2025", value: 290, bgColor: "#ffbaba" },
  ];

  const dataToRender = activeTab === "year" ? yearlyData : monthlyData;

  return (
    <div className="flex flex-col items-start justify-center gap-4 p-3 sm:p-4 relative self-stretch w-full flex-[0_0_auto] rounded-2xl border border-solid border-[#e0e0e0]">
      <div className="flex items-center gap-4 relative self-stretch w-full flex-[0_0_auto]">
        <div className="flex flex-col items-start gap-4 relative flex-1 grow">
          <div className="flex items-start gap-1 relative self-stretch w-full flex-[0_0_auto]">
            <p className="relative w-full mt-[-1.00px] [font-family:'Satoshi-Bold',Helvetica] font-bold text-[#1e2d2a] text-base sm:text-xl tracking-[0] leading-[30px]">
              Yearly Import Activity &amp; Shipment Cadence
            </p>
          </div>

          <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex items-center gap-1 relative self-stretch w-full flex-[0_0_auto]">
              <div className="inline-flex items-center relative flex-[0_0_auto] ">
                <div
                  className={`inline-flex items-center justify-center gap-2 p-3 sm:px-8 sm:py-4 relative flex-[0_0_auto] border-b-2 [border-bottom-style:solid] ${activeTab === "year" ? "border-[#529e7e]" : "border-[#ced6d3]"
                    }`}
                  onClick={() => setActiveTab("year")}
                  style={{ cursor: "pointer" }}
                >
                  <div
                    className={`relative w-fit mt-[-2.00px] [font-family:'Satoshi-Bold',Helvetica] text-sm sm:text-base tracking-[0] leading-[normal] ${activeTab === "year" ? "text-[#529e7e] font-bold" : "text-[#5f726e] font-normal"
                      }`}
                  >
                    Year
                  </div>
                </div>

                <div
                  className={`inline-flex items-center justify-center gap-2 p-3 sm:px-8 sm:py-4 relative flex-[0_0_auto] border-b-2 [border-bottom-style:solid] ${activeTab === "month" ? "border-[#529e7e]" : "border-[#ced6d3]"
                    }`}
                  onClick={() => setActiveTab("month")}
                  style={{ cursor: "pointer" }}
                >
                  <div
                    className={`relative w-fit mt-[-1.00px] [font-family:'Satoshi-Regular',Helvetica] text-sm sm:text-base tracking-[0] leading-[normal] ${activeTab === "month" ? "text-[#529e7e] font-bold" : "text-[#5f726e] font-normal"
                      }`}
                  >
                    Month
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
              {dataToRender.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center p-3 sm:p-4 relative flex-1 grow rounded-2xl shadow-[0px_12px_24px_-4px_#919eab1f,0px_0px_2px_#919eab33]"
                  style={{ backgroundColor: item.bgColor }}
                >
                  <div className="inline-flex flex-col items-start justify-center gap-2 relative flex-[0_0_auto]">
                    <div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#222222] text-sm sm:text-base tracking-[0] leading-[22px] whitespace-nowrap">
                      {item.label}
                    </div>
                    <div className="[font-family:'Satoshi-Bold',Helvetica] font-bold text-[#222222] text-lg sm:text-2xl sm:leading-[48px] whitespace-nowrap relative w-fit tracking-[0]">
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

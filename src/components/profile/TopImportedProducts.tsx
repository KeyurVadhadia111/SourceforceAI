import React, { useState } from "react";
import TabContent from "./ProductsByHsCodeSection/TabContent";

export const TopImportedProducts: React.FC = () => {
  const [activeTab, setActiveTab] = useState("hierarchy");

  const tabs = [
    {
      key: "sea",
      label: "Sea Shipments",
      type: "common",
      data: { title: "Sea Shipments", value: "10,000 containers" },
    },
    {
      key: "weight",
      label: "Weight in KG",
      type: "common",
      data: { title: "Weight in KG", value: "25,000,000 kg" },
    },
    {
      key: "teu",
      label: "TEU (20ft Containers)",
      type: "common",
      data: { title: "TEU (20ft Containers)", value: "5,000 TEU" },
    },
    {
      key: "hierarchy",
      label: "Hierarchy View",
      type: "custom",
    },
  ];


  return (
    <div className="flex flex-col items-start justify-center gap-4 p-4 relative self-stretch w-full flex-[0_0_auto] rounded-2xl border border-solid border-[#e0e0e0]">
      <div className="flex items-center gap-4 relative self-stretch w-full flex-[0_0_auto]">
        <div className="flex flex-col items-start gap-4 relative flex-1 grow">
          <div className="flex items-center gap-1 relative self-stretch w-full flex-[0_0_auto]">
            <div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
              <p className="relative w-fit mt-[-1.00px] font-bold text-[#1e2d2a] text-xl leading-[30px] whitespace-nowrap">
                Top Imported Products by HS Code
              </p>
              <div className="relative w-fit text-sm text-[#1e2d2a] leading-[21px] whitespace-nowrap">
                &nbsp;(Top 10)
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex flex-col items-center justify-center gap-4 w-full">
            <div className="flex items-center w-full">
              {tabs.map(({ key, label }) => (
                <div
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`inline-flex cursor-pointer items-center justify-center gap-2 px-8 py-4 border-b-2 ${activeTab === key ? "border-[#529e7e]" : " border-[#ced6d3]"
                    }`}
                >
                  <div
                    className={`relative w-fit mt-[-1px] text-base leading-normal ${activeTab === key
                      ? "font-bold text-[#529e7e]"
                      : "font-normal text-[#5f726e]"
                      }`}
                  >
                    {label}
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

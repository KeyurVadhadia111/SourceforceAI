import React, { useState } from "react";
import TabContent from "./ProductsByHsCodeSection/TabContent";
import { SunburstChart } from "components/common/SunburstChart";

const weight = [
  {
    id: "electric-motors",
    title: "85 - Electric motors/Appliances",
    industries: ["Industrial", "Renewable Energy", "Data Centers", "+8 More"],
    bgColor: "bg-[#ebf1ff]",
    expanded: true,
    subcategories: [
      {
        code: "8504 - Electrical Transformers",
        description:
          "Static Converters - Power electronic devices that convert AC to DC or vice versa",
      },
      {
        code: "8517 - Electric Parts",
        description:
          "Telephone equipment, broadcasting apparatus, and communication devices",
      },
      {
        code: "8518 - Microphones and stands",
        description:
          "Headphones, earphones, microphones, and audio equipment including loudspeakers",
      },
      {
        code: "8538 - Parts Suitable",
        description:
          "Integrated circuits and electronic parts for electrical apparatus",
      },
    ],
  },
  {
    id: "metal-tools",
    title: "82 - Metal tools/cutlery",
    industries: ["Automotive", "Construction", "Manufacturing", "+6 More"],
    bgColor: "bg-[#ffeceb]",
    expanded: true,
    subcategories: [
      {
        code: "8504 - Electrical Transformers",
        description:
          "Static Converters - Power electronic devices that convert AC to DC or vice versa",
      },
      {
        code: "8517 - Electric Parts",
        description:
          "Telephone equipment, broadcasting apparatus, and communication devices",
      },
      {
        code: "8518 - Microphones and stands",
        description:
          "Headphones, earphones, microphones, and audio equipment including loudspeakers",
      },
      {
        code: "8538 - Parts Suitable",
        description:
          "Integrated circuits and electronic parts for electrical apparatus",
      },
    ],
  },
  {
    id: "cameras",
    title: "90 - Cameras/Precision instruments",
    industries: ["Industrial", "Renewable Energy", "Data Centers"],
    bgColor: "bg-[#f7ffeb]",
    expanded: false,
  },
  {
    id: "organic-chemicals",
    title: "29 - Organic chemicals",
    industries: ["Industrial", "Renewable Energy", "Data Centers"],
    bgColor: "bg-[#f5ebff]",
    expanded: false,
  },
  {
    id: "misc-chemicals",
    title: "38 - Misc. chemicals",
    industries: ["Industrial", "Renewable Energy", "Data Centers"],
    bgColor: "bg-[#ebfffe]",
    expanded: false,
  },
  {
    id: "electric-motors-2",
    title: "85 - Electric motors/Appliances",
    industries: ["Industrial", "Renewable Energy", "Data Centers"],
    bgColor: "bg-[#ffd7f0]",
    expanded: false,
  },
];

const seaShipmentsCategories = [
  {
    id: "marine-engines",
    title: "84 - Marine Engines/Propulsion",
    industries: ["Shipping", "Naval Engineering", "Energy", "+4 More"],
    bgColor: "bg-[#e0f7fa]",
    expanded: true,
    subcategories: [
      {
        code: "8407 - Marine Engines",
        description: "Internal combustion engines for marine propulsion",
      },
      {
        code: "8409 - Parts for Engines",
        description: "Parts suitable for use solely with marine engines",
      },
      {
        code: "8481 - Valves",
        description: "Valves and similar appliances for ships and boats",
      },
      {
        code: "8483 - Transmission Shafts",
        description: "Gears, clutches, and ship transmission components",
      },
    ],
  },
  {
    id: "navigation-equipment",
    title: "90 - Navigation Equipment",
    industries: ["Shipping", "Defense", "Aviation"],
    bgColor: "bg-[#f1f8e9]",
    expanded: true,
    subcategories: [
      {
        code: "9014 - Navigational Instruments",
        description: "Compasses, gyroscopes, and other navigational devices",
      },
      {
        code: "9015 - Surveying Instruments",
        description: "Marine radar and sonar systems",
      },
    ],
  },
  {
    id: "containers",
    title: "86 - Shipping Containers",
    industries: ["Logistics", "Port Services"],
    bgColor: "bg-[#fff3e0]",
    expanded: false,
  },
  {
    id: "shipbuilding",
    title: "89 - Ships and Floating Structures",
    industries: ["Naval Architecture", "Marine Engineering"],
    bgColor: "bg-[#fce4ec]",
    expanded: false,
  },
  {
    id: "marine-electronics",
    title: "85 - Marine Electronics",
    industries: ["Shipping", "Defense", "Electronics"],
    bgColor: "bg-[#ede7f6]",
    expanded: false,
  },
  {
    id: "safety-equipment",
    title: "83 - Safety & Rescue Equipment",
    industries: ["Maritime Safety", "Emergency Response"],
    bgColor: "bg-[#f9fbe7]",
    expanded: false,
  },
];

const teuCategories = [
  {
    id: "electronics",
    title: "85 - Electric Goods in Containers",
    industries: ["Consumer Electronics", "Retail", "Wholesale"],
    bgColor: "bg-[#e8f5e9]",
    expanded: true,
    subcategories: [
      {
        code: "8528 - Televisions",
        description: "Flat panel and smart TVs packed in 20ft containers",
      },
      {
        code: "8509 - Small Appliances",
        description: "Household blenders, toasters, and similar items",
      },
      {
        code: "8516 - Electric Water Heaters",
        description: "Heating appliances packaged for bulk container transport",
      },
      {
        code: "8544 - Insulated Wire",
        description: "Electric wires and cables in palletized container loads",
      },
    ],
  },
  {
    id: "textiles",
    title: "63 - Textiles and Apparel",
    industries: ["Fashion", "Retail", "Home Furnishings"],
    bgColor: "bg-[#fff8e1]",
    expanded: true,
    subcategories: [
      {
        code: "6302 - Bed Linen",
        description: "Cotton and synthetic bedding materials in containers",
      },
      {
        code: "6307 - Misc. Textiles",
        description: "Face masks, rags, and textiles not elsewhere classified",
      },
    ],
  },
  {
    id: "plastics",
    title: "39 - Plastics",
    industries: ["Manufacturing", "Packaging", "Automotive"],
    bgColor: "bg-[#e3f2fd]",
    expanded: false,
  },
  {
    id: "machinery",
    title: "84 - Machinery & Parts",
    industries: ["Industrial", "Agriculture"],
    bgColor: "bg-[#f1f8e9]",
    expanded: false,
  },
  {
    id: "furniture",
    title: "94 - Furniture",
    industries: ["Home", "Office", "Commercial Interiors"],
    bgColor: "bg-[#fce4ec]",
    expanded: false,
  },
  {
    id: "chemicals",
    title: "38 - Misc. Chemicals",
    industries: ["Industrial", "Pharma", "Cleaning"],
    bgColor: "bg-[#ede7f6]",
    expanded: false,
  },
];


export const TopImportedProducts: React.FC = () => {
  const [activeTab, setActiveTab] = useState("hierarchy");

  const tabs = [
    {
      key: "sea",
      label: "Sea Shipments",
      type: "common",
      data: seaShipmentsCategories,
    },
    {
      key: "weight",
      label: "Weight in KG",
      type: "common",
      data: weight,
    },
    {
      key: "teu",
      label: "TEU (20ft Containers)",
      type: "common",
      data: teuCategories,
    },
    {
      key: "hierarchy",
      label: "Hierarchy View",
      type: "custom",
    },
  ];


  return (
    <div className="flex flex-col items-start justify-center gap-4 p-3 sm:p-4 relative self-stretch w-full flex-[0_0_auto] rounded-2xl border border-solid border-[#e0e0e0] dark:border-borderDark">
      <div className="flex items-center gap-4 relative self-stretch w-full flex-[0_0_auto]">
        <div className="flex flex-col items-start gap-4 relative flex-1 grow w-full">
          <div className="flex items-center gap-1 relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex flex-wrap items-center gap-1 relative">
              <p className="relative w-fit mt-[-1.00px] font-bold text-text dark:text-textDark text-base sm:text-xl leading-[30px]">
                Top Imported Products by HS Code
              </p>
              <div className="relative w-fit text-[10px] sm:text-sm text-text dark:text-textDark leading-[21px]">
                &nbsp;(Top 10)
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex flex-col items-center justify-center gap-4 w-full">
            <div className="flex items-center w-full overflow-x-auto no-scrollbar">
              {tabs.map(({ key, label }) => (
                <div
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`inline-flex cursor-pointer items-center justify-center gap-2 p-3 sm:px-8 sm:py-4 border-b-2 whitespace-nowrap ${activeTab === key ? "border-primary dark:border-primarySecondary" : " border-border dark:border-borderDark"
                    }`}
                >
                  <div
                    className={`relative w-fit mt-[-1px] text-sm sm:text-base leading-normal ${activeTab === key
                      ? "font-bold text-primary"
                      : "font-normal text-textSecondary dark:text-textSecondaryDark"
                      }`}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>

            {/* Content Area */}
            <div className="relative w-full sm:h-auto">
              {tabs.map(({ key, type, data }) =>
                activeTab === key && (
                  <div key={key} className="flex justify-start w-full h-full overflow-x-auto">
                    {type === "common" && data ? (
                      <TabContent categories={data} />
                    ) : (
                      <div className="w-full">
                        <SunburstChart height={500} />
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

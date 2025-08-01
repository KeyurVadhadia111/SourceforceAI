import GlobalTradeRelationshipsGraph from "components/common/GlobalTradeRelationships";
import React, { useState } from "react";

const relationshipsData = [
  {
    id: 1,
    supplierName: "Rittal Csm",
    supplierDetails: "Microsoft, Amazon, Meta, Dell, IBM, HP, Oracle, Cisco, Samsung, Xiaomi, Appl, Meta, Dell, IBM, HP, Oracle,"
  },
  {
    id: 2,
    supplierName: "Delta Electronics Jiangsu",
    supplierDetails: "Apple, Tesla, Nvidia, Cisco, Intel, Sony, Lenovo, Asus, LG, Panasonic"
  },
  {
    id: 3,
    supplierName: "QMB",
    supplierDetails: "AMD, Intel, Oracle, Samsung, IBM, HP, Dell, Asus, Micron, Apple"
  },
  {
    id: 4,
    supplierName: "Seagate Technology",
    supplierDetails: "Microsoft, Amazon, Meta, Dell, IBM, HP, Oracle, Cisco, Samsung, Xiaomi, Appl"
  },
  {
    id: 5,
    supplierName: "Kuehne & Nagel Shanghai Branch",
    supplierDetails: "Tesla, IBM, Sony, Amazon, Cisco, Meta, Xiaomi, LG, Panasonic, Philips, Meta, Dell, IBM, HP, Oracle,"
  },
  {
    id: 6,
    supplierName: "Foxconn",
    supplierDetails: "Microsoft, Amazon, Meta, Dell, IBM, HP, Oracle, Cisco, Samsung, Xiaomi, Appl"
  },
  {
    id: 7,
    supplierName: "Pegatron",
    supplierDetails: "Asus, Apple, Dell, Lenovo, Sony, Microsoft, Xiaomi, Amazon, LG, Acer"
  },
  {
    id: 8,
    supplierName: "Inventec",
    supplierDetails: "HP, Lenovo, Acer, Asus, Toshiba, Dell, MSI, Apple, Samsung, Intel"
  },
  {
    id: 9,
    supplierName: "Lite-On Technology",
    supplierDetails: "Dell, Cisco, IBM, HP, Lenovo, Acer, LG, Sony, Apple, Amazon, Meta, Dell, IBM, HP, Oracle"
  },
  {
    id: 10,
    supplierName: "Quanta Computer",
    supplierDetails: "Apple, Microsoft, HP, Dell, Google, Lenovo, Asus, Intel, Samsung, Toshiba"
  },
]

// Example data for Apple's trade relationships
const appleTradeData = {
  mainCompany: {
    id: "apple",
    name: "Apple",
    color: "#007AFF"
  },
  suppliers: [
    {
      id: "foxconn",
      name: "Foxconn Technology Group",
      color: "#FF3B30",
      position: { top: 81, left: 235 },
      subSuppliers: [
        { id: "foxconn-shenzhen", name: "Foxconn Shenzhen", opacity: 0.1 },
        { id: "foxconn-zhengzhou", name: "Foxconn Zhengzhou", opacity: 0.16 },
        { id: "foxconn-chengdu", name: "Foxconn Chengdu", opacity: 0.22 },
        { id: "foxconn-brazil", name: "Foxconn Brazil", opacity: 0.28 }
      ]
    },
    {
      id: "tsmc",
      name: "Taiwan Semiconductor",
      color: "#FF9500",
      position: { top: 261, left: 235 },
      subSuppliers: [
        { id: "tsmc-fab12", name: "TSMC Fab 12", opacity: 0.1 },
        { id: "tsmc-fab14", name: "TSMC Fab 14", opacity: 0.16 },
        { id: "tsmc-fab15", name: "TSMC Fab 15", opacity: 0.22 },
        { id: "tsmc-arizona", name: "TSMC Arizona", opacity: 0.28 }
      ]
    },
    {
      id: "samsung",
      name: "Samsung Electronics",
      color: "#FFCC00",
      position: { top: 379, left: 235 },
      subSuppliers: [
        { id: "samsung-austin", name: "Samsung Austin", opacity: 0.1 },
        { id: "samsung-korea", name: "Samsung Korea", opacity: 0.16 },
        { id: "samsung-china", name: "Samsung China", opacity: 0.22 }
      ]
    },
    {
      id: "lg-display",
      name: "LG Display",
      color: "#34C759",
      position: { top: 484, left: 235 },
      subSuppliers: [
        { id: "lg-paju", name: "LG Paju Plant", opacity: 0.1 },
        { id: "lg-gumi", name: "LG Gumi Plant", opacity: 0.16 },
        { id: "lg-guangzhou", name: "LG Guangzhou", opacity: 0.22 }
      ]
    },
    {
      id: "qualcomm",
      name: "Qualcomm",
      color: "#5856D6",
      position: { top: 582, left: 235 },
      subSuppliers: [
        { id: "qualcomm-sandiego", name: "Qualcomm San Diego", opacity: 0.1 },
        { id: "qualcomm-austin", name: "Qualcomm Austin", opacity: 0.16 }
      ]
    }
  ],
  totalOtherCompanies: 156
};

// Example data for Microsoft's trade relationships
const microsoftTradeData = {
  mainCompany: {
    id: "microsoft",
    name: "Microsoft",
    color: "#0078D4"
  },
  suppliers: [
    {
      id: "wistron",
      name: "Wistron Corporation",
      color: "#8E8CD8",
      position: { top: 81, left: 235 },
      subSuppliers: [
        { id: "wistron-taiwan", name: "Wistron Taiwan", opacity: 0.1 },
        { id: "wistron-china", name: "Wistron China", opacity: 0.16 },
        { id: "wistron-czech", name: "Wistron Czech", opacity: 0.22 }
      ]
    },
    {
      id: "pegatron",
      name: "Pegatron Corporation",
      color: "#40E0D0",
      position: { top: 261, left: 235 },
      subSuppliers: [
        { id: "pegatron-shanghai", name: "Pegatron Shanghai", opacity: 0.1 },
        { id: "pegatron-taiwan", name: "Pegatron Taiwan", opacity: 0.16 },
        { id: "pegatron-mexico", name: "Pegatron Mexico", opacity: 0.22 }
      ]
    },
    {
      id: "intel",
      name: "Intel Corporation",
      color: "#0071C5",
      position: { top: 379, left: 235 },
      subSuppliers: [
        { id: "intel-arizona", name: "Intel Arizona", opacity: 0.1 },
        { id: "intel-oregon", name: "Intel Oregon", opacity: 0.16 },
        { id: "intel-ireland", name: "Intel Ireland", opacity: 0.22 },
        { id: "intel-israel", name: "Intel Israel", opacity: 0.28 }
      ]
    }
  ],
  totalOtherCompanies: 89
};

// Sample Google data (original from Figma)
const googleTradeData = {
  mainCompany: {
    id: "google",
    name: "Google",
    color: "#529e7e"
  },
  suppliers: [
    {
      id: "delta-electronics",
      name: "Delta Electronics Jiangsu",
      color: "#323ca9",
      position: { top: 81, left: 235 },
      subSuppliers: [
        { id: "delta-americas", name: "Delta Electronics Americas", opacity: 0.1 },
        { id: "det-logistics", name: "Det Logistics Usa", opacity: 0.16 },
        { id: "dei-logistics", name: "Dei Logistics Usa", opacity: 0.22 },
        { id: "schenker", name: "Schenker", opacity: 0.28 },
        { id: "netgear", name: "Netgear", opacity: 0.34 }
      ]
    },
    {
      id: "qmb",
      name: "Qmb",
      color: "#a9328f",
      position: { top: 261, left: 235 },
      subSuppliers: [
        { id: "first-data", name: "First Data Hardware Services", opacity: 0.1 },
        { id: "qch-1", name: "Qch", opacity: 0.16 },
        { id: "quanta-nashville", name: "Quanta Manufacturing Nashville", opacity: 0.22 },
        { id: "world-wide-tech", name: "World Wide Technology", opacity: 0.28 },
        { id: "samsara", name: "Samsara", opacity: 0.34 }
      ]
    },
    {
      id: "rittal-csm",
      name: "Rittal Csm",
      color: "#328fa9",
      position: { top: 379, left: 235 },
      subSuppliers: [
        { id: "rittal-north", name: "Rittal North America", opacity: 0.1 },
        { id: "celestica", name: "Celestica", opacity: 0.16 },
        { id: "quanta-2", name: "Quanta", opacity: 0.22 },
        { id: "quanta-nashville-2", name: "Quanta Manufacturing Nashville", opacity: 0.28 }
      ]
    },
    {
      id: "seagate",
      name: "Seagate Technology Thailand",
      color: "#52a932",
      position: { top: 484, left: 235 },
      subSuppliers: [

      ]
    },
    {
      id: "kuehne-nagel",
      name: "Kuehne & Nagel Shanghai Branch",
      color: "#9532a9",
      position: { top: 582, left: 235 },
      subSuppliers: [
        { id: "inditex", name: "Inditex S A", opacity: 0.1 },
        { id: "reiss", name: "Reiss", opacity: 0.16 },
        { id: "tempe", name: "Tempe S A", opacity: 0.22 },
        { id: "provimi", name: "Provimi North America", opacity: 0.28 },
        { id: "nikole", name: "Nikole S A", opacity: 0.28 }
      ]
    },
    {
      id: "actmax",
      name: "Actmax",
      color: "#a97732",
      position: { top: 742, left: 235 },
      subSuppliers: [
        { id: "fii-usa", name: "Fii Usa", opacity: 0.1 },
        { id: "qch-2", name: "Qch", opacity: 0.16 },
        { id: "iec-tech", name: "Iec Technologies S De R L De C V", opacity: 0.22 }
      ]
    },
    {
      id: "invue-hk",
      name: "Invue Security Products Hk",
      color: "#a95532",
      position: { top: 822, left: 235 },
      subSuppliers: [
        { id: "invue-security", name: "Invue Security Products", opacity: 0.1 }
      ]
    }
  ],
  totalOtherCompanies: 23
};

export const GlobalTradeRelationships: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"graph" | "list">("graph");

  const [expandedDetails, setExpandedDetails] = useState<Record<number, boolean>>({});

  const toggleDetails = (id: number) => {
    setExpandedDetails((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const [selectedCompany, setSelectedCompany] = React.useState<'google' | 'apple' | 'microsoft'>('google');
  const getCurrentTradeData = () => {
    switch (selectedCompany) {
      case 'apple':
        return appleTradeData;
      case 'microsoft':
        return microsoftTradeData;
      default:
        return googleTradeData;
    }
  };

  return (
    <div className="flex flex-col items-start justify-center gap-4 p-3 sm:p-4 relative self-stretch w-full flex-[0_0_auto] rounded-2xl border border-solid border-[#e0e0e0] dark:border-borderDark">
      <div className="flex items-center justify-center gap-4 relative self-stretch w-full flex-[0_0_auto]">
        <div className="flex flex-col items-start gap-4 relative flex-1 grow w-full">
          <div className="flex items-center gap-1 relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex flex-wrap items-center gap-1 relative">
              <p className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Bold',Helvetica] font-bold text-text dark:text-textDark text-base sm:text-xl tracking-[0] leading-[30px]">
                Top 10 Global Trade Relationships
              </p>

              <div className="relative w-fit [font-family:'Satoshi-Regular',Helvetica] font-normal text-text dark:text-textDark text-xs sm:text-sm tracking-[0] leading-[21px]">
                {" "}
                (Top 10)
              </div>
            </div>
          </div>

          <div className="flex">
            <button
              onClick={() => setActiveTab("graph")}
              className={`py-2.5 px-3 sm:px-8 sm:py-3.5 border-b-2 text-sm sm:text-base ${activeTab === "graph"
                ? "border-primary dark:border-primarySecondary text-primary font-bold"
                : "border-border dark:border-borderDark text-textSecondary dark:text-textSecondaryDark"
                }`}
            >
              Graph view
            </button>
            <button
              onClick={() => setActiveTab("list")}
              className={`py-2.5 px-3 sm:px-8 sm:py-3.5 border-b-2 text-sm sm:text-base ${activeTab === "list"
                ? "border-primary dark:border-primarySecondary text-primary font-bold"
                : "border-border dark:border-borderDark text-textSecondary dark:text-textSecondaryDark"
                }`}
            >
              List view
            </button>
          </div>
          {activeTab === "graph" ? (
            <div className="relative w-full h-[1000px] overflow-auto">
              <GlobalTradeRelationshipsGraph
                data={getCurrentTradeData()}
                className="h-full"
              />
            </div>
          ) : (
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left border-separate border-spacing-y-2">
                <thead>
                  <tr className="text-sm sm:text-base font-medium [font-family:'Satoshi',Helvetica] text-primary">
                    <th className="w-[330px] px-2 sm:px-3 sm:py-2">Supplier</th>
                    <th className="w-[330px] px-2 sm:px-3 sm:py-2">Supplies to</th>
                  </tr>
                </thead>
                <tbody>
                  {relationshipsData.map((row) => (
                    <tr key={row.id} className="bg-fgc dark:bg-fgcDark shadow-sm rounded-lg">
                      <td className="px-2 sm:px-3 py-2 text-sm sm:text-base font-medium text-text dark:text-textDark">
                        {row.supplierName}
                      </td>
                      <td className="px-2 sm:px-3 py-2 text-sm text-text dark:text-textDark max-w-xl">
                        <p
                          className={`[font-family:'Satoshi',Helvetica] ${expandedDetails[row.id] ? "" : "line-clamp-1"
                            }`}
                        >
                          {row.supplierDetails}
                        </p>
                        {row.supplierDetails.length > 80 && (
                          <button
                            onClick={() => toggleDetails(row.id)}
                            className="text-blue-500 text-xs underline mt-1"
                          >
                            {expandedDetails[row.id] ? "Show Less" : "Show More"}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-center relative self-stretch w-full">
            <div className="inline-flex items-center justify-center gap-2 p-3 sm:px-8 sm:py-4 relative flex-[0_0_auto]">
              <div className="relative mt-[-1.00px] [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#004e66] text-sm sm:text-base tracking-[0] leading-6">
                This company : Google
              </div>
            </div>

            <div className="inline-flex items-center justify-center gap-2 p-3 sm:px-8 sm:py-4 relative flex-[0_0_auto]">
              <div className="relative mt-[-1.00px] [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#004e66] text-sm sm:text-base tracking-[0] leading-6">
                Its suppliers: 7
              </div>
            </div>

            <div className="inline-flex items-center justify-center gap-2 p-3 sm:px-8 sm:py-4 relative flex-[0_0_auto]">
              <p className="relative mt-[-1.00px] [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#004e66] text-sm sm:text-base tracking-[0] leading-6">
                Other companies using the supplier : 23
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
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

export const GlobalTradeRelationships: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"graph" | "list">("graph");

  const [expandedDetails, setExpandedDetails] = useState<Record<number, boolean>>({});

  const toggleDetails = (id: number) => {
    setExpandedDetails((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex flex-col items-start justify-center gap-4 p-3 sm:p-4 relative self-stretch w-full flex-[0_0_auto] rounded-2xl border border-solid border-[#e0e0e0]">
      <div className="flex items-center justify-center gap-4 relative self-stretch w-full flex-[0_0_auto]">
        <div className="flex flex-col items-start gap-4 relative flex-1 grow w-full">
          <div className="flex items-center gap-1 relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex flex-wrap items-center gap-1 relative">
              <p className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Bold',Helvetica] font-bold text-[#1e2d2a] text-base sm:text-xl tracking-[0] leading-[30px]">
                Top 10 Global Trade Relationships
              </p>

              <div className="relative w-fit [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#1e2d2a] text-xs sm:text-sm tracking-[0] leading-[21px]">
                {" "}
                (Top 10)
              </div>
            </div>
          </div>

          <div className="flex">
            <button
              onClick={() => setActiveTab("graph")}
              className={`py-2.5 px-3 sm:px-8 sm:py-3.5 border-b-2 text-sm sm:text-base ${activeTab === "graph"
                ? "border-[#529e7e] text-[#529e7e] font-bold"
                : "border-border dark:border-borderDark text-[#5f726e]"
                }`}
            >
              Graph view
            </button>
            <button
              onClick={() => setActiveTab("list")}
              className={`py-2.5 px-3 sm:px-8 sm:py-3.5 border-b-2 text-sm sm:text-base ${activeTab === "list"
                ? "border-[#529e7e] text-[#529e7e] font-bold"
                : "border-border dark:border-borderDark text-[#5f726e]"
                }`}
            >
              List view
            </button>
          </div>
          {activeTab === "graph" ? (
            <div className="relative w-full h-[883px]">
              <div className="inline-flex items-center justify-center gap-2.5 p-6 absolute top-[412px] left-[26px] bg-[#529e7e] rounded-lg">
                <div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-white text-2xl text-center tracking-[0] leading-9 whitespace-nowrap">
                  Google
                </div>
              </div>

              <div className="px-6 py-2 absolute top-[81px] left-[235px] bg-[#313ba9] rounded-xl flex w-[300px] items-center justify-center gap-2.5">
                <div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-white text-base text-center tracking-[0] leading-6 whitespace-nowrap">
                  Delta Electronics Jiangsu
                </div>
              </div>

              <div className="px-6 py-2 absolute top-[261px] left-[235px] bg-[#a9318f] rounded-xl flex w-[300px] items-center justify-center gap-2.5">
                <div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-white text-base text-center tracking-[0] leading-6 whitespace-nowrap">
                  Qmb
                </div>
              </div>

              <div className="px-6 py-2 absolute top-[379px] left-[235px] bg-[#318fa9] rounded-xl flex w-[300px] items-center justify-center gap-2.5">
                <div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-white text-base text-center tracking-[0] leading-6 whitespace-nowrap">
                  Rittal Csm
                </div>
              </div>

              <div className="px-6 py-2 absolute top-[484px] left-[235px] bg-[#51a931] rounded-xl flex w-[300px] items-center justify-center gap-2.5">
                <div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-white text-base text-center tracking-[0] leading-6 whitespace-nowrap">
                  Seagate Technology Thailand
                </div>
              </div>

              <div className="px-6 py-2 absolute top-[582px] left-[235px] bg-[#9532a9] rounded-xl flex w-[300px] items-center justify-center gap-2.5">
                <p className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-white text-base text-center tracking-[0] leading-6 whitespace-nowrap">
                  Kuehne &amp; Nagel Shanghai Branch
                </p>
              </div>

              <div className="flex w-[300px] items-center justify-center gap-2.5 px-6 py-2 absolute top-[742px] left-[235px] bg-[#a97731] rounded-xl">
                <div className="text-white relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-base text-center tracking-[0] leading-6 whitespace-nowrap">
                  Actmax
                </div>
              </div>

              <div className="flex w-[300px] items-center justify-center gap-2.5 px-6 py-2 absolute top-[822px] left-[235px] bg-[#a95531] rounded-xl">
                <div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-white text-base text-center tracking-[0] leading-6 whitespace-nowrap">
                  Invue Security Products Hk
                </div>
              </div>

              {/* <div className="absolute w-[377px] h-[834px] top-[21px] left-[535px]">
              </div> */}

              <div className="absolute w-9 h-[742px] top-[98px] left-48">
                {/* Connection lines */}
              </div>

              <img
                className="absolute w-[38px] h-px top-[453px] left-[154px] object-cover"
                alt="Line"
                src="#"
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
                    <tr key={row.id} className="bg-white shadow-sm rounded-lg">
                      <td className="px-2 sm:px-3 py-2 text-sm sm:text-base font-medium text-[#1e2d2a]">
                        {row.supplierName}
                      </td>
                      <td className="px-2 sm:px-3 py-2 text-sm text-gray-600 max-w-xl">
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
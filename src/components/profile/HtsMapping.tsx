import React, { useState } from "react";

const HtsData = [
  {
    id: 1,
    htsCode: "8504.40.6012",
    description: "With a power output and good result.",
    bolNumber: "BANQ1062859869",
    productDescription: "Of Electronic Components: Power Supply Hts # 8504.40.6012 +++ Full Detail As Per Invoice",
  },
  {
    id: 2,
    htsCode: "8473.30.80",
    description: "Parts and accessories",
    bolNumber: "EXDO6490062075",
    productDescription: "Computer Parts Hts# 84733080",
  },
  {
    id: 3,
    htsCode: "8517.70.90",
    description: "Parts",
    bolNumber: "EXDO6490065996",
    productDescription: "Computer Parts Hts# 8517709000",
  },
  {
    id: 4,
    htsCode: "8471.70.50",
    description: "Other",
    bolNumber: "EXDO6490062982",
    productDescription: "Computer Parts Hs 84717050",
  },
  {
    id: 5,
    htsCode: "8471.70.4065",
    description: "Hard magnetic disk",
    bolNumber: "EXDO6490062175",
    productDescription: "Linear Handling System And Accessories Hts-Code 8457 1090. Linear Handling System On 2 Pallets",
  },
  {
    id: 6,
    htsCode: "8457.10.90",
    description: "Machining centers",
    bolNumber: "EXDO6490062175",
    productDescription: "Computer Equipment Hts# 8471704065",
  },
  {
    id: 7,
    htsCode: "8471.70.4065",
    description: "Hard magnetic disk",
    bolNumber: "EXDO6490062175",
    productDescription: "Linear Handling System And Accessories Hts-Code 8457 1090. Linear Handling System On 2 Pallets Linear",
  },
  {
    id: 8,
    htsCode: "8471.70.4065",
    description: "Of other textile",
    bolNumber: "EXDO6490062175",
    productDescription: "Linear Handling System And Accessories Hts-Code 8457 1090. Linear Handling System On 2 Pallets Linear",
  },
  {
    id: 9,
    htsCode: "8471.70.4065",
    description: "Woven, but not made on",
    bolNumber: "EXDO6490062175",
    productDescription: "Furniture Shipper Cl Gupta Exports Ltd Km Stone, Delhi Road Jyoti Ba Phule Nagar, Vill Jiv Various",
  },
]

export const HtsMapping: React.FC = () => {

  const [expandedRows, setExpandedRows] = useState<{ [key: number]: boolean }>({});
  const [expandedDesc, setExpandedDesc] = useState<{ [key: number]: boolean }>({});

  const toggleDescription = (id: number) => {
    setExpandedDesc((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleProductDescription = (id: number) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex flex-col items-start justify-center gap-4 p-3 sm:p-4 relative self-stretch w-full flex-[0_0_auto] rounded-2xl border border-solid border-[#e0e0e0] dark:border-borderDark">
      <div className="flex items-center justify-center gap-4 relative self-stretch w-full flex-[0_0_auto]">
        <div className="flex flex-col items-start gap-2 sm:gap-4 relative flex-1 grow w-full">
          <div className="flex items-center gap-1 relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex flex-wrap items-center gap-1 relative">
              <p className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Bold',Helvetica] font-bold text-text dark:text-textDark text-base sm:text-xl tracking-[0] leading-[30px]">
                HTS Mapping from Product Descriptions
              </p>

              <div className="relative w-fit [font-family:'Satoshi-Regular',Helvetica] font-normal text-text dark:text-textDark text-sm tracking-[0] leading-[21px]">
                {" "}
                (Top 10)
              </div>
            </div>
          </div>
          <div className="overflow-x-auto w-full">
            <table className="min-w-full text-left border-separate border-spacing-y-2">
              <thead>
                <tr className="text-sm sm:text-base font-medium w-full [font-family:'Satoshi',Helvetica] text-primary">
                  <th className="w-[115px] sm:w-[210px] px-2 sm:px-3 sm:py-2">HTS Code</th>
                  <th className="w-[115px] sm:w-[210px] px-2 sm:px-3 sm:py-2">Description</th>
                  <th className="w-[115px] sm:w-[210px] px-2 sm:px-3 sm:py-2">BOL Number</th>
                  <th className="w-[115px] sm:w-[210px] px-2 sm:px-3 sm:py-2">Product Description</th>
                </tr>
              </thead>
              <tbody>
                {HtsData.map((row) => (
                  <tr key={row.id} className="bg-fgc dark:bg-fgcDark shadow-sm rounded-lg">
                    <td className="px-2 sm:px-3 py-1 sm:py-2 text-sm sm:text-base font-medium [font-family:'Satoshi',Helvetica] text-text dark:text-textDark">{row.htsCode}</td>
                    <td className="px-2 sm:px-3 py-1 sm:py-2 text-sm text-text dark:text-textDark max-w-xs">
                      <p
                        className={`[font-family:'Satoshi',Helvetica] ${expandedDesc[row.id] ? "" : "line-clamp-1"
                          }`}
                      >
                        {row.description}
                      </p>
                      {row.description.length > 25 && (
                        <button
                          onClick={() => toggleDescription(row.id)}
                          className="text-blue-500 text-xs underline mt-1"
                        >
                          {expandedDesc[row.id] ? "Show Less" : "Show More"}
                        </button>
                      )}
                    </td>
                    <td className="px-2 sm:px-3 py-1 sm:py-2 text-sm sm:text-base font-medium [font-family:'Satoshi',Helvetica] text-text dark:text-textDark">{row.bolNumber}</td>
                    <td className="px-2 sm:px-3 py-1 sm:py-2 text-sm text-text dark:text-textDark max-w-md">
                      <p
                        className={`[font-family:'Satoshi',Helvetica] ${expandedRows[row.id] ? "" : "line-clamp-3"
                          }`}
                      >
                        {row.productDescription}
                      </p>
                      {row.productDescription.length > 80 && (
                        <button
                          onClick={() => toggleProductDescription(row.id)}
                          className="text-blue-500 text-xs underline mt-1"
                        >
                          {expandedRows[row.id] ? "Show Less" : "Show More"}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

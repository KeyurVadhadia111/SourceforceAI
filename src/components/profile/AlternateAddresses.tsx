import React, { useState } from "react";
import {
  prepareGenericExport,
  exportGenericCSV,
} from "../utils/ExportGeneric";
import Icon from "components/utils/Icon";


const tabs = [
  { label: "Captured contact info", count: 3 },
  { label: "Other addresses", count: 25 },
  { label: "Other names", count: 2 },
  { label: "Other websites", count: 0 },
  { label: "Trademarks", count: 1630 },
];

const capturedContactInfo = [
  {
    id: 1,
    similarAddresses: "6715 Oakley Industrial Blvd 9333, Union City, Ga 30291, Us",
    phone: "XXXXXXX333",
    dateCaptured: "09/13/2020"
  },
  {
    id: 2,
    similarAddresses: "- Retail 1600 Amphitheatre Pkwy",
    phone: "XXXXXXX440",
    dateCaptured: "09/29/2019"
  },
  {
    id: 3,
    similarAddresses: "Billings, Ny 12510, Us",
    phone: "XXXXXXX300",
    dateCaptured: "09/25/2019"
  }
]


const otherAddresses = [
  { id: 1, similarAddresses: "2220 Outer Loop 258, Louisville, Ky 40219, Us", totalShipments: 1, companiesUsing: 0 },
  { id: 2, similarAddresses: "2355 Ball Dr, Saint Louis, Mo 63146, Us", totalShipments: 1, companiesUsing: 0 },
  { id: 3, similarAddresses: "475 Ellis St 475, Mountain View, Ca 94043, Us", totalShipments: 1, companiesUsing: 0 },
  { id: 4, similarAddresses: "806 Prospect Ave, Osceola, Wi 54020, Us", totalShipments: 1, companiesUsing: 0 },
  { id: 5, similarAddresses: "Billings, Ny 12510, Us", totalShipments: 1, companiesUsing: 0 },
  { id: 6, similarAddresses: "Billings, Ny 12510, Us", totalShipments: 1, companiesUsing: 0 },
  { id: 7, similarAddresses: "C/O Cynergy 4055 Corporate Dr Suite 300", totalShipments: 1, companiesUsing: 0 },
  { id: 8, similarAddresses: "Micro, Nc 27555, Us", totalShipments: 1, companiesUsing: 0 },
  { id: 9, similarAddresses: "12510 Micro Dr, Eastvale, Ca 91752, Us", totalShipments: 2, companiesUsing: 0 },
  { id: 10, similarAddresses: "C/O Quanta Computer Usa 41652 Boscell Rd", totalShipments: 2, companiesUsing: 0 },
  { id: 11, similarAddresses: "6120 Stewart Ave, Fremont, Ca 94538, Us", totalShipments: 3, companiesUsing: 0 },
  { id: 12, similarAddresses: "Elsie, Mi 48831, Us", totalShipments: 3, companiesUsing: 0 },
  { id: 13, similarAddresses: "C/O Ceva Logistics 195 E Elk Trail", totalShipments: 7, companiesUsing: 0 },
  { id: 14, similarAddresses: "6715 Oakley Industrial Blvd 9333, Union City, Ga 30291, Us", totalShipments: 16, companiesUsing: 0 },
  { id: 15, similarAddresses: "6715 Oakley Industrial Blvd, Union City, Ga 30291, Us", totalShipments: 19, companiesUsing: 0 },
  { id: 16, similarAddresses: "9050 Hermosa Ave, Rancho Cucamonga, Ca 91730, Us", totalShipments: 25, companiesUsing: 0 },
  { id: 17, similarAddresses: "4601 Stillwell Ave, Kansas City, Mo 64120, Us", totalShipments: 32, companiesUsing: 0 },
  { id: 18, similarAddresses: "- Retail 1600 Amphitheatre Pkwy", totalShipments: 36, companiesUsing: 0 },
  { id: 19, similarAddresses: "Lithia Springs, Ga 30122, Us", totalShipments: 42, companiesUsing: 0 },
  { id: 20, similarAddresses: "1000 Logistics Center Dr, Ste 2000, Fairburn, Ga 30213, Us", totalShipments: 45, companiesUsing: 0 },
  { id: 21, similarAddresses: "12510 Micro Dr, Eastvale, Ca 91752, Us", totalShipments: 61, companiesUsing: 0 },
  { id: 22, similarAddresses: "1600 Amphitheatre Pkwy, Mountain View, Ca 94043, Us", totalShipments: 96, companiesUsing: 0 },
  { id: 23, similarAddresses: "343 E Lies Rd, Carol Stream, Il 60188, Us", totalShipments: 165, companiesUsing: 0 },
  { id: 24, similarAddresses: "C/O Ingram Micro 9050 Hermosa Ave", totalShipments: 6, companiesUsing: 1 },
  { id: 25, similarAddresses: "Billings, Ny 12510, Us", totalShipments: 1, companiesUsing: 2 },
];

const otherNames = [
  {
    id: 1,
    name: "SourceForceAI"
  },
  {
    id: 2,
    name: "SourceForceAI"

  }
]

const trademarks = [
  {
    id: 1,
    trademarkName: "SourceForceAI",
    count: 1630
  }
]


const exportMap = {
  "Captured contact info": {
    data: capturedContactInfo,
    headers: ["Similar Address", "Phone", "Date Captured"],
    fields: ["similarAddresses", "phone", "dateCaptured"]
  },
  "Other addresses": {
    data: otherAddresses,
    headers: ["Similar Address", "Total Shipments", "Companies Using"],
    fields: ["similarAddresses", "totalShipments", "companiesUsing"]
  },
  "Other names": {
    data: otherNames,
    headers: ["Name"],
    fields: ["name"]
  },
  "Trademarks": {
    data: trademarks,
    headers: ["Trademark Name", "Count"],
    fields: ["trademarkName", "count"]
  }
} as const;

type TabLabel = keyof typeof exportMap;



export const AlternateAddresses: React.FC = () => {



  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  return (
    <div className="justify-center gap-4 p-4 border border-solid border-[#e0e0e0] flex flex-col items-start relative self-stretch w-full flex-[0_0_auto] rounded-2xl">
      <div className="flex items-center gap-4 relative self-stretch w-full flex-[0_0_auto]">
        <div className="flex flex-col items-start gap-4 relative flex-1 grow w-full">
          <div className="flex items-center gap-1 relative self-stretch w-full flex-[0_0_auto]">
            <p className="relative w-fit mt-[-1.00px] [font-family:'Satoshi',Helvetica] font-bold text-[#1e2d2a] text-base sm:text-xl tracking-[0] leading-[30px]">
              Alternate Company Addresses &amp; Contact Metadata
            </p>
          </div>

          <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto] rounded-2xl">
            <div className="flex items-start relative self-stretch w-full flex-[0_0_auto] overflow-x-auto no-scrollbar">
              {tabs.map((tab, index) => {
                const isSelected = selectedTabIndex === index;
                return (
                  <div
                    key={tab.label}
                    onClick={() => setSelectedTabIndex(index)}
                    className={`inline-flex cursor-pointer items-center justify-center gap-1 pt-2.5 pb-[11px] px-4 relative flex-[0_0_auto] border-b-2 [border-bottom-style:solid] ${isSelected ? "border-[#529e7e]" : "border-border dark:border-border"
                      }`}
                  >
                    <div
                      className={`relative w-fit [font-family:'Satoshi',Helvetica] font-normal ${isSelected ? "text-[#529e7e]" : "text-[#5f726e]"
                        } text-sm sm:text-base text-center tracking-[0] leading-6 whitespace-nowrap`}
                    >
                      {tab.label}
                    </div>

                    <div
                      className={`inline-flex items-start justify-center px-1 py-0.5 relative flex-[0_0_auto] rounded ${isSelected ? "bg-[#529e7e]" : "bg-[#5f726e]"
                        }`}
                    >
                      <div className="mt-[-1.00px] [font-family:'Satoshi',Helvetica] font-bold text-white text-base text-center leading-6 whitespace-nowrap relative w-fit tracking-[0]">
                        {tab.count}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* You can now conditionally render based on selectedTabIndex */}
            <div className="flex items-center justify-around gap-1 relative self-stretch w-full flex-[0_0_auto]">
              <p className="relative flex-1 mt-[-1.00px] [font-family:'Satoshi',Helvetica] font-normal text-transparent text-sm sm:text-base tracking-[0] leading-6">
                <span className="text-[#1e2d2a]">The most recent contact info is: </span>
                <span className="[font-family:'Satoshi',Helvetica] font-bold text-[#1e2d2a]">XXXXXXX333</span>
                <span className="text-[#1e2d2a]"> found on </span>
                <span className="[font-family:'Satoshi',Helvetica] font-bold text-[#1e2d2a]">13/09/2020</span>
                <span className="text-[#1e2d2a]"> in the BOL </span>
                <span className="[font-family:'Satoshi',Helvetica] font-medium text-[#529e7e] underline">
                  EXDO6711148867
                </span>
              </p>
            </div>

            {/* Tab content display can vary below depending on selectedTabIndex */}
            <div className="flex flex-col items-start gap-2 px-0 sm:py-2 relative self-stretch w-full flex-[0_0_auto]">
              <div className="flex flex-col items-start gap-4 p-3 sm:px-4 sm:py-6 relative self-stretch w-full flex-[0_0_auto] bg-white rounded-2xl">
                {tabs[selectedTabIndex].label === "Captured contact info" && (
                  <div className="w-full overflow-x-auto">
                    <table className="w-full border-collapse text-left min-w-[500px]">
                      <thead>
                        <tr className="border-b border-[#eeeeee]">
                          <th className="w-[300px] text-[#529e7e] text-sm sm:text-base text-start font-medium pr-2">Other similar addresses that company is using</th>
                          <th className="w-[100px] text-[#529e7e] text-sm sm:text-base text-start font-medium pr-2">Phone</th>
                          <th className="w-[96px] text-[#529e7e] text-sm sm:text-base text-start font-medium pr-2">Date Captured</th>
                        </tr>
                      </thead>
                      <tbody>
                        {capturedContactInfo.map((item) => (
                          <tr key={item.id} className="h-[66px] border-b border-[#eeeeee]">
                            <td className="text-[#1e2d2a] text-sm sm:text-base text-start font-medium pr-2">{item.similarAddresses}</td>
                            <td className="text-[#1e2d2a] text-xs font-normal pr-2">{item.phone}</td>
                            <td className="text-[#1e2d2a] text-sm sm:text-base font-normal pr-2">{item.dateCaptured}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {tabs[selectedTabIndex].label === "Other addresses" && (
                  <div className="w-full overflow-x-auto">
                    <table className="w-full border-collapse text-left min-w-[500px]">
                      <thead>
                        <tr className="border-b border-[#eeeeee]">
                          <th className="w-[300px] text-[#529e7e] text-sm sm:text-base text-start font-medium pr-2">Other similar addresses that company is using</th>
                          <th className="w-[100px] text-[#529e7e] text-sm sm:text-base text-start font-medium pr-2">Total Shipments</th>
                          <th className="w-[96px] text-[#529e7e] text-sm sm:text-base text-start font-medium pr-2">Companies using the same address</th>
                        </tr>
                      </thead>
                      <tbody>
                        {otherAddresses.map((item) => (
                          <tr key={item.id} className="h-[66px] border-b border-[#eeeeee]">
                            <td className="text-[#1e2d2a] text-sm sm:text-base text-start font-medium pr-2">{item.similarAddresses}</td>
                            <td className="text-[#1e2d2a] text-xs font-normal pr-2">{item.totalShipments}</td>
                            <td className="text-[#1e2d2a] text-sm sm:text-base font-normal pr-2">{item.companiesUsing}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {tabs[selectedTabIndex].label === "Other names" && (
                  <div className="flex justify-around w-full">
                    {otherNames.map((item) => (
                      <ul key={item.id} className="list-disc list-inside">
                        <li className="text-[#1e2d2a] text-sm sm:text-base text-start font-medium pr-2">{item.name}</li>
                      </ul>
                    ))}
                  </div>
                )}
                {tabs[selectedTabIndex].label === "Other websites" && (
                  <div className="flex justify-center [font-family:'Satoshi',Helvetica] font-bold w-full">
                    No results.
                  </div>
                )}
                {tabs[selectedTabIndex].label === "Trademarks" && (
                  <div className="w-full overflow-x-auto">
                    <table className="w-full border-collapse text-left min-w-full sm:min-w-[500px]">
                      <thead>
                        <tr className="border-b border-[#eeeeee]">
                          <th className="w-full sm:w-[300px] text-[#529e7e] text-sm sm:text-base text-start font-medium pr-2">Trademark URL</th>
                          <th className="w-full sm:w-[100px] text-[#529e7e] text-sm sm:text-base text-start font-medium pr-2">Trademarks count</th>
                        </tr>
                      </thead>
                      <tbody>
                        {trademarks.map((item) => (
                          <tr key={item.id} className="h-[66px] border-b border-[#eeeeee]">
                            <td className="text-[#1e2d2a] text-sm sm:text-base text-start font-medium pr-2">{item.trademarkName}</td>
                            <td className="text-[#1e2d2a] text-xs font-normal pr-2">{item.count}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1 relative self-stretch w-full flex-[0_0_auto]">
              <div className="cursor-pointer bg-[#529e7e] inline-flex h-[42px] items-center justify-center gap-3 px-6 py-3.5 relative flex-[0_0_auto] rounded-[50px] overflow-hidden"
                onClick={() => {
                  const selectedTab = tabs[selectedTabIndex].label as TabLabel;
                  const { data, headers, fields } = exportMap[selectedTab];
                  const csvData = prepareGenericExport(data, headers, fields);
                  exportGenericCSV(csvData, selectedTab);
                }}
              >
                <Icon icon="download" className="w-3.5 h-3.5 text-white" />
                <div className="relative w-fit mt-[-5.50px] mb-[-2.50px] [font-family:'Satoshi',Helvetica] font-medium text-white text-base tracking-[0] leading-[22px] whitespace-nowrap"
                >
                  CSV
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

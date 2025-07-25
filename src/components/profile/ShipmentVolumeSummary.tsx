import React, { useState } from "react";
import { PieChart } from "../common/PieChart";

const TABS = [
  "Lanes used",
  "Containers used",
  "Notify parties",
  "SCAC codes",
  "Ports shipped from",
  "Ports shipped to",
  "States shipped to",
];

const containersused = [
  {
    id: 1,
    title: "40ft (45G0) - General Purpose Container (no ventilation)",
    value: 128
  },
  {
    id: 2,
    title: "40ft (4FG0) - General Purpose Container (no ventilation)",
    value: 320
  },
  {
    id: 3,
    title: "40ft (45G1) - General Purpose Container (no ventilation)",
    value: 490
  },
  {
    id: 4,
    title: "20ft (22G0) - General Purpose Container (no ventilation)",
    value: 214
  },
  {
    id: 5,
    title: "40ft (42G0) - General Purpose Container (no ventilation)",
    value: 112
  },
];

const notifyparties = [
  {
    id: 1,
    title: "Google",
    value: 128
  },
  {
    id: 2,
    title: "Google C O Gxo Logistics Oakley",
    value: 320
  },
  {
    id: 3,
    title: "Gxo Logistics Google",
    value: 490
  },
  {
    id: 4,
    title: "Pegatron",
    value: 214
  }
];

const SCACcodes = [
  {
    id: 1,
    title: "EXDO - Expeditors International",
    value: 128
  },
  {
    id: 2,
    title: "EXNW - Excel Network Shanghai Limited",
    value: 320
  },
  {
    id: 3,
    title: "WWLL - Worldwide Logistics Co Ltd",
    value: 490
  },
  {
    id: 4,
    title: "BANQ - Kuehne & Nagel Inc.",
    value: 214
  },
  {
    id: 5,
    title: "MIQO - Miq Logistics",
    value: 214
  }
];

const portsshippedfrom = [
  {
    id: 1,
    title: "Shanghai",
    value: 128,
    icon: "assets/images/country/shanghai.svg"
  },
  {
    id: 2,
    title: "Taipei",
    value: 320,
    icon: "assets/images/country/taipei.svg"
  },
  {
    id: 3,
    title: "Rotterdam",
    value: 490,
    icon: "assets/images/country/rotterdam.svg"
  },
  {
    id: 4,
    title: "Hong Kong",
    value: 214,
    icon: "assets/images/country/hongKong.svg"
  },
  {
    id: 5,
    title: "Qingdao",
    value: 112,
    icon: "assets/images/country/hongKong.svg"
  }
];

const portsshippedto = [
  {
    id: 1,
    title: "Long Beach, Ca ",
    value: 128,
    icon: "assets/images/country/america.svg"
  },
  {
    id: 2,
    title: "Los Angeles, Ca ",
    value: 320,
    icon: "assets/images/country/america.svg"
  },
  {
    id: 3,
    title: "Charleston, Sc",
    value: 490,
    icon: "assets/images/country/america.svg"
  },
  {
    id: 4,
    title: "Savannah, Ga",
    value: 214,
    icon: "assets/images/country/america.svg"
  },
  {
    id: 5,
    title: "Tacoma, Wa",
    value: 112,
    icon: "assets/images/country/america.svg"
  }
];

const statesShippedto = [
  {
    id: 1,
    title: "California",
    value: 128,
    icon: "assets/images/country/america.svg"
  },
  {
    id: 2,
    title: "Georgia",
    value: 320,
    icon: "assets/images/country/america.svg"
  },
  {
    id: 3,
    title: "South Carolina",
    value: 490,
    icon: "assets/images/country/america.svg"
  },
  {
    id: 4,
    title: "Washington",
    value: 214,
    icon: "assets/images/country/america.svg"
  },
  {
    id: 5,
    title: "Florida",
    value: 112,
    icon: "assets/images/country/america.svg"
  }
];

const lanesUsed = [
  {
    id: 1,
    title: "Shanghai > Long Beach, Ca",
    value: 128,
    shipmentPrice: "$212,520",
    icon1: "assets/images/country/shanghai.svg",
    icon2: "assets/images/country/america.svg"
  },
  {
    id: 2,
    title: "Taipei > Los Angeles, Ca",
    value: 320,
    shipmentPrice: "$112,200",
    icon1: "assets/images/country/taipei.svg",
    icon2: "assets/images/country/america.svg"
  },
  {
    id: 3,
    title: "Rotterdam > Charleston, Sc",
    value: 490,
    shipmentPrice: "$520,952",
    icon1: "assets/images/country/rotterdam.svg",
    icon2: "assets/images/country/america.svg"
  },
  {
    id: 4,
    title: "Hong Kong > Los Angeles, Ca",
    value: 214,
    shipmentPrice: "$100,110",
    icon1: "assets/images/country/hongKong.svg",
    icon2: "assets/images/country/america.svg"
  },
  {
    id: 5,
    title: "Qingdao > Los Angeles, Ca",
    value: 112,
    shipmentPrice: "$365,000",
    icon1: "assets/images/country/hongKong.svg",
    icon2: "assets/images/country/america.svg"
  }
];


const fclLclData = [
  { label: "FCL", value: 473, color: "#529E7E" },
  { label: "LCL", value: 97, color: "#1E2D2A" },
];

const billTypeData = [
  { label: "House", value: 559, color: "#1E2D2A" },
  { label: "Regular", value: 11, color: "#529E7E" },
];

const notifyPartyData = [
  { label: "With Notify Party", value: 200, color: "#529E7E" },
  { label: "Without Notify Party", value: 370, color: "#1E2D2A" },
];

// Calculate percentage dynamically
const totalFclLcl = fclLclData.reduce((sum, item) => sum + item.value, 0);
const fclPercent = ((fclLclData[0].value / totalFclLcl) * 100).toFixed(2);
const lclPercent = ((fclLclData[1].value / totalFclLcl) * 100).toFixed(2);


const totalBillType = billTypeData.reduce((sum, item) => sum + item.value, 0);
const housePercent = ((billTypeData[0].value / totalBillType) * 100).toFixed(2);
const regularPercent = ((billTypeData[1].value / totalBillType) * 100).toFixed(2);

const totalNotifyParty = notifyPartyData.reduce((sum, item) => sum + item.value, 0);
const withNotifyPercent = ((notifyPartyData[0].value / totalNotifyParty) * 100).toFixed(2);
const withoutNotifyPercent = ((notifyPartyData[1].value / totalNotifyParty) * 100).toFixed(2);


const isFCLBigger = fclLclData[0].value > fclLclData[1].value;
const isHouseBigger = billTypeData[0].value > billTypeData[1].value;
const isWithNotifyBigger = notifyPartyData[0].value > notifyPartyData[1].value;


export const ShipmentVolumeSummary: React.FC = () => {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  return (
    <div className="flex flex-col items-start justify-center gap-4 p-3 sm:p-4 relative self-stretch w-full flex-[0_0_auto] rounded-2xl border border-solid border-[#e0e0e0]">
      <div className="flex items-center gap-4 relative self-stretch w-full flex-[0_0_auto]">
        <div className="flex flex-col items-start relative flex-1 grow w-full">
          <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex items-center gap-1 relative self-stretch w-full flex-[0_0_auto]">
              <div className="w-fit [font-family:'Satoshi-Bold',Helvetica] font-bold text-base sm:text-xl leading-[30px] relative mt-[-1.00px] text-[#1e2d2a] tracking-[0]">
                Shipment Volume Summary
              </div>
            </div>

            <div className="w-full overflow-x-auto no-scrollbar">
              <div className="inline-flex min-w-max">
                {TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`p-3 sm:px-4 sm:py-2 whitespace-nowrap text-sm sm:text-base font-medium transition-all border-b-2 ${activeTab === tab
                      ? "text-[#529e7e] border-b-2 border-[#529e7e] font-bold"
                      : "text-[#5f726e] border-b-2 border-border dark:border-borderDark"
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full p-3 sm:px-4 sm:py-6">
              {activeTab === "Lanes used" && (
                <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
                  <div className="flex flex-col items-start gap-6 relative self-stretch w-full flex-[0_0_auto] bg-white rounded-2xl">
                    <div className="flex flex-col gap-6 w-full overflow-x-auto">
                      {lanesUsed.map((item => (
                        <div key={item.id} className="w-[500px] sm:w-full flex justify-between [font-family:'Satoshi',Helvetica] font-medium text-sm sm:text-base">
                          <div className="flex items-center gap-1 w-full max-w-[250px] sm:max-w-[350px]">
                            <img src={item.icon1} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            <span>{item.title}</span>
                            <img src={item.icon2} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </div>
                          <span>{item.value}</span>
                          <span className="text-primary w-full max-w-[80px]">{item.shipmentPrice}</span>
                        </div>
                      )))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "Containers used" && (
                <div className="flex flex-col gap-6">
                  {containersused.map((item => (
                    <div key={item.id} className="flex justify-between gap-2 [font-family:'Satoshi',Helvetica] font-medium text-sm sm:text-base">
                      <span>{item.title}</span>
                      <span>{item.value}</span>
                    </div>
                  )))}
                </div>
              )}

              {activeTab === "Notify parties" && (
                <div className="flex flex-col gap-6">
                  {notifyparties.map((item => (
                    <div key={item.id} className="flex justify-between gap-2 [font-family:'Satoshi',Helvetica] font-medium text-sm sm:text-base">
                      <span>{item.title}</span>
                      <span>{item.value}</span>
                    </div>
                  )))}
                </div>
              )}

              {/* Add other tab content similarly */}
              {activeTab === "SCAC codes" && (
                <div className="flex flex-col gap-6">
                  {SCACcodes.map((item => (
                    <div key={item.id} className="flex justify-between gap-2 [font-family:'Satoshi',Helvetica] font-medium text-sm sm:text-base">
                      <span>{item.title}</span>
                      <span>{item.value}</span>
                    </div>
                  )))}
                </div>
              )}
              {activeTab === "Ports shipped from" && (
                <div className="flex flex-col gap-6">
                  {portsshippedfrom.map((item => (
                    <div key={item.id} className="flex justify-between gap-2 [font-family:'Satoshi',Helvetica] font-medium text-sm sm:text-base">
                      <div className="flex items-center gap-1">
                        <img src={item.icon} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span>{item.title}</span>
                      </div>
                      <span>{item.value}</span>
                    </div>
                  )))}
                </div>
              )}
              {activeTab === "Ports shipped to" && (
                <div className="flex flex-col gap-6">
                  {portsshippedto.map((item => (
                    <div key={item.id} className="flex justify-between gap-2 [font-family:'Satoshi',Helvetica] font-medium text-sm sm:text-base">
                      <div className="flex items-center gap-1">
                        <span>{item.title}</span>
                        <img src={item.icon} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                      <span>{item.value}</span>
                    </div>
                  )))}
                </div>
              )}
              {activeTab === "States shipped to" && (
                <div className="flex flex-col gap-6">
                  {statesShippedto.map((item => (
                    <div key={item.id} className="flex justify-between gap-2 [font-family:'Satoshi',Helvetica] font-medium text-sm sm:text-base">
                      <div className="flex items-center gap-1">
                        <span>{item.title}</span>
                        <img src={item.icon} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                      <span>{item.value}</span>
                    </div>
                  )))}
                </div>
              )}
            </div>
            <div className="flex flex-col lg:min-[1025px]:flex-row items-center justify-between gap-6 sm:gap-0 w-full">
              {/* FCL vs LCL */}
              <div className="flex flex-col items-center gap-4 sm:gap-8 flex-1">
                <div className="text-[#1e2d2a] font-bold text-base sm:text-xl text-center leading-8 sm:min-h-[64px] flex items-start justify-center px-2">
                  FCL vs LCL Shipments
                </div>
                <div className="flex flex-col gap-6 w-full items-center">

                  <div className="relative w-[200px] h-[140px]">
                    <PieChart data={fclLclData} width={200} height={140} />
                    {/* Percentage Labels */}
                    <div className={`absolute left-[-30px] top-[30px] text-sm font-semibold ${isFCLBigger ? 'text-primary' : 'text-text'
                      }`}>
                      {fclPercent}%
                    </div>
                    <div className={`absolute right-[-35px] bottom-[25px] text-black text-sm font-semibold ${!isFCLBigger ? 'text-primary' : 'text-text'
                      }`}>
                      {lclPercent}%
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5 text-sm text-[#1e2d2a]">
                    {fclLclData.map((item) => (
                      <div key={item.label} className="flex items-center gap-2">
                        <div
                          className="w-3.5 h-3.5"
                          style={{ backgroundColor: item.color }}
                        />
                        {item.label}: {item.value} shipments
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Shipments Breakdown by Bill Type */}
              <div className="flex flex-col items-center gap-4 sm:gap-8 flex-1">
                <div className="text-[#1e2d2a] font-bold text-base sm:text-xl text-center leading-8 sm:min-h-[64px] flex items-start justify-center px-2">
                  Shipments Breakdown by Bill Type
                </div>
                <div className="flex flex-col gap-6 w-full items-center">

                  <div className="relative w-[200px] h-[140px]">
                    <PieChart data={billTypeData} width={200} height={140} />
                    <div className={`absolute left-[-30px] top-[30px] text-sm font-semibold ${isHouseBigger ? 'text-primary' : 'text-text'
                      }`}>
                      {housePercent}%
                    </div>
                    <div className={`absolute right-[-35px] bottom-[25px] text-sm font-semibold ${!isHouseBigger ? 'text-primary' : 'text-text'
                      }`}>
                      {regularPercent}%
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 text-sm text-[#1e2d2a]">
                    {billTypeData.map((item) => (
                      <div key={item.label} className="flex items-center gap-2">
                        <div
                          className="w-3.5 h-3.5"
                          style={{ backgroundColor: item.color }}
                        />
                        {item.label}: {item.value} shipments
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Notify Party Stats */}
              <div className="flex flex-col items-center gap-4 sm:gap-8 flex-1">
                <div className="text-[#1e2d2a] font-bold text-base sm:text-xl text-center leading-8 sm:min-h-[64px] flex items-start justify-center px-2">
                  Notify Party Stats
                </div>
                <div className="flex flex-col gap-6 w-full items-center">

                  <div className="relative w-[200px] h-[140px]">
                    <PieChart data={notifyPartyData} width={200} height={140} />
                    <div className={`absolute left-[-30px] top-[30px] text-sm font-semibold ${isWithNotifyBigger ? 'text-primary' : 'text-text'
                      }`}>
                      {withNotifyPercent}%
                    </div>
                    <div className={`absolute right-[-35px] bottom-[25px] text-sm font-semibold ${!isWithNotifyBigger ? 'text-primary' : 'text-text'
                      }`}>
                      {withoutNotifyPercent}%
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 text-sm text-[#1e2d2a]">
                    {notifyPartyData.map((item) => (
                      <div key={item.label} className="flex items-center gap-2">
                        <div
                          className="w-3.5 h-3.5"
                          style={{ backgroundColor: item.color }}
                        />
                        {item.label}: {item.value} shipments
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">


            {/* Additional shipping lanes would go here */}
          </div>
        </div>
      </div>
    </div>
  );
};

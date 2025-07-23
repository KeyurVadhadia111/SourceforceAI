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

            {/* Content Area */}
            <div className="relative w-full h-[554px]">
              {tabs.map(({ key, type, data }) =>
                activeTab === key && (
                  <div key={key} className="flex justify-center w-full h-[554px]">
                    {type === "common" && data ? (
                      <TabContent title={data.title} value={data.value} />
                    ) : (
                      // Render hierarchy layout as before
                      <div className="relative w-[745px] h-[554px]">
                        <div className="absolute w-[625px] h-[554px] top-0 left-[120px]">
                          <img
                            className="absolute w-[102px] h-[139px] top-[265px] left-[351px]"
                            alt="Vector"
                            src="#"
                          />

                          <img
                            className="absolute w-[97px] h-[191px] top-[265px] left-[84px]"
                            alt="Vector"
                            src="#"
                          />

                          <img
                            className="absolute w-[203px] h-[124px] top-[173px] left-0"
                            alt="Vector"
                            src="#"
                          />

                          <img
                            className="absolute w-[203px] h-[124px] top-[151px] left-[341px]"
                            alt="Vector"
                            src="#"
                          />

                          <img
                            className="absolute w-[89px] h-[205px] top-[273px] left-[259px]"
                            alt="Vector"
                            src="#"
                          />

                          <img
                            className="absolute w-[89px] h-[138px] top-[79px] left-[159px]"
                            alt="Vector"
                            src="#"
                          />

                          <img
                            className="absolute w-[89px] h-[139px] top-[78px] left-[304px]"
                            alt="Vector"
                            src="#"
                          />

                          <div className="inline-flex items-center justify-center gap-2.5 p-3 absolute top-[204px] left-[181px] bg-[#529e7e] rounded-lg">
                            <div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-white text-base text-center tracking-[0] leading-6">
                              Product Breakdown <br />
                              (HS Code)
                            </div>
                          </div>

                          <div className="flex flex-col w-[120px] items-center justify-center gap-0.5 p-2 absolute top-0 left-[102px] bg-[#313ba9] rounded-xl">
                            <div className="relative self-stretch mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-white text-sm text-center tracking-[0] leading-[21px]">
                              85
                            </div>

                            <div className="self-stretch [font-family:'Satoshi-Medium',Helvetica] font-medium text-white text-center relative text-sm tracking-[0] leading-[21px]">
                              Electric motors/Appliances
                            </div>
                          </div>

                          <div className="flex flex-col w-[120px] items-center justify-center gap-0.5 p-2 absolute top-0 left-[333px] bg-[#31a1a9] rounded-xl">
                            <div className="relative self-stretch mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-white text-sm text-center tracking-[0] leading-[21px]">
                              82
                            </div>

                            <div className="relative self-stretch [font-family:'Satoshi-Medium',Helvetica] font-medium text-white text-sm text-center tracking-[0] leading-[21px]">
                              Metal tools/cutlery
                            </div>
                          </div>

                          <div className="flex flex-col w-[120px] items-center justify-center gap-0.5 p-2 absolute top-[110px] left-[505px] bg-[#a95531] rounded-xl">
                            <div className="relative self-stretch mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-white text-sm text-center tracking-[0] leading-[21px]">
                              29
                            </div>

                            <div className="relative self-stretch [font-family:'Satoshi-Medium',Helvetica] font-medium text-white text-sm text-center tracking-[0] leading-[21px]">
                              Organic chemicals
                            </div>
                          </div>

                          <div className="flex flex-col w-[120px] items-center justify-center gap-0.5 p-2 absolute top-[349px] left-[453px] bg-[#a9a531] rounded-xl">
                            <div className="relative self-stretch mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-white text-sm text-center tracking-[0] leading-[21px]">
                              90
                            </div>

                            <div className="relative self-stretch [font-family:'Satoshi-Medium',Helvetica] font-medium text-white text-sm text-center tracking-[0] leading-[21px]">
                              Cameras/Precision instruments
                            </div>
                          </div>

                          <div className="flex flex-col w-[120px] items-center justify-center gap-0.5 p-2 absolute top-[473px] left-72 bg-[#73a931] rounded-xl">
                            <div className="relative self-stretch mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-white text-sm text-center tracking-[0] leading-[21px]">
                              90
                            </div>

                            <div className="relative self-stretch [font-family:'Satoshi-Medium',Helvetica] font-medium text-white text-sm text-center tracking-[0] leading-[21px]">
                              Electric motors/Appliances
                            </div>
                          </div>

                          <div className="flex flex-col w-[120px] items-center justify-center gap-0.5 p-2 absolute top-[432px] left-[7px] bg-[#a93181] rounded-xl">
                            <div className="relative self-stretch mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-white text-sm text-center tracking-[0] leading-[21px]">
                              38
                            </div>

                            <div className="relative self-stretch [font-family:'Satoshi-Medium',Helvetica] font-medium text-white text-sm text-center tracking-[0] leading-[21px]">
                              Misc. chemicals
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col w-[120px] items-center justify-center gap-0.5 p-2 absolute top-[145px] left-0 bg-[#7531a9] rounded-xl">
                          <div className="relative self-stretch mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-white text-sm text-center tracking-[0] leading-[21px]">
                            90
                          </div>

                          <div className="relative self-stretch [font-family:'Satoshi-Medium',Helvetica] font-medium text-white text-sm text-center tracking-[0] leading-[21px]">
                            Cameras/Precision instruments
                          </div>
                        </div>
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

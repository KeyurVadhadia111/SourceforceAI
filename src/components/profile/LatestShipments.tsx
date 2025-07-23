import React from "react";

export const LatestShipments: React.FC = () => {
  return (
    <div className="flex flex-col items-start justify-center gap-4 p-4 relative self-stretch w-full flex-[0_0_auto] rounded-2xl border border-solid border-[#e0e0e0]">
      <div className="flex items-center gap-4 relative self-stretch w-full flex-[0_0_auto]">
        <div className="flex flex-col items-start gap-4 relative flex-1 grow">
          <div className="flex items-center gap-1 relative self-stretch w-full flex-[0_0_auto]">
            <div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
              <p className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Bold',Helvetica] font-bold text-[#1e2d2a] text-xl tracking-[0] leading-[30px] whitespace-nowrap">
                Latest Sea Freight Shipment Records
              </p>

              <div className="relative w-fit [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#1e2d2a] text-sm tracking-[0] leading-[21px] whitespace-nowrap">
                {" "}
                (Top 10)
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-4 px-4 py-6 relative self-stretch w-full flex-[0_0_auto] bg-white rounded-2xl">
            <div className="flex items-start gap-4 pt-0 pb-4 px-0 self-stretch w-full border-b [border-bottom-style:solid] relative flex-[0_0_auto] border-[#eeeeee]">
              <div className="flex w-[100px] items-start gap-2 relative self-stretch">
                <div className="inline-flex flex-col items-start gap-2 relative flex-[0_0_auto]">
                  <div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#529e7e] text-base text-center leading-6 tracking-[0] whitespace-nowrap">
                    Date
                  </div>
                </div>
              </div>

              <div className="flex w-[120px] items-start gap-2 relative self-stretch">
                <div className="inline-flex flex-col gap-1 flex-[0_0_auto] items-start relative">
                  <div className="w-fit [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#529e7e] text-base text-center leading-6 whitespace-nowrap relative mt-[-1.00px] tracking-[0]">
                    Bill of Lading
                  </div>
                </div>
              </div>

              <div className="flex w-[190px] items-start gap-2 relative self-stretch">
                <div className="flex flex-col gap-1 flex-1 grow items-start relative">
                  <div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#529e7e] text-base text-center tracking-[0] leading-6 whitespace-nowrap">
                    Suppliers
                  </div>

                  <div className="inline-flex items-center justify-center gap-2.5 px-3 py-2 bg-white rounded-[50px] border border-solid relative flex-[0_0_auto] border-[#eeeeee]">
                    <div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#1e2d2a] text-xs text-center tracking-[0] leading-[18px] whitespace-nowrap">
                      United States, China
                    </div>

                    <div className="relative w-4 h-4 rotate-90">
                      <div className="relative w-1 h-[7px] top-1 left-1.5">
                        <img
                          className="absolute w-[7px] h-1 top-px -left-px"
                          alt="Vector stroke"
                          src="#"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex w-20 items-start self-stretch gap-2 relative">
                <div className="inline-flex flex-col gap-1 flex-[0_0_auto] items-start relative">
                  <div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#529e7e] text-base text-center tracking-[0] leading-6 whitespace-nowrap">
                    Weight
                  </div>
                </div>
              </div>

              <div className="flex w-[100px] items-start gap-2 relative self-stretch">
                <div className="inline-flex flex-col gap-1 flex-[0_0_auto] items-start relative">
                  <div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#529e7e] text-base tracking-[0] leading-6">
                    No. of <br />
                    Containers
                  </div>
                </div>
              </div>

              <div className="flex w-[154px] items-start gap-2 relative self-stretch">
                <div className="flex flex-col gap-1 flex-1 grow items-start relative">
                  <div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#529e7e] text-base text-center tracking-[0] leading-6 whitespace-nowrap">
                    Description
                  </div>

                  <div className="flex px-4 py-2 self-stretch w-full rounded-[50px] border border-solid border-[#eeeeee] items-center gap-2.5 relative flex-[0_0_auto] bg-white">
                    <img
                      className="relative w-3 h-3"
                      alt="Group"
                      src="#"
                    />

                    <div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#1e2d2a] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
                      Search Product
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2 relative flex-1 self-stretch grow">
                <div className="flex flex-col gap-1 flex-1 grow items-start relative">
                  <div className="relative self-stretch mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#529e7e] text-base tracking-[0] leading-6">
                    Est. Freight Cost
                  </div>
                </div>
              </div>
            </div>

            {/* Shipment row */}
            <div className="flex h-[66px] gap-4 self-stretch w-full items-center relative">
              <div className="flex w-[100px] items-center gap-2 pl-0 pr-4 py-0 relative self-stretch">
                <div className="inline-flex flex-col gap-1 flex-[0_0_auto] items-start relative">
                  <div className="text-[#1e2d2a] text-center relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-base tracking-[0] leading-6 whitespace-nowrap">
                    11/30/2024
                  </div>
                </div>
              </div>

              <div className="flex w-[120px] items-center gap-2 pl-0 pr-4 py-0 relative self-stretch">
                <div className="inline-flex flex-col gap-2 flex-[0_0_auto] mr-[-6.00px] items-start relative">
                  <div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Bold',Helvetica] font-bold text-[#1e2d2a] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
                    BANQ1061815683H
                  </div>

                  <div className="relative w-fit [font-family:'Satoshi-Bold',Helvetica] font-bold text-[#1e2d2a] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
                    CMDUTHD1259241
                  </div>
                </div>
              </div>

              <div className="flex w-[190px] items-center gap-2 pl-0 pr-4 py-0 relative self-stretch">
                <div className="flex flex-col items-start gap-2 relative flex-1 grow">
                  <div className="relative self-stretch mt-[-1.00px] [font-family:'Satoshi-Bold',Helvetica] font-bold text-[#1e2d2a] text-xs tracking-[0] leading-[18px]">
                    Actmax Sdn Bhd
                  </div>
                </div>
              </div>

              <div className="flex w-20 items-center gap-2 pl-0 pr-4 py-0 relative self-stretch">
                <div className="inline-flex flex-col items-start gap-2 relative flex-[0_0_auto]">
                  <div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#1e2d2a] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
                    17,000 kg
                  </div>
                </div>
              </div>

              <div className="flex w-[100px] items-center gap-2 pl-0 pr-4 py-0 relative self-stretch">
                <div className="inline-flex flex-col items-start gap-2 relative flex-[0_0_auto]">
                  <div className="mt-[-1.00px] [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#1e2d2a] text-xs leading-[18px] whitespace-nowrap relative w-fit tracking-[0]">
                    5
                  </div>
                </div>
              </div>

              <div className="flex w-[154px] items-center gap-2 pl-0 pr-4 py-0 relative self-stretch">
                <div className="inline-flex flex-col items-start gap-2 relative flex-[0_0_auto]">
                  <div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#1e2d2a] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
                    Mechanical Stc
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pl-0 pr-4 py-0 relative flex-1 self-stretch grow">
                <div className="flex flex-col w-[82px] gap-2 mr-[-16.00px] items-start relative">
                  <div className="self-stretch [font-family:'Satoshi-Bold',Helvetica] font-bold text-[#1e2d2a] text-xs leading-[18px] relative mt-[-1.00px] tracking-[0]">
                    Asia&nbsp;&nbsp;US Transatlantic
                  </div>

                  <div className="relative self-stretch [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#3f7dcf] text-xs tracking-[0] leading-[18px]">
                    No Data
                  </div>
                </div>
              </div>
            </div>

            <img
              className="relative self-stretch w-full h-px object-cover"
              alt="Line"
              src="#"
            />

            {/* Additional shipment rows would go here */}
          </div>
        </div>
      </div>
    </div>
  );
};

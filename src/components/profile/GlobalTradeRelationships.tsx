import React from "react";

export const GlobalTradeRelationships: React.FC = () => {
  return (
    <div className="flex flex-col items-start justify-center gap-4 p-4 relative self-stretch w-full flex-[0_0_auto] rounded-2xl border border-solid border-[#e0e0e0]">
      <div className="flex items-center justify-center gap-4 relative self-stretch w-full flex-[0_0_auto]">
        <div className="flex flex-col items-start gap-4 relative flex-1 grow">
          <div className="flex items-center gap-1 relative self-stretch w-full flex-[0_0_auto]">
            <div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
              <p className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Bold',Helvetica] font-bold text-[#1e2d2a] text-xl tracking-[0] leading-[30px] whitespace-nowrap">
                Top 10 Global Trade Relationships
              </p>

              <div className="relative w-fit [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#1e2d2a] text-sm tracking-[0] leading-[21px] whitespace-nowrap">
                {" "}
                (Top 10)
              </div>
            </div>
          </div>

          <div className="inline-flex items-center relative flex-[0_0_auto] border-b-2 [border-bottom-style:solid] border-[#ced6d3]">
            <div className="inline-flex items-center justify-center gap-2 px-8 py-4 relative flex-[0_0_auto] border-b-2 [border-bottom-style:solid] border-[#529e7e]">
              <div className="relative w-fit mt-[-2.00px] [font-family:'Satoshi-Bold',Helvetica] font-bold text-[#529e7e] text-base tracking-[0] leading-[normal]">
                Graph view
              </div>
            </div>

            <div className="inline-flex items-center justify-center gap-2 px-8 py-4 relative flex-[0_0_auto]">
              <div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#5f726e] text-base tracking-[0] leading-[normal]">
                List view
              </div>
            </div>
          </div>

          <div className="relative w-[954px] h-[883px]">
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

            <div className="absolute w-[377px] h-[834px] top-[21px] left-[535px]">
              {/* Relationship details */}
            </div>

            <div className="absolute w-9 h-[742px] top-[98px] left-48">
              {/* Connection lines */}
            </div>

            <img
              className="absolute w-[38px] h-px top-[453px] left-[154px] object-cover"
              alt="Line"
              src="#"
            />
          </div>

          <div className="flex items-center justify-center relative self-stretch w-full flex-[0_0_auto]">
            <div className="inline-flex items-center justify-center gap-2 px-8 py-4 relative flex-[0_0_auto]">
              <div className="relative w-[163px] mt-[-1.00px] [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#004e66] text-base tracking-[0] leading-6">
                This company : Google
              </div>
            </div>

            <div className="inline-flex items-center justify-center gap-2 px-8 py-4 relative flex-[0_0_auto]">
              <div className="relative w-[108px] mt-[-1.00px] [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#004e66] text-base tracking-[0] leading-6">
                Its suppliers: 7
              </div>
            </div>

            <div className="inline-flex items-center justify-center gap-2 px-8 py-4 relative flex-[0_0_auto]">
              <p className="relative w-[284px] mt-[-1.00px] [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#004e66] text-base tracking-[0] leading-6">
                Other companies using the supplier : 23
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from "react";
import { Button } from "components/utils/Button";
import { useNavigate } from "react-router-dom";
import Icon from "components/utils/Icon";

export const CompanyHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-start justify-between px-4 py-6 sm:p-6 relative self-stretch w-full flex-[0_0_auto] border-b border-border">
      <div className="flex w-full items-center gap-3 sm:gap-6 relative">
        <div className="relative"
          onClick={() => navigate("/saved-manufacturers")}
        >
          <Icon icon="arrow-up" className="w-[18px] h-[18px] sm:w-6 sm:h-6 text-black -rotate-90" />
        </div>

        <div className="inline-flex items-center gap-2 sm:gap-4 relative flex-[0_0_auto]">
          <div className="inline-flex items-center gap-2 relative flex-[0_0_auto]">
            <div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Bold',Helvetica] font-bold text-[#1e2d2a] text-lg sm:text-2xl text-center tracking-[0] leading-[33.6px] whitespace-nowrap">
              Google
            </div>

            <img
              className="relative w-[23px] h-4 sm:w-[34.5px] sm:h-6"
              alt="Layer"
              src="assets/images/icon/flag-icon.svg"
            />
          </div>

          <div className="inline-flex items-center gap-2 relative flex-[0_0_auto]">
            <div className="inline-flex items-center justify-center gap-2.5 px-2 py-1 sm:px-3 sm:py-2 relative flex-[0_0_auto] bg-[#f7e4bf4c] rounded-[30px]">
              <div className="relative w-fit mt-[-0.50px] [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#754b07] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
                VIP
              </div>
            </div>

            <div className="inline-flex items-center justify-center gap-2.5 px-2 py-1 sm:px-3 sm:py-2 relative flex-[0_0_auto] bg-[#e6fdf4] rounded-[30px]">
              <div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#058650] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
                Verified
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="inline-flex items-center justify-center gap-2.5 px-9 py-3.5 relative flex-[0_0_auto] bg-[#529e7e] rounded-[50px] overflow-hidden"> */}
      <Button className="sm:text-base text-sm !px-6 !py-1.5 sm:!px-9 sm:!py-3 !font-medium">
        Send RFQ
      </Button>
      {/* </div> */}
    </div>
  );
};

import React from "react";

const companyTags = [
  { tag: "router", count: 108 },
  { tag: "rout", count: 108 },
  { tag: "route", count: 108 },
  { tag: "computer", count: 60 },
  { tag: "puter", count: 60 },
  { tag: "pute", count: 60 },
  { tag: "osta", count: 58 },
  { tag: "mosta", count: 57 },
  { tag: "most", count: 57 },
  { tag: "power supply", count: 50 },
  { tag: "power supp", count: 50 },
  { tag: "peat", count: 46 },
  { tag: "repeat", count: 46 },
  { tag: "repeater", count: 46 },
  { tag: "peate", count: 46 },
  { tag: "repe", count: 46 },
  { tag: "media", count: 45 },
  { tag: "reaming", count: 33 },
  { tag: "wire", count: 32 },
  { tag: "wireless", count: 32 },
  { tag: "bluet", count: 30 },
  { tag: "bluetooth", count: 30 },
  { tag: "blueto", count: 30 },
  { tag: "blueto", count: 30 },
  { tag: "luetooth", count: 30 },
  { tag: "bluetooth earphone", count: 30 },
  { tag: "bluetooth earp", count: 30 },
  { tag: "ca", count: 28 },
  { tag: "network", count: 20 },
  { tag: "networ", count: 20 },
  { tag: "nverter", count: 20 },
  { tag: "wood", count: 14 },
  { tag: "computer component", count: 13 },
  { tag: "computer co", count: 13 },
  { tag: "ikea", count: 9 },
  { tag: "profi", count: 7 },
  { tag: "profil", count: 7 },
  { tag: "profile", count: 7 },
  { tag: "wireless charger", count: 7 },
  { tag: "wireless charge", count: 7 },
  { tag: "less charge", count: 7 },
  { tag: "serve", count: 6 },
  { tag: "slap", count: 5 },
  { tag: "leco", count: 5 },
  { tag: "lecom", count: 5 },
  { tag: "server rack", count: 4 },
  { tag: "racks", count: 4 },
  { tag: "printed circuit", count: 3 },
  { tag: "printed circuit board", count: 3 },
];

export const CompanyTags: React.FC = () => {
  return (
    <div className="gap-2 px-6 py-4 bg-fgc dark:bg-fgcDark flex flex-col items-start relative self-stretch w-full flex-[0_0_auto] rounded-2xl">
      <div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
        <p className="relative w-fit mt-[-1.00px] [font-family:'Satoshi',Helvetica] font-medium text-text dark:text-textDark text-base sm:text-xl tracking-[0] leading-[30px] whitespace-nowrap">
          Company Tags &amp; Classification
        </p>
      </div>

      <div className="flex flex-wrap items-start gap-2.5 sm:gap-[12px_12px] relative self-stretch w-full flex-[0_0_auto]">
        {companyTags.map(({ tag, count }, index) => (
          <div
            key={index}
            className="inline-flex gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 flex-[0_0_auto] bg-fgc dark:bg-fgcDark rounded items-center relative cursor-pointer hover:bg-black/15"
          >
            <div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi',Helvetica] font-medium text-text dark:text-textDark text-sm sm:text-base tracking-[0] leading-6 whitespace-nowrap">
              {tag}
            </div>

            <div className="mt-[-1.00px] [font-family:'Satoshi',Helvetica] font-medium text-primary text-sm sm:text-base leading-6 whitespace-nowrap relative w-fit tracking-[0]">
              {count}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

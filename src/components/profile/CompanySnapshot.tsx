import Icon from "components/utils/Icon";
import React from "react";

export interface CompanySnapshotData {
  established: string;
  employees: string;
  phone: string;
  location: string;
  totalSeaShipments: string;
  avgTeuPerShipment: string;
  avgTeuPerMonth: string;
  estShippingSpend: string;
  mostRecentShipment: string;
  dbUpdated: string;
  locationMatches: string;
}

interface CompanySnapshotProps {
  data: CompanySnapshotData;
}

export const CompanySnapshot: React.FC<CompanySnapshotProps> = ({ data }) => {
  const companySnapshotItems = [
    {
      icon: "established",
      title: "Established:",
      key: data.established,
    },
    {
      icon: "employees",
      title: "Employees:",
      key: data.employees,
    },
    {
      icon: "phoneNumber",
      title: "Phone Number:",
      key: data.phone,
    },
    {
      icon: "location-1",
      title: "Location:",
      key: data.location,
    },
    {
      icon: "established",
      title: "Total Sea Shipments",
      key: data.totalSeaShipments,
    },
    {
      icon: "employees",
      title: "Avg. TEU per Shipment",
      key: data.avgTeuPerShipment,
    },
    {
      icon: "avgTeuPerMonth",
      title: "Avg. TEU per Month",
      key: data.avgTeuPerMonth,
    },
    {
      icon: "location-1",
      title: "Est. Shipping Spend",
      key: data.estShippingSpend,
    },
    {
      icon: "ship",
      title: "Most Recent Shipment",
      key: data.mostRecentShipment + " (Database Updated: " + data.dbUpdated + ")",
    },
    {
      icon: "ship",
      title: "Location matches found:",
      key: data.locationMatches,
    },
  ];

  return (
    <div className="justify-center gap-4 p-4 border border-solid border-[#e0e0e0] flex flex-col items-start relative self-stretch w-full flex-[0_0_auto] rounded-2xl">
      <div className="flex items-center gap-4 relative self-stretch w-full flex-[0_0_auto]">
        <div className="flex flex-col items-start gap-4 relative flex-1 grow">
          <div className="flex items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
            <div className="w-fit [font-family:'Satoshi-Bold',Helvetica] font-bold text-base md:text-xl leading-[30px] whitespace-nowrap relative mt-[-1.00px] text-[#1e2d2a] tracking-[0]">
              Company Snapshot
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] relative self-stretch w-full flex-[0_0_auto]">
            {companySnapshotItems.map((item, index) => (
              <div key={index} className="flex flex-col items-start justify-center gap-2 relative flex-1 grow">
                <div className="inline-flex items-start md:items-center gap-3 relative flex-[0_0_auto]">
                  <div className="relative w-4 h-4 sm:w-5 sm:h-5">
                    <Icon icon={item.icon} className="w-4 h-4 sm:w-5 sm:h-5 text-text dark:text-textDark" />
                  </div>
                  <div className="flex flex-col items-start justify-center gap-1 relative w-full">
                    <div className="whitespace-nowrap text-sm text-[#1e2d2a] font-normal [font-family:'Satoshi-Regular',Helvetica]">
                      {item.title}
                    </div>
                    <div className="[font-family:'Satoshi-Medium',Helvetica] font-medium text-[#1e2d2a] text-base md:text-lg leading-[30px] tracking-[0] break-words w-full">
                      {item.key}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
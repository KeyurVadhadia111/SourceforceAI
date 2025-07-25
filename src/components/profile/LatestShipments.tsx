import Icon from "components/utils/Icon";
import MultiSelectDropdown from "components/utils/MultiSelectDropdown";
import React, { useState } from "react";

const LatestShipmentsData = [
  {
    id: 1,
    date: "07/15/2025",
    billofLading: "MOLU1234567890H HLCUN1234567890",
    suppliers: "Foxconn Electronics Inc.",
    weight: "12,800 kg",
    noofContainers: 4,
    description: "Consumer Electronics",
    estFreightCost: "China → US West Coast"
  },
  {
    id: 2,
    date: "07/12/2025",
    billofLading: "OOLU9876543210H MAEU9988776655",
    suppliers: "Samsung Heavy Industries",
    weight: "23,000 kg",
    noofContainers: 6,
    description: "Industrial Machinery",
    estFreightCost: "Korea → US East Coast"
  },
  {
    id: 3,
    date: "07/09/2025",
    billofLading: "EMCU1122334455H NYK1230987654",
    suppliers: "LG Chem Ltd.",
    weight: "7,500 kg",
    noofContainers: 2,
    description: "Battery Components",
    estFreightCost: "Vietnam → US Gulf"
  },
  {
    id: 4,
    date: "07/07/2025",
    billofLading: "CMAU5566778899H COSCO8877665544",
    suppliers: "BYD Auto Co Ltd",
    weight: "19,300 kg",
    noofContainers: 5,
    description: "Electric Vehicle Parts",
    estFreightCost: "China → US Pacific"
  },
  {
    id: 5,
    date: "07/02/2025",
    billofLading: "ONEU2233445566H HMMU6655443322",
    suppliers: "Tata Steel Ltd",
    weight: "25,000 kg",
    noofContainers: 8,
    description: "Steel Coils",
    estFreightCost: "India → US Atlantic"
  },
  {
    id: 6,
    date: "06/28/2025",
    billofLading: "HLCU7788990011H MSCU9988776655",
    suppliers: "Nidec Corporation",
    weight: "14,650 kg",
    noofContainers: 3,
    description: "Motor Assemblies",
    estFreightCost: "Japan → US Gulf"
  },
];


export const LatestShipments: React.FC = () => {

  const allCountries = ["United States", "China", "Malaysia", "Thailand"]; // Example list of all possible countries
  const [selectedCountries, setSelectedCountries] = useState<string[]>(["United States", "China"]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTradePartners = LatestShipmentsData.filter(partner => {
    const matchesSearch = searchQuery === "" || partner.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCountry = selectedCountries.length === 0 || selectedCountries.some(country => partner.description.includes(country));
    return matchesSearch && matchesCountry;
  });

  return (
    <div className="flex flex-col items-start justify-center gap-4 p-3 sm:p-4 relative self-stretch w-full flex-[0_0_auto] rounded-2xl border border-solid border-[#e0e0e0]">
      <div className="flex items-center gap-4 relative self-stretch w-full flex-[0_0_auto]">
        <div className="flex flex-col items-start gap-4 relative flex-1 grow w-full">
          <div className="flex items-center gap-1 relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex flex-wrap items-center gap-1 relative">
              <p className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Bold',Helvetica] font-bold text-[#1e2d2a] text-base sm:text-xl tracking-[0] leading-[30px]">
                Latest Sea Freight Shipment Records
              </p>

              <div className="relative w-fit [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#1e2d2a] text-sm tracking-[0] leading-[21px] whitespace-nowrap">
                {" "}
                (Top 10)
              </div>
            </div>
          </div>
          <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse text-left min-w-[900px]">
              <thead>
                <tr className="border-b border-[#eeeeee]">
                  <th className="w-[116px] text-[#529e7e] text-base text-start font-medium pr-2">Date</th>
                  <th className="w-[136px] text-[#529e7e] text-base text-start font-medium pr-2">Bill of Lading</th>
                  <th className="w-[206px] pr-2">
                    <span className="text-[#529e7e] text-base text-start font-medium">Suppliers</span>
                    <MultiSelectDropdown
                      options={allCountries}
                      selectedOptions={selectedCountries}
                      onChange={setSelectedCountries}
                      placeholder="Select Countries"
                    />
                  </th>
                  <th className="w-[96px] text-[#529e7e] text-base text-start font-medium pr-2">Weight</th>
                  <th className="w-[116px] text-[#529e7e] text-base text-start font-medium pr-2">No. of<br />Containers</th>
                  <th className="w-[170px] pr-2">
                    <span className="text-[#529e7e] text-base text-start font-medium ">Description</span>
                    <div className="flex px-4 py-1.5 w-full rounded-[100px] border border-solid border-[#eeeeee] items-center gap-2.5 bg-white">
                      <Icon icon="search" className="w-4 h-4 text-textSecondary" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search Description"
                        className="w-full [font-family:'Satoshi-Regular',Helvetica] text-xs text-[#1e2d2a] bg-transparent border-none outline-none leading-[18px]"
                      />
                    </div>
                  </th>
                  <th className="w-[98px] text-[#529e7e] text-base font-medium pr-2">Est. Freight Cost</th>
                </tr>
              </thead>
              <tbody>
                {LatestShipmentsData.map((item) => (
                  <tr key={item.id} className="h-[66px] border-b border-[#eeeeee]">
                    <td className="text-[#1e2d2a] text-sm sm:text-base text-start font-medium pr-2">{item.date}</td>
                    <td className="text-[#1e2d2a] text-xs font-bold pr-2">
                      <div>{item.billofLading.split(" ")[0]}</div>
                      <div>{item.billofLading.split(" ")[1]}</div>
                    </td>
                    <td className="text-[#1e2d2a] text-xs font-bold pr-2">{item.suppliers}</td>
                    <td className="text-[#1e2d2a] text-xs font-normal pr-2">{item.weight}</td>
                    <td className="text-[#1e2d2a] text-xs font-normal pr-2">{item.noofContainers}</td>
                    <td className="text-[#1e2d2a] text-xs font-normal pr-2">{item.description}</td>
                    <td className="text-[#1e2d2a] text-xs font-bold pr-2">
                      <div>{item.estFreightCost}</div>
                      <div className="text-[#3f7dcf] font-medium">No Data</div>
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

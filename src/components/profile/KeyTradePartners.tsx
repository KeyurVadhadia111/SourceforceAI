import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { MultiSelectDropdown } from "../utils/MultiSelectDropdown";
import Icon from "components/utils/Icon";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type ViewType = 'shipments' | 'weight' | 'teu';

interface TradePartner {
  supplier: string;
  location: string;
  shipmentActivity: number[];
  weightActivity: number[];
  teuActivity: number[];
  totalShipments: number;
  totalWeight: number; // in KG
  totalTEU: number;
  productDescriptions: {
    name: string;
    color: string;
  }[];
  hsCode: string;
  description: string;
}

export const KeyTradePartners: React.FC = () => {
  const allCountries = ["United States", "China", "Malaysia", "Thailand"]; // Example list of all possible countries
  const [selectedCountries, setSelectedCountries] = useState<string[]>(["United States", "China"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentView, setCurrentView] = useState<ViewType>('shipments');

  // Sample data for the trade partners
  const tradePartnersData: TradePartner[] = [
    {
      supplier: "Actmax",
      location: "Malaysia",
      shipmentActivity: [10, 15, 20, 8, 12, 18],
      weightActivity: [1000, 1500, 2000, 800, 1200, 1800],
      teuActivity: [0.5, 0.7, 1.0, 0.4, 0.6, 0.9],
      totalShipments: 83,
      totalWeight: 17000,
      totalTEU: 5.2,
      productDescriptions: [
        { name: "Toys", color: "#0077cc" },
        { name: "Electric motors", color: "#f5b14c" },
        { name: "Essential oils", color: "#cb0a0e" },
        { name: "Toys", color: "#529e7e" }
      ],
      hsCode: "8471.70",
      description: "Hard Disc Drive"
    },
    {
      supplier: "Kuehne & Nagel Shanghai Branch",
      location: "Jiang'an, China",
      shipmentActivity: [5, 25, 10, 15, 20, 5],
      weightActivity: [500, 2500, 1000, 1500, 2000, 500],
      teuActivity: [0.2, 1.2, 0.5, 0.7, 1.0, 0.2],
      totalShipments: 80,
      totalWeight: 22500,
      totalTEU: 4.8,
      productDescriptions: [
        { name: "Toys", color: "#0077cc" },
        { name: "Electric motors", color: "#f5b14c" },
        { name: "Essential oils", color: "#cb0a0e" },
        { name: "Toys", color: "#529e7e" }
      ],
      hsCode: "8471.70",
      description: "Electronic Gds Ltl Fcl Nup Media Multiboxga Gxca"
    },
    {
      supplier: "Delta Electronics Jiangsu",
      location: "Thailand",
      shipmentActivity: [15, 10, 25, 20, 5, 15],
      weightActivity: [1500, 1000, 2500, 2000, 500, 1500],
      teuActivity: [0.8, 0.5, 1.3, 1.0, 0.3, 0.8],
      totalShipments: 90,
      totalWeight: 19800,
      totalTEU: 6.1,
      productDescriptions: [
        { name: "Toys", color: "#0077cc" },
        { name: "Electric motors", color: "#f5b14c" },
        { name: "Essential oils", color: "#cb0a0e" },
        { name: "Toys", color: "#529e7e" }
      ],
      hsCode: "8471.70",
      description: "Electronic Components Power Supply Pdu Telecom Power Lcat Full Detail,"
    },
    {
      supplier: "Seagate Technology Thailand",
      location: "China",
      shipmentActivity: [20, 15, 10, 25, 15, 5],
      weightActivity: [2000, 1500, 1000, 2500, 1500, 500],
      teuActivity: [1.0, 0.7, 0.5, 1.2, 0.7, 0.2],
      totalShipments: 90,
      totalWeight: 25000,
      totalTEU: 5.5,
      productDescriptions: [
        { name: "Toys", color: "#0077cc" },
        { name: "Electric motors", color: "#f5b14c" },
        { name: "Essential oils", "color": "#cb0a0e" },
        { name: "Toys", color: "#529e7e" }
      ],
      hsCode: "8471.70",
      description: "Hard Disc Drive"
    },
    {
      supplier: "Actmax",
      location: "Malaysia",
      shipmentActivity: [8, 12, 18, 10, 15, 20],
      weightActivity: [800, 1200, 1800, 1000, 1500, 2000],
      teuActivity: [0.4, 0.6, 0.9, 0.5, 0.7, 1.0],
      totalShipments: 83,
      totalWeight: 18500,
      totalTEU: 4.9,
      productDescriptions: [
        { name: "Toys", color: "#0077cc" },
        { name: "Electric motors", color: "#f5b14c" },
        { name: "Essential oils", color: "#cb0a0e" },
        { name: "Toys", color: "#529e7e" }
      ],
      hsCode: "8471.70",
      description: "Hard Disc Drive"
    }
  ];

  // Filter trade partners based on search query and selected countries
  const filteredTradePartners = tradePartnersData.filter(partner => {
    const matchesSearch = searchQuery === "" || partner.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCountry = selectedCountries.length === 0 || selectedCountries.some(country => partner.location.includes(country));
    return matchesSearch && matchesCountry;
  });

  // Render bar chart for shipment activity
  const renderBarChart = (data: number[], productColors: string[]) => {
    const labels = Array.from({ length: data.length }, (_, i) => `Period ${i + 1}`);
    const chartData = {
      labels: labels,
      datasets: [
        {
          label: currentView === 'shipments' ? "Shipments" : currentView === 'weight' ? "Weight (KG)" : "TEU",
          data: data,
          backgroundColor: productColors.length > 0 ? productColors : "#A9E5C5", // Use product colors or default
          borderColor: productColors.length > 0 ? productColors : "#529e7e",
          borderWidth: 1,
        },
      ],
    };

    const chartOptions: ChartOptions<"bar"> = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function (value) {
              if (typeof value === 'number') {
                return value;
              }
              return value;
            }
          },
          grid: {
            color: "rgba(0, 0, 0, 0.1)",
          },
        },
        x: {
          grid: {
            display: false, // Hide x-axis grid lines for cleaner look
          },
          ticks: {
            display: false, // Hide x-axis labels
          },
          categoryPercentage: 0.6, // Adjust this value to make bars thinner (e.g., 0.6 for 60% of available space)
          barPercentage: 0.8, // Adjust this value to make bars thinner (e.g., 0.8 for 80% of category space)
        },
      },
      plugins: {
        legend: {
          display: false, // Hide legend for individual bar charts
        },
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          titleColor: "#fff",
          bodyColor: "#fff",
          borderColor: "#529e7e",
          borderWidth: 1,
          padding: 10,
          displayColors: true,
          callbacks: {
            label: function (context) {
              let label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              if (context.parsed.y !== null) {
                label += new Intl.NumberFormat('en-US').format(context.parsed.y);
              }
              return label;
            }
          }
        },
      },
    };

    return (
      <div className="w-full h-full">
        <Bar data={chartData} options={chartOptions} />
      </div>
    );
  };

  return (
    <div className="flex flex-col items-start justify-center gap-4 p-3 sm:p-4 relative w-full rounded-2xl border border-solid border-[#e0e0e0] dark:border-borderDark">
      <div className="flex items-center gap-4 relative w-full">
        <div className="flex flex-col items-start gap-4 relative flex-1 grow w-full">
          <div className="flex items-start gap-1 relative w-full">
            <div className="inline-flex items-center gap-1 relative">
              <div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Bold',Helvetica] font-bold text-text dark:text-textDark text-base sm:text-xl tracking-[0] leading-[30px] ">
                Key Trade Partners
              </div>
              <div className="relative w-fit [font-family:'Satoshi-Regular',Helvetica] font-normal text-text dark:text-textDark text-xs sm:text-sm tracking-[0] leading-[21px] ">
                ({filteredTradePartners.length} Supplier Found)
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-4 px-3 py-3 sm:px-4 sm:py-6 relative w-full bg-fgc dark:bg-fgcDark rounded-2xl overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="border-b border-[#eeeeee]">
                  <th className="w-[218px] text-left align-top">
                    <div className="w-[218px] inline-flex flex-col items-start gap-2">
                      <div className="[font-family:'Satoshi-Bold',Helvetica] font-bold text-text dark:text-textDark text-sm sm:text-base leading-6">
                        Suppliers
                      </div>
                      <MultiSelectDropdown
                        options={allCountries}
                        selectedOptions={selectedCountries}
                        onChange={setSelectedCountries}
                        placeholder="Select Countries"
                      />
                    </div>
                  </th>

                  <th className="w-[218px] text-left align-top">
                    <div className="w-[218px] inline-flex flex-col items-start gap-1">
                      <div className="[font-family:'Satoshi-Bold',Helvetica] font-bold text-text dark:text-textDark text-sm sm:text-base leading-6">
                        Shipment Activity
                      </div>
                      <div className="inline-flex justify-center px-0 py-2 rounded-lg items-center gap-2.5 bg-fgc dark:bg-fgcDark">
                        <div className="text-[8px] sm:text-xs leading-[18px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-text dark:text-textDark">
                          24/06/2024 - 20/06/2025
                        </div>
                        <Icon icon="chevron-down" className="w-3 h-3 sm:w-4 sm:h-4 text-text dark:text-textDark" />
                      </div>
                    </div>
                  </th>

                  <th className="w-[260px] text-left align-top">
                    <div className="w-[260px] inline-flex flex-col items-start gap-1">
                      <div className="[font-family:'Satoshi-Bold',Helvetica] font-bold text-text dark:text-textDark text-sm sm:text-base leading-6">
                        {currentView === 'shipments' && "Total Shipments"}
                        {currentView === 'weight' && "Total Weight in KG"}
                        {currentView === 'teu' && "Total TEUs Shipped"}
                      </div>
                      <div className="flex items-center gap-2 flex-wrap max-w-[90%]">
                        <div className="flex gap-2.5">
                          <Icon icon="ship" className={`w-4 h-4 sm:w-5 sm:h-5 cursor-pointer text-[#0077CC] ${currentView === 'shipments' ? 'opacity-100' : 'opacity-50'}`}
                            onClick={() => setCurrentView('shipments')}
                          />
                          <Icon icon="shipments-1" className={`w-4 h-4 sm:w-5 sm:h-5 cursor-pointer text-[#529E7E] ${currentView === 'weight' ? 'opacity-100' : 'opacity-50'}`}
                            onClick={() => setCurrentView('weight')}
                          />
                          <Icon icon="shipments-2" className={`w-4 h-4 sm:w-5 sm:h-5 cursor-pointer text-[#F5B14C] ${currentView === 'teu' ? 'opacity-100' : 'opacity-50'}`}
                            onClick={() => setCurrentView('teu')}
                          />
                        </div>
                      </div>
                    </div>
                  </th>

                  <th className="w-[218px] text-left align-top">
                    <div className="flex flex-col gap-1 items-start">
                      <div className="[font-family:'Satoshi-Bold',Helvetica] font-bold text-text dark:text-textDark text-sm sm:text-base leading-6">
                        Product Descriptions
                      </div>
                      <div className="flex px-4 py-2 w-full rounded-[100px] border border-solid border-[#eeeeee] items-center gap-2.5 bg-fgc dark:bg-fgcDark">
                        <Icon icon="search" className="w-4 h-4 text-textSecondary" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search Description"
                          className="w-full [font-family:'Satoshi-Regular',Helvetica] text-xs text-text dark:text-textDark bg-transparent border-none outline-none leading-[18px]"
                        />
                      </div>
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredTradePartners.map((partner, index) => (
                  <React.Fragment key={`partner-${index}`}>
                    <tr className="h-[51px] sm:h-[66px] border-b border-border dark:border-borderDark">
                      <td className="w-[218px] pr-4">
                        <div className="inline-flex flex-col gap-1 items-start relative">
                          <div className="[font-family:'Satoshi-Medium',Helvetica] font-medium text-text dark:text-textDark text-sm sm:text-base tracking-[0] leading-6">
                            {partner.supplier}
                          </div>
                          <div className="[font-family:'Satoshi-Regular',Helvetica] font-normal text-text dark:text-textDark text-[10px] sm:text-xs leading-[18px] tracking-[0]">
                            {partner.location}
                          </div>
                        </div>
                      </td>

                      <td className="w-[218px] h-[51px] sm:h-[66px] pr-4">
                        <div className="w-[218px] h-[51px] sm:h-[66px] flex items-center">
                          {renderBarChart(
                            currentView === 'shipments' ? partner.shipmentActivity :
                              currentView === 'weight' ? partner.weightActivity :
                                partner.teuActivity,
                            partner.productDescriptions.map(p => p.color)
                          )}
                        </div>
                      </td>

                      <td className="w-[180px] pr-4">
                        <div className="w-[180px] inline-flex flex-col gap-2 px-0 py-2 bg-fgc dark:bg-fgcDark rounded-lg">
                          <div className="inline-flex items-center gap-3">
                            {partner.productDescriptions.slice(0, 2).map((product, pIndex) => (
                              <div key={`product-${index}-${pIndex}`} className="inline-flex gap-1.5 items-center">
                                <div className={`w-2 h-2 rounded`} style={{ backgroundColor: product.color }} />
                                <div className="[font-family:'Satoshi-Regular',Helvetica] font-normal text-text dark:text-textDark text-sm leading-[21px]">
                                  {product.name}
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="inline-flex items-center gap-3">
                            {partner.productDescriptions.slice(2, 4).map((product, pIndex) => (
                              <div key={`product-${index}-${pIndex + 2}`} className="inline-flex gap-1.5 items-center">
                                <div className={`w-2 h-2 rounded`} style={{ backgroundColor: product.color }} />
                                <div className="[font-family:'Satoshi-Regular',Helvetica] font-normal text-text dark:text-textDark text-sm leading-[21px]">
                                  {product.name}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="inline-flex flex-col gap-1 items-start">
                          <div className="[font-family:'Satoshi-Medium',Helvetica] font-medium text-text dark:text-textDark text-sm sm:text-base text-left tracking-[0] leading-6">
                            {currentView === 'shipments' && partner.totalShipments}
                            {currentView === 'weight' && `${partner.totalWeight.toLocaleString()}`}
                            {currentView === 'teu' && `${partner.totalTEU.toFixed(1)}`}
                          </div>
                          <div className="[font-family:'Satoshi-Regular',Helvetica] font-normal text-text dark:text-textDark text-xs text-left leading-[18px] tracking-[0]">
                            {currentView === 'shipments' && "shipments"}
                            {currentView === 'weight' && "kg"}
                            {currentView === 'teu' && "TEU"}
                          </div>
                        </div>
                      </td>

                      <td className="w-full flex-1 grow">
                        <div className="flex flex-col items-start gap-2 flex-1 grow">
                          <div className="[font-family:'Satoshi-Regular',Helvetica] font-normal text-text dark:text-textDark text-xs tracking-[0] leading-[18px]">
                            {partner.description}
                          </div>
                          <div className="[font-family:'Satoshi-Regular',Helvetica] font-normal text-text dark:text-textDark text-xs tracking-[0] leading-[18px]">
                            HS Codes: ({partner.hsCode})
                          </div>
                        </div>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </div>

  );
};

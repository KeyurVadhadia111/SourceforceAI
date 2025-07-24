import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement, // Changed from LineElement to BarElement
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import Icon from "components/utils/Icon";
import { useAppState } from "components/utils/useAppState";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement, // Changed from LineElement to BarElement
  Title,
  Tooltip,
  Legend
);

// Sample data for the chart
const testData = {
  "2024": [5000, 8000, 12000, 15000, 18000, 22000, 25000, 20000, 17000, 14000, 10000, 7000],
};

interface ShipmentTimelineProps {
  data?: Record<string, number[]>;
  startDate?: string;
  endDate?: string;
  timeRange?: string;
}

export const ShipmentTimeline: React.FC<ShipmentTimelineProps> = ({
  data = testData,
  startDate = "Jan 2024",
  endDate = "Dec 2024",
  timeRange = "Last 1 Year",
}) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState(timeRange);
  const [{ isDark }, setAppState] = useAppState();

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Prepare data for Chart.js
  const chartData = {
    labels: months,
    datasets: Object.entries(data).map(([year, values]) => ({
      label: year,
      data: values,
      backgroundColor: "#A9E5C5", // Bar color
      borderColor: "#529e7e",
      borderWidth: 1,
    })),
  };

  const chartOptions: ChartOptions<"bar"> = { // Changed to "bar" chart type
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            if (typeof value === 'number') {
              if (value >= 1000) {
                return value / 1000 + 'k';
              }
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
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          usePointStyle: true,
          boxWidth: 8,
        },
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
    <div className="flex flex-col items-start justify-center gap-4 p-3 sm:p-4 relative self-stretch w-full flex-[0_0_auto] rounded-2xl border border-solid border-[#e0e0e0]">
      <div className="flex items-center gap-4 relative self-stretch w-full flex-[0_0_auto]">
        <div className="flex flex-col items-start gap-4 relative flex-1 grow w-full">
          <div className="flex items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
            <div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Bold',Helvetica] font-bold text-[#1e2d2a] text-base sm:text-xl tracking-[0] leading-[30px]">
              Shipment Timeline: Sea Freight Volume Over Years
            </div>
          </div>

          <div className="flex flex-col h-[404px] items-start gap-3 p-3 sm:p-4 relative self-stretch w-full bg-white rounded-3xl">
            <div className="flex flex-wrap gap-2 items-start justify-between relative self-stretch w-full flex-[0_0_auto]">
              <div className="inline-flex flex-col items-start justify-center gap-3 relative flex-[0_0_auto]">
                <div className="inline-flex items-center gap-2.5 relative flex-[0_0_auto]">
                  <Icon icon={isDark ? "cube-dark" : "cube"} className="sm:w-5 sm:h-5 w-4 h-4 " />
                  <p className="relative w-fit [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#1e2d2a] text-[10px] sm:text-xs tracking-[0] leading-[18px]">
                    Showing data from {startDate} to {endDate}
                  </p>
                </div>
              </div>

              <div className="inline-flex items-center gap-4 relative flex-[0_0_auto]">
                <div className="inline-flex items-center justify-center gap-2.5 px-3 py-2 relative flex-[0_0_auto] bg-white rounded-[322px] border border-solid border-[#529e7e]">
                  <div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Medium',Helvetica] font-medium text-[#529e7e] text-[10px] sm:text-xs tracking-[0] leading-[18px]">
                    {selectedTimeRange}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start sm:p-2 relative flex-1 self-stretch w-full grow overflow-x-auto">
              <div className="h-[300px] w-[500px] sm:w-full">
                <Bar data={chartData} options={chartOptions} /> {/* Changed from Line to Bar */}
              </div>
            </div>

            {/* <div className="flex flex-wrap items-start justify-center gap-[0px_0px] relative self-stretch w-full flex-[0_0_auto]">
              <div className="inline-flex flex-wrap items-center justify-center gap-[0px_8px] px-2 py-0 relative flex-[0_0_auto]">
                {Object.keys(data).map((year) => (
                  <div key={year} className="inline-flex items-center gap-1 p-1 relative flex-[0_0_auto]">
                    <div className="relative w-4 h-4">
                      <div className="relative w-px h-px top-2 left-2">
                        <div className="relative w-2 h-2 -top-1 -left-1 bg-[#529e7e] border border-solid border-white" />
                      </div>
                    </div>

                    <div className="mt-[-1.00px] [font-family:'Satoshi-Regular',Helvetica] font-normal text-[#000000b2] text-xs leading-[normal] relative w-fit tracking-[0]">
                      {year}
                    </div>
                  </div>
                ))}
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

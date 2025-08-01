
import React, { useState, useMemo } from 'react';
import Select from '../utils/Select';
import svgPaths from '../utils/svg-5fnqb2af45';
import Icon from 'components/utils/Icon';
import { useAppState } from 'components/utils/useAppState';

// TypeScript interfaces for the data structure
interface ShipmentData {
  year: number;
  month: number;
  country: string;
  volume: number;
  value: number;
  weight: number; // in tons
  teu: number; // Twenty-foot Equivalent Unit
  seaShipment: number; // Sea freight volume
}

interface FilterState {
  fromMonth: number;
  fromYear: number;
  toMonth: number;
  toYear: number;
  country: string;
  period: 'Monthly' | 'By Months' | 'MoM' | 'QoQ' | 'Annually';
}

interface ChartDataPoint {
  label: string;
  value: number;
  period: string;
  subPeriod?: string;
  month?: number;
  year?: number;
  quarter?: number;
  weight: number;
  teu: number;
  seaShipment: number;
}

interface ShipmentTimelineProps {
  data?: ShipmentData[];
  className?: string;
  title?: string;
  countries?: string[];
}

// Comprehensive sample data from 2015 to 2025
const generateSampleData = (): ShipmentData[] => {
  const data: ShipmentData[] = [];
  const countries = ['China', 'USA', 'Germany', 'Japan', 'South Korea', 'India', 'Vietnam', 'Thailand'];
  const baseVolumes: Record<string, number> = {
    'China': 15000,
    'USA': 8000,
    'Germany': 6000,
    'Japan': 7000,
    'South Korea': 5000,
    'India': 4000,
    'Vietnam': 3000,
    'Thailand': 2500
  };

  for (let year = 2015; year <= 2025; year++) {
    countries.forEach(country => {
      for (let month = 1; month <= 12; month++) {
        // Create realistic seasonal variations and growth patterns
        const baseVolume = baseVolumes[country];
        const yearGrowth = Math.pow(1.05, year - 2015); // 5% annual growth
        const seasonalFactor = 1 + 0.3 * Math.sin((month - 1) * Math.PI / 6); // Seasonal variation
        const randomFactor = 0.7 + Math.random() * 0.6; // Random variation ±30%

        // COVID-19 impact for 2020-2021
        const covidImpact = (year === 2020 || year === 2021) ? 0.6 + Math.random() * 0.3 : 1;

        const volume = Math.round(baseVolume * yearGrowth * seasonalFactor * randomFactor * covidImpact);
        const value = volume * (15 + Math.random() * 10); // $15-25 per unit

        // Calculate related metrics based on volume
        const weight = Math.round(volume * (0.8 + Math.random() * 0.4)); // 0.8-1.2 tons per unit average
        const teu = Math.round(volume / (18 + Math.random() * 6)); // 18-24 units per TEU average
        const seaShipment = Math.round(volume * (0.75 + Math.random() * 0.2)); // 75-95% of volume goes by sea

        data.push({
          year,
          month,
          country,
          volume,
          value: Math.round(value),
          weight,
          teu,
          seaShipment
        });
      }
    });
  }

  return data;
};

const sampleData = generateSampleData();
const defaultCountries = ['All Countries', 'China', 'USA', 'Germany', 'Japan', 'South Korea', 'India', 'Vietnam', 'Thailand'];

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const quarterNames = ['Q1', 'Q2', 'Q3', 'Q4'];

// Define 12 distinct colors for months
const monthColors = [
  '#ff6b6b', // Jan - Red
  '#4ecdc4', // Feb - Teal
  '#45b7d1', // Mar - Blue
  '#96ceb4', // Apr - Light Green
  '#feca57', // May - Yellow
  '#ff9ff3', // Jun - Pink
  '#54a0ff', // Jul - Blue
  '#5f27cd', // Aug - Purple
  '#00d2d3', // Sep - Cyan
  '#ff9f43', // Oct - Orange
  '#1dd1a1', // Nov - Green
  '#f39c12'  // Dec - Gold
];

// Define colors for years in MoM view
const yearColors = [
  '#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6',
  '#1abc9c', '#e67e22', '#34495e', '#95a5a6', '#27ae60',
  '#8e44ad', '#16a085'
];

// Define colors for quarters in QoQ view
const quarterColors = [
  '#e74c3c', // Q1 - Red
  '#3498db', // Q2 - Blue
  '#2ecc71', // Q3 - Green
  '#f39c12'  // Q4 - Orange
];

const ShipmentTimeline: React.FC<ShipmentTimelineProps> = ({
  data = sampleData,
  className = '',
  title = 'Shipment Timeline: Sea Freight Volume Over Years',
  countries = defaultCountries
}) => {
  const [{ isDark }, setAppState] = useAppState();

  const [filters, setFilters] = useState<FilterState>({
    fromMonth: 1,
    fromYear: 2020,
    toMonth: 12,
    toYear: 2024,
    country: 'All Countries',
    period: 'Monthly'
  });

  // Get unique years from data
  const availableYears = useMemo(() => {
    const years = [...new Set(data.map(d => d.year))].sort();
    return years;
  }, [data]);

  // Filter data based on current filters
  const filteredData = useMemo(() => {
    return data.filter(item => {
      const dateMatch = (item.year > filters.fromYear ||
        (item.year === filters.fromYear && item.month >= filters.fromMonth)) &&
        (item.year < filters.toYear ||
          (item.year === filters.toYear && item.month <= filters.toMonth));

      const countryMatch = filters.country === 'All Countries' || item.country === filters.country;

      return dateMatch && countryMatch;
    });
  }, [data, filters]);

  // Get unique years from filtered data for MoM view
  const filteredYears = useMemo(() => {
    const years = [...new Set(filteredData.map(d => d.year))].sort();
    return years;
  }, [filteredData]);

  // Process data based on selected period
  const chartData = useMemo(() => {
    const processedData: ChartDataPoint[] = [];

    switch (filters.period) {
      case 'Monthly':
        // Group by year, show months as bars
        const yearGroups = filteredData.reduce((acc, item) => {
          if (!acc[item.year]) acc[item.year] = {};
          if (!acc[item.year][item.month]) {
            acc[item.year][item.month] = {
              volume: 0,
              weight: 0,
              teu: 0,
              seaShipment: 0
            };
          }
          acc[item.year][item.month].volume += item.volume;
          acc[item.year][item.month].weight += item.weight;
          acc[item.year][item.month].teu += item.teu;
          acc[item.year][item.month].seaShipment += item.seaShipment;
          return acc;
        }, {} as Record<number, Record<number, { volume: number; weight: number; teu: number; seaShipment: number }>>);

        Object.entries(yearGroups).forEach(([year, months]) => {
          for (let month = 1; month <= 12; month++) {
            const monthData = months[month] || { volume: 0, weight: 0, teu: 0, seaShipment: 0 };
            processedData.push({
              label: monthNames[month - 1],
              value: monthData.volume,
              period: year,
              subPeriod: monthNames[month - 1],
              month: month,
              year: parseInt(year),
              weight: monthData.weight,
              teu: monthData.teu,
              seaShipment: monthData.seaShipment
            });
          }
        });
        break;

      case 'MoM':
        // Month over Month - show months on X-axis, years as bars for each month
        const momGroups = filteredData.reduce((acc, item) => {
          if (!acc[item.month]) acc[item.month] = {};
          if (!acc[item.month][item.year]) {
            acc[item.month][item.year] = {
              volume: 0,
              weight: 0,
              teu: 0,
              seaShipment: 0
            };
          }
          acc[item.month][item.year].volume += item.volume;
          acc[item.month][item.year].weight += item.weight;
          acc[item.month][item.year].teu += item.teu;
          acc[item.month][item.year].seaShipment += item.seaShipment;
          return acc;
        }, {} as Record<number, Record<number, { volume: number; weight: number; teu: number; seaShipment: number }>>);

        // Process each month
        for (let month = 1; month <= 12; month++) {
          if (momGroups[month]) {
            Object.entries(momGroups[month]).forEach(([year, data]) => {
              processedData.push({
                label: year,
                value: data.volume,
                period: monthNames[month - 1],
                subPeriod: year,
                month: month,
                year: parseInt(year),
                weight: data.weight,
                teu: data.teu,
                seaShipment: data.seaShipment
              });
            });
          }
        }
        break;

      case 'QoQ':
        // Quarter over Quarter - show years on X-axis, quarters as bars for each year
        const qoqGroups = filteredData.reduce((acc, item) => {
          const quarter = Math.ceil(item.month / 3);
          if (!acc[item.year]) acc[item.year] = {};
          if (!acc[item.year][quarter]) {
            acc[item.year][quarter] = {
              volume: 0,
              weight: 0,
              teu: 0,
              seaShipment: 0
            };
          }
          acc[item.year][quarter].volume += item.volume;
          acc[item.year][quarter].weight += item.weight;
          acc[item.year][quarter].teu += item.teu;
          acc[item.year][quarter].seaShipment += item.seaShipment;
          return acc;
        }, {} as Record<number, Record<number, { volume: number; weight: number; teu: number; seaShipment: number }>>);

        Object.entries(qoqGroups).forEach(([year, quarters]) => {
          for (let quarter = 1; quarter <= 4; quarter++) {
            const quarterData = quarters[quarter] || { volume: 0, weight: 0, teu: 0, seaShipment: 0 };
            processedData.push({
              label: quarterNames[quarter - 1],
              value: quarterData.volume,
              period: year,
              subPeriod: quarterNames[quarter - 1],
              quarter: quarter,
              year: parseInt(year),
              weight: quarterData.weight,
              teu: quarterData.teu,
              seaShipment: quarterData.seaShipment
            });
          }
        });
        break;

      case 'By Months':
        // Group by month across all years
        const monthGroups = filteredData.reduce((acc, item) => {
          if (!acc[item.month]) {
            acc[item.month] = {
              volume: 0,
              weight: 0,
              teu: 0,
              seaShipment: 0
            };
          }
          acc[item.month].volume += item.volume;
          acc[item.month].weight += item.weight;
          acc[item.month].teu += item.teu;
          acc[item.month].seaShipment += item.seaShipment;
          return acc;
        }, {} as Record<number, { volume: number; weight: number; teu: number; seaShipment: number }>);

        for (let month = 1; month <= 12; month++) {
          const monthData = monthGroups[month] || { volume: 0, weight: 0, teu: 0, seaShipment: 0 };
          processedData.push({
            label: monthNames[month - 1],
            value: monthData.volume,
            period: 'All Years',
            month: month,
            weight: monthData.weight,
            teu: monthData.teu,
            seaShipment: monthData.seaShipment
          });
        }
        break;

      case 'Annually':
        // Group by year
        const yearlyGroups = filteredData.reduce((acc, item) => {
          if (!acc[item.year]) {
            acc[item.year] = {
              volume: 0,
              weight: 0,
              teu: 0,
              seaShipment: 0
            };
          }
          acc[item.year].volume += item.volume;
          acc[item.year].weight += item.weight;
          acc[item.year].teu += item.teu;
          acc[item.year].seaShipment += item.seaShipment;
          return acc;
        }, {} as Record<number, { volume: number; weight: number; teu: number; seaShipment: number }>);

        Object.entries(yearlyGroups).forEach(([year, data]) => {
          processedData.push({
            label: year,
            value: data.volume,
            period: 'Annual',
            year: parseInt(year),
            weight: data.weight,
            teu: data.teu,
            seaShipment: data.seaShipment
          });
        });
        break;
    }

    return processedData;
  }, [filteredData, filters.period]);

  // Calculate chart dimensions and scaling
  const maxValue = Math.max(...chartData.map(d => d.value), 1);
  const minValue = Math.min(...chartData.map(d => d.value), 0);

  const yAxisLabels = useMemo(() => {
    return [
      Math.round(maxValue),
      Math.round(maxValue * 0.8),
      Math.round(maxValue * 0.6),
      Math.round(maxValue * 0.4),
      Math.round(maxValue * 0.2),
      0
    ].map(val => {
      if (val >= 1000000) return `${Math.round(val / 1000000)}M`;
      if (val >= 1000) return `${Math.round(val / 1000)}k`;
      return val.toString();
    });
  }, [maxValue]);

  // Helper function to format numbers
  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${Math.round(num / 1000)}k`;
    return num.toLocaleString();
  };

  // Helper function to create detailed tooltip
  const createTooltip = (point: ChartDataPoint, periodLabel?: string): string => {
    const period = periodLabel || `${point.label}${point.year ? ` ${point.year}` : ''}`;
    return `${period}
Total Volume: ${formatNumber(point.value)} units
Sea Shipment: ${formatNumber(point.seaShipment)} units
Weight: ${formatNumber(point.weight)} tons
TEU: ${formatNumber(point.teu)} containers`;
  };

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const getDateRangeText = () => {
    const fromDate = `${monthNames[filters.fromMonth - 1]} ${filters.fromYear}`;
    const toDate = `${monthNames[filters.toMonth - 1]} ${filters.toYear}`;
    return `Showing data from ${fromDate} to ${toDate}`;
  };

  const getTotalVolume = () => {
    const total = filteredData.reduce((sum, item) => sum + item.volume, 0);
    return formatNumber(total);
  };

  const getBarColor = (point: ChartDataPoint) => {
    if (filters.period === 'Monthly' && point.month) {
      return monthColors[point.month - 1];
    }
    if (filters.period === 'QoQ' && point.quarter) {
      return quarterColors[point.quarter - 1];
    }
    if (filters.period === 'MoM' && point.year) {
      const yearIndex = filteredYears.indexOf(point.year);
      return yearIndex >= 0 ? yearColors[yearIndex % yearColors.length] : '#a9e5c5';
    }
    return '#a9e5c5'; // Default color for other views
  };

  const renderFilters = () => (
    <div className="flex flex-wrap gap-4 items-start sm:items-center mb-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
        <label className="text-sm font-medium text-text dark:text-textDark">From:</label>
        <select
          value={filters.fromMonth}
          onChange={(e: any) => setFilters(prev => ({ ...prev, fromMonth: parseInt(e.target.value) }))}
          className="px-3 py-1 border border-gray-300 rounded-md text-sm text-text dark:text-textDark bg-fgc dark:bg-fgcDark"
        >
          {monthNames.map(month => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>

        <select
          value={filters.fromYear}
          onChange={(e) => handleFilterChange('fromYear', parseInt(e.target.value))}
          className="px-3 py-1 border border-gray-300 rounded-md text-sm text-text dark:text-textDark bg-fgc dark:bg-fgcDark"
        >
          {availableYears.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
        <label className="text-sm font-medium text-text dark:text-textDark">To:</label>
        <select
          value={filters.toMonth}
          onChange={(e) => handleFilterChange('toMonth', parseInt(e.target.value))}
          className="px-3 py-1 border border-gray-300 rounded-md text-sm text-text dark:text-textDark bg-fgc dark:bg-fgcDark"
        >
          {monthNames.map(month => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
        <select
          value={filters.toYear}
          onChange={(e) => handleFilterChange('toYear', parseInt(e.target.value))}
          className="px-3 py-1 border border-gray-300 rounded-md text-sm text-text dark:text-textDark bg-fgc dark:bg-fgcDark"
        >
          {availableYears.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
        <label className="text-sm font-medium text-text dark:text-textDark">Country:</label>
        <select
          value={filters.country}
          onChange={(e) => handleFilterChange('country', e.target.value as FilterState['country'])}
          className="px-3 py-1 border border-gray-300 rounded-md text-sm text-text dark:text-textDark bg-fgc dark:bg-fgcDark"
        >
          {countries.map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
        <label className="text-sm font-medium text-text dark:text-textDark">Period:</label>
        <select
          value={filters.period}
          onChange={(e) => handleFilterChange('period', e.target.value as FilterState['period'])}
          className="px-3 py-1 border border-gray-300 rounded-md text-sm text-text dark:text-textDark bg-fgc dark:bg-fgcDark"
        >
          <option value="Monthly">Monthly Trend</option>
          <option value="By Months">Month Breakdown</option>
          <option value="MoM">Monthly Delta</option>
          <option value="QoQ">Quarterly Change</option>
          <option value="Annually">Year-on-Year</option>
        </select>
      </div>
    </div>
  );

  const renderBarChart = () => {
    const chartWidth = 850;
    const chartHeight = 280;
    const padding = { top: 20, right: 20, bottom: 40, left: 50 };

    // Helper function to safely calculate coordinates
    const safeCoordinate = (value: number, fallback: number = 0): number => {
      return isFinite(value) ? value : fallback;
    };

    // Filter valid data
    const validData = chartData.filter(point => isFinite(point.value));

    if (validData.length === 0) {
      return <div className="flex items-center justify-center h-[320px] text-text dark:text-textDark">No data available</div>;
    }

    if (filters.period === 'Monthly') {
      // Group data by year for Monthly view (existing logic)
      const yearGroups: Record<string, ChartDataPoint[]> = {};

      validData.forEach(point => {
        if (point.year && point.month) {
          const yearKey = point.year.toString();
          if (!yearGroups[yearKey]) yearGroups[yearKey] = [];
          yearGroups[yearKey].push(point);
        }
      });

      const sortedYears = Object.keys(yearGroups).sort();
      Object.keys(yearGroups).forEach(year => {
        yearGroups[year].sort((a, b) => (a.month || 0) - (b.month || 0));
      });

      if (sortedYears.length === 0) {
        return <div className="flex items-center justify-center h-[320px] text-text dark:text-textDark">No data available</div>;
      }

      const totalBars = sortedYears.length * 12;
      const availableWidth = chartWidth - padding.left - padding.right;
      const yearWidth = availableWidth / sortedYears.length;
      const barWidth = Math.max(2, Math.min(8, (yearWidth - 10) / 12));
      const yearSpacing = yearWidth;

      const valueRange = maxValue - minValue;
      const availableHeight = chartHeight - padding.top - padding.bottom;

      const getBarHeight = (value: number) => {
        if (valueRange === 0) return 0;
        return safeCoordinate((value / maxValue) * availableHeight, 0);
      };

      return (
        <div className="relative w-full sm:h-[320px]">
          <svg width="100%" height="100%" viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
            {/* Grid lines */}
            {yAxisLabels.map((_, index) => (
              <line
                key={index}
                x1={padding.left}
                y1={padding.top + (index * availableHeight) / (yAxisLabels.length - 1)}
                x2={chartWidth - padding.right}
                y2={padding.top + (index * availableHeight) / (yAxisLabels.length - 1)}
                stroke="#e5e7eb"
                strokeWidth="1"
              />
            ))}

            {/* Y-axis labels */}
            {yAxisLabels.map((label, index) => (
              <text
                key={index}
                x={padding.left - 10}
                y={padding.top + (index * availableHeight) / (yAxisLabels.length - 1) + 5}
                textAnchor="end"
                fontSize="12"
                fill="#6b7280"
              >
                {label}
              </text>
            ))}

            {/* X-axis labels (Years) */}
            {sortedYears.map((year, yearIndex) => (
              <text
                key={year}
                x={padding.left + yearIndex * yearSpacing + yearSpacing / 2}
                y={chartHeight - padding.bottom + 20}
                textAnchor="middle"
                fontSize="12"
                fill="#6b7280"
              >
                {year}
              </text>
            ))}

            {/* Bars */}
            {sortedYears.map((year, yearIndex) => {
              const yearData = yearGroups[year] || [];
              return (
                <g key={year}>
                  {Array.from({ length: 12 }, (_, monthIndex) => {
                    const month = monthIndex + 1;
                    const dataPoint = yearData.find(d => d.month === month);
                    const value = dataPoint?.value || 0;
                    const barHeight = getBarHeight(value);

                    const x = padding.left + yearIndex * yearSpacing + monthIndex * (barWidth + 1) + 5;
                    const y = chartHeight - padding.bottom - barHeight;

                    return (
                      <rect
                        key={`${year}-${month}`}
                        x={safeCoordinate(x, padding.left)}
                        y={safeCoordinate(y, chartHeight - padding.bottom)}
                        width={barWidth}
                        height={safeCoordinate(barHeight, 0)}
                        fill={monthColors[monthIndex]}
                        className="cursor-pointer hover:opacity-80"
                      >
                        <title>{dataPoint ? createTooltip(dataPoint, `${monthNames[monthIndex]} ${year}`) : `${monthNames[monthIndex]} ${year}: No data`}</title>
                      </rect>
                    );
                  })}
                </g>
              );
            })}
          </svg>
        </div>
      );
    }

    if (filters.period === 'QoQ') {
      // Group data by year for QoQ view (years on X-axis, quarters as bars)
      const yearGroups: Record<string, ChartDataPoint[]> = {};

      validData.forEach(point => {
        if (point.year && point.quarter) {
          const yearKey = point.year.toString();
          if (!yearGroups[yearKey]) yearGroups[yearKey] = [];
          yearGroups[yearKey].push(point);
        }
      });

      const sortedYears = Object.keys(yearGroups).sort();
      Object.keys(yearGroups).forEach(year => {
        yearGroups[year].sort((a, b) => (a.quarter || 0) - (b.quarter || 0));
      });

      if (sortedYears.length === 0) {
        return <div className="flex items-center justify-center h-[320px] text-text dark:text-textDark">No data available</div>;
      }

      const availableWidth = chartWidth - padding.left - padding.right;
      const yearWidth = availableWidth / sortedYears.length;
      const barWidth = Math.max(4, Math.min(15, (yearWidth - 10) / 4));
      const yearSpacing = yearWidth;

      const valueRange = maxValue - minValue;
      const availableHeight = chartHeight - padding.top - padding.bottom;

      const getBarHeight = (value: number) => {
        if (valueRange === 0) return 0;
        return safeCoordinate((value / maxValue) * availableHeight, 0);
      };

      return (
        <div className="relative w-full h-[320px]">
          <svg width="100%" height="100%" viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
            {/* Grid lines */}
            {yAxisLabels.map((_, index) => (
              <line
                key={index}
                x1={padding.left}
                y1={padding.top + (index * availableHeight) / (yAxisLabels.length - 1)}
                x2={chartWidth - padding.right}
                y2={padding.top + (index * availableHeight) / (yAxisLabels.length - 1)}
                stroke="#e5e7eb"
                strokeWidth="1"
              />
            ))}

            {/* Y-axis labels */}
            {yAxisLabels.map((label, index) => (
              <text
                key={index}
                x={padding.left - 10}
                y={padding.top + (index * availableHeight) / (yAxisLabels.length - 1) + 5}
                textAnchor="end"
                fontSize="12"
                fill="#6b7280"
              >
                {label}
              </text>
            ))}

            {/* X-axis labels (Years) */}
            {sortedYears.map((year, yearIndex) => (
              <text
                key={year}
                x={padding.left + yearIndex * yearSpacing + yearSpacing / 2}
                y={chartHeight - padding.bottom + 20}
                textAnchor="middle"
                fontSize="12"
                fill="#6b7280"
              >
                {year}
              </text>
            ))}

            {/* Bars */}
            {sortedYears.map((year, yearIndex) => {
              const yearData = yearGroups[year] || [];
              return (
                <g key={year}>
                  {Array.from({ length: 4 }, (_, quarterIndex) => {
                    const quarter = quarterIndex + 1;
                    const dataPoint = yearData.find(d => d.quarter === quarter);
                    const value = dataPoint?.value || 0;
                    const barHeight = getBarHeight(value);

                    const x = padding.left + yearIndex * yearSpacing + quarterIndex * (barWidth + 2) + (yearSpacing - 4 * (barWidth + 2)) / 2;
                    const y = chartHeight - padding.bottom - barHeight;

                    return (
                      <rect
                        key={`${year}-Q${quarter}`}
                        x={safeCoordinate(x, padding.left)}
                        y={safeCoordinate(y, chartHeight - padding.bottom)}
                        width={barWidth}
                        height={safeCoordinate(barHeight, 0)}
                        fill={quarterColors[quarterIndex]}
                        className="cursor-pointer hover:opacity-80"
                      >
                        <title>{dataPoint ? createTooltip(dataPoint, `Q${quarter} ${year}`) : `Q${quarter} ${year}: No data`}</title>
                      </rect>
                    );
                  })}
                </g>
              );
            })}
          </svg>
        </div>
      );
    }

    if (filters.period === 'MoM') {
      // Group data by month for MoM view (months on X-axis, years as bars)
      const monthGroups: Record<string, ChartDataPoint[]> = {};

      validData.forEach(point => {
        if (point.month && point.year) {
          const monthKey = monthNames[point.month - 1];
          if (!monthGroups[monthKey]) monthGroups[monthKey] = [];
          monthGroups[monthKey].push(point);
        }
      });

      // Sort data within each month by year
      Object.keys(monthGroups).forEach(month => {
        monthGroups[month].sort((a, b) => (a.year || 0) - (b.year || 0));
      });

      const availableWidth = chartWidth - padding.left - padding.right;
      const monthWidth = availableWidth / 12;
      const maxBarsPerMonth = Math.max(...Object.values(monthGroups).map(group => group.length));
      const barWidth = Math.max(3, Math.min(10, (monthWidth - 10) / maxBarsPerMonth));

      const valueRange = maxValue - minValue;
      const availableHeight = chartHeight - padding.top - padding.bottom;

      const getBarHeight = (value: number) => {
        if (valueRange === 0) return 0;
        return safeCoordinate((value / maxValue) * availableHeight, 0);
      };

      return (
        <div className="relative w-full h-[320px]">
          <svg width="100%" height="100%" viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
            {/* Grid lines */}
            {yAxisLabels.map((_, index) => (
              <line
                key={index}
                x1={padding.left}
                y1={padding.top + (index * availableHeight) / (yAxisLabels.length - 1)}
                x2={chartWidth - padding.right}
                y2={padding.top + (index * availableHeight) / (yAxisLabels.length - 1)}
                stroke="#e5e7eb"
                strokeWidth="1"
              />
            ))}

            {/* Y-axis labels */}
            {yAxisLabels.map((label, index) => (
              <text
                key={index}
                x={padding.left - 10}
                y={padding.top + (index * availableHeight) / (yAxisLabels.length - 1) + 5}
                textAnchor="end"
                fontSize="12"
                fill="#6b7280"
              >
                {label}
              </text>
            ))}

            {/* X-axis labels (Months) */}
            {monthNames.map((month, monthIndex) => (
              <text
                key={month}
                x={padding.left + monthIndex * monthWidth + monthWidth / 2}
                y={chartHeight - padding.bottom + 20}
                textAnchor="middle"
                fontSize="12"
                fill="#6b7280"
              >
                {month}
              </text>
            ))}

            {/* Bars */}
            {monthNames.map((month, monthIndex) => {
              const monthData = monthGroups[month] || [];
              return (
                <g key={month}>
                  {monthData.map((dataPoint, barIndex) => {
                    const value = dataPoint.value || 0;
                    const barHeight = getBarHeight(value);

                    const x = padding.left + monthIndex * monthWidth + barIndex * (barWidth + 1) + (monthWidth - monthData.length * (barWidth + 1)) / 2;
                    const y = chartHeight - padding.bottom - barHeight;

                    return (
                      <rect
                        key={`${month}-${dataPoint.year}`}
                        x={safeCoordinate(x, padding.left)}
                        y={safeCoordinate(y, chartHeight - padding.bottom)}
                        width={barWidth}
                        height={safeCoordinate(barHeight, 0)}
                        fill={getBarColor(dataPoint)}
                        className="cursor-pointer hover:opacity-80"
                      >
                        <title>{createTooltip(dataPoint, `${month} ${dataPoint.year}`)}</title>
                      </rect>
                    );
                  })}
                </g>
              );
            })}
          </svg>
        </div>
      );
    }

    // Single bars for other views (existing logic)
    const sortedData = [...validData].sort((a, b) => {
      if (filters.period === 'By Months') {
        return (a.month || 0) - (b.month || 0);
      }
      return (a.year || 0) - (b.year || 0);
    });

    const availableWidth = chartWidth - padding.left - padding.right;
    const availableHeight = chartHeight - padding.top - padding.bottom;
    const barWidth = Math.max(8, availableWidth / sortedData.length - 4);
    const valueRange = maxValue - minValue;

    const getBarHeight = (value: number) => {
      if (valueRange === 0) return 0;
      return safeCoordinate((value / maxValue) * availableHeight, 0);
    };

    const getBarX = (index: number) => {
      return safeCoordinate(
        padding.left + index * (availableWidth / sortedData.length) + (availableWidth / sortedData.length - barWidth) / 2,
        padding.left
      );
    };

    return (
      <div className="relative w-full h-[320px]">
        <svg width="100%" height="100%" viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
          {/* Grid lines */}
          {yAxisLabels.map((_, index) => (
            <line
              key={index}
              x1={padding.left}
              y1={padding.top + (index * availableHeight) / (yAxisLabels.length - 1)}
              x2={chartWidth - padding.right}
              y2={padding.top + (index * availableHeight) / (yAxisLabels.length - 1)}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          ))}

          {/* Y-axis labels */}
          {yAxisLabels.map((label, index) => (
            <text
              key={index}
              x={padding.left - 10}
              y={padding.top + (index * availableHeight) / (yAxisLabels.length - 1) + 5}
              textAnchor="end"
              fontSize="12"
              fill="#6b7280"
            >
              {label}
            </text>
          ))}

          {/* X-axis labels */}
          {sortedData.map((point, index) => {
            if (sortedData.length <= 12 || index % Math.ceil(sortedData.length / 8) === 0) {
              return (
                <text
                  key={index}
                  x={getBarX(index) + barWidth / 2}
                  y={chartHeight - padding.bottom + 20}
                  textAnchor="middle"
                  fontSize="12"
                  fill="#6b7280"
                >
                  {point.label}
                </text>
              );
            }
            return null;
          })}

          {/* Bars */}
          {sortedData.map((point, index) => {
            const barHeight = getBarHeight(point.value);
            const x = getBarX(index);
            const y = chartHeight - padding.bottom - barHeight;

            return (
              <rect
                key={index}
                x={x}
                y={safeCoordinate(y, chartHeight - padding.bottom)}
                width={barWidth}
                height={safeCoordinate(barHeight, 0)}
                fill={getBarColor(point)}
                className="cursor-pointer hover:opacity-80"
              >
                <title>{createTooltip(point)}</title>
              </rect>
            );
          })}
        </svg>
      </div>
    );
  };

  const renderLegend = () => {
    if (filters.period === 'Monthly') {
      return (
        <div className="flex flex-wrap gap-3 justify-center items-center mt-2">
          {monthNames.map((month, index) => (
            <div key={month} className="flex items-center gap-1">
              <div
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: monthColors[index] }}
              />
              <span className="text-xs text-gray-600">{month}</span>
            </div>
          ))}
        </div>
      );
    }

    if (filters.period === 'QoQ') {
      return (
        <div className="flex flex-wrap gap-3 justify-center items-center mt-2">
          {quarterNames.map((quarter, index) => (
            <div key={quarter} className="flex items-center gap-1">
              <div
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: quarterColors[index] }}
              />
              <span className="text-xs text-gray-600">{quarter}</span>
            </div>
          ))}
        </div>
      );
    }

    if (filters.period === 'MoM') {
      return (
        <div className="flex flex-wrap gap-3 justify-center items-center mt-2">
          {filteredYears.map((year, index) => (
            <div key={year} className="flex items-center gap-1">
              <div
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: yearColors[index % yearColors.length] }}
              />
              <span className="text-xs text-gray-600">{year}</span>
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <div className={`relative rounded-2xl ${className}`}>
      <div className="absolute border border-[#e0e0e0] dark:border-borderDark border-solid inset-0 pointer-events-none rounded-2xl" />
      <div className="flex flex-col justify-center relative">
        <div className="box-border content-stretch flex flex-col gap-4 items-start justify-center p-[16px] relative">

          {/* Header */}
          <div className="flex items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
            <div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Bold',Helvetica] font-bold text-text dark:text-textDark text-base sm:text-xl tracking-[0] leading-[30px]">
              Shipment Timeline: Sea Freight Volume Over Years
            </div>
          </div>

          {/* Filters */}
          {renderFilters()}

          {/* Info section */}
          <div className="box-border content-stretch flex flex-wrap gap-1 items-start justify-between p-0 relative shrink-0 w-full">
            <div className="box-border content-stretch flex flex-wrap gap-2.5 items-center justify-start p-0 relative">
              <Icon icon={isDark ? "cube-dark" : "cube"} className="sm:w-5 sm:h-5 w-4 h-4 " />

              <div className="font-['Satoshi:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-text dark:text-textDark text-[12px] text-left">
                <p className="block leading-[1.5] whitespace-pre">{getDateRangeText()}</p>
              </div>
              <div className="font-['Satoshi:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-text dark:text-textDark text-[12px] text-left">
                <p className="block leading-[1.5] whitespace-pre">Total: {getTotalVolume()} units</p>
              </div>
            </div>

            <div className="bg-fgc dark:bg-fgcDark box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-3 py-2 relative rounded-[322px] shrink-0">
              <div className="absolute border border-primary dark:border-borderDark border-solid inset-0 pointer-events-none rounded-[322px]" />
              <div className="font-['Satoshi:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#529e7e] text-[12px] text-left text-nowrap">
                <p className="block leading-[1.5] whitespace-pre">{filters.period} View</p>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-fgc dark:bg-fgcDark sm:h-[400px] relative rounded-3xl shrink-0 w-full">
            <div className="relative">
              <div className="box-border content-stretch flex flex-col gap-3 h-full items-start justify-start p-[16px] relative w-full">
                {renderBarChart()}

                {/* Legend */}
                <div className="box-border content-stretch flex flex-col gap-2 items-center justify-center p-[4px] relative shrink-0 w-full">
                  {/* Original legend */}
                  <div className="flex items-center gap-2">
                    <div className="relative shrink-0 size-4">
                      <div className="absolute left-2 size-px top-2">
                        <div className="absolute bg-primary dark:bg-primarySecondary left-[-4px] size-2 top-[-4px]">
                          <div className="absolute border bg-fgc dark:bg-fgcDark border-solid inset-0 pointer-events-none" />
                        </div>
                      </div>
                    </div>
                    <div className="font-['Satoshi:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[12px] text-text dark:text-textDark text-left text-nowrap">
                      <p className="block leading-[normal] whitespace-pre">
                        {filters.country === 'All Countries' ? 'All Countries' : filters.country} - {filters.fromYear === filters.toYear ? filters.fromYear : `${filters.fromYear}-${filters.toYear}`}
                      </p>
                    </div>
                  </div>

                  {/* Period-specific color legend */}
                  {renderLegend()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipmentTimeline;
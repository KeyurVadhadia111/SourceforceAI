import React, { useState, useMemo } from 'react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';
// import svgPaths from '../imports/svg-5fnqb2af45';
import { Line } from 'react-simple-maps';

// TypeScript interfaces
interface ShipmentData {
  year: number;
  month: number;
  country: string;
  volume: number;
  value: number;
  weight: number;
  teu: number;
  seaShipment: number;
}

interface Port {
  id: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
  isHub: boolean;
  region: string;
}

interface FilterState {
  fromYear: number;
  toYear: number;
  country: string;
  region: string;
  portType: 'all' | 'hubs' | 'regional';
}

interface WorldMapProps {
  data: ShipmentData[];
  className?: string;
  title?: string;
}

// Major shipping ports with real coordinates
const MAJOR_PORTS: Port[] = [
  // Asia Pacific
  { id: 'shanghai', name: 'Shanghai', country: 'China', lat: 31.2304, lng: 121.4737, isHub: true, region: 'Asia Pacific' },
  { id: 'singapore', name: 'Singapore', country: 'Singapore', lat: 1.3521, lng: 103.8198, isHub: true, region: 'Asia Pacific' },
  { id: 'hongkong', name: 'Hong Kong', country: 'Hong Kong', lat: 22.3193, lng: 114.1694, isHub: true, region: 'Asia Pacific' },
  { id: 'busan', name: 'Busan', country: 'South Korea', lat: 35.1796, lng: 129.0756, isHub: true, region: 'Asia Pacific' },
  { id: 'tokyo', name: 'Tokyo', country: 'Japan', lat: 35.6762, lng: 139.6503, isHub: false, region: 'Asia Pacific' },
  { id: 'yokohama', name: 'Yokohama', country: 'Japan', lat: 35.4437, lng: 139.6380, isHub: false, region: 'Asia Pacific' },
  { id: 'kobe', name: 'Kobe', country: 'Japan', lat: 34.6901, lng: 135.1956, isHub: false, region: 'Asia Pacific' },
  { id: 'manila', name: 'Manila', country: 'Philippines', lat: 14.5995, lng: 120.9842, isHub: false, region: 'Asia Pacific' },
  { id: 'jakarta', name: 'Jakarta', country: 'Indonesia', lat: -6.2088, lng: 106.8456, isHub: false, region: 'Asia Pacific' },
  { id: 'bangkok', name: 'Bangkok', country: 'Thailand', lat: 13.7563, lng: 100.5018, isHub: false, region: 'Asia Pacific' },
  { id: 'ahmedabad', name: 'Ahmedabad', country: 'India', lat: 19.0760, lng: 72.8777, isHub: true, region: 'Asia Pacific' },
  { id: 'chennai', name: 'Chennai', country: 'India', lat: 13.0827, lng: 80.2707, isHub: false, region: 'Asia Pacific' },

  // North America
  { id: 'losangeles', name: 'Los Angeles', country: 'USA', lat: 34.0522, lng: -118.2437, isHub: true, region: 'North America' },
  { id: 'longbeach', name: 'Long Beach', country: 'USA', lat: 33.7701, lng: -118.1937, isHub: false, region: 'North America' },
  { id: 'newyork', name: 'New York', country: 'USA', lat: 40.7128, lng: -74.0060, isHub: true, region: 'North America' },
  { id: 'seattle', name: 'Seattle', country: 'USA', lat: 47.6062, lng: -122.3321, isHub: false, region: 'North America' },
  { id: 'vancouver', name: 'Vancouver', country: 'Canada', lat: 49.2827, lng: -123.1207, isHub: false, region: 'North America' },

  // Europe
  { id: 'rotterdam', name: 'Rotterdam', country: 'Netherlands', lat: 51.9244, lng: 4.4777, isHub: true, region: 'Europe' },
  { id: 'hamburg', name: 'Hamburg', country: 'Germany', lat: 53.5511, lng: 9.9937, isHub: true, region: 'Europe' },
  { id: 'antwerp', name: 'Antwerp', country: 'Belgium', lat: 51.2194, lng: 4.4025, isHub: false, region: 'Europe' },
  { id: 'bremen', name: 'Bremen', country: 'Germany', lat: 53.0793, lng: 8.8017, isHub: false, region: 'Europe' },
  { id: 'felixstowe', name: 'Felixstowe', country: 'UK', lat: 51.9642, lng: 1.3518, isHub: false, region: 'Europe' },

  // Middle East & Africa
  { id: 'dubai', name: 'Dubai', country: 'UAE', lat: 25.2048, lng: 55.2708, isHub: true, region: 'Middle East & Africa' },
  { id: 'suez', name: 'Suez', country: 'Egypt', lat: 29.9668, lng: 32.5498, isHub: false, region: 'Middle East & Africa' },

  // South America
  { id: 'santos', name: 'Santos', country: 'Brazil', lat: -23.9608, lng: -46.3331, isHub: false, region: 'South America' },

  // Australia & Oceania
  { id: 'sydney', name: 'Sydney', country: 'Australia', lat: -33.8688, lng: 151.2093, isHub: false, region: 'Australia & Oceania' },
  { id: 'melbourne', name: 'Melbourne', country: 'Australia', lat: -37.8136, lng: 144.9631, isHub: false, region: 'Australia & Oceania' }
];
const PORT_CONNECTIONS: Array<{ from: string; to: string }> = [
  { from: 'shanghai', to: 'singapore' },
  { from: 'singapore', to: 'rotterdam' },
  { from: 'rotterdam', to: 'hamburg' },
  { from: 'losangeles', to: 'newyork' },
  { from: 'dubai', to: 'suez' },
  { from: 'santos', to: 'rotterdam' },
  { from: 'ahmedabad', to: 'singapore' },
  // Add more connections as needed
];
const getPortCoords = (id: string) => {
  const port = MAJOR_PORTS.find(p => p.id === id);
  return port ? [port.lng, port.lat] : null;
};

// Sample data generation
const generateSampleData = (): ShipmentData[] => {
  const data: ShipmentData[] = [];
  const countries = ['China', 'USA', 'Germany', 'Japan', 'South Korea', 'India', 'Singapore', 'Netherlands'];
  const baseVolumes: Record<string, number> = {
    'China': 15000,
    'USA': 8000,
    'Germany': 6000,
    'Japan': 7000,
    'South Korea': 5000,
    'India': 4000,
    'Singapore': 3500,
    'Netherlands': 3000
  };
  

  for (let year = 2020; year <= 2024; year++) {
    countries.forEach(country => {
      for (let month = 1; month <= 12; month++) {
        const baseVolume = baseVolumes[country];
        const yearGrowth = Math.pow(1.05, year - 2020);
        const seasonalFactor = 1 + 0.2 * Math.sin((month - 1) * Math.PI / 6);
        const randomFactor = 0.8 + Math.random() * 0.4;

        const volume = Math.round(baseVolume * yearGrowth * seasonalFactor * randomFactor);
        const weight = Math.round(volume * (0.8 + Math.random() * 0.4));
        const teu = Math.round(volume / (18 + Math.random() * 6));
        const seaShipment = Math.round(volume * (0.8 + Math.random() * 0.15));

        data.push({
          year,
          month,
          country,
          volume,
          value: Math.round(volume * (15 + Math.random() * 10)),
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

// World topology URL for react-simple-maps
const geoUrl = "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson";

const WorldMap: React.FC<WorldMapProps> = ({
  data = sampleData,
  className = '',
  title = 'Country-Wise Import Volume Distribution'
}) => {
  const [filters, setFilters] = useState<FilterState>({
    fromYear: 2020,
    toYear: 2024,
    country: 'All Countries',
    region: 'All Regions',
    portType: 'all'
  });

  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [hoveredPort, setHoveredPort] = useState<string | null>(null);
  const [selectedPort, setSelectedPort] = useState<Port | null>(null);

  // Get unique years and countries from data
  const availableYears = useMemo(() => {
    const years = [...new Set(data.map(d => d.year))].sort();
    return years;
  }, [data]);

  const availableCountries = useMemo(() => {
    const countries = [...new Set(MAJOR_PORTS.map(p => p.country))].sort();
    return ['All Countries', ...countries];
  }, []);

  const availableRegions = useMemo(() => {
    const regions = [...new Set(MAJOR_PORTS.map(p => p.region))].sort();
    return ['All Regions', ...regions];
  }, []);

  // Filter ports based on current filters
  const filteredPorts = useMemo(() => {
    return MAJOR_PORTS.filter(port => {
      const countryMatch = filters.country === 'All Countries' || port.country === filters.country;
      const regionMatch = filters.region === 'All Regions' || port.region === filters.region;
      const portTypeMatch = filters.portType === 'all' ||
        (filters.portType === 'hubs' && port.isHub) ||
        (filters.portType === 'regional' && !port.isHub);

      return countryMatch && regionMatch && portTypeMatch;
    });
  }, [filters]);

  // Get country data for selected period
  const countryData = useMemo(() => {
    const filteredData = data.filter(item =>
      item.year >= filters.fromYear && item.year <= filters.toYear
    );

    return filteredData.reduce((acc, item) => {
      if (!acc[item.country]) {
        acc[item.country] = {
          volume: 0,
          weight: 0,
          teu: 0,
          seaShipment: 0,
          ports: MAJOR_PORTS.filter(p => p.country === item.country).length
        };
      }
      acc[item.country].volume += item.volume;
      acc[item.country].weight += item.weight;
      acc[item.country].teu += item.teu;
      acc[item.country].seaShipment += item.seaShipment;
      return acc;
    }, {} as Record<string, { volume: number; weight: number; teu: number; seaShipment: number; ports: number }>);
  }, [data, filters.fromYear, filters.toYear]);

  // Helper function to format numbers
  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${Math.round(num / 1000)}k`;
    return num.toLocaleString();
  };

  const getPortTooltip = (port: Port): string => {
    const data = countryData[port.country];
    if (!data) return `${port.name}, ${port.country}\nPort Type: ${port.isHub ? 'Major Hub' : 'Regional Port'}`;

    return `${port.name}, ${port.country}
Port Type: ${port.isHub ? 'Major Hub' : 'Regional Port'}
Region: ${port.region}
Country Volume: ${formatNumber(data.volume)} units
Country TEU: ${formatNumber(data.teu)} containers`;
  };

  const getCountryFillColor = (countryName: string) => {
    const data = countryData[countryName];
    if (!data) return '#f8f9fa';

    // Color intensity based on volume
    const maxVolume = Math.max(...Object.values(countryData).map(c => c.volume), 1);
    const intensity = Math.min(data.volume / maxVolume, 1);

    if (intensity > 0.8) return '#1e40af';
    if (intensity > 0.6) return '#3b82f6';
    if (intensity > 0.4) return '#60a5fa';
    if (intensity > 0.2) return '#93c5fd';
    if (intensity > 0) return '#dbeafe';
    return '#f8f9fa';
  };

  const renderFilters = () => (
    <div className="flex flex-wrap gap-4 items-center mb-4">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">From Year:</label>
        <select
          value={filters.fromYear}
          onChange={(e) => setFilters(prev => ({ ...prev, fromYear: parseInt(e.target.value) }))}
          className="px-3 py-1 border border-gray-300 rounded-md text-sm"
        >
          {availableYears.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">To Year:</label>
        <select
          value={filters.toYear}
          onChange={(e) => setFilters(prev => ({ ...prev, toYear: parseInt(e.target.value) }))}
          className="px-3 py-1 border border-gray-300 rounded-md text-sm"
        >
          {availableYears.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">Country:</label>
        <select
          value={filters.country}
          onChange={(e) => setFilters(prev => ({ ...prev, country: e.target.value }))}
          className="px-3 py-1 border border-gray-300 rounded-md text-sm"
        >
          {availableCountries.map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">Region:</label>
        <select
          value={filters.region}
          onChange={(e) => setFilters(prev => ({ ...prev, region: e.target.value }))}
          className="px-3 py-1 border border-gray-300 rounded-md text-sm"
        >
          {availableRegions.map(region => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">Port Type:</label>
        <select
          value={filters.portType}
          onChange={(e) => setFilters(prev => ({ ...prev, portType: e.target.value as 'all' | 'hubs' | 'regional' }))}
          className="px-3 py-1 border border-gray-300 rounded-md text-sm"
        >
          <option value="all">All Ports</option>
          <option value="hubs">Major Hubs</option>
          <option value="regional">Regional Ports</option>
        </select>
      </div>
    </div>
  );

  const renderWorldMap = () => {
    return (
      <div className="relative w-full h-[600px] bg-gray-50 rounded-lg overflow-hidden">
        <ComposableMap
          projectionConfig={{
            scale: 130,
          }}
          style={{ width: '100%', height: '100%' }}
        >
          <ZoomableGroup>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const countryName = geo.properties.NAME;
                  const isHovered = hoveredCountry === countryName;
                  const hasData = countryData[countryName];

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => setHoveredCountry(countryName)}
                      onMouseLeave={() => setHoveredCountry(null)}
                      style={{
                        default: {
                          fill: getCountryFillColor(countryName),
                          stroke: '#d1d5db',
                          strokeWidth: 0.5,
                          outline: 'none',
                        },
                        hover: {
                          fill: hasData ? '#1d4ed8' : '#e5e7eb',
                          stroke: '#374151',
                          strokeWidth: 1,
                          outline: 'none',
                        },
                        pressed: {
                          fill: '#1e40af',
                          stroke: '#374151',
                          strokeWidth: 1,
                          outline: 'none',
                        },
                      }}
                    >
                      {hasData && (
                        <title>
                          {`${countryName}
Volume: ${formatNumber(countryData[countryName].volume)} units
TEU: ${formatNumber(countryData[countryName].teu)} containers
Ports: ${countryData[countryName].ports}`}
                        </title>
                      )}
                    </Geography>
                  );
                })
              }
            </Geographies>

{/* Connecting lines between ports */}
            {PORT_CONNECTIONS.map((conn, idx) => {
              const from = getPortCoords(conn.from);
              const to = getPortCoords(conn.to);
              if (!from || !to) return null;
              return (
                <Line
                  key={`line-${idx}`}
                  from={from}
                  to={to}
                  stroke="#f59e42"
                  strokeWidth={0.5}
                  opacity={0.7}
                  style={{ pointerEvents: 'none' }}
                />
              );
            })}

            {/* Port markers */}
            {filteredPorts.map((port) => {
              const isHovered = hoveredPort === port.id;
              const isSelected = selectedPort?.id === port.id;

              return (
                <Marker key={port.id} coordinates={[port.lng, port.lat]}>
                  <circle
                    r={port.isHub ? 4 : 3}
                    fill={port.isHub ? '#dc2626' : '#2563eb'}
                    stroke={isSelected ? '#fbbf24' : 'white'}
                    strokeWidth={isSelected ? 2 : 1}
                    opacity={isHovered ? 1 : 0.8}
                    className="cursor-pointer transition-all duration-200"
                    onMouseEnter={() => setHoveredPort(port.id)}
                    onMouseLeave={() => setHoveredPort(null)}
                    onClick={() => setSelectedPort(selectedPort?.id === port.id ? null : port)}
                  >
                    <title>{getPortTooltip(port)}</title>
                  </circle>

                  {/* Port label */}
                  <text
                    textAnchor="middle"
                    y={port.isHub ? -8 : -6}
                    style={{
                      fontFamily: 'system-ui',
                      fontSize: '10px',
                      fill: '#374151',
                      pointerEvents: 'none',
                      opacity: isHovered || isSelected ? 1 : 0.7,
                    }}
                  >
                    {port.name}
                  </text>

                  {/* Selection indicator */}
                  {isSelected && (
                    <circle
                      r={port.isHub ? 7 : 6}
                      fill="none"
                      stroke="#fbbf24"
                      strokeWidth={2}
                      opacity={0.6}
                      style={{ pointerEvents: 'none' }}
                    />
                  )}
                </Marker>
              );
            })}
          </ZoomableGroup>
        </ComposableMap>

        {/* Legend */}
        {/* <div className="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow-lg border">
          <div className="space-y-2">
            <div className="text-xs font-medium text-gray-700 mb-2">Legend</div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-600 rounded-full"></div>
              <span className="text-xs text-gray-600">Major Hubs</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span className="text-xs text-gray-600">Regional Ports</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 border-2 border-yellow-400 rounded-full"></div>
              <span className="text-xs text-gray-600">Selected Port</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="text-xs text-gray-600 mb-1">Shipping Volume</div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-blue-800"></div>
                <span className="text-xs text-gray-600">High</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-blue-300"></div>
                <span className="text-xs text-gray-600">Low</span>
              </div>
            </div>
          </div>
        </div> */}

        {/* Port Details Panel */}
        {selectedPort && (
          <div className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-lg border max-w-sm">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-gray-900">{selectedPort.name}</h3>
              <button
                onClick={() => setSelectedPort(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            <div className="space-y-1 text-sm text-gray-600">
              <p><strong>Country:</strong> {selectedPort.country}</p>
              <p><strong>Region:</strong> {selectedPort.region}</p>
              <p><strong>Type:</strong> {selectedPort.isHub ? 'Major Hub' : 'Regional Port'}</p>
              <p><strong>Coordinates:</strong> {selectedPort.lat.toFixed(2)}°, {selectedPort.lng.toFixed(2)}°</p>
              {countryData[selectedPort.country] && (
                <div className="mt-2 pt-2 border-t">
                  <p className="font-medium text-gray-700">Country Data ({filters.fromYear}-{filters.toYear}):</p>
                  <p>Volume: {formatNumber(countryData[selectedPort.country].volume)} units</p>
                  <p>TEU: {formatNumber(countryData[selectedPort.country].teu)} containers</p>
                  <p>Ports: {countryData[selectedPort.country].ports}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`relative rounded-2xl size-full ${className}`}>
      <div className="absolute border border-[#e0e0e0] border-solid inset-0 pointer-events-none rounded-2xl" />
      <div className="flex flex-col justify-center relative size-full">
        <div className="box-border content-stretch flex flex-col gap-4 items-start justify-center p-[16px] relative size-full">

          {/* Header */}
          <div className="box-border content-stretch flex flex-row gap-4 items-start justify-start p-0 relative shrink-0 w-full">
            <div className="font-['Satoshi:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#1e2d2a] text-[20px] text-left text-nowrap">
              <p className="block leading-[1.5] whitespace-pre">{title}</p>
            </div>
          </div>

          {/* Filters */}
          {renderFilters()}

          {/* Info section */}
          <div className="box-border content-stretch flex flex-row items-start justify-between p-0 relative shrink-0 w-full">
            <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-start p-0 relative shrink-0">
              <div className="relative shrink-0 size-5">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                  <g>

                  </g>
                </svg>
              </div>
              <div className="font-['Satoshi:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#1e2d2a] text-[12px] text-left text-nowrap">
                <p className="block leading-[1.5] whitespace-pre">Period: {filters.fromYear}-{filters.toYear}</p>
              </div>
              <div className="font-['Satoshi:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#666] text-[12px] text-left text-nowrap">
                <p className="block leading-[1.5] whitespace-pre">Ports: {filteredPorts.length}</p>
              </div>
            </div>

            {/* <div className="bg-[#ffffff] box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-3 py-2 relative rounded-[322px] shrink-0">
              <div className="absolute border border-[#529e7e] border-solid inset-0 pointer-events-none rounded-[322px]" />
              <div className="font-['Satoshi:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#529e7e] text-[12px] text-left text-nowrap">
                <p className="block leading-[1.5] whitespace-pre">World Map</p>
              </div>
            </div> */}
          </div>

          {/* Map */}
          <div className="bg-[#ffffff] min-h-[700px] relative rounded-3xl shrink-0 w-full">
            <div className="relative size-full">
              <div className="box-border content-stretch flex flex-col gap-3 h-full items-start justify-start p-[16px] relative w-full">
                {renderWorldMap()}

                {/* Bottom info */}
                <div className="box-border content-stretch flex flex-row items-center justify-between p-[4px] relative shrink-0 w-full">
                  <div className="flex items-center gap-2">
                    {/* <div className="relative shrink-0 size-4">
                      <div className="absolute left-2 size-px top-2">
                        <div className="absolute bg-[#529e7e] left-[-4px] size-2 top-[-4px]">
                          <div className="absolute border border-[#ffffff] border-solid inset-0 pointer-events-none" />
                        </div>
                      </div>
                    </div> */}
                    {/* <div className="font-['Satoshi:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.7)] text-left text-nowrap">
                      <p className="block leading-[normal] whitespace-pre">
                        Hover over countries and ports • Zoom and pan enabled • Countries colored by shipping volume
                      </p>
                    </div> */}
                  </div>

                  {/* <div className="font-['Satoshi:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#1e2d2a] text-[16px] text-right text-nowrap">
                    <p className="block leading-[1.5] whitespace-pre">
                      {Object.keys(countryData).length} active countries • {filteredPorts.length} ports displayed
                    </p>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorldMap;
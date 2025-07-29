import React, { useState } from 'react';
import svgPaths from '../utils/svg-cj7iyr8ys3';
import { useAppState } from 'components/utils/useAppState';

// TypeScript interfaces for the data structure
interface Company {
    id: string;
    name: string;
    color: string;
}

interface SubSupplier {
    id: string;
    name: string;
    opacity: number;
}

interface Supplier extends Company {
    subSuppliers: SubSupplier[];
    position: {
        top: number;
        left: number;
    };
}

interface TradeRelationshipData {
    mainCompany: Company;
    suppliers: Supplier[];
    totalOtherCompanies: number;
}

interface GlobalTradeRelationshipsProps {
    data: TradeRelationshipData;
    className?: string;
}

interface TooltipProps {
    supplier: Supplier;
    position: { x: number; y: number };
    visible: boolean;
}

// Sample data structure
const sampleData: TradeRelationshipData = {
    mainCompany: {
        id: "google",
        name: "Google",
        color: "#529e7e"
    },
    suppliers: [
        {
            id: "delta-electronics",
            name: "Delta Electronics Jiangsu",
            color: "#323ca9",
            position: { top: 81, left: 235 },
            subSuppliers: [
                { id: "delta-americas", name: "Delta Electronics Americas", opacity: 0.1 },
                { id: "det-logistics", name: "Det Logistics Usa", opacity: 0.16 },
                { id: "dei-logistics", name: "Dei Logistics Usa", opacity: 0.22 },
                { id: "schenker", name: "Schenker", opacity: 0.28 },
                { id: "netgear", name: "Netgear", opacity: 0.34 }
            ]
        },
        {
            id: "qmb",
            name: "Qmb",
            color: "#a9328f",
            position: { top: 261, left: 235 },
            subSuppliers: [
                { id: "first-data", name: "First Data Hardware Services", opacity: 0.1 },
                { id: "qch-1", name: "Qch", opacity: 0.16 },
                { id: "quanta-nashville", name: "Quanta Manufacturing Nashville", opacity: 0.22 },
                { id: "world-wide-tech", name: "World Wide Technology", opacity: 0.28 },
                { id: "samsara", name: "Samsara", opacity: 0.34 }
            ]
        },
        {
            id: "rittal-csm",
            name: "Rittal Csm",
            color: "#328fa9",
            position: { top: 379, left: 235 },
            subSuppliers: [
                { id: "rittal-north", name: "Rittal North America", opacity: 0.1 },
                { id: "celestica", name: "Celestica", opacity: 0.16 },
                { id: "quanta-2", name: "Quanta", opacity: 0.22 },
                { id: "quanta-nashville-2", name: "Quanta Manufacturing Nashville", opacity: 0.28 }
            ]
        },
        {
            id: "seagate",
            name: "Seagate Technology Thailand",
            color: "#52a932",
            position: { top: 484, left: 235 },
            subSuppliers: [
                { id: "inditex", name: "Inditex S A", opacity: 0.1 },
                { id: "reiss", name: "Reiss", opacity: 0.16 },
                { id: "tempe", name: "Tempe S A", opacity: 0.22 },
                { id: "provimi", name: "Provimi North America", opacity: 0.28 },
                { id: "nikole", name: "Nikole S A", opacity: 0.28 }
            ]
        },
        {
            id: "kuehne-nagel",
            name: "Kuehne & Nagel Shanghai Branch",
            color: "#9532a9",
            position: { top: 582, left: 235 },
            subSuppliers: [
                { id: "fii-usa", name: "Fii Usa", opacity: 0.1 },
                { id: "qch-2", name: "Qch", opacity: 0.16 },
                { id: "iec-tech", name: "Iec Technologies S De R L De C V", opacity: 0.22 }
            ]
        },
        {
            id: "actmax",
            name: "Actmax",
            color: "#a97732",
            position: { top: 742, left: 235 },
            subSuppliers: [
                { id: "invue-security", name: "Invue Security Products", opacity: 0.1 }
            ]
        },
        {
            id: "invue-hk",
            name: "Invue Security Products Hk",
            color: "#a95532",
            position: { top: 822, left: 235 },
            subSuppliers: []
        }
    ],
    totalOtherCompanies: 23
};

// Tooltip Component
const Tooltip: React.FC<TooltipProps> = ({ supplier, position, visible }) => {
    if (!visible) return null;

    return (
        <div
            className="absolute z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-xs transition-opacity duration-200"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                transform: 'translate(-50%, -100%)',
            }}
        >
            <div className="text-sm font-semibold text-gray-900 mb-2">{supplier.name}</div>
            <div className="text-xs text-gray-600 mb-2">
                Sub-suppliers: {supplier.subSuppliers.length}
            </div>
            {supplier.subSuppliers.length > 0 && (
                <div className="space-y-1">
                    <div className="text-xs font-medium text-gray-700">Top Sub-suppliers:</div>
                    {supplier.subSuppliers.slice(0, 3).map((subSupplier) => (
                        <div key={subSupplier.id} className="text-xs text-gray-600">
                            • {subSupplier.name}
                        </div>
                    ))}
                    {supplier.subSuppliers.length > 3 && (
                        <div className="text-xs text-gray-500">
                            +{supplier.subSuppliers.length - 3} more
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

const GlobalTradeRelationshipsGraph: React.FC<GlobalTradeRelationshipsProps> = ({
    data = sampleData,
    className = ""
}) => {
    const [activeView, setActiveView] = useState<'graph' | 'list'>('graph');
    const [{ isMobile }, setAppState] = useAppState();

    const [hoveredSupplier, setHoveredSupplier] = useState<string | null>(null);
    const [hoveredSubSupplier, setHoveredSubSupplier] = useState<string | null>(null);
    const [tooltip, setTooltip] = useState<{
        supplier: Supplier;
        position: { x: number; y: number };
        visible: boolean;
    }>({
        supplier: data.suppliers[0],
        position: { x: 0, y: 0 },
        visible: false
    });

    const handleSupplierMouseEnter = (supplier: Supplier, event: React.MouseEvent) => {
        setHoveredSupplier(supplier.id);
        const rect = event.currentTarget.getBoundingClientRect();
        const containerRect = event.currentTarget.closest('.h-\\[883px\\]')?.getBoundingClientRect();

        if (containerRect) {
            setTooltip({
                supplier,
                position: {
                    x: rect.left - containerRect.left + rect.width / 2,
                    y: rect.top - containerRect.top
                },
                visible: true
            });
        }
    };

    const handleSupplierMouseLeave = () => {
        setHoveredSupplier(null);
        setTooltip(prev => ({ ...prev, visible: false }));
    };

    const handleSubSupplierMouseEnter = (subSupplierId: string, supplierId: string) => {
        setHoveredSubSupplier(subSupplierId);
        setHoveredSupplier(supplierId);
    };

    const handleSubSupplierMouseLeave = () => {
        setHoveredSubSupplier(null);
        setHoveredSupplier(null);
    };

    const getSupplierOpacity = (supplierId: string) => {
        if (!hoveredSupplier) return 1;
        return hoveredSupplier === supplierId ? 1 : 0.3;
    };

    const getSubSupplierOpacity = (subSupplierId: string, supplierId: string) => {
        if (!hoveredSupplier && !hoveredSubSupplier) return 1;
        if (hoveredSubSupplier === subSupplierId) return 1;
        if (hoveredSupplier === supplierId && !hoveredSubSupplier) return 1;
        return 0.3;
    };

    const getConnectionOpacity = (supplierId: string) => {
        if (!hoveredSupplier) return 1;
        return hoveredSupplier === supplierId ? 1 : 0.2;
    };

    const renderConnectionLines = () => (
        <div className="absolute h-[809.5px] left-[465px] sm:left-[535px] top-[34px] w-[107px]">
            <div className="absolute bottom-[-0.357%] left-0 right-0 top-[-0.357%]">
                <svg
                    className="block "
                    fill="none"
                    preserveAspectRatio="none"
                    viewBox="0 0 107 816"
                >
                    <g>
                        {/* Connection paths with dynamic opacity based on hover state */}
                        {data.suppliers.map((supplier, index) => {
                            const opacity = getConnectionOpacity(supplier.id);
                            const pathStyle = {
                                fill: `rgba(0, 0, 0, ${opacity})`,
                                transition: 'fill 0.3s ease'
                            };

                            // Each supplier gets its corresponding connection paths
                            const supplierPaths = [
                                svgPaths.p30adcc80, svgPaths.pc21d00, svgPaths.p4286080,
                                svgPaths.p2efcce00, svgPaths.p1e1bf680,
                                svgPaths.p73eec80, svgPaths.p3770bb0, svgPaths.p3402100,
                                svgPaths.p35726e40, svgPaths.p2c68fb00,
                                svgPaths.p3eb78980, svgPaths.p5630ff0, svgPaths.p31795000,
                                svgPaths.p21258f00,
                                svgPaths.pd438f80, svgPaths.p3bc05400, svgPaths.p32cb13b0,
                                svgPaths.pd031700, svgPaths.p28ad9880,
                                svgPaths.p2b5869c0, svgPaths.p1c7b1900, svgPaths.p19860e00,
                                svgPaths.p36836100,
                            ];

                            return (
                                <g key={supplier.id}>
                                    {supplierPaths.slice(index * 3.6, index * 3.5 + 4).map((path, pathIndex) => (
                                        <path
                                            key={pathIndex}
                                            d={path}
                                            style={pathStyle}
                                        />
                                    ))}
                                </g>
                            );
                        })}

                        {/* Main connection lines */}
                        <line
                            stroke={`rgba(0, 0, 0, ${hoveredSupplier ? 0.3 : 1})`}
                            strokeWidth="1"
                            x1="38.5" x2="38.5" y1="140" y2="3"
                            style={{ transition: 'stroke 0.3s ease' }}
                        />
                        <line
                            stroke={`rgba(0, 0, 0, ${hoveredSupplier ? 0.3 : 1})`}
                            strokeWidth="1"
                            x1="38.5" x2="38.5" y1="321" y2="185"
                            style={{ transition: 'stroke 0.3s ease' }}
                        />
                        <line
                            stroke={`rgba(0, 0, 0, ${hoveredSupplier ? 0.3 : 1})`}
                            strokeWidth="1"
                            x1="38.5" x2="38.5" y1="469" y2="367"
                            style={{ transition: 'stroke 0.3s ease' }}
                        />
                        <line
                            stroke={`rgba(0, 0, 0, ${hoveredSupplier ? 0.3 : 1})`}
                            strokeWidth="1"
                            x1="38.5" x2="38.5" y1="651" y2="515"
                            style={{ transition: 'stroke 0.3s ease' }}
                        />
                        <line
                            stroke={`rgba(0, 0, 0, ${hoveredSupplier ? 0.3 : 1})`}
                            strokeWidth="1"
                            x1="38.5" x2="38.5" y1="765" y2="697"
                            style={{ transition: 'stroke 0.3s ease' }}
                        />

                        {/* Horizontal connector lines */}
                        <line stroke={`rgba(0, 0, 0, ${getConnectionOpacity('delta-electronics')})`} x1="-2.206e-08" x2="39" y1="71" y2="71" style={{ transition: 'stroke 0.3s ease' }} />
                        <line stroke={`rgba(0, 0, 0, ${getConnectionOpacity('qmb')})`} x1="-2.206e-08" x2="39" y1="253" y2="253" style={{ transition: 'stroke 0.3s ease' }} />
                        <line stroke={`rgba(0, 0, 0, ${getConnectionOpacity('rittal-csm')})`} x1="-2.20599e-08" x2="40" y1="367" y2="367" style={{ transition: 'stroke 0.3s ease' }} />
                        <line stroke={`rgba(0, 0, 0, ${getConnectionOpacity('seagate')})`} x1="-2.20599e-08" x2="40" y1="574" y2="574" style={{ transition: 'stroke 0.3s ease' }} />
                        <line stroke={`rgba(0, 0, 0, ${getConnectionOpacity('kuehne-nagel')})`} x1="-2.20599e-08" x2="40" y1="731" y2="731" style={{ transition: 'stroke 0.3s ease' }} />
                    </g>
                </svg>
            </div>
        </div>
    );

    const renderHorizontalConnectors = () => {
        const connectorPositions = [101, 282, 401, 504, 603, 764, 847];
        return connectorPositions.map((top, index) => {
            const supplier = data.suppliers[index];
            const opacity = supplier ? getConnectionOpacity(supplier.id) : (hoveredSupplier ? 0.3 : 1);

            return (
                <div key={index} className="absolute h-0 left-[128px] sm:left-48 w-9" style={{ top: `${top}px` }}>
                    <div className="absolute bottom-[-2.887px] left-0 right-0 top-[-2.887px]">
                        <svg
                            className="block "
                            fill="none"
                            preserveAspectRatio="none"
                            viewBox="0 0 36 6"
                        >
                            <path
                                d={svgPaths.p3592ea80}
                                fill={`rgba(0, 0, 0, ${opacity})`}
                                style={{ transition: 'fill 0.3s ease' }}
                            />
                        </svg>
                    </div>
                </div>
            );
        });
    };

    const renderMainCompany = () => (
        <div
            className="absolute box-border content-stretch flex flex-row gap-2.5 items-center justify-center sm:left-[26px] p-1.5 sm:p-6 rounded-lg translate-y-[-50%] transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
            style={{
                top: "calc(50% + 12.5px)",
                backgroundColor: data.mainCompany.color,
                opacity: hoveredSupplier ? 0.7 : 1
            }}
        >
            <div className="text-[24px] text-white text-center text-nowrap">
                <p className="block sm:leading-[1.5]">{data.mainCompany.name}</p>
            </div>
        </div>
    );

    const renderSuppliers = () => (
        <>
            {data.suppliers.map((supplier) => (
                <div
                    key={supplier.id}
                    className="absolute box-border content-stretch flex flex-row gap-2.5 items-center justify-center sm:px-6 py-2 rounded-xl w-[300px] cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg hover:z-10"
                    style={{
                        top: `${supplier.position.top}px`,
                        left: `${isMobile ? supplier.position.left / 1.42 : supplier.position.left}px`,
                        backgroundColor: supplier.color,
                        opacity: getSupplierOpacity(supplier.id),
                        transform: hoveredSupplier === supplier.id ? 'scale(1.05)' : 'scale(1)',
                        zIndex: hoveredSupplier === supplier.id ? 10 : 1
                    }}
                    onMouseEnter={(e) => handleSupplierMouseEnter(supplier, e)}
                    onMouseLeave={handleSupplierMouseLeave}
                >
                    <div className="text-[16px] text-white text-center text-nowrap">
                        <p className="block leading-[1.5] whitespace-pre">{supplier.name}</p>
                    </div>
                </div>
            ))}
        </>
    );
    const removeGap = data.suppliers.map((item => {
        item.subSuppliers.map((name => name.id))
    }))
    console.log("data.suppliers.", removeGap)
    const renderSubSuppliers = () => (
        <div className="absolute box-border content-stretch flex flex-col items-start justify-start left-[533px] sm:left-[612px] p-0 top-[21px] w-[300px]">
            {data.suppliers
                .filter((supplier) => supplier.subSuppliers.length > 0)
                .map((supplier, index, filteredSuppliers) => (
                    <div
                        key={supplier.id}
                        className={`box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full ${index !== filteredSuppliers.length - 1 ? 'mb-5' : ''
                            }`}
                    >
                        {supplier.subSuppliers.map((subSupplier) => (
                            <div
                                key={subSupplier.id}
                                className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-6 py-1 relative rounded-xl shrink-0 w-[300px] cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-md hover:z-10"
                                style={{
                                    backgroundColor: `${supplier.color}${Math.floor(
                                        subSupplier.opacity * 255
                                    )
                                        .toString(16)
                                        .padStart(2, "0")}`,
                                    opacity: getSubSupplierOpacity(subSupplier.id, supplier.id),
                                    transform:
                                        hoveredSubSupplier === subSupplier.id ? "scale(1.05)" : "scale(1)",
                                    zIndex: hoveredSubSupplier === subSupplier.id ? 10 : 1,
                                }}
                                onMouseEnter={() =>
                                    handleSubSupplierMouseEnter(subSupplier.id, supplier.id)
                                }
                                onMouseLeave={handleSubSupplierMouseLeave}
                            >
                                <div className="text-[12px] text-[#1e2d2a] text-center text-nowrap">
                                    <p className="block leading-[1.5] whitespace-pre">
                                        {subSupplier.name}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
        </div>

    );

    const renderGraphView = () => (
        <div className="h-[883px] overflow-clip relative shrink-0 w-[954px]">
            {renderMainCompany()}
            {renderSuppliers()}
            {renderSubSuppliers()}
            {renderHorizontalConnectors()}

            {/* Main vertical line */}
            <div className="absolute flex h-[746px] items-center justify-center left-[128px] sm:left-[193px] top-[101px] w-[0px]">
                <div className="flex-none rotate-[270deg]">
                    <div className="h-0 relative w-[746px]">
                        <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
                            <svg
                                className="block "
                                fill="none"
                                preserveAspectRatio="none"
                                viewBox="0 0 746 1"
                            >
                                <line
                                    stroke={`rgba(0, 0, 0, ${hoveredSupplier ? 0.3 : 1})`}
                                    x2="746" y1="0.5" y2="0.5"
                                    style={{ transition: 'stroke 0.3s ease' }}
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Central horizontal line */}
            <div className="absolute h-0 left-[89px] sm:left-[154px] top-[454px] w-[38px]">
                <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
                    <svg
                        className="block "
                        fill="none"
                        preserveAspectRatio="none"
                        viewBox="0 0 38 1"
                    >
                        <line
                            stroke={`rgba(0, 0, 0, ${hoveredSupplier ? 0.3 : 1})`}
                            x2="38" y1="0.5" y2="0.5"
                            style={{ transition: 'stroke 0.3s ease' }}
                        />
                    </svg>
                </div>
            </div>

            {renderConnectionLines()}

            {/* Tooltip */}
            <Tooltip
                supplier={tooltip.supplier}
                position={tooltip.position}
                visible={tooltip.visible}
            />
        </div>
    );

    return (
        <div className={`relative rounded-2xl  ${className}`}>
            <div className="flex flex-col justify-center relative ">
                <div className="basis-0 box-border content-stretch flex flex-col gap-4 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0">

                    {/* Content Area */}
                    {renderGraphView()}

                </div>
            </div>
        </div>
    );
};

export default GlobalTradeRelationshipsGraph;
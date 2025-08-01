import React from "react";
import WorldMap from "./WordMap";

export const CountryWiseImport: React.FC = () => {
  return (
    <div className="flex flex-col items-start justify-center gap-4 p-3 sm:p-4 relative self-stretch w-full flex-[0_0_auto] rounded-2xl border border-solid border-border dark:border-borderDark">
      <div className="flex items-center gap-4 relative self-stretch w-full flex-[0_0_auto]">
        <div className="flex flex-col items-start gap-4 relative flex-1 grow">
          <div className="flex items-center gap-1 relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex flex-wrap items-center gap-1 relative">
              <div className="relative w-fit mt-[-1.00px] [font-family:'Satoshi-Bold',Helvetica] font-bold text-text dark:text-textDark text-base sm:text-xl tracking-[0] leading-[30px]">
                Country-Wise Import Volume Distribution
              </div>

              <div className="relative w-fit [font-family:'Satoshi-Regular',Helvetica] font-normal text-text dark:text-textDark text-xs sm:text-sm tracking-[0] leading-[21px] ">
                {" "}
                (Top 10)
              </div>
            </div>
          </div>

          <div className="relative w-full h-full sm:h-[562px] overflow-hidden">
            <WorldMap />
            <div className="relative w-full top-[140px] sm:top-[-97px] left-[55%] sm:left-[15px]">
              <div className="absolute w-full top-0 left-0">
                {/* World map visualization */}
                <p className="absolute sm:top-[579px] sm:right-10 [font-family:'Satoshi-Bold',Helvetica] font-bold text-[10px] sm:text-[19.3px] leading-[28.9px] whitespace-nowrap text-text dark:text-textDark tracking-[0]">
                  570 sea shipments in total
                </p>
              </div>

              <div className="inline-flex items-center gap-[4.82px] absolute -left-[50%] sm:top-[601px] sm:left-[27px]">
                <div className="relative w-[17.59px] h-[17.59px] bg-fgc dark:bg-fgcDark rounded-[8.79px]" />

                <div className="inline-flex flex-col items-start gap-[4.82px] relative flex-[0_0_auto]">
                  <div className="relative w-fit mt-[-0.80px] [font-family:'Satoshi-Bold',Helvetica] font-bold text-[5.7px] leading-[8.5px] whitespace-nowrap text-text dark:text-textDark tracking-[0]">
                    219 shipments
                  </div>

                  <div className="relative w-fit [font-family:'Satoshi-Bold',Helvetica] font-bold text-[5.7px] leading-[8.5px] whitespace-nowrap text-text dark:text-textDark tracking-[0]">
                    1 shipments
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// import React, { useRef, useEffect, useState } from 'react';
// import * as d3 from 'd3';

// interface Country {
//   name: string;
//   x: number;
//   y: number;
// }

// interface CountryMapChartProps {
//   height?: number;
// }

// const countries: Country[] = [
//   { name: 'India', x: 720, y: 320 },
//   { name: 'Germany', x: 500, y: 200 },
//   { name: 'UAE', x: 670, y: 290 },
//   { name: 'Singapore', x: 780, y: 360 },
//   { name: 'Australia', x: 850, y: 440 }
// ];

// export const CountryWiseImport: React.FC<CountryMapChartProps> = ({ height }) => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const svgRef = useRef<SVGSVGElement>(null);
//   const [width, setWidth] = useState(765);

//   useEffect(() => {
//     const observer = new ResizeObserver(entries => {
//       if (entries[0]) {
//         setWidth(entries[0].contentRect.width);
//       }
//     });

//     if (containerRef.current) observer.observe(containerRef.current);
//     return () => observer.disconnect();
//   }, []);

//   const chartWidth = Math.min(width, 954);

//   useEffect(() => {
//     if (!svgRef.current) return;

//     const svg = d3.select(svgRef.current);
//     svg.selectAll('*').remove(); // Clear

//     svg
//       .attr('width', chartWidth)
//       .attr('height', "534.32px")
//       .attr('viewBox', '0 0 954 535')
//       .attr('preserveAspectRatio', 'xMidYMid meet');

//     // Add base map
//     svg
//       .append('g')
//       .append('path')
//       .attr('d', 'M918.313 308.655L919.329 306.925C921.736 310.254 924.808 312.981 926.831 316.355C927.487 317.45 927.373 318.854 928.071 319.889C929.414 321.883 930.851 323.798 932.18 325.791C933.651 328.022 934.309 330.793 935.878 332.977C937.062 334.596 937.282 336.748 938.35 338.394C939.205 339.72 940.362 340.803 941.368 341.998C942.276 343.081 942.833 344.5 943.714 345.656C944.489 346.676 945.764 347.226 946.682 348.141C947.444 348.899 948.289 349.581 949.155 350.218C951.086 351.638 953.32 352.83 954.001 355.325C952.253 356.159 949.977 356.129 948.358 354.966C946.69 353.768 945.678 351.885 944.245 350.362C942.762 348.79 940.967 347.506 939.675 345.807C938.152 343.798 936.773 341.69 935.438 339.555C934.62 338.246 934.399 336.603 933.607 335.278C932.31 333.122 930.829 331.078 929.353 329.039C928.739 328.187 928.436 327.151 927.927 326.224C926.53 323.652 924.421 321.595 922.801 319.127C921.224 316.719 919.713 314.271 918.313 311.768V308.655Z')
//       .attr('fill', '#E0E0E0');

//     // Add all country dots
//     countries.forEach((country) => {
//       svg
//         .append('circle')
//         .attr('cx', country.x)
//         .attr('cy', country.y)
//         .attr('r', 6)
//         .attr('fill', '#004bb2');

//       svg
//         .append('text')
//         .attr('x', country.x + 8)
//         .attr('y', country.y)
//         .text(country.name)
//         .attr('font-size', 12)
//         .attr('fill', '#004bb2');
//     });

//     // Draw connecting lines from India
//     const origin = countries.find((c) => c.name === 'India');
//     if (origin) {
//       countries
//         .filter((c) => c.name !== 'India')
//         .forEach((target) => {
//           svg
//             .append('line')
//             .attr('x1', origin.x)
//             .attr('y1', origin.y)
//             .attr('x2', target.x)
//             .attr('y2', target.y)
//             .attr('stroke', '#004bb2')
//             .attr('stroke-width', 1.5)
//             .attr('stroke-dasharray', '4');
//         });
//     }
//   }, [chartWidth, height]);

//   return (
//     <div
//       ref={containerRef}
//       className="relative w-full h-auto flex justify-center items-center overflow-x-auto"
//     >
//       <svg ref={svgRef}></svg>
//     </div>
//   );
// };

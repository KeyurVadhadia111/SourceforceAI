import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { hsCodeData } from '../data/hsCodeData';
import { useAppState } from 'components/utils/useAppState';

interface SunburstChartProps {
  height: number;
}

export const SunburstChart: React.FC<SunburstChartProps> = ({ height }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [width, setWidth] = useState(765);

  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    content: string;
    color: string;
    description: string;
    shipments?: number;
    weight?: number;
    teu?: number;
  }>({
    visible: false,
    x: 0,
    y: 0,
    content: '',
    color: '',
    description: '',
    shipments: 0,
    weight: 0,
    teu: 0
  });

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        const newWidth = entries[0].contentRect.width;
        setWidth(newWidth);
      }
    });

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const chartWidth = Math.min(width, 765);
  const computedHeight = chartWidth >= 768 ? 500 : 400;
  const [{ isMobile }, setAppState] = useAppState();

  // Helper function to get HS code descriptions
  const getHSCodeDescription = (code: string): string => {
    const mainCode = code.split('.')[0];

    const descriptions: Record<string, string> = {
      '85': 'Electrical machinery and equipment and parts thereof',
      '84': 'Nuclear reactors, boilers, machinery and mechanical appliances',
      '90': 'Optical, photographic, cinematographic, measuring instruments',
      '82': 'Tools, implements, cutlery, spoons and forks, of base metal',
      '73': 'Articles of iron or steel',
      '39': 'Plastics and articles thereof',
      '29': 'Organic chemicals',
      '94': 'Furniture; bedding, mattresses, cushions',
      '95': 'Toys, games and sports requisites'
    };

    return descriptions[mainCode] || 'Harmonized System code for product classification';
  };

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous visualization
    d3.select(svgRef.current).selectAll('*').remove();

    const radius = Math.min(chartWidth, isMobile ? computedHeight : height) / 2;

    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr('width', chartWidth)
      .attr('height', isMobile ? computedHeight : height)
      .append('g')
      .attr('transform', `translate(${chartWidth / 2},${isMobile ? computedHeight / 2 : height / 2})`);

    // Create partition layout
    const partition = d3.partition<any>()
      .size([2 * Math.PI, radius]);

    // Create arc generator
    const arc = d3.arc<any>()
      .startAngle((d: any) => d.x0)
      .endAngle((d: any) => d.x1)
      .innerRadius((d: any) => d.y0)
      .outerRadius((d: any) => d.y1);

    // Create hierarchy
    const root = d3.hierarchy(hsCodeData)
      .sum((d: any) => d.value || 0)
      .sort((a: any, b: any) => b.value! - a.value!);

    // Apply partition layout
    partition(root);

    // Create color scale for depth
    const getColor = (d: d3.HierarchyRectangularNode<any>) => {
      if (d.depth === 0) return '#529e7e';
      if (d.data.color) return d.data.color;

      // Fallback colors by depth
      const colors = ['#529e7e', '#3a7d63', '#256b4a', '#115937'];
      return colors[Math.min(d.depth, colors.length - 1)];
    };



    // Create slices
    const slice = svg.selectAll('path')
      .data(root.descendants())
      .enter()
      .append('path')
      .attr('d', arc)
      .style('fill', (d: any) => getColor(d))
      .style('stroke', '#fff')
      .style('stroke-width', 1)
      .style('opacity', (d: any) => d.depth === 0 ? 0.8 : 0.9)
      .style('cursor', 'pointer')
      .on('mouseover', function (event: any, d: any) {
        // Highlight slice
        d3.select(this)
          .transition()
          .duration(200)
          .style('opacity', 1)
          .style('stroke-width', 2);

        // Show tooltip
        const parentValue = d.parent?.value || d.value;
        const localPercentage = ((d.value! / parentValue) * 100).toFixed(1);
        const code = d.data.code || '';

        setTooltip({
          visible: true,
          x: event.pageX,
          y: event.pageY,
          content: `${name} (${code}): ${localPercentage}%`,
          color: getColor(d),
          description: code ? getHSCodeDescription(code) : 'All HS Codes',
          shipments: d.data.shipments ?? 0,
          weight: d.data.weight ?? 0,
          teu: d.data.teu ?? 0
        });
      })
      .on('mousemove', function (event: any) {
        setTooltip(prev => ({
          ...prev,
          x: event.pageX,
          y: event.pageY
        }));
      })
      .on('mouseout', function () {
        // Reset slice
        d3.select(this)
          .transition()
          .duration(200)
          .style('opacity', (d: any) => d.depth === 0 ? 0.8 : 0.9)
          .style('stroke-width', 1);

        // Hide tooltip
        setTooltip(prev => ({
          ...prev,
          visible: false
        }));
      });

    // Add labels for larger slices
    const text = svg.selectAll('text')
      .data(root.descendants().filter((d: any) => (d.x1 - d.x0) > 0.15 && d.depth > 0))
      .enter()
      .append('text')
      .attr('transform', function (d: any) {
        const x = (d.x0 + d.x1) / 2;
        const y = (d.y0 + d.y1) / 2;
        const angle = x * 180 / Math.PI - 90;
        const rotate = angle + (angle > 90 ? 180 : 0);
        return `translate(${d3.pointRadial(x, y)}) rotate(${rotate})`;
      })
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('fill', '#fff')
      .attr('font-size', (d: any) => {
        const maxFontSize = chartWidth < 500 ? 12 : 14;
        return Math.min(10 + (d.y1 - d.y0) / 10, maxFontSize);
      })

      .attr('font-weight', 'bold')
      .text((d: any) => {
        if ((d.x1 - d.x0) < 0.2) return '';
        return d.data.code || '';
      });

    // Add central label
    svg.append('circle')
      .attr('r', radius * 0.15)
      .attr('fill', '#529e7e')
      .attr('stroke', '#fff')
      .attr('stroke-width', 2);

    svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('y', -8)
      .attr('fill', '#fff')
      .attr('font-size', chartWidth < 500 ? '10px' : '14px')
      .attr('font-weight', 'bold')
      .text('HS Code');

    svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('y', 8)
      .attr('fill', '#fff')
      .attr('font-size', chartWidth < 500 ? '10px' : '14px')
      .attr('font-weight', 'bold')
      .text('Breakdown');

    // Add animated gradient effect
    const defs = svg.append('defs');

    // Create radial gradient
    const gradient = defs.append('radialGradient')
      .attr('id', 'sunburst-gradient')
      .attr('cx', '50%')
      .attr('cy', '50%')
      .attr('r', '50%');

    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#fff')
      .attr('stop-opacity', 0.3);

    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#fff')
      .attr('stop-opacity', 0);

    // Add overlay with gradient
    svg.append('circle')
      .attr('r', radius)
      .attr('fill', 'url(#sunburst-gradient)')
      .attr('pointer-events', 'none');

    // Add subtle pulse animation to center
    const pulseAnimation = () => {
      svg.select('circle')
        .transition()
        .duration(2000)
        .attr('r', radius * 0.16)
        .transition()
        .duration(2000)
        .attr('r', radius * 0.14)
        .on('end', pulseAnimation);
    };

    pulseAnimation();

  }, [chartWidth, height]);



  return (
    <div ref={containerRef} className="flex justify-center relative w-full overflow-x-auto">
      <svg ref={svgRef} width={width} height={computedHeight}></svg>
      {tooltip.visible && (
        <div
          className="fixed z-50 bg-white p-4 rounded-lg shadow-lg border-2 pointer-events-none"
          style={{
            left: tooltip.x + 15,
            top: tooltip.y + 15,
            borderColor: tooltip.color,
            maxWidth: '350px'
          }}
        >
          <div className="font-bold text-base mb-1" style={{ color: tooltip.color }}>
            {tooltip.content}
          </div>
          <div className="text-xs text-gray-500">
            {tooltip.description}
            <br />
            <strong>Shipments:</strong> {tooltip.shipments?.toLocaleString()}
            <br />
            <strong>Weight:</strong> {tooltip.weight?.toLocaleString()} kg
            <br />
            <strong>TEU:</strong> {tooltip.teu?.toLocaleString()}
          </div>
        </div>
      )}
    </div>
  );
};

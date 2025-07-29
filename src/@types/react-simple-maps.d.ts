declare module 'react-simple-maps' {
    import * as React from 'react';

    export interface GeographyProps {
        geography: any;
        style?: any;
        onClick?: (geo: any) => void;
        onMouseEnter?: (geo: any) => void;
        onMouseLeave?: (geo: any) => void;
        children?: React.ReactNode; // <-- Add this line
    }


    export interface MarkerProps {
        coordinates: [number, number];
        children?: React.ReactNode;
    }

    export interface LineProps {
        from: [number, number];
        to: [number, number];
        stroke?: string;
        strokeWidth?: number;
        strokeLinecap?: 'round' | 'square' | 'butt';
        style?: React.CSSProperties; // ✅ Add this line
    }
    export const ComposableMap: React.FC<any>;
    export const ZoomableGroup: React.FC<any>;
    export const Geographies: React.FC<any>;
    export const Geography: React.FC<GeographyProps>;
    export const Marker: React.FC<MarkerProps>;
    export const Line: React.FC<LineProps>;
}

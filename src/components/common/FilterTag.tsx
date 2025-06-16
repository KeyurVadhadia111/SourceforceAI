import React from 'react';
import Icon from '../utils/Icon';

export interface FilterTagProps {
    id: string;
    label: string;
    onRemove: (id: string) => void;
}

const FilterTag: React.FC<FilterTagProps> = ({ id, label, onRemove }) => {
    return (
        <div className="inline-flex items-center justify-center gap-1 sm:gap-1.5 sm:px-5 px-3 sm:py-2.5 py-2 relative rounded-[52px] outline outline-solid outline-border">
            <div className="relative w-fit font-medium text-text sm:text-sm text-xs text-center leading-[150%] whitespace-nowrap sm:tracking-0 tracking-[0.13px]">
                {label}
            </div>
            <button
                onClick={() => onRemove(id)}
                className="hover:opacity-80 transition-opacity"
            >
                <Icon className="relative sm:w-4 sm:h-4 h-3 w-3" icon="x-mark" />
            </button>
        </div>
    );
};

export default FilterTag;

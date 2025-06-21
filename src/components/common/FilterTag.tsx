import React from "react";
import Icon from "../utils/Icon";

export interface FilterTagProps {
	id: string;
	label: string;
	onRemove: (id: string) => void;
}

const FilterTag: React.FC<FilterTagProps> = ({ id, label, onRemove }) => {
	return (
		<div className="inline-flex items-center justify-center gap-1 sm:gap-1.5 sm:px-[19px] px-[11px] sm:py-[9px] py-[7px] relative rounded-[52px] border border-border data:border-borderDark">
			<div className="relative w-fit font-medium text-text dark:text-textDark sm:text-sm text-xs text-center leading-[150%] whitespace-nowrap sm:tracking-0 tracking-[0.13px]">
				{label}
			</div>
			<button
				onClick={() => onRemove(id)}
				className="hover:opacity-80 transition-opacity sm:w-4 sm:h-4 h-3 w-3 inline-flex items-center justify-center relative">
				<Icon className="relative h-full w-full dark:text-textDark" icon="x-mark" />
			</button>
		</div>
	);
};

export default FilterTag;

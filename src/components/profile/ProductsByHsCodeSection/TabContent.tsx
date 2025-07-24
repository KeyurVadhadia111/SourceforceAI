import Icon from "components/utils/Icon";
import React, { useEffect, useRef, useState } from "react";

type Subcategory = {
    code: string;
    description: string;
};

type Category = {
    id: string;
    title: string;
    industries: string[];
    bgColor: string;
    expanded: boolean;
    subcategories?: Subcategory[];
};

type TabContentProps = {
    categories: Category[];
};

const TabContent: React.FC<TabContentProps> = ({ categories }) => {
    const [expandedId, setExpandedId] = useState<string | null>(
        categories.find((c) => c.expanded)?.id || null
    );

    const toggleExpand = (id: string) => {
        setExpandedId((prevId) => (prevId === id ? null : id));
    };


    return (
        <div className="flex flex-col justify-start items-start h-full text-gray-700 gap-4 overflow-y-auto p-0 sm:p-4 w-full">
            <div className="flex flex-col gap-4 w-full">
                {categories.map((cat) => {
                    const isExpanded = expandedId === cat.id;
                    const mainIndustries = cat.industries.slice(0, 3);
                    const moreCount = cat.industries.length - 3;

                    const contentRef = useRef<HTMLDivElement>(null);
                    const [contentHeight, setContentHeight] = useState(0);

                    useEffect(() => {
                        if (isExpanded && contentRef.current) {
                            setContentHeight(contentRef.current.scrollHeight);
                        } else {
                            setContentHeight(0);
                        }
                    }, [isExpanded]);

                    return (
                        <div key={cat.id} className={`rounded-2xl shadow-sm p-3 sm:px-4 sm:py-[19px] ${cat.bgColor}`}>
                            <div
                                className="flex sm:grid grid-cols-10 w-full justify-between items-start cursor-pointer"
                                onClick={() => toggleExpand(cat.id)}
                            >
                                <div className="flex flex-col gap-3 sm:grid grid-cols-9 w-full col-span-9">
                                    <h3 className="col-span-4 font-semibold text-md">{cat.title}</h3>
                                    <div className="col-span-5 flex flex-wrap gap-2">
                                        {mainIndustries.map((industry, idx) => (
                                            <span
                                                key={idx}
                                                className="flex justify-center items-center bg-white text-gray-600 text-xs h-[29px] px-3 py-1 rounded-full border border-gray-200"
                                            >
                                                {industry}
                                            </span>
                                        ))}
                                        {moreCount > 0 && (
                                            <span className="flex justify-center items-center bg-white text-gray-600 text-xs h-[29px] px-3 py-1 rounded-full border border-gray-200">
                                                +{moreCount} More
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <span className="col-span-1 text-end text-gray-400 text-lg select-none">
                                    <Icon icon="chevron-down" className={`sm:w-6 sm:h-6 w-5 h-5 text-textSecondary ${isExpanded ? "rotate-180" : ""}`} />
                                </span>
                            </div>

                            <div
                                style={{
                                    maxHeight: `${isExpanded ? contentHeight : 0}px`,
                                    transition: "max-height 0.4s ease",
                                    overflow: "hidden",
                                }}
                            >
                                <div ref={contentRef}>
                                    {cat.subcategories && (
                                        <div className="mt-4 rounded-xl bg-white p-4">
                                            {cat.subcategories.map((sub, idx) => (
                                                <div
                                                    key={idx}
                                                    className="grid grid-cols-10 gap-4 items-start mb-2"
                                                >
                                                    <span className="col-span-4 font-semibold text-sm text-gray-700">
                                                        {sub.code}
                                                    </span>
                                                    <span className="col-span-6 text-sm text-gray-600">
                                                        {sub.description}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>


                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TabContent;

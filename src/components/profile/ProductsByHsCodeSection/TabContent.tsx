import React from "react";

type TabContentProps = {
    title: string;
    value: string;
};

const TabContent: React.FC<TabContentProps> = ({ title, value }) => {
    return (
        <div className="flex flex-col justify-center items-center h-full text-gray-700">
            <h2 className="text-xl font-bold mb-2">{title}</h2>
            <p className="text-base">{value}</p>
        </div>
    );
};

export default TabContent;

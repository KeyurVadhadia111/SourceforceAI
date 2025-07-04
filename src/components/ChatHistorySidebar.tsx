import React, { useState, useEffect } from "react";
import Icon from "components/utils/Icon";
import { Input } from "components/utils/Input";
import { useAppState } from "./utils/useAppState";

const dummyData = [
    { date: "Today", items: ["Find Verified Suppliers for Searched supplier A", "Top 5 Reliable Electronics Asked for quote", "Compare Quality Metrics of suppliers"] },
    { date: "Yesterday", items: ["Check Certifications for Follow-up message", "Screen Suppliers by On-Time or not."] },
    { date: "6th June 2025", items: ["Verified Suppliers for Eco Initial chat.", "Best Mobile Parts Distributors Compared pricing.", "Quality-Checked Leather are good or not."] },
    { date: "2nd June 2025", items: ["ISO-Certified Machinery Saved supplier list", "Bulk Order Suppliers for Shared product spec", "Local Chemical Suppliers Near."] },
    { date: "1st June 2025", items: ["Verified Suppliers for Eco-Friendly Products", "Best Mobile Parts Distributors Across India", "Quality-Checked Leather Manufacturers & Exporters"] },
];

type Props = {
    isOpen: boolean;
    onClose: () => void;
     onSelectHistory: (text: string) => void;
};

const ChatHistorySidebar: React.FC<Props> = ({ isOpen, onClose, onSelectHistory }) => {
    const [{ isDark }, setAppState] = useAppState();
    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState(dummyData);

    useEffect(() => {
        if (!search.trim()) {
            setFilteredData(dummyData);
        } else {
            const filtered = dummyData
                .map(section => ({
                    date: section.date,
                    items: section.items.filter(item =>
                        item.toLowerCase().includes(search.toLowerCase())
                    ),
                }))
                .filter(section => section.items.length > 0);

            setFilteredData(filtered);
        }
    }, [search]);

    return (
        <div
            className={`fixed top-14 md:top-[104px] right-0 h-full w-[330px] bg-white dark:bg-bgcDark shadow-lg border-l border-border dark:border-borderDark z-50 transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
                }`}
        >
            {/* Top Bar with Close and Search */}
            <div className="flex items-center justify-between gap-4 px-5 py-3 border-b border-border dark:border-borderDark w-[330px]">
                <Icon
                    icon={`${isDark ? "history-close-dark" : "history-close"}`}
                    className="w-6 h-6 text-text dark:text-textDark cursor-pointer"
                    onClick={onClose}
                />

                <div className="relative w-[250px]">
                    <input
                        type="text"
                        placeholder="Search here..."
                        autoFocus
                        className="pl-10 pr-3 py-4 h-11 bg-fgc dark:bg-fgcDark text-text dark:text-textDark border border-border dark:border-borderDark rounded-full focus:outline-none w-full"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    <Icon icon={`${isDark ? "history-search-dark" : "history-search"}`} className="absolute left-3 top-3 w-5 h-5" />
                </div>
            </div>


            {/* Chat History */}
            <div className="px-5 py-2 overflow-y-auto h-[calc(100vh-133px)] md:h-[calc(100vh-173px)] space-y-4">
                {filteredData.length === 0 ? (
                    <p className="text-sm text-textSecondary">No history found.</p>
                ) : (
                    filteredData.map((section, i) => (
                        <div key={i}>
                            <h3 className="text-base text-textSecondary">
                                {section.date}
                            </h3>
                            {section.items.map((text, j) => (
                                <div
                                    key={j}
                                    className="flex gap-4 items-center py-1.5 px-2 text-sm text-text dark:text-textDark cursor-pointer"
                                    onClick={() => onSelectHistory(text)}
                                >
                                    <div className="flex items-center justify-center px-2 py-2 bg-fgc dark:bg-fgcDark rounded-lg">
                                        <img
                                            src="/assets/images/ai.svg"
                                            className="w-5 h-4"
                                        />
                                    </div>
                                    <span className="w-full truncate">{text}</span>
                                </div>
                            ))}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ChatHistorySidebar;

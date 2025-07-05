import SideMenu from "components/common/SideMenu";
import SupplierCard, { Supplier } from "components/common/SupplierCard";
import { Button } from "components/utils/Button";
import { suppliersSearchFilter } from "components/utils/consts";

import Icon from "components/utils/Icon";
import { useAppState } from "components/utils/useAppState";
import { JSX, useEffect, useRef, useState } from "react";
import SimpleBar from "simplebar-react";
import FilterTag from "components/common/FilterTag";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "lib/utils";
import { Card } from "components/utils/Card";
import { Input, Menu } from "@headlessui/react";

interface FilterTag {
    id: string;
    label: string;
}

const initialFilterTags: FilterTag[] = [
    { id: "country", label: "China" },
    { id: "delivery", label: "1–3 Days" },
    { id: "price", label: "$3 – $12" },
    { id: "payment", label: "Credit/Debit" },
    { id: "certification", label: "ISO Certified" },
];

const SupplierMessages = () => {
    const [{ isDark, isExpanded, supplierSearchQueries }, setAppState] = useAppState();
    const [filterTags, setFilterTags] = useState<FilterTag[]>(supplierSearchQueries);
    const [loading, setLoading] = useState(true);
    const [displaySuppliers, setDisplaySuppliers] = useState<Supplier[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const [showSummary, setShowSummary] = useState(false);
    const simpleBarRef = useRef<any>(null);
    const pageBottomRef = useRef<HTMLDivElement>(null);
    const [reactions, setReactions] = useState<{ [index: number]: "like" | "dislike" | null }>({});
    const [dropUp, setDropUp] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [alignRight, setAlignRight] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState<any>();
    const [inputValue, setInputValue] = useState("");
    const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
    const [temporarilyReadSuppliers, setTemporarilyReadSuppliers] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();

    const state = location.state as {
        defaultTab?: "inbox" | "sent";
        filteredSuppliers?: Supplier[];
    };


    useEffect(() => {
        if (state?.filteredSuppliers?.length) {
            setDisplaySuppliers(state.filteredSuppliers);
            setLoading(false);
        } else {
            setLoading(true);
            setDisplaySuppliers(suppliersSearchFilter);
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        pageBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    useEffect(() => {
        // Simulating API call
        const fetchSuppliers = async () => {
            setLoading(true);
            try {
                setDisplaySuppliers(suppliersSearchFilter);
            } catch (error) {
                console.error("Error fetching suppliers:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSuppliers();
    }, []);


    const engagementPoints = [
        "Identify the common characteristics and features of leading B2B platforms that facilitate high engagement and positive feedback.",
        "Research best practices for optimizing company profiles and listings on B2B platforms to attract attention and encourage interaction.",
        "Investigate the primary factors that contribute to high response rates from potential clients or partners on B2B platforms, including...",
    ];

    const handleReaction = (index: number, type: "like" | "dislike") => {
        setReactions((prev) => ({
            ...prev,
            [index]: prev[index] === type ? null : type,
        }));
    };

    useEffect(() => {
        // Simulating API call
        const fetchSuppliers = async () => {
            setLoading(true);
            try {
                // Replace with actual API call
                await new Promise(resolve => setTimeout(resolve, 1000));
                setDisplaySuppliers(suppliersSearchFilter);
            } catch (error) {
                console.error("Error fetching suppliers:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSuppliers();
    }, []);

    useEffect(() => {
        setFilterTags(supplierSearchQueries);

        return () => {
            true;
        };
    }, [supplierSearchQueries]);

    const handleOpen = () => {
        const rect = buttonRef.current?.getBoundingClientRect();
        if (rect) {
            const spaceBelow = window.innerHeight - rect.bottom;
            const dropdownHeight = 120;
            setDropUp(spaceBelow < dropdownHeight);

            const dropdownWidth = 160;
            const spaceRight = window.innerWidth - rect.left;
            const spaceLeft = rect.right;

            if (spaceRight < dropdownWidth && spaceLeft >= dropdownWidth) {
                setAlignRight(true);
            } else {
                setAlignRight(false);
            }
        }
    };


    useEffect(() => {
        pageBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    const handleRemoveFilter = (tagId: string) => {
        setFilterTags(prevTags => prevTags.filter(tag => tag.id !== tagId));
        setAppState({ supplierSearchQueries: supplierSearchQueries.filter((tag: any) => tag.id !== tagId) });
    };

    const [messages, setMessages] = useState<
        Array<{
            text?: string;
            from: string;
            files?: Array<{
                name: string;
                type: string;
                url: string;
                isImage: boolean;
            }>;
        }>
    >([
        {
            text: "I need top suppliers for portable blenders from China with high response rates and good reviews.",
            from: "user",
        },
        {
            text: "Here are top-rated suppliers for portable blenders from China. Filtered by high response rates (>85%) and average rating above 4.0.",
            from: "ai",
        },
    ]);

    function useIsMobile() {
        const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
        useEffect(() => {
            const onResize = () => setIsMobile(window.innerWidth <= 1024);
            window.addEventListener("resize", onResize);
            return () => window.removeEventListener("resize", onResize);
        }, []);
        return isMobile;
    }
    const isMobile = useIsMobile();
    useEffect(() => {
        const storedSupplier = localStorage.getItem('selectedSupplier');
        if (storedSupplier) {
            setSelectedSupplier(JSON.parse(storedSupplier));
        }
    }, []);

    const handleSelectSupplier = (item: any) => {
        if (!temporarilyReadSuppliers.includes(item.id)) {
            setTemporarilyReadSuppliers((prev) => [...prev, item.id]);
        }

        setSelectedSupplier(item);
        localStorage.setItem('selectedSupplier', JSON.stringify(item));
    };

    // Update handleSend to include files in user messages
    const handleSend = () => {
        if (!inputValue.trim() && attachedFiles.length === 0) return;
        setIsLoading(true);
        setTimeout(() => {
            setMessages(prev => [
                ...prev,
                {
                    text: inputValue,
                    from: "user",
                    files:
                        attachedFiles.length > 0
                            ? attachedFiles.map(file => ({
                                name: file.name,
                                type: file.type,
                                url: URL.createObjectURL(file),
                                isImage: file.type.startsWith("image/"),
                            }))
                            : undefined,
                },
                { text: "We are looking into your request, Thank you !", from: "ai" },
            ]);
            setIsLoading(false);

        }, 1500);
        setInputValue("");
        setAttachedFiles([]);
    };

    useEffect(() => {
        if (simpleBarRef.current) {
            // For SimpleBar, always scroll to the bottom of the scrollable area
            const scrollEl = simpleBarRef.current.getScrollElement
                ? simpleBarRef.current.getScrollElement()
                : simpleBarRef.current.el;
            if (scrollEl) {
                // Use setTimeout to ensure DOM is updated before scrolling
                setTimeout(() => {
                    scrollEl.scrollTo({ top: scrollEl.scrollHeight, behavior: "smooth" });
                }, 0);
            }
        }
    }, [messages]);

    useEffect(() => {
        const lowerQuery = searchQuery.toLowerCase().trim();

        if (!lowerQuery) {
            setDisplaySuppliers(suppliersSearchFilter);
        } else {
            const filtered = suppliersSearchFilter.filter((item) =>
                item.name.toLowerCase().includes(lowerQuery) ||
                item.country.toLowerCase().includes(lowerQuery) ||
                item.location.toLowerCase().includes(lowerQuery) ||
                item.tags?.some(tag => tag.label.toLowerCase().includes(lowerQuery))
            );

            setDisplaySuppliers(filtered);
        }
    }, [searchQuery]);
    useEffect(() => {
        if (searchQuery.trim()) {
            // Trigger search or update global state/store
            console.log("Global search for:", searchQuery);
        }
    }, [searchQuery]);

    return (
        <div>
            <SimpleBar className="sm:h-[calc(100dvh-72px)] h-[calc(100dvh-57px)] -ml-px">
                <div className={`${selectedSupplier ? "hidden sm:block" : "flex"} flex-col gap-4 p-6 px-4 pt-3 relative`}>
                    <div className="flex items-center justify-between relative self-stretch w-full flex-wrap gap-y-2 sm:gap-y-0 mb-2 sm:mb-4">
                        <p className="relative w-fit  font-bold text-text dark:text-textDark sm:text-2xl tracking-[0] text-lg leading-[150%] whitespace-nowrap">
                            Messages
                        </p>
                    </div>
                    <div className="w-full flex flex-col lg:flex-row gap-4">
                        <div className="inline-flex lg:max-w-[436px] w-full items-start justify- gap-2 sm:gap-4 relative flex-[0_0_auto]">
                            <div className="relative sm:w-full w-full">
                                <div
                                    className="absolute left-2 z-1 sm:w-11 sm:h-11 w-8 h-8 transform top-1/2 -translate-y-1/2 rounded-[22px] flex items-center justify-center">
                                    <Icon className="sm:w-4 sm:h-4 w-4 h-4 text-text dark:text-textDark" icon="search" />
                                </div>
                                <input type="text" placeholder="search" className="h-10 gap-2.5 px-10 sm:pl-12 sm:w-full w-full py-[15px] sm:py-[17px] flex items-center relative self-stretch text-text dark:text-textDark border border-border dark:border-borderDark rounded-4xl focus-visible:outline-none"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <Button
                                variant="none"
                                onClick={() => {
                                    setIsOpen(true);
                                }}
                                className="inline-flex sm:h-10 h-[34px] items-center gap-2 sm:!px-4 !px-3 !py-2 sm:!py-2.5 relative flex-[0_0_auto] bg-tgc dark:bg-fgcDark rounded-[90px]">
                                <Icon className="relative sm:w-5 sm:h-5 w-[16px] h-[16px]" icon={isDark ? "circles-three-plus-dark" : "circles-three-plus"} />

                                <div className="hidden sm:block relative w-fit mt-[-1.50px] font-medium text-textSecondary dark:text-textDark text-sm tracking-[0] leading-[18px] sm:leading-[21px] whitespace-nowrap">
                                    Filter
                                </div>
                            </Button>
                        </div>
                        <div className="inline-flex items-center sm:gap-4 gap-2 flex-wrap">
                            {filterTags.map(tag => (
                                <FilterTag key={tag.id} id={tag.id} label={tag.label} onRemove={handleRemoveFilter} />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex h-[calc(100dvh-58px)] sm:h-[calc(100dvh-108px)] px-4 gap-4">
                    {/* Left: Supplier List */}
                    <SimpleBar className={cn(
                        "w-full min-[1025px]:lg:w-[400px] flex-shrink-0 no-scrollbar border border-border dark:border-borderDark rounded-lg h-full",
                        selectedSupplier ? "hidden lg:block" : "block"
                    )}>
                        {displaySuppliers.map((item, index) => {
                            const isUnread = index < 3 && !temporarilyReadSuppliers.includes(item.id);
                            const isSelected = selectedSupplier && selectedSupplier.id === item.id;

                            return (
                                <div
                                    key={item.id}
                                    className={cn(
                                        "flex justify-between gap-3 w-full p-4 cursor-pointer rounded-lg transition-colors",
                                        isSelected ? "bg-tgc dark:bg-fgcDark" : ""
                                    )}
                                    onClick={() => handleSelectSupplier(item)}
                                >
                                    <div className="relative min-w-6 min-h-6 w-6 h-6 sm:w-[42px] sm:h-[42px] sm:min-w-[42px] sm:min-h-[42px]">
                                        <img
                                            className="w-full h-full object-cover rounded-full"
                                            alt={`${item.name} logo`}
                                            src={item.image}
                                        />
                                        <div className={`w-2 h-2 rounded-full absolute bottom-1 right-0 ${item.status === "online" ? "bg-green" : ""}`} />
                                    </div>

                                    <div className="flex flex-col gap-1 w-full">
                                        <div className="flex items-center justify-between w-full">
                                            <span className="font-bold text-text dark:text-textDark truncate">
                                                {item.name}
                                            </span>
                                            {isUnread && (
                                                <div className="flex justify-center items-center text-white text-[10px] bg-primary w-4 h-4 rounded-full flex-shrink-0">
                                                    1
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex justify-between items-center w-full gap-2">
                                            <div className="flex-1 overflow-hidden">
                                                <p className="max-w-[150px] sm:max-w-[240px] truncate whitespace-nowrap overflow-hidden text-ellipsis text-sm text-textSecondary dark:text-textSecondaryDark">
                                                    {item.tags.map((tag, i) => `${tag.label}${i < item.tags.length - 1 ? " - " : ""}`).join("")}
                                                </p>
                                            </div>

                                            <span className="text-xs text-textSecondary dark:text-textSecondaryDark flex-shrink-0">
                                                {item.lastSeen}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                    </SimpleBar>

                    {/* Right: Chat Screen */}
                    <div className={cn(
                        "w-full flex flex-col justify-between h-full  border border-border dark:border-borderDark rounded-lg overflow-y-auto",
                        selectedSupplier ? "block" : "hidden sm:block"
                    )}>
                        <div className="sm:p-4 p-2  font-semibold text-text dark:text-textDark border-b border-border dark:border-borderDark">
                            {/* 🔙 Back button on mobile */}
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    {/* Mobile-only back button */}
                                    <button
                                        className="lg:hidden"
                                        onClick={() => setSelectedSupplier(null)}
                                    >
                                        <Icon icon="arrow-up" className="rotate-270 w-5 h-5" />
                                    </button>

                                    {selectedSupplier && (
                                        <div className="flex items-center gap-2">
                                            <img
                                                className="sm:w-[42px] sm:h-[42px] w-8 h-8"
                                                src={selectedSupplier.image}
                                                alt={selectedSupplier.name}
                                            />
                                            <div className="flex flex-col">
                                                <span>{selectedSupplier.name}</span>
                                                {selectedSupplier.tags?.length > 0 && (
                                                    <span className="w-[76%] md:w-full truncate text-sm text-textSecondary dark:text-textSecondaryDark">
                                                        {selectedSupplier.tags.map((tag: any, i: number) => (
                                                            <span key={i}>
                                                                {tag.label}
                                                                {i < selectedSupplier.tags.length - 1 && ' - '}
                                                            </span>
                                                        ))}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <Icon icon="dot" className="w-4 h-4" />
                            </div>
                        </div>
                        {(!isMobile || !showSummary) && (
                            <section className="flex flex-col w-full self-stretch items-center justify-start">
                                <SimpleBar
                                    ref={simpleBarRef}
                                    className={cn(
                                        "relative flex flex-col overflow-auto justify-start gap-6 w-full p-6 py-0 sm:py-6 -ml-px",
                                        "sm:h-[calc(100dvh-346px)] h-[calc(100dvh-260px)]",
                                    )}>
                                    <div className="flex flex-col gap-6 w-full mb-2">
                                        {/* Default User query */}
                                        <div className="relative flex flex-col items-center gap-2.5 pl-[72px] pr-0 py-0 w-full sm:mb-6 mb-4">
                                            <Card className=" bg-tgc dark:bg-fgcDark rounded-[20px] sm:!px-2.5 !px-1.5 sm:!py-1.5 !py-1 shadow-none border-none">
                                                <div className="">
                                                    <p className=" font-normal text-text dark:text-textDark sm:text-sm text-xs leading-[150%]">
                                                        20/06/2025
                                                    </p>
                                                </div>
                                            </Card>
                                            <Card className="w-full bg-tgc dark:bg-fgcDark rounded-[20px] sm:!p-5 !p-4 shadow-none border-none">
                                                <div className="">
                                                    <p className="font-normal text-text dark:text-textDark sm:text-sm text-xs leading-[150%]">
                                                        I need top suppliers for portable blenders from China with high
                                                        response rates and good reviews.
                                                    </p>
                                                </div>
                                            </Card>
                                            <div className="absolute -bottom-7 right-0 font-normal text-text dark:text-textDark sm:text-sm text-xs leading-[150%] ">03:30 PM</div>
                                        </div>
                                        {/* Default AI response section */}
                                        <div className="flex flex-col items-start sm:gap-4 gap-[14px]">
                                            <div className="flex flex-col sm:gap-4 gap-3.5 items-start">
                                                {selectedSupplier && (
                                                    <img
                                                        src={selectedSupplier.image}
                                                        className="sm:w-[33px] sm:h-[24px] w-[30.25px] h-[22px]"
                                                    />
                                                )}
                                                <p className="font-normal text-text dark:text-textDark w-full leading-[150%] ">
                                                    Here are top-rated suppliers for portable blenders from China.
                                                    Filtered by high response rates (&gt;85%) and average rating above
                                                    4.0.
                                                </p>
                                            </div>
                                            <Card className="w-full bg-tgc dark:bg-fgcDark rounded-[20px] sm:!p-5 !p-4 shadow-none border-none">
                                                <div className="flex flex-col sm:gap-4 gap-3">
                                                    <h3 className="font-bold text-text dark:text-textDark sm:text-sm text-xs leading-[150%] ">
                                                        B2B Platform Engagement Indicators
                                                    </h3>

                                                    <div className="flex flex-col sm:gap-3 gap-2.5">
                                                        {engagementPoints.map((point, index) => (
                                                            <p
                                                                key={index}
                                                                className="font-normal text-text dark:text-textDark sm:text-sm text-xs leading-[150%] ">
                                                                {point}
                                                            </p>
                                                        ))}

                                                        <button
                                                            onClick={() => setShowSummary(true)}
                                                            className="text-left font-bold text-primary sm:text-sm text-xs leading-[150%] ">
                                                            Read More
                                                        </button>
                                                    </div>
                                                </div>
                                            </Card>

                                            {/* Action buttons */}
                                            <div className="flex items-center gap-3">
                                                <Icon
                                                    onClick={() => handleReaction(10000, "like")}
                                                    icon={
                                                        isDark
                                                            ? reactions[10000] === "like"
                                                                ? "like-dark-fill"
                                                                : "like-dark"
                                                            : reactions[10000] === "like"
                                                                ? "like-fill"
                                                                : "like"
                                                    }
                                                    className="sm:w-5 sm:h-5 h-4 w-4 cursor-pointer"
                                                />
                                                <Icon
                                                    onClick={() => handleReaction(11000, "dislike")}
                                                    icon={
                                                        isDark
                                                            ? reactions[11000] === "dislike"
                                                                ? "dislike-dark-fill"
                                                                : "dislike-dark"
                                                            : reactions[11000] === "dislike"
                                                                ? "dislike-fill"
                                                                : "dislike"
                                                    }
                                                    className="sm:w-5 sm:h-5 h-4 w-4 cursor-pointer"
                                                />

                                                <Menu as="div" className="relative inline-block text-left">
                                                    <Menu.Button className="focus:outline-none"
                                                        ref={buttonRef}
                                                        onClick={handleOpen}
                                                    >
                                                        <Icon
                                                            icon={isDark ? "sharenetwork-dark" : "share-network"}
                                                            className="sm:w-5 sm:h-5 h-4 w-4"
                                                        />
                                                    </Menu.Button>

                                                    <Menu.Items
                                                        className={cn(
                                                            "absolute z-10 w-40 rounded-md bg-white dark:bg-fgcDark shadow-lg focus:outline-none",
                                                            dropUp ? "bottom-full mb-2" : "top-full mt-2"
                                                        )}
                                                    >
                                                        <div className="py-1">
                                                            {[
                                                                { label: 'Whatsapp' },
                                                                { label: 'Email' },
                                                                { label: 'Linkedin' },
                                                            ].map(({ label }) => (
                                                                <Menu.Item key={label}>
                                                                    {({ active }) => (
                                                                        <button
                                                                            className={cn(
                                                                                "block w-full text-left text-textSecondary dark:text-textSecondaryDark px-4 py-2 text-sm",
                                                                                active ? "bg-tgc/70 dark:bg-bgcDark/30" : ""
                                                                            )}
                                                                        >
                                                                            {label}
                                                                        </button>
                                                                    )}
                                                                </Menu.Item>
                                                            ))}
                                                        </div>
                                                    </Menu.Items>
                                                </Menu>

                                                <Menu as="div" className="relative inline-block text-left">
                                                    <Menu.Button className="focus:outline-none">
                                                        <Icon
                                                            icon={isDark ? "kebab-dark" : "kebab"}
                                                            className="sm:w-5 sm:h-5 h-4 w-4"
                                                        />
                                                    </Menu.Button>

                                                    <Menu.Items className={cn(
                                                        "absolute z-10 w-40 rounded-md bg-white dark:bg-fgcDark shadow-lg focus:outline-none",
                                                        dropUp ? "bottom-full mb-2" : "top-full mt-2",
                                                        alignRight ? "right-0" : "left-0"
                                                    )}>
                                                        <div className="py-1">
                                                            {[
                                                                { label: 'Report Messages' },
                                                                { label: 'Mark as unread' },
                                                            ].map(({ label }) => (
                                                                <Menu.Item key={label}>
                                                                    {({ active }) => (
                                                                        <button
                                                                            className={cn(
                                                                                "block w-full text-left text-textSecondary dark:text-textSecondaryDark px-4 py-2 text-sm",
                                                                                active ? "bg-tgc/70 dark:bg-bgcDark/30" : ""
                                                                            )}
                                                                        >
                                                                            {label}
                                                                        </button>
                                                                    )}
                                                                </Menu.Item>
                                                            ))}
                                                        </div>
                                                    </Menu.Items>
                                                </Menu>
                                            </div>
                                        </div>

                                        {/* Render additional user/AI chat pairs with flex and gap */}
                                        {messages.slice(2).reduce<JSX.Element[]>((acc, msg, idx, arr) => {
                                            if (msg.from === "user") {
                                                acc.push(
                                                    <div key={`qapair-${idx}`} className="flex flex-col gap-6 w-full">
                                                        <div className="relative flex flex-col items-end gap-2.5 pl-[72px] pr-0 py-0 w-full">
                                                            {/* Show images/files above the question text, like ChatGPT */}
                                                            {msg.files && msg.files.length > 0 && (
                                                                <div className="flex flex-wrap gap-2 mb-2 justify-end">
                                                                    {msg.files.map((file, i) =>
                                                                        file.isImage ? (
                                                                            <span
                                                                                key={file.url}
                                                                                className="relative inline-block">
                                                                                <img
                                                                                    src={file.url}
                                                                                    alt={file.name}
                                                                                    className="w-full h-full object-cover rounded-lg"
                                                                                />
                                                                            </span>
                                                                        ) : (
                                                                            <span
                                                                                key={file.url}
                                                                                className="flex flex-col items-end">
                                                                                <span className="flex items-center px-3 py-2 bg-fgc dark:bg-fgcDark rounded-lg text-xs w-48">
                                                                                    <Icon
                                                                                        icon="file"
                                                                                        className="w-5 h-5 mr-2 text-primary"
                                                                                    />
                                                                                    <span className="truncate flex-1">
                                                                                        {file.name}
                                                                                    </span>
                                                                                </span>
                                                                            </span>
                                                                        ),
                                                                    )}
                                                                </div>
                                                            )}
                                                            {msg.text && (
                                                                <Card className="w-auto max-w-full bg-tgc dark:bg-fgcDark rounded-[20px] sm:!p-5 !p-4 shadow-none border-none">
                                                                    <p
                                                                        lang="en"
                                                                        className="font-normal text-text dark:text-textDark sm:text-sm text-xs leading-[150%] break-words hyphens-auto">
                                                                        {msg.text}
                                                                    </p>
                                                                </Card>
                                                            )}
                                                            <div className="absolute -bottom-7 right-0 font-normal text-text dark:text-textDark sm:text-sm text-xs leading-[150%] "> {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                                        </div>

                                                        {arr[idx + 1] && arr[idx + 1].from === "ai" && (
                                                            <div className="flex flex-col items-start sm:gap-4 gap-[14px]">
                                                                <div className="flex flex-col sm:gap-4 gap-3.5 items-start">
                                                                    {selectedSupplier && (
                                                                        <img
                                                                            src={selectedSupplier.image}
                                                                            className="sm:w-[33px] sm:h-[24px] w-[30.25px] h-[22px]"
                                                                        />
                                                                    )}
                                                                    <p className="font-normal text-text dark:text-textDark w-full leading-[150%] ">
                                                                        {arr[idx + 1].text}
                                                                    </p>
                                                                </div>
                                                                <div className="flex items-center gap-3">
                                                                    <Icon
                                                                        onClick={() => handleReaction(idx + 1, "like")}
                                                                        icon={
                                                                            isDark
                                                                                ? reactions[idx + 1] === "like"
                                                                                    ? "like-dark-fill"
                                                                                    : "like-dark"
                                                                                : reactions[idx + 1] === "like"
                                                                                    ? "like-fill"
                                                                                    : "like"
                                                                        }
                                                                        className="sm:w-5 sm:h-5 h-4 w-4 cursor-pointer"
                                                                    />
                                                                    <Icon
                                                                        onClick={() => handleReaction(idx + 1, "dislike")}
                                                                        icon={
                                                                            isDark
                                                                                ? reactions[idx + 1] === "dislike"
                                                                                    ? "dislike-dark-fill"
                                                                                    : "dislike-dark"
                                                                                : reactions[idx + 1] === "dislike"
                                                                                    ? "dislike-fill"
                                                                                    : "dislike"
                                                                        }
                                                                        className="sm:w-5 sm:h-5 h-4 w-4 cursor-pointer"
                                                                    />
                                                                    <Menu as="div" className="relative inline-block text-left">
                                                                        <Menu.Button className="focus:outline-none"
                                                                            ref={buttonRef}
                                                                            onClick={handleOpen}
                                                                        >
                                                                            <Icon
                                                                                icon={isDark ? "sharenetwork-dark" : "share-network"}
                                                                                className="sm:w-5 sm:h-5 h-4 w-4"
                                                                            />
                                                                        </Menu.Button>

                                                                        <Menu.Items
                                                                            className={cn(
                                                                                "absolute z-10 w-30 rounded-md bg-white dark:bg-fgcDark shadow-lg focus:outline-none",
                                                                                dropUp ? "bottom-full mb-2" : "top-full mt-2",
                                                                                alignRight ? "right-0" : "left-0"
                                                                            )}
                                                                        >
                                                                            <div className="py-1">
                                                                                {[
                                                                                    { label: 'Whatsapp', url: "https://web.whatsapp.com/" },
                                                                                    { label: 'Email', url: "https://accounts.google.com/" },
                                                                                    { label: 'Linkedin', url: "https://www.linkedin.com/" },
                                                                                ].map(({ label, url }) => (
                                                                                    <Menu.Item key={label}>
                                                                                        {({ active }) => (
                                                                                            <button
                                                                                                onClick={() => {
                                                                                                    if (url) window.open(url, "_blank");
                                                                                                }}
                                                                                                className={cn(
                                                                                                    "block w-full text-left text-textSecondary dark:text-textSecondaryDark px-4 py-2 text-sm",
                                                                                                    active ? "bg-tgc/70 dark:bg-bgcDark/30" : ""
                                                                                                )}
                                                                                            >
                                                                                                {label}
                                                                                            </button>
                                                                                        )}
                                                                                    </Menu.Item>
                                                                                ))}
                                                                            </div>
                                                                        </Menu.Items>
                                                                    </Menu>

                                                                    <Menu as="div" className="relative inline-block text-left">
                                                                        <Menu.Button
                                                                            ref={buttonRef}
                                                                            onClick={handleOpen}
                                                                            className="focus:outline-none">
                                                                            <Icon
                                                                                icon={isDark ? "kebab-dark" : "kebab"}
                                                                                className="sm:w-5 sm:h-5 h-4 w-4"
                                                                            />
                                                                        </Menu.Button>

                                                                        <Menu.Items className={cn(
                                                                            "absolute z-10 w-30 rounded-md bg-white dark:bg-fgcDark shadow-lg focus:outline-none",
                                                                            dropUp ? "bottom-full mb-2" : "top-full mt-2",
                                                                            alignRight ? "right-0" : "left-0"
                                                                        )}>
                                                                            <div className="py-1">
                                                                                {[
                                                                                    { label: 'Report Messages' },
                                                                                    { label: 'Mark as unread' },
                                                                                ].map(({ label }) => (
                                                                                    <Menu.Item key={label}>
                                                                                        {({ active }) => (
                                                                                            <button
                                                                                                className={cn(
                                                                                                    "block w-full text-left text-textSecondary dark:text-textSecondaryDark px-4 py-2 text-sm",
                                                                                                    active ? "bg-tgc/70 dark:bg-bgcDark/30" : ""
                                                                                                )}
                                                                                            >
                                                                                                {label}
                                                                                            </button>
                                                                                        )}
                                                                                    </Menu.Item>
                                                                                ))}
                                                                            </div>
                                                                        </Menu.Items>
                                                                    </Menu>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>,
                                                );
                                            }
                                            return acc;
                                        }, [])}
                                    </div>

                                </SimpleBar>
                            </section>
                        )}
                        <div className="p-6 pt-2">
                            <div className="sticky bottom-0 bg-white dark:bg-fgcDark rounded-2xl sm:p-5 p-2 border border-border dark:border-borderDark flex flex-col gap-5 items-center w-full">
                                {isLoading && (
                                    <div className="flex items-start justify-start gap-2 w-full">
                                        <div className="flex items-center gap-2">
                                            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                                        </div>
                                    </div>
                                )}
                                {attachedFiles.length > 0 && (
                                    <div className="flex items-center gap-1 mb-1 flex-wrap">
                                        {attachedFiles.map((file, idx) => {
                                            const isImage = file.type.startsWith("image/");
                                            return (
                                                <div
                                                    key={file.name + idx}
                                                    className={cn(
                                                        "relative flex items-center  bg-tgc dark:bg-fgcDark",
                                                        isImage
                                                            ? "rounded-full p-0 w-11 h-11 min-w-[44px] min-h-[44px] max-w-[44px] max-h-[44px] overflow-hidden justify-center"
                                                            : "rounded-full px-3 py-1 min-w-[180px] max-w-[260px] h-[44px] gap-1",
                                                    )}
                                                    style={{ marginRight: 4, marginBottom: 4 }}>
                                                    {isImage ? (
                                                        <>
                                                            <img
                                                                src={URL.createObjectURL(file)}
                                                                alt={file.name}
                                                                className="w-full h-full object-cover"
                                                                style={{ borderRadius: "9999px" }}
                                                                onLoad={e =>
                                                                    URL.revokeObjectURL((e.target as HTMLImageElement).src)
                                                                }
                                                            />
                                                            <button
                                                                type="button"
                                                                className="absolute top-0 right-0 z-10 flex items-center justify-center bg-white dark:bg-fgcDark rounded-full shadow-sm w-5 h-5 m-0.5"
                                                                style={{ boxShadow: "0 1px 4px 0 rgba(0,0,0,0.10)" }}
                                                                onClick={() =>
                                                                    setAttachedFiles(prev =>
                                                                        prev.filter((_, i) => i !== idx),
                                                                    )
                                                                }
                                                                aria-label={`Remove ${file.name}`}>
                                                                <Icon
                                                                    icon="x-mark"
                                                                    className="w-3 h-3 text-textTurnery hover:text-textSecondary"
                                                                />
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Icon icon="file" className="w-6 h-6 text-primary mr-2" />
                                                            <div className="flex flex-col min-w-0 ml-1">
                                                                <span className="text-text dark:text-textDark font-medium text-xs truncate max-w-[140px]">
                                                                    {file.name}
                                                                </span>
                                                                <span className="text-textSecondary text-[10px] leading-tight truncate max-w-[140px]">
                                                                    {file.type
                                                                        ? file.type.split("/")[1]?.toUpperCase()
                                                                        : "File"}
                                                                </span>
                                                            </div>
                                                            <button
                                                                type="button"
                                                                className="absolute top-0 right-0 z-10 flex items-center justify-center bg-white rounded-full shadow-sm w-5 h-5 m-0.5"
                                                                style={{ boxShadow: "0 1px 4px 0 rgba(0,0,0,0.10)" }}
                                                                onClick={() =>
                                                                    setAttachedFiles(prev =>
                                                                        prev.filter((_, i) => i !== idx),
                                                                    )
                                                                }
                                                                aria-label={`Remove ${file.name}`}>
                                                                <Icon
                                                                    icon="x-mark"
                                                                    className="w-3 h-3 text-textTurnery hover:text-textSecondar"
                                                                />
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                                <textarea
                                    id="message"
                                    placeholder="Message..."
                                    className="border-none border-border dark:border-borderDark text-text dark:text-textDark focus:outline-none focus:ring-0 focus:ring-primary resize-none leading-[150%] w-[calc(100%-32px)]"
                                    rows={1}
                                    value={inputValue}
                                    onChange={e => setInputValue(e.target.value)}
                                    onKeyDown={e => {
                                        if (e.key === "Enter" && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSend();
                                        }
                                    }}
                                />
                                <div className="flex justify-between w-full">
                                    <div
                                        className="flex justify-between items-center flex-wrap sm:gap-1">
                                        {/* Attach */}
                                        <label className="cursor-pointer">
                                            <Input
                                                type="file"
                                                className="hidden"
                                                onChange={e => {
                                                    const files = e.target.files ? Array.from(e.target.files) : [];
                                                    if (files.length > 0) {
                                                        setAttachedFiles(prev => [...prev, ...files]);
                                                    }
                                                }}
                                            />
                                            <div className="w-10 h-10 bg-tgc rounded-full flex justify-center items-center">

                                                <div className="w-5 h-5 bg-primary rounded-full flex justify-center items-center">
                                                    <Icon
                                                        icon="plus"
                                                        className="text-white sm:h-2.5 sm:w-2.5"
                                                    />
                                                </div>
                                            </div>
                                        </label>
                                    </div>

                                    <button
                                        onClick={() => {
                                            handleSend();
                                        }}
                                        className="flex items-center justify-center bg-primary rounded-full text-white w-8 h-8">
                                        <Icon icon="send" size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div ref={pageBottomRef} />
            </SimpleBar>
            {isOpen && <SideMenu isOpen={isOpen} openFrom={"supplierSearch"} setIsOpen={setIsOpen} />}
        </div>
    );
};

export default SupplierMessages;

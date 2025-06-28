import { Supplier } from "components/common/SupplierCard";
import { RfqCenterInbox, RfqCenterSent, suppliersSearchFilter } from "components/utils/consts";
import Icon from "components/utils/Icon";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


type SearchSupplier = Supplier & { source: "inbox" | "sent" | "chat" };


// Simulated page-wise data
const pageData: { [key: string]: { id: number; title: string }[] } = {
	page1: [
		{ id: 1, title: "Dashboard Report" },
		{ id: 2, title: "User Analytics" },
	],
	page2: [
		{ id: 3, title: "Invoices History" },
		{ id: 4, title: "Export Data" },
	],
	page3: [
		{ id: 5, title: "Profile Info" },
		{ id: 6, title: "User Preferences" },
	],
};

// Tab config with mapping
const tabConfig = [
	{ label: "Chat", key: "chat", route: "/supplier-messages" },
	{ label: "Supplier/RFQs", key: "supplier", route: "/rfq-center" },
	{ label: "Other", key: "other", route: "/help-support" },
];

export default function SearchResultsPage() {
	const location = useLocation();
	const navigate = useNavigate();
	const params = new URLSearchParams(location.search);
	const searchQuery = params.get("query")?.toLowerCase() || "";

	const [activeTab, setActiveTab] = useState(tabConfig[0].label);
	const [results, setResults] = useState<{ [key: string]: any[] }>({});
	const [inboxSuppliers, setInboxSuppliers] = useState<SearchSupplier[]>([]);
	const [sentSuppliers, setSentSuppliers] = useState<SearchSupplier[]>([]);
	const [chatSuppliers, setChatSuppliers] = useState<SearchSupplier[]>([]);
	const [showHelpSupportCard, setShowHelpSupportCard] = useState(false);
	const [showSubscriptionCard, setShowSubscriptionCard] = useState(false);

	useEffect(() => {
		const filteredResults: { [key: string]: any[] } = {};

		for (const key in pageData) {
			filteredResults[key] = pageData[key].filter((item: any) =>
				item.title.toLowerCase().includes(searchQuery)
			);
		}

		const inbox = RfqCenterInbox.filter((supplier) =>
			supplier.name.toLowerCase().includes(searchQuery) ||
			supplier.location.toLowerCase().includes(searchQuery) ||
			supplier.country.toLowerCase().includes(searchQuery) ||
			supplier.tags?.some((tag) => tag.label.toLowerCase().includes(searchQuery))
		).map((s) => ({ ...s, source: "inbox" } as SearchSupplier));

		const sent = RfqCenterSent.filter(supplier =>
			supplier.name.toLowerCase().includes(searchQuery) ||
			supplier.location.toLowerCase().includes(searchQuery) ||
			supplier.country.toLowerCase().includes(searchQuery) ||
			supplier.tags?.some(tag => tag.label.toLowerCase().includes(searchQuery))
		).map((s) => ({ ...s, source: "sent" } as SearchSupplier));

		const chat = suppliersSearchFilter.filter(supplier =>
			supplier.name.toLowerCase().includes(searchQuery) ||
			supplier.location.toLowerCase().includes(searchQuery) ||
			supplier.country.toLowerCase().includes(searchQuery) ||
			supplier.tags?.some(tag => tag.label.toLowerCase().includes(searchQuery))
		).map((s) => ({ ...s, source: "chat" } as SearchSupplier));

		setResults(filteredResults);
		setInboxSuppliers(inbox);
		setSentSuppliers(sent);
		setChatSuppliers(chat);

		setShowHelpSupportCard(/help|support|get help/i.test(searchQuery));
		setShowSubscriptionCard(/subscription/i.test(searchQuery));

	}, [searchQuery]);

	const getTabCount = (key: string) => {
		switch (key) {
			case "chat":
				return chatSuppliers.length;
			case "supplier":
				return inboxSuppliers.length + sentSuppliers.length;
			case "other":
				return (
					(results["page1"]?.length || 0) +
					(showHelpSupportCard ? 1 : 0) +
					(showSubscriptionCard ? 1 : 0)
				);
			default:
				return 0;
		}
	};



	const handleClick = (supplier: SearchSupplier) => {
		switch (supplier.source) {
			case "inbox":
				navigate("/rfq-center", {
					state: {
						defaultTab: "inbox",
						filteredSuppliers: [supplier],
					},
				});
				break;
			case "sent":
				navigate("/rfq-center", {
					state: {
						defaultTab: "sent",
						filteredSuppliers: [supplier],
					},
				});
				break;
			case "chat":
				navigate("/supplier-messages", {
					state: {
						filteredSuppliers: [supplier],
					},
				});
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		// After chat/inbox/sent/results are updated
		const hasChat = chatSuppliers.length > 0;
		const hasSupplier = inboxSuppliers.length > 0 || sentSuppliers.length > 0;
		const hasOther =
			(results["page1"]?.length || 0) > 0 || showHelpSupportCard || showSubscriptionCard;

		if (hasChat) {
			setActiveTab("Chat");
		} else if (hasSupplier) {
			setActiveTab("Supplier/RFQs");
		} else if (hasOther) {
			setActiveTab("Other");
		} else {
			setActiveTab("Chat");
		}
	}, [
		chatSuppliers,
		inboxSuppliers,
		sentSuppliers,
		results,
		showHelpSupportCard,
		showSubscriptionCard,
	]);


	const NoResultFound = () => {
		return (
			<div className="w-full flex flex-col items-center justify-center gap-6 sm:gap-12" >
				<div >
					<img
						className="w-[195px] h-[180px] sm:w-[260px] sm:h-[260px] object-cover"
						alt="no-result-found"
						src="assets/images/noResult.svg"
					/>
				</div>
				<span className="font-medium text-xl sm:text-2xl text-text dark:text-textDark">No Result Found</span>
			</div >
		)
	}


	return (
		<div className="p-6 sm:h-[calc(100dvh-104px)] h-[calc(100dvh-56px)]">
			<h2 className="sm:text-2xl text-lg font-semibold mb-4 text-text dark:text-textDark">
				Search results for <span className="">"{searchQuery}"</span>
			</h2>

			{/* Tabs */}
			<div className="flex items-start justify-between font-bold gap-6 mb-4">
				<div className="flex gap-6 border-b-2 border-border dark:border-borderDark">
					{tabConfig.map((tab) => (
						<button
							key={tab.key}
							onClick={() => setActiveTab(tab.label)}
							className={`
					relative pb-2 sm:text-base text-xs text-textSecondary dark:text-textSecondaryDark
					${activeTab === tab.label ? "text-primary font-semibold" : ""}
				`}
						>
							{tab.label} (<span className="text-primary">{getTabCount(tab.key)}</span>)

							{/* underline effect */}
							{activeTab === tab.label && (
								<span className="absolute left-0 -bottom-[1px] h-[2px] w-full bg-primary rounded-sm" />
							)}
						</button>
					))}
				</div>
				<div className="text-primary text-xs sm:text-base">
					{getTabCount("chat") + getTabCount("supplier") + getTabCount("other")} result
				</div>
			</div>



			{/* Tab Content */}
			<div>
				{activeTab === "Chat" && (
					chatSuppliers.length > 0 ? (
						<div className="grid border border-border dark:border-borderDark overflow-hidden dark:gap-0 rounded-3xl">
							{chatSuppliers.map((supplier, index) => (
								<div
									key={supplier.id}
									onClick={() => handleClick(supplier)}
									className="bg-white dark:bg-fgcDark p-3 sm:py-4 sm:px-6 flex justify-between items-center hover:shadow cursor-pointer"
								>
									<div className="flex flex-col gap-1 max-w-[98%]">
										<h4 className="font-bold sm:text-base text-sm text-text dark:text-textDark">{supplier.name}</h4>
										<p className="sm:text-sm text-xs text-muted text-textSecondary dark:text-textSecondaryDark leading-snug">{supplier.location}, {supplier.country}</p>
									</div>

									<div className="flex flex-col gap-3 items-end flex-shrink-0">
										{index % 2 ? (
											<div className="flex justify-center items-center text-white text-[10px] bg-primary w-4 h-4 rounded-full flex-shrink-0">
												1
											</div>
										) : (
											<div className="" />
										)}
										<span className="text-xs text-textSecondary dark:text-textSecondaryDark flex-shrink-0">
											{supplier.lastSeen}
										</span>
									</div>
								</div>
							))}
						</div>
					) : (
						NoResultFound()
					))}

				{activeTab === "Supplier/RFQs" && (
					inboxSuppliers.length > 0 || sentSuppliers.length > 0 ? (
						<div className="grid border border-border dark:border-borderDark overflow-hidden dark:gap-0 rounded-3xl">
							{inboxSuppliers.length > 0 && <ResultList items={inboxSuppliers} onClick={handleClick} />}
							{sentSuppliers.length > 0 && <ResultList items={sentSuppliers} onClick={handleClick} />}
						</div>
					) : (
						NoResultFound()
					)
				)}


				{activeTab === "Other" && (
					(results["page1"]?.length || 0) === 0 &&
						!showHelpSupportCard &&
						!showSubscriptionCard ? (
						NoResultFound()
					) : (
						<div className="grid gap-2">
							{/* Help & Support Card */}
							{showHelpSupportCard && (
								<div
									className="bg-white dark:bg-fgcDark border border-border dark:border-borderDark rounded-xl p-6 flex justify-between items-center cursor-pointer"
									onClick={() => navigate("/help-support")}
								>
									<div className="flex flex-col gap-2">
										<h4 className="sm:text-base text-sm font-bold text-text dark:text-textDark">
											Help & Support
										</h4>
										<p className="sm:text-sm text-xs text-textSecondary dark:text-textSecondaryDark">
											Visit our help desk or get support from our team.
										</p>
									</div>
								</div>
							)}

							{/* Subscription Card */}
							{showSubscriptionCard && (
								<div
									className="bg-white dark:bg-fgcDark border border-border dark:border-borderDark rounded-xl p-6 flex justify-between items-center cursor-pointer"
									onClick={() => navigate("/subscription")}
								>
									<div className="flex flex-col gap-2">
										<h4 className="sm:text-base text-sm font-bold text-text dark:text-textDark">
											Subscription
										</h4>
										<p className="sm:text-sm text-xs text-textSecondary dark:text-textSecondaryDark">
											Manage your subscription plans and billing settings.
										</p>
									</div>
								</div>
							)}

							{/* Page results */}
							{(results["page1"] || []).map((item) => (
								<div
									key={item.id}
									className="border rounded-md px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
									onClick={() => handleClick({ ...item, source: "inbox" } as SearchSupplier)}
								>
									<h4 className="text-md font-semibold text-slate-800 dark:text-white">
										{item.title}
									</h4>
								</div>
							))}
						</div>
					)
				)}


			</div>
		</div>
	);
}

function ResultList({
	items,
	onClick,
}: {
	items: any[];
	onClick: (item: any) => void;
}) {
	if (!items.length)
		return <p className="text-gray-500">No matching results found.</p>;

	return (
		<div className="w-full">
			{items.map((item) => (
				<div
					key={item.id}
					className="bg-white dark:bg-fgcDark p-3 sm:py-4 sm:px-6 flex justify-between items-start sm:items-center hover:shadow cursor-pointer"
					onClick={() => onClick(item)}
				>
					<div className="flex items-center gap-3">
						<div className="relative min-w-6 min-h-6 w-6 h-6 sm:w-[42px] sm:h-[42px] sm:min-w-[42px] sm:min-h-[42px]">
							<img
								className="w-full h-full object-cover rounded-full"
								alt={`${item.name} logo`}
								src={item.image}
							/>
						</div>
						<div className="flex flex-col gap-1 max-w-[98%]">
							<h4 className="font-bold sm:text-base text-sm text-text dark:text-textDark">{item.name}</h4>
							<p className="sm:text-sm text-xs text-muted text-textSecondary dark:text-textSecondaryDark leading-snug">{item.country}</p>
						</div>
					</div>
					<div className="flex flex-col gap-3 items-end flex-shrink-0">
						<div className="inline-flex sm:flex-row flex-col items-end gap-2 sm:gap-2.5 relative self-stretch flex-[0_0_auto]">
							{item.isVIP && (
								<div className="inline-flex items-center justify-center gap-1.5 sm:gap-2 sm:px-3 px-[10px] sm:py-1 py-0.5 relative flex-[0_0_auto] bg-yellow/10 rounded-[30px] border-[0.5px] border-solid border-yellow h-full">
									<Icon icon="crown" className="text-yellow sm:w-4 sm:h-4 w-[14px] h-[14px]" />
									<div className="relative w-fit font-medium text-yellow sm:text-xs text-[10px] tracking-[0] leading-[150%] whitespace-nowrap">
										VIP
									</div>
								</div>
							)}

							{item.isVerified && (
								<div className="inline-flex items-center justify-center gap-1.5 sm:gap-2 sm:px-3 px-[10px] sm:py-1 py-0.5 relative self-stretch flex-[0_0_auto] bg-primary/10 rounded-[30px] border-[0.5px] border-solid border-primary h-full">
									<Icon icon="target" className="text-primary sm:w-4 sm:h-4 w-[14px] h-[14px]" />
									<div className="relative w-fit  font-medium text-primary sm:text-xs text-[10px] tracking-[0] leading-[150%] whitespace-nowrap">
										Verified
									</div>
								</div>
							)}
						</div>
					</div>

				</div>

			))}
		</div>
	);
}


import Header from "components/layout/Header";
import { Outlet, useLocation } from "react-router-dom";
import "swiper/css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastIcons } from "components/utils/toast-icons";
import { useAppState } from "components/utils/useAppState";
import "simplebar-react/dist/simplebar.min.css";
import Sidebar from "components/common/Sidebar";
import { useEffect, useRef } from "react";
import AuthHeader from "components/layout/AuthHeader";

function App() {
	const [{ isDark, userDetails, premiumStep, isExpanded }, setAppState] = useAppState();
	const isExpandedRef = useRef(isExpanded);

	const location = useLocation();
	const isAuthPage =
		location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/forgot-password";

	const isMinimalPage =
		isAuthPage || location.pathname === "/supplier-profile";

	// Keep ref in sync with state
	useEffect(() => {
		isExpandedRef.current = isExpanded;
	}, [isExpanded]);

	useEffect(() => {
		const savedState = localStorage.getItem("sidebarExpanded");
		setAppState({ isExpanded: window.innerWidth <= 1024 ? false : (savedState ? JSON.parse(savedState) : false), isMobile: window.innerWidth < 768 });

		const onResize = () => {
			setAppState({ isExpanded: window.innerWidth <= 1024 ? false : isExpandedRef.current, isMobile: window.innerWidth < 768 });
		};
		window.addEventListener("resize", onResize);
		return () => window.removeEventListener("resize", onResize);
	}, []);

	useEffect(() => {
		setAppState({ userDetails: JSON.parse(localStorage.getItem("auth") || "{}") });
		// Check for dark mode preference
		if (localStorage.theme === "dark") {
			setThemeMode(true);
			setAppState({ isDark: true });
		}
		if (window.matchMedia("(prefers-color-scheme: dark)").matches && localStorage?.theme === undefined) {
			setThemeMode(true);
			setAppState({ isDark: true });
		}
	}, []);

	const setThemeMode = (isDark: boolean) => {
		if (isDark) {
			document.documentElement.classList.add("dark");
			localStorage.theme = "dark";
		} else {
			document.documentElement.classList.remove("dark");
			localStorage.theme = "light";
		}
		setAppState({ isDark });
	};

	return (
		<div className="bg-bgc dark:bg-bgcDark flex flex-row justify-center w-full">
			<div className="w-full">
				<div className="flex flex-col w-full items-end relative">
					{/* <div
						className={`absolute  w-full h-[785px] sm:h-[818px] top-0 left-auto overflow-visible bg-no-repeat bg-position-[center_top] bg-[length:360%] sm:bg-[length:120%] bg-[url('/assets/images/bg/bg-header.png')]`}
					/>
					<div
						className={`absolute inset-0 bg-gradient-to-b from-bgc/0  to-bgc dark:from-bgcDark/70 dark:to-bgcDark h-[785px] sm:h-[818px]`}
					/> */}

					{/* Header Navigation */}
					<div className="flex w-full sm:text-base text-sm ">
						{!isMinimalPage ? <Sidebar /> : ""}
						{/* Main Content */}
						<main className={`z-[1] relative w-full`}>
							{!isMinimalPage ? <Header /> : <AuthHeader />}

							<Outlet />
						</main>
					</div>

					{/* Footer Section */}

					<ToastContainer
						// toastClassName={"!rounded-2xl"}
						icon={({ type }) => ToastIcons[type as keyof typeof ToastIcons]?.() || null}
					/>
				</div>
			</div>
		</div>
	);
}

export default App;

import React, { createContext, ReactNode, useContext, useEffect, useReducer } from "react";
import type { Dispatch, Reducer } from "react";

export const StateContext = createContext<any>({});

export const initialState: any = {
	isDark: false,
	isLoading: false,
	isUserDetails: false,
	userDetails: {},
	forecastTab: "Today",
	questionTabs: "General Information",
	premiumStep: 1,
	currentPremiumPlan: {},
	isMobile: window.innerWidth <= 768,
	supplierSearchQueries: [
		{ id: "country", label: "China" },
		{ id: "shippingTime", label: "1--3 Days" },
		{ id: "price", label: "$3 -- $12" },
		{ id: "payment", label: "Credit/Debit" },
		{ id: "certification", label: "ISO Certified" },
	],
	searchQuery: "",
};

let globalState: any = initialState;
let globalDispatch: Dispatch<any>;

export const getState = () => globalState;
export const getDispatch = () => globalDispatch;

export const StateProvider = function <I>({
	reducer,
	initialState,
	children,
}: {
	reducer: Reducer<any, any>;
	initialState: I;
	children: ReactNode;
}) {
	const [state, setAppState] = useReducer(reducer, initialState);
	useEffect(() => {
		globalState = state;
		globalDispatch = setAppState;
	}, [state]);
	return <StateContext.Provider value={[state, setAppState]}>{children}</StateContext.Provider>;
};

export const useAppState = () => useContext(StateContext);

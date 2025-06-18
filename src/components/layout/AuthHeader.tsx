import { useAppState } from "components/utils/useAppState";

export default function AuthHeader() {
	const [{ isDark, userDetails, isExpanded, isResponsiveMenu }, setAppState] = useAppState();

	return (
		<div className="flex sm:hidden bg-primary w-full items-center justify-center py-3 px-6">
			<img className="w-auto h-8" alt="Group" src="/assets/images/logo/logo-full.svg" />
		</div>
	);
}

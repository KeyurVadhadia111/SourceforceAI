interface IUser {
	name: string;
}
export interface MenuItemProps {
	url?: string;
	title: string;
	isHide?: boolean;
	onClick?: () => void;
	active?: boolean;
	icon?: string;
	className?: string;
	id: number;
}
export interface MenuProps {
	items: MenuItemProps[];
	children: any;
	isProfile?: boolean;
	className?: string;
}

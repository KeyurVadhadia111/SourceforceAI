import { Button } from "@headlessui/react";
import Modal from "components/layout/modal";
import React from "react";

interface Type {
    name: string
}

type DeletePopupProps = {
	isOpen: boolean;
	setIsOpen: (val: boolean) => void;
	name: Type | null;
	onConfirm: () => void;
	itemType: string;
	dataName?: string
};

const SentRfqPopup: React.FC<DeletePopupProps> = ({ isOpen, setIsOpen, onConfirm, itemType, dataName }) => {
	return (
		<Modal openModal={isOpen} setOpenModal={setIsOpen} size="500">
			<div className="text-center flex flex-col items-center gap-4 sm:gap-8">
				<h2 className="text-base sm:text-2xl font-semibold self-start text-text dark:text-textDark
                ">
					Send  {itemType}!
				</h2>

				<div className="flex flex-col items-center w-full gap-2 sm:gap-3">
					<p className="text-base sm:text-xl font-medium text-text dark:text-textDark">
						Are you sure you want to send RFQ to this supplier ?
					</p>
				</div>

				<div className="mt-2 sm:mt-0 flex justify-end w-full gap-3 sm:gap-6">
					<Button
						className="!w-full sm:!w-auto border border-text dark:border-bgc text-sm sm:text-base text-text dark:text-textDark !px-6 !py-3 sm:!px-6 sm:!py-4 !rounded-xl !font-semibold"
						onClick={() => setIsOpen(false)}
					>
						Cancel
					</Button>
					<Button
						className="!w-full sm:!w-auto bg-primary text-sm sm:text-base text-white !px-6 !py-3 sm:!px-6 sm:!py-4 !rounded-xl !font-semibold"
						onClick={() => {
							onConfirm();
							setIsOpen(false);
						}}
					>
						Send RFQ {itemType}
					</Button>
				</div>
			</div>
		</Modal>
	);
};

export default SentRfqPopup;


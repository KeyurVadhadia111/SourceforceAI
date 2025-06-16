import { yupResolver } from "@hookform/resolvers/yup";
import ProfileLayout from "components/common/ProfileLayout";
import Icon from "components/utils/Icon";
import { Input } from "components/utils/Input";
import { useAppState } from "components/utils/useAppState";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const ProfileSettingPage = () => {
	const [{ userDetails, isProfileSettingTab = true, isMobile }, setAppState] = useAppState();
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const [disableUserDetails, setDisableUserDetails] = useState({
		name: true,
		email: true,
		googleEmail: true,
		appleEmail: true,
	});

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const imageUrl = URL.createObjectURL(file);
			setSelectedImage(imageUrl);
		}
	};

	const schema = yup.object({
		email: yup.string().email("Invalid email").required("Email is required"),
		name: yup.string().required("Name is required"),
		googleEmail: yup.string().required("Google Email is required"),
		appleEmail: yup.string().required("Apple Email is required"),
	});
	type IProfileFormData = yup.InferType<typeof schema>;

	const {
		register,
		handleSubmit,
		reset,
		getValues,
		formState: { errors },
	} = useForm<IProfileFormData>({
		resolver: yupResolver(schema),
		defaultValues: {
			// remember: false,
			appleEmail: "smithenglish@apple.com",
			email: userDetails?.email || "smithenglish@gmail.com",
			googleEmail: "smithenglish@gmail.com",
			name: "Smith English",
		},
	});

	return (
		<ProfileLayout title="Profile" desc="Customize your profile settings.">
			<div className="flex items-center sm:gap-5 gap-4 relative self-stretch w-full flex-[0_0_auto]">
				<input
					type="file"
					name="imageUpload"
					id="imageUpload"
					className="hidden"
					accept="image/*"
					onChange={handleImageChange}
				/>
				{selectedImage ? (
					<label htmlFor="imageUpload" className="rounded-full sm:w-20 sm:h-20 w-12 h-12">
						<img src={selectedImage} alt="Preview" className="sm:w-20 sm:h-20 w-12 h-12 rounded-full" />
					</label>
				) : (
					<label htmlFor="imageUpload" className="rounded-full sm:w-20 sm:h-20 w-12 h-12">
						<img
							className="relative sm:w-20 sm:h-20 w-12 h-12 object-cover"
							alt="Ellipse"
							src="https://c.animaapp.com/wtIZUsNi/img/ellipse-10830@2x.png"
						/>
					</label>
				)}

				<div className="flex flex-col w-[180px] items-start gap-[2px] relative">
					<div className="text-text sm:text-2xl text-base leading-[150%] relative self-stretch [font-family:'Satoshi',Helvetica] font-medium tracking-[0]">
						{getValues("name")}
					</div>

					<div className="text-textSecondary sm:text-base text-xs leading-[150%] relative self-stretch [font-family:'Satoshi',Helvetica] font-medium tracking-[0] max-sm:truncate">
						{getValues("email")}
					</div>
				</div>

				<label
					htmlFor="imageUpload"
					className="absolute sm:w-8 sm:h-8 w-5 h-5 sm:top-[52px] sm:left-[52px] top-[32px] left-[32px] flex items-center justify-center bg-white rounded-full shadow-[0px_10px_35px_#0000000d]">
					<Icon icon="pen" className="sm:w-4 sm:h-4 w-2.5 h-2.5 text-text" />
				</label>
			</div>

			<div className="flex flex-col sm:flex-row items-start sm:gap-[30px] gap-3 relative flex-1 grow w-full">
				<div className="relative w-full">
					<Input
						icon="user"
						variant="secondaryTransparentIcon"
						disabled={disableUserDetails.name}
						{...register("name")}
						error={errors?.name?.message?.toString()}
					/>

					<div
						onClick={() => {
							disableUserDetails.name = false;
							setDisableUserDetails({ ...disableUserDetails });
						}}
						className="cursor-pointer absolute sm:right-6 right-[17px] sm:top-[18px] top-4 [font-family:'Satoshi',Helvetica] font-medium text-primary sm:text-sm text-xs tracking-[0] sm:leading-[21px] leading-[18px] underline underline-offset-2 whitespace-nowrap">
						Change
					</div>
				</div>
				<div className="relative w-full">
					<Input
						icon="envelope"
						variant="secondaryTransparentIcon"
						disabled={disableUserDetails.email}
						{...register("email")}
						error={errors?.email?.message?.toString()}
					/>

					<div
						onClick={() => {
							disableUserDetails.email = false;
							setDisableUserDetails({ ...disableUserDetails });
						}}
						className="cursor-pointer absolute sm:right-6 right-[17px] sm:top-[18px] top-4 [font-family:'Satoshi',Helvetica] font-medium text-primary sm:text-sm text-xs tracking-[0] sm:leading-[21px] leading-[18px] underline underline-offset-2 whitespace-nowrap">
						Change
					</div>
				</div>
			</div>

			<div className="flex flex-col items-start sm:gap-4 gap-3 relative self-stretch w-full flex-[0_0_auto]">
				<div className="text-textSecondary sm:text-base text-sm leading-[150%] relative self-stretch [font-family:'Satoshi',Helvetica] font-medium tracking-[0]">
					Connected Accounts
				</div>

				<div className="flex flex-col sm:flex-row items-start sm:gap-4 gap-3 relative self-stretch w-full flex-[0_0_auto]">
					<div className="relative w-full">
						<Input
							icon="google"
							variant="secondary"
							disabled={disableUserDetails.googleEmail}
							{...register("googleEmail")}
							error={errors?.googleEmail?.message?.toString()}
						/>

						<div
							onClick={() => {
								disableUserDetails.googleEmail = false;
								setDisableUserDetails({ ...disableUserDetails });
							}}
							className="cursor-pointer absolute sm:right-6 right-[17px] sm:top-[18px] top-4 [font-family:'Satoshi',Helvetica] font-medium text-primary sm:text-sm text-xs tracking-[0] sm:leading-[21px] leading-[18px] underline underline-offset-2 whitespace-nowrap">
							Change
						</div>
					</div>
					<div className="relative w-full">
						<Input
							icon="apple"
							variant="secondary"
							disabled={disableUserDetails.appleEmail}
							{...register("appleEmail")}
							error={errors?.appleEmail?.message?.toString()}
						/>

						<div
							onClick={() => {
								disableUserDetails.appleEmail = false;
								setDisableUserDetails({ ...disableUserDetails });
							}}
							className="cursor-pointer absolute sm:right-6 right-[17px] sm:top-[18px] top-4 [font-family:'Satoshi',Helvetica] font-medium text-primary sm:text-sm text-xs tracking-[0] sm:leading-[21px] leading-[18px] underline underline-offset-2 whitespace-nowrap">
							Change
						</div>
					</div>
				</div>
			</div>

			<div className="relative self-stretch w-full h-px bg-border" />

			<div className="flex flex-col sm:flex-row items-center sm:gap-[30px] gap-5 relative self-stretch w-full flex-[0_0_auto]">
				<div className="flex flex-col items-start sm:gap-2 gap-1.5 relative flex-1 grow">
					<div className="relative w-fit [font-family:'Satoshi',Helvetica] font-bold text-text sm:text-2xl text-base tracking-[0] sm:leading-[34px] leading-[22px] whitespace-nowrap">
						Delete Account
					</div>

					<p className="relative self-stretch [font-family:'Satoshi',Helvetica] font-normal text-textSecondary sm:text-base text-xs tracking-[0] leading-[150%]">
						Lorem Ipsum is simply dummy text of the printing and typesetting industry.
					</p>
				</div>

				<div className="max-sm:w-full inline-flex items-center justify-center gap-2.5 px-8 sm:py-4 py-[15px] relative flex-[0_0_auto] bg-[#db2222] rounded-[40px]">
					<div className="relative w-fit [font-family:'Satoshi',Helvetica] font-medium text-white sm:text-base text-xs tracking-[0] leading-[150%] whitespace-nowrap">
						Delete Account
					</div>
				</div>
			</div>
		</ProfileLayout>
	);
};

export default ProfileSettingPage;

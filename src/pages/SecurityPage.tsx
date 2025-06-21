import { yupResolver } from "@hookform/resolvers/yup";
import ProfileLayout from "components/common/ProfileLayout";
import { Button } from "components/utils/Button";
import { Input } from "components/utils/Input";
import { useAppState } from "components/utils/useAppState";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

const SecurityPage = () => {
	const [{ isDark, userDetails }, setAppState] = useAppState();

	const schema = yup.object({
		oldPassword: yup.string().required("Old Password is required"),
		newPassword: yup.string().required("New Password is required"),
		confirmPassword: yup
			.string()
			.required("Please confirm your password")
			.oneOf([yup.ref("newPassword")], "Passwords must match"),
	});
	type IChangePwdFormData = yup.InferType<typeof schema>;

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<IChangePwdFormData>({
		resolver: yupResolver(schema),
		defaultValues: {},
	});

	const onSubmit: SubmitHandler<IChangePwdFormData> = data => {
		userDetails.password = data.newPassword;
		setAppState({ userDetails: userDetails });
		toast.success("Password Changed successful!");
		reset();
	};
	return (
		<ProfileLayout title="Security" desc="Change your Password">
			<form
				action=""
				method="post"
				onSubmit={handleSubmit(onSubmit)}
				className="w-full flex flex-col sm:gap-[30px] gap-4">
				<div className="w-full flex flex-col sm:gap-6 gap-4">
					<Input
						icon={isDark ? "lock-key-dark" : "lock-key"}
						variant="secondaryTransparentIcon"
						type="password"
						placeholder="Enter Old password"
						{...register("oldPassword")}
						error={errors?.oldPassword?.message?.toString()}
						className="sm:!pl-[62px] !pl-[50px]"
					/>
					<Input
						icon={isDark ? "lock-key-dark" : "lock-key"}
						variant="secondaryTransparentIcon"
						type="password"
						placeholder="Enter new password"
						{...register("newPassword")}
						error={errors?.newPassword?.message?.toString()}
						className="sm:!pl-[62px] !pl-[50px]"
					/>
					<Input
						icon={isDark ? "lock-key-dark" : "lock-key"}
						variant="secondaryTransparentIcon"
						type="password"
						placeholder="Confirm new password"
						{...register("confirmPassword")}
						error={errors?.confirmPassword?.message?.toString()}
						className="sm:!pl-[62px] !pl-[50px]"
					/>
				</div>
				<Button type="submit" className="w-fit !px-[49px] sm:!px-14 sm:!py-4 !py-[13.5px] !border-0">
					<div className="[font-family:'Satoshi',Helvetica] sm:text-base leading-[150%] sm:font-bold font-medium text-sm ">
						Save
					</div>
				</Button>
			</form>
		</ProfileLayout>
	);
};

export default SecurityPage;

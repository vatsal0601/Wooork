import { AtSymbolIcon, InboxIcon, PhoneIcon } from "@heroicons/react/solid";

const DashboardProfile = ({ Image }) => {
	return (
		<div className="flex items-start justify-center gap-3 lg:gap-5">
			<img
				src={Image}
				alt="Image1"
				className="w-36 lg:w-48 xl:w-52 h-36 lg:h-48 xl:h-52 p-1 border-2 border-blue-600 object-cover flex-shrink-0 rounded-full"
			/>
			<div className="space-y-3 lg:space-y-5">
				<div>
					<h1 className="font-semibold text-xl lg:text-2xl xl:text-3xl">Vatsal Sakariya</h1>
					<div className="text-sm lg:text-base xl:text-lg text-gray-600 flex items-end gap-1">
						<AtSymbolIcon className="w-5 h-5" />
						<p>vatsal0601</p>
					</div>
				</div>
				<div className="space-y-1">
					<div className="text-sm lg:text-base xl:text-lg text-gray-600 flex items-center gap-1">
						<InboxIcon className="w-5 h-5" />
						<p>vsakariya8@gmail.com</p>
					</div>
					<div className="text-sm lg:text-base xl:text-lg text-gray-600 flex items-center gap-1">
						<PhoneIcon className="w-5 h-5" />
						<p>9484695551</p>
					</div>
					<div className="text-sm lg:text-base xl:text-lg text-blue-600">Instagram, Twitter</div>
					<div className="text-sm lg:text-base xl:text-lg text-gray-600 font-semibold max-w-prose">
						#FrontendDevelopment, #BackendDevelopment, #MachineLearning
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardProfile;

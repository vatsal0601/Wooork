import { ExclamationCircleIcon } from "@heroicons/react/solid";

const PhoneInput = ({ setPhone, isPhoneError }) => {
	return (
		<div>
			<label htmlFor="phone" className="block font-semibold text-gray-600 text-sm lg:text-base">
				Phone <span className="text-red-600">*</span>
			</label>
			<input
				type="text"
				name="phone"
				placeholder="Phone"
				onChange={(e) => setPhone(e.target.value)}
				className="p-3 w-full focus:ring-3 ring-blue-600 text-sm lg:text-base truncate border-gray-300 placeholder-gray-400 focus:outline-none rounded-md"
			/>
			{isPhoneError && (
				<p className="inline-flex items-center gap-1 font-semibold text-red-600 text-sm lg:text-base">
					<ExclamationCircleIcon className="w-4 lg:w-5 h-4 lg:h-5" />
					Please enter a valid number
				</p>
			)}
		</div>
	);
};

export default PhoneInput;

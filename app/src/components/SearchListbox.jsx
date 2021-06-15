import { Fragment, useState } from "react";
import { Listbox } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

const search = ["Projects", "Profile"];

const SearchListbox = () => {
	const [selected, setSelected] = useState(search[0]);

	return (
		<div className="w-32">
			<Listbox value={selected} onChange={setSelected}>
				<div className="relative">
					<Listbox.Button className="relative w-full py-3 pl-3 pr-10 text-left bg-white rounded-md shadow-md cursor-pointer focus:ring-2 ring-blue-600 focus:outline-none">
						<span className="block truncate text-sm lg:text-base">{selected}</span>
						<span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
							<SelectorIcon className="w-5 h-5 text-gray-400" />
						</span>
					</Listbox.Button>
					<Listbox.Options className="absolute w-full py-2 mt-1 overflow-auto bg-white rounded-md shadow-md max-h-60 focus:outline-none">
						{search.map((value, index) => (
							<Listbox.Option
								key={index}
								className={({ active }) =>
									`${active ? "text-blue-600 bg-blue-100" : "text-black"}
                          cursor-pointer select-none relative py-2 pl-3`
								}
								value={value}>
								{({ selected, active }) => (
									<>
										<span
											className={`${
												selected ? "font-medium" : "font-normal"
											} text-sm lg:text-base block truncate`}>
											{value}
										</span>
										{selected ? (
											<span
												className={`${active ? "text-blue-600" : "text-blue-600"}
                                absolute inset-y-0 right-0 flex items-center pr-3`}>
												<CheckIcon className="w-5 h-5" />
											</span>
										) : null}
									</>
								)}
							</Listbox.Option>
						))}
					</Listbox.Options>
				</div>
			</Listbox>
		</div>
	);
};

export default SearchListbox;

import { useEffect, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";

const ExploreLeftContainer = ({ title, list, handleChange }) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => {
		setIsOpen(!isOpen);
	};

	const hideMenu = () => {
		if (window.innerWidth > 768) {
			setIsOpen(true);
		}
	};

	useEffect(() => {
		window.addEventListener("resize", hideMenu);

		return () => {
			window.removeEventListener("resize", hideMenu);
		};
	});

	useEffect(() => {
		hideMenu();
	}, []);

	return (
		<div className="bg-white p-3 md:w-64 sticky top-3 flex-shrink-0 h-full space-y-3 rounded-md">
			<div className="flex items-center justify-between md:justify-center">
				<h1 className="uppercase font-semibold">{title}</h1>
				<ChevronDownIcon onClick={toggle} className="w-5 h-5 cursor-pointer md:hidden" />
			</div>
			<div className={isOpen ? "space-y-3" : "hidden"}>
				{list &&
					list.length > 0 &&
					list.map((element, index) => (
						<label key={index} className="flex items-center">
							<input
								type="checkbox"
								checked={element.selected}
								onChange={(e) => handleChange(index, e.target.checked)}
								className="h-5 w-5 rounded-md border-gray-400 focus:ring-2 ring-blue-600 focus:outline-none"
							/>
							<span className="ml-3">{element.name}</span>
						</label>
					))}
			</div>
		</div>
	);
};

export default ExploreLeftContainer;

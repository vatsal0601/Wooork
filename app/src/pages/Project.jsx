import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "../axios";

const Project = () => {
	const { id } = useParams();
	const [data, setData] = useState({});

	useEffect(() => {
		const fetchData = async () => {
			const req = await axios.get(`/project/${id}`);
			setData(req.data);
		};
		fetchData();
		document.title = "Project";
	}, [id]);

	return (
		<div className="container mx-auto px-5 md:px-10 my-28 space-y-5 lg:space-y-7">
			<h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-blue-600 text-center my-5">
				{data.project_name}
			</h1>
			<div className="space-y-5 lg:space-y-0 lg:flex items-center gap-7">
				<img src={data.image} alt={data.project_name} className="rounded-md" />
				<div className="space-y-5 lg:space-y-7">
					<ul className="space-y-5">
						<li className="lg:text-lg xl:text-xl">
							<span className="font-semibold text-sm block text-gray-600 lg:text-base xl:text-lg -mb-1">
								Owner Name:{" "}
							</span>
							{data.owner_name}
						</li>
						<li className="lg:text-lg xl:text-xl">
							<span className="font-semibold text-sm block text-gray-600 lg:text-base xl:text-lg -mb-1">
								URL:{" "}
							</span>
							<a href={data.url}>{data.url}</a>
						</li>
						{data.collaborators && data.collaborators.length > 0 && (
							<li className="lg:text-lg xl:text-xl">
								<span className="font-semibold text-sm block text-gray-600 lg:text-base xl:text-lg -mb-1">
									Collaborators:{" "}
								</span>
								{data.collaborators.map((name, index) => (
									<span key={index}>
										{name}
										{index !== data.collaborators.length - 1 && ", "}
									</span>
								))}
							</li>
						)}
						<li className="lg:text-lg xl:text-xl">
							<span className="font-semibold text-sm block text-gray-600 lg:text-base xl:text-lg -mb-1">
								Project Status:{" "}
							</span>
							{data.project_status}
						</li>
					</ul>
				</div>
			</div>
			<p className="lg:text-lg xl:text-xl max-w-prose">
				<span className="font-semibold text-sm block text-gray-600 lg:text-base xl:text-lg -mb-1">
					Description:{" "}
				</span>
				{data.description}
			</p>
			<button className="px-5 py-3 rounded-md active:bg-blue-600 active:text-white transition-colors text-sm lg:text-base xl:text-lg font-semibold border-2 border-blue-600 focus:outline-none">
				Send Collaboration Request
			</button>
		</div>
	);
};

export default Project;

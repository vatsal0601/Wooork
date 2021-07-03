import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../axios";

const Profile = () => {
	const { id } = useParams();

	const [user, setUser] = useState({});

	useEffect(() => {
		document.title = "Profile";

		const fetchData = async () => {
			const req = await axios.get(`/user/${id}`);
			setUser(req.data);
		};
		fetchData();
	}, [id]);

	return (
		<div className="container mx-auto px-5 md:px-10 my-28 space-y-5 md:space-y-0 md:flex items-start justify-center gap-3 lg:gap-10">
			<ul className="space-y-5">
				<li className="lg:text-lg xl:text-xl">
					<span className="font-semibold text-sm block text-gray-600 lg:text-base xl:text-lg">
						Profile Picture:{" "}
					</span>
					<img
						src={user.avatar}
						alt={user.name}
						className="w-36 lg:w-48 xl:w-52 h-36 lg:h-48 xl:h-52 object-cover rounded-md"
					/>
				</li>
				<li className="lg:text-lg xl:text-xl">
					<span className="font-semibold text-sm block text-gray-600 lg:text-base xl:text-lg -mb-1">
						Name:{" "}
					</span>
					{user.name}
				</li>
				<li className="lg:text-lg xl:text-xl">
					<span className="font-semibold text-sm block text-gray-600 lg:text-base xl:text-lg -mb-1">
						Username:{" "}
					</span>
					<a href={user.URL}>{user.username}</a>
				</li>
				<li className="lg:text-lg xl:text-xl">
					<span className="font-semibold text-sm block text-gray-600 lg:text-base xl:text-lg -mb-1">
						Email:{" "}
					</span>
					<a href={`mailto:${user.email}`}>{user.email}</a>
				</li>
				<li className="lg:text-lg xl:text-xl">
					<span className="font-semibold text-sm block text-gray-600 lg:text-base xl:text-lg -mb-1">
						Phone:{" "}
					</span>
					<a href={`tel:${user.phone}`}>{user.phone}</a>
				</li>
				{user.skills && user.skills.length > 0 && (
					<li className="lg:text-lg xl:text-xl">
						<span className="font-semibold text-sm block text-gray-600 lg:text-base xl:text-lg max-w-prose -mb-1">
							Skills:{" "}
						</span>
						{user.skills.map((element, index) => (
							<span key={index}>
								#{element}
								{index !== user.skills.length - 1 && ", "}
							</span>
						))}
					</li>
				)}
				{user.social_links && user.social_links.length > 0 && (
					<li className="lg:text-lg xl:text-xl text-blue-600">
						<span className="font-semibold text-sm block text-gray-600 lg:text-base xl:text-lg max-w-prose -mb-1">
							Social Links:{" "}
						</span>
						{user.social_links.map((social, index) => (
							<a key={index} href={social.link}>
								{social.app_name}
								{index !== user.social_links.length - 1 && ", "}
							</a>
						))}
					</li>
				)}
			</ul>
			<ul className="space-y-5">
				{user.education && user.education.length > 0 && (
					<li className="lg:text-lg xl:text-xl">
						<span className="font-semibold text-sm block text-gray-600 lg:text-base xl:text-lg -mb-1">
							Education:{" "}
						</span>
						<ul className="space-y-3">
							{user.education.map((field, index) => (
								<li key={index}>
									<p>{field.institute_name}</p>
									<p className="text-gray-600">
										{field.qualification} in {field.graduation_field}
									</p>
									<p className="text-sm lg:text-base xl:text-lg text-gray-600">
										{field.year_of_graduation}
									</p>
								</li>
							))}
						</ul>
					</li>
				)}
				{user.experience && user.experience.length > 0 && (
					<li className="lg:text-lg xl:text-xl">
						<span className="font-semibold text-sm block text-gray-600 lg:text-base xl:text-lg -mb-1">
							Work Experience:{" "}
						</span>
						<ul className="space-y-3">
							{user.experience.map((field, index) => (
								<li key={index}>
									<p>{field.company_name}</p>
									<p className="text-gray-600">
										{field.role} for {field.duration}
									</p>
									<p className="text-sm lg:text-base xl:text-lg text-gray-600">
										{field.work_description}
									</p>
								</li>
							))}
						</ul>
					</li>
				)}
			</ul>
		</div>
	);
};

export default Profile;

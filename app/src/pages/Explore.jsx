import { useEffect, useState } from "react";
import axios from "../axios";
import Search from "../components/Search";
import LeftContainer from "../components/ExploreLeftContainer";
import RightContainer from "../components/ExploreRightContainer";

const Explore = () => {
	const search = ["Projects", "Profiles"];
	const [selected, setSelected] = useState(search[0]);
	const [title, setTitle] = useState("");
	const [list, setList] = useState([]);
	const [selectedList, setSelectedList] = useState([]);
	const [data, setData] = useState([]);
	const [inputSearch, setInputSearch] = useState("");

	useEffect(() => {
		document.title = "Explore";
	}, []);

	useEffect(() => {
		const createObjectArray = (data) => {
			const list = [];
			for (let value of data) {
				list.push({
					name: value,
					selected: false,
				});
			}
			return list;
		};

		const fetchData = async () => {
			let req;
			switch (selected) {
				case "Projects":
					setTitle("Tags");
					try {
						req = await axios.get("/project/tags");
						setList(createObjectArray(req.data));
						setSelectedList([]);
					} catch (err) {
						console.error(err);
					}
					break;
				case "Profiles":
					setTitle("Skills");
					try {
						req = await axios.get("/user/skills");
						setList(createObjectArray(req.data));
						setSelectedList([]);
					} catch (err) {
						console.error(err);
					}
					break;
				default:
					break;
			}
		};
		fetchData();
	}, [selected]);

	useEffect(() => {
		const handleFetchData = async (array) => {
			let req;
			switch (selected) {
				case "Projects":
					try {
						req = await axios.get(`/project/search/${array.map((value) => `${value}`).join("&")}`);
						setData(req.data);
					} catch (err) {
						console.error(err);
					}
					break;
				case "Profiles":
					try {
						req = await axios.get(`/user/search/${array.map((value) => `${value}`).join("&")}`);
						setData(req.data);
					} catch (err) {
						console.error(err);
					}
					break;
				default:
					break;
			}
		};
		if (list.length > 0) {
			const array = list.map((element) => element.name);
			if (selectedList.length <= 0) handleFetchData(array);
			else handleFetchData(selectedList);
		}
	}, [selected, list, selectedList]);

	const handleCheckbox = async (index, value) => {
		const newList = [...list];
		newList[index] = { name: newList[index].name, selected: value };
		const selectedArray = [];
		for (let element of newList) if (element.selected) selectedArray.push(element.name);
		setSelectedList(selectedArray);
		setList(newList);
	};

	return (
		<div className="container mx-auto px-5 md:px-10 my-28">
			<Search
				search={search}
				selected={selected}
				setSelected={setSelected}
				setInputSearch={setInputSearch}
			/>
			<div className="flex gap-6 flex-col md:flex-row">
				<LeftContainer title={title} list={list} handleChange={handleCheckbox} />
				<RightContainer selected={selected} data={data} search={inputSearch} />
			</div>
		</div>
	);
};

export default Explore;

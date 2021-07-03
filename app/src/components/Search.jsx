import Dropdown from "./Dropdown";

const Search = ({ search, selected, setSelected, setInputSearch }) => {
	return (
		<div>
			<form className="flex items-center justify-center gap-3 my-28">
				<Dropdown list={search} selected={selected} setSelected={setSelected} />
				<input
					type="text"
					name="search"
					placeholder={selected === "Profiles" ? "Search for names" : "Search for projects"}
					onChange={(e) => setInputSearch(e.target.value)}
					className="p-3 w-full md:w-3/5 focus:ring-3 ring-blue-600 text-sm lg:text-base truncate border-transparent placeholder-gray-600 focus:placeholder-gray-400 focus:outline-none rounded-md shadow-md focus:shadow-sm"
				/>
			</form>
		</div>
	);
};

export default Search;

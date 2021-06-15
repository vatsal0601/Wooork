import ListBox from "./SearchListbox";

const Search = () => {
	return (
		<div>
			<form className="flex items-center justify-center gap-3 my-28">
				<ListBox />
				<input
					type="text"
					name="search"
					placeholder="Search for usernames or projects"
					className="p-3 w-full md:w-3/5 focus:ring-3 ring-blue-600 text-sm lg:text-base truncate border-transparent placeholder-gray-600 focus:placeholder-gray-400 focus:outline-none rounded-md shadow-md focus:shadow-sm"
				/>
			</form>
		</div>
	);
};

export default Search;

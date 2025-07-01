export const SearchBar = ({ searchTerm, handleResetBtn, handleSearch }) => {
  return (
    <div className="flex justify-center items-center mb-4">
      <input
        type="search"
        placeholder="Search movie..."
        className=" mx-2 p-4 rounded-md text-xl text-stone-500"
        value={searchTerm}
        onChange={handleSearch}
      />
      <button
        onClick={handleResetBtn}
        className="font-xl hover:scale-110 transition-transform rounded-md px-8 py-4 bg-gray-500 text-white-200 active:bg-blue-500 "
      >
        All
      </button>
    </div>
  );
};

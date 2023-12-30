import SearchUserCard from './SearchUserCard';

const Search = () => {
  return (
    <div className='w-80 h-screen pt-10 pb-20 shadow-sm shadow-[#222]'>
      <div className='px-3 pb-5'>
        <h1 className='text-xl pb-5'>Search</h1>
        <input
          type='search'
          placeholder='Search...'
          className='border-none outline-none rounded-md bg-slate-200 py-2 px-3 text-xs w-full'
        />
      </div>

      <hr />

      <div className='h-full overflow-y-scroll px-3 pt-5 pb-14'>
        {new Array(14).fill(1).map((_, index) => (
          <SearchUserCard key={index} index={index + 1} />
        ))}
      </div>
    </div>
  );
};

export default Search;

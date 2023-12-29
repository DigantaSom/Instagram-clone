const SuggestionCard = () => {
  return (
    <div className='flex justify-between'>
      <div className='flex items-center'>
        <img
          src='https://cdn.pixabay.com/photo/2023/11/22/20/31/snowman-8406382_1280.jpg'
          alt='Profile'
          className='w-9 h-9 rounded-full'
        />
        <div className='ml-2'>
          <p className='text-sm font-semibold'>username</p>
          <p className='text-sm font-semibold opacity-70'>Follows you</p>
        </div>
      </div>

      <p className='text-blue-700 text-sm font-semibold'>Follow</p>
    </div>
  );
};

export default SuggestionCard;

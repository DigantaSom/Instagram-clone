const StoryCircle = () => {
  return (
    <div className='flex flex-col items-center hover:cursor-pointer'>
      <img
        src='https://cdn.pixabay.com/photo/2023/09/24/14/05/dog-8272860_1280.jpg'
        alt='Story'
        className='w-16 h-16 rounded-full'
      />
      <p>username</p>
    </div>
  );
};

export default StoryCircle;

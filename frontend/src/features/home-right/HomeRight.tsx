import SuggestionCard from './SuggestionCard';

const HomeRight = () => {
  return (
    <div className=''>
      <div>
        <div>
          <div className='flex items-center space-x-3'>
            <div>
              <img
                src='https://cdn.pixabay.com/photo/2023/10/24/10/13/insect-8337915_1280.jpg'
                alt='Profile'
                className='w-12 h-12 rounded-full'
              />
            </div>
            <div>
              <p>Full Name</p>
              <p className='opacity-70'>username</p>
            </div>
          </div>

          <div className='mt-10 space-y-5'>
            {[1, 1, 1, 1, 1, 1].map((user, idx) => (
              <SuggestionCard key={idx} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeRight;

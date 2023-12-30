import StoryCircle from '../features/story/StoryCircle';
import PostCard from '../features/post/PostCard';
import HomeRight from '../features/home-right/HomeRight';

const HomePage = () => {
  return (
    <div>
      <div className='mt-10 flex justify-center'>
        <div className='w-[44%] px-10'>
          {/* Stories */}
          <div className='flex space-x-2 justify-start w-full border p-4 rounded-md overflow-x-scroll'>
            {[1, 1, 1, 1, 1, 1, 1].map((item, idx) => (
              <StoryCircle key={idx} />
            ))}
          </div>

          {/* Posts */}
          <div className='space-y-10 w-full mt-10'>
            {[1, 1].map((post, idx) => (
              <PostCard key={idx} />
            ))}
          </div>
        </div>

        <div className='w-[27%]'>
          <HomeRight />
        </div>
      </div>
    </div>
  );
};

export default HomePage;

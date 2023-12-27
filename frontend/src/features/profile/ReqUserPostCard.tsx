import { AiFillHeart } from 'react-icons/ai';
import { FaComment } from 'react-icons/fa';

const ReqUserPostCard = () => {
  return (
    <div className='relative w-60 h-60 overflow-hidden group border flex items-center justify-center'>
      <img
        src='https://cdn.pixabay.com/photo/2023/12/08/07/27/woman-8437007_1280.jpg'
        alt='Post'
      />
      <div className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100 hover:cursor-pointer'>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] text-white text-center font-medium flex justify-between'>
          <div>
            <AiFillHeart /> <span>10</span>
          </div>
          <div>
            <FaComment /> <span>30</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReqUserPostCard;

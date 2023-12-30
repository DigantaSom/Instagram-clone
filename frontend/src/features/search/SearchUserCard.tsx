import { FC } from 'react';

interface SearchUserCardProps {
  index: number;
}

const SearchUserCard: FC<SearchUserCardProps> = ({ index }) => {
  return (
    <div className='py-2 flex items-center hover:cursor-pointer'>
      <img
        src='https://cdn.pixabay.com/photo/2023/07/29/06/28/bird-8156308_1280.jpg'
        alt='Profile'
        className='w-10 h-10 rounded-full'
      />
      <div className='ml-3'>
        <p>Full Name</p>
        <p className='opacity-70'>username {index}</p>
      </div>
    </div>
  );
};

export default SearchUserCard;

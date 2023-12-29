import { useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { BsThreeDots } from 'react-icons/bs';

import PostActions from './PostActions';
import CommentModal from '../comment/CommentModal';
import CommentInputBox from '../comment/CommentInputBox';

const PostCard = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClickDropdown = () => {
    setShowDropdown(prev => !prev);
  };

  const handleOpenCommentModal = () => {
    onOpen();
  };

  return (
    <div>
      <div className='border rounded-md w-full'>
        {/* Post Top Information */}
        <div className='flex items-center justify-between w-full px-5 py-4'>
          <div className='flex items-center'>
            <img
              src='https://cdn.pixabay.com/photo/2023/12/09/10/10/woman-8439003_1280.png'
              alt='Profile'
              className='w-12 h-12 rounded-full'
            />
            <div className='pl-2'>
              <p className='font-semibold text-sm'>username</p>
              <p className='font-thin text-sm'>location</p>
            </div>
          </div>
          <div className='relative inline-block'>
            <BsThreeDots
              onClick={handleClickDropdown}
              className='inline-block hover:cursor-pointer'
            />
            <div className='absolute right-0 z-10'>
              {showDropdown && (
                <p className='bg-black text-white px-4 py-1 rounded-md hover:cursor-pointer'>
                  Delete
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Post Image */}
        <div className='w-full'>
          <img
            src='https://cdn.pixabay.com/photo/2023/09/29/07/52/ocean-8283187_1280.jpg'
            alt='Post'
            className='w-full'
          />
        </div>

        {/* Post Actions */}
        <PostActions
          parent='PostCard'
          handleClickCommentButton={handleOpenCommentModal}
        />

        {/* Display like and comment numbers */}
        <div className='w-full py-2 px-5'>
          <p>10 likes</p>
          <p className='opacity-50 py-2 hover:cursor-pointer'>
            view all 23 comments
          </p>
        </div>

        <CommentInputBox parent='PostCard' />
      </div>

      <CommentModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export default PostCard;

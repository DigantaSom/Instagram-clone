import { useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

const CommentCard = () => {
  const [isCommentLiked, setIsCommentLiked] = useState(false);

  const handleToggleLike = () => {
    setIsCommentLiked(prev => !prev);
  };

  return (
    <div>
      <div className='flex items-center justify-between py-5'>
        <div className='flex items-center'>
          <div>
            <img
              src='https://images.pexels.com/photos/8530923/pexels-photo-8530923.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load'
              alt='Profile'
              className='w-9 h-9 rounded-full'
            />
          </div>
          <div className='ml-3'>
            <p>
              <span className='font-semibold'>username</span>
              <span className='ml-2'>Nice Post, man!</span>
            </p>
            <div className='flex items-center space-x-3 text-sm opacity-60 pt-2'>
              <span>1 min ago</span>
              <span>10 likes</span>
            </div>
          </div>
        </div>

        {isCommentLiked ? (
          <AiFillHeart
            onClick={handleToggleLike}
            className='text-red-500 text-xs hover:opacity-50 hover:cursor-pointer'
          />
        ) : (
          <AiOutlineHeart
            onClick={handleToggleLike}
            className='text-xs hover:opacity-50 hover:cursor-pointer'
          />
        )}
      </div>
    </div>
  );
};

export default CommentCard;

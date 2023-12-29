import { FC, useState } from 'react';

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { FaRegComment } from 'react-icons/fa';
import { RiSendPlaneLine } from 'react-icons/ri';

interface PostActionsProps {
  parent: 'PostCard' | 'CommentModal';
  handleClickCommentButton: () => void;
}

const PostActions: FC<PostActionsProps> = ({
  parent,
  handleClickCommentButton,
}) => {
  const [isPostLiked, setIsPostLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handlePostLike = () => {
    setIsPostLiked(prev => !prev);
  };

  const handleBookmarkPost = () => {
    setIsBookmarked(prev => !prev);
  };

  return (
    <div
      className={`flex items-center justify-between w-full py-4 ${
        parent === 'PostCard' && 'px-5'
      }`}
    >
      <div className='flex items-center space-x-2'>
        {isPostLiked ? (
          <AiFillHeart
            onClick={handlePostLike}
            className='text-red-500 text-2xl hover:opacity-50 hover:cursor-pointer'
          />
        ) : (
          <AiOutlineHeart
            onClick={handlePostLike}
            className='text-2xl hover:opacity-50 hover:cursor-pointer'
          />
        )}
        <FaRegComment
          onClick={handleClickCommentButton}
          className='text-xl hover:opacity-50 hover:cursor-pointer'
        />
        <RiSendPlaneLine className='text-xl hover:opacity-50 hover:cursor-pointer' />
      </div>
      <div>
        {isBookmarked ? (
          <BsBookmarkFill
            onClick={handleBookmarkPost}
            className='text-xl hover:opacity-50 hover:cursor-pointer'
          />
        ) : (
          <BsBookmark
            onClick={handleBookmarkPost}
            className='text-xl hover:opacity-50 hover:cursor-pointer'
          />
        )}
      </div>
    </div>
  );
};

export default PostActions;

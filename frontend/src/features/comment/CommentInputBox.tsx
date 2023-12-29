import { FC } from 'react';
import { BsEmojiSmile } from 'react-icons/bs';

interface CommentInputBoxProps {
  parent: 'PostCard' | 'CommentModal';
}

const CommentInputBox: FC<CommentInputBoxProps> = ({ parent }) => {
  return (
    <div className={`${parent === 'PostCard' ? 'border-t' : 'border'}`}>
      <div className='flex items-center px-5'>
        <BsEmojiSmile />
        <input
          type='text'
          placeholder='Add a comment...'
          className='border-none outline-none w-full px-2 py-3'
        />
      </div>
    </div>
  );
};

export default CommentInputBox;

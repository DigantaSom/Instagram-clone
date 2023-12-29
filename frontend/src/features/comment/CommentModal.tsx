import { FC } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalBody } from '@chakra-ui/react';
import { BsThreeDots } from 'react-icons/bs';

import CommentCard from './CommentCard';
import PostActions from '../post/PostActions';
import CommentInputBox from './CommentInputBox';

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CommentModal: FC<CommentModalProps> = ({ isOpen, onClose }) => {
  return (
    <div>
      <Modal size={'4xl'} isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <div className='h-[75vh] flex space-x-10'>
              <div className='w-[45%] flex flex-col justify-center'>
                <img
                  src='https://images.pexels.com/photos/18940528/pexels-photo-18940528/free-photo-of-stadtmitte.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load'
                  alt='Post'
                  className='max-h-full w-full'
                />
              </div>
              <div className='w-[55%] relative'>
                <div className='flex items-center justify-between py-5'>
                  <div className='flex items-center'>
                    <div>
                      <img
                        src='https://cdn.pixabay.com/photo/2023/12/09/10/10/woman-8439003_1280.png'
                        alt='Profile'
                        className='w-9 h-9 rounded-full'
                      />
                    </div>
                    <div className='ml-2'>
                      <p>username</p>
                    </div>
                  </div>
                  <BsThreeDots />
                </div>

                <hr />

                {/* FIXME: mouse-wheel scroll not working here, but it's fine with scrollbar */}
                <div className='max-h-[45vh] overflow-y-scroll'>
                  {[1, 1, 1, 1, 1].map((comment, idx) => (
                    <CommentCard key={idx} />
                  ))}
                </div>

                <div className='absolute bottom-0 w-full'>
                  <PostActions
                    parent='CommentModal'
                    handleClickCommentButton={() => {}}
                  />

                  <div className='py-2'>
                    <p>10 likes</p>
                    <p className='opacity-50 text-sm'>1 min ago</p>
                  </div>

                  <CommentInputBox parent='CommentModal' />
                </div>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CommentModal;

import { FC, useState, DragEvent, ChangeEvent } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import { FaPhotoVideo } from 'react-icons/fa';
import { GrEmoji } from 'react-icons/gr';
import { GoLocation } from 'react-icons/go';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreatePostModal: FC<CreatePostModalProps> = ({ isOpen, onClose }) => {
  // eslint-disable-next-line
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState('');

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setIsDraggedOver(true);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (
      droppedFile.type.startsWith('image/') ||
      droppedFile.type.startsWith('video/')
    ) {
      setFile(droppedFile);
    }
  };

  const handleDragLeave = () => {
    setIsDraggedOver(false);
  };

  const handleOnChangeFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = e.target.files;
    const file: File | null = files ? files[0] : null;

    if (
      file &&
      (file.type.startsWith('image/') || file.type.startsWith('video/'))
    ) {
      setFile(file);
    } else {
      setFile(null);
      alert('Please select an Image or Video to post');
    }
  };

  const handleOnChangeCaption = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCaption(e.target.value);
  };

  const handleCloseModal = () => {
    setFile(null);
    setCaption('');
    onClose();
  };

  return (
    <div>
      <Modal size='4xl' onClose={handleCloseModal} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <div className='flex justify-between items-center px-10 py-1'>
            <p>Create New Post</p>
            <Button variant='ghost' size='sm' colorScheme='blue'>
              Share
            </Button>
          </div>

          <hr />

          <ModalBody>
            <div
              className={`${
                file ? 'max-h-[70vh]' : 'h-[50vh]'
              } flex justify-between pb-5`}
            >
              {/* Left side */}
              <div className='w-1/2 flex justify-center border-r pr-4'>
                {!file && (
                  <div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onDragLeave={handleDragLeave}
                    className='h-full flex flex-col justify-center items-center p-8 text-lg text-[#999] rounded-md hover:cursor-pointer'
                  >
                    <div>
                      <FaPhotoVideo className='w-full text-3xl' />
                      <p className='m-0 mb-4'>Drag photos or videos here</p>
                    </div>
                    <label
                      htmlFor='file-upload'
                      className='px-4 py-2 font-semibold text-white rounded-md bg-[#3897f0] hover:bg-[#2684f0] border border-[#3897f0] hover:border-[#2684f0] hover:cursor-pointer'
                    >
                      Select File
                    </label>
                    <input
                      type='file'
                      id='file-upload'
                      accept='image/*,video/*'
                      onChange={handleOnChangeFileInput}
                      className='hidden'
                    />
                  </div>
                )}

                {file && (
                  <img
                    src={URL.createObjectURL(file)}
                    alt='File'
                    className='max-h-full'
                  />
                )}
              </div>

              {/* Right side */}
              <div className='w-1/2'>
                <div className='pl-4 flex items-center space-x-4'>
                  <img
                    src='https://cdn.pixabay.com/photo/2023/06/02/14/10/woman-8035746_1280.jpg'
                    alt='Profile'
                    className='w-7 h-7 rounded-full'
                  />
                  <p className='font-semibold'>username</p>
                </div>
                <div className='pl-4'>
                  <textarea
                    rows={8}
                    placeholder='Write a caption'
                    maxLength={2200}
                    onChange={handleOnChangeCaption}
                    className='w-full mt-1 outline-none resize-none text-sm'
                  ></textarea>
                </div>
                <div className='pl-4 flex justify-between items-center'>
                  <GrEmoji />
                  <p className='text-sm opacity-70'>{caption.length} / 2,200</p>
                </div>
                <hr className='mt-2' />
                <div className='py-2 pl-4 flex justify-between items-center space-x-2'>
                  <input
                    type='text'
                    placeholder='Location'
                    className='outline-none w-full'
                  />
                  <GoLocation />
                </div>
                <hr />
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CreatePostModal;

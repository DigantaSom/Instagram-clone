import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDisclosure } from '@chakra-ui/react';
import { IoReorderThree } from 'react-icons/io5';

import { SidebarTabTypes } from '../ui.types';
import menu from './sidebar.config';
import CreatePostModal from '../../post/CreatePostModal';

const Sidebar = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<SidebarTabTypes>('Home');
  const {
    isOpen: isOpenCreatePostModal,
    onOpen: onOpenCreatePostModal,
    onClose: onCloseCreatePostModal,
  } = useDisclosure();

  const handleTabClick = (title: SidebarTabTypes) => {
    setActiveTab(title);

    if (title === 'Profile') {
      navigate('/profile');
    } else if (title === 'Create') {
      onOpenCreatePostModal();
    } else {
      navigate('/');
    }
  };

  const handleCloseCreatePostModal = () => {
    setActiveTab('Home');
    onCloseCreatePostModal();
  };

  return (
    <div className='sticky top-0 h-screen'>
      <div className='flex flex-col justify-between h-full px-10'>
        <div>
          <div className='pt-10'>
            <img
              src='https://i.imgur.com/zqpwkLQ.png'
              alt='Instagram'
              className='w-40'
            />
          </div>
          <div className='mt-10'>
            {menu.map(({ title, icon, activeIcon }) => (
              <div
                key={title}
                onClick={() => handleTabClick(title as SidebarTabTypes)}
                className='flex items-center mb-5 cursor-pointer text-lg'
              >
                {activeTab === title ? activeIcon : icon}
                <p
                  className={`${
                    activeTab === title ? 'font-bold' : 'font-semibold'
                  }`}
                >
                  {title}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className='flex items-center cursor-pointer pb-10'>
          <IoReorderThree className='text-2xl' />
          <p className='ml-5'>More</p>
        </div>
      </div>

      <CreatePostModal
        isOpen={isOpenCreatePostModal}
        onClose={handleCloseCreatePostModal}
      />
    </div>
  );
};

export default Sidebar;

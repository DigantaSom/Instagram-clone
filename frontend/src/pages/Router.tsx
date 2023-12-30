import { Routes, Route } from 'react-router-dom';

import HomePage from './HomePage';
import ProfilePage from './ProfilePage';
import StoryPage from './StoryPage';

import Sidebar from '../features/ui/sidebar/Sidebar';

const Router = () => {
  return (
    <div>
      <div className='flex'>
        <div className='w-[20%] border border-l-slate-500'>
          <Sidebar />
        </div>
        <div className='w-full'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/:username' element={<ProfilePage />} />
            <Route path='/story' element={<StoryPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Router;

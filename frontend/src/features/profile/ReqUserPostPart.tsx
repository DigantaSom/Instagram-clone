import { ReactNode, useState } from 'react';
import { AiOutlineTable, AiOutlineUser } from 'react-icons/ai';
import { RiVideoAddLine } from 'react-icons/ri';
import { BiBookmark } from 'react-icons/bi';

import ReqUserPostCard from './ReqUserPostCard';

type TabName = 'Post' | 'Reels' | 'Saved' | 'Tagged';

interface Tab {
  tab: TabName;
  icon: ReactNode;
  activeTab?: boolean;
}

const ReqUserPostPart = () => {
  const [activeTab, setActiveTab] = useState<TabName>('Post');

  const tabs: Tab[] = [
    { tab: 'Post', icon: <AiOutlineTable />, activeTab: true },
    { tab: 'Reels', icon: <RiVideoAddLine /> },
    { tab: 'Saved', icon: <BiBookmark /> },
    { tab: 'Tagged', icon: <AiOutlineUser /> },
  ];

  return (
    <div>
      <div className='flex space-x-14 border-t relative'>
        {tabs.map(({ tab, icon }) => (
          <div
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`${
              activeTab === tab ? 'border-t border-black' : 'opacity-60'
            } flex items-center cursor-pointer py-2 text-sm`}
          >
            {icon}
            <p className='ml-1 text-sm'>{tab}</p>
          </div>
        ))}
      </div>

      <div>
        <div className='flex flex-wrap gap-4'>
          {[1, 1, 1, 1, 1, 1].map(item => (
            <ReqUserPostCard />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReqUserPostPart;

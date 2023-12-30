import { FC, useCallback, useEffect, useState } from 'react';

import { Story } from './story.types';
import StoryProgressBar from './StoryProgressBar';

interface StoryViewerProps {
  stories: Story[];
}

const StoryViewer: FC<StoryViewerProps> = ({ stories }) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const duration = 2000; // ms

  const goToNextStory = useCallback(() => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(prev => prev + 1);
      setActiveIndex(prev => prev + 1);
    } else if (currentStoryIndex === stories.length - 1) {
      setCurrentStoryIndex(0);
      setActiveIndex(0);
    }
  }, [currentStoryIndex, stories.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      goToNextStory();
    }, duration);

    return () => {
      clearInterval(interval);
    };
  }, [currentStoryIndex, goToNextStory]);

  return (
    <div className='relative w-full'>
      <div className='flex items-center justify-center bg-black h-screen'>
        <img
          src={stories[currentStoryIndex].image}
          alt=''
          className='max-h-[90vh] object-contain'
        />
        <div className='absolute top-0 w-full flex items-center'>
          {stories.map((_, index) => (
            <StoryProgressBar
              key={index}
              index={index}
              activeIndex={activeIndex}
              duration={duration}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoryViewer;

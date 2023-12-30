import { FC, useEffect, useState } from 'react';

interface StoryProgressBarProps {
  index: number;
  activeIndex: number;
  duration: number;
}

const StoryProgressBar: FC<StoryProgressBarProps> = ({
  index,
  activeIndex,
  duration,
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
  }, [activeIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        if (prevProgress < 100) {
          return prevProgress + 1;
        }
        clearInterval(interval);
        return prevProgress;
      });
    }, duration / 100); // to run the interval once per 1% of the duration

    return () => {
      clearInterval(interval);
    };
  }, [duration, activeIndex]);

  const isActive = index === activeIndex;

  return (
    <div
      className={`w-full h-1 bg-white opacity-50 rounded-[4px] overflow-hidden m-1 transition-opacity duration-200 ease-out ${
        isActive && 'opacity-100'
      }`}
    >
      <div
        className={`${isActive && 'h-full bg-blue-500 rounded-[4px]'}`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default StoryProgressBar;

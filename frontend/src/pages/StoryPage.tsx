import { Story } from '../features/story/story.types';
import StoryViewer from '../features/story/StoryViewer';

const StoryPage = () => {
  const demo_stories: Story[] = [
    {
      image:
        'https://cdn.pixabay.com/photo/2023/11/19/18/35/boy-8399526_1280.jpg',
    },
    {
      image:
        'https://cdn.pixabay.com/photo/2023/06/02/14/10/woman-8035746_1280.jpg',
    },
    {
      image:
        'https://cdn.pixabay.com/photo/2023/10/20/19/25/moon-8330104_1280.png',
    },
    {
      image:
        'https://cdn.pixabay.com/photo/2023/12/15/21/47/cat-8451431_1280.jpg',
    },
    {
      image:
        'https://cdn.pixabay.com/photo/2023/12/12/10/32/christmas-8444992_1280.png',
    },
  ];

  return <StoryViewer stories={demo_stories} />;
};

export default StoryPage;

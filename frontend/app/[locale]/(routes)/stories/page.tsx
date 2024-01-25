import ColumnSection from './_components/columnSection';
import Header from './_components/header';
import VideoPlayer from './_components/videoPlayer';

const Stories = () => {
  return (
    <div className="flex flex-col items-center pt-4">
      <Header />
      <ColumnSection />
      <VideoPlayer />
    </div>
  );
};

export default Stories;

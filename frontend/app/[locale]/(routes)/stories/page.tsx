import ContactSection from '@/components/layout/ContactSection';
import ColumnSection from './_components/ColumnSection';
import Header from './_components/Header';
import Partners from './_components/Partners';
import TestSection from './_components/TestSection';
import VideoPlayer from './_components/VideoPlayer';

const Stories = () => {
  return (
    <div className="flex flex-col items-center pt-4">
      <Header />
      <ColumnSection />
      <VideoPlayer />
      <TestSection />
      <Partners />
      <ContactSection />
    </div>
  );
};

export default Stories;

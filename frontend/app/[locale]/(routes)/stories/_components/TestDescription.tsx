import ImageWithSkeleton from '@/components/hackathon/skeletons/ImageWithSkeleton';
import { useTranslations } from 'next-intl';

const TestDescription = () => {
  const t = useTranslations('Stories.testSection');
  return (
    <div className="mt-10 flex flex-col-reverse lg:flex-row mx-10 gap-x-6 gap-y-6 items-center">
      <div className=" flex flex-col max-w-[700px] lg:max-w-[450px] gap-y-4">
        <p>{t('description.text.first')}</p>
        <p>{t('description.text.second')}</p>
        <p>{t('description.text.third')}</p>
      </div>
      <div className="w-[345px] h-[221px] lg:w-[450px] lg:h-[289px]">
        <ImageWithSkeleton
          green={false}
          src={t('description.image')}
          alt="Test description"
          width={946}
          height={618}
        />
      </div>
    </div>
  );
};
export default TestDescription;

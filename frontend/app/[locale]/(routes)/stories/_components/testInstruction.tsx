import ImageWithSkeleton from '@/components/hackathon/skeletons/image-with-skeleton';
import { useTranslations } from 'next-intl';

const TestInstruction = () => {
  const t = useTranslations('Stories.testSection');
  return (
    <div className="mt-10 flex flex-col-reverse lg:flex-row-reverse mx-10 gap-x-6 gap-y-6 items-center">
      <div className=" flex flex-col max-w-[700px] lg:max-w-[450px] gap-y-4">
        <p>{t('instruction.text.first')}</p>
        <p>{t('instruction.text.second')}</p>
        <p>{t('instruction.text.third')}</p>
        <p>{t('instruction.text.fourth')}</p>
      </div>
      <div className="w-[345px] h-[229px] lg:w-[450px] lg:h-[289px]">
        <ImageWithSkeleton
          green={false}
          src={t('instruction.image')}
          alt="Test description"
          width={946}
          height={618}
        />
      </div>
    </div>
  );
};

export default TestInstruction;

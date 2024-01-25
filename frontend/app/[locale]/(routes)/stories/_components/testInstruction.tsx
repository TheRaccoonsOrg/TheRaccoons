import { useTranslations } from 'next-intl';
import Image from 'next/image';

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
      <Image
        className="w-[450px]"
        src={t('instruction.image')}
        alt="Test description"
        width={946}
        height={618}
      />
    </div>
  );
};

export default TestInstruction;

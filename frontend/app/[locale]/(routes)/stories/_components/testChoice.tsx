import GreenButton from '@/components/green-button';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
const TestChoice = () => {
  const t = useTranslations('Stories.testSection');
  const keys = [
    'first',
    'second',
    'third',
    'fourth',
    'fifth',
    'sixth',
    'seventh',
    'eighth',
    'ninth',
    'tenth',
    'eleventh',
    'twelfth',
  ];

  return (
    <div className="mt-20">
      {keys.map((key) => (
        <div key={key} className="flex flex-col mx-10 ">
          <div className="h-[3px] bg-hotgreen" />
          <div className="flex flex-row justify-between items-center md:mx-10 py-5">
            <p>{t(`tests.${key}.text`)}</p>
            <GreenButton
              buttonStyles="bg-purple-br w-[170px] text-xs md:text-sm"
              buttonText={t(`tests.${key}.buttonText`)}
              buttonHref={t(`tests.${key}.buttonHref`)}
            />
          </div>
        </div>
      ))}
      <div className="h-[3px] bg-hotgreen mx-10" />

      <div className="flex flex-col mt-10 mx-10 md:mx-20 max-w-[924px] gap-y-2s">
        <p className="text-sm">{t('disclaimer.text')}</p>
        <Link
          href="https://www.google.com/url?q=http://1.1.1.3/18/A/001&sa=D&source=editors&ust=1618646329350000&usg=AFQjCNELxnFcCxSK8vBnEDcbgkMnsuynYw"
          className="underline hover:text-hotgreen">
          <p className="text-sm">{t('disclaimer.projectLink')}</p>
        </Link>
        <Link
          href="https://cfla.gov.lv/lv/par-mums/fizisko-personu-datu-aizsardziba/privatuma-politika"
          className="underline hover:text-hotgreen">
          <p className="text-sm">{t('disclaimer.privacyPolicy')}</p>
        </Link>
        <Link
          href="https://www.ej.uz/raccoons_datuaizsardziba"
          className="underline hover:text-hotgreen">
          <p className="text-sm">{t('disclaimer.dataSafety')}</p>
        </Link>
      </div>
    </div>
  );
};

export default TestChoice;

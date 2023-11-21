import { friendsImagePaths } from '@/lib/friends-pics';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

const FriendsSection = () => {
  const tImage = useTranslations('Image');

  return (
    <div className="my-10 flex flex-col items-center justify-center ">
      <div className="mb-2 w-[200px]">
        <Image src={tImage('friends')} width={500} height={500} alt="Friends / Draugi" />
      </div>
      <div className="flex flex-wrap justify-center">
        {friendsImagePaths.map((item, index) =>
          item.show ? (
            <div
              className="flex w-1/2 items-center justify-center py-2 sm:w-1/4 md:w-1/4"
              key={index}>
              <Link href={item.link} rel="noopener noreferrer" target="_blank">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  style={{ width: '100%', height: 'auto' }}
                />
              </Link>
            </div>
          ) : null,
        )}
      </div>
    </div>
  );
};

export default FriendsSection;

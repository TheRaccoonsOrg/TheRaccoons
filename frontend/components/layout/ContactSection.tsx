import { contactConfig } from '@/config/site';
import Link from 'next/link';
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

const ContactSection = () => {
  return (
    <div className="my-4 flex flex-col items-center justify-center gap-y-4">
      <div className="flex flex-row gap-x-2">
        <Link href="https://www.facebook.com/RaccoonsHQ" aria-label="Facebook">
          <FaFacebook size={40} />
        </Link>
        <Link href="https://www.instagram.com/raccoonshq/" aria-label="Instagram">
          <FaInstagram size={40} />
        </Link>
        <Link
          href="https://www.linkedin.com/company/the-raccoons-student-community/"
          aria-label="LinkedIn">
          <FaLinkedin size={40} />
        </Link>
        <Link href="https://twitter.com/RaccoonsHQ" aria-label="Twitter">
          <FaTwitter size={40} />
        </Link>
        <Link href="https://github.com/TheRaccoonsOrg" aria-label="GitHub">
          <FaGithub size={40} />
        </Link>
      </div>
      <Link href={`mailto:${contactConfig.email}`} className={`text-lg hover:underline`}>
        {contactConfig.email}
      </Link>
    </div>
  );
};

export default ContactSection;

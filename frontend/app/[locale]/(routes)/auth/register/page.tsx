import { RegisterForm } from '@/components/auth/RegisterForm';
import { useTranslations } from 'next-intl';

const RegisterPage = () => {
  const t = useTranslations('UserRegistration');
  const translations = {
    validation: {
      name: t('validation.name'),
      email: t('validation.email'),
      emailValid: t('validation.emailValid'),
      password: t('validation.password'),
    },
    text: {
      title: t('title'),
      name: t('name-surname'),
      email: t('email'),
      password: t('password'),
      registerButton: t('registerButton'),
      loginLink: t('loginLink'),
    },
  };

  return (
    <div>
      <RegisterForm translations={translations} />
    </div>
  );
};

export default RegisterPage;

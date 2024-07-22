import { LoginForm } from '@/components/auth/LoginForm';
import { useTranslations } from 'next-intl';

const LoginPage = () => {
  const t = useTranslations('UserLogin');
  const translations = {
    validation: {
      email: t('validation.email'),
      password: t('validation.password'),
    },
    text: {
      title: t('title'),
      email: t('email'),
      password: t('password'),
      loginButton: t('loginButton'),
      registerLink: t('registerLink'),
      forgotPasswordLink: t('forgotPassword'),
    },
  };

  return (
    <div>
      <LoginForm translations={translations} />
    </div>
  );
};

export default LoginPage;

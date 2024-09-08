import { LoginForm } from '@/components/LoginForm/LoginForm';

export const metadata = {
  title: 'Авторизация',
};

const SignInPage = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-10 bg-gradient-to-r from-cyan-500 to-blue-500">
      <h5 className="text-4xl font-bold text-white">Learnninja</h5>
      <LoginForm />
    </div>
  );
};

export default SignInPage;

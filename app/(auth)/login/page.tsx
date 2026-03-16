import { Metadata } from 'next';
import LoginForm from '@/components/forms/LoginForm';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your E-Pharmacy admin dashboard.',
};

export default function LoginPage() {
  return <LoginForm />;
}

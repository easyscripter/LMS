'use client';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { loginSchema } from '@/validationSchemas';

export type LoginFormData = z.infer<typeof loginSchema>;

type LoginFormProps = {
  onLogin: (data: LoginFormData) => void;
  isLoading?: boolean;
};

export const LoginForm = ({ onLogin, isLoading }: LoginFormProps) => {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginFormData) => {
    onLogin(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[400px] space-y-6 rounded-lg border-2 bg-white p-8 shadow-md"
      >
        <h2 className="text-center text-2xl font-bold">Авторизация</h2>
        <FormField
          name="username"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Имя пользователя:</FormLabel>
              <FormControl>
                <Input placeholder="Имя пользователя" {...field} />
              </FormControl>
              {form.formState.errors.username && (
                <FormMessage>{form.formState.errors.username.message}</FormMessage>
              )}
            </FormItem>
          )}
        />
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль:</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Пароль" {...field} />
              </FormControl>
              {form.formState.errors.password && (
                <FormMessage>{form.formState.errors.password.message}</FormMessage>
              )}
            </FormItem>
          )}
        />
        <Button disabled={isLoading} className="w-full bg-blue-500" type="submit">
          {isLoading ? 'Загрузка...' : 'Войти'}
        </Button>
      </form>
    </Form>
  );
};

'use client';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { loginSchema } from '@/validationSchemas';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { apiService } from '@/services/apiService';
import { useToast } from '../ui/use-toast';
import { useRouter } from 'next/navigation';
import { Spinner } from '../ui/spinner';
import { AxiosError } from 'axios';
import { Routes } from '@/enums';

export const LoginForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const loginMutation = useMutation({
    mutationFn: (data: z.infer<typeof loginSchema>) =>
      apiService.login(data.username, data.password),
  });

  const handleSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      const response = await loginMutation.mutateAsync(data);
      if (response.user) {
        router.push(Routes.DASHBOARD);
      }
    } catch (e) {
      const error = e as Error | AxiosError;
      toast({
        title: 'Ошибка',
        description: `При авторизации произошла ошибка, попробуйте ещё раз. ${error instanceof AxiosError ? error.response?.data.message : error.message}`,
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex w-[500px] flex-col gap-6 rounded-lg border bg-white p-12 shadow-lg"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <FormLabel className="text-base font-bold text-black">Имя Пользователя:</FormLabel>
              <FormControl>
                <Input
                  placeholder="Има пользователя"
                  className="rounded-lg border border-gray-400 px-4 py-6"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <FormLabel className="text-base font-bold text-black">Пароль:</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Пароль"
                  className="rounded-lg border border-gray-400 px-4 py-6"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={loginMutation.isPending}
          className="my-5 flex w-full gap-4 rounded-xl border bg-blue-500 px-4 py-6 hover:border-blue-500 hover:bg-transparent hover:text-blue-500"
          type="submit"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          {loginMutation.isPending ? <Spinner size="small" /> : null} Войти
        </Button>
      </form>
    </Form>
  );
};

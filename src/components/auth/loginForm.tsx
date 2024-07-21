"use client"
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const formSchema = z.object({
    username: z.string().min(1, { message: "Пожалуйста, введите имя пользователя" }),
    password: z.string().min(1, { message: "Пожалуйста, введите пароль" }),
})

type LoginFormData = z.infer<typeof formSchema>

export const LoginForm = () => {

    const form = useForm<LoginFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        }
    })

    const onSubmit = (data: LoginFormData) => {
        console.log(data)
    }


    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 bg-white p-8 border-2 rounded-lg w-[400px] shadow-md'>
                <h2 className='text-2xl text-center font-bold'>Авторизация</h2>
                <FormField name="username" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormLabel>Имя пользователя:</FormLabel>
                        <FormControl>
                            <Input placeholder="Имя пользователя" {...field} />
                        </FormControl>
                        {form.formState.errors.username && <FormMessage>{form.formState.errors.username.message}</FormMessage>}
                    </FormItem>
                )}
                />
                <FormField name="password" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormLabel>Пароль:</FormLabel>
                        <FormControl>
                            <Input placeholder="Пароль" {...field} />
                        </FormControl>
                         {form.formState.errors.password && <FormMessage>{form.formState.errors.password.message}</FormMessage>}
                    </FormItem>
                )}
                />
                <Button className='w-full bg-blue-500' type="submit">Вход</Button>
            </form>
        </Form>
    )
}
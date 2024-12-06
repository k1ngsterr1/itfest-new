'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'

const loginSchema = z.object({
    companyName: z.string().min(2, 'Company name must be at least 2 characters'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm() {
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            companyName: '',
            password: '',
        },
    })

    async function onSubmit(data: LoginFormValues) {
        setIsLoading(true)
        console.log(data)
        await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate API call
        setIsLoading(false)
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-6">
            <Card className="w-full max-w-md shadow-lg rounded-lg bg-white">
                <CardHeader className="space-y-2">
                    <CardTitle className="text-3xl font-extrabold text-center items-center justify-center flex text-gray-800">Login</CardTitle>
                    <CardDescription className="text-center text-gray-600">
                        Enter your company details to log in
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="companyName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700">Company Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Acme Inc."
                                                {...field}
                                                className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-opacity-50"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-sm text-red-500 mt-1" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700">Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="********"
                                                {...field}
                                                className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-opacity-50"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-sm text-red-500 mt-1" />
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="px-6 py-4">
                    <Button
                        type="submit"
                        className={`w-full py-2 px-4 text-white rounded-lg shadow-md font-semibold ${isLoading ? 'opacity-70 cursor-not-allowed' : ''
                            }`}
                        disabled={isLoading}
                        onClick={form.handleSubmit(onSubmit)}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
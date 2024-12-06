'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  companyName: z.string().min(2, 'Company name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  employeeCount: z.enum(['1-5', '6-20', '21-50', '51-200', '201+'], {
    required_error: 'Please select the number of employees',
  }),
  type: z.enum(['startup', 'sme', 'enterprise', 'other'], {
    required_error: 'Please select a company type',
  }),
})

type FormValues = z.infer<typeof formSchema>

export function RegistrationForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: '',
      email: '',
      password: '',
      employeeCount: undefined,
      type: undefined,
    },
  })

  async function onSubmit(data: FormValues) {
    setIsLoading(true)
    try {
      const response = await fetch('https://itfest-backend-production.up.railway.app/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });


      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const result = await response.json();
      console.log('Registration successful:', result);

      localStorage.setItem('companyName', data.companyName);

      // Redirect to login page after successful registration
      router.push('/auth/login');

    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <Card className="w-full max-w-md shadow-lg rounded-lg bg-white">
        <CardHeader className="space-y-2">
          <CardTitle className="text-3xl font-extrabold text-center items-center justify-center flex text-gray-800">Register Your Company</CardTitle>
          <CardDescription className="text-center text-gray-600">
            Enter your company details to create an account
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="example@gmail.com"
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
                        className=" w-full border-gray-300 items-center flex justify-center rounded-lg shadow-sm focus:ring focus:ring-opacity-50"
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-red-500 mt-1" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="employeeCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Number of Employees</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="mt-1 w-full rounded-lg shadow-sm focus:ring focus:ring-opacity-50 flex items-center justify-between">
                          <SelectValue placeholder="Select employee range" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1-5">1-5</SelectItem>
                        <SelectItem value="6-20">6-20</SelectItem>
                        <SelectItem value="21-50">21-50</SelectItem>
                        <SelectItem value="51-200">51-200</SelectItem>
                        <SelectItem value="201+">201+</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-sm text-red-500 mt-1" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Company Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="mt-1 block w-full rounded-lg shadow-sm focus:ring focus:ring-opacity-50 flex items-center justify-between">
                          <SelectValue placeholder="Select company type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="startup">Startup</SelectItem>
                        <SelectItem value="sme">SME</SelectItem>
                        <SelectItem value="enterprise">Enterprise</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
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
            {isLoading ? 'Registering...' : 'Register'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
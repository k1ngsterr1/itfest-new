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
import { DropdownMenu } from '@/components/ui/dropdown-menu';
import { DropdownMenuLabel } from '@/components/ui/dropdown-menu';
import { DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { DropdownMenuContent } from '@/components/ui/dropdown-menu';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';


export function RegistrationForm() {
  type FormValues = z.infer<typeof formSchema>
  const [isLoading, setIsLoading] = useState(false)
  const { t, i18n } = useTranslation("registration");
  const router = useRouter()

  const formSchema = z.object({
    companyName: z.string().min(2, t('companyNameError')),
    email: z.string().email(t('emailError')),
    password: z.string().min(8, t('passwordError')),
    employeeCount: z.enum(['1-5', '6-20', '21-50', '51-200', '201+'], {
      required_error: t('employeeCountError'),
    }),
    type: z.enum(['startup', 'sme', 'enterprise', 'other'], {
      required_error: t('companyTypeError'),
    }),
  })

  const handleLanguageChange = (newLanguage: 'en' | 'ru' | 'kz') => {
    i18n.changeLanguage(newLanguage)
    localStorage.setItem('i18nextLng', newLanguage)
  }

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
          <CardTitle className="text-3xl font-extrabold text-center items-center justify-center flex text-gray-800">
            {t('title')}
          </CardTitle>
          <CardDescription className="text-center text-gray-600">
            {t('description')}
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
                    <FormLabel className="text-gray-700">
                      {t('companyName')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('companyNamePlaceholder')}
                        {...field}
                        className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-opacity-50"
                      />
                    </FormControl>
                    <FormMessage className="text-[12px] text-red-500 mt-1" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      {t('email')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder={t('emailPlaceholder')}
                        {...field}
                        className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-opacity-50"
                      />
                    </FormControl>
                    <FormMessage className="text-[12px] text-red-500 mt-1" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      {t('password')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder={t('passwordPlaceholder')}
                        {...field}
                        className=" w-full border-gray-300 items-center flex justify-center rounded-lg shadow-sm focus:ring focus:ring-opacity-50"
                      />
                    </FormControl>
                    <FormMessage className="text-[12px] text-red-500 mt-1" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="employeeCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      {t('employeeCount')}
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="mt-1 w-full rounded-lg shadow-sm focus:ring focus:ring-opacity-50 flex items-center justify-between">
                          <SelectValue placeholder={t('employeeCountPlaceholder')} />
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
                    <FormMessage className="text-[12px] text-red-500 mt-1" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      {t('companyType')}
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="mt-1 w-full rounded-lg shadow-sm focus:ring focus:ring-opacity-50 flex items-center justify-between">
                          <SelectValue placeholder={t('companyTypePlaceholder')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="startup">Startup</SelectItem>
                        <SelectItem value="sme">SME</SelectItem>
                        <SelectItem value="enterprise">Enterprise</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-[12px] text-red-500 mt-1" />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className='mt-4'>
              <Button variant="ghost" size="icon" className="flex gap-2 w-auto px-2">
                <Globe className="h-4 w-4" />
                {i18n.language === 'en' ? 'EN' : i18n.language === 'ru' ? 'RU' : 'KZ'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{t('common.selectLanguage', 'Select Language')}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleLanguageChange("en")}>
                <span className={i18n.language === "en" ? "font-bold" : ""}>
                  EN
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleLanguageChange("ru")}>
                <span className={i18n.language === "ru" ? "font-bold" : ""}>
                  RU
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleLanguageChange("kz")}>
                <span className={i18n.language === "kz" ? "font-bold" : ""}>
                  KZ
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardContent>
        <CardFooter className="px-6">
          <Button
            type="submit"
            className={`w-full px-4 text-white rounded-lg shadow-md font-semibold ${isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            disabled={isLoading}
            onClick={form.handleSubmit(onSubmit)}
          >
            {isLoading
              ? t('registering')
              : t('register')
            }
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
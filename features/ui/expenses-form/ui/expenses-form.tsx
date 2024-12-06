'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { apiClient } from '@/entities/api/apiClient'

const expenseSchema = z.object({
    description: z.string().min(1, 'Description is required'),
    amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: 'Amount must be a positive number',
    }),
    date: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Please enter a valid date',
    }),
    category: z.enum(['travel', 'meals', 'supplies', 'services', 'other'], {
        required_error: 'Please select a category',
    }),
    notes: z.string().optional(),
})

type ExpenseFormValues = z.infer<typeof expenseSchema>

export function CompanyExpensesForm() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const form = useForm<ExpenseFormValues>({
        resolver: zodResolver(expenseSchema),
        defaultValues: {
            description: '',
            amount: '',
            date: '',
            category: undefined,
            notes: '',
        },
    })

    async function onSubmit(data: ExpenseFormValues) {
        setIsLoading(true)
        setError(null)
        try {
            const response = await apiClient.post('/expenses', data)

            if (response.status >= 200 && response.status < 300) {
                const result = response.data
                console.log('Expense submitted successfully:', result)
                // Reset form after successful submission
                form.reset()
            } else {
                const errorData = response.data
                throw new Error(errorData.message || 'Failed to submit expense')
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred while submitting the expense')
            console.error('Expense submission error:', err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-6">
            <Card className="w-full max-w-md shadow-lg rounded-lg bg-white">
                <CardHeader className="space-y-2">
                    <CardTitle className="text-3xl font-extrabold text-center items-center justify-center flex text-gray-800">Company Expense</CardTitle>
                    <CardDescription className="text-center text-gray-600">
                        Enter the details of your company expense
                    </CardDescription>
                    {error && (
                        <p className="text-sm text-red-500 text-center mt-2">
                            {error}
                        </p>
                    )}
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700">Description</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Expense description"
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
                                name="amount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700">Amount</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="0.00"
                                                step="0.01"
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
                                name="date"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700">Date</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="date"
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
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700">Category</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-opacity-50">
                                                    <SelectValue placeholder="Select a category" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="travel">Travel</SelectItem>
                                                <SelectItem value="meals">Meals</SelectItem>
                                                <SelectItem value="supplies">Supplies</SelectItem>
                                                <SelectItem value="services">Services</SelectItem>
                                                <SelectItem value="other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage className="text-sm text-red-500 mt-1" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="notes"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700">Additional Notes</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Any additional details..."
                                                {...field}
                                                className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-opacity-50"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-sm text-red-500 mt-1" />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                className={`w-full py-2 px-4 text-white rounded-lg shadow-md font-semibold ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Submitting...' : 'Submit Expense'}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}


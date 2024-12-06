'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CreditCard, ArrowLeft, Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

const paymentMethods = [
    { id: 'card', name: 'Credit Card', icon: CreditCard },
    { id: 'paypal', name: 'PayPal' },
]

export default function PaymentPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [paymentMethod, setPaymentMethod] = useState('card')
    const [showDialog, setShowDialog] = useState(false)
    const [total, setTotal] = useState('0.00')

    useEffect(() => {
        const totalFromUrl = searchParams.get('total')
        if (totalFromUrl) {
            setTotal(totalFromUrl)
        }
    }, [searchParams])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setShowDialog(true)
    }

    const handleDialogClose = () => {
        setShowDialog(false)
        router.push('/store/thank-you')
    }

    return (
        <div className="min-h-screen bg-gray-100 py-12">
            <div className="container mx-auto px-4">
                <Link href="/store" className="inline-flex items-center mb-6">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Store
                </Link>
                <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-6">
                        <h1 className="text-2xl font-bold mb-6">Payment</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="total">Total Amount</Label>
                                    <Input id="total" value={`$${total}`} readOnly />
                                </div>
                                <div>
                                    <Label>Payment Method</Label>
                                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                                        {paymentMethods.map((method) => (
                                            <div key={method.id} className="flex items-center space-x-2">
                                                <RadioGroupItem value={method.id} id={method.id} />
                                                <Label htmlFor={method.id} className="flex items-center">
                                                    {method.name}
                                                </Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </div>
                                {paymentMethod === 'card' && (
                                    <>
                                        <div>
                                            <Label htmlFor="cardNumber">Card Number</Label>
                                            <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="expiry">Expiry Date</Label>
                                                <Input id="expiry" placeholder="MM/YY" required />
                                            </div>
                                            <div>
                                                <Label htmlFor="cvc">CVC</Label>
                                                <Input id="cvc" placeholder="123" required />
                                            </div>
                                        </div>
                                    </>
                                )}
                                {paymentMethod === 'paypal' && (
                                    <div>
                                        <Label htmlFor="paypalEmail">PayPal Email</Label>
                                        <Input id="paypalEmail" type="email" placeholder="you@example.com" required />
                                    </div>
                                )}
                                <Button type="submit" className="w-full">
                                    Pay Now
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Dialog open={showDialog} onOpenChange={handleDialogClose}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Check className="h-5 w-5 text-green-500" />
                            Payment Successful
                        </DialogTitle>
                        <DialogDescription>
                            Your payment has been processed successfully.
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

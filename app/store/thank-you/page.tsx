import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function ThankYouPage() {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 text-center">
                    <h1 className="text-2xl font-bold mb-4">Thank You for Your Purchase!</h1>
                    <p className="text-gray-600 mb-6">Your order has been successfully processed.</p>
                    <Button asChild>
                        <Link href="/store">Return to Store</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag, ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const brands = ["Nike", "Adidas", "Puma", "Reebok", "Under Armour"]

const products = [
    { id: 1, name: "Air Max 90", brand: "Nike", type: "sneakers", price: 129.99, image: "/placeholder.svg" },
    { id: 2, name: "Ultraboost", brand: "Adidas", type: "sneakers", price: 179.99, image: "/placeholder.svg" },
    { id: 3, name: "RS-X", brand: "Puma", type: "sneakers", price: 109.99, image: "/placeholder.svg" },
    { id: 4, name: "Classic Leather", brand: "Reebok", type: "sneakers", price: 74.99, image: "/placeholder.svg" },
    { id: 5, name: "HOVR Phantom", brand: "Under Armour", type: "sneakers", price: 139.99, image: "/placeholder.svg" },
    { id: 6, name: "Tech Fleece Hoodie", brand: "Nike", type: "clothes", price: 109.99, image: "/placeholder.svg" },
    { id: 7, name: "Trefoil Tee", brand: "Adidas", type: "clothes", price: 29.99, image: "/placeholder.svg" },
    { id: 8, name: "Essentials Sweatpants", brand: "Puma", type: "clothes", price: 49.99, image: "/placeholder.svg" },
    { id: 9, name: "Vector Jacket", brand: "Reebok", type: "clothes", price: 69.99, image: "/placeholder.svg" },
    { id: 10, name: "Rival Fleece Shorts", brand: "Under Armour", type: "clothes", price: 39.99, image: "/placeholder.svg" },
]

export default function Home() {
    const [cartCount, setCartCount] = useState(0)
    const [selectedBrand, setSelectedBrand] = useState("All")
    const [selectedType, setSelectedType] = useState("all")
    const [cartTotal, setCartTotal] = useState(0)

    const addToCart = (price: number) => {
        setCartCount(prevCount => prevCount + 1)
        setCartTotal(prevTotal => prevTotal + price)
    }

    const filteredProducts = products.filter(product =>
        (selectedBrand === "All" || product.brand === selectedBrand) &&
        (selectedType === "all" || product.type === selectedType)
    )

    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold text-gray-800">
                        FashionStore
                    </Link>
                    <nav>
                        <ul className="flex space-x-4">
                            <li>
                                <Link href="#products" className="text-gray-600 hover:text-gray-800">
                                    Products
                                </Link>
                            </li>
                            <li>
                                <Link href="#brands" className="text-gray-600 hover:text-gray-800">
                                    Brands
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                            <ShoppingBag className="h-6 w-6 text-gray-600" />
                            <span className="ml-2 text-sm font-medium text-gray-700">{cartCount}</span>
                        </div>
                        {cartCount > 0 && (
                            <Button asChild>
                                <Link href="/store/payment">
                                    Pay ${cartTotal.toFixed(2)}
                                </Link>
                            </Button>
                        )}
                    </div>
                </div>
            </header>

            <main className="flex-grow">
                <section id="hero" className="bg-gray-100 py-12">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl font-bold mb-4">Welcome to FashionStore</h1>
                        <p className="text-xl mb-8">Discover the latest trends in sneakers and clothing</p>
                        <Button size="lg" onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}>
                            Shop Now
                        </Button>
                    </div>
                </section>

                <section id="products" className="py-12">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-8">Our Products</h2>
                        <div className="flex justify-center mb-8">
                            <Tabs defaultValue="all" className="w-full max-w-md" onValueChange={setSelectedType}>
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="all">All</TabsTrigger>
                                    <TabsTrigger value="sneakers">Sneakers</TabsTrigger>
                                    <TabsTrigger value="clothes">Clothes</TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </div>
                        <div className="flex justify-center mb-8">
                            <Select onValueChange={setSelectedBrand}>
                                <SelectTrigger className="w-full max-w-xs">
                                    <SelectValue placeholder="Select a brand" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="All">All Brands</SelectItem>
                                    {brands.map((brand) => (
                                        <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {filteredProducts.map((product) => (
                                <Card key={product.id}>
                                    <CardContent className="p-4">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            width={300}
                                            height={300}
                                            className="w-full h-48 object-cover mb-4"
                                        />
                                        <h3 className="text-lg font-semibold">{product.name}</h3>
                                        <p className="text-sm text-gray-500">{product.brand}</p>
                                        <p className="text-gray-600">${product.price.toFixed(2)}</p>
                                    </CardContent>
                                    <CardFooter>
                                        <Button className="w-full" onClick={() => addToCart(product.price)}>Add to Cart</Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="brands" className="py-12 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-8">Our Brands</h2>
                        <div className="flex flex-wrap justify-center gap-8">
                            {brands.map((brand) => (
                                <div key={brand} className="text-center">
                                    <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-md mb-4">
                                        <span className="text-xl font-bold">{brand}</span>
                                    </div>
                                    <p className="text-gray-600">{brand}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="newsletter" className="py-12 bg-gray-800 text-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-8">Subscribe to Our Newsletter</h2>
                        <form className="max-w-md mx-auto flex gap-4">
                            <Input type="email" placeholder="Enter your email" className="flex-grow" />
                            <Button type="submit" variant="secondary">Subscribe</Button>
                        </form>
                    </div>
                </section>
            </main>

            <footer className="bg-gray-900 text-white py-8">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold mb-4">About Us</h3>
                            <p className="text-sm">FashionStore is your one-stop shop for the latest trends in sneakers and clothing from top brands.</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                            <ul className="space-y-2">
                                <li><Link href="#" className="text-sm hover:underline">Home</Link></li>
                                <li><Link href="#" className="text-sm hover:underline">Products</Link></li>
                                <li><Link href="#" className="text-sm hover:underline">Brands</Link></li>
                                <li><Link href="#" className="text-sm hover:underline">Contact</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                            <p className="text-sm">123 Fashion Street, Style City, 12345</p>
                            <p className="text-sm">Email: info@fashionstore.com</p>
                            <p className="text-sm">Phone: (123) 456-7890</p>
                        </div>
                    </div>
                    <div className="mt-8 text-center text-sm">
                        © 2023 FashionStore. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    )
}


"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useSocket from "@/hooks/useSocket";
import { io } from "socket.io-client";

const brands = ["Nike", "Adidas", "Puma", "Reebok", "Under Armour"];

const categories = ["sneakers", "clothes"];

const products = [
  {
    id: 1,
    name: "Air Max 90",
    brand: "Nike",
    category: "sneakers",
    price: 129.99,
    image:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/7c5678f4-c28d-4862-a8d9-56750f839f12/air-max-90-shoes-kRsBnD.png",
  },
  {
    id: 2,
    name: "Ultraboost",
    brand: "Adidas",
    category: "sneakers",
    price: 179.99,
    image:
      "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/3d0933f855c445fea224aad600d85ead_9366/Ultraboost_Light_Shoes_Black_FX8923_01_standard.jpg",
  },
  {
    id: 3,
    name: "RS-X",
    brand: "Puma",
    category: "sneakers",
    price: 109.99,
    image:
      "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/374915/01/sv01/fnd/IND/fmt/png/RS-X-Geek-Sneakers",
  },
  {
    id: 4,
    name: "Classic Leather",
    brand: "Reebok",
    category: "sneakers",
    price: 74.99,
    image:
      "https://assets.reebok.com/images/w_600,f_auto,q_auto/24043dba0e484434aba3aae80191b9c5_9366/Classic_Leather_Shoes_White_ID2154_01_standard.jpg",
  },
  {
    id: 5,
    name: "HOVR Phantom",
    brand: "Under Armour",
    category: "sneakers",
    price: 139.99,
    image:
      "https://underarmour.scene7.com/is/image/Underarmour/3024152-002_DEFAULT?rp=standard-0pad|gridTileDesktop&scl=1&fmt=jpg&qlt=50&resMode=sharp2&cache=on,on&bgc=F0F0F0&wid=512&hei=640",
  },
  {
    id: 6,
    name: "Tech Fleece Hoodie",
    brand: "Nike",
    category: "clothes",
    price: 109.99,
    image:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/7bac6eaa-9de6-4c04-9baa-9fc5c8778fad/sportswear-tech-fleece-mens-full-zip-hoodie-5ZtTtk.png",
  },
  {
    id: 7,
    name: "Trefoil Tee",
    brand: "Adidas",
    category: "clothes",
    price: 29.99,
    image:
      "https://assets.adidas.com/images/w_600,f_auto,q_auto/fb35807c75bb4185ba60aae800f3f4cf_9366/Trefoil_T-Shirt_Black_GN3462_01_laydown.jpg",
  },
  {
    id: 8,
    name: "Essentials Sweatpants",
    brand: "Puma",
    category: "clothes",
    price: 49.99,
    image:
      "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/586748/01/mod01/fnd/IND/fmt/png/Essentials-Logo-Men's-Sweatpants",
  },
  {
    id: 9,
    name: "Vector Jacket",
    brand: "Reebok",
    category: "clothes",
    price: 69.99,
    image:
      "https://assets.reebok.com/images/w_600,f_auto,q_auto/cd34290e1b57479399f3acf301607408_9366/Classics_Vector_Track_Jacket_Black_FJ3172_01_standard.jpg",
  },
  {
    id: 10,
    name: "Rival Fleece Shorts",
    brand: "Under Armour",
    category: "clothes",
    price: 39.99,
    image:
      "https://underarmour.scene7.com/is/image/Underarmour/1361631-001_DEFAULT?rp=standard-0pad|gridTileDesktop&scl=1&fmt=jpg&qlt=50&resMode=sharp2&cache=on,on&bgc=F0F0F0&wid=512&hei=640",
  },
];

export default function Home() {
  const [cartCount, setCartCount] = useState(0);
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cartTotal, setCartTotal] = useState(0);
  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on("connectionAck", (data) => {
        console.log("Connection acknowledgment from server:", data);
      });
    }
  }, [socket]);

  const addToCart = (price: number, id: number, name: string) => {
    setCartCount((prevCount) => prevCount + 1);
    setCartTotal((prevTotal) => prevTotal + price);

    if (socket) {
      socket.emit(
        "addProductToCart",
        { id: id, name: name, price: price },
        (response) => {
          console.log("Server acknowledgment:", response);
        }
      );
    } else {
      console.error("Socket is not connected.");
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      (selectedBrand === "All" || product.brand === selectedBrand) &&
      (selectedCategory === "all" || product.category === selectedCategory)
  );

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
                <Link
                  href="#products"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="#brands"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Brands
                </Link>
              </li>
            </ul>
          </nav>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <ShoppingBag className="h-6 w-6 text-gray-600" />
              <span className="ml-2 text-sm font-medium text-gray-700">
                {cartCount}
              </span>
            </div>
            {cartCount > 0 && (
              <Button asChild>
                <Link href={`/store/payment?total=${cartTotal.toFixed(2)}`}>
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
            <p className="text-xl mb-8">
              Discover the latest trends in sneakers and clothing
            </p>
            <Button
              size="lg"
              onClick={() =>
                document
                  .getElementById("products")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Shop Now
            </Button>
          </div>
        </section>
        <section id="products" className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">
              Our Products
            </h2>
            <div className="flex justify-center mb-8">
              <Tabs
                defaultValue="all"
                className="w-full max-w-md"
                onValueChange={setSelectedCategory}
              >
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
                    <SelectItem key={brand} value={brand}>
                      {brand}
                    </SelectItem>
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
                    <Button
                      className="w-full"
                      onClick={() =>
                        addToCart(product.price, product.id, product.name)
                      }
                    >
                      Add to Cart
                    </Button>
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
            <h2 className="text-3xl font-bold text-center mb-8">
              Subscribe to Our Newsletter
            </h2>
            <form className="max-w-md mx-auto flex gap-4">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-grow"
              />
              <Button type="submit" variant="secondary">
                Subscribe
              </Button>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <p className="text-sm">
                FashionStore is your one-stop shop for the latest trends in
                sneakers and clothing from top brands.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:underline">
                    Products
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:underline">
                    Brands
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:underline">
                    Contact
                  </Link>
                </li>
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
            2023 FashionStore. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

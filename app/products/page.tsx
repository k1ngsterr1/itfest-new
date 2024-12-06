"use client";

import Header from "@/features/ui/header/ui/header";
import Sidebar from "@/features/ui/sidebar/ui/sidebar";
import { PopupProvider } from "@/shared/ui/contexts/popup-providers";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Plus, Upload } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Home() {
    const { t } = useTranslation("products");
    const pageRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [avatarFile, setAvatarFile] = useState(null);
    const [data, setData] = useState([
        {
            id: 1,
            name: "iPhone 14 Pro",
            price: 999.99,
            category: "Smartphones",
            brand: "Apple",
            image: "https://example.com/iphone.jpg"
        },
        {
            id: 2,
            name: "Samsung Galaxy S23",
            price: 899.99,
            category: "Smartphones",
            brand: "Samsung",
            image: "https://example.com/galaxy.jpg"
        },
        {
            id: 3,
            name: "MacBook Pro 16",
            price: 2499.99,
            category: "Laptops",
            brand: "Apple",
            image: "https://example.com/macbook.jpg"
        }
    ]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from("h1", {
                opacity: 0,
                y: -50,
                duration: 0.5,
                ease: "power3.out",
            });
            gsap.from(".metrics-card", {
                opacity: 0,
                y: 50,
                duration: 0.5,
                stagger: 0.1,
                ease: "power3.out",
            });
            gsap.from(".dashboard-card", {
                opacity: 0,
                scale: 0.9,
                duration: 0.5,
                stagger: 0.1,
                ease: "power3.out",
            });
        }, pageRef);

        return () => ctx.revert();
    }, []);

    return (
        <PopupProvider>
            <div
                className="flex h-screen overflow-hidden bg-gradient-to-br from-white to-gray-50"
                ref={pageRef}
            >
                <Sidebar />
                <div className="flex-1 overflow-auto">
                    <Header />
                    <main className="p-6">
                        <h1 className="text-3xl font-bold mb-6 text-primary">{t('title')}</h1>
                        <div className="w-full p-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <Dialog
                                    open={isOpen}
                                    onOpenChange={(open) => {
                                        setIsOpen(open);
                                        if (!open) {
                                            setEditingProduct(null);
                                        }
                                    }}
                                >
                                    <DialogTrigger asChild>
                                        <Button
                                            onClick={() => {
                                                setEditingProduct(null);
                                            }}
                                        >
                                            <Plus className="mr-2 h-4 w-4" />
                                            {t('addProduct')}
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[400px] w-full max-h-[80vh] overflow-y-auto overflow-x-hidden">
                                        <form className="space-y-4  w-[350px]">
                                            <div className="space-y-2">
                                                <Label htmlFor="avatar">{t('photo')}</Label>
                                                <div className="flex items-center justify-center w-full">
                                                    <label
                                                        htmlFor="avatar"
                                                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
                                                    >
                                                        {avatarFile ? (
                                                            <img
                                                                src={URL.createObjectURL(avatarFile)}
                                                                alt="Avatar Preview"
                                                                className="object-cover w-full h-full rounded-lg"
                                                            />
                                                        ) : editingProduct?.image ? (
                                                            <img
                                                                src={editingProduct.image}
                                                                alt="Avatar Preview"
                                                                className="object-cover w-full h-full rounded-lg"
                                                            />
                                                        ) : (
                                                            <div className="flex flex-col items-center justify-center w-full">
                                                                <Upload className="w-8 h-8 mb-4 text-gray-500" />
                                                                <p className="mb-2 text-sm text-gray-500">
                                                                    {t('loadPhoto')}
                                                                </p>
                                                                <p className="text-xs text-gray-500">
                                                                    {t('dataType')}
                                                                </p>
                                                            </div>
                                                        )}
                                                        <Input
                                                            id="avatar"
                                                            type="file"
                                                            className="hidden"
                                                            accept="image/*"
                                                        />
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="name">{t('productName')}</Label>
                                                <Input
                                                    id="name"
                                                    name="name"
                                                    required
                                                />
                                            </div>


                                            <div className="space-y-2">
                                                <Label htmlFor="price">{t('price')}</Label>
                                                <Input
                                                    id="price"
                                                    name="price"
                                                    type="number"
                                                    step="0.01"
                                                    required
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="category">{t('category')}</Label>
                                                <Input
                                                    id="category"
                                                    name="category"
                                                    required
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="brand">{t('brand')}</Label>
                                                <Input
                                                    id="brand"
                                                    name="brand"
                                                    required
                                                />
                                            </div>

                                            <Button
                                                type="submit"
                                                className="w-full"
                                            >
                                                {t('save')}
                                            </Button>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            </div>
                            <div className="border rounded-lg">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>ID</TableHead>
                                            <TableHead>{t('name')}</TableHead>
                                            <TableHead>{t('category')}</TableHead>
                                            <TableHead>{t('brand')}</TableHead>
                                            <TableHead>{t('price')}</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {(Array.isArray(data) ? data : []).map((product) => (
                                            <TableRow key={product.id}>
                                                <TableCell>{product.id}</TableCell>
                                                <TableCell>{product.name}</TableCell>
                                                <TableCell>{product.category}</TableCell>
                                                <TableCell>{product.brand}</TableCell>
                                                <TableCell>${product.price}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </PopupProvider>
    );
}

"use client";

import { CompanyExpensesForm } from "@/features/ui/expenses-form/ui/expenses-form";
import Header from "@/features/ui/header/ui/header";
import Sidebar from "@/features/ui/sidebar/ui/sidebar";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function ExpensesPage() {
    const pageRef = useRef(null);

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
        <div className="flex h-screen overflow-hidden" ref={pageRef}>
            <Sidebar />
            <div className="flex-1 overflow-auto">
                <Header />
                <main className="p-6">
                    <h1 className="text-3xl font-bold mb-6 text-primary">Expenses</h1>
                    <div className="gap-6">
                        <CompanyExpensesForm />
                    </div>
                    <div className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3"></div>
                </main>
            </div>
        </div>
    );
}

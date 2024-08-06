import React from "react";
import Link from "next/link";

const HeroSection = () => (
    <section className="text-center py-16 bg-gray-800 shadow-md rounded-lg mt-8">
        <h2 className="text-5xl font-extrabold tracking-tight text-indigo-500">
            Welcome to HTMX-Templates
        </h2>
        <p className="mt-4 text-xl text-gray-400">
            Your go-to resource for HTMX component templates.
        </p>
        <Link href="/components" className="mt-8 inline-block bg-indigo-500 text-white px-6 py-3 rounded-full">
            Browse Components
        </Link>
    </section>
);

export default HeroSection;

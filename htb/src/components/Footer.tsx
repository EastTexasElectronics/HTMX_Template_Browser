import React from "react";
import Link from "next/link";

const Footer = () => (
    <footer className="bg-indigo-600 text-white p-4 mt-16">
        <div className="container mx-auto text-center">
            <p>&copy; {new Date().getFullYear()} HTMX-Templates. All rights reserved.</p>
            <p className="mt-2">
                <Link href="/privacy" className="hover:underline">Privacy Policy</Link> | <Link href="/terms" className="hover:underline">Terms of Service</Link>
            </p>
        </div>
    </footer>
);

export default Footer;

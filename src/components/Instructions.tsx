'use client';
import React from 'react';

const Instructions: React.FC = () => (
    <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Instructions</h2>
        <p className="text-gray-400 mb-4">
            Use the code sandbox below to create and preview your component. Fill out the component details, write your HTML and HTMX code, and see the live preview. You can copy the code in HTMX or Templ format.
        </p>
        <ul className="list-disc list-inside text-gray-400">
            <li>Enter a name for your component.</li>
            <li>Select up to three appropriate categories.</li>
            <li>Provide an optional description.</li>
            <li>Write your HTML and HTMX code in the editor.</li>
            <li>Click the copy button to copy the code in the desired format.</li>
        </ul>
    </section>
);

export default Instructions;

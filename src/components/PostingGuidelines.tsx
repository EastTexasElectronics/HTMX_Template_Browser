'use client';
import React from 'react';

const PostingGuidelines: React.FC = () => (
    <section className="mb-12">
        <h3 className="text-xl font-bold mb-4">Posting Guidelines</h3>
        <ul className="list-disc list-inside text-gray-400 pl-4">
            <li>Ensure your component is self-contained and functional.</li>
            <li>Use standard HTML, CSS, and JavaScript.</li>
            <li>Avoid external dependencies unless necessary.</li>
            <li>Include a descriptive title and comments in your code.</li>
        </ul>
    </section>
);

export default PostingGuidelines;

import React from "react";

const FeaturesSection = () => (
    <section className="mt-16">
        <h3 className="text-3xl font-bold text-gray-200">Features</h3>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
                <h4 className="text-2xl font-bold text-indigo-500">Ready-to-Use Components</h4>
                <p className="mt-2 text-gray-400">Explore a variety of HTMX component templates to speed up your development process.</p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
                <h4 className="text-2xl font-bold text-indigo-500">Easy Integration</h4>
                <p className="mt-2 text-gray-400">Seamlessly integrate HTMX components into your projects with detailed documentation.</p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
                <h4 className="text-2xl font-bold text-indigo-500">Community Contributions</h4>
                <p className="mt-2 text-gray-400">Sign in to manage and upload your own components for the community to use.</p>
            </div>
        </div>
    </section>
);

export default FeaturesSection;

// htb/src/app/page.tsx

import Link from "next/link";
import { LatestPost } from "@/app/_components/post";
import { getServerAuthSession } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";
import HTMXCodeSandbox from "@/app/_components/HTMXCodeSandbox";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
<HTMXCodeSandbox />
      <div className="min-h-screen bg-gray-100">
        <header className="bg-indigo-600 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-3xl font-bold">HTMX-Templates</h1>
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <Link href="/" className="hover:underline">Home</Link>
                </li>
                <li>
                  <Link href="/components" className="hover:underline">Components</Link>
                </li>
                <li>
                  <Link href="/docs" className="hover:underline">Documentation</Link>
                </li>
                <li>
                  <Link href={session ? "/api/auth/signout" : "/api/auth/signin"} className="hover:underline">
                    {session ? "Sign out" : "Sign in"}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <main className="container mx-auto py-8 px-4">
          <section className="text-center py-16 bg-white shadow-md rounded-lg">
            <h2 className="text-5xl font-extrabold tracking-tight text-indigo-600">
              Welcome to HTMX-Templates
            </h2>
            <p className="mt-4 text-xl text-gray-700">
              Your go-to resource for HTMX component templates.
            </p>
            <Link href="/components" className="mt-8 inline-block bg-indigo-600 text-white px-6 py-3 rounded-full">
              Browse Components
            </Link>
          </section>
          <section className="mt-16">
            <h3 className="text-3xl font-bold text-gray-800">Features</h3>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-white rounded-lg shadow-lg">
                <h4 className="text-2xl font-bold text-indigo-600">Ready-to-Use Components</h4>
                <p className="mt-2 text-gray-700">Explore a variety of HTMX component templates to speed up your development process.</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-lg">
                <h4 className="text-2xl font-bold text-indigo-600">Easy Integration</h4>
                <p className="mt-2 text-gray-700">Seamlessly integrate HTMX components into your projects with detailed documentation.</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-lg">
                <h4 className="text-2xl font-bold text-indigo-600">Community Contributions</h4>
                <p className="mt-2 text-gray-700">Sign in to manage and upload your own components for the community to use.</p>
              </div>
            </div>
          </section>
          <section className="mt-16">
            <h3 className="text-3xl font-bold text-gray-800">Base Components</h3>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-white rounded-lg shadow-lg">
                <h4 className="text-2xl font-bold text-indigo-600">Component 1</h4>
                <p className="mt-2 text-gray-700">Description of the component and its usage.</p>
                <Link href="/components/component-1" className="mt-4 inline-block text-indigo-600 hover:underline">View Documentation</Link>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-lg">
                <h4 className="text-2xl font-bold text-indigo-600">Component 2</h4>
                <p className="mt-2 text-gray-700">Description of the component and its usage.</p>
                <Link href="/components/component-2" className="mt-4 inline-block text-indigo-600 hover:underline">View Documentation</Link>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-lg">
                <h4 className="text-2xl font-bold text-indigo-600">Component 3</h4>
                <p className="mt-2 text-gray-700">Description of the component and its usage.</p>
                <Link href="/components/component-3" className="mt-4 inline-block text-indigo-600 hover:underline">View Documentation</Link>
              </div>
            </div>
          </section>
          <section className="mt-16 text-center">
            <h3 className="text-3xl font-bold text-gray-800">Join the Community</h3>
            <p className="mt-4 text-lg text-gray-700">Sign in to manage and upload your own components for others to use and improve.</p>
            <Link href={session ? "/upload" : "/api/auth/signin"} className="mt-8 inline-block bg-indigo-600 text-white px-6 py-3 rounded-full">
              {session ? "Manage Your Components" : "Sign In to Get Started"}
            </Link>
          </section>
          <div className="flex flex-col items-center gap-2 mt-16">
            <p className="text-2xl text-gray-800">
              {hello ? hello.greeting : "Loading tRPC query..."}
            </p>
            {session && (
              <p className="text-center text-2xl text-gray-800">
                Logged in as {session.user?.name}
              </p>
            )}
          </div>
          {session?.user && <LatestPost />}
        </main>
        <footer className="bg-indigo-600 text-white p-4 mt-16">
          <div className="container mx-auto text-center">
            <p>&copy; {new Date().getFullYear()} HTMX-Templates. All rights reserved.</p>
            <p className="mt-2">
              <Link href="/privacy" className="hover:underline">Privacy Policy</Link> | <Link href="/terms" className="hover:underline">Terms of Service</Link>
            </p>
          </div>
        </footer>
      </div>
    </HydrateClient>
  );
}

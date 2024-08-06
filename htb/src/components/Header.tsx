import Link from "next/link";
import { getServerAuthSession } from "@/server/auth";

const Header = async () => {
  const session = await getServerAuthSession();

  return (
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
  );
};

export default Header;

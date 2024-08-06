import React from "react";
import Link from "next/link";
import { getServerAuthSession } from "../server/auth";

const JoinCommunitySection = async () => {
  const session = await getServerAuthSession();

  return (
    <section className="mt-16 text-center">
      <h3 className="text-3xl font-bold text-gray-200">Join the Community</h3>
      <p className="mt-4 text-lg text-gray-400">Sign in to manage and upload your own components for others to use and improve.</p>
      <Link href={session ? "/upload" : "/api/auth/signin"} className="mt-8 inline-block bg-indigo-500 text-white px-6 py-3 rounded-full">
        {session ? "Manage Your Components" : "Sign In to Get Started"}
      </Link>
    </section>
  );
};

export default JoinCommunitySection;

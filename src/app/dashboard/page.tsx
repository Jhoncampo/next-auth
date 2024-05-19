"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
    const router = useRouter();
    const handleSignOut = async () => {
        await signOut();
        router.push("/");
    };
    return (
        <div className="w-full flex items-center justify-center">
            <div className="mx-auto flex items-center flex-col gap-4 my-10">
                <h1 className="text-white text-2xl">Dashboard</h1>
                <button
                    onClick={handleSignOut}
                    className="bg-white text-black px-4 py-2 rounded-md mt-4"
                >
                    Salir
                </button>
            </div>
        </div>
    );
};

export default Dashboard;

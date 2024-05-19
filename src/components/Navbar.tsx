import { getServerSession } from "next-auth/next";
import Link from "next/link";

const Navbar = async () => {
    const session = await getServerSession();
    console.log(session)

    return (
        <div className="w-full flex items-center py-4 justify-between bg-blue-950 px-10">
            <h1 className="text-2xl text-white">Nextauth</h1>
            <div className="flex gap-3">
                {session?.user ? (
                    <>
                        <Link href="/" className="py-2 px-4 rounded bg-white">
                            Home
                        </Link>
                        <Link href="/dashboard" className="py-2 px-4 rounded bg-white">
                            Dashboard
                        </Link>
                        <Link
                            href="/api/auth/signout"
                            className="py-2 px-4 rounded bg-white"
                        >
                            Salir
                        </Link>
                    </>
                ) : (
                    <>
                        <Link
                            href="/auth/register"
                            className="py-2 px-4 rounded bg-white"
                        >
                            Register
                        </Link>
                        <Link
                            href="/auth/login"
                            className="py-2 px-4 rounded bg-white"
                        >
                            Login
                        </Link>
                        <Link
                            href="/dashboard"
                            className="py-2 px-4 rounded bg-white"
                        >
                            Dashboard
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;

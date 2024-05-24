"use client";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface UserLogin {
    email: string;
    password: string;
}

const Login = () => {
    const [error, setError] = useState<string | null>(null);
    const [isSubmit, setIsSubmit] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserLogin>();
    const router = useRouter();


    const onSubmit = handleSubmit(async (data) => {
        setIsSubmit(true);
        try {
            const res = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false,
            });
            if (res?.error) {
                setError(res.error);
            } else {
                router.push("/dashboard");
                router.refresh();
            }
        } catch (error) {
            setError("Ha ocurrido un error en el login");
        } finally {
            setIsSubmit(false);
        }
    });

    return (
        <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
            <form className="w-1/4 " onSubmit={onSubmit} action="">
                <h1 className="text-slate-200 font-bold text-4xl mb-4">
                    Login
                </h1>
                {error && (
                    <p className="bg-red-500 text-lg text-white p-3 rounded mb-2">
                        {error}
                    </p>
                )}
                <label
                    id="email"
                    htmlFor="email"
                    className="text-slate-500 mb-2 block text-sm"
                >
                    Email:
                </label>
                <input
                    placeholder="Ingrese el email"
                    type="email"
                    {...register("email", {
                        required: "Email is required",
                    })}
                    className="p-3 rounded mb-2 block bg-slate-900 text-slate-300 w-full"
                />
                {errors.email && (
                    <span className="text-red-500 text-sm">
                        {errors.email.message}
                    </span>
                )}
                <label
                    id="password"
                    htmlFor="password"
                    className="text-slate-500 mb-2 block text-sm"
                >
                    Password:
                </label>
                <input
                    placeholder="*********"
                    type="password"
                    {...register("password", {
                        required: "Password is required",
                    })}
                    className="p-3 rounded mb-2 block bg-slate-900 text-slate-300 w-full"
                />
                {errors.password && (
                    <span className="text-red-500 text-sm">
                        {errors.password.message}
                    </span>
                )}
                <button
                    disabled={isSubmit}
                    className="w-full bg-blue-500 p-3 text-white rounded"
                >
                    {isSubmit ? "Ingresando..." : "Login"}
                </button>
            </form>
        </div>
    );
};

export default Login;

"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface UserRegister {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const RegisterPage = () => {
    const router = useRouter();
    const [isSubmit, setIsSubmit] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserRegister>();

    const onSubmit = handleSubmit(async (data) => {
        setIsSubmit(true)
        if (data.password !== data.confirmPassword) {
            return alert("Password do not match");
        }
        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                username: data.username,
                email: data.email,
                password: data.password,
            }),
        });

        if (res.ok) {
            router.push("/api/auth/signin");
        }
        setIsSubmit(false)
    });
    return (
        <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
            <form action="" className="w-1/4 " onSubmit={onSubmit}>
                <h1 className="text-slate-200 font-bold text-4xl mb-4">
                    Register
                </h1>
                <label
                    id="username"
                    htmlFor="username"
                    className="text-slate-500 mb-2 block text-sm"
                >
                    Username:
                </label>
                <input
                    placeholder="tuusuario123"
                    type="text"
                    {...register("username", {
                        required: "username is required",
                    })}
                    className="p-3 rounded mb-2 block bg-slate-900 text-slate-300 w-full"
                />
                {errors.username && (
                    <span className="text-red-500 text-sm">
                        {errors.username.message}
                    </span>
                )}
                <label
                    id="email"
                    className="text-slate-500 mb-2 block text-sm"
                    htmlFor="email"
                >
                    Email:
                </label>
                <input
                    placeholder="example@example.com"
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    className="p-3 rounded mb-2 block bg-slate-900 text-slate-300 w-full"
                />
                {errors.email && (
                    <span className="text-red-500 text-sm">
                        {errors.email.message}
                    </span>
                )}
                <label
                    id="password"
                    className="text-slate-500 mb-2 block text-sm"
                    htmlFor="password"
                >
                    Password:
                </label>
                <input
                    placeholder="***********"
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
                <label
                    id="confirmPassword"
                    className="text-slate-500 mb-2 block text-sm"
                    htmlFor="confirmPassword"
                >
                    Confirm password:
                </label>
                <input
                    placeholder="***********"
                    type="password"
                    {...register("confirmPassword", {
                        required: "Confirm password is required",
                    })}
                    className="p-3 rounded mb-2 block bg-slate-900 text-slate-300 w-full"
                />
                {errors.confirmPassword && (
                    <span className="text-red-500 text-sm">
                        {errors.confirmPassword.message}
                    </span>
                )}

                <button disabled={isSubmit} className="w-full bg-blue-500 p-3 text-white rounded">
                    Register
                </button>
            </form>
        </div>
    );
};

export default RegisterPage;

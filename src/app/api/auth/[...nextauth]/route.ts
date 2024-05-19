import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/libs/db";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "hola" },
                password: { label: "Passsword", type: "password" },
            },
            async authorize(credentials: any, req) {
                const userFound: any = await db.user.findUnique({
                    where: {
                        email: credentials?.email,
                    },
                });
                if (!userFound) {
                    console.log("error en el email");
                    throw new Error("No user found");
                }

                const isCorrect = await bcrypt.compare(
                    credentials.password,
                    userFound.password
                );

                if (!isCorrect) {
                    console.log("Error en la contraseña");
                    throw new Error("Wrong password");
                }
                console.log("Ingreso correcto");
                return {
                    id: userFound.id,
                    name: userFound.username,
                    email: userFound.email,
                };
            },
        }),
    ],
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

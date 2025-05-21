"use server";

import { signIn, signOut } from '@/lib/auth';
import bcrypt from "bcryptjs";
import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import { logInSchema, signUpSchema } from "@/lib/validations";
import { Prisma } from '@prisma/client';
import { AuthError } from 'next-auth';

export async function logIn(authData: unknown) {
    const validatedAuthData = logInSchema.safeParse(authData);
    if (!validatedAuthData.success) {
        console.error("Invalid login data");
        return {
            message: "Invalid login data. Please try again.",
        };
    }

    try {
        await signIn('credentials', validatedAuthData.data);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin": {
                    console.error("Invalid credentials");
                    return {
                        message: "Email or password is incorrect. Please try again.",
                    };
                }
                default: {
                    console.error("An unknown error occurred during sign in");
                    return {
                        message: "An unknown error occurred during sign in. Please try again.",
                    };
                }
            }
        }
        throw error;
    }
}

export async function logOut() {
    await signOut({ redirectTo: '/' });
}

export async function signUp(formData: unknown) {
    const validatedFormData = signUpSchema.safeParse(formData);
    if (!validatedFormData.success) {
        console.error("Invalid sign up data");
        return {
            error: "Invalid sign up data. Please try again.",
        };
    }

    try {
        const password = validatedFormData.data.password;
        const hashedPassword = await bcrypt.hash(password, 10);

        const photo = validatedFormData.data.photo as unknown as File;

        let photoUrl = "";

        try {
            if (photo && photo.size > 0) {
                const arrayBuffer = await photo.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);

                const result = await new Promise<string>((resolve, reject) => {
                    cloudinary.uploader.upload_stream(
                        { folder: "owners_avatars" },
                        (error, result) => {
                            if (error || !result) return reject(error);
                            resolve(result.secure_url);
                        }
                    ).end(buffer);
                });

                photoUrl = result;
            } else {   
                const firstName = validatedFormData.data.firstName as string;
                const lastName = validatedFormData.data.lastName as string;

                photoUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(firstName + " " + lastName)}&background=random&size=128`;
            }
        }
        catch (error) {
            console.error("Photo upload failed: ", error);
            throw new Error("Photo upload failed. Please try again.");
        }

        try {
            await prisma.owner.create({
                data: {
                    firstName: validatedFormData.data.firstName as string,
                    lastName: validatedFormData.data.lastName as string,
                    email: validatedFormData.data.email as string,
                    password: hashedPassword,
                    bio: validatedFormData.data.bio as string,
                    avatarUrl: photoUrl
                },
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
                console.error("Email already exists: ", error);
                return {
                    error: "Email already exists. Please try again.",
                };
            }
           
            return {
                message: 'Failed to create owner'
            };
        }

        const credentialsData = {
            email: validatedFormData.data.email as string,
            password: password,
        };

        await signIn('credentials', credentialsData);   
    } catch (error) {
        // if (error instanceof Error && error.message === "NEXT_REDIRECT") {
        //     return {}; 
        // }

        console.error("Sign up error: ", error);
        // return { error: "Something went wrong. Please try again." };
        throw error;
    }
}
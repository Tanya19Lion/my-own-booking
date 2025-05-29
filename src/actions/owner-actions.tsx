"use server";

import { signIn, signOut } from '@/lib/auth';
import bcrypt from "bcryptjs";
import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import { logInSchema, signUpSchema } from "@/lib/validations";
import { Prisma } from '../../prisma/app/generated/prisma-client';
import { AuthError } from 'next-auth';
import { ALLOWED_TYPES, MAX_FILE_SIZE } from "@/lib/constants";
import { redirect } from 'next/navigation';

export async function logIn(authData: unknown) {
    const validatedAuthData = logInSchema.safeParse(authData);
    if (!validatedAuthData.success) {
        console.error("Invalid login data");
        return {
            message: "Invalid login data. Please check your inputs and try again.",
        };
    }

    try {
        await signIn('credentials', validatedAuthData.data);
        redirect('/owner/dashboard');
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin": {
                    console.error("Invalid credentials");
                    return {
                        message: "Email or password is incorrect. Please check your inputs and try again.",
                    };
                }
                default: {
                    console.error("An unknown error occurred during sign in");
                    return {
                        message: "An unknown error occurred during sign in. Please check your inputs and try again.",
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

export async function signUp(formData: FormData) {        
    if (!formData || !(formData instanceof FormData)) {
        console.error('Invalid form data');
        return {
            message: "Invalid form data. Please try again.",
        };
    }

    const rawData = {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        bio: formData.get("bio"),
        email: formData.get("email"),
        password: formData.get("password"),
    };

    const validatedFormData = signUpSchema.safeParse(rawData);
    if (!validatedFormData.success) {
        return { error: "Invalid sign up data. Please check your inputs and try again." };
    }

    try {
        const password = validatedFormData.data.password;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const photo = formData.get("photo");
        const file = photo instanceof File && photo.size > 0 ? photo : null;
        let photoUrl = "";

        try {
            if (file && file.size > 0) {
                if (!ALLOWED_TYPES.includes(file.type)) {
                    return {
                        message: "Invalid file type. Only JPG, PNG, and WEBP are allowed.",
                    };
                }

                if (file.size > MAX_FILE_SIZE) {
                    return {
                        message: `File size exceeds the 300KB limit.`,
                    };
                }

                const arrayBuffer = await file.arrayBuffer();
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
            return {
                message: "Photo upload failed. Please check your data and try again."
            };
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
                    error: "Email already exists. Please try again with something else.",
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
        redirect('/owner/dashboard');   
    } catch (error) {
        console.error("Sign up error: ", error);
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                return {
                    error: "Email already exists. Please try again with something else.",
                };
            }
        }
        throw error;
    }
}
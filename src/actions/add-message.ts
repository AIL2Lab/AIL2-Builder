"use server";
import { z } from "zod";
import prisma from "@/lib/prisma";

const illegalCodePattern =
  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>|javascript:|on\w+=/gi;
const MessageSchema = z.object({
  name: z
    .string()
    .trim() 
    .min(1, "Name cannot be empty.") 
    .max(10, "Name must be at least 10 characters long.") 
    .refine((val) => !illegalCodePattern.test(val), {
      message: "Name contains invalid or potentially dangerous code.",
    }),
  email: z.email("Please enter a valid email address."),
  message: z
    .string()
    .trim() 
    .min(1, "Message cannot be empty.") 
    .min(10, "Message must be at least 10 characters long.") 
    .max(500, "Message cannot exceed 500 characters.") 
    .refine((val) => !illegalCodePattern.test(val), {
      message: "Message contains invalid or potentially dangerous code.",
    }),
});

export async function addMessage(prevState: any, formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");
  
  if (!name) {
    return { error: "Name cannot be empty" };
  }
  if (!email) {
    return { error: "Email cannot be empty." };
  }
  if (!message) {
    return { error: "Message cannot be empty." };
  }
  const validation = MessageSchema.safeParse({ name, email, message });
  if (!validation.success) {
    return {
      error: validation.error.issues[0].message,
    };
  }
  try {
    await prisma.contact.create({
      data: {
        name: validation.data.name,
        email: validation.data.email,
        message: validation.data.message,
      },
    });
    return {
      success: true,
      message: "successful",
    };
  } catch (error: any) {
    if (error.code === "P2002") {
      return {
        error: "This email address has already been subscribed to.",
      };
    }
    console.error("Database operation failed:", error);
    return {
      error: "An unknown error has occurred. Please try again later.",
    };
  }
}

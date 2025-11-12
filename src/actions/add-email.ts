"use server";
import { z } from "zod";
import prisma from "@/lib/prisma";

const EmailSchema = z.object({
  email: z.email("Please enter a valid email address."),
});

export async function addEmail(prevState: any, formData: FormData) {
  const email = formData.get("email");
  if (!email) {
    return { error: "Email cannot be empty." }
  }
  const validation = EmailSchema.safeParse({ email });
  console.log(validation);
  if (!validation.success) {
    return {
      error: validation.error.issues[0].message,
    };
  }
  try {
    await prisma.subscriber.create({
      data: {
        email: validation.data.email,
      },
    });
    return {
      success: true,
      message: 'aaa'
    };
  } catch (error: any) {
    // email exist
    if (error.code === "P2002") {
      return {
        error: "This email address has already been subscribed to.",
      };
    }

    // other error
    console.error("Database operation failed:", error);
    return {
      error: "An unknown error has occurred. Please try again later.",
    };
  }
}

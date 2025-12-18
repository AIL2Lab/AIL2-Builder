import { errorResponse, successResponse } from "@/lib/api-response";
import prisma from "@/lib/prisma";
import { randomBytes } from "crypto";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const nonce = randomBytes(32).toString("hex");
    const message = `Please sign to log in AIL2\n\nNonce: ${nonce}`;

    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await prisma.authNonce.create({
      data: {
        nonce,
        address: "",
        expiresAt,
      },
    });
    return successResponse(
      {
        nonce,
        message,
      },
      "Successfully obtained nonce."
    );
  } catch (error: any) {
    return errorResponse(error.message, 500);
  }
}

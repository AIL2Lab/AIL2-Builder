import { errorResponse, successResponse } from "@/lib/api-response";
import { NextRequest, NextResponse } from "next/server";
import { verifyMessage } from "viem";
import prisma from "@/lib/prisma";
import { signToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const { address, signature, message } = await request.json();
    if (!address || !signature || !message) {
      return errorResponse("Missing necessary parameters", 400);
    }
    const nonceMatch = message.match(/Nonce: ([a-f0-9]+)/);
    if (!nonceMatch) {
      return errorResponse("Invalid message format", 400);
    }
    const nonce = nonceMatch[1];
    
    const result = await prisma.$transaction(async (tx) => {
      const storedNonce = await tx.authNonce.findUnique({
        where: { nonce },
      });
      if (!storedNonce || storedNonce.expiresAt < new Date()) {
        return null; 
      }

      await tx.authNonce.delete({
        where: { nonce },
      });

      return storedNonce;
    });
    
    if (!result) {
      return errorResponse("The nonce is invalid or expired. Please re-sign.", 400);
    }
    
    try {
      const isValid = await verifyMessage({
        address: address as `0x${string}`,
        message: message,
        signature: signature as `0x${string}`,
      });

      if (!isValid) {
        throw new Error('Signature mismatch');
      }
    } catch (error) {
      return errorResponse("Signature verification failed", 401);
    }
    
    const user = await prisma.user.upsert({
      where: { address: address.toLowerCase() },
      update: { updatedAt: new Date() }, 
      create: { 
        address: address.toLowerCase(),
      },
      select: { id: true, address: true } 
    });

    const token = await signToken({
      userId: user.id,
      address: user.address,
    });

    return successResponse(
      {
        token,
        address: user.address,
      },
      "Login successful",
      200
    );
  } catch (error) {}
}

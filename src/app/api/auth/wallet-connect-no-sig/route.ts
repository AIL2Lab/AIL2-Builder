import { NextResponse } from "next/server";
import * as jose from "jose";
import prisma from "@/lib/prisma";
import { signToken } from "@/lib/auth";
import { errorResponse, successResponse } from "@/lib/api-response";

// 禁用路由缓存
export const dynamic = "force-dynamic";
const ETH_ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;
export async function POST(request: Request) {
  try {
    const { address } = await request.json();
    if (!address) {
      return errorResponse("Missing necessary parameters", 400);
    }
    if (typeof address !== 'string' || !ETH_ADDRESS_REGEX.test(address)) {
      return errorResponse("Invalid wallet address format", 400);
    }
    const formattedAddress = address.toLowerCase();

    const user = await prisma.user.upsert({
      where: { address: formattedAddress },
      update: {},
      create: {
        address: formattedAddress,
      },
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
  } catch (error) {
    return errorResponse(`服务器错误`, 500, error);
  }
}

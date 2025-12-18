import { errorResponse, successResponse } from "@/lib/api-response";
import { verifyToken } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const requestHeaders = request.headers;
    const userId = requestHeaders.get("x-user-id") || undefined;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    return successResponse(user);
  } catch (error) {
    return errorResponse("服务器错误", 500, error);
  }
}

export async function PUT(request: NextRequest) {
  try {
    const requestHeaders = request.headers;
    const userId = requestHeaders.get("x-user-id") || undefined;
    const { nickname, avatar } = await request.json();
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        nickname,
        avatar,
      },
    });
    return successResponse(user, 'updated successful');
  } catch (error) {
    return errorResponse("服务器错误", 500, error);
  }
}

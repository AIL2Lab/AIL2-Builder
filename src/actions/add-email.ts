
"use server";

export async function addEmail(email: string) {
    if(!email) return
    // 数据库操作
    console.log(`数据库操作${email}`);
}
import { PrismaClient } from '@/generated/client'

const prismaClientSingleton = () => {
    return new PrismaClient({
        log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
        // 配置事务选项，增加超时时间
        transactionOptions: {
            maxWait: 5000,     // 最大等待时间 5秒
            timeout: 10000,    // 事务超时时间 10秒
        },
    })
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClientSingleton | undefined
}

const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

// 确保在开发环境中重用同一个实例
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// 在应用关闭时断开连接
if (typeof window === 'undefined') {
    process.on('beforeExit', async () => {
        await prisma.$disconnect()
    })
}

export default prisma
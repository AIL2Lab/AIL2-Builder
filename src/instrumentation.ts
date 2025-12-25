// src/instrumentation.ts

export async function register() {
  // 确保只在 Node.js 环境运行（服务端）
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    console.log('🔧 [Instrumentation] 正在初始化服务...');

    try {
      // 动态导入，避免在客户端执行
      const { smartIndexerService } = await import('@/services/onchain/smartIndexer.service');

      // 检查是否成功导入
      if (!smartIndexerService) {
        throw new Error('smartIndexerService 导入失败');
      }

      console.log('✅ [Instrumentation] smartIndexerService 导入成功');

      // 异步启动，不阻塞服务器启动
      smartIndexerService.start().catch(err => {
        console.error('❌ [Instrumentation] Indexer 启动失败:', err);
      });

    } catch (error) {
      console.error('❌ [Instrumentation] 导入失败:', error);
    }
  }
}

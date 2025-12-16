// src/instrumentation.ts

export async function register() {
  // ⚠️ 关键检查：确保只在 Node.js 运行时启动 (Next.js 还有 Edge 运行时，那里不支持长连接)
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    
    // 动态导入，避免在 Edge 环境或其他非 Server 环境下加载依赖
    // 这里的路径根据你的实际结构调整
    const { smartIndexer } = await import('@/services/smartIndexer.service');

    // 初始化并启动
    // 注意：init 是异步的，但 register 函数不会等待它完成才启动服务器
    // 这样不会阻塞 Next.js 的启动速度
    smartIndexer.init().then(() => {
      smartIndexer.start();
    }).catch(err => {
      console.error('❌ [Instrumentation] Indexer 启动失败:', err);
    });
  }
}
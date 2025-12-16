import cron from 'node-cron';
import 'dotenv/config'; 

// const API_URL = process.env.NEXT_PUBLIC_API_URL 
//   ? `${process.env.NEXT_PUBLIC_API_URL}/api/cron/check-iao` 
//   : 'http://127.0.0.1:3000/api/cron/check-iao';

  const API_URL = 'http://127.0.0.1:3000/api/cron/check-iao'
const CRON_SECRET = process.env.CRON_SECRET;

// if (!CRON_SECRET) {
//   console.error('❌ 错误: 未找到环境变量 CRON_SECRET');
//   process.exit(1);
// }

console.log('🚀 [ESM] Cron Worker 已启动 (Fetch版)');
console.log(`📡 目标接口: ${API_URL}`);

// 定义定时规则：每 5 分钟执行一次
cron.schedule('*/5 * * * *', async () => {
  const timestamp = new Date().toLocaleString();
  console.log(`[${timestamp}] ⏳ 开始执行定时检查...`);

  try {
    // 使用原生 fetch
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CRON_SECRET}`
      }
    });

    // fetch 不会像 axios 那样在 4xx/5xx 时抛出异常，需要手动判断 ok
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[${timestamp}] ❌ 请求失败: ${response.status} ${response.statusText}`);
      console.error(`详情: ${errorText}`);
      return;
    }

    const data = await response.json();
    console.log(`[${timestamp}] ✅ 执行成功:`, JSON.stringify(data));

  } catch (error) {
    // 这里的 catch 通常捕获网络错误（如连接被拒绝、DNS解析失败等）
    console.error(`[${timestamp}] 💥 网络或执行异常:`, error.message);
  }
});
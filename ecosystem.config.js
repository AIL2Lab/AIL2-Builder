module.exports = {
  apps : [
    {
      name: 'AIL2',       // 应用名称
      script: 'npm',             // 启动脚本
      args: 'start',             // 传递给脚本的参数，相当于执行 `npm start`
      cwd: './',                 // 项目的根目录
      instances: 1,              // 启动的实例数量
      exec_mode: 'fork',         // 进程模式，'fork' 或 'cluster'
      autorestart: true,         // 应用崩溃后自动重启
      watch: false,              // 生产环境不建议开启文件监听
      max_memory_restart: '1G',  // 当内存超过 1G 时自动重启
      env: {
        NODE_ENV: 'production',  // 设置环境变量
        PORT: 3003               // 指定端口
      }
    }
  ]
}

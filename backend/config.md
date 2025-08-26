# 环境变量配置说明

请在 `backend` 文件夹下创建 `.env` 文件，内容如下：

```env
# 通义千问API配置
QWEN_API_KEY=sk-08daee7bef824a6eb7d26562ae34c334

# 服务器配置
PORT=3001
NODE_ENV=development

# CORS配置（前端地址）
FRONTEND_URL=http://localhost:8080
```

## 启动服务

```bash
# 进入后端目录
cd backend

# 安装依赖（如果还没安装）
npm install

# 启动开发服务器
npm run dev
```

## 测试API

```bash
# 测试聊天接口
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "你好，请介绍一下这个数字博物馆"}'
```

## API配置说明

- **Endpoint**: `https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions`
- **模型**: `qwen-plus`
- **API密钥**: `sk-08daee7bef824a6eb7d26562ae34c334`
- **格式**: OpenAI兼容格式

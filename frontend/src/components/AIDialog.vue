<template>
  <transition appear enter-active-class="animate__animated animate__fadeInUp" leave-active-class="animate__animated animate__fadeOutDown">
    <div v-if="visible" class="ai-dialog" role="dialog" aria-modal="true" aria-label="AI 对话">
      <div class="ai-dialog-head">
        <div class="title">站内智能体</div>
        <button class="close" @click="close">✕</button>
      </div>
      <div class="ai-dialog-body">
        <div class="messages">
          <div v-for="(m,i) in messages" :key="i" class="msg" :class="m.role">
            <div class="bubble">{{ m.text }}</div>
          </div>
        </div>
        <div class="input-row">
          <input v-model="input" class="input" placeholder="请输入..." @keyup.enter="send" />
          <button class="send" @click="send">发送</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import 'animate.css'

export default {
  name: 'AIDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      input: '',
      messages: [
        { role: 'ai', text: '你好，我是站内智能体，很高兴为你服务。' },
        { role: 'ai', text: '你可以问我关于页面内容或导航的问题～' }
      ]
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    async send() {
      const content = (this.input || '').trim()
      if (!content) return
      
      // 添加用户消息
      this.messages.push({ role: 'user', text: content })
      this.input = ''
      
      // 显示加载状态
      const loadingMessage = { role: 'ai', text: '正在思考中...', loading: true }
      this.messages.push(loadingMessage)
      
      try {
        // 调用后端API
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: content,
            history: this.messages.slice(0, -1).filter(msg => !msg.loading) // 排除加载消息
          })
        })
        
        const data = await response.json()
        
        // 移除加载消息
        const loadingIndex = this.messages.findIndex(msg => msg.loading)
        if (loadingIndex !== -1) {
          this.messages.splice(loadingIndex, 1)
        }
        
        if (data.success) {
          this.messages.push({ role: 'ai', text: data.message })
        } else {
          this.messages.push({ 
            role: 'ai', 
            text: data.error || '抱歉，我现在无法回答，请稍后再试。' 
          })
        }
      } catch (error) {
        console.error('Chat API Error:', error)
        
        // 移除加载消息
        const loadingIndex = this.messages.findIndex(msg => msg.loading)
        if (loadingIndex !== -1) {
          this.messages.splice(loadingIndex, 1)
        }
        
        this.messages.push({ 
          role: 'ai', 
          text: '网络连接有问题，请检查网络后重试。' 
        })
      }
    }
  }
}
</script>

<style scoped>
.ai-dialog {
  position: fixed; 
  right: 20px; 
  bottom: 20px; 
  width: 360px; 
  max-width: calc(100% - 40px);
  background: #fff; 
  border-radius: 16px; 
  border: 1px solid #eef2f7; 
  box-shadow: 0 12px 30px rgba(0,0,0,.15);
  z-index: 1999; 
  display: flex; 
  flex-direction: column; 
  overflow: hidden;
}

.ai-dialog-head { 
  display: flex; 
  align-items: center; 
  justify-content: space-between; 
  padding: 10px 12px; 
  border-bottom: 1px solid #f1f5f9; 
}

.ai-dialog-head .title { 
  font-weight: 800; 
  color: #111827; 
}

.ai-dialog-head .close { 
  border: 1px solid #e5e7eb; 
  background: #fff; 
  border-radius: 10px; 
  padding: .25rem .5rem; 
  cursor: pointer; 
  transition: all 0.2s ease;
}

.ai-dialog-head .close:hover {
  background: #f3f4f6;
  border-color: #d1d5db;
}

.ai-dialog-body { 
  padding: 10px; 
  display: grid; 
  grid-template-rows: 1fr max-content; 
  gap: 10px; 
  height: 360px; 
}

.messages { 
  overflow: auto; 
  display: grid; 
  gap: 8px; 
  align-content: start; 
}

.msg { 
  display: flex; 
}

.msg.user { 
  justify-content: flex-end; 
}

.msg .bubble { 
  max-width: 80%; 
  padding: 8px 12px; 
  border-radius: 12px; 
  line-height: 1.5; 
}

.msg.user .bubble { 
  background: #111827; 
  color: #fff; 
  border-bottom-right-radius: 4px; 
}

.msg.ai .bubble { 
  background: #f3f4f6; 
  color: #111827; 
  border-bottom-left-radius: 4px; 
}

.msg.ai .bubble.loading {
  background: #f3f4f6;
  color: #6b7280;
  font-style: italic;
  position: relative;
}

.msg.ai .bubble.loading::after {
  content: '';
  display: inline-block;
  width: 12px;
  height: 12px;
  border: 2px solid #6b7280;
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-left: 8px;
}

.input-row { 
  display: grid; 
  grid-template-columns: 1fr max-content; 
  gap: 8px; 
}

.input { 
  border: 1px solid #e5e7eb; 
  border-radius: 10px; 
  padding: 8px 10px; 
  outline: none; 
  transition: border-color 0.2s ease;
}

.input:focus {
  border-color: #dc2626;
}

.send { 
  background: linear-gradient(135deg, #dc2626, #ef4444); 
  color: #fff; 
  border: 0; 
  border-radius: 10px; 
  padding: 8px 14px; 
  font-weight: 700; 
  cursor: pointer; 
  transition: all 0.2s ease;
}

.send:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(220, 38, 38, 0.3);
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .ai-dialog {
    right: 10px;
    bottom: 10px;
    width: calc(100% - 20px);
    max-width: none;
  }
}
</style>

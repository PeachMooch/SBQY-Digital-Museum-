<template>
  <div>
    <div
      class="ai-float animate__animated animate__pulse animate__infinite"
      :style="{ left: position.x + 'px', top: position.y + 'px', backgroundImage: `url(${sticker})` }"
      @mousedown.prevent="startDrag"
      @touchstart.prevent="startDrag"
      @mouseenter="showTip = true"
      @mouseleave="showTip = false"
      @click="open = true"
      role="button"
      aria-label="AI 智能体"
    >
      <div class="label-mini">AI 智能体</div>
      <div v-if="showTip" class="tip-bubble animate__animated animate__fadeIn">点我试试吧</div>
    </div>

    <transition appear enter-active-class="animate__animated animate__fadeInUp" leave-active-class="animate__animated animate__fadeOutDown">
      <div v-if="open" class="ai-dialog" role="dialog" aria-modal="true" aria-label="AI 对话">
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

    
  </div>
</template>

<script>
import 'animate.css'
import stickerPng from '@/assets/images/wenchuang/冰箱贴/冰箱贴2.png'
export default {
  name: 'AIFloatingAssistant',
  data(){
    return {
      open: false,
      dragging: false,
      position: { x: 24, y: 240 },
      floatSize: { width: 88, height: 88 },
      showTip: false,
      offset: { x: 0, y: 0 },
      input: '',
      messages: [
        { role: 'ai', text: '你好，我是站内智能体，很高兴为你服务。' },
        { role: 'ai', text: '你可以问我关于页面内容或导航的问题～' }
      ],
      sticker: stickerPng
    }
  },
  mounted(){
    window.addEventListener('mousemove', this.onMove)
    window.addEventListener('mouseup', this.endDrag)
    window.addEventListener('touchmove', this.onMove, { passive: false })
    window.addEventListener('touchend', this.endDrag)
  },
  beforeDestroy(){
    window.removeEventListener('mousemove', this.onMove)
    window.removeEventListener('mouseup', this.endDrag)
    window.removeEventListener('touchmove', this.onMove)
    window.removeEventListener('touchend', this.endDrag)
  },
  methods: {
    startDrag(e){
      this.dragging = true
      const point = this.getPoint(e)
      this.offset.x = point.x - this.position.x
      this.offset.y = point.y - this.position.y
    },
    onMove(e){
      if (!this.dragging) return
      e.preventDefault && e.preventDefault()
      const point = this.getPoint(e)
      const x = point.x - this.offset.x
      const y = point.y - this.offset.y
      this.position.x = Math.max(8, Math.min(window.innerWidth - this.floatSize.width - 8, x))
      this.position.y = Math.max(80, Math.min(window.innerHeight - this.floatSize.height - 8, y))
    },
    endDrag(){ this.dragging = false },
    getPoint(e){
      if (e.touches && e.touches[0]) return { x: e.touches[0].clientX, y: e.touches[0].clientY }
      return { x: e.clientX, y: e.clientY }
    },
    close(){ this.open = false },
    send(){
      const content = (this.input || '').trim()
      if (!content) return
      this.messages.push({ role: 'user', text: content })
      this.input = ''
      const replies = [
        '已为你定位到数字博物馆首页（/home）。',
        '你可以在首页查看实践地图与团队介绍。',
        '需要我带你去 F1 运斤成风 展厅吗？',
        '农业特展入口在导航右侧「农业非遗特展」。'
      ]
      const pick = replies[Math.floor(Math.random() * replies.length)]
      setTimeout(() => { this.messages.push({ role: 'ai', text: pick }) }, 400)
    }
  }
}
</script>

<style scoped>
.ai-float {
  position: fixed;
  width: 88px;
  height: 88px;
  border-radius: 16px;
  background: #fff;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: block;
  box-shadow:
    0 12px 28px rgba(0,0,0,0.28),
    0 6px 14px rgba(0,0,0,0.22),
    inset 0 1px 1px rgba(255,255,255,0.6);
  cursor: grab;
  z-index: 1500;
  user-select: none;
}
.ai-float:hover { transform: translateY(-1px); transition: transform .15s ease; }

.label-mini {
  position: absolute;
  top: -18px;
  left: 4px;
  padding: 2px 6px;
  font-size: 12px;
  font-weight: 700;
  color: #ef4444;
  background: #fff;
  border: 1px solid #fee2e2;
  border-radius: 999px;
  box-shadow: 0 2px 6px rgba(239,68,68,0.25);
}

.tip-bubble {
  position: absolute;
  right: -8px;
  top: -14px;
  background: #111827;
  color: #fff;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 8px;
  white-space: nowrap;
  box-shadow: 0 6px 16px rgba(0,0,0,0.25);
}
.tip-bubble::after {
  content: '';
  position: absolute;
  bottom: -6px;
  right: 12px;
  border-width: 6px 6px 0 6px;
  border-style: solid;
  border-color: #111827 transparent transparent transparent;
}
.ai-entry {
  position: fixed;
  right: 18px;
  bottom: 18px;
  border: 0;
  border-radius: 999px;
  background: #111827;
  color: #fff;
  padding: 10px 14px;
  font-weight: 700;
  box-shadow: 0 8px 16px rgba(0,0,0,0.25);
  z-index: 1400;
}
.ai-dialog {
  position: fixed; right: 20px; bottom: 78px; width: 360px; max-width: calc(100% - 40px);
  background: #fff; border-radius: 16px; border: 1px solid #eef2f7; box-shadow: 0 12px 30px rgba(0,0,0,.15);
  z-index: 1999; display: flex; flex-direction: column; overflow: hidden;
}
.ai-dialog-head { display: flex; align-items: center; justify-content: space-between; padding: 10px 12px; border-bottom: 1px solid #f1f5f9; }
.ai-dialog-head .title { font-weight: 800; color: #111827; }
.ai-dialog-head .close { border: 1px solid #e5e7eb; background: #fff; border-radius: 10px; padding: .25rem .5rem; cursor: pointer; }
.ai-dialog-body { padding: 10px; display: grid; grid-template-rows: 1fr max-content; gap: 10px; height: 360px; }
.messages { overflow: auto; display: grid; gap: 8px; align-content: start; }
.msg { display: flex; }
.msg.user { justify-content: flex-end; }
.msg .bubble { max-width: 80%; padding: 8px 12px; border-radius: 12px; line-height: 1.5; }
.msg.user .bubble { background: #111827; color: #fff; border-bottom-right-radius: 4px; }
.msg.ai .bubble { background: #f3f4f6; color: #111827; border-bottom-left-radius: 4px; }
.input-row { display: grid; grid-template-columns: 1fr max-content; gap: 8px; }
.input { border: 1px solid #e5e7eb; border-radius: 10px; padding: 8px 10px; outline: none; }
.send { background: linear-gradient(135deg, #dc2626, #ef4444); color: #fff; border: 0; border-radius: 10px; padding: 8px 14px; font-weight: 700; cursor: pointer; }
</style>

<template>
  <MainLayout>
    <div class="sd-f3">
      <div class="center-card">
        <img :src="require('@/assets/images/shandong/00.png')" alt="展板" class="center-image" />
        <div class="actions">
          <router-link to="/shandong/f3/detail" class="btn primary">了解详情</router-link>
          <router-link to="/shandong/f3/interview" class="btn ghost">访谈纪要</router-link>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from '@/layouts/MainLayout.vue'

export default {
  name: 'ShandongF3HomePage',
  components: { MainLayout },
  mounted() {
    document.body.style.backgroundImage = `url(${require('@/assets/images/shandong/3层.jpg')})`;
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundSize = 'cover';
  },
  destroyed() {
    document.body.style.backgroundImage = ''
  }
}
</script>

<style scoped>
.sd-f3 { min-height: 100vh; display: flex; align-items: center; justify-content: center; }
.center-card { background: rgba(255,255,255,0.9); border-radius: 16px; padding: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.25); backdrop-filter: blur(8px); }
.center-image { width: min(82vw, 980px); max-height: 70vh; object-fit: contain; display: block; }
.actions { display: flex; gap: 12px; justify-content: center; margin-top: 16px; }
.btn { padding: 10px 18px; border-radius: 10px; text-decoration: none; font-weight: 600; }
.primary { background: #2563eb; color: #fff; }
.ghost { background: rgba(0,0,0,0.5); color: #fff; }
</style>



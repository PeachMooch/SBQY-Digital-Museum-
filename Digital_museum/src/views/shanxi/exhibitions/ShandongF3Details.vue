<template>
  <MainLayout>
    <div class="detail-page">
      <header class="header">了解详情</header>
      <div class="card scrollable">
        <img :src="require('@/assets/images/shandong/1.png')" class="v-img" alt="1" />
        <img :src="require('@/assets/images/shandong/2.png')" class="v-img" alt="2" />
        <img :src="require('@/assets/images/shandong/5.png')" class="v-img" alt="5" />
      </div>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from '@/layouts/MainLayout.vue'
export default { 
  name: 'ShandongF3Details', 
  components: { MainLayout },
  mounted() {
    document.body.style.backgroundImage = `url(${require('@/assets/images/shandong/微信图片_2025-08-23_141907_562.png')})`
    document.body.style.backgroundRepeat = 'no-repeat'
    document.body.style.backgroundSize = 'cover'
  },
  destroyed() { document.body.style.backgroundImage = '' }
}
</script>

<style scoped>
.header { font-size: 28px; font-weight: 700; margin: 10px 0 16px; color: #fff; text-shadow: 0 2px 6px rgba(0,0,0,.45) }
.card { background: rgba(255,255,255,.92); border-radius: 14px; padding: 16px; box-shadow: 0 10px 30px rgba(0,0,0,.2); max-width: 980px; margin: 0 auto }
.v-img { width: 100%; display: block; margin-bottom: 16px; border-radius: 8px }

.scrollable { max-height: 72vh; overflow: auto; }
.scrollable::-webkit-scrollbar { width: 10px; }
.scrollable::-webkit-scrollbar-thumb { background: rgba(0,0,0,.2); border-radius: 8px; }
.scrollable::-webkit-scrollbar-track { background: transparent; }
</style>




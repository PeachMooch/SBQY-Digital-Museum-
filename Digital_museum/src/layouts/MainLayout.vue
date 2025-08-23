<template>
  <div class="main-layout">
    <div class="page">
      <main>
        <div class="top-row px-4">
          <LoginDisplay />
        </div>
        <article class="content px-4">
          <slot></slot>
        </article>
      </main>
    </div>
  </div>
</template>

<script>
import LoginDisplay from '@/components/shanxi/LoginDisplay.vue'

export default {
  name: 'MainLayout',
  components: {
    LoginDisplay
  }
}
</script>

<style scoped>
.main-layout {
  min-height: 100vh;
  width: 100%;
}

.page {
  width: 100%;
  min-height: 100vh;
  position: relative;
}

.top-row {
  background: rgba(0, 0, 0, 0.1);
  padding: 10px 20px;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1000;
}

.px-4 {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

.content {
  padding-top: 60px; /* 为顶部导航留出空间 */
}

/* 全局样式重置 */
.main-layout :deep(body) {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}
</style>

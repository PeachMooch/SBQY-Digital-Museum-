<template>
  <footer class="site-footer-minimal" aria-label="页面页脚">
    <div class="container">
      <div class="brand">
        <img :src="logoSrc" alt="团队徽标" class="logo" />
        <span class="name">溯本求源 <span class="sep">|</span> 文润经心</span>
      </div>
      <nav class="links">
        <a href="#mission">愿景与使命</a>
        <a href="#team">团队介绍</a>
      </nav>
      <small class="copyright">© 2025 天津大学管理与经济学部</small>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'SiteFooter',
  props: {
    logoSrc: { type: String, default: () => require('@/assets/images/practice-team-logo.png') }
  }
}
</script>

<style scoped>
.site-footer-minimal { border-top: 1px solid #eef2f7; background: linear-gradient(180deg,#fff5f5 0%,#fff 100%); padding: 16px 0 24px; }
.container { max-width: 1100px; margin: 0 auto; padding: 0 16px; display: grid; gap: 8px; justify-items: center; }
.brand { display: inline-flex; align-items: center; gap: 8px; }
.logo { width: 40px; height: 40px; border-radius: 12px; object-fit: cover; background: #fff; box-shadow: 0 6px 14px rgba(0,0,0,.08); }
.name { font-weight: 700; color: #111827; }
.name .sep { color: #ef4444; margin: 0 6px; }
.links { display: inline-flex; gap: 12px; }
.links a { color: #6b7280; text-decoration: none; font-size: .9rem; }
.links a:hover { color: #ef4444; }
.copyright { color: #9ca3af; }
</style>



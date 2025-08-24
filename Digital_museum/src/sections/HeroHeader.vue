<template>
  <section class="hero-cta" aria-labelledby="hero-title">
    <div class="container">
      <div class="hero-inner">
        <div class="hero-brand">
          <img :src="logoSrc" alt="项目徽标" class="hero-logo" />
          <h1 id="hero-title" class="hero-title">溯本求源 <span class="sep">|</span> 文润经心</h1>
        </div>
        <p class="hero-tagline">{{ tagline }}</p>
        <div class="hero-actions">
          <a v-for="(a,idx) in actions" :key="idx" :href="a.to" class="hero-btn" :aria-label="a.text">
            {{ a.text }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeroHeader',
  props: {
    tagline: { type: String, default: '' },
    actions: { type: Array, default: () => [] },
    logoSrc: { type: String, default: () => require('@/assets/images/practice-team-logo.png') }
  }
}
</script>

<style scoped>
.hero-cta { background: linear-gradient(180deg,#fff 0%,#fff7f7 100%); padding: 2rem 0; }
.container { max-width: 1100px; margin: 0 auto; padding: 0 1rem; }
.hero-inner { display: grid; gap: .75rem; align-items: center; text-align: center; }
.hero-brand { display: inline-flex; align-items: center; gap: .5rem; justify-content: center; }
.hero-logo { width: 40px; height: 40px; border-radius: 999px; object-fit: cover; background: #fff; box-shadow: 0 6px 14px rgba(0,0,0,.08); }
.hero-title { font-size: 1.5rem; font-weight: 800; color: #111827; }
.hero-title .sep { color: #ef4444; margin: 0 6px; }
.hero-tagline { color: #374151; font-size: 1rem; }
.hero-actions { display: inline-flex; gap: .75rem; margin-top: .5rem; flex-wrap: wrap; justify-content: center; }
.hero-btn { padding: .5rem .9rem; border-radius: .75rem; border: 1px solid #fecaca; background: #fff5f5; color: #b91c1c; font-weight: 700; text-decoration: none; transition: transform .15s ease, box-shadow .2s ease; box-shadow: 0 6px 16px rgba(239,68,68,.08); }
.hero-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(239,68,68,.15); }
@media (max-width: 768px){ .hero-title{ font-size: 1.25rem; } }
</style>



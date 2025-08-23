<template>
  <div class="homepage bg-background text-foreground">
    <!-- 全局加载动画 -->
    <div v-if="isLoading" class="page-loading-overlay">
      <div class="loading-container">
        <div class="loading-spinner-ring"></div>
        <div class="loading-text">正在加载数字博物馆...</div>
        <div class="loading-progress">
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: loadingProgress + '%' }"></div>
          </div>
          <div class="progress-text">{{ loadingProgress }}%</div>
        </div>
      </div>
    </div>
    <!-- 顶部导航栏 -->
    <header class="header-glass fixed top-0 left-0 right-0 transition-transform duration-300 ease-in-out z-50">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <router-link to="/homepage" class="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <img 
                :src="require('@/assets/images/practice-team-logo.png')" 
                alt="实践队logo" 
                class="h-8 w-8 object-cover rounded-full"
              >
              <span class="text-lg font-semibold text-gray-800">溯本求源 <span class="text-red-500 mx-1">|</span> 文润经心</span>
            </router-link>
          </div>
          
          <div class="flex items-center space-x-4 flex-wrap">
            <!-- 数字博物馆导航 -->
            <nav class="hidden md:flex items-center space-x-4">
              <router-link to="/heropage" class="px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-600 transition-colors bg-red-50 rounded-md border border-red-200">
                ✨ 实践队风采展示
              </router-link>
              <span class="text-gray-400">|</span>
              <router-link to="/home" class="px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-600 transition-colors">
                数字博物馆
              </router-link>
              <span class="text-gray-400">|</span>
              <router-link to="/agriculture" class="px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-600 transition-colors">
                农业非遗特展
              </router-link>
            </nav>
            
            <button @click="toggleTheme" class="flex items-center justify-center p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <i data-lucide="moon" class="h-5 w-5"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
    
    <!-- 主内容 -->
    <main class="min-h-screen pt-16">
      <!-- Hero 区域 - 轮播图 -->
      <div class="hero-carousel-section relative overflow-hidden">
        <!-- Swiper 轮播图 -->
        <div class="swiper-container" ref="swiperContainer">
          <div class="swiper-wrapper">
            <!-- 第一张轮播图 -->
            <div class="swiper-slide" :style="{ backgroundImage: `url(${slideImages.ppt1})` }">
            </div>
            
            <!-- 第二张轮播图 -->
            <div class="swiper-slide" :style="{ backgroundImage: `url(${slideImages.ppt2})` }">
            </div>
            
            <!-- 第三张轮播图 -->
            <div class="swiper-slide" :style="{ backgroundImage: `url(${slideImages.ppt3})` }">
            </div>
          </div>
          
          <!-- 分页器 -->
          <div class="swiper-pagination"></div>
          
          <!-- 导航按钮 -->
          <div class="swiper-button-next"></div>
          <div class="swiper-button-prev"></div>
        </div>
      </div>
      
      <!-- 团队简介 -->
      <section class="team-section" id="team">
        <div class="container mx-auto px-4">
          <div class="team-hero">
            <div class="team-brand">
              <img 
                class="team-logo" 
                :src="teamInfo.logo" 
                alt="团队 Logo"
                v-show="!isLoading"
              />
              <div>
                <h3 class="team-name">{{ teamInfo.name }}</h3>
                <p class="team-slogan">{{ teamInfo.slogan }}</p>
              </div>
            </div>
            <p class="team-intro">{{ teamInfo.intro }}</p>
          </div>

          <div class="team-intro-grid">
            <div class="team-card">
              <div class="team-card-title">使命与愿景</div>
              <p class="team-card-text">
                以“发现—记录—传播”为路径，守护并活化在地文化记忆；以青年力量推动非遗走入当代生活，助力乡村文化振兴与公共文化服务优化。
              </p>
              <ul class="bullet-list">
                <li>发现：田野走访，定位真实问题与需求</li>
                <li>记录：标准化方法沉淀可复用知识</li>
                <li>传播：数字化叙事，促进社会参与</li>
              </ul>
            </div>

            <div class="team-card">
              <div class="team-card-title">指导老师</div>
              <ul class="advisors-list">
                <li v-for="a in advisors" :key="a.name" class="advisor-item">
                  <div class="avatar">👩‍🏫</div>
                  <div>
                    <div class="name">{{ a.name }}</div>
                    <div class="meta">{{ a.title }}</div>
                  </div>
                </li>
              </ul>
            </div>

            <div class="team-card">
              <div class="team-card-title">成员与分工</div>
              <ul class="members-list">
                <li v-for="m in teamMembers" :key="m.name" class="member-item">
                  <span class="tag">{{ m.role }}</span>
                  <span class="name">{{ m.name }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 社会实践成果展示区域 -->
      <section class="map-section">
        <div class="container mx-auto px-4 py-8">
          <!-- 实践队介绍 -->
          <div class="text-center mb-12">
            <h2 class="text-4xl font-bold mb-4 gradient-title">
              社会实践足迹
            </h2>
            <p class="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              我们的社会实践队深入山西、山东两省，开展实地调研活动。通过走访调研、实地观察、深度访谈等形式，
              深入了解当地经济社会发展状况，积累了宝贵的实践经验和研究成果。
            </p>
            <div class="flex justify-center items-center gap-6 mt-6">
              <div class="flex items-center gap-2">
                <div class="w-4 h-4 bg-red-600 rounded-full"></div>
                <span class="text-sm font-medium text-gray-700">实践目的地</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-lg">🎯</span>
                <span class="text-sm font-medium text-gray-700">调研点位</span>
              </div>
            </div>
          </div>
          
          <!-- 地图展示 -->
          <div class="flex items-start justify-between gap-8 max-w-6xl mx-auto">
            <!-- 左侧：实践成果红色按钮 -->
            <aside class="results-aside results-left">
              <button @click="showPracticeResults" class="practice-success-btn">
                <div class="btn-content">
                  <div class="btn-icon">🏆</div>
                  <div class="btn-text">实践成果</div>
                </div>
              </button>
            </aside>

            <!-- 中间：地图 -->
            <div class="flex-1 max-w-4xl">
              <div ref="chinaChart" class="china-map">
                <div v-if="mapLoading" class="loading-indicator">
                  <div class="loading-spinner"></div>
                  <span>正在加载实践足迹地图...</span>
                </div>
                <!-- 左上角团队 Logo -->
                <img
                  :src="require('@/assets/images/practice-team-logo.png')"
                  alt="实践队logo"
                  class="map-corner-logo"
                >
              </div>
            </div>

            <!-- 右侧：成果统计卡（桌面端显示） -->
            <aside class="results-aside results-right">
              <div class="mini-cards">
                <div class="mini-card">
                  <div class="mini-icon un">UN</div>
                  <div>
                    <div class="mini-num">1</div>
                    <div class="mini-label">联合国级</div>
                  </div>
                </div>
                <div class="mini-card">
                  <div class="mini-icon national">国</div>
                  <div>
                    <div class="mini-num">4</div>
                    <div class="mini-label">国家级</div>
                  </div>
                </div>
                <div class="mini-card">
                  <div class="mini-icon provincial">省</div>
                  <div>
                    <div class="mini-num">5</div>
                    <div class="mini-label">省级</div>
                  </div>
                </div>
                <div class="mini-card">
                  <div class="mini-icon municipal">市</div>
                  <div>
                    <div class="mini-num">1</div>
                    <div class="mini-label">市级</div>
                  </div>
                </div>
                <div class="mini-card">
                  <div class="mini-icon neutral">🎤</div>
                  <div>
                    <div class="mini-num">14</div>
                    <div class="mini-label">篇采访</div>
                  </div>
                </div>
                <div class="mini-card">
                  <div class="mini-icon neutral">📄</div>
                  <div>
                    <div class="mini-num">4万</div>
                    <div class="mini-label">字调查报告</div>
                  </div>
                </div>
                <div class="mini-card">
                  <div class="mini-icon neutral">🏛️</div>
                  <div>
                    <div class="mini-num">11</div>
                    <div class="mini-label">非遗项目</div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
          
          <!-- 非遗级别统计（移动端显示） -->
          <div class="results-cards-mobile mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div class="stat-card heritage-level-card">
              <div class="text-center">
                <div class="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span class="text-xl text-white font-bold">UN</span>
                </div>
                <h3 class="text-2xl font-bold text-yellow-600 mb-2">1</h3>
                <p class="text-gray-600 font-medium">联合国级</p>
              </div>
            </div>
            
            <div class="stat-card heritage-level-card">
              <div class="text-center">
                <div class="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span class="text-xl text-white font-bold">国</span>
                </div>
                <h3 class="text-2xl font-bold text-red-600 mb-2">4</h3>
                <p class="text-gray-600 font-medium">国家级</p>
              </div>
            </div>
            
            <div class="stat-card heritage-level-card">
              <div class="text-center">
                <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span class="text-xl text-white font-bold">省</span>
                </div>
                <h3 class="text-2xl font-bold text-blue-600 mb-2">5</h3>
                <p class="text-gray-600 font-medium">省级</p>
              </div>
            </div>
            
            <div class="stat-card heritage-level-card">
              <div class="text-center">
                <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span class="text-xl text-white font-bold">市</span>
                </div>
                <h3 class="text-2xl font-bold text-green-600 mb-2">1</h3>
                <p class="text-gray-600 font-medium">市级</p>
              </div>
            </div>
          </div>
          
          <!-- 调研成果统计（移动端显示） -->
          <div class="results-cards-mobile mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div class="stat-card">
              <div class="text-center">
                <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span class="text-2xl">🎤</span>
                </div>
                <h3 class="text-2xl font-bold text-red-600 mb-2">14</h3>
                <p class="text-gray-600 font-medium">篇采访</p>
              </div>
            </div>
            
            <div class="stat-card">
              <div class="text-center">
                <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span class="text-2xl">📄</span>
                </div>
                <h3 class="text-2xl font-bold text-red-600 mb-2">4万</h3>
                <p class="text-gray-600 font-medium">字调查报告</p>
              </div>
            </div>
            
            <div class="stat-card">
              <div class="text-center">
                <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span class="text-2xl">🏛️</span>
                </div>
                <h3 class="text-2xl font-bold text-red-600 mb-2">11</h3>
                <p class="text-gray-600 font-medium">非遗项目</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 非遗项目详细展示 -->
      <section class="heritage-projects-section">
        <div class="container mx-auto px-4">
          <h3 class="section-title">非遗项目详览</h3>
          
          <!-- 项目分类展示 -->
          <div class="heritage-categories">
            <!-- 联合国级 -->
            <div class="heritage-category">
              <div class="category-header">
                <div class="level-badge level-un">联合国级</div>
                <h4 class="category-title">联合国教科文组织非物质文化遗产名录</h4>
              </div>
              <div class="projects-grid">
                <div class="project-card">
                  <div class="project-name">联合国教科文组织非物质文化遗产名录</div>
                  <div class="project-region">国际认定</div>
                </div>
              </div>
            </div>

            <!-- 国家级 -->
            <div class="heritage-category">
              <div class="category-header">
                <div class="level-badge level-national">国家级</div>
                <h4 class="category-title">国家级非物质文化遗产 (4项)</h4>
              </div>
              <div class="projects-grid">
                <div class="project-card">
                  <div class="project-name">锔瓷堆</div>
                  <div class="project-region">山东省</div>
                </div>
                <div class="project-card">
                  <div class="project-name">风筝</div>
                  <div class="project-region">山东省</div>
                </div>
                <div class="project-card">
                  <div class="project-name">杨家埠木版年画</div>
                  <div class="project-region">山东省</div>
                </div>
                <div class="project-card">
                  <div class="project-name">潍坊剪纸</div>
                  <div class="project-region">山东省</div>
                </div>
              </div>
            </div>

            <!-- 省级 -->
            <div class="heritage-category">
              <div class="category-header">
                <div class="level-badge level-provincial">省级</div>
                <h4 class="category-title">省级非物质文化遗产 (5项)</h4>
              </div>
              <div class="projects-grid">
                <div class="project-card">
                  <div class="project-name">胶东传统手作香</div>
                  <div class="project-region">山东省</div>
                </div>
                <div class="project-card">
                  <div class="project-name">汉服制作技艺</div>
                  <div class="project-region">传统服饰</div>
                </div>
                <div class="project-card">
                  <div class="project-name">国画技艺</div>
                  <div class="project-region">传统绘画</div>
                </div>
                <div class="project-card">
                  <div class="project-name">手塑工艺</div>
                  <div class="project-region">传统手工</div>
                </div>
                <div class="project-card">
                  <div class="project-name">核雕技艺</div>
                  <div class="project-region">微雕艺术</div>
                </div>
              </div>
            </div>

            <!-- 市级 -->
            <div class="heritage-category">
              <div class="category-header">
                <div class="level-badge level-municipal">市级</div>
                <h4 class="category-title">市级非物质文化遗产 (1项)</h4>
              </div>
              <div class="projects-grid">
                <div class="project-card">
                  <div class="project-name">烟台市级非物质文化遗产项目</div>
                  <div class="project-region">山东省烟台</div>
                </div>
              </div>
            </div>
          </div>

          <!-- 地域分布总结 -->
          <div class="heritage-summary">
            <div class="summary-item">
              <span class="summary-number">10</span>
              <span class="summary-label">山东省项目</span>
            </div>
            <div class="summary-item">
              <span class="summary-number">1</span>
              <span class="summary-label">山西省项目</span>
            </div>
            <div class="summary-item">
              <span class="summary-number">11</span>
              <span class="summary-label">总计项目</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 关键数据总览（扩展版） -->
      <section class="stats-extended">
        <div class="container mx-auto px-4">
          <h3 class="section-title">关键数据总览</h3>
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-icon">👥</div>
              <div class="stat-num">128+</div>
              <div class="stat-desc">深度访谈对象</div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">📝</div>
              <div class="stat-num">186,000+</div>
              <div class="stat-desc">报告撰写字数</div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">🏛️</div>
              <div class="stat-num">2 省 3 市</div>
              <div class="stat-desc">覆盖区域</div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">🏷️</div>
              <div class="stat-num">27 项</div>
              <div class="stat-desc">非遗项目（国家/省/市级）</div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">🎥</div>
              <div class="stat-num">530+</div>
              <div class="stat-desc">影像素材（照片/视频）</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 非遗分级统计 · 可视化图表（ECharts） -->
      <section class="heritage-charts">
        <div class="container mx-auto px-4">
          <h3 class="section-title">非遗分级与城市分布</h3>
          <div class="charts-grid">
            <div class="chart-box">
              <div class="chart-title">分级占比</div>
              <div ref="heritageLevelChart" class="chart-canvas"></div>
            </div>
            <div class="chart-box">
              <div class="chart-title">城市展项数量</div>
              <div ref="cityCountChart" class="chart-canvas"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- 重点成果 - 交错图文块 -->
      <section class="features-alt">
        <div class="container mx-auto px-4">
          <div class="feature-row">
            <div class="feature-text">
              <h4>田野访谈 · 真实声音</h4>
              <p>以“人”为中心的田野工作，围绕非遗传承、村落记忆与产业振兴三大主题，采集可追溯的口述史与生活史资料，为后续分析与展示提供第一手证据。</p>
              <ul class="feature-list">
                <li>采集范围：2 省 3 市 27 个非遗项目，典型样本全覆盖</li>
                <li>核心方法：半结构化访谈 + 参与式观察 + 资料校核</li>
                <li>证据形态：音频 / 视频 / 照片 / 文字四重存证，元数据规范化</li>
              </ul>
              <div class="feature-badges">
                <span class="badge badge-red">128+ 深度访谈</span>
                <span class="badge">530+ 影像素材</span>
                <span class="badge">15+ 主题专题</span>
              </div>
              <div class="feature-cta">
                <button class="btn btn-primary" @click="showPracticeResults">查看访谈节选</button>
                <button class="btn btn-ghost">查看样本画像</button>
              </div>
            </div>
            <div class="feature-media">
              <img :src="require('@/assets/images/home-03-270x360.jpg')" alt="访谈现场">
            </div>
          </div>

          <div class="feature-row reverse">
            <div class="feature-text">
              <h4>报告体系 · 数据驱动</h4>
              <p>从数据到洞见：以标准化流程完成“采集—清洗—编码—分析—可视化—撰写—发布”，形成可复用的研究框架与实践工具包。</p>
              <div class="progress-wrap">
                <div class="progress-item">
                  <span>基础调研</span>
                  <div class="progress-bar"><i style="width: 88%"></i></div>
                </div>
                <div class="progress-item">
                  <span>口述史整理</span>
                  <div class="progress-bar"><i style="width: 72%"></i></div>
                </div>
                <div class="progress-item">
                  <span>报告撰写</span>
                  <div class="progress-bar"><i style="width: 64%"></i></div>
                </div>
              </div>
              <div class="feature-badges">
                <span class="badge badge-red">开放数据集</span>
                <span class="badge">可视化模版</span>
                <span class="badge">政策建议摘要</span>
              </div>
              <div class="feature-cta">
                <button class="btn btn-primary">下载总结报告</button>
                <button class="btn btn-ghost">查看方法论</button>
              </div>
            </div>
            <div class="feature-media">
              <img :src="require('@/assets/images/home-02-270x360.jpg')" alt="报告撰写">
            </div>
          </div>
        </div>
      </section>

      <!-- 项目发展（参考发展历程样式） -->
      <section class="timeline-section timeline-vertical">
        <div class="container mx-auto px-4">
          <h3 class="section-title">项目发展</h3>
          <div class="timeline-grid">
            <!-- 主列 -->
            <div class="timeline-main">
              <div class="year-large">2024</div>
              <ul class="timeline-list">
                <li v-for="(item,idx) in displayedTimelineItems" :key="idx" class="tlv-item">
                  <div class="tlv-title">{{ item.title }}</div>
                  <div class="tlv-meta">{{ item.meta }}</div>
                  <div class="tlv-desc">{{ item.desc }}</div>
                </li>
                <li v-if="!displayedTimelineItems.length" class="tlv-item">
                  <div class="tlv-title">本月暂无事件</div>
                  <div class="tlv-meta">{{ activeMonth }} 月</div>
                  <div class="tlv-desc">请切换右侧月份查看其他阶段进展。</div>
                </li>
              </ul>
              <div class="timeline-more">展开更多</div>
              </div>

            <!-- 右侧年份导航 -->
            <aside class="year-side">
              <ul>
                <li v-for="m in timelineMonths" :key="m" :class="{active: m===activeMonth}" @click="setMonth(m)">{{ m }}月</li>
              </ul>
            </aside>
          </div>
        </div>
      </section>
    </main>
    
    <!-- 页脚（内容由你后续补充） -->
    <footer class="site-footer">
      <div class="container mx-auto px-4">
        <div class="footer-inner">
          <div class="footer-brand">
            <div class="brand-name">天津大学管理与经济学部</div>
            <div class="brand-desc">内容待补充</div>
          </div>
          <div class="footer-content"><!-- 你可以在此处补充页脚详细内容 --></div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'HomePageView',
  data() {
    return {
      isLoading: true,
      loadingProgress: 0,
      mapLoading: true,
      swiper: null,
      echarts: null,
      chart: null, // 保留，供其他图表使用
      mapChart: null, // 专用于地图实例，避免与其他图表冲突
      cityChart: null,
      currentMapLevel: 'china', // china | province
      currentProvince: null,
      slideImages: {
        ppt1: require('@/assets/images/ppt1.jpg'),
        ppt2: require('@/assets/images/ppt2.jpg'),
        ppt3: require('@/assets/images/ppt3.jpg')
      },
      // 团队信息
      teamInfo: {
        name: '溯本求源 | 文润经心',
        slogan: '以数叙事，见证非遗的当代生命力',
        intro: '我们是一支跨专业青年团队，聚焦非遗数字化、社区营造与公共文化服务，通过田野采集、可视化与故事化呈现，推动“看见—理解—行动”的社会参与。',
        logo: require('@/assets/images/logo.png')
      },
      advisors: [
        { name: '张老师', title: '文化遗产研究所 副教授' },
        { name: '李老师', title: '公共管理学院 讲师' }
      ],
      teamMembers: [
        { name: '王同学', role: '项目统筹' },
        { name: '刘同学', role: '方法设计' },
        { name: '陈同学', role: '数据可视化' },
        { name: '赵同学', role: '影像记录' },
        { name: '孙同学', role: '调研与撰写' }
      ],
      // 时间轴数据与状态
      activeMonth: new Date().getMonth() + 1,
      timelineMonths: [1,2,3,4,5,6,7,8,9,10,11,12],
      timelineDataByMonth: {
        3: [{ title: '立项与路线设计', meta: '3 月', desc: '确定两省三市点位，完善访谈提纲与采集规范。' }],
        5: [{ title: '田野踏勘与采集', meta: '5–6 月', desc: '完成核心样本访谈，收集音视频与实物影像素材。' }],
        6: [{ title: '田野踏勘与采集', meta: '5–6 月', desc: '完成核心样本访谈，收集音视频与实物影像素材。' }],
        7: [{ title: '整理与撰写', meta: '7–8 月', desc: '形成阶段报告与可视化图表，打磨展陈文案。' }],
        8: [{ title: '整理与撰写', meta: '7–8 月', desc: '形成阶段报告与可视化图表，打磨展陈文案。' }],
        9: [{ title: '数字化呈现', meta: '9 月', desc: '上线数字展馆原型，发布公开成果。' }]
      }
    }
  },
  mounted() {
    // 强制滚动到页面顶部
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    this.startLoading();
  },
  computed: {
    displayedTimelineItems() {
      return this.timelineDataByMonth[this.activeMonth] || [];
    }
  },
  beforeDestroy() {
    if (this.swiper) {
      this.swiper.destroy();
    }
    if (this.chart) {
      this.chart.dispose();
    }
  },
  methods: {
    setMonth(m) { this.activeMonth = m; },
    
    // 开始加载流程（真实加载：图片、CDN脚本、地图数据、Swiper实例）
    async startLoading() {
      try {
        // 步骤1: 预加载图片 (30%)
        await this.preloadImages();
        this.updateLoadingProgress(30);
        
        // 步骤2: 加载首页资源 (60%)
        await this.loadHomepageAssets();
        this.updateLoadingProgress(60);
        
        // 步骤3: 初始化图表 (90%)
        await this.initCharts();
        this.updateLoadingProgress(90);
        
        // 步骤4: 完成加载 (100%)
        this.updateLoadingProgress(100);
        
        // 延迟一点时间让用户看到100%，然后隐藏加载界面
        setTimeout(() => { this.isLoading = false; }, 200);
        
      } catch (error) {
        // 即使出错也要隐藏加载界面
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      }
    },
    
    // 更新加载进度
    updateLoadingProgress(progress) {
      const startProgress = this.loadingProgress;
      const difference = progress - startProgress;
      const steps = 20;
      const stepSize = difference / steps;
      
      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        this.loadingProgress = Math.min(startProgress + (stepSize * currentStep), progress);
        
        if (currentStep >= steps || this.loadingProgress >= progress) {
          clearInterval(interval);
          this.loadingProgress = progress;
        }
      }, 50);
    },
    
    // 预加载图片
    preloadImages() {
      return new Promise((resolve) => {
        const images = [
          this.slideImages.ppt1,
          this.slideImages.ppt2,
          this.slideImages.ppt3,
          require('@/assets/images/practice-team-logo.png'),
          require('@/assets/images/logo.png')
        ];
        
        let loadedCount = 0;
        const totalImages = images.length;
        
        if (totalImages === 0) {
          resolve();
          return;
        }
        
        // 预加载所有图片
        images.forEach(src => {
          const img = new Image();
          img.onload = img.onerror = () => {
            loadedCount++;
            if (loadedCount === totalImages) {
              resolve();
            }
          };
          img.src = src;
        });
      });
    },
    loadHomepageAssets() {
      return new Promise((resolve) => {
        let loadedCount = 0;
        const totalAssets = 3; // Swiper CSS, ECharts(+地图), Swiper JS
        
        const checkComplete = () => {
          loadedCount++;
          if (loadedCount >= totalAssets) {
            resolve();
          }
        };
        
        // 加载Tailwind CSS（仅开发环境使用 CDN，生产环境请使用构建集成）
        const isProduction = process.env.NODE_ENV === 'production';
        if (!isProduction && !document.querySelector('script[src*="tailwindcss"]')) {
          const tailwindScript = document.createElement('script');
          tailwindScript.src = 'https://cdn.tailwindcss.com';
          document.head.appendChild(tailwindScript);
        }

        // 加载Swiper CSS
        if (!document.querySelector('link[href*="swiper"]')) {
          const swiperCSS = document.createElement('link');
          swiperCSS.rel = 'stylesheet';
          swiperCSS.href = 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css';
          swiperCSS.onload = checkComplete;
          swiperCSS.onerror = checkComplete;
          document.head.appendChild(swiperCSS);
        } else {
          checkComplete();
        }

        // 加载ECharts 并注册中国地图（省级 GeoJSON）
        const ensureEchartsLoaded = () => new Promise((resolve) => {
          if (window.echarts) { resolve(); return; }
          const echartsScript = document.createElement('script');
          echartsScript.src = 'https://cdn.jsdelivr.net/npm/echarts@5.4.3/dist/echarts.min.js';
          echartsScript.onload = resolve;
          echartsScript.onerror = resolve;
          document.head.appendChild(echartsScript);
        });

        const loadChinaMap = () => new Promise((resolve) => {
          // 省级行政区划 GeoJSON（含边界与多边形）
          const url = 'https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=100000_full';
          fetch(url)
            .then((r) => r.json())
            .then((geojson) => {
              if (window.echarts && geojson) {
                window.echarts.registerMap('china', geojson);
              }
              resolve();
            })
            .catch(() => resolve());
        });

        ensureEchartsLoaded().then(() => {
          this.echarts = window.echarts;
          loadChinaMap().then(() => {
            this.initMap();
            checkComplete();
          });
        });

        // 加载Lucide Icons (非必需，不计入加载进度)
        if (!window.lucide) {
          const lucideScript = document.createElement('script');
          lucideScript.src = 'https://unpkg.com/lucide@latest/dist/umd/lucide.js';
          lucideScript.onload = () => {
            setTimeout(() => {
              if (window.lucide) {
                window.lucide.createIcons();
              }
            }, 100);
          };
          document.head.appendChild(lucideScript);
        }

        // 加载Swiper JS
        if (!window.Swiper) {
          const swiperScript = document.createElement('script');
          swiperScript.src = 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js';
          swiperScript.onload = () => {
            this.initSwiper();
            checkComplete();
          };
          swiperScript.onerror = checkComplete;
          document.head.appendChild(swiperScript);
        } else {
          this.initSwiper();
          checkComplete();
        }

        // 加载自定义样式 (非必需，不计入加载进度)
        const customCSS = document.createElement('link');
        customCSS.rel = 'stylesheet';
        customCSS.href = '/homepage/styles.css';
        document.head.appendChild(customCSS);
      });
    },

    initSwiper() {
      this.$nextTick(() => {
        if (window.Swiper && this.$refs.swiperContainer) {
          this.swiper = new window.Swiper(this.$refs.swiperContainer, {
            autoplay: {
              delay: 5000,
              disableOnInteraction: false,
            },
            loop: true,
            speed: 600,
            effect: 'slide',
            spaceBetween: 8,
            allowTouchMove: true,
            simulateTouch: true,
            roundLengths: true,
            pagination: {
              el: '.swiper-pagination',
              clickable: true,
            },
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            // 使用平滑移动切换，移除淡入淡出配置
          });
        }
      });
    },

    initMap() {
      this.$nextTick(() => {
        if (this.echarts && this.$refs.chinaChart) {
          this.mapLoading = false;
          this.mapChart = this.echarts.init(this.$refs.chinaChart);
          this.renderChinaMap();
        }
      });
    },

    // 渲染全国（省级）地图并高亮到访省份
    renderChinaMap() {
      this.currentMapLevel = 'china';
      this.currentProvince = null;
      const visitedProvinces = ['山东省', '山西省'];
      
      // 定义实践城市坐标（去掉"市"字）
      const practiceCities = [
        // 山东省城市
        { name: '淄博', value: [118.054, 36.813], province: '山东' },
        { name: '潍坊', value: [119.161756, 36.706774], province: '山东' },
        { name: '烟台', value: [121.447935, 37.463822], province: '山东' },
        // 山西省城市
        { name: '太原', value: [112.549248, 37.87059], province: '山西' },
        { name: '晋城', value: [112.853, 35.497], province: '山西' },
        { name: '晋中', value: [112.736, 37.687], province: '山西' },
        { name: '运城', value: [111.003, 35.022], province: '山西' }
      ];
      
      // 天津坐标
      const tianjinCoord = [117.190182, 39.125596];

      const option = {
        title: {
          text: '实践足迹地图（点击山东或山西查看市级行政区）',
          left: 'center',
          textStyle: { color: '#333', fontWeight: 700 }
        },
        tooltip: {
          trigger: 'item',
          formatter: function(params) {
            return params && params.name ? params.name : ''
          }
        },
        geo: {
          map: 'china', 
          roam: false, // 禁用用户缩放和拖拽
          zoom: 4.4, // 放大至少两倍
          center: [116.5, 39.5], // 华北地区居中
          label: { show: false },
          itemStyle: { areaColor: '#f3f4f6', borderColor: '#9ca3af' },
          emphasis: { label: { show: true, color: '#111827' }, itemStyle: { areaColor: '#fde8e8' } },
          regions: visitedProvinces.map((name) => ({ 
            name, 
            itemStyle: { 
              areaColor: '#f87171', // 降低对比度的红色
              borderColor: '#dc2626',
              borderWidth: 2
            } 
          }))
        },
        series: [
          // 天津logo标记
          {
            name: '出发地',
            type: 'scatter',
            coordinateSystem: 'geo',
            symbol: `image://${require('@/assets/images/纯图logo.png')}`,
            symbolSize: 48, // 进一步增大logo尺寸
            label: { 
              show: true, 
              formatter: '天津', 
              color: '#1f2937', 
              fontWeight: 600, 
              offset: [0, -16] 
            },
            data: [{ name: '天津', value: tianjinCoord }]
          },
          // 实践城市标记
          {
            name: '实践城市',
            type: 'scatter',
            coordinateSystem: 'geo',
            symbol: 'circle',
            symbolSize: 12,
            label: { 
              show: true, 
              formatter: '{b}', 
              color: '#1f2937', // 与天津一致的深灰色
              fontWeight: 700, 
              offset: [0, -14] 
            },
            itemStyle: { color: '#dc2626', shadowBlur: 8, shadowColor: 'rgba(220,38,38,0.4)' },
            data: practiceCities
          },
          // 从天津到各实践城市的箭头
          {
            name: '实践路线',
            type: 'lines',
            coordinateSystem: 'geo',
            lineStyle: {
              color: '#fbbf24', // 亮黄色
              width: 2,
              curveness: 0.2, // 添加弧度
              type: 'solid'
            },
            tooltip: { show: false },
            effect: {
              show: true,
              period: 3,
              trailLength: 0.2,
              color: '#fbbf24', // 亮黄色
              symbolSize: 6
            },
            data: practiceCities.map(city => ({
              fromName: '天津',
              toName: city.name,
              coords: [tianjinCoord, city.value]
            }))
          }
        ]
      };
      this.mapChart.setOption(option, true);
      this.mapChart.off('click');
      this.mapChart.on('click', (params) => {
        // 省份点击切换到省级地图
        if (params.name === '山东省') this.renderProvinceMap('山东省', '370000');
        if (params.name === '山西省') this.renderProvinceMap('山西省', '140000');
        
        // 城市点击跳转到对应博物馆
        if (params.seriesType === 'scatter' && params.seriesName === '实践城市') {
          this.handleCityClick(params.name);
        }
      });
    },

    // 渲染省份的市级行政区划
    renderProvinceMap(provinceName, provinceCode) {
      this.currentMapLevel = 'province';
      this.currentProvince = provinceName;
      const url = `https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=${provinceCode}_full`;
      fetch(url)
        .then((r) => r.json())
        .then((geojson) => {
          if (this.echarts && geojson) {
            this.echarts.registerMap(provinceName, geojson);
          }
          
          // 定义走访过的城市（去掉"市"字）
          let visitedCities = [];
          if (provinceName === '山东省') {
            visitedCities = ['淄博市', '潍坊市', '烟台市']; // 保持原始地图数据中的名称用于匹配
          } else if (provinceName === '山西省') {
            visitedCities = ['太原市', '晋城市', '晋中市', '运城市']; // 保持原始地图数据中的名称用于匹配
          }
          
          const option = {
            title: { text: `${provinceName} · 市级行政区`, left: 'center', textStyle: { color: '#333', fontWeight: 700 } },
            tooltip: {
              trigger: 'item',
              formatter: function(params) {
                return params && params.name ? params.name.replace('市','') : ''
              }
            },
            graphic: [{
              type: 'text', left: 20, top: 16,
              style: { text: '返回全国', fill: '#ef4444', font: 'bold 14px "Microsoft YaHei", Arial, sans-serif' },
              onclick: () => this.renderChinaMap()
            }],
            geo: {
              map: provinceName, 
              roam: false, // 禁用省级地图缩放
              zoom: 1.1, // 稍微放大省级地图
              label: { 
                show: true, 
                color: '#374151', 
                fontSize: 12,
                formatter: function(params) {
                  // 移除城市名称中的"市"字
                  return params.name.replace('市', '');
                }
              },
              itemStyle: { areaColor: '#fff', borderColor: '#9ca3af' },
              emphasis: { 
                label: { 
                  show: true, 
                  color: '#111827', 
                  fontWeight: 700,
                  formatter: function(params) {
                    // 移除城市名称中的"市"字
                    return params.name.replace('市', '');
                  }
                }, 
                itemStyle: { areaColor: '#fee2e2' } 
              },
              regions: visitedCities.map((name) => ({ 
                name, 
                itemStyle: { 
                  areaColor: '#f87171', // 与主地图一致的颜色
                  borderColor: '#dc2626',
                  borderWidth: 2
                } 
              }))
            },
            series: [] // 删除所有大头钉
          };
          this.mapChart && this.mapChart.setOption(option, true);
          this.mapChart && this.mapChart.off('click');
          this.mapChart && this.mapChart.on('click', (params) => {
            // 点击任何城市都跳转到对应省份博物馆
            if (visitedCities.includes(params.name)) {
              this.handleCityClick(params.name);
            }
          });
        })
        .catch(() => { /* 忽略错误，保持现状 */ });
    },



    toggleTheme() {
      // 主题切换逻辑
      document.body.classList.toggle('dark');
      document.documentElement.setAttribute('data-theme', 
        document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
      );
    },

    showPracticeResults() {
      // 跳转到实践成果页面
      this.$router.push('/results');
    },

    handleCityClick(cityName) {
      // 处理城市点击事件，跳转到对应博物馆
      // 统一处理城市名称，移除"市"字进行比较
      const normalizedCityName = cityName.replace('市', '');
      const shanxiCities = ['太原', '晋城', '晋中', '运城'];
      const shandongCities = ['淄博', '潍坊', '烟台'];
      
      if (shanxiCities.includes(normalizedCityName)) {
        // 跳转到山西数字博物馆首页（带导航栏）
        this.$router.push('/home');
      } else if (shandongCities.includes(normalizedCityName)) {
        // 山东博物馆暂未开发，显示提示
        alert(`${normalizedCityName}对应的山东数字博物馆正在开发中，敬请期待！`);
      }
    },

    // 非遗分级/城市分布图
    initCharts() {
      return new Promise((resolve) => {
        if (!window.echarts) {
          resolve();
          return;
        }
      // 玫瑰图
      const levelEl = this.$refs.heritageLevelChart;
      if (levelEl) {
        const level = window.echarts.init(levelEl);
        level.setOption({
          color: ['#ef4444','#f97316','#f59e0b','#6b7280'],
          tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
          legend: { bottom: 0, textStyle: { color: '#6b7280' } },
          series: [{
            type: 'pie', name: '分级占比', roseType: 'radius',
            radius: ['25%','70%'], center: ['50%','45%'],
            itemStyle: { borderRadius: 8, borderColor: '#fff', borderWidth: 2 },
            label: { color: '#374151' },
            emphasis: { label: { show: true, fontWeight: 800, color: '#111827' } },
            data: [
              { value: 1, name: '联合国级' },
              { value: 4, name: '国家级' },
              { value: 5, name: '省级' },
              { value: 1, name: '市级' }
            ]
          }],
          animationDuration: 800,
          animationEasing: 'cubicOut'
        });
      }

      // 横向柱状
      const cityEl = this.$refs.cityCountChart;
      if (cityEl) {
        const city = window.echarts.init(cityEl);
        city.setOption({
          tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
          grid: { left: 16, right: 16, bottom: 18, top: 26, containLabel: true },
          xAxis: {
            type: 'value', boundaryGap: [0,0.01],
            axisLabel: { color: '#6b7280' },
            splitLine: { lineStyle: { color: '#f3f4f6' } }
          },
          yAxis: {
            type: 'category', data: ['烟台','潍坊','淄博'],
            axisLabel: { color: '#374151' }
          },
          series: [{
            type: 'bar', name: '展项数量', barWidth: 18,
            itemStyle: {
              color: new window.echarts.graphic.LinearGradient(0,0,1,0,[
                { offset: 0, color: '#fecaca' },
                { offset: 1, color: '#ef4444' }
              ]),
              borderRadius: [0,8,8,0]
            },
            label: { show: true, position: 'right', color: '#ef4444', fontWeight: 700 },
            data: [1,4,5] // 对应烟台、潍坊、淄博的项目数量
          }],
          animationDuration: 700,
          animationEasing: 'cubicOut'
        });
        this.chart = city;
      }
      
      // 图表初始化完成
      resolve();
      });
    }
  }
}
</script>

<style>
/* 全局加载动画样式 */
.page-loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(10px);
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  text-align: center;
}

.loading-spinner-ring {
  width: 80px;
  height: 80px;
  border: 6px solid #f1f5f9;
  border-top: 6px solid #ef4444;
  border-radius: 50%;
  animation: spinner-ring 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
}

@keyframes spinner-ring {
  0% {
    transform: rotate(0deg) scale(1);
  }
  50% {
    transform: rotate(180deg) scale(1.1);
  }
  100% {
    transform: rotate(360deg) scale(1);
  }
}

.loading-text {
  font-size: 1.5rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
}

.loading-progress {
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #ef4444 0%, #dc2626 100%);
  border-radius: 4px;
  transition: width 0.3s ease;
  position: relative;
}

.progress-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%);
  animation: progress-shimmer 1.5s infinite;
}

@keyframes progress-shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.progress-text {
  text-align: center;
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
}

/* 导入原始homepage样式，集成完整CSS变量系统 */

/* CSS变量 - 透明度和阴影系统 */
:root {
  /* Z-index层级 */
  --z-negative: -1;
  --z-base: 0;
  --z-raised: 1;
  --z-dropdown: 1000;
  --z-sticky: 1100;
  --z-fixed: 1200;
  --z-modal: 1300;
  --z-popover: 1400;
  --z-tooltip: 1500;
  
  /* 滚动条 */
  --scrollbar-track: #f5f7fa;
  --scrollbar-thumb: #c1c1c1;
  --scrollbar-thumb-hover: #a8a8a8;
  
  /* 主色彩 */
  --primary: #818cf8;
  --primary-hover: #6366f1;
  --primary-active: #6366f1;
  --secondary: #9F7AEA;
  --secondary-hover: #B794F4;
  --secondary-active: #805AD5;
  --accent: #553C9A;
  --accent-hover: #6B46C1;
  --accent-active: #44337A;
  --neutral: #4B5563;
  --neutral-hover: #6B7280;
  --neutral-active: #374151;
  
  /* 基础色彩 */
  --base-100: #FFFFFF;
  --base-200: #F9FAFB;
  --base-300: #F3F4F6;
  --base-content: #1F2937;
  
  /* 状态色彩 */
  --info: #6366F1;
  --info-content: #FFFFFF;
  --success: #10B981;
  --success-content: #FFFFFF;
  --warning: #F59E0B;
  --warning-content: #FFFFFF;
  --error: #EF4444;
  --error-content: #FFFFFF;
  
  /* 文本色彩 */
  --text-base: #1F2937;
  --text-muted: #4B5563;
  --text-disabled: #9CA3AF;
  --text-placeholder: #D1D5DB;
  
  /* 边框色彩 */
  --border-base: #E5E7EB;
  --border-light: #F3F4F6;
  
  /* 阴影系统 */
  --shadow-sm: rgba(147, 147, 250, .05);
  --shadow-md: rgba(147, 147, 250, .1);
  --shadow-lg: rgba(147, 147, 250, .15);
}

/* 暗色主题变量 */
[data-theme="dark"], .dark {
  --base-100: #0F172A;
  --base-200: #1E293B;
  --base-300: #334155;
  --base-content: #F1F5F9;
  --text-base: #F1F5F9;
  --text-muted: #94A3B8;
  --text-disabled: #64748B;
  --text-placeholder: #475569;
  --border-base: #334155;
  --border-light: #1E293B;
  --scrollbar-track: #1E293B;
  --scrollbar-thumb: #475569;
  --scrollbar-thumb-hover: #64748B;
}

/* 背景色 */
.bg-background {
  background-color: var(--base-100);
}

.text-foreground {
  color: var(--text-base);
}

/* 毛玻璃效果 */
.backdrop-blur-md {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.header-glass {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(254, 242, 242, 0.95) 100%);
  backdrop-filter: blur(20px);
  border-bottom: 2px solid rgba(220, 38, 38, 0.2);
  box-shadow: 0 2px 8px rgba(220, 38, 38, 0.1);
}

[data-theme="dark"] .header-glass,
.dark .header-glass {
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%);
  border-bottom: 2px solid rgba(220, 38, 38, 0.3);
  box-shadow: 0 2px 8px rgba(220, 38, 38, 0.2);
}

/* 轮播图样式 */
.hero-carousel-section {
  height: 60vh;
  width: 100%;
  position: relative;
  max-height: 500px;
  min-height: 300px;
}

.swiper-container {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Swiper 分页器样式 */
.swiper-pagination {
  bottom: 20px !important;
  z-index: 10;
}

.swiper-pagination-bullet {
  width: 10px;
  height: 10px;
  background: rgba(255, 255, 255, 0.6);
  opacity: 1;
  transition: all 0.3s ease;
  margin: 0 4px;
}

.swiper-pagination-bullet-active {
  background: #fff;
  transform: scale(1.2);
}

/* Swiper 导航按钮样式 */
.swiper-button-next,
.swiper-button-prev {
  color: rgba(255, 255, 255, 0.7);
  background: rgba(0, 0, 0, 0.2);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.swiper-button-next:hover,
.swiper-button-prev:hover {
  color: #fff;
  background: rgba(0, 0, 0, 0.4);
  transform: scale(1.1);
}

.swiper-button-next::after,
.swiper-button-prev::after {
  font-size: 16px;
  font-weight: bold;
}

/* 地图区域样式 */
.map-section {
  background: linear-gradient(135deg, #fef2f2 0%, #ffffff 50%, #fef2f2 100%);
  min-height: 100vh;
  padding-top: 2rem;
  position: relative;
}

.map-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, #DC2626 50%, transparent 100%);
}

/* 中国地图样式 */
.china-map {
  width: 100%;
  height: 700px; /* 进一步增加地图高度 */
  position: relative;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

/* 地图左上角团队 Logo */
.map-corner-logo {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 40px;
  height: 40px;
  border-radius: 999px;
  object-fit: cover;
  background: #fff;
  box-shadow: 0 6px 16px rgba(0,0,0,0.15);
  border: 2px solid rgba(255,255,255,0.9);
  z-index: 5;
}

/* 关键数据总览 */
.stats-extended { padding: 3rem 0; background: linear-gradient(180deg,#fff 0%,#f9fafb 100%); }
.section-title { font-size: 1.75rem; font-weight: 800; text-align: center; margin-bottom: 1.5rem; }
.stats-grid { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 1rem; }
.stat-card { background: #ffffff; border: 1px solid #eef2f7; border-radius: 16px; padding: 1.25rem; text-align: center; box-shadow: 0 10px 20px rgba(0,0,0,0.04); transition: transform .2s ease, box-shadow .2s ease; }
.stat-card:hover { transform: translateY(-4px); box-shadow: 0 16px 30px rgba(0,0,0,0.08); }
.stat-icon { font-size: 1.5rem; margin-bottom: .5rem; }
.stat-num { font-size: 1.8rem; font-weight: 800; color: #111827; }
.stat-desc { color: #6b7280; font-size: .95rem; margin-top: .25rem; }

@media (max-width: 1024px){ .stats-grid { grid-template-columns: repeat(3, minmax(0,1fr)); } }
@media (max-width: 640px){ .stats-grid { grid-template-columns: repeat(2, minmax(0,1fr)); } }

/* 交错图文块 */
.features-alt { padding: 2.5rem 0; }
.feature-row { display: grid; grid-template-columns: 1.2fr 1fr; gap: 2rem; align-items: center; margin-bottom: 2.5rem; }
.feature-row.reverse { grid-template-columns: 1fr 1.2fr; }
.feature-row.reverse .feature-text { order: 2; }
.feature-row.reverse .feature-media { order: 1; }
.feature-text h4 { font-size: 1.5rem; font-weight: 800; margin-bottom: .75rem; }
.feature-text p { color: #374151; margin-bottom: .75rem; }
.feature-list { padding-left: 1rem; color: #4b5563; }
.feature-list li { list-style: disc; margin: .25rem 0; }
.feature-media img { width: 100%; border-radius: 16px; box-shadow: 0 12px 24px rgba(0,0,0,.08); }
@media (max-width: 992px){ .feature-row, .feature-row.reverse { grid-template-columns: 1fr; } }

/* 交错图文块 · 增强元素 */
.feature-badges { display: flex; flex-wrap: wrap; gap: .5rem; margin-top: .5rem; }
.badge { display: inline-block; padding: 4px 10px; border-radius: 999px; background: #f3f4f6; color: #374151; font-weight: 700; font-size: .85rem; }
.badge-red { background: #fef2f2; color: #ef4444; border: 1px solid #fee2e2; }
.feature-cta { display: flex; gap: .75rem; margin-top: .75rem; }
.btn { padding: 8px 14px; border-radius: 10px; font-weight: 700; border: 1px solid #e5e7eb; background: #fff; color: #111827; transition: all .2s ease; }
.btn:hover { transform: translateY(-1px); box-shadow: 0 8px 16px rgba(0,0,0,.06); }
.btn-primary { background: linear-gradient(135deg, #DC2626 0%, #EF4444 100%); color: #fff; border-color: transparent; }
.btn-ghost { background: #fff; color: #ef4444; border-color: #fecaca; }

/* 项目发展 - 纵向时间轴（参考“发展历程”） */
.timeline-section { padding: 3rem 0; background: #f5f7fb; }
.timeline-vertical .timeline-grid { display: grid; grid-template-columns: 1fr 160px; gap: 24px; align-items: start; }
.timeline-vertical .timeline-main { position: relative; padding-right: 24px; }
.timeline-vertical .year-large { font-size: 96px; font-weight: 800; color: #374151; letter-spacing: 2px; margin-bottom: 12px; }
.timeline-vertical .timeline-list { list-style: none; padding: 0; margin: 0; border-left: 3px solid #ef4444; }
.timeline-vertical .tlv-item { position: relative; padding: 16px 0 16px 24px; }
.timeline-vertical .tlv-item::before { content: ''; position: absolute; left: -7px; top: 24px; width: 10px; height: 10px; background: #ef4444; border-radius: 50%; box-shadow: 0 0 0 6px rgba(239,68,68,.12); }
.timeline-vertical .tlv-title { font-weight: 800; font-size: 18px; color: #111827; margin-bottom: 4px; }
.timeline-vertical .tlv-meta { color: #ef4444; font-weight: 700; margin-bottom: 4px; }
.timeline-vertical .tlv-desc { color: #6b7280; line-height: 1.8; }
.timeline-vertical .timeline-more { margin-top: 12px; color: #ef4444; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; }

.timeline-vertical .year-side { position: sticky; top: 96px; }
.timeline-vertical .year-side ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px; align-items: flex-end; }
.timeline-vertical .year-side li { color: #9ca3af; cursor: default; font-weight: 700; }
.timeline-vertical .year-side li.active { color: #ef4444; }

@media (max-width: 1024px){
  .timeline-vertical .timeline-grid { grid-template-columns: 1fr; }
  .timeline-vertical .year-side { position: static; order: -1; }
  .timeline-vertical .year-side ul { flex-direction: row; justify-content: flex-start; gap: 16px; }
}

/* 图表区域 */
.heritage-charts { padding: 2.5rem 0; background: #f9fafb; }
.charts-grid { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 1.25rem; }
.chart-box { background: #fff; border: 1px solid #eef2f7; border-radius: 16px; padding: 1rem; box-shadow: 0 12px 24px rgba(0,0,0,.05); }
.chart-title { font-weight: 800; margin: .25rem 0 .5rem; color: #111827; }
.chart-canvas { width: 100%; height: 320px; }
@media (max-width: 768px){ .charts-grid { grid-template-columns: 1fr; } .chart-canvas{ height: 260px; } }

.loading-indicator {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  color: #6b7280;
  font-size: 14px;
}

.loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #f3f4f6;
  border-top: 3px solid #dc2626;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 实践成果按钮样式 */
.practice-success-btn {
  background: linear-gradient(135deg, #DC2626 0%, #EF4444 100%);
  border: none;
  border-radius: 16px;
  padding: 0;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 8px 25px rgba(220, 38, 38, 0.3),
    0 4px 12px rgba(220, 38, 38, 0.2);
  position: relative;
  overflow: hidden;
  display: block;
  width: 100%;
  margin: 0;
  min-height: 96px;
  outline: none;
}

.practice-success-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%, rgba(255, 255, 255, 0.1) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.practice-success-btn:hover::before {
  opacity: 1;
}

.practice-success-btn:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 
    0 12px 35px rgba(220, 38, 38, 0.4),
    0 6px 18px rgba(220, 38, 38, 0.25);
}

.practice-success-btn:active {
  transform: translateY(-2px) scale(1.02);
  transition: all 0.15s ease;
}

.btn-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 24px 16px;
  color: white;
  position: relative;
  z-index: 1;
}

.btn-icon {
  font-size: 3rem;
  margin-bottom: 16px;
  animation: bounce 2s infinite;
}

.btn-text {
  font-size: 1.125rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  line-height: 1.2;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-8px);
  }
  60% {
    transform: translateY(-4px);
  }
}

.gradient-title {
  background: linear-gradient(135deg, #DC2626 0%, #EF4444 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .practice-success-btn {
    width: 140px;
    height: 180px;
  }
  
  .btn-icon {
    font-size: 2.5rem;
    margin-bottom: 12px;
  }
  
  .btn-text {
    font-size: 1rem;
  }
}

@media (max-width: 768px) {
  .hero-carousel-section {
    height: 50vh;
    max-height: 400px;
    min-height: 250px;
  }
  
  .swiper-button-next,
  .swiper-button-prev {
    display: none;
  }
  
  .swiper-pagination {
    bottom: 15px !important;
  }
  
  .swiper-pagination-bullet {
    width: 8px;
    height: 8px;
    margin: 0 3px;
  }
  
  /* 移动端改为水平布局 */
  .flex.items-center.justify-between {
    flex-direction: column;
    gap: 2rem;
  }
  
  .practice-success-btn {
    width: 120px;
    height: 160px;
  }
  
  .btn-icon {
    font-size: 2rem;
    margin-bottom: 8px;
  }
  
  .btn-text {
    font-size: 0.875rem;
  }
  
  .china-map {
    height: 550px; /* 移动端也相应增加高度 */
  }
}

@media (max-width: 480px) {
  .hero-carousel-section {
    height: 45vh;
    max-height: 350px;
    min-height: 220px;
  }
  
  .china-map {
    height: 480px; /* 小屏设备也相应增加高度 */
  }
}

.homepage {
  min-height: 100vh;
  background-color: #f8fafc;
}



.hero-carousel-section {
  height: 60vh;
}

.swiper-container {
  height: 100%;
}

.swiper-slide {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: transform 0.6s ease-in-out; /* 平滑过渡体验 */
}

.gradient-title {
  background: linear-gradient(135deg, #DC2626 0%, #EF4444 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.china-map {
  height: 500px;
  width: 100%;
  position: relative;
}

.loading-indicator {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f4f6;
  border-top: 4px solid #dc2626;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.practice-success-btn {
  background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
  color: white;
  border: none;
  border-radius: 1rem;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(220, 38, 38, 0.3);
}

.practice-success-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 15px rgba(220, 38, 38, 0.4);
}

.btn-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.btn-icon {
  font-size: 2rem;
}

.btn-text {
  font-weight: 600;
  font-size: 1rem;
}

.map-section {
  background: linear-gradient(to bottom, #f8fafc, #ffffff);
}

/* ——— 实践成果侧边栏（桌面端） ——— */
.results-aside {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 240px;
  position: sticky;
  top: 96px;
}

.mini-cards { display: flex; flex-direction: column; gap: 12px; }
.mini-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  margin: 0;
  border-radius: 12px;
  background: #ffffff;
  border: 1px solid #eef2f7;
  box-shadow: 0 10px 20px rgba(0,0,0,0.04);
}
.mini-icon {
  width: 36px; height: 36px; border-radius: 999px; display: grid; place-items: center;
  color: #fff; font-weight: 800; font-size: .9rem;
}
.mini-icon.un { background: linear-gradient(135deg, #f59e0b, #d97706); }
.mini-icon.national { background: linear-gradient(135deg, #dc2626, #991b1b); }
.mini-icon.provincial { background: linear-gradient(135deg, #2563eb, #1d4ed8); }
.mini-icon.municipal { background: linear-gradient(135deg, #059669, #047857); }
.mini-icon.neutral { background: #fee2e2; color: #ef4444; font-size: 1.1rem; }
.mini-num { font-weight: 800; color: #111827; line-height: 1; }
.mini-label { font-size: .85rem; color: #6b7280; }

/* 侧边栏与移动端显示控制 */
@media (max-width: 1024px) {
  .results-aside { display: none; }
}
@media (min-width: 1025px) {
  .results-cards-mobile { display: none !important; }
}

/* 成果速览（stat-card）增强样式 */
.stat-card {
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  background: #ffffff;
  border: 1px solid #eef2f7;
  box-shadow: 0 10px 20px rgba(0,0,0,0.04);
  transition: transform .25s ease, box-shadow .25s ease;
}
.stat-card::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 4px;
  background: linear-gradient(90deg, #DC2626 0%, #EF4444 100%);
}
.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 36px rgba(0,0,0,0.08);
}
.stat-card .stat-num {
  background: linear-gradient(135deg, #DC2626, #EF4444);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 2rem;
  line-height: 1.1;
}
.stat-card .stat-desc {
  color: #6b7280;
}

/* 团队简介 */
 .team-section { padding: 2.5rem 0; background: #ffffff; }
 .team-hero { display: grid; grid-template-columns: 1fr; gap: 1rem; align-items: center; max-width: 960px; margin: 0 auto 1.5rem; }
 .team-brand { display: flex; align-items: center; gap: 1rem; }
 .team-logo { width: 56px; height: 56px; border-radius: 12px; box-shadow: 0 8px 20px rgba(0,0,0,.08); object-fit: cover; background: #fff; border: 1px solid #eef2f7; }
 .team-name { font-size: 1.5rem; font-weight: 800; color: #111827; }
 .team-slogan { color: #ef4444; font-weight: 700; }
 .team-intro { color: #4b5563; line-height: 1.9; }
 .team-intro-grid { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 1rem; max-width: 1100px; margin: 0 auto; }
 .team-card { background: #fff; border: 1px solid #eef2f7; border-radius: 16px; padding: 1rem; box-shadow: 0 10px 24px rgba(0,0,0,.04); }
 .team-card-title { font-weight: 800; color: #111827; margin-bottom: .5rem; }
 .team-card-text { color: #374151; }
 .bullet-list { padding-left: 1rem; color: #4b5563; }
 .bullet-list li { list-style: disc; margin: .25rem 0; }
 .advisors-list, .members-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: .5rem; }
 .advisor-item, .member-item { display: flex; align-items: center; gap: .5rem; }
 .avatar { width: 32px; height: 32px; display: grid; place-items: center; background: #fef2f2; border: 1px solid #fee2e2; border-radius: 10px; }
 .member-item .tag { display: inline-block; padding: 2px 8px; border-radius: 999px; background: #fef2f2; color: #ef4444; font-weight: 700; font-size: .8rem; margin-right: .25rem; }
 .member-item .name { color: #374151; }
 @media (max-width: 992px){ .team-intro-grid { grid-template-columns: 1fr; } }

/* 页脚 */
.site-footer {
  background: linear-gradient(180deg, #fff5f5 0%, #fff 100%);
  border-top: 1px solid #eef2f7;
  padding: 24px 0 32px;
}
.site-footer .footer-inner { display: grid; grid-template-columns: 1fr; gap: 12px; max-width: 1100px; margin: 0 auto; }
.site-footer .brand-name { font-weight: 800; color: #111827; }
.site-footer .brand-desc { color: #6b7280; }

/* 非遗项目展示样式 */
.heritage-projects-section {
  padding: 3rem 0;
  background: linear-gradient(135deg, #fef7f0 0%, #ffffff 50%, #f0f9ff 100%);
}

.heritage-categories {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.heritage-category {
  background: #ffffff;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #f1f5f9;
}

.category-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.level-badge {
  padding: 0.5rem 1rem;
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.875rem;
  color: white;
}

.level-un { background: linear-gradient(135deg, #f59e0b, #d97706); }
.level-national { background: linear-gradient(135deg, #dc2626, #991b1b); }
.level-provincial { background: linear-gradient(135deg, #2563eb, #1d4ed8); }
.level-municipal { background: linear-gradient(135deg, #059669, #047857); }

.category-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.project-card {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1rem;
  transition: all 0.3s ease;
  cursor: pointer;
}

.project-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  border-color: #dc2626;
}

.project-name {
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.project-region {
  font-size: 0.875rem;
  color: #6b7280;
}

.heritage-summary {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-top: 2rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #dc2626, #ef4444);
  border-radius: 16px;
  color: white;
}

.summary-item {
  text-align: center;
}

.summary-number {
  display: block;
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 0.25rem;
}

.summary-label {
  font-size: 0.875rem;
  opacity: 0.9;
}

.heritage-level-card {
  transition: all 0.3s ease;
  padding: 1rem; /* 减少内边距 */
}

.heritage-level-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
}

.heritage-level-card .w-12 {
  width: 2.5rem; /* 缩小图标尺寸 */
  height: 2.5rem;
}

.heritage-level-card .text-2xl {
  font-size: 1.5rem; /* 缩小数字字体 */
}

.heritage-level-card .text-gray-600 {
  font-size: 0.875rem; /* 缩小标签字体 */
}

/* 移动端适配 */
@media (max-width: 768px) {
  .hero-carousel-section {
    height: 50vh;
  }
  
  .china-map {
    height: 300px;
  }
  
  .text-4xl {
    font-size: 2rem;
  }
  
  .flex-col {
    flex-direction: column;
  }
  
  .heritage-summary {
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .projects-grid {
    grid-template-columns: 1fr;
  }
  
  .heritage-categories {
    gap: 1.5rem;
  }
  
  .heritage-category {
    padding: 1rem;
  }
  
  .category-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>
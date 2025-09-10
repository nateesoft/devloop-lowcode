export interface WebsiteTemplate {
  id: string
  title: string
  description: string
  author: {
    id: string
    name: string
    avatar: string
    followers: number
  }
  thumbnail: string
  htmlContent?: string
  likes: number
  comments: number
  tags: string[]
  tech: {
    frontend: string
    backend: string
    database: string
    hosting: string
  }
  category: string
}

export const websiteTemplates: WebsiteTemplate[] = [
  {
    id: '1',
    title: 'E-commerce Store Template',
    description: 'Full-screen e-commerce template with immersive product galleries and responsive checkout experience',
    author: {
      id: 'user1',
      name: 'นายสมชาย',
      avatar: 'https://via.placeholder.com/40',
      followers: 1200
    },
    thumbnail: '/templates/thumbnails/ecommerce-fullscreen.svg',
    htmlContent: `
      <div style="font-family: Arial, sans-serif; margin: 0; padding: 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); height: 100vh; overflow-y: auto;">
        <nav style="background: rgba(255,255,255,0.95); backdrop-filter: blur(10px); padding: 1rem; position: sticky; top: 0; z-index: 100; border-bottom: 1px solid rgba(0,0,0,0.1);">
          <div style="max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center;">
            <h1 style="margin: 0; color: #333; font-size: 1.8rem; font-weight: bold;">🛍️ ShopPro</h1>
            <div style="display: flex; gap: 2rem; align-items: center;">
              <a href="#" style="text-decoration: none; color: #666; font-weight: 500;">สินค้า</a>
              <a href="#" style="text-decoration: none; color: #666; font-weight: 500;">หมวดหมู่</a>
              <a href="#" style="text-decoration: none; color: #666; font-weight: 500;">เกี่ยวกับ</a>
              <button style="background: #667eea; color: white; border: none; padding: 0.5rem 1.5rem; border-radius: 25px; cursor: pointer; font-weight: 500;">🛒 ตะกร้า (3)</button>
            </div>
          </div>
        </nav>
        <header style="text-align: center; padding: 4rem 2rem; background: rgba(255,255,255,0.1); margin: 2rem; border-radius: 20px; backdrop-filter: blur(10px);">
          <h2 style="color: white; font-size: 3rem; margin: 0 0 1rem 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">ยินดีต้อนรับสู่ ShopPro</h2>
          <p style="color: rgba(255,255,255,0.9); font-size: 1.2rem; margin-bottom: 2rem;">คุณภาพดี ราคาคุ้มค่า จัดส่งฟรีทั่วไทย</p>
          <button style="background: linear-gradient(45deg, #ff6b6b, #ee5a52); color: white; border: none; padding: 1rem 3rem; font-size: 1.1rem; border-radius: 30px; cursor: pointer; box-shadow: 0 4px 15px rgba(0,0,0,0.2); font-weight: bold;">🎉 ช้อปเลย!</button>
        </header>
        <section style="max-width: 1200px; margin: 0 auto; padding: 2rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem;">
          <div style="background: white; border-radius: 15px; padding: 1.5rem; box-shadow: 0 8px 25px rgba(0,0,0,0.1); transform: translateY(0); transition: transform 0.3s;">
            <div style="background: #f8f9ff; height: 200px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 3rem; margin-bottom: 1rem;">📱</div>
            <h3 style="color: #333; margin: 0 0 0.5rem 0;">iPhone 15 Pro</h3>
            <p style="color: #666; font-size: 0.9rem; margin-bottom: 1rem;">เทคโนโลยีล่าสุด กล้องคุณภาพสูง</p>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 1.4rem; font-weight: bold; color: #667eea;">฿39,900</span>
              <button style="background: #667eea; color: white; border: none; padding: 0.5rem 1rem; border-radius: 8px; cursor: pointer;">เพิ่มลงตะกร้า</button>
            </div>
          </div>
          <div style="background: white; border-radius: 15px; padding: 1.5rem; box-shadow: 0 8px 25px rgba(0,0,0,0.1);">
            <div style="background: #f0f9ff; height: 200px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 3rem; margin-bottom: 1rem;">👕</div>
            <h3 style="color: #333; margin: 0 0 0.5rem 0;">เสื้อยืดคุณภาพ</h3>
            <p style="color: #666; font-size: 0.9rem; margin-bottom: 1rem;">ผ้าฝ้าย 100% นุ่มสบาย</p>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 1.4rem; font-weight: bold; color: #667eea;">฿290</span>
              <button style="background: #667eea; color: white; border: none; padding: 0.5rem 1rem; border-radius: 8px; cursor: pointer;">เพิ่มลงตะกร้า</button>
            </div>
          </div>
          <div style="background: white; border-radius: 15px; padding: 1.5rem; box-shadow: 0 8px 25px rgba(0,0,0,0.1);">
            <div style="background: #fef3e2; height: 200px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 3rem; margin-bottom: 1rem;">⌚</div>
            <h3 style="color: #333; margin: 0 0 0.5rem 0;">Smart Watch</h3>
            <p style="color: #666; font-size: 0.9rem; margin-bottom: 1rem;">ติดตามสุขภาพ GPS ในตัว</p>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 1.4rem; font-weight: bold; color: #667eea;">฿8,900</span>
              <button style="background: #667eea; color: white; border: none; padding: 0.5rem 1rem; border-radius: 8px; cursor: pointer;">เพิ่มลงตะกร้า</button>
            </div>
          </div>
        </section>
      </div>
    `,
    likes: 245,
    comments: 32,
    tags: ['ecommerce', 'fullscreen', 'responsive'],
    tech: {
      frontend: 'Next.js',
      backend: 'Node.js',
      database: 'MongoDB',
      hosting: 'Vercel'
    },
    category: 'E-commerce'
  },
  {
    id: '2',
    title: 'Admin Dashboard Template',
    description: 'Full-screen analytics dashboard with interactive charts and real-time monitoring',
    author: {
      id: 'user2',
      name: 'น.ส.สมใจ',
      avatar: 'https://via.placeholder.com/40',
      followers: 890
    },
    thumbnail: '/templates/thumbnails/dashboard-fullscreen.svg',
    likes: 156,
    comments: 18,
    tags: ['dashboard', 'analytics', 'fullscreen'],
    tech: {
      frontend: 'React',
      backend: 'Express',
      database: 'PostgreSQL',
      hosting: 'Netlify'
    },
    category: 'Dashboard'
  },
  {
    id: '3',
    title: 'Portfolio Website',
    description: 'Stunning full-screen portfolio with interactive animations and immersive project showcases',
    author: {
      id: 'user3',
      name: 'ครูสมศรี',
      avatar: 'https://via.placeholder.com/40',
      followers: 2100
    },
    thumbnail: '/templates/thumbnails/portfolio-fullscreen.svg',
    likes: 389,
    comments: 45,
    tags: ['portfolio', 'fullscreen', 'animations'],
    tech: {
      frontend: 'Vue.js',
      backend: 'Laravel',
      database: 'MySQL',
      hosting: 'AWS'
    },
    category: 'Portfolio'
  },
  {
    id: '4',
    title: 'Blog Platform',
    description: 'Full-screen reading experience with modern typography and responsive design',
    author: {
      id: 'user4',
      name: 'นาย เต็ม',
      avatar: 'https://via.placeholder.com/40',
      followers: 1450
    },
    thumbnail: '/templates/thumbnails/blog-fullscreen.svg',
    likes: 289,
    comments: 24,
    tags: ['blog', 'fullscreen', 'typography'],
    tech: {
      frontend: 'Gatsby',
      backend: 'GraphQL',
      database: 'Contentful',
      hosting: 'Netlify'
    },
    category: 'Blog'
  },
  {
    id: '5',
    title: 'Chat Application',
    description: 'Full-screen real-time chat with modern UI and responsive mobile experience',
    author: {
      id: 'user5',
      name: 'น.ส.มาลี',
      avatar: 'https://via.placeholder.com/40',
      followers: 678
    },
    thumbnail: '/templates/thumbnails/chat-fullscreen.svg',
    likes: 412,
    comments: 67,
    tags: ['chat', 'realtime', 'fullscreen'],
    tech: {
      frontend: 'React',
      backend: 'Socket.io',
      database: 'MongoDB',
      hosting: 'Heroku'
    },
    category: 'Communication'
  },
  {
    id: '6',
    title: 'Landing Page Template',
    description: 'Modern landing page with hero sections, features showcase and call-to-action buttons',
    author: {
      id: 'user6',
      name: 'คุณปราณี',
      avatar: 'https://via.placeholder.com/40',
      followers: 1890
    },
    thumbnail: '/templates/thumbnails/landing-fullscreen.svg',
    likes: 567,
    comments: 89,
    tags: ['landing', 'marketing', 'responsive'],
    tech: {
      frontend: 'React',
      backend: 'Node.js',
      database: 'MySQL',
      hosting: 'Vercel'
    },
    category: 'Marketing'
  },
  {
    id: '7',
    title: 'Restaurant Menu Website',
    description: 'Beautiful restaurant website with online menu, reservation system and photo gallery',
    author: {
      id: 'user7',
      name: 'เชฟสมศักดิ์',
      avatar: 'https://via.placeholder.com/40',
      followers: 945
    },
    thumbnail: '/templates/thumbnails/restaurant-fullscreen.svg',
    likes: 234,
    comments: 45,
    tags: ['restaurant', 'menu', 'booking'],
    tech: {
      frontend: 'Vue.js',
      backend: 'Express',
      database: 'PostgreSQL',
      hosting: 'Netlify'
    },
    category: 'Restaurant'
  },
  {
    id: '8',
    title: 'Learning Management System',
    description: 'Complete LMS with course management, video streaming and student progress tracking',
    author: {
      id: 'user8',
      name: 'อาจารย์สมหมาย',
      avatar: 'https://via.placeholder.com/40',
      followers: 2340
    },
    thumbnail: '/templates/thumbnails/lms-fullscreen.svg',
    likes: 678,
    comments: 123,
    tags: ['education', 'lms', 'videos'],
    tech: {
      frontend: 'Next.js',
      backend: 'Node.js',
      database: 'MongoDB',
      hosting: 'AWS'
    },
    category: 'Education'
  },
  {
    id: '9',
    title: 'Real Estate Website',
    description: 'Property listing website with advanced search filters and virtual tour integration',
    author: {
      id: 'user9',
      name: 'นายกิตติ',
      avatar: 'https://via.placeholder.com/40',
      followers: 1567
    },
    thumbnail: '/templates/thumbnails/realestate-fullscreen.svg',
    likes: 345,
    comments: 67,
    tags: ['realestate', 'property', 'search'],
    tech: {
      frontend: 'React',
      backend: 'Laravel',
      database: 'MySQL',
      hosting: 'Digital Ocean'
    },
    category: 'Real Estate'
  },
  {
    id: '10',
    title: 'Event Management Platform',
    description: 'Event planning platform with ticket booking, attendee management and live streaming',
    author: {
      id: 'user10',
      name: 'คุณสุดา',
      avatar: 'https://via.placeholder.com/40',
      followers: 1123
    },
    thumbnail: '/templates/thumbnails/event-fullscreen.svg',
    likes: 456,
    comments: 78,
    tags: ['events', 'tickets', 'streaming'],
    tech: {
      frontend: 'Vue.js',
      backend: 'Node.js',
      database: 'PostgreSQL',
      hosting: 'Heroku'
    },
    category: 'Events'
  },
  {
    id: '11',
    title: 'Fitness Tracker App',
    description: 'Health and fitness tracking web app with workout plans and progress analytics',
    author: {
      id: 'user11',
      name: 'โค้ชดนัย',
      avatar: 'https://via.placeholder.com/40',
      followers: 2890
    },
    thumbnail: '/templates/thumbnails/fitness-fullscreen.svg',
    likes: 789,
    comments: 145,
    tags: ['fitness', 'health', 'tracking'],
    tech: {
      frontend: 'React',
      backend: 'Express',
      database: 'MongoDB',
      hosting: 'Vercel'
    },
    category: 'Health'
  },
  {
    id: '12',
    title: 'News Portal Website',
    description: 'Modern news website with categories, breaking news alerts and comment system',
    author: {
      id: 'user12',
      name: 'นักข่าวสมชัย',
      avatar: 'https://via.placeholder.com/40',
      followers: 3456
    },
    thumbnail: '/templates/thumbnails/news-fullscreen.svg',
    likes: 892,
    comments: 234,
    tags: ['news', 'media', 'articles'],
    tech: {
      frontend: 'Next.js',
      backend: 'GraphQL',
      database: 'PostgreSQL',
      hosting: 'AWS'
    },
    category: 'Media'
  },
  {
    id: '13',
    title: 'Travel Booking Website',
    description: 'Complete travel booking platform with hotel search, flight booking and itinerary planning',
    author: {
      id: 'user13',
      name: 'คุณทิพย์',
      avatar: 'https://via.placeholder.com/40',
      followers: 1789
    },
    thumbnail: '/templates/thumbnails/travel-fullscreen.svg',
    likes: 567,
    comments: 98,
    tags: ['travel', 'booking', 'hotels'],
    tech: {
      frontend: 'Vue.js',
      backend: 'Node.js',
      database: 'MongoDB',
      hosting: 'Digital Ocean'
    },
    category: 'Travel'
  },
  {
    id: '14',
    title: 'Music Streaming Platform',
    description: 'Music streaming website with playlists, artist profiles and social sharing features',
    author: {
      id: 'user14',
      name: 'DJ ใจดี',
      avatar: 'https://via.placeholder.com/40',
      followers: 4567
    },
    thumbnail: '/templates/thumbnails/music-fullscreen.svg',
    likes: 1234,
    comments: 345,
    tags: ['music', 'streaming', 'playlist'],
    tech: {
      frontend: 'React',
      backend: 'Node.js',
      database: 'MongoDB',
      hosting: 'AWS'
    },
    category: 'Entertainment'
  },
  {
    id: '15',
    title: 'Banking & Finance Dashboard',
    description: 'Secure banking dashboard with account management, transaction history and investment tracking',
    author: {
      id: 'user15',
      name: 'นายธนาคาร',
      avatar: 'https://via.placeholder.com/40',
      followers: 2234
    },
    thumbnail: '/templates/thumbnails/banking-fullscreen.svg',
    likes: 678,
    comments: 123,
    tags: ['banking', 'finance', 'security'],
    tech: {
      frontend: 'Next.js',
      backend: 'Java Spring',
      database: 'PostgreSQL',
      hosting: 'Private Cloud'
    },
    category: 'Finance'
  },
  {
    id: '16',
    title: 'NFT Marketplace',
    description: 'Modern NFT trading platform with collection galleries, bidding system and blockchain integration',
    author: {
      id: 'user16',
      name: 'Crypto จันทร์',
      avatar: 'https://via.placeholder.com/40',
      followers: 3890
    },
    thumbnail: '/templates/thumbnails/nft-marketplace.svg',
    likes: 1123,
    comments: 256,
    tags: ['nft', 'blockchain', 'crypto'],
    tech: {
      frontend: 'React',
      backend: 'Node.js + Web3',
      database: 'IPFS + MongoDB',
      hosting: 'Vercel'
    },
    category: 'Web3'
  },
  {
    id: '17',
    title: 'SaaS Analytics Dashboard',
    description: 'Comprehensive SaaS analytics with user tracking, revenue metrics and subscription management',
    author: {
      id: 'user17',
      name: 'Data นักวิเคราะห์',
      avatar: 'https://via.placeholder.com/40',
      followers: 2567
    },
    thumbnail: '/templates/thumbnails/saas-analytics.svg',
    likes: 789,
    comments: 134,
    tags: ['saas', 'analytics', 'dashboard'],
    tech: {
      frontend: 'Vue.js + D3.js',
      backend: 'Python FastAPI',
      database: 'ClickHouse',
      hosting: 'AWS'
    },
    category: 'SaaS'
  },
  {
    id: '18',
    title: 'AI Chatbot Platform',
    description: 'Conversational AI platform with natural language processing and multi-language support',
    author: {
      id: 'user18',
      name: 'AI Engineer สมาร์ท',
      avatar: 'https://via.placeholder.com/40',
      followers: 4123
    },
    thumbnail: '/templates/thumbnails/ai-chatbot.svg',
    likes: 1456,
    comments: 289,
    tags: ['ai', 'chatbot', 'nlp'],
    tech: {
      frontend: 'React + TypeScript',
      backend: 'Python + OpenAI',
      database: 'Vector DB',
      hosting: 'Google Cloud'
    },
    category: 'AI/ML'
  },
  {
    id: '19',
    title: 'IoT Smart Home Dashboard',
    description: 'Smart home control center with device monitoring, automation rules and energy tracking',
    author: {
      id: 'user19',
      name: 'IoT Engineer มาก',
      avatar: 'https://via.placeholder.com/40',
      followers: 1890
    },
    thumbnail: '/templates/thumbnails/iot-smarthome.svg',
    likes: 567,
    comments: 89,
    tags: ['iot', 'smarthome', 'automation'],
    tech: {
      frontend: 'Angular + Chart.js',
      backend: 'Node.js + MQTT',
      database: 'InfluxDB',
      hosting: 'Digital Ocean'
    },
    category: 'IoT'
  },
  {
    id: '20',
    title: 'Blockchain Voting System',
    description: 'Decentralized voting platform with smart contracts, transparency and immutable records',
    author: {
      id: 'user20',
      name: 'Blockchain Dev ใส',
      avatar: 'https://via.placeholder.com/40',
      followers: 2345
    },
    thumbnail: '/templates/thumbnails/blockchain-voting.svg',
    likes: 890,
    comments: 167,
    tags: ['blockchain', 'voting', 'democracy'],
    tech: {
      frontend: 'React + Web3.js',
      backend: 'Solidity + Hardhat',
      database: 'Ethereum Blockchain',
      hosting: 'IPFS'
    },
    category: 'Blockchain'
  },
  {
    id: '21',
    title: 'AR/VR Experience Showcase',
    description: 'Immersive AR/VR gallery with 3D models, virtual tours and interactive experiences',
    author: {
      id: 'user21',
      name: 'VR Artist วิชั่น',
      avatar: 'https://via.placeholder.com/40',
      followers: 3456
    },
    thumbnail: '/templates/thumbnails/ar-vr-showcase.svg',
    likes: 1234,
    comments: 278,
    tags: ['ar', 'vr', '3d'],
    tech: {
      frontend: 'Three.js + WebXR',
      backend: 'Node.js',
      database: '3D Asset Storage',
      hosting: 'AWS CloudFront'
    },
    category: 'AR/VR'
  },
  {
    id: '22',
    title: 'Gaming Tournament Platform',
    description: 'Esports tournament management with player rankings, live streams and prize pools',
    author: {
      id: 'user22',
      name: 'Pro Gamer แชมป์',
      avatar: 'https://via.placeholder.com/40',
      followers: 5678
    },
    thumbnail: '/templates/thumbnails/gaming-tournament.svg',
    likes: 2145,
    comments: 445,
    tags: ['gaming', 'esports', 'tournament'],
    tech: {
      frontend: 'React + Socket.io',
      backend: 'Node.js + Redis',
      database: 'MongoDB',
      hosting: 'AWS + CDN'
    },
    category: 'Gaming'
  },
  {
    id: '23',
    title: 'Telemedicine Platform',
    description: 'Healthcare consultation app with video calls, prescription management and patient records',
    author: {
      id: 'user23',
      name: 'หมอออนไลน์ ดี',
      avatar: 'https://via.placeholder.com/40',
      followers: 4890
    },
    thumbnail: '/templates/thumbnails/telemedicine.svg',
    likes: 1567,
    comments: 234,
    tags: ['healthcare', 'telemedicine', 'consultation'],
    tech: {
      frontend: 'Vue.js + WebRTC',
      backend: 'Java Spring Boot',
      database: 'PostgreSQL (HIPAA)',
      hosting: 'Private Cloud'
    },
    category: 'Healthcare'
  },
  {
    id: '24',
    title: 'Green Energy Monitor',
    description: 'Renewable energy tracking dashboard with solar panels, wind turbines and carbon footprint',
    author: {
      id: 'user24',
      name: 'Green Engineer เขียว',
      avatar: 'https://via.placeholder.com/40',
      followers: 2134
    },
    thumbnail: '/templates/thumbnails/green-energy.svg',
    likes: 789,
    comments: 123,
    tags: ['green', 'energy', 'sustainability'],
    tech: {
      frontend: 'Svelte + D3.js',
      backend: 'Python Flask',
      database: 'TimescaleDB',
      hosting: 'Green Hosting'
    },
    category: 'Green Tech'
  },
  {
    id: '25',
    title: 'DevOps CI/CD Pipeline',
    description: 'Complete DevOps dashboard with deployment pipelines, monitoring and infrastructure management',
    author: {
      id: 'user25',
      name: 'DevOps Engineer ออโต้',
      avatar: 'https://via.placeholder.com/40',
      followers: 3789
    },
    thumbnail: '/templates/thumbnails/devops-pipeline.svg',
    likes: 1345,
    comments: 289,
    tags: ['devops', 'cicd', 'automation'],
    tech: {
      frontend: 'React + Grafana',
      backend: 'Go + Docker',
      database: 'Prometheus',
      hosting: 'Kubernetes'
    },
    category: 'DevOps'
  },
  {
    id: '26',
    title: 'Stock Trading Bot',
    description: 'Algorithmic trading platform with AI analysis, risk management and portfolio optimization',
    author: {
      id: 'user26',
      name: 'Quant Trader หุ้น',
      avatar: 'https://via.placeholder.com/40',
      followers: 4567
    },
    thumbnail: '/templates/thumbnails/trading-bot.svg',
    likes: 1890,
    comments: 356,
    tags: ['trading', 'fintech', 'ai'],
    tech: {
      frontend: 'React + TradingView',
      backend: 'Python + ML',
      database: 'Redis + PostgreSQL',
      hosting: 'AWS Lambda'
    },
    category: 'FinTech'
  },
  {
    id: '27',
    title: 'Space Mission Dashboard',
    description: 'NASA-style mission control with satellite tracking, telemetry data and orbital mechanics',
    author: {
      id: 'user27',
      name: 'Space Engineer ดาว',
      avatar: 'https://via.placeholder.com/40',
      followers: 6789
    },
    thumbnail: '/templates/thumbnails/space-mission.svg',
    likes: 2456,
    comments: 478,
    tags: ['space', 'satellite', 'aerospace'],
    tech: {
      frontend: 'React + Cesium.js',
      backend: 'C++ + Python',
      database: 'NASA APIs',
      hosting: 'High Performance'
    },
    category: 'Aerospace'
  },
  {
    id: '28',
    title: 'Mental Health Tracker',
    description: 'Wellness app with mood tracking, meditation guides and therapy session booking',
    author: {
      id: 'user28',
      name: 'Wellness Coach จิต',
      avatar: 'https://via.placeholder.com/40',
      followers: 3234
    },
    thumbnail: '/templates/thumbnails/mental-health.svg',
    likes: 1123,
    comments: 234,
    tags: ['wellness', 'mental health', 'meditation'],
    tech: {
      frontend: 'React Native + Web',
      backend: 'Node.js + ML',
      database: 'MongoDB (Encrypted)',
      hosting: 'Secure Cloud'
    },
    category: 'Wellness'
  },
  {
    id: '29',
    title: 'Smart City Dashboard',
    description: 'Urban management system with traffic flow, air quality monitoring and citizen services',
    author: {
      id: 'user29',
      name: 'Smart City นะคะ',
      avatar: 'https://via.placeholder.com/40',
      followers: 5432
    },
    thumbnail: '/templates/thumbnails/smart-city.svg',
    likes: 1789,
    comments: 345,
    tags: ['smart city', 'urban', 'iot'],
    tech: {
      frontend: 'Angular + MapBox',
      backend: 'Java Microservices',
      database: 'Big Data Stack',
      hosting: 'Government Cloud'
    },
    category: 'Smart City'
  },
  {
    id: '30',
    title: 'Ocean Research Platform',
    description: 'Marine biology research with underwater drone data, species tracking and climate analysis',
    author: {
      id: 'user30',
      name: 'Marine Biologist ทะเล',
      avatar: 'https://via.placeholder.com/40',
      followers: 2890
    },
    thumbnail: '/templates/thumbnails/ocean-research.svg',
    likes: 967,
    comments: 178,
    tags: ['ocean', 'research', 'environment'],
    tech: {
      frontend: 'Vue.js + Leaflet',
      backend: 'Python + R',
      database: 'Scientific DB',
      hosting: 'Research Cloud'
    },
    category: 'Research'
  },
  {
    id: '31',
    title: 'Quantum Computing Lab',
    description: 'Quantum algorithm simulation with qubit visualization, circuit design and quantum gates',
    author: {
      id: 'user31',
      name: 'Quantum Physicist อนุ',
      avatar: 'https://via.placeholder.com/40',
      followers: 4321
    },
    thumbnail: '/templates/thumbnails/quantum-lab.svg',
    likes: 1456,
    comments: 298,
    tags: ['quantum', 'physics', 'simulation'],
    tech: {
      frontend: 'React + WebAssembly',
      backend: 'Python Qiskit',
      database: 'Quantum State DB',
      hosting: 'Supercomputer'
    },
    category: 'Quantum'
  },
  {
    id: '32',
    title: 'Drone Fleet Management',
    description: 'Autonomous drone coordination with flight paths, cargo delivery and real-time monitoring',
    author: {
      id: 'user32',
      name: 'Drone Pilot บิน',
      avatar: 'https://via.placeholder.com/40',
      followers: 3567
    },
    thumbnail: '/templates/thumbnails/drone-fleet.svg',
    likes: 1234,
    comments: 267,
    tags: ['drone', 'automation', 'logistics'],
    tech: {
      frontend: 'React + Mapbox',
      backend: 'ROS + Python',
      database: 'Flight Data DB',
      hosting: 'Edge Computing'
    },
    category: 'Robotics'
  },
  {
    id: '33',
    title: 'Climate Change Tracker',
    description: 'Global warming analysis with temperature data, ice cap monitoring and carbon emissions',
    author: {
      id: 'user33',
      name: 'Climate Scientist อบอุ่น',
      avatar: 'https://via.placeholder.com/40',
      followers: 6543
    },
    thumbnail: '/templates/thumbnails/climate-tracker.svg',
    likes: 2345,
    comments: 456,
    tags: ['climate', 'environment', 'data'],
    tech: {
      frontend: 'D3.js + Observable',
      backend: 'Python + ML',
      database: 'Climate APIs',
      hosting: 'Scientific Cloud'
    },
    category: 'Environmental'
  },
  {
    id: '34',
    title: 'Cryptocurrency Exchange',
    description: 'Advanced crypto trading platform with order books, charts and DeFi integration',
    author: {
      id: 'user34',
      name: 'Crypto Trader รวย',
      avatar: 'https://via.placeholder.com/40',
      followers: 7890
    },
    thumbnail: '/templates/thumbnails/crypto-exchange.svg',
    likes: 3456,
    comments: 678,
    tags: ['crypto', 'trading', 'defi'],
    tech: {
      frontend: 'React + TradingView',
      backend: 'Go + WebSocket',
      database: 'High Frequency DB',
      hosting: 'Multi-Region'
    },
    category: 'Cryptocurrency'
  },
  {
    id: '35',
    title: 'Virtual Fashion Store',
    description: 'Metaverse fashion platform with 3D try-on, NFT wearables and virtual runway shows',
    author: {
      id: 'user35',
      name: 'Fashion Designer เท่',
      avatar: 'https://via.placeholder.com/40',
      followers: 8765
    },
    thumbnail: '/templates/thumbnails/virtual-fashion.svg',
    likes: 4321,
    comments: 789,
    tags: ['fashion', 'metaverse', '3d'],
    tech: {
      frontend: 'Three.js + WebXR',
      backend: 'Node.js + Blockchain',
      database: '3D Asset Storage',
      hosting: 'Metaverse Cloud'
    },
    category: 'Metaverse'
  }
]
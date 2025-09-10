'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Home, Store, Plus, MessageSquare, UserCircle, Search, Compass, Users, Eye } from 'lucide-react'
import { websiteTemplates } from '@/data/websiteTemplates'

const headerTabs = [
  { id: 'devloop', icon: '🌐', label: 'DevLoop' },
  { id: 'explore', label: 'สำรวจ' },
  { id: 'friends', label: 'เพื่อน' },
  { id: 'following', label: 'กำลังติดตาม' },
  { id: 'foryou', label: 'สำหรับคุณ' },
  { id: 'search', icon: Search, label: '' }
]

const footerTabs = [
  { id: 'home', icon: Home, label: 'หน้าหลัก' },
  { id: 'shop', icon: Store, label: 'ร้านค้า' },
  { id: 'create', icon: Plus, label: 'สร้าง' },
  { id: 'messages', icon: MessageSquare, label: 'ข้อความ' },
  { id: 'profile', icon: UserCircle, label: 'โปรไฟล์' }
]

export function TikTokLayout() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [activeHeaderTab, setActiveHeaderTab] = useState('following')
  const [activeFooterTab, setActiveFooterTab] = useState('home')
  const [showArchitectDetails, setShowArchitectDetails] = useState(false)
  const [showCategoryGrid, setShowCategoryGrid] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [dragStart, setDragStart] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)
  const [createButtonClicked, setCreateButtonClicked] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const currentTemplate = websiteTemplates[currentIndex]

  const handleCreateClick = () => {
    setCreateButtonClicked(true)
    setActiveFooterTab('create')
    // Reset animation after duration
    setTimeout(() => {
      setCreateButtonClicked(false)
    }, 800)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.targetTouches[0]
    setTouchStart(touch.clientX)
    setDragStart(touch.clientY)
    setIsDragging(true)
    setDragOffset(0)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.targetTouches[0]
    setTouchEnd(touch.clientX)
    const offsetY = touch.clientY - dragStart
    setDragOffset(offsetY)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    // Horizontal swipe for sidebars
    const horizontalDistance = touchStart - touchEnd
    const isLeftSwipe = horizontalDistance > 50
    const isRightSwipe = horizontalDistance < -50
    
    // Vertical drag for template navigation
    const threshold = 50
    const isUpDrag = dragOffset < -threshold // ลากขึ้น = next
    const isDownDrag = dragOffset > threshold // ลากลง = previous

    if (isRightSwipe) {
      setShowArchitectDetails(true)
      setShowCategoryGrid(false)
    }
    if (isLeftSwipe) {
      setShowCategoryGrid(true)
      setShowArchitectDetails(false)
    }
    
    // Handle vertical drag for template navigation
    if (isUpDrag) {
      setCurrentIndex(prevIndex => (prevIndex + 1) % websiteTemplates.length)
    } else if (isDownDrag) {
      setCurrentIndex(prevIndex => prevIndex === 0 ? websiteTemplates.length - 1 : prevIndex - 1)
    }
    
    // Reset drag states
    setIsDragging(false)
    setDragOffset(0)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragStart(e.clientY)
    setIsDragging(true)
    setDragOffset(0)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    const currentY = e.clientY
    const offsetY = currentY - dragStart
    setDragOffset(offsetY)
  }

  const handleMouseUp = () => {
    if (!isDragging) return
    setIsDragging(false)
    
    const threshold = 50 // ลดจาก 100 เป็น 50 เพื่อให้ sensitive มากขึ้น
    const isUpDrag = dragOffset < -threshold // ลากขึ้น = next
    const isDownDrag = dragOffset > threshold // ลากลง = previous
    
    if (isUpDrag) {
      setCurrentIndex(prevIndex => (prevIndex + 1) % websiteTemplates.length)
    } else if (isDownDrag) {
      setCurrentIndex(prevIndex => prevIndex === 0 ? websiteTemplates.length - 1 : prevIndex - 1)
    }
    
    // Reset drag offset
    setDragOffset(0)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault()
      setCurrentIndex(prevIndex => {
        if (e.key === 'ArrowDown') {
          // Arrow down = เลื่อนไปข้างหน้า (index เพิ่ม)
          return (prevIndex + 1) % websiteTemplates.length
        } else if (e.key === 'ArrowUp') {
          // Arrow up = ย้อนกลับ (index ลด)
          return prevIndex === 0 ? websiteTemplates.length - 1 : prevIndex - 1
        }
        return prevIndex
      })
    }
  }

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      window.addEventListener('keydown', handleKeyDown)
      return () => {
        window.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className="relative h-screen w-full bg-black overflow-hidden cursor-grab active:cursor-grabbing select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Header Menu */}
      <div className="absolute top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm">
        <div className="flex items-center justify-center px-4 py-2 space-x-6">
          {headerTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveHeaderTab(tab.id)}
              className={`flex items-center space-x-1 px-3 py-1 rounded-full transition-all ${
                activeHeaderTab === tab.id 
                  ? 'bg-white text-black' 
                  : 'text-white/80 hover:text-white'
              }`}
            >
              {tab.icon && (
                typeof tab.icon === 'string' ? (
                  <span>{tab.icon}</span>
                ) : (
                  <tab.icon size={16} />
                )
              )}
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area - Full space between menu bars */}
      <div className="absolute top-12 bottom-20 left-4 right-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTemplate.id}
            initial={{ opacity: 0, y: '100%' }}
            animate={{ 
              opacity: 1,
              y: isDragging ? dragOffset * 0.3 : 0,
              scale: isDragging ? Math.max(0.95, 1 - Math.abs(dragOffset) * 0.0005) : 1
            }}
            exit={{ 
              opacity: 0, 
              y: dragOffset > 0 ? '100%' : '-100%'
            }}
            transition={{ 
              duration: isDragging ? 0 : 0.5,
              ease: isDragging ? [0.25, 0.46, 0.45, 0.94] : [0.22, 1, 0.36, 1],
              type: 'tween'
            }}
            className="w-full h-full relative"
            style={{
              filter: isDragging 
                ? `brightness(${Math.max(0.7, 1 - Math.abs(dragOffset) * 0.001)})` 
                : 'brightness(1)',
              boxShadow: isDragging 
                ? `0 ${Math.abs(dragOffset) * 0.02}px ${Math.abs(dragOffset) * 0.04}px rgba(0,0,0,0.2)`
                : '0 4px 12px rgba(0,0,0,0.1)'
            }}
          >
            {/* Drawer Preview for Next Template */}
            {isDragging && dragOffset < -50 && (
              <motion.div
                initial={{ opacity: 0, y: '-100%' }}
                animate={{ 
                  opacity: Math.min(1, Math.abs(dragOffset + 50) / 100),
                  y: `${Math.max(-100, -100 + (Math.abs(dragOffset) - 50) * 0.5)}%`
                }}
                className="absolute inset-0 z-10 bg-gradient-to-br from-gray-800 to-black rounded-lg overflow-hidden"
                style={{
                  boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
                }}
              >
                <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center flex-col p-8">
                  <div className="text-6xl mb-4">📱</div>
                  <div className="text-2xl font-bold text-white mb-2">
                    {websiteTemplates[(currentIndex + 1) % websiteTemplates.length]?.title || 'Next Template'}
                  </div>
                  <div className="text-sm text-white/70 text-center">
                    {websiteTemplates[(currentIndex + 1) % websiteTemplates.length]?.category || 'Loading...'}
                  </div>
                  <div className="mt-4 bg-white/20 px-4 py-2 rounded-full text-xs text-white">
                    ↑ Release to continue
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Drawer Preview for Previous Template */}
            {isDragging && dragOffset > 50 && (
              <motion.div
                initial={{ opacity: 0, y: '100%' }}
                animate={{ 
                  opacity: Math.min(1, Math.abs(dragOffset - 50) / 100),
                  y: `${Math.min(100, 100 - (Math.abs(dragOffset) - 50) * 0.5)}%`
                }}
                className="absolute inset-0 z-10 bg-gradient-to-br from-gray-800 to-black rounded-lg overflow-hidden"
                style={{
                  boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
                }}
              >
                <div className="w-full h-full bg-gradient-to-br from-green-500/20 to-teal-500/20 flex items-center justify-center flex-col p-8">
                  <div className="text-6xl mb-4">📱</div>
                  <div className="text-2xl font-bold text-white mb-2">
                    {websiteTemplates[currentIndex === 0 ? websiteTemplates.length - 1 : currentIndex - 1]?.title || 'Previous Template'}
                  </div>
                  <div className="text-sm text-white/70 text-center">
                    {websiteTemplates[currentIndex === 0 ? websiteTemplates.length - 1 : currentIndex - 1]?.category || 'Loading...'}
                  </div>
                  <div className="mt-4 bg-white/20 px-4 py-2 rounded-full text-xs text-white">
                    ↓ Release to continue
                  </div>
                </div>
              </motion.div>
            )}
            {/* Template Preview - Full Available Space */}
            <div className={`relative h-full w-full bg-gradient-to-br from-gray-900 to-black rounded-lg overflow-hidden shadow-2xl transition-transform duration-75 ${
              isDragging && Math.abs(dragOffset) > 30 
                ? 'transform-gpu' 
                : ''
            }`}
            style={{
              transform: isDragging && Math.abs(dragOffset) > 30 
                ? `translateY(${dragOffset * 0.1}px) rotateX(${dragOffset * -0.02}deg)` 
                : 'none',
              transformStyle: 'preserve-3d'
            }}>
              <div className="w-full h-full">
                <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 overflow-hidden rounded-lg flex items-center justify-center flex-col p-8">
                  <div className="text-8xl mb-6">📱</div>
                  <div className="text-3xl font-bold text-slate-800 mb-4 text-center">{currentTemplate.title}</div>
                  <div className="text-lg text-slate-600 text-center mb-6 max-w-2xl">{currentTemplate.description}</div>
                  
                  {/* Tech Stack Display */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 text-center">
                      <div className="text-sm text-slate-500 mb-1">Frontend</div>
                      <div className="font-semibold text-slate-800">{currentTemplate.tech.frontend}</div>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 text-center">
                      <div className="text-sm text-slate-500 mb-1">Backend</div>
                      <div className="font-semibold text-slate-800">{currentTemplate.tech.backend}</div>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 text-center">
                      <div className="text-sm text-slate-500 mb-1">Database</div>
                      <div className="font-semibold text-slate-800">{currentTemplate.tech.database}</div>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 text-center">
                      <div className="text-sm text-slate-500 mb-1">Hosting</div>
                      <div className="font-semibold text-slate-800">{currentTemplate.tech.hosting}</div>
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full font-medium">
                    {currentTemplate.category}
                  </div>
                </div>
              </div>
            </div>

            {/* Template Description - Positioned over content */}
            <div className="absolute bottom-4 left-4 right-4 text-white z-10 bg-black/40 backdrop-blur-sm rounded-lg p-4">
              <h2 className="text-lg font-bold mb-2">{currentTemplate.title}</h2>
              <p className="text-sm text-white/80 mb-2">{currentTemplate.description}</p>
              <div className="flex flex-wrap gap-1">
                {currentTemplate.tags.map((tag) => (
                  <span key={tag} className="bg-white/20 px-2 py-1 rounded text-xs">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right Sidebar */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center space-y-6">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border-2 border-white mb-1 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
            <span className="text-white font-bold text-lg">{currentTemplate.author.name.charAt(0)}</span>
          </div>
          <button className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
            <Plus size={16} className="text-white" />
          </button>
        </div>

        {/* Love/Like Avatar */}
        <div className="flex flex-col items-center space-y-1">
          <div className="group cursor-pointer">
            <img 
              src="/avatars/love-avatar.svg" 
              alt="Like"
              className="w-8 h-8 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg"
            />
          </div>
          <span className="text-white text-xs font-medium">{currentTemplate.likes}</span>
        </div>

        {/* Comment Avatar */}
        <div className="flex flex-col items-center space-y-1">
          <div className="group cursor-pointer">
            <img 
              src="/avatars/comment-avatar.svg" 
              alt="Comment"
              className="w-8 h-8 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg"
            />
          </div>
          <span className="text-white text-xs font-medium">{currentTemplate.comments}</span>
        </div>

        {/* Bookmark Avatar */}
        <div className="flex flex-col items-center space-y-1">
          <div className="group cursor-pointer">
            <img 
              src="/avatars/bookmark-avatar.svg" 
              alt="Bookmark"
              className="w-8 h-8 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg"
            />
          </div>
          <span className="text-white text-xs font-medium">บันทึก</span>
        </div>

        {/* Share Avatar */}
        <div className="flex flex-col items-center space-y-1">
          <div className="group cursor-pointer">
            <img 
              src="/avatars/share-avatar.svg" 
              alt="Share"
              className="w-8 h-8 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg"
            />
          </div>
          <span className="text-white text-xs font-medium">แชร์</span>
        </div>
      </div>

      {/* Website Architect Details Sidebar (Left to Right Swipe) */}
      <AnimatePresence>
        {showArchitectDetails && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            className="absolute left-0 top-0 bottom-0 w-96 bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-sm z-50 p-6 text-white overflow-y-auto"
          >
            <button 
              onClick={() => setShowArchitectDetails(false)}
              className="absolute top-4 right-4 text-white/60 hover:text-white text-xl"
            >
              ×
            </button>
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-3xl">
                  🏗️
                </div>
                <h3 className="text-2xl font-bold mb-2">Website Architecture</h3>
                <p className="text-white/80 text-sm">{currentTemplate.title}</p>
              </div>
              
              {/* Tech Stack Section */}
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-bold text-lg mb-4 text-blue-300">🔧 Technology Stack</h4>
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center justify-between bg-black/30 p-3 rounded">
                    <span className="text-white/80">Frontend:</span>
                    <span className="font-semibold text-green-400">{currentTemplate.tech.frontend}</span>
                  </div>
                  <div className="flex items-center justify-between bg-black/30 p-3 rounded">
                    <span className="text-white/80">Backend:</span>
                    <span className="font-semibold text-blue-400">{currentTemplate.tech.backend}</span>
                  </div>
                  <div className="flex items-center justify-between bg-black/30 p-3 rounded">
                    <span className="text-white/80">Database:</span>
                    <span className="font-semibold text-yellow-400">{currentTemplate.tech.database}</span>
                  </div>
                  <div className="flex items-center justify-between bg-black/30 p-3 rounded">
                    <span className="text-white/80">Hosting:</span>
                    <span className="font-semibold text-purple-400">{currentTemplate.tech.hosting}</span>
                  </div>
                </div>
              </div>
              
              {/* Features Section */}
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-bold text-lg mb-4 text-green-300">⚡ Key Features</h4>
                <div className="space-y-2">
                  {currentTemplate.tags.map((tag, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      <span className="capitalize text-white/90">{tag}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Architecture Pattern */}
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-bold text-lg mb-4 text-purple-300">🏛️ Architecture Pattern</h4>
                <div className="text-center">
                  <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-4 rounded-lg mb-3">
                    <div className="text-sm text-white/80 mb-2">Category</div>
                    <div className="text-xl font-bold text-white">{currentTemplate.category}</div>
                  </div>
                  <div className="text-xs text-white/60">
                    Optimized for {currentTemplate.category.toLowerCase()} applications
                  </div>
                </div>
              </div>
              
              {/* Performance Metrics */}
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-bold text-lg mb-4 text-orange-300">📊 Community Stats</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center bg-black/30 p-3 rounded">
                    <div className="text-2xl font-bold text-red-400">{currentTemplate.likes}</div>
                    <div className="text-xs text-white/60">Likes</div>
                  </div>
                  <div className="text-center bg-black/30 p-3 rounded">
                    <div className="text-2xl font-bold text-blue-400">{currentTemplate.comments}</div>
                    <div className="text-xs text-white/60">Comments</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Category Grid Sidebar (Right to Left Swipe) */}
      <AnimatePresence>
        {showCategoryGrid && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="absolute right-0 top-0 bottom-0 w-96 bg-gradient-to-bl from-gray-900/95 to-black/95 backdrop-blur-sm z-50 p-6 text-white overflow-y-auto"
          >
            <button 
              onClick={() => setShowCategoryGrid(false)}
              className="absolute top-4 right-4 text-white/60 hover:text-white text-xl z-10"
            >
              ×
            </button>
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-pink-500 to-orange-600 rounded-full flex items-center justify-center text-3xl">
                  📂
                </div>
                <h3 className="text-2xl font-bold mb-2">Browse Categories</h3>
                <p className="text-white/80 text-sm">เลือกหมวดหมู่ที่สนใจ</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {Array.from(new Set(websiteTemplates.map(t => t.category))).map((category) => {
                  const categoryTemplates = websiteTemplates.filter(t => t.category === category);
                  const isActive = currentTemplate.category === category;
                  const categoryEmojis = {
                    'E-commerce': '🛍️',
                    'Dashboard': '📊',
                    'Portfolio': '🎨',
                    'Blog': '📝',
                    'Communication': '💬',
                    'Marketing': '📢',
                    'Restaurant': '🍽️',
                    'Education': '🎓',
                    'Real Estate': '🏠',
                    'Events': '🎪',
                    'Health': '💪',
                    'Media': '📰',
                    'Travel': '✈️',
                    'Entertainment': '🎵',
                    'Finance': '💰',
                    'Web3': '🔗',
                    'SaaS': '⚙️',
                    'AI/ML': '🤖',
                    'IoT': '📱',
                    'Blockchain': '⛓️',
                    'AR/VR': '🥽',
                    'Gaming': '🎮',
                    'Healthcare': '⚕️',
                    'Green Tech': '🌱',
                    'DevOps': '🔧',
                    'FinTech': '💳',
                    'Aerospace': '🚀',
                    'Wellness': '🧘',
                    'Smart City': '🏙️',
                    'Research': '🔬',
                    'Quantum': '⚛️',
                    'Robotics': '🤖',
                    'Environmental': '🌍',
                    'Cryptocurrency': '₿',
                    'Metaverse': '🌐'
                  };
                  
                  return (
                    <button
                      key={category}
                      onClick={() => {
                        const firstTemplate = categoryTemplates[0];
                        const templateIndex = websiteTemplates.findIndex(t => t.id === firstTemplate.id);
                        setCurrentIndex(templateIndex);
                        setShowCategoryGrid(false);
                      }}
                      className={`p-4 rounded-xl transition-all transform hover:scale-105 ${
                        isActive 
                          ? 'bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg scale-105' 
                          : 'bg-white/10 hover:bg-white/20'
                      }`}
                    >
                      <div className="text-2xl mb-2">{categoryEmojis[category as keyof typeof categoryEmojis] || '📦'}</div>
                      <div className="text-sm font-semibold mb-1">{category}</div>
                      <div className="text-xs text-white/60">{categoryTemplates.length} template{categoryTemplates.length > 1 ? 's' : ''}</div>
                    </button>
                  );
                })}
              </div>
              
              {/* Current Category Info */}
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-bold text-lg mb-3 text-blue-300">📋 Current: {currentTemplate.category}</h4>
                <div className="space-y-2">
                  <div className="text-sm text-white/80">
                    📊 Total templates: {websiteTemplates.filter(t => t.category === currentTemplate.category).length}
                  </div>
                  <div className="text-sm text-white/80">
                    👥 Created by: {currentTemplate.author.name}
                  </div>
                  <div className="text-sm text-white/80">
                    💝 Community: {currentTemplate.likes} likes, {currentTemplate.comments} comments
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Menu */}
      <div className="absolute bottom-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm">
        <div className="flex items-center justify-around px-4 py-3">
          {footerTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={tab.id === 'create' ? handleCreateClick : () => setActiveFooterTab(tab.id)}
              className={`flex flex-col items-center transition-all ${
                tab.id === 'create' ? 'space-y-0' : 'space-y-1'
              } ${
                activeFooterTab === tab.id 
                  ? 'text-white scale-110' 
                  : 'text-white/60 hover:text-white/80'
              }`}
            >
              {/* Special handling for different tab types */}
              {tab.id === 'create' ? (
                // 3D Plus Icon - No text label
                <div className="group">
                  <img 
                    src="/avatars/create-3d-green-plus.svg" 
                    alt="Create"
                    className={`w-12 h-12 group-hover:scale-110 transition-all duration-300 ${
                      activeFooterTab === tab.id ? 'drop-shadow-2xl animate-pulse' : 'drop-shadow-lg'
                    } ${
                      createButtonClicked ? 'animate-spin scale-125' : ''
                    }`}
                    style={{
                      filter: createButtonClicked ? 'brightness(1.2) drop-shadow(0 0 20px rgba(34, 197, 94, 0.6))' : ''
                    }}
                  />
                </div>
              ) : tab.id === 'profile' ? (
                // Profile Avatar
                <div className="relative">
                  <div className={`w-8 h-8 rounded-full border-2 transition-all bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-content-center ${
                      activeFooterTab === tab.id 
                        ? 'border-white shadow-lg' 
                        : 'border-white/60'
                    }`}>
                    <span className="text-white text-lg">👤</span>
                  </div>
                  {activeFooterTab === tab.id && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border border-white"></div>
                  )}
                </div>
              ) : (
                // 2D Lucide React Icons for other tabs
                <tab.icon size={20} />
              )}
              
              {/* Label - hidden for create button */}
              {tab.id !== 'create' && (
                <span className="text-xs">{tab.label}</span>
              )}
            </button>
          ))}
        </div>
      </div>

    </div>
  )
}
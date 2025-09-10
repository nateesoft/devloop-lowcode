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
  const [showFullscreenModal, setShowFullscreenModal] = useState(false)
  // Removed touch horizontal tracking since we're using arrow buttons now
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
    if (isModalOpen) return // Prevent interaction when modal is open
    const touch = e.targetTouches[0]
    setDragStart(touch.clientY)
    setIsDragging(true)
    setDragOffset(0)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isModalOpen) return // Prevent interaction when modal is open
    const touch = e.targetTouches[0]
    const offsetY = touch.clientY - dragStart
    setDragOffset(offsetY)
  }

  const handleTouchEnd = () => {
    if (isModalOpen) return // Prevent interaction when modal is open
    
    // Vertical drag for template navigation only
    const threshold = 50
    const isUpDrag = dragOffset < -threshold
    const isDownDrag = dragOffset > threshold
    
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

  const isModalOpen = showArchitectDetails || showCategoryGrid || showFullscreenModal

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isModalOpen) return // Prevent interaction when modal is open
    setDragStart(e.clientY)
    setIsDragging(true)
    setDragOffset(0)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || isModalOpen) return // Prevent interaction when modal is open
    const currentY = e.clientY
    const offsetY = currentY - dragStart
    setDragOffset(offsetY)
  }

  const handleMouseUp = () => {
    if (!isDragging || isModalOpen) return // Prevent interaction when modal is open
    setIsDragging(false)
    
    const threshold = 50
    const isUpDrag = dragOffset < -threshold
    const isDownDrag = dragOffset > threshold
    
    if (isUpDrag) {
      setCurrentIndex(prevIndex => (prevIndex + 1) % websiteTemplates.length)
    } else if (isDownDrag) {
      setCurrentIndex(prevIndex => prevIndex === 0 ? websiteTemplates.length - 1 : prevIndex - 1)
    }
    
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
    <>
      <style>
        {`
          .header-menu-scroll::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
      <div 
        ref={containerRef}
        className={`relative h-screen w-full bg-black overflow-hidden select-none ${
          isModalOpen ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'
        }`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{
        // Don't disable pointer events as it would break modal interactions
        userSelect: 'none'
      }}
    >
      {/* Header Menu */}
      <div className="absolute top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm">
        <div 
          className="flex items-center px-4 py-2 overflow-x-auto header-menu-scroll"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <div className="flex items-center space-x-4 min-w-max">
            {headerTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveHeaderTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all whitespace-nowrap ${
                  activeHeaderTab === tab.id 
                    ? 'bg-white text-black shadow-md' 
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab.icon && (
                  typeof tab.icon === 'string' ? (
                    <span className="text-base">{tab.icon}</span>
                  ) : (
                    <tab.icon size={18} />
                  )
                )}
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area - Stack Card Layout */}
      <div className={`absolute top-12 bottom-20 left-4 right-20 perspective-1000 ${
        isModalOpen ? 'pointer-events-none' : 'pointer-events-auto'
      }`}>
        <div className="relative w-full h-full">
          {/* Stack of 3 cards - Background cards (static) */}
          {[2, 1, 0].map((offset, stackIndex) => {
            const templateIndex = (currentIndex + offset) % websiteTemplates.length;
            const template = websiteTemplates[templateIndex];
            const isTopCard = offset === 0;
            
            return (
              <motion.div
                key={`stack-${templateIndex}-${offset}`}
                className="absolute inset-0"
                style={{
                  zIndex: 50 - offset,
                }}
                animate={{
                  scale: isTopCard ? (isDragging ? Math.max(0.95, 1 - Math.abs(dragOffset) * 0.0005) : 1) : 0.95 - (offset * 0.02),
                  y: isTopCard ? (isDragging ? dragOffset * 0.3 : 0) : offset * 8,
                  x: isTopCard ? 0 : offset * 2,
                  rotateY: isTopCard ? (isDragging ? dragOffset * 0.05 : 0) : offset * 2,
                  rotateX: isTopCard ? (isDragging ? -dragOffset * 0.02 : 0) : 0,
                  opacity: isTopCard ? 1 : (1 - offset * 0.15)
                }}
                transition={{
                  duration: isDragging ? 0 : 0.3,
                  ease: 'easeOut'
                }}
              >
                <div 
                  className={`relative h-full w-full bg-gradient-to-br from-gray-900 to-black rounded-lg overflow-hidden shadow-2xl ${
                    isTopCard && !isModalOpen ? 'cursor-grab active:cursor-grabbing' : ''
                  }`}
                  style={{
                    filter: isTopCard 
                      ? (isDragging ? `brightness(${Math.max(0.8, 1 - Math.abs(dragOffset) * 0.001)})` : 'brightness(1)')
                      : `brightness(${0.7 - offset * 0.1})`,
                    boxShadow: isTopCard 
                      ? (isDragging ? `0 ${Math.abs(dragOffset) * 0.02}px ${Math.abs(dragOffset) * 0.04}px rgba(0,0,0,0.3)` : '0 8px 25px rgba(0,0,0,0.2)')
                      : `0 ${4 + offset * 2}px ${12 + offset * 4}px rgba(0,0,0,${0.3 + offset * 0.1})`,
                    transformStyle: 'preserve-3d'
                  }}
                >
                  {/* Card Content */}
                  <div className="w-full h-full">
                    <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 overflow-hidden rounded-lg flex items-center justify-center flex-col p-8">
                      <div className="text-8xl mb-6">📱</div>
                      <div className="text-3xl font-bold text-slate-800 mb-4 text-center">{template.title}</div>
                      <div className="text-lg text-slate-600 text-center mb-6 max-w-2xl">{template.description}</div>
                      
                      {/* Tech Stack Display */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 text-center">
                          <div className="text-sm text-slate-500 mb-1">Frontend</div>
                          <div className="font-semibold text-slate-800">{template.tech.frontend}</div>
                        </div>
                        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 text-center">
                          <div className="text-sm text-slate-500 mb-1">Backend</div>
                          <div className="font-semibold text-slate-800">{template.tech.backend}</div>
                        </div>
                        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 text-center">
                          <div className="text-sm text-slate-500 mb-1">Database</div>
                          <div className="font-semibold text-slate-800">{template.tech.database}</div>
                        </div>
                        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 text-center">
                          <div className="text-sm text-slate-500 mb-1">Hosting</div>
                          <div className="font-semibold text-slate-800">{template.tech.hosting}</div>
                        </div>
                      </div>

                      {/* Category Badge */}
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full font-medium">
                        {template.category}
                      </div>
                    </div>
                  </div>
                  
                  {/* Template Description Overlay (only for top card) */}
                  {isTopCard && (
                    <div className="absolute bottom-4 left-4 right-4 text-white z-10 bg-black/40 backdrop-blur-sm rounded-lg p-4">
                      <h2 className="text-lg font-bold mb-2">{template.title}</h2>
                      <p className="text-sm text-white/80 mb-2">{template.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {template.tags.map((tag) => (
                          <span key={tag} className="bg-white/20 px-2 py-1 rounded text-xs">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Green Play Button - On Content */}
      {!isModalOpen && (
        <div className="absolute top-12 bottom-20 left-4 right-20">
          <div className="relative w-full h-full">
            <button
              onClick={() => setShowFullscreenModal(true)}
              className="absolute top-6 right-6 z-[110] p-4 transition-all duration-300 hover:scale-125 active:scale-110"
            >
              {/* Green Play Icon */}
              <svg 
                width="32" 
                height="32" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="transition-all duration-300"
                style={{
                  filter: 'drop-shadow(0 4px 16px rgba(34, 197, 94, 0.5))'
                }}
              >
                {/* Green Play Icon with gradient */}
                <defs>
                  <linearGradient id="playGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#22c55e" />
                    <stop offset="100%" stopColor="#16a34a" />
                  </linearGradient>
                </defs>
                {/* Play triangle with background circle */}
                <circle cx="12" cy="12" r="11" stroke="url(#playGradient)" strokeWidth="2" fill="rgba(34, 197, 94, 0.1)"/>
                <path d="M10 8v8l6-4z" fill="url(#playGradient)"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Left Button for Website Architecture */}
      {!isModalOpen && (
        <button
          onClick={() => {
            setShowArchitectDetails(true)
            setShowCategoryGrid(false)
          }}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-[100] p-3 transition-all duration-300 hover:scale-125 active:scale-110"
        >
          {/* Stack Icon - Server Stack Style */}
          <svg 
            width="28" 
            height="28" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="transition-all duration-300"
            style={{
              filter: 'drop-shadow(0 4px 12px rgba(59, 130, 246, 0.3))'
            }}
          >
            {/* Server Stack Icon with gradient */}
            <defs>
              <linearGradient id="stackGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
            
            {/* Bottom Server */}
            <rect x="4" y="17" width="16" height="4" rx="1" stroke="url(#stackGradient)" strokeWidth="2" fill="rgba(96, 165, 250, 0.1)"/>
            <circle cx="7" cy="19" r="0.8" fill="url(#stackGradient)"/>
            <circle cx="9.5" cy="19" r="0.8" fill="url(#stackGradient)"/>
            <rect x="12" y="18.5" width="6" height="1" rx="0.5" stroke="url(#stackGradient)" strokeWidth="1" fill="none"/>
            
            {/* Middle Server */}
            <rect x="4" y="11" width="16" height="4" rx="1" stroke="url(#stackGradient)" strokeWidth="2" fill="rgba(96, 165, 250, 0.15)"/>
            <circle cx="7" cy="13" r="0.8" fill="url(#stackGradient)"/>
            <circle cx="9.5" cy="13" r="0.8" fill="url(#stackGradient)"/>
            <rect x="12" y="12.5" width="6" height="1" rx="0.5" stroke="url(#stackGradient)" strokeWidth="1" fill="none"/>
            
            {/* Top Server */}
            <rect x="4" y="5" width="16" height="4" rx="1" stroke="url(#stackGradient)" strokeWidth="2" fill="rgba(96, 165, 250, 0.2)"/>
            <circle cx="7" cy="7" r="0.8" fill="url(#stackGradient)"/>
            <circle cx="9.5" cy="7" r="0.8" fill="url(#stackGradient)"/>
            <rect x="12" y="6.5" width="6" height="1" rx="0.5" stroke="url(#stackGradient)" strokeWidth="1" fill="none"/>
          </svg>
        </button>
      )}

      {/* Right Button for Categories */}
      {!isModalOpen && (
        <button
          onClick={() => {
            setShowCategoryGrid(true)
            setShowArchitectDetails(false)
          }}
          className="absolute right-28 top-1/2 -translate-y-1/2 z-[100] p-3 transition-all duration-300 hover:scale-125 active:scale-110"
        >
          {/* Category Grid Icon */}
          <svg 
            width="28" 
            height="28" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="transition-all duration-300"
            style={{
              filter: 'drop-shadow(0 4px 12px rgba(168, 85, 247, 0.3))'
            }}
          >
            {/* Grid/Category Icon with gradient */}
            <defs>
              <linearGradient id="categoryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            <rect x="3" y="3" width="7" height="7" rx="2" stroke="url(#categoryGradient)" strokeWidth="2.5" fill="none"/>
            <rect x="14" y="3" width="7" height="7" rx="2" stroke="url(#categoryGradient)" strokeWidth="2.5" fill="none"/>
            <rect x="14" y="14" width="7" height="7" rx="2" stroke="url(#categoryGradient)" strokeWidth="2.5" fill="none"/>
            <rect x="3" y="14" width="7" height="7" rx="2" stroke="url(#categoryGradient)" strokeWidth="2.5" fill="none"/>
          </svg>
        </button>
      )}

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
            className="absolute left-0 top-0 bottom-0 w-96 bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-sm z-50 p-6 text-white overflow-y-auto pointer-events-auto"
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
            className="absolute right-0 top-0 bottom-0 w-96 bg-gradient-to-bl from-gray-900/95 to-black/95 backdrop-blur-sm z-50 p-6 text-white overflow-y-auto pointer-events-auto"
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

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {showFullscreenModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black flex items-center justify-center"
          >
            {/* Close Button */}
            <button 
              onClick={() => setShowFullscreenModal(false)}
              className="absolute top-6 right-6 z-[210] bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Fullscreen Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full h-full max-w-7xl mx-auto p-8 flex flex-col"
            >
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-white mb-4">{currentTemplate.title}</h1>
                <p className="text-xl text-white/80 mb-6">{currentTemplate.description}</p>
                <div className="flex justify-center space-x-4">
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full font-medium">
                    {currentTemplate.category}
                  </span>
                  <span className="bg-white/20 text-white px-4 py-2 rounded-full font-medium">
                    {currentTemplate.likes} likes
                  </span>
                  <span className="bg-white/20 text-white px-4 py-2 rounded-full font-medium">
                    {currentTemplate.comments} comments
                  </span>
                </div>
              </div>

              {/* Interactive Content Area */}
              <div className="flex-1 bg-white rounded-2xl overflow-hidden shadow-2xl">
                {currentTemplate.htmlContent ? (
                  <iframe
                    srcDoc={currentTemplate.htmlContent}
                    className="w-full h-full border-none"
                    title={currentTemplate.title}
                    sandbox="allow-scripts allow-same-origin"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center flex-col p-12">
                    <div className="text-8xl mb-8">📱</div>
                    <div className="text-4xl font-bold text-slate-800 mb-6 text-center">{currentTemplate.title}</div>
                    <div className="text-xl text-slate-600 text-center mb-8 max-w-3xl">{currentTemplate.description}</div>
                    
                    {/* Tech Stack Display - Larger for fullscreen */}
                    <div className="grid grid-cols-2 gap-6 mb-8 max-w-2xl">
                      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center">
                        <div className="text-lg text-slate-500 mb-2">Frontend</div>
                        <div className="text-2xl font-bold text-slate-800">{currentTemplate.tech.frontend}</div>
                      </div>
                      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center">
                        <div className="text-lg text-slate-500 mb-2">Backend</div>
                        <div className="text-2xl font-bold text-slate-800">{currentTemplate.tech.backend}</div>
                      </div>
                      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center">
                        <div className="text-lg text-slate-500 mb-2">Database</div>
                        <div className="text-2xl font-bold text-slate-800">{currentTemplate.tech.database}</div>
                      </div>
                      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center">
                        <div className="text-lg text-slate-500 mb-2">Hosting</div>
                        <div className="text-2xl font-bold text-slate-800">{currentTemplate.tech.hosting}</div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-4">
                      <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all duration-300">
                        🚀 Deploy Now
                      </button>
                      <button className="bg-white/80 backdrop-blur-sm text-slate-800 px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all duration-300">
                        🔧 Customize
                      </button>
                      <button className="bg-white/80 backdrop-blur-sm text-slate-800 px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all duration-300">
                        💾 Save Template
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      </div>
    </>
  )
}
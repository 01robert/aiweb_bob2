import ChatInterface from '@/components/chat/ChatInterface'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* 顶部导航栏 */}
      <nav className="border-b bg-white/80 backdrop-blur-sm fixed w-full top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-xl font-medium">AI Chat</span>
          </div>
        </div>
      </nav>

      {/* 主要聊天界面 */}
      <main className="pt-16">
        <ChatInterface />
      </main>
    </div>
  )
} 
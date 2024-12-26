'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Message } from '@/services/deepseek'
import { chatWithDeepSeek } from '@/services/deepseek'
import { saveChat, getChatById, updateChat } from '@/services/chat'
import { formatMessage } from '@/utils/formatMessage'
import ChatHistoryList from './ChatHistoryList'
import { ChatHistory } from '@/types/chat'

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [currentChatId, setCurrentChatId] = useState<string | null>(null)
  const { user } = useAuth()

  const handleSelectChat = async (chat: ChatHistory) => {
    if (chat.id === 'new') {
      setMessages([])
      setCurrentChatId(null)
    } else {
      const chatData = await getChatById(chat.id)
      if (chatData) {
        setMessages(chatData.messages)
        setCurrentChatId(chat.id)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading || !user) return

    const userMessage: Message = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const aiResponse = await chatWithDeepSeek([...messages, userMessage])
      const newMessages = [...messages, userMessage, aiResponse]
      setMessages(newMessages)

      try {
        if (currentChatId) {
          await updateChat(currentChatId, newMessages)
        } else {
          const newChatId = await saveChat(user.uid, newMessages)
          setCurrentChatId(newChatId)
        }
      } catch (error) {
        console.error('Failed to save chat:', error)
        alert('保存聊天记录失败，请稍后重试')
      }
    } catch (error) {
      console.error('Failed to get AI response:', error)
      setMessages(prev => prev.slice(0, -1))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-screen">
      {/* 侧边栏 - 聊天历史 */}
      <div className="w-80 border-r bg-white overflow-y-auto">
        <ChatHistoryList
          onSelectChat={handleSelectChat}
          selectedChatId={currentChatId || undefined}
        />
      </div>

      {/* 主聊天区域 */}
      <div className="flex-1 flex flex-col">
        {/* 消息列表 */}
        <div className="flex-1 overflow-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <svg className="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <p className="text-xl font-medium">开始一段新的对话</p>
              <p className="mt-2">AI 助手随时准备为您服务</p>
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    message.role === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100'
                  }`}
                >
                  {message.role === 'assistant' ? (
                    <div 
                      className="prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ 
                        __html: formatMessage(message.content) 
                      }}
                    />
                  ) : (
                    message.content
                  )}
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-2xl px-4 py-2">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 输入框 */}
        <form onSubmit={handleSubmit} className="p-4 border-t">
          <div className="flex gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="输入您的问题..."
              disabled={isLoading}
              className="flex-1 px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors disabled:bg-blue-300"
            >
              发送
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

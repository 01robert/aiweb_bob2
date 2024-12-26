'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { getChatHistory, deleteChat } from '@/services/chat'
import { ChatHistory } from '@/types/chat'

interface ChatHistoryListProps {
  onSelectChat: (chat: ChatHistory) => void
  selectedChatId?: string
}

export default function ChatHistoryList({ onSelectChat, selectedChatId }: ChatHistoryListProps) {
  const [chats, setChats] = useState<ChatHistory[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    loadChats()
  }, [user])

  const loadChats = async () => {
    if (!user) return
    try {
      setLoading(true)
      const history = await getChatHistory(user.uid)
      setChats(history)
    } catch (error) {
      console.error('Failed to load chat history:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteChat = async (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (!confirm('确定要删除这个对话吗？')) return
    
    try {
      await deleteChat(chatId)
      setChats(chats.filter(chat => chat.id !== chatId))
    } catch (error) {
      console.error('Failed to delete chat:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-2 p-4">
      <button
        onClick={() => onSelectChat({ id: 'new', userId: user!.uid, messages: [], timestamp: '', title: '新对话', lastMessage: '' })}
        className="w-full px-4 py-2 text-left rounded-lg hover:bg-gray-100 flex items-center space-x-2"
      >
        <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        <span>新对话</span>
      </button>

      {chats.map(chat => (
        <div
          key={chat.id}
          onClick={() => onSelectChat(chat)}
          className={`p-4 rounded-lg cursor-pointer ${
            selectedChatId === chat.id ? 'bg-blue-50' : 'hover:bg-gray-50'
          }`}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-gray-900 truncate">
                {chat.title}
              </h3>
              <p className="text-sm text-gray-500 truncate">
                {chat.lastMessage}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(chat.timestamp).toLocaleString()}
              </p>
            </div>
            <button
              onClick={(e) => handleDeleteChat(chat.id, e)}
              className="ml-2 p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
} 
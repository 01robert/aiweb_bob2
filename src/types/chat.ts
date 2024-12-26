import { Message } from '@/services/deepseek'

export interface ChatHistory {
  id: string
  userId: string
  title: string
  messages: Message[]
  timestamp: string
  lastMessage: string
} 
import { db } from '@/config/firebase'
import { 
  collection, 
  addDoc,
  query, 
  where, 
  orderBy, 
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore'
import { Message } from './deepseek'
import { ChatHistory } from '@/types/chat'

// 生成对话标题
function generateTitle(messages: Message[]): string {
  const firstUserMessage = messages.find(m => m.role === 'user')
  if (firstUserMessage) {
    const title = firstUserMessage.content.slice(0, 30)
    return title.length < firstUserMessage.content.length ? `${title}...` : title
  }
  return '新对话'
}

// 保存新对话
export async function saveChat(userId: string, messages: Message[]) {
  try {
    const title = generateTitle(messages)
    const lastMessage = messages[messages.length - 1].content.slice(0, 50)
    
    const chatData = {
      userId,
      title,
      messages,
      lastMessage: lastMessage + (lastMessage.length >= 50 ? '...' : ''),
      timestamp: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    const docRef = await addDoc(collection(db, 'chats'), chatData)
    return docRef.id
  } catch (error) {
    console.error('Error saving chat:', error)
    throw error
  }
}

// 获取用户的所有对话历史
export async function getChatHistory(userId: string): Promise<ChatHistory[]> {
  try {
    const q = query(
      collection(db, 'chats'),
      where('userId', '==', userId),
      orderBy('timestamp', 'desc')
    )
    
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as ChatHistory[]
  } catch (error) {
    console.error('Error getting chat history:', error)
    throw error
  }
}

// 获取单个对话详情
export async function getChatById(chatId: string): Promise<ChatHistory | null> {
  try {
    const docRef = doc(db, 'chats', chatId)
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as ChatHistory
    }
    return null
  } catch (error) {
    console.error('Error getting chat:', error)
    throw error
  }
}

// 更新对话内容
export async function updateChat(chatId: string, messages: Message[]) {
  try {
    const lastMessage = messages[messages.length - 1].content.slice(0, 50)
    const docRef = doc(db, 'chats', chatId)
    
    await updateDoc(docRef, {
      messages,
      lastMessage: lastMessage + (lastMessage.length >= 50 ? '...' : ''),
      timestamp: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error updating chat:', error)
    throw error
  }
}

// 删除对话
export async function deleteChat(chatId: string) {
  try {
    const docRef = doc(db, 'chats', chatId)
    await deleteDoc(docRef)
  } catch (error) {
    console.error('Error deleting chat:', error)
    throw error
  }
} 
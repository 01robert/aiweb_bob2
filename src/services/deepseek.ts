'use server'

const DEEPSEEK_API_KEY = 'sk-93df5f06f19a4d868527abfd5f9d7f47'
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions'

// 添加系统提示词，指导 AI 如何回答
const SYSTEM_PROMPT = `你是一位友善的学习助手，主要帮助小学生学习和解决问题。请遵循以下原则：

1. 使用简单易懂的语言，避免专业术语
2. 多用比喻和生活中的例子来解释
3. 不直接给出答案，而是通过提问引导学生思考
4. 鼓励学生独立思考和探索
5. 在回答中加入适当的表情，让对话更生动有趣
6. 对学生的努力给予积极的鼓励
7. 如果遇到复杂问题，把它分解成更小的、容易理解的部分
8. 适时使用"让我们一起想想看"、"你觉得呢？"等互动性的语言

记住：目标是培养学生的学习兴趣和思考能力，而不是简单地提供答案。`

export type Message = {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export async function chatWithDeepSeek(messages: Message[]) {
  try {
    // 在每次对话开始时添加系统提示
    const fullMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages
    ]

    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: fullMessages,
        temperature: 0.7, // 增加一些创造性，使回答更生动
        max_tokens: 1000  // 允许较长的回答，以便更好地解释
      })
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`)
    }

    const data = await response.json()
    return data.choices[0].message
  } catch (error) {
    console.error('Error calling DeepSeek API:', error)
    throw error
  }
} 
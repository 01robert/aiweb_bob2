'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'

export default function RegisterForm({ onSwitch }: { onSwitch: () => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signUp } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (password !== confirmPassword) {
        setError('两次输入的密码不一致')
        return
      }

      if (password.length < 6) {
        setError('密码长度至少为6位')
        return
      }

      console.log('开始注册...')
      await signUp(email, password)
      console.log('注册成功！')
      
    } catch (error: any) {
      console.error('注册错误:', error)
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError('该邮箱已被注册')
          break
        case 'auth/invalid-email':
          setError('邮箱格式不正确')
          break
        case 'auth/operation-not-allowed':
          setError('邮箱/密码注册未启用，请联系管理员')
          break
        case 'auth/weak-password':
          setError('密码强度太弱，请使用更复杂的密码')
          break
        default:
          setError(`注册失败: ${error.message}`)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">注册账号</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="text-red-500 text-center text-sm">{error}</div>
          )}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="电子邮箱"
              />
            </div>
            <div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="密码（至少6位）"
              />
            </div>
            <div>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="确认密码"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              {loading ? '注册中...' : '注册'}
            </button>
          </div>
          
          <div className="text-center">
            <button
              type="button"
              onClick={onSwitch}
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              已有账号？点击登录
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 
'use client'

import { useState } from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)

  return isLogin ? (
    <LoginForm onSwitch={() => setIsLogin(false)} />
  ) : (
    <RegisterForm onSwitch={() => setIsLogin(true)} />
  )
} 
import { LoginFormClient as LoginForm } from "@/components/login-form.client"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center px-4">
      <LoginForm />
    </div>
  )
}
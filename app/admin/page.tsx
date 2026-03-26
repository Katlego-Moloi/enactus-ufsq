"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login, isAuthenticated } = useAuth()
  const router = useRouter()

  // Redirect if already authenticated
  if (isAuthenticated) {
    router.push("/admin/dashboard")
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simulate async login
    await new Promise((resolve) => setTimeout(resolve, 500))

    const success = login(email, password)
    if (success) {
      router.push("/admin/dashboard")
    } else {
      setError("Invalid email or password")
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="flex items-center gap-2">
              <svg
                viewBox="0 0 40 40"
                className="w-12 h-12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20 5L35 20L20 35L5 20L20 5Z" fill="#F5A800" />
                <path
                  d="M20 10L30 20L20 30L10 20L20 10Z"
                  fill="#F5A800"
                  stroke="white"
                  strokeWidth="1"
                />
              </svg>
              <span className="text-2xl font-bold text-[#333]">
                enactus<span className="text-[#F5A800]">.</span>
              </span>
            </div>
          </div>
          <CardTitle className="text-xl">Admin Login</CardTitle>
          <CardDescription>
            Sign in to manage the Enactus UFSQ website
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@enactusufsq.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Field>

              <Button
                type="submit"
                className="w-full bg-[#F5A800] hover:bg-[#E09800] text-white"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </FieldGroup>
          </form>

          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-sm text-[#F5A800] hover:text-[#E09800] transition-colors"
            >
              &larr; Back to website
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

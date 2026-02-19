"use client"

import { Loading } from "@/components/auth/loading"
import { ClerkProvider, SignIn, useAuth } from "@clerk/nextjs"
import {
  Authenticated,
  AuthLoading,
  ConvexReactClient,
  Unauthenticated
} from "convex/react"
import { ConvexProviderWithClerk } from "convex/react-clerk"

interface ConvexClientProviderProps {
  children: React.ReactNode
}

const convex = new ConvexReactClient(
  process.env.NEXT_PUBLIC_CONVEX_URL!
)

export const ConvexClientProvider = ({ children }: ConvexClientProviderProps) => {
  return (
    <ClerkProvider>
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        
        <AuthLoading>
          <Loading />
        </AuthLoading>

        <Authenticated>
          {children}
        </Authenticated>

        <Unauthenticated>
          <div className="min-h-screen flex items-center justify-center">
            <SignIn />
          </div>
        </Unauthenticated>

      </ConvexProviderWithClerk>
    </ClerkProvider>
  )
}

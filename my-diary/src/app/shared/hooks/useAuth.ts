import { useEffect, useState } from 'react'
import { authService } from '../../features/auth/services/auth.service'
import { storageService } from '../../features/auth/services/storage.service'
import type { UserResponse } from '../../features/auth/models/user.response'

export function useAuth() {
  const [user, setUser] = useState<UserResponse | null>(storageService.getUser())

  useEffect(() => {
    setUser(storageService.getUser())
  }, [])

  return {
    user,
    isAuthenticated: Boolean(storageService.getToken()),
    logout: authService.logout,
    refresh: () => setUser(storageService.getUser()),
  }
}

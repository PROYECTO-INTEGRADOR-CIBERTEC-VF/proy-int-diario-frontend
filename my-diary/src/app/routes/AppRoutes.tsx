import { AuthGuard } from '../core/guards/AuthGuard'
import { MainLayout } from '../layouts/MainLayout'
import { AuthLayout } from '../layouts/AuthLayout'
import { WelcomePage } from '../features/home/pages/WelcomePage'
import { DashboardPage } from '../features/dashboard/pages/DashboardPage'
import { LoginPage } from '../features/auth/pages/LoginPage'
import { RegisterPage } from '../features/auth/pages/RegisterPage'
import { ForgotPasswordPage } from '../features/auth/pages/ForgotPasswordPage'
import { DiaryListPage } from '../features/diary/pages/DiaryListPage'
import { DiaryCreatePage } from '../features/diary/pages/DiaryCreatePage'
import { DiaryEditPage } from '../features/diary/pages/DiaryEditPage'
import { DiaryDetailPage } from '../features/diary/pages/DiaryDetailPage'
import { ProfilePage } from '../features/profile/pages/ProfilePage'

function getPath() {
  return window.location.pathname || '/'
}

export function AppRoutes() {
  const path = getPath()

  if (path === '/') {
    return (
      <MainLayout>
        <WelcomePage />
      </MainLayout>
    )
  }

  if (path === '/login') {
    return (
      <AuthLayout>
        <LoginPage />
      </AuthLayout>
    )
  }

  if (path === '/register') {
    return (
      <AuthLayout>
        <RegisterPage />
      </AuthLayout>
    )
  }

  if (path === '/forgot-password') {
    return (
      <AuthLayout>
        <ForgotPasswordPage />
      </AuthLayout>
    )
  }

  return (
    <MainLayout>
      <AuthGuard>
        {path === '/dashboard' ? (
          <DashboardPage />
        ) : path === '/diary' ? (
          <DiaryListPage />
        ) : path === '/diary/create' ? (
          <DiaryCreatePage />
        ) : path === '/diary/edit' ? (
          <DiaryEditPage />
        ) : path === '/diary/detail' ? (
          <DiaryDetailPage />
        ) : path === '/profile' ? (
          <ProfilePage />
        ) : (
          <DashboardPage />
        )}
      </AuthGuard>
    </MainLayout>
  )
}

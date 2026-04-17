import { authService } from '../../features/auth/services/auth.service'
import { storageService } from '../../features/auth/services/storage.service'
import { UiIcon } from './UiIcon'

type NavbarProps = {
  title?: string
}

const navItems = [
  { label: 'Home', href: '/', icon: 'home' as const },
  { label: 'Dashboard', href: '/dashboard', icon: 'dashboard' as const },
  { label: 'Notas', href: '/diary', icon: 'diary' as const },
  { label: 'Perfil', href: '/profile', icon: 'profile' as const },
]

export function Navbar({ title = 'Mi Diario' }: NavbarProps) {
  const user = storageService.getUser()
  const currentPath = window.location.pathname

  const handleLogout = () => {
    authService.logout()
    window.location.href = '/login'
  }

  return (
    <header className="navbar">
      <a className="brand" href="/">
        <span className="brand__logo">
          <UiIcon name="logo" />
        </span>
        <span>
          <strong>{title}</strong>
          <small>Notas, clima, moneda y más</small>
        </span>
      </a>

      <nav className="navbar__links" aria-label="Principal">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={`nav-link ${currentPath === item.href ? 'nav-link--active' : ''}`}
            aria-current={currentPath === item.href ? 'page' : undefined}
          >
            <UiIcon name={item.icon} />
            {item.label}
          </a>
        ))}
      </nav>

      <div className="navbar__actions">
        {user ? (
          <>
            <div className="user-chip">
              <UiIcon name="profile" />
              <span>
                {user.firstName} {user.lastName}
              </span>
            </div>
            <button type="button" className="ghost-button" onClick={handleLogout}>
              <UiIcon name="logout" />
              Logout
            </button>
          </>
        ) : null}
      </div>
    </header>
  )
}

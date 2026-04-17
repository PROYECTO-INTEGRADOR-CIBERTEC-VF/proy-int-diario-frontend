import { storageService } from '../../auth/services/storage.service'
import { UiIcon } from '../../../shared/components/UiIcon'

export function ProfilePage() {
  const user = storageService.getUser()

  return (
    <section className="page page--profile">
      <div className="flex items-center gap-6 p-8 bg-white border border-gray-200 rounded-lg mb-8">
        <div className="w-20 h-20 rounded-full bg-[#6c8efc] flex items-center justify-center text-2xl font-bold text-white shrink-0">
          {user ? `${user.firstName?.[0]}${user.lastName?.[0]}` : 'MD'}
        </div>
        <div>
          <span className="text-sm text-gray-500">Perfil del usuario</span>
          <h1 className="mt-1 text-2xl font-bold">{user ? `${user.firstName} ${user.lastName}` : 'Usuario'}</h1>
          <p className="mt-2 text-gray-500">{user?.email ?? ''}</p>
          <div className="flex gap-2 mt-3 flex-wrap">
        {(user?.roles ?? ['ROLE_USER']).map((role) => (
          <span 
            key={role} 
            className={`px-3 py-1 rounded-full text-sm font-medium ${
          role === 'ROLE_ADMIN' 
            ? 'bg-amber-100 text-amber-900' 
            : 'bg-blue-100 text-blue-900'
            }`}
          >
            {role === 'ROLE_USER' ? 'Usuario' : 'Administrador'}
          </span>
        ))}
          </div>
        </div>
      </div>

      <div className="content-grid content-grid--profile">
        <article className="panel">
          <div className="panel__header">
            <h2>Datos básicos</h2>
            <UiIcon name="profile" />
          </div>
          <dl className="details-grid">
            <div><dt>Username</dt><dd>{user?.username ?? 'martin.diary'}</dd></div>
            <div><dt>Email</dt><dd>{user?.email ?? 'demo@my-diary.com'}</dd></div>
            <div><dt>Estado</dt><dd>{user?.enabled === false ? 'Deshabilitado' : 'Activo'}</dd></div>
            <div><dt>Roles</dt><dd>{(user?.roles ?? ['ROLE_USER']).map(role => role === 'ROLE_USER' ? 'Usuario' : 'Administrador').join(', ')}</dd></div>
          </dl>
        </article>
        <article className="panel">
          <div className="panel__header">
            <h2>Estadísticas</h2>
            <UiIcon name="stats" />
          </div>
          <div className='flex' style={{ gap: '1rem', alignItems: 'center', padding: '1rem' }}>
            <div className='bg-[#6c8efc] rounded-sm p-4'>
              <UiIcon name="diary" />
            </div>
            <div>
              <div className="eyebrow">Notas Creadas</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>23</div>
            </div>
          </div>
          <div className='flex' style={{ gap: '1rem', alignItems: 'center', padding: '1rem', borderTop: '1px solid #e0e0e0' }}>
            <div className='bg-[#6c8efc] rounded-sm p-4'>
              <UiIcon name="calendar" />
            </div>
            <div>
              <div className="eyebrow">Último acceso</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>24/06/2024 14:35</div>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}

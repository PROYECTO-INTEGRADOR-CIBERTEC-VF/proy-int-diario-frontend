import { type FormEvent, useState } from 'react'
import { authService } from '../services/auth.service'
import { UiIcon } from '../../../shared/components/UiIcon'

export function RegisterPage() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      await authService.register({ username, email, password, firstName, lastName })
      window.location.href = '/login'
    } catch (registerError) {
      setError(registerError instanceof Error ? registerError.message : 'No se pudo registrar el usuario')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="grid gap-8 lg:grid-cols-[0.95fr_1fr] lg:items-center">
      <div className="relative order-2 lg:order-1">
        <div className="absolute -inset-6 rounded-[34px] bg-[radial-gradient(circle_at_top,rgba(244,143,177,0.20),transparent_58%)] blur-2xl" />
        <form className="relative overflow-hidden rounded-4xl border border-white/70 bg-white/92 p-6 shadow-[0_28px_70px_rgba(70,90,160,0.18)] backdrop-blur-xl sm:p-8" onSubmit={handleSubmit}>
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#d25b8a]">Registro</p>
              <h2 className="mt-1 text-2xl font-semibold text-[#1f2140]">Crea tu cuenta</h2>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="sm:col-span-2 block text-sm font-medium text-[#374151]">
              Username
              <div className="mt-2 flex items-center gap-3 rounded-2xl border border-[rgba(90,101,160,0.16)] bg-[#fffafc] px-4 py-3 focus-within:border-[#f48fb1]">
                <UiIcon name="profile" />
                <input value={username} onChange={(event) => setUsername(event.target.value)} type="text" placeholder="Nombre de usuario" className="w-full bg-transparent outline-none placeholder:text-[#9aa3b2]" />
              </div>
            </label>

            <label className="sm:col-span-2 block text-sm font-medium text-[#374151]">
              Email
              <div className="mt-2 flex items-center gap-3 rounded-2xl border border-[rgba(90,101,160,0.16)] bg-[#fffafc] px-4 py-3 focus-within:border-[#f48fb1]">
                <UiIcon name="mail" />
                <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="correo electrónico" className="w-full bg-transparent outline-none placeholder:text-[#9aa3b2]" />
              </div>
            </label>

            <label className="sm:col-span-2 block text-sm font-medium text-[#374151]">
              Contraseña
              <div className="mt-2 flex items-center gap-3 rounded-2xl border border-[rgba(90,101,160,0.16)] bg-[#fffafc] px-4 py-3 focus-within:border-[#f48fb1]">
                <UiIcon name="lock" />
                <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Mínimo 8 caracteres" className="w-full bg-transparent outline-none placeholder:text-[#9aa3b2]" />
              </div>
            </label>

            <label className="block text-sm font-medium text-[#374151]">
              Nombre
              <div className="mt-2 flex items-center gap-3 rounded-2xl border border-[rgba(90,101,160,0.16)] bg-[#fffafc] px-4 py-3 focus-within:border-[#f48fb1]">
                <UiIcon name="profile" />
                <input value={firstName} onChange={(event) => setFirstName(event.target.value)} type="text" placeholder="Nombre" className="w-full bg-transparent outline-none placeholder:text-[#9aa3b2]" />
              </div>
            </label>

            <label className="block text-sm font-medium text-[#374151]">
              Apellido
              <div className="mt-2 flex items-center gap-3 rounded-2xl border border-[rgba(90,101,160,0.16)] bg-[#fffafc] px-4 py-3 focus-within:border-[#f48fb1]">
                <UiIcon name="profile" />
                <input value={lastName} onChange={(event) => setLastName(event.target.value)} type="text" placeholder="Apellido" className="w-full bg-transparent outline-none placeholder:text-[#9aa3b2]" />
              </div>
            </label>
          </div>

          {error ? <p className="mt-4 rounded-2xl bg-[#fff2f6] px-4 py-3 text-sm font-medium text-[#be3460]">{error}</p> : null}

          <button type="submit" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#d25b8a] px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#d25b8a33] transition hover:-translate-y-0.5 hover:bg-[#c24f7f] disabled:cursor-not-allowed disabled:opacity-70" disabled={loading}>
            <UiIcon name="register" />
            {loading ? 'Creando...' : 'Crear cuenta'}
          </button>

          <div className="mt-5 text-center text-sm">
            <a className="font-medium text-[#4566d9] transition hover:text-[#3656c7]" href="/login">
              Ya tengo cuenta, iniciar sesión
            </a>
          </div>
        </form>
      </div>

      <div className="order-1 space-y-6 text-white/95 lg:order-2">

        <div className="space-y-4">
          <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Regístrate y empieza a construir tu historial de notas
          </h1>
        </div>
      </div>
    </section>
  )
}

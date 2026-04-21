import { useEffect, useState } from 'react'
import { UiIcon } from '../../../shared/components/UiIcon'
import { handleError } from '../../../core/interceptors/error.interceptor'
import type { DiaryResponse } from '../../diary/models/diary.response'
import { diaryService } from '../../diary/services/diary.service'
import { formatDate } from '../../../shared/utils/date.util'
import { WeatherWidget } from '../../weather/components/WeatherWidget'

export function DashboardPage() {
  const [entries, setEntries] = useState<DiaryResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadEntries = async () => {
      try {
        const response = await diaryService.listAll()
        setEntries(response.slice(0, 4))
      } catch (listError) {
        setError(handleError(listError))
      } finally {
        setLoading(false)
      }
    }

    void loadEntries()
  }, [])

  return (
    <section className="page page--dashboard">
      <div>
        <div className="content-grid">
          <article className="panel panel--notes panel-historial-reciente">
            <h1>Bienvenido</h1>
            <div className="panel__header">
              <div>
                <span className="eyebrow">Mis notas</span>
                <h2 className='font-semibold'>Historial reciente</h2>
              </div>
              <a className="button button--ghost" href="/diary">
                <UiIcon name="history" />
                Ver todo
              </a>
            </div>
            <div className="note-list">
              {loading ? <div className="panel panel--status">Cargando notas...</div> : null}
              {error ? <div className="panel panel--status panel--error">{error}</div> : null}
              {entries.map((entry) => (
                <article key={entry.title} className="note-item">
                  <div>
                    <h3>{entry.title}</h3>
                    <p>{entry.content}</p>
                    <small>{formatDate(entry.createdAt)}</small>
                  </div>
                </article>
              ))}
            </div>
            <div>
              <img className='object-cover' src='/image.png' />
            </div>
          </article>
          <aside className='space-y-6'>
            <WeatherWidget />
            <div className='p-6 bg-white rounded-lg border border-gray-200'>
              <div className='flex items-center gap-4 mb-4'>
                <span className='card-list__icon'>
                  <UiIcon name="currency" />
                </span>
                <span className="text-lg font-semibold text-gray-500 uppercase tracking-wide">Convertidor de Moneda</span>
              </div>
              <form className="mt-4 space-y-4">
                <div className="space-y-2">
                  <label htmlFor="from-currency" className="block text-sm font-medium text-gray-700">De:</label>
                  <select id="from-currency" defaultValue="PEN" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="PEN">PEN (Soles)</option>
                    <option value="USD">USD (Dólares)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="to-currency" className="block text-sm font-medium text-gray-700">A:</label>
                  <select id="to-currency" defaultValue="USD" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="PEN">PEN (Soles)</option>
                    <option value="USD">USD (Dólares)</option>
                  </select>
                </div>
                <input type="number" placeholder="Monto" min="0" step="0.01" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button type="button" className="w-full px-4 py-2 bg-[#4566d9] text-white font-medium rounded-md hover:bg-[#3656c7] transition-colors">
                  Calcular
                </button>
                <div>
                  Resultado: <span className="font-semibold">0.00 USD</span>
                </div>
              </form>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

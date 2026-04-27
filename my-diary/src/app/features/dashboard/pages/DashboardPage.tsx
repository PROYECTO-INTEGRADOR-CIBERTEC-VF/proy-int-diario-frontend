import { useEffect, useState } from 'react'
import { UiIcon } from '../../../shared/components/UiIcon'
import { handleError } from '../../../core/interceptors/error.interceptor'
import type { DiaryResponse } from '../../diary/models/diary.response'
import { diaryService } from '../../diary/services/diary.service'
import { formatDate } from '../../../shared/utils/date.util'
import { CurrencyWidget } from '../components/CurrencyWidget'

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
              <img className='object-cover' src='/image.png'/>
            </div>
          </article>
          <aside className='space-y-6'>
            <div className='p-6 bg-white rounded-lg border border-gray-200'>
              <div className='flex items-center gap-4 mb-4'>
                <span className='card-list__icon'>
                  <UiIcon name="history" />
                </span>
                <span className="text-lg font-semibold text-gray-500 uppercase tracking-wide">Clima</span>
              </div>
              <div className="space-y-3">
                <div className="flex flex-col gap-2 p-2">
                  {/* He corregido el 'selected' aquí para que no te de error de consola */}
                  <select name="location" id="location" defaultValue="Peru" className="flex-1 px-2 py-1 rounded border border-gray-300">
                    <option value="">Seleccionar ubicación</option>
                    <option value="Peru">Peru</option>
                    <option value="argentina">Argentina</option>
                    <option value="uruguay">Uruguay</option>
                    <option value="chile">Chile</option>
                  </select>
                  <button className="px-4 py-1 bg-[#4566d9] text-white rounded hover:bg-[#3656c7] transition">
                    Buscar
                  </button>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <p className="font-semibold">Lima, Perú</p>
                  <p className="text-sm text-gray-600">☀️ 24°C, Despejado</p>
                </div>
              </div>
            </div>
            <CurrencyWidget/>
          </aside>
        </div>
      </div>
    </section>
  )
}
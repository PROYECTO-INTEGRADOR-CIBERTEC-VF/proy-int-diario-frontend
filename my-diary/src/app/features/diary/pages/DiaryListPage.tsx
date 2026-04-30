import { useEffect, useMemo, useState } from 'react'
import { UiIcon } from '../../../shared/components/UiIcon'
import { handleError } from '../../../core/interceptors/error.interceptor'
import { diaryService } from '../services/diary.service'
import type { DiaryResponse } from '../models/diary.response'

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('es-PE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(value))

const parseTags = (tags?: string | null) =>
  (tags ?? '')
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean)

export function DiaryListPage() {
  const [entries, setEntries] = useState<DiaryResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [moodQuery, setMoodQuery] = useState('')
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')

  useEffect(() => {
    const loadEntries = async () => {
      try {
        const response = await diaryService.listAll()
        setEntries(response)
      } catch (listError) {
        setError(handleError(listError))
      } finally {
        setLoading(false)
      }
    }

    void loadEntries()
  }, [])

  const latestEntryDate = useMemo(() => {
    if (!entries.length) return 'Sin registros recientes'
    const latest = [...entries].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )[0]
    return formatDate(latest.createdAt)
  }, [entries])

  const filteredEntries = useMemo(() => {
    const normalizedQuery = moodQuery.trim().toLowerCase()

    const byMood = normalizedQuery
      ? entries.filter((entry) => (entry.mood ?? '').toLowerCase().includes(normalizedQuery))
      : entries

    return [...byMood].sort((a, b) => {
      const diff = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      return sortOrder === 'newest' ? -diff : diff
    })
  }, [entries, moodQuery, sortOrder])

  const availableMoods = useMemo(() => {
    return [...new Set(entries.map((entry) => entry.mood?.trim()).filter(Boolean) as string[])]
      .sort((a, b) => a.localeCompare(b))
  }, [entries])

  return (
    <section className="page page--diary-list">
      <div className="page__hero">
        <div className="diary-list-hero__content">
          <span className="eyebrow">Historial de notas</span>
          <h1>Tu recuerdos ​🔔</h1>
          <div className="tag-row">
            <span className="tag">
              <UiIcon name="calendar" /> Ultima actividad: {latestEntryDate}
            </span>
          </div>
        </div>
        <a className="button button--primary" href="/diary/create">
          <UiIcon name="add" />
          Nueva nota
        </a>
      </div>

      <div className="panel" style={{ marginBottom: '1rem' }}>
        <div className="panel__header">
          <div>
            <span className="eyebrow">Filtros</span>
          </div>
          <UiIcon name="search" />
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-[#6e7083]">Buscar</span>
            <div className="flex items-center gap-3 rounded-2xl border border-[#e2e8ff] bg-white px-4 py-3">
              <UiIcon name="search" />
              <input
                value={moodQuery}
                onChange={(event) => setMoodQuery(event.target.value)}
                type="text"
                placeholder="feliz, tranquilo, motivado..."
                className="w-full bg-transparent outline-none placeholder:text-[#9aa3b2]"
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-[#6e7083]">Ordenar por fecha</span>
            <select
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value as 'newest' | 'oldest')}
              className="w-full rounded-2xl border border-[#e2e8ff] bg-white px-4 py-3 text-[#1f2140] outline-none"
            >
              <option value="newest">Reciente</option>
              <option value="oldest">Antiguas</option>
            </select>
          </label>
        </div>

        {availableMoods.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {availableMoods.map((mood) => (
              <button
                key={mood}
                type="button"
                onClick={() => setMoodQuery(mood)}
                className="tag transition hover:opacity-90"
              >
                {mood}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setMoodQuery('')}
              className="tag transition hover:opacity-90"
            >
              Ver todos
            </button>
          </div>
        ) : null}
      </div>

      {loading ? <div className="panel panel--status">Cargando notas...</div> : null}
      {error ? <div className="panel panel--status panel--error">{error}</div> : null}

      <div className="diary-list">
        {filteredEntries.map((entry) => (
          <article key={entry.id} className="diary-card">
            <div className="diary-card__date">
              <UiIcon name="calendar" />
              <span className='font-semibold'>{formatDate(entry.createdAt)}</span>
            </div>
            <h2>{entry.title}</h2>
            <p className="diary-card__excerpt">{entry.content}</p>
            <div className="tag-row">
              {parseTags(entry.tags).map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
              {entry.mood ? <span className="tag tag-mood">{entry.mood}</span> : null}
            </div>
            <div className="button-row button-row--compact">
              <a className="button button--secondary" href={`/diary/detail?id=${entry.id}`}>
                <UiIcon name="eye" /> Ver
              </a>
              <a className="button button--ghost" href={`/diary/edit?id=${entry.id}`}>
                <UiIcon name="edit" /> Editar
              </a>
              {entry.isFavorite ? (
                <button className='button button--ghost'>
                  ❤️
                </button>) : null}
            </div>
          </article>
        ))}
      </div>

      {!loading && !error && entries.length === 0 ? (
        <div className="panel panel--empty">
          <UiIcon name="diary" />
          <h3>No tienes notas todavia</h3>
          <p>Empieza con tu primera entrada y construye tu historia dia a dia.</p>
          <a className="button button--primary" href="/diary/create">
            <UiIcon name="add" /> Crear primera nota
          </a>
        </div>
      ) : null}

      {!loading && !error && entries.length > 0 && filteredEntries.length === 0 ? (
        <div className="panel panel--empty">
          <UiIcon name="search" />
          <h3>No hay coincidencias</h3>
          <p>Prueba con otro ánimo o limpia el filtro para ver todas tus notas.</p>
          <button className="button button--primary" type="button" onClick={() => setMoodQuery('')}>
            <UiIcon name="arrow-left" /> Limpiar filtro
          </button>
        </div>
      ) : null}
    </section>
  )
}

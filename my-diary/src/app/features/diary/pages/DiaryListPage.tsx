import { UiIcon } from '../../../shared/components/UiIcon'

const diaryEntries = [
  { date: '23 Abril 2024', title: 'Viaje a la Playa', excerpt: 'Un día cálido, tranquilo y lleno de fotos hermosas.', tags: ['clima', 'viaje', 'memorias'] },
  { date: '22 Abril 2024', title: 'Reunión de Trabajo', excerpt: 'Definimos pendientes, tiempos y objetivos.', tags: ['trabajo', 'agenda'] },
  { date: '21 Abril 2024', title: 'Ideas para el blog', excerpt: 'Paleta, tipografías y enfoque visual para la portada.', tags: ['creatividad', 'diseño'] },
]

export function DiaryListPage() {
  return (
    <section className="page">
      <div className="page__hero">
        <div>
          <span className="eyebrow">Historial de notas</span>
          <h1>Tu archivo personal</h1>
          <p>Consulta, edita o crea nuevas notas desde una vista limpia y ordenada.</p>
        </div>
        <a className="button button--primary" href="/diary/create">
          <UiIcon name="add" />
          Nueva nota
        </a>
      </div>

      <div className="diary-list">
        {diaryEntries.map((entry) => (
          <article key={entry.title} className="diary-card">
            <div className="diary-card__date">
              <UiIcon name="calendar" />
              {entry.date}
            </div>
            <h2>{entry.title}</h2>
            <p>{entry.excerpt}</p>
            <div className="tag-row">
              {entry.tags.map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
            <div className="button-row button-row--compact">
              <a className="button button--secondary" href="/diary/detail">
                <UiIcon name="eye" /> Ver
              </a>
              <a className="button button--ghost" href="/diary/edit">
                <UiIcon name="edit" /> Editar
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

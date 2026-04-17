import { UiIcon } from '../../../shared/components/UiIcon'

export function DiaryDetailPage() {
  return (
    <section className="page">
      <article className="detail-card">
        <div className="detail-card__header">
          <div>
            <span className="eyebrow">Detalle de nota</span>
            <h1>Viaje a la Playa</h1>
          </div>
          <div className="button-row button-row--compact">
            <a href="/diary/edit" className="button button--secondary"><UiIcon name="edit" /> Editar</a>
            <a href="/diary" className="button button--ghost"><UiIcon name="arrow-left" /> Volver</a>
          </div>
        </div>
        <p className="detail-card__meta">23 Abril 2024 · clima · viaje · memorias</p>
        <p>
          Un día cálido, tranquilo y lleno de fotos hermosas. Esta vista de detalle representa la lectura completa de la nota con
          una interfaz limpia y lista para conectar con el backend.
        </p>
      </article>
    </section>
  )
}

import { UiIcon } from '../../../shared/components/UiIcon'

export function DiaryEditPage() {
  return (
    <section className="page">
      <div className="page__hero">
        <div>
          <span className="eyebrow">Editar nota</span>
          <h1>Actualiza tu entrada</h1>
          <p>La maqueta deja listo el flujo de edición con botones claros e iconos.</p>
        </div>
      </div>

      <form className="editor-card">
        <label>Título<input type="text" defaultValue="Viaje a la Playa" /></label>
        <label>Contenido<textarea rows={7} defaultValue="Un día cálido, tranquilo y lleno de fotos hermosas." /></label>
        <div className="button-row">
          <button type="button" className="button button--primary"><UiIcon name="edit" /> Actualizar</button>
          <a href="/diary" className="button button--ghost"><UiIcon name="arrow-left" /> Cancelar</a>
        </div>
      </form>
    </section>
  )
}

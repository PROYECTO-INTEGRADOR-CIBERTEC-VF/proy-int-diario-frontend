import { UiIcon } from '../../../shared/components/UiIcon'

export function DiaryCreatePage() {
  return (
    <section className="page">
      <div className="page__hero">
        <div>
          <h1>Crear nota</h1>
        </div>
      </div>

      <form className="editor-card">
        <label>Título<input type="text" placeholder="Título de la nota" /></label>
        <label>Contenido<textarea rows={7} placeholder="Escribe tu nota..." /></label>
        <div className="form-grid">
          <label>Fecha<input type="date" /></label>
          <label>Etiqueta<input type="text" placeholder="personal, trabajo..." /></label>
        </div>
        <div className="button-row">
          <button type="button" className="button button--primary"><UiIcon name="add" /> Guardar</button>
          <a href="/diary" className="button button--secondary"><UiIcon name="arrow-left" /> Volver</a>
        </div>
      </form>
    </section>
  )
}

import { UiIcon } from '../../../shared/components/UiIcon'


const notes = [
  { title: 'Viaje a la Playa', description: 'Recordatorio del viaje, fotos y emociones del día.', meta: '23 Abril 2024 · Diario personal', icon: 'history' as const },
  { title: 'Reunión de Trabajo', description: 'Agenda, acuerdos y pendientes del equipo.', meta: '22 Abril 2024 · Productividad', icon: 'note' as const },
  { title: 'Ideas para el blog', description: 'Temas, títulos y enfoque visual para la próxima entrada.', meta: '21 Abril 2024 · Creatividad', icon: 'palette' as const },
]

export function DashboardPage() {
  return (
    <section className="page page--dashboard">
      <div className="page__hero">
        <div>
          <span className="eyebrow">Dashboard</span>
          <h1>Bienvenido</h1>
          <p>Vista principal con resumen rápido, acciones destacadas y tus notas recientes.</p>
        </div>
        <div className="button-row">
          <a href="/diary/create" className="button button--primary">
            <UiIcon name="add" />
            Nueva nota
          </a>
        </div>
      </div>

      <div className="content-grid">
        <article className="panel panel--notes">
          <div className="panel__header">
            <div>
              <span className="eyebrow">Mis notas</span>
              <h2>Historial reciente</h2>
            </div>
            <a className="button button--ghost" href="/diary">
              <UiIcon name="history" />
              Ver todo
            </a>
          </div>
          <div className="note-list">
            {notes.map((note) => (
              <article key={note.title} className="note-item">
                <div className="note-item__badge">
                  <UiIcon name={note.icon} />
                </div>
                <div>
                  <h3>{note.title}</h3>
                  <p>{note.description}</p>
                  <small>{note.meta}</small>
                </div>
                <div className="note-item__actions">
                  <button type="button" className="icon-button"><UiIcon name="eye" /></button>
                  <button type="button" className="icon-button"><UiIcon name="edit" /></button>
                </div>
              </article>
            ))}
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
                <select name="location" id="location" className="flex-1 px-2 py-1 rounded border border-gray-300">
                  <option value="">Seleccionar ubicación</option>
                  <option value="Peru" selected>Peru</option>
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
    </section>
  )
}

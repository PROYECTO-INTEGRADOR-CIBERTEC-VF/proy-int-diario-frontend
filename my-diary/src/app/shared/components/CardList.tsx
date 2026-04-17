import { UiIcon } from './UiIcon'

export type CardItem = {
  title: string
  description: string
  meta: string
  icon: 'weather' | 'currency' | 'profile' | 'note' | 'dashboard' | 'history' | 'palette'
}

type CardListProps = {
  items: CardItem[]
}

export function CardList({ items }: CardListProps) {
  return (
    <div className="card-list">
      {items.map((item) => (
        <article key={item.title} className="card-list__item">
          <span className="card-list__icon">
            <UiIcon name={item.icon} />
          </span>
          <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <small>{item.meta}</small>
          </div>
        </article>
      ))}
    </div>
  )
}

type LanguageSwitcherProps = {
  value?: string
  onChange?: (value: string) => void
}

export function LanguageSwitcher({ value = 'es', onChange }: LanguageSwitcherProps) {
  return (
    <div className="language-switcher">
      <button type="button" className={value === 'es' ? 'is-active' : ''} onClick={() => onChange?.('es')}>
        ES
      </button>
      <button type="button" className={value === 'en' ? 'is-active' : ''} onClick={() => onChange?.('en')}>
        EN
      </button>
    </div>
  )
}

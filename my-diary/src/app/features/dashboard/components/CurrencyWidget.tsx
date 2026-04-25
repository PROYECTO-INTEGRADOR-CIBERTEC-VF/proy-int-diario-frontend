import { useState, useEffect } from 'react'
import { API_LIMITS } from '../../currency/constants/currency.constants'
import { currencyService } from '../../currency/services/currency.service'

export function CurrencyWidget() {
  const [amount, setAmount] = useState('')
  const [error, setError] = useState('')
  const [result, setResult] = useState<number | null>(null)

  const [currencies, setCurrencies] = useState<string[]>([])
  const [fromCurrency, setFromCurrency] = useState('')
  const [toCurrency, setToCurrency] = useState('')

  // 🔥 CARGAR MONEDAS DINÁMICAS
  useEffect(() => {
    const loadCurrencies = async () => {
      try {
        const res: any = await currencyService.getCurrencies()
        const data = res?.data ?? res

        const list = Object.keys(data).sort()
        setCurrencies(list)

        
        if (list.includes('PEN') && list.includes('USD')) {
          setFromCurrency('PEN')
          setToCurrency('USD')
        } else if (list.length > 0) {
          setFromCurrency(list[0])
          setToCurrency(list[1] || list[0])
        }

      } catch (error) {
        console.error('Error cargando monedas', error)
      }
    }

    loadCurrencies()
  }, [])


  const handleConvert = async () => {
    if (!amount) {
      setError('Ingrese un monto')
      return
    }

    try {
      const res: any = await currencyService.convert(
        Number(amount),
        fromCurrency,
        toCurrency
      )

      const data = res?.data ?? res

      setResult(data.result)
      setError('')
    } catch (error: any) {
      console.error(error)
      setError(error?.response?.data?.message || 'Error al convertir')
    }
  }

  return (
    <div className='p-6 bg-white rounded-lg border border-gray-200'>
      <div className='flex items-center gap-4 mb-4'>
        <span className="text-lg font-semibold text-gray-500 uppercase tracking-wide">
          Convertidor de Moneda
        </span>
      </div>

      <form className="mt-4 space-y-4">

        {/* DE */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">De:</label>
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            {currencies.length === 0 ? (
              <option>Cargando...</option>
            ) : (
              currencies.map((cur) => (
                <option key={cur} value={cur}>
                  {cur}
                </option>
              ))
            )}
          </select>
        </div>

        {/* A */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">A:</label>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            {currencies.length === 0 ? (
              <option>Cargando...</option>
            ) : (
              currencies.map((cur) => (
                <option key={cur} value={cur}>
                  {cur}
                </option>
              ))
            )}
          </select>
        </div>

        {/* MONTO */}
        <input
          type="text"
          value={amount}
          onChange={(e) => {
            const value = e.target.value

            if (!/^\d*\.?\d*$/.test(value)) {
              setError('Solo números')
              return
            }

            if (Number(value) < API_LIMITS.MIN_AMOUNT && value !== '') {
              setError(`Mínimo ${API_LIMITS.MIN_AMOUNT}`)
              setAmount(value)
              return
            }

            setError('')
            setAmount(value)
          }}
          placeholder="Monto"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />

        {/* ERROR */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* BOTÓN */}
        <button
          type="button"
          onClick={handleConvert}
          className="w-full px-4 py-2 bg-[#4566d9] text-white rounded-md hover:bg-[#3656c7]"
        >
          Calcular
        </button>

        {/* RESULTADO */}
        <div>
          Resultado:{' '}
          <span className="font-semibold">
            {result !== null
              ? new Intl.NumberFormat('es-PE', {
                style: 'currency',
                currency: toCurrency,
              }).format(result)
              : '---'}
          </span>
        </div>

      </form>
    </div>
  )
}
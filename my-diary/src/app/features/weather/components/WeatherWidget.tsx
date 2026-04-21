import { useEffect, useState } from "react";
import { UiIcon } from "../../../shared/components/UiIcon";
import { weatherService } from "../services/weather.service";
import type { CityResponse } from "../models/city.response";
import { handleError } from "../../../core/interceptors/error.interceptor";
import type { WeatherResponse } from "../models/weather.response";

const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1)

export function WeatherWidget() {
  const [cities, setCities] = useState<CityResponse[]>([])
  const [selectedCityId, setSelectedCityId] = useState<number | null>(null)
  const [weather, setWeather] = useState<WeatherResponse | null>(null)
  const [loadingCities, setLoadingCities] = useState(true)
  const [loadingWeather, setLoadingWeather] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadCities = async () => {
      try {
        const data = await weatherService.getCities()
        setCities(data)
      } catch (err) {
        setError(handleError(err))
      } finally {
        setLoadingCities(false)
      }
    }

    void loadCities()
  }, [])

  const handleSearch = async () => {
    if (selectedCityId === null) return

    setLoadingWeather(true)
    setError('')
    setWeather(null)

    try {
      const data = await weatherService.getWeatherByCity(selectedCityId)
      setWeather(data)
    } catch (err) {
      setError(handleError(err))
    } finally {
      setLoadingWeather(false)
    }
  }

  const currentClima = weather?.clima?.[0]

  return (
    <div className='p-6 bg-white rounded-lg border border-gray-200'>
      <div className='flex items-center gap-4 mb-4'>
        <span className='card-list__icon'>
          <UiIcon name="history" />
        </span>
        <span className="text-lg font-semibold text-gray-500 uppercase tracking-wide">Clima</span>
      </div>
      <div className="space-y-3">
        <div className="flex flex-col gap-2 p-2">
          <select
            name="location"
            id="location"
            className="flex-1 px-2 py-1 rounded border border-gray-300"
            disabled={loadingCities}
            value={selectedCityId ?? ''}
            onChange={(e) => setSelectedCityId(e.target.value === '' ? null : Number(e.target.value))}
          >
            <option value="">
              {loadingCities ? 'Cargando ciudades...' : 'Seleccionar ubicación'}
            </option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
          <button
            className="px-4 py-1 bg-[#4566d9] text-white rounded hover:bg-[#3656c7] transition disabled:opacity-50"
            disabled={selectedCityId === null || loadingWeather}
            onClick={() => void handleSearch()}
          >
            {loadingWeather ? 'Buscando...' : 'Buscar'}
          </button>
        </div>

        {error ? (
          <div className="p-3 bg-red-50 rounded text-sm text-red-600">{error}</div>
        ) : null}

        {weather && currentClima ? (
          <div className="p-3 bg-gray-50 rounded flex items-center gap-3">
            <img
              src={new URL(`../icons/${currentClima.icono}.png`, import.meta.url).href}
              alt={currentClima.estado}
              className="w-10 h-10"
            />
            <div>
              <p className="font-semibold">{weather.ubicacion}</p>
              <p className="text-sm text-gray-600">
                {weather.temperatura}°C, {capitalize(currentClima.estado)}
              </p>
            </div>
          </div>
        ) : null}

        {!weather && !loadingWeather && !error ? (
          <div className="p-3 bg-gray-50 rounded">
            <p className="text-sm text-gray-400">Selecciona una ciudad y pulsa Buscar</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
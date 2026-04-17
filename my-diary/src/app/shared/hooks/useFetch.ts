import { useEffect, useState } from 'react'

type FetchState<T> = {
  data: T | null
  loading: boolean
  error: string | null
}

export function useFetch<T>(url: string) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    let active = true

    const load = async () => {
      try {
        const response = await fetch(url)
        const data = (await response.json()) as T

        if (active) {
          setState({ data, loading: false, error: null })
        }
      } catch (error) {
        if (active) {
          setState({
            data: null,
            loading: false,
            error: error instanceof Error ? error.message : 'Error desconocido',
          })
        }
      }
    }

    void load()

    return () => {
      active = false
    }
  }, [url])

  return state
}

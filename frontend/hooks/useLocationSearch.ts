'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

export type LocationSearchItem = {
  id: string
  type: string
  name: string
  name_hi?: string | null
  hierarchy: string[]
  slug?: string | null
  pincode?: string | null
  latitude?: number | null
  longitude?: number | null
  is_serviceable: boolean
  priority: number
}

type UseLocationSearchOptions = {
  lang?: 'en' | 'hi'
  debounceMs?: number
  minLength?: number
}

export function useLocationSearch(options: UseLocationSearchOptions = {}) {
  const { lang = 'en', debounceMs = 300, minLength = 2 } = options

  const [query, setQuery] = useState('')
  const [results, setResults] = useState<LocationSearchItem[]>([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const abortRef = useRef<AbortController | null>(null)
  const reqIdRef = useRef(0)

  const search = useCallback((value: string) => {
    setQuery(value)
    setActiveIndex(-1)

    if (timerRef.current) clearTimeout(timerRef.current)

    if (value.trim().length < minLength) {
      setResults([])
      setLoading(false)
      setOpen(false)
      return
    }

    setLoading(true)
    setOpen(true)

    timerRef.current = setTimeout(async () => {
      const myReqId = ++reqIdRef.current

      abortRef.current?.abort()
      const controller = new AbortController()
      abortRef.current = controller

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_TMG_API_URL}/api/v1/locations/search?q=${encodeURIComponent(value)}&lang=${lang}`,
          { signal: controller.signal }
        )

        if (!res.ok) throw new Error('Search failed')

        const data: LocationSearchItem[] = await res.json()

        // Ignore stale/out-of-order responses
        if (myReqId === reqIdRef.current) {
          setResults(data)
        }
      } catch (err: any) {
        if (err?.name !== 'AbortError') {
          console.error('Location search error:', err)
          if (myReqId === reqIdRef.current) setResults([])
        }
      } finally {
        if (myReqId === reqIdRef.current) setLoading(false)
      }
    }, debounceMs)
  }, [lang, debounceMs, minLength])

  const close = useCallback(() => {
    setOpen(false)
    setActiveIndex(-1)
  }, [])

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      abortRef.current?.abort()
    }
  }, [])

  return {
    query, results, loading, open, activeIndex,
    setActiveIndex, search, close, setOpen,
  }
}
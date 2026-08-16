'use client'

import { useRef, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useLocationSearch, LocationSearchItem } from "@/hooks/useLocationSearch"
import { useLocale } from "next-intl"
import { formatHierarchy } from "@/lib/stateAbbreviations"
const TYPE_LABELS: Record<string, string> = {
  village: 'Village',
  city: 'City',
  district: 'District',
  sub_district: 'Tehsil',
  block: 'Block',
  state: 'State',
  pincode: 'Pincode',
  airport: 'Airport',
  railway_station: 'Railway Station',
}

const TYPE_COLORS: Record<string, string> = {
  village: 'bg-green-100 text-green-800',
  city: 'bg-blue-100 text-blue-800',
  district: 'bg-purple-100 text-purple-800',
  sub_district: 'bg-orange-100 text-orange-800',
  block: 'bg-orange-100 text-orange-800',
  state: 'bg-slate-200 text-slate-800',
  pincode: 'bg-yellow-100 text-yellow-800',
  airport: 'bg-sky-100 text-sky-800',
  railway_station: 'bg-rose-100 text-rose-800',
}

function Highlighted({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>
  const idx = text.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return <>{text}</>
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-primary/20 text-inherit rounded-sm px-0.5">
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  )
}

type LocationAutocompleteProps = {
  id: string
  name: string
  value: string
  placeholder?: string
  className?: string
  onSelect: (item: LocationSearchItem) => void
  onChangeText: (value: string) => void
  onResultsChange?: (results: LocationSearchItem[], query: string, loading: boolean) => void
}

export function LocationAutocomplete({
  id, name, value, placeholder, className,
  onSelect, onChangeText, onResultsChange,
}: LocationAutocompleteProps) {
  const locale = useLocale()
  const lang = locale === 'hi' ? 'hi' : 'en'

  const { query, results, loading, open, activeIndex, setActiveIndex, search, close } =
    useLocationSearch({ lang })

  useEffect(() => {
    onResultsChange?.(results, query, loading)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results, query, loading])

  const listRef = useRef<HTMLDivElement>(null)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open || results.length === 0) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((prev) => (prev + 1) % results.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((prev) => (prev - 1 + results.length) % results.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (activeIndex >= 0 && activeIndex < results.length) {
        onSelect(results[activeIndex])
        close()
      }
    } else if (e.key === 'Escape') {
      close()
    }
  }

  return (
    <div className="relative">
      <Input
        id={id}
        name={name}
        type="text"
        autoComplete="off"
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          onChangeText(e.target.value)
          search(e.target.value)
        }}
        onKeyDown={handleKeyDown}
        onBlur={() => setTimeout(close, 150)}
        aria-expanded={open}
        aria-autocomplete="list"
        aria-controls={`${id}-listbox`}
        role="combobox"
        className={cn("pr-10", className)}
      />

      {loading && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-muted border-t-primary" />
        </div>
      )}

      {open && results.length > 0 && (
        <div
          id={`${id}-listbox`}
          role="listbox"
          ref={listRef}
          className="absolute left-0 top-full z-50 mt-1 max-h-72 w-full overflow-y-auto rounded-lg border border-border bg-background shadow-lg"
        >
          {results.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="option"
              aria-selected={index === activeIndex}
              onMouseDown={(e) => {
                e.preventDefault()
                onSelect(item)
                close()
              }}
              onMouseEnter={() => setActiveIndex(index)}
              className={cn(
                "flex w-full items-start justify-between gap-2 px-4 py-3 text-left hover:bg-muted",
                index === activeIndex && "bg-muted"
              )}
            >
              <div className="min-w-0">
                <div className="font-medium truncate">
                  <Highlighted
                    text={lang === 'hi' && item.name_hi ? item.name_hi : item.name}
                    query={query}
                  />
                </div>
                {(item.hierarchy ?? []).length > 0 && (
  <div className="text-sm text-muted-foreground truncate">
  
    {formatHierarchy(item.hierarchy ?? [])}
  </div>
)}
              </div>

              <span
                className={cn(
                  "shrink-0 rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap",
                  TYPE_COLORS[item.type] ?? "bg-gray-100 text-gray-800"
                )}
              >
                {TYPE_LABELS[item.type] ?? item.type}
              </span>
            </button>
          ))}
        </div>
      )}

      {open && !loading && results.length === 0 && query.trim().length >= 2 && (
        <div className="absolute left-0 top-full z-50 mt-1 w-full rounded-lg border border-border bg-background p-4 text-sm text-muted-foreground shadow-lg">
          No results found
        </div>
      )}
    </div>
  )
}
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { autocomplete } from '@algolia/autocomplete-js'
import '@algolia/autocomplete-theme-classic'
import { recentSearchesPlugin } from './recentSearchesPlugin'
import { createProductSuggestionsSource } from './productSuggestionsSource'
import '../../styles/SearchAutocomplete.css'


function SearchAutocomplete({ redirectSearchTo, onQuery }) {
  const containerRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!containerRef.current) return

    const handleQuery = (query) => {
      const trimmed = query.trim()
      if (!trimmed) return
      if (redirectSearchTo) {
        navigate(`${redirectSearchTo}?q=${encodeURIComponent(trimmed)}`)
      } else {
        onQuery?.(trimmed)
      }
    }

    const search = autocomplete({
      container: containerRef.current,
      placeholder: 'Buscar productos...',
      openOnFocus: true,
      plugins: [recentSearchesPlugin],
      getSources() {
        return [createProductSuggestionsSource({ onSelect: handleQuery })]
      },
      onSubmit({ state }) {
        handleQuery(state.query)
      },
    })

    return () => search.destroy()
  }, [redirectSearchTo, onQuery, navigate])

  return <div ref={containerRef} className="search-header__autocomplete" />
}

export default SearchAutocomplete
import { useState } from 'react'
import TopBar from './components/TopBar'
import SearchBar from './components/SearchBar'
import HomeGrid from './components/HomeGrid'
import GiftListPage from './components/gift/GiftListPage'
import GiftEditPage from './components/gift/GiftEditPage'
import { GiftProvider } from './store/GiftStore'

export default function App() {
  const [lang, setLang] = useState('zh')
  const [query, setQuery] = useState('')
  // route: {name: 'home'} | {name: 'gift-list'} | {name: 'gift-edit', giftId?}
  const [route, setRoute] = useState({ name: 'home' })

  function openPage(page) {
    if (page.key === 'gift-config') setRoute({ name: 'gift-list' })
    else console.log('open', page.key)
  }

  return (
    <GiftProvider>
      <div className="app">
        <TopBar lang={lang} onLangChange={setLang} />

        {route.name === 'home' && (
          <>
            <SearchBar value={query} onChange={setQuery} />
            <HomeGrid query={query} onOpen={openPage} />
          </>
        )}

        {route.name === 'gift-list' && (
          <GiftListPage
            onBack={() => setRoute({ name: 'home' })}
            onCreate={() => setRoute({ name: 'gift-edit' })}
            onEdit={(giftId) => setRoute({ name: 'gift-edit', giftId })}
          />
        )}

        {route.name === 'gift-edit' && (
          <GiftEditPage
            giftId={route.giftId}
            onDone={() => setRoute({ name: 'gift-list' })}
          />
        )}
      </div>
    </GiftProvider>
  )
}

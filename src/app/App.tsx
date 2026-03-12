import { Routes, Route } from 'react-router-dom'
import HomePage from '@/pages/home/page'
import DetailPage from '@/pages/detail/page'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/detail/:locationId" element={<DetailPage />} />
    </Routes>
  )
}

export default App


import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Nav } from './components/Nav'
import { AdvisoryRuns } from './routes/advisory/AdvisoryRuns'
import { AdvisoryRecommendations } from './routes/advisory/AdvisoryRecommendations'
import { AdvisoryMetrics } from './routes/advisory/AdvisoryMetrics'

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/advisory/runs" element={<AdvisoryRuns />} />
        <Route path="/advisory/recommendations" element={<AdvisoryRecommendations />} />
        <Route path="/advisory/metrics" element={<AdvisoryMetrics />} />
      </Routes>
    </BrowserRouter>
  )
}

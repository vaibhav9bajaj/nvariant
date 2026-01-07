
import http from 'http'
import { extractFeatures } from './features/extract.js'
import { scoreRisk } from './model/risk.js'
import { recommend } from './model/recommend.js'
import { forecastBlockProbability } from './model/forecast.js'

http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/analyze') {
    let body = ''
    req.on('data', c => body += c)
    req.on('end', () => {
      const events = JSON.parse(body)
      const features = extractFeatures(events)
      const risks = scoreRisk(features)
      const recs = recommend(risks)
      const forecast = forecastBlockProbability(risks)
      res.writeHead(200, {'Content-Type':'application/json'})
      res.end(JSON.stringify({ risks, recs, forecast }))
    })
    return
  }
  res.writeHead(404); res.end()
}).listen(5000, () => console.log('ml advisory listening'))

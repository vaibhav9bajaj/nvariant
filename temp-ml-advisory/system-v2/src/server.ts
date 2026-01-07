
import http from 'http'
import { predict, explain } from './logistic'

const MODEL={w:[0.4,0.2,0.1,0.05,0.01]}

http.createServer((req,res)=>{
 if(req.method==='POST'){
  let b=''; req.on('data',c=>b+=c)
  req.on('end',()=>{
    const {x}=JSON.parse(b)
    res.writeHead(200,{'Content-Type':'application/json'})
    res.end(JSON.stringify({
      risk: predict(x,MODEL.w),
      explanation: explain(x,MODEL.w),
      advisory:true
    }))
  })
  return
 }
 res.writeHead(404);res.end()
}).listen(6000)

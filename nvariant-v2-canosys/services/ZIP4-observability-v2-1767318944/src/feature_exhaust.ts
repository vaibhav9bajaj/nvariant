
export function buildFeatures(events:any[], days:number){
  const now=Date.now(), start=now-days*86400000
  const byEnt:any = {}
  events.forEach(e=>{
    byEnt[e.entity]=byEnt[e.entity]||[]
    byEnt[e.entity].push(e)
  })
  return Object.entries(byEnt).map(([entity,evs]:any)=>({
    entity,
    windowStart:new Date(start).toISOString(),
    windowEnd:new Date(now).toISOString(),
    features:{
      blocks: evs.filter((e:any)=>e.severity==='BLOCK').length,
      warns: evs.filter((e:any)=>e.severity==='WARN').length,
      approvals: evs.filter((e:any)=>e.type==='APPROVAL').length,
      rejects: evs.filter((e:any)=>e.type==='REJECT').length,
      retries: evs.reduce((a:any,e:any)=>a+(e.meta?.retries||0),0),
      total: evs.length
    }
  }))
}

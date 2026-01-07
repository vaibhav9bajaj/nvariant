
export function predict(x:number[], w:number[]){
  const z=x.reduce((a,v,i)=>a+v*w[i],0)
  return 1/(1+Math.exp(-z))
}
export function explain(x:number[], w:number[]){
  return x.map((v,i)=>({feature:i, contribution:v*w[i]}))
}

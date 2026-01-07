
import fs from 'node:fs'
import path from 'node:path'

const dir = new URL('../migrations', import.meta.url).pathname
for (const f of fs.readdirSync(dir)) {
  console.log('--- ' + f + ' ---')
  console.log(fs.readFileSync(path.join(dir, f), 'utf8'))
}

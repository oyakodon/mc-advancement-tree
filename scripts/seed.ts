import { parseArgs } from 'util'

import { $, Glob } from 'bun'

const PATH_SEED = '.seed'
const glob = (pattern: string) => new Glob(pattern).scan(PATH_SEED)
const bulk = async (command: 'put' | 'delete', filename: string) => {
  const path = `${PATH_SEED}/${filename}`

  process.stdout.write(`${path}: `)
  await $`bun x wrangler kv bulk ${command} --local --binding KV ${path}`.quiet()
  console.log('ok')
}

// parse command
const { values } = parseArgs({
  args: Bun.argv,
  options: {
    command: {
      type: 'string',
      short: 'c',
    },
  },
  strict: false,
  allowPositionals: true,
})

const commands = ['up', 'down'] as const
type Command = (typeof commands)[number]

const command: Command | undefined = commands.find((x) => x === values.command)
if (!command) {
  console.error('invalid command')
  process.exit(1)
}

// put or delete KV pair using seed file
switch (command) {
  case 'up':
    {
      for await (const filename of glob('**/*.up.json')) {
        await bulk('put', filename)
      }
      console.log('[up] done.')
    }
    break

  case 'down':
    {
      for await (const filename of glob('**/*.down.json')) {
        await bulk('delete', filename)
      }
      console.log('[down] done.')
    }
    break
}

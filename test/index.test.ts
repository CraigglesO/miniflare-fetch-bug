import { beforeEach, it, assert } from 'vitest'
import { Miniflare } from 'miniflare'

interface LocalTestContext {
  mf: Miniflare
}

beforeEach<LocalTestContext>(async (ctx) => {
  // Create a new Miniflare environment for each test
  ctx.mf = new Miniflare({
    // Autoload configuration from `.env`, `package.json` and `wrangler.toml`
    envPath: true,
    packagePath: true,
    wranglerConfigPath: true,
    // We don't want to rebuild our worker for each test, we're already doing
    // it once before we run all tests in package.json, so disable it here.
    // This will override the option in wrangler.toml.
    buildCommand: undefined,
    modules: true,
    port: 8787,
  })
})

it<LocalTestContext>('a', async ({ mf }) => {
  console.log(mf)
  // Dispatch a fetch event to our worker
  const res = await mf.dispatchFetch('http://localhost:8787/a')
  // Check the body was returned
  assert.equal(res.status, 200)
  assert.equal(await res.text(), 'A')
})

it<LocalTestContext>('b', async ({ mf }) => {
  console.log(mf)
  // Dispatch a fetch event to our worker
  const res = await mf.dispatchFetch('http://localhost:8787/b')
  // Check the body was returned
  assert.equal(res.status, 200)
  assert.equal(await res.text(), 'A')
})

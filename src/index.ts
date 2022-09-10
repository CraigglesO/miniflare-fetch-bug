import { Router } from 'itty-router'

const router = Router()

router.get('/a', () => new Response('A'))
router.get('/b', async () => {
  const aRes = await fetch('http://localhost:8787/a')
  const text = await aRes.text()
  return new Response(text)
})

export default {
  fetch: router.handle
}

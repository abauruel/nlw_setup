import { FastifyInstance } from "fastify"


import WebPush from 'web-push'
import { string, z } from "zod"


const publicKey = process.env.PUBLIC_KEY as string
const privateKey = process.env.PRIVATE_KEY as string

WebPush.setVapidDetails('http://localhost:3333', publicKey, privateKey)

export async function NotificationRoutes(app: FastifyInstance) {

  app.get('/push/public_key', () => {
    return {
      publicKey,
    }
  })

  app.post('/push/register', (request, reply) => {
    console.log(request.body)



    return reply.status(201).send()
  })

  app.post('/push/send', async (request, reply) => {
    const sendPushBody = z.object({
      subscription: z.object({
        endpoint: z.string(),
        keys: z.object({
          p256dh: z.string(),
          auth: z.string()
        })
      })
    })
    console.log(request.body)
    const { subscription } = sendPushBody.parse(request.body)
    WebPush.sendNotification(subscription, 'Hello do backend')
    return reply.status(201).send()
  })
}
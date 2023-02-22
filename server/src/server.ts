import Fastify from 'fastify'

import cors from '@fastify/cors'
import { appRoutes } from './routes'
import { NotificationRoutes } from './notification.routes'


const app = Fastify()
app.register(cors)
app.register(appRoutes)
app.register(NotificationRoutes)

app.listen({ port: 3333, host: '0.0.0.0' }).then((address) => console.log(`server is running: ${address}`))
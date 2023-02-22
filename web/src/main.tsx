import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { api } from './lib/axios'
import './styles/global.css'

navigator.serviceWorker.register('service-worker.js')
  .then(async (serviceWorker) => {
    let subscription = await serviceWorker.pushManager.getSubscription()

    if (!subscription) {
      const publicKeyResponse = await api.get('/push/public_key')
      subscription = await serviceWorker.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: publicKeyResponse.data.publicKey
      })
    }

    console.log(subscription)

    await api.post('/push/register', { subscription })
    await api.post('/push/send', { subscription })

  })
window.Notification.requestPermission()
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

import { useEffect } from 'react'
import { AppBridgeProvider } from '../components/Providers'
import createApp from '@shopify/app-bridge'
import { getSessionToken } from '@shopify/app-bridge/utilities'
import axios from 'axios'

const IndexPage = () => {
  const handleAuthor = async () => {
    const shopifyHost = new URL((window as any).location).searchParams.get('host') as string

    console.log(shopifyHost)
    const app = createApp({ apiKey: import.meta.env.VITE_API_SHOPIFY_KEY, host: shopifyHost })
    const sessionToken = await getSessionToken(app)

    const { data } = await axios({
      method: 'get',
      url: 'http://localhost:3002/shopify/verify',
      headers: {
        authorization: `Bearer ${sessionToken}`,
      },
    })

    console.log(data, sessionToken, 'session Token')
  }

  useEffect(() => {
    handleAuthor()
  }, [])

  return (
    <AppBridgeProvider>
      <div>App Installed Alertrend</div>
    </AppBridgeProvider>
  )
}

export default IndexPage

import createApp from '@shopify/app-bridge'
import { getSessionToken } from '@shopify/app-bridge/utilities'
import { FC, useEffect, useState } from 'react'
import { AppBridgeProvider } from '../components/Providers'

const withAuth = (BaseComponent: FC) => {
  function App(props: any) {
    const [token, setToken] = useState<string>('')

    const sessionToken = async () => {
      const host = new URL((window as any).location).searchParams.get('host') as string
      const app = await createApp({
        apiKey: import.meta.env.VITE_API_SHOPIFY_KEY,
        host,
      })
      return await getSessionToken(app)
    }

    useEffect(() => {
      sessionToken().then(data => setToken(data))
    }, [token])

    if (!token) return <AppBridgeProvider>Loading</AppBridgeProvider>
    return <BaseComponent {...props} token={token} />
  }

  return App
}

export default withAuth

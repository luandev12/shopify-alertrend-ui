import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import { authenticatedFetch } from '@shopify/app-bridge/utilities'
import createApp from '@shopify/app-bridge'
import deepMerge from '@shopify/app-bridge/actions/merge'

const yourCustomFetchWrapper = (uri: any, options: any) => {
  const aggregateOptions = deepMerge(options, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  })
  return fetch(uri, aggregateOptions)
}

const host = new URL((window as any).location).searchParams.get('host') as string
const app = await createApp({
  apiKey: import.meta.env.VITE_API_SHOPIFY_KEY,
  host,
})

const httpLink = new HttpLink({
  uri: '/graphql',
  credentials: 'same-origin',
  fetch: authenticatedFetch(app, await yourCustomFetchWrapper),
})

const ClientGraphQL = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

export default ClientGraphQL

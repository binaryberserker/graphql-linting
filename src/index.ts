import * as http from 'http'

import fetch from 'node-fetch'
import gql from 'graphql-tag'
import {DocumentNode} from 'graphql'

const hostname = '127.0.0.1'
const port = 3000

const pokemonAddress = 'https://graphqlpokemon.favware.tech/'

function getGqlString({query}: {query: DocumentNode}) {
  return query.loc?.source.body?.replace(/[\s,]+/g, ' ').trim()
}

async function pokemonService(query: DocumentNode): Promise<{data: any}> {
  const requestBody = JSON.stringify({query: getGqlString({query})})
  console.log({requestBody})

  const request = await fetch(pokemonAddress, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: requestBody,
  })
  const response = await request.json()

  return response.data
}

const getAbility = async () => {
  // NOTE: used the wrong argument name here to give it something to fail on
  const query = gql`
    query {
      getAbility(ability_foo: intimidate) {
        name
        desc
      }
    }
  `

  const data = await pokemonService(query)

  return data
}

const server = http.createServer((_req, res) => {
  getAbility()
    .then((result) => {
      const response = JSON.stringify(result)
      console.log({response})

      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(response)
    })
    .catch((e: Error) => {
      console.error(e)

      res.statusCode = 400
      res.setHeader('Content-Type', 'text/plain')
      res.end(JSON.stringify(e))
    })
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})

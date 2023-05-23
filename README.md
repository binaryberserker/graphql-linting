# GraphQL ESLint example repo

This is a simplified repo to demonstrate an issue i'm having with graphql-eslint. As far as I can tell I have it configured correctly to fail linting on gql tagged queries, but it doesn't. The biggest difference with my full repo is the graphql service in my full repo requires auth, whereas the pokemon graph I'm using here does not. Still seeing the same issue however.

Relevant portions

`.eslintrc.js`

```javascript
// ...
overrides: [
  // Parse typescript for gql tags
  {
    files: ['*.ts'],
    plugins: ['@graphql-eslint'],
    processor: '@graphql-eslint/graphql',
    parser: '@typescript-eslint/parser',
  },
  // Setup GraphQL Parser
  {
    files: ['*.graphql', '*.gql'],
    plugins: ['@graphql-eslint'],
    parser: '@graphql-eslint/eslint-plugin',
    rules: {
      '@graphql-eslint/no-deprecated': 'warn',
       // NOTE: added this line to give it something to fail on
      '@graphql-eslint/known-argument-names': 'error',
    },
  },
],
// ...
```

`.graphqlrc.yml`

```yaml
schema: https://graphqlpokemon.favware.tech/
```

`src/index.ts`

```typescript
// ...

// NOTE: used the wrong argument name here to give it something to fail on
const query = gql`
  query {
    getAbility(ability_foo: intimidate) {
      name
      desc
    }
  }
`

// ...
```

run with

`npm run lint`

fails on the 2 `console.log` statements but it should also fail on that gql query, but it doesn't.

# @pepeeja/cypress-graphql

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/pepeeja/cypress-graphql/blob/main/LICENSE) [![npm latest package](https://img.shields.io/npm/v/@pepeeja/cypress-graphql/latest.svg)](https://www.npmjs.com/package/@pepeeja/cypress-graphql)

## Install

```shell
npm install -D @pepeeja/cypress-graphql
```

## Configuration

Import the package in the file `cypress/support/commands.js` or `cypress/support/commands.ts`:

```ts
import '@pepeeja/cypress-graphql';
```

## Commands

### `cy.graphqlContext`

Creates isolated GraphQL mock which has private context. Context is exposed as function `(gql) => {}`

```ts
cy.graphqlContext((gql) => {
  gql
    .schemaFromString(schema)
    .options({ url: 'http://localhost:4000/graphql' })
    .mock('GetBooks', {
      books: [
        {
          id: 1,
          title: 'Test title',
          author: 'Test author',
        },
      ],
    });
});
```

### `cy.graphqlConfig`

Creates global configuration which will be applied to all `cy.graphqlMock` commands.

```ts
cy.graphqlConfig({
  schemaString: schema,
  options: { url: 'http://localhost:4000/graphql', delay: 0, method: 'POST' },
});
```

### `cy.graphqlMock`

Mocking outgoing graphql query based on operation name.

```ts
cy.graphqlMock('GetBooks', {
  books: [
    {
      id: 1,
      title: 'Test title',
      author: 'Test author',
    },
  ],
});
```

## Examples

You can find working application [here](/example).

## License

This project is licensed under the terms of the [MIT License](LICENSE)

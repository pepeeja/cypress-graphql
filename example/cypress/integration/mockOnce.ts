const schema = `
  type Query {
    books: [Book]
  }

  type Book {
    id: ID
    author: String
    title: String
  }
`;

describe('GraphQL Mock Global Config', () => {
  before(() => {
    cy.graphqlConfig({
      schemaString: schema,
      options: { url: 'http://localhost:4000/graphql', delay: 0, method: 'POST' },
    });
  });

  it('should display real data', () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-cy=book]').should('have.length', 2).first().contains('John Doe');
  });

  it('should display mocked data', () => {
    cy.graphqlMock(
      'GetBooks',
      {
        books: [
          {
            id: 1,
            title: 'Test title',
            author: 'Test author',
          },
        ],
      },
      { times: 1 },
    )
      .visit('http://localhost:3000')
      .get('[data-cy=book]')
      .contains('Test title')
      .reload()
      .get('[data-cy=book]')
      .should('have.length', 2)
      .first()
      .contains('John Doe');
  });

  it.only('should has unique count per operation', () => {
    cy.graphqlMock(
      'GetBooks',
      {
        books: [
          {
            id: 1,
            title: 'Test title 1',
            author: 'Test author',
          },
        ],
      },
      { times: 1 },
    )
      .visit('http://localhost:3000')
      .get('[data-cy=book]')
      .should('have.length', 1)
      .contains('Test title 1');

    cy.graphqlMock(
      'GetBooks1',
      {},
      { times: 1 },
    )
      .reload()
      .get('[data-cy=book]')
      .should('have.length', 2);

    cy.graphqlMock(
      'GetBooks',
      {
        books: [
          {
            id: 1,
            title: 'Test title 2',
            author: 'Test author',
          },
        ],
      },
      { times: 1 },
    )
      .reload()
      .get('[data-cy=book]')
      .should('have.length', 1)
      .contains('Test title 2');
  });
});

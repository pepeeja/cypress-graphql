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
    cy.graphqlMock('GetBooks', {
      books: [
        {
          id: 1,
          title: 'Test title',
          author: 'Test author',
        },
      ],
    })
      .visit('http://localhost:3000')
      .get('[data-cy=book]')
      .contains('Test title');
  });
});

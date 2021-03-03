import { GraphQLContextCommand, GraphQLConfigCommand, GraphQLMockCommand } from '../commands';

declare global {
  namespace Cypress {
    interface Chainable {
      graphqlContext: GraphQLContextCommand['command'];
      graphqlConfig: GraphQLConfigCommand['command'];
      graphqlMock: GraphQLMockCommand['command'];
    }
  }
}

((): void => {
  Cypress.Commands.add('graphqlContext', new GraphQLContextCommand().command);
  Cypress.Commands.add('graphqlConfig', new GraphQLConfigCommand().command);
  Cypress.Commands.add('graphqlMock', new GraphQLMockCommand().command);
})();

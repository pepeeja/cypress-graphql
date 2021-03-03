import { GraphQLContextCommand, GraphQLConfigCommand, GraphQLMockCommand } from '../commands';

// eslint-disable-next-line @typescript-eslint/ban-types
type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;

declare global {
  namespace Cypress {
    interface Chainable {
      graphqlContext: (...args: ArgumentTypes<GraphQLContextCommand['command']>) => Cypress.Chainable;
      graphqlConfig: (...args: ArgumentTypes<GraphQLConfigCommand['command']>) => Cypress.Chainable;
      graphqlMock: (...args: ArgumentTypes<GraphQLMockCommand['command']>) => Cypress.Chainable;
    }
  }
}

((): void => {
  Cypress.Commands.add('graphqlContext', new GraphQLContextCommand().command);
  Cypress.Commands.add('graphqlConfig', new GraphQLConfigCommand().command);
  Cypress.Commands.add('graphqlMock', new GraphQLMockCommand().command);
})();

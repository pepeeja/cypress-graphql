export abstract class AbstractCommand {
  public abstract command(...args: unknown[]): Cypress.Chainable | void | Promise<unknown>;
}

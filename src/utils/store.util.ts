export class StoreUtil {
  private static readonly storeName = 'graphql_store';

  public static get<T>(): T {
    return JSON.parse(Cypress.env(StoreUtil.storeName));
  }

  public static set(value: unknown): void {
    Cypress.env(StoreUtil.storeName, JSON.stringify(value));
  }
}

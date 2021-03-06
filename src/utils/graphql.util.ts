import { StaticResponse } from 'cypress/types/net-stubbing';
import { buildClientSchema, buildSchema, graphql, GraphQLSchema } from 'graphql';
import { MockOptions, RequestPayload } from '../types';

export class GraphQLMockUtil {
  public static mock(operation: string, response: unknown, options: MockOptions, schema: GraphQLSchema | null): void {
    if (!schema) throw new Error('GraphQL schema is not defined');

    const executionCount: Record<string, number> = {};

    executionCount[operation] = 0;

    cy.intercept({ ...options }, async (req) => {
      const { operationName, query, variables }: RequestPayload = req.body;

      if (operation !== operationName) {
        if (options.forceMock) {
          throw new Error(`GraphQL operation ${operationName} doesn't have mock, but flag forceMock was enabled`);
        }
        return;
      }

      executionCount[operation] += 1;

      if (options.times !== 0 && executionCount[operation] > options.times!) {
        console.warn(
          `GraphQL operation ${operation} exceeded maximal number of executions and original query will be called instead`,
        );
        return;
      }

      let body = {};

      try {
        body = await graphql({
          schema: schema,
          source: query,
          variableValues: variables,
          operationName,
          rootValue: response,
        });
      } catch (error) {
        console.error('Error during response parsing', error);
      }

      const staticResponse: StaticResponse = {
        body,
        delay: options.delay,
      };

      req.reply(staticResponse);
    });
  }

  public static schemaFromString(schemaString: string): GraphQLSchema {
    return buildSchema(schemaString);
  }

  public static clientSchemaFromString(schemaString: string): GraphQLSchema {
    return buildClientSchema(JSON.parse(schemaString));
  }

  public static schemaStringFromUrl(url: string): Promise<string> {
    return fetch(url)
      .then((data) => {
        return data.json();
      })
      .then((res) => {
        return res.schema;
      });
  }
}

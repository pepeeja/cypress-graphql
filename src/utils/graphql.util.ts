import { StaticResponse } from 'cypress/types/net-stubbing';
import { buildClientSchema, buildSchema, graphql, GraphQLSchema } from 'graphql';
import { MockOptions, RequestPayload } from '../types';

export class GraphQLMockUtil {
  public static mock(operation: string, response: unknown, options: MockOptions, schema: GraphQLSchema): void {
    cy.intercept({ ...options }, async (req) => {
      const { operationName, query, variables }: RequestPayload = req.body;

      if (operation !== operationName) return;

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
        delay: 0,
      };

      req.reply(staticResponse);
    });
  }

  public static schemaFromString(schemaString: string): GraphQLSchema {
    return buildSchema(schemaString);
  }

  public static schemaFromUrl(url: string): GraphQLSchema {
    let schema: GraphQLSchema | null = null;
    cy.request({
      method: 'GET',
      url,
    }).then((response) => {
      schema = buildClientSchema(response.body.schema);
    });

    return schema!;
  }
}

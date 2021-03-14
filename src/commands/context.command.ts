import { GraphQLSchema } from 'graphql';
import { GraphQLMockUtil } from '../utils';
import { MockOptions } from '../types';
import { AbstractCommand } from './abstract.command';

type GraphQLMockContextProvider = (gql: GraphQLMockContext) => void;

export class GraphQLContextCommand extends AbstractCommand {
  public command(gql: GraphQLMockContextProvider) {
    gql(new GraphQLMockContext());
    return;
  }
}

class GraphQLMockContext {
  private _schema: GraphQLSchema | null = null;
  private _options: MockOptions = { delay: 0, method: 'POST' };

  public mock(operation: string, response: unknown): this {
    GraphQLMockUtil.mock(operation, response, this._options, this._schema!);
    return this;
  }

  public schemaFromString(schemaString: string): this {
    return this.schema(GraphQLMockUtil.schemaFromString(schemaString));
  }

  public schema(schema: GraphQLSchema): this {
    this._schema = schema;
    return this;
  }

  public options(options: MockOptions): this {
    this._options = options;
    return this;
  }
}

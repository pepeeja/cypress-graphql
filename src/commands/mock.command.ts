import { GraphQLConfig } from '../types';
import { GraphQLMockUtil, StoreUtil } from '../utils';
import { AbstractCommand } from './abstract.command';

export class GraphQLMockCommand extends AbstractCommand {
  public command(operation: string, response: unknown) {
    const config = StoreUtil.get<GraphQLConfig>();

    if (config.schemaString) {
      GraphQLMockUtil.mock(operation, response, config.options, GraphQLMockUtil.schemaFromString(config.schemaString));
    }
    if (config.clientSchema) {
      GraphQLMockUtil.mock(
        operation,
        response,
        config.options,
        GraphQLMockUtil.clientSchemaFromString(config.clientSchema),
      );
    }

    return;
  }
}

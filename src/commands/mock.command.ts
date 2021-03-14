import { GraphQLConfig, MockOptions } from '../types';
import { GraphQLMockUtil, StoreUtil } from '../utils';
import { AbstractCommand } from './abstract.command';

export class GraphQLMockCommand extends AbstractCommand {
  public command(operation: string, response: unknown, mockOptions?: MockOptions) {
    const config = StoreUtil.get<GraphQLConfig>();

    const options = Object.assign(config.options, mockOptions);

    if (config.schemaString) {
      GraphQLMockUtil.mock(operation, response, options, GraphQLMockUtil.schemaFromString(config.schemaString));
    }
    if (config.clientSchema) {
      GraphQLMockUtil.mock(operation, response, options, GraphQLMockUtil.clientSchemaFromString(config.clientSchema));
    }

    return;
  }
}

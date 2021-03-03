import { GraphQLMockUtil, StoreUtil } from '../utils';
import { AbstractCommand } from './abstract.command';

export class GraphQLMockCommand extends AbstractCommand {
  public command(operation: string, response: unknown): void {
    const { options, schemaString } = StoreUtil.get();
    const schema = GraphQLMockUtil.schemaFromString(schemaString);
    GraphQLMockUtil.mock(operation, response, options, schema);

    return;
  }
}

import { GraphQLSchema } from 'graphql';
import { GraphQLMockUtil } from '../utils/graphql.util';
import { MockOptions } from '../types';
import { StoreUtil } from '../utils';
import { AbstractCommand } from './abstract.command';

type GraphQLConfig = {
  schemaString?: string;
  options?: MockOptions;
};

export class GraphQLConfigCommand extends AbstractCommand {
  public command(config: GraphQLConfig): void {
    const { options, schemaString } = config;
    StoreUtil.set({ options, schemaString });
    return;
  }
}

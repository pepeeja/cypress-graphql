import { GraphQLSchema } from 'graphql';
import { GraphQLMockUtil } from '../utils/graphql.util';
import { GraphQLConfig, MockOptions } from '../types';
import { StoreUtil } from '../utils';
import { AbstractCommand } from './abstract.command';

export class GraphQLConfigCommand extends AbstractCommand {
  public command(config: Partial<GraphQLConfig>) {
    const defaultOptions: MockOptions = {
      delay: 0,
      times: 0,
    };

    config.options = Object.assign(defaultOptions, config.options);

    if (config.schemaUrl) {
      return GraphQLMockUtil.schemaStringFromUrl(config.schemaUrl).then((schemaString) => {
        config.clientSchema = JSON.stringify(schemaString);
        StoreUtil.set(config);
      });
    } else {
      StoreUtil.set(config);
    }
    return;
  }
}

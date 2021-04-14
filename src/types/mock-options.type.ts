import { RouteMatcherOptions } from 'cypress/types/net-stubbing';

export interface MockOptions extends RouteMatcherOptions {
  delay?: number;
  times?: number;
  forceMock?: boolean;
}

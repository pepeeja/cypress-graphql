import { RouteMatcherOptions } from 'cypress/types/net-stubbing';

export interface MockOptions extends RouteMatcherOptions {
  delay?: number;
}
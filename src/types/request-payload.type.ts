export type RequestPayload = {
  operationName: string;
  query: string;
  variables: Record<string, unknown>;
};

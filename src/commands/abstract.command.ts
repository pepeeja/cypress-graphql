export abstract class AbstractCommand {
  public abstract command(...args: unknown[]): unknown;
}

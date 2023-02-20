import { IMessage } from "../adapter-pattern/interfaces/IMessage";
import { Composite } from "../composite-pattern/models/composite.model";

export class Message extends Composite implements IMessage {
  public sender: string;
  public content: string;

  constructor(sender: string, content: string) {
    super();
    this.sender = sender;
    this.content = content;
  }

  public log(): void {
    console.log(`Message: ${this.content} - Sender: ${this.sender}`);
    this.children.forEach((child) => child.log());
  }

  public override add(component: Composite): void {
    if (component instanceof Message) {
      this.children.push(component);
    }
  }
}

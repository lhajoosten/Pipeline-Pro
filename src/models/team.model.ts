import { User } from "./user/abstract-user.model";
import { ProductOwner, ScrumMaster } from "./user/users.model";

export class Team {
  private members: User[] = [];

  constructor(public name: string) { }

  public addMember(member: User) {
    if (!(member instanceof ProductOwner || ScrumMaster)) {
      this.members.push(member);
    }
  }

  public removeMember(member: User) {
    const index = this.members.indexOf(member);
    if (index !== -1) {
      this.members.splice(index, 1);
    }
  }

  public getMembers(): User[] {
    return this.members;
  }
}

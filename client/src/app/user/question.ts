import {isUndefined} from 'util';

export class Question {
  constructor(private type: string,private name: string,private question: string,private hint?: string, private image?: any) {}

  public getType(): string {
    return this.type;
  }

  public getQuestion(): string {
    return this.question;
  }

  public getHint(): string {
    if(isUndefined(this.hint)){
      return 'Sorry but there is no Hint for this Question';
    } else {
      return this.hint;
    }
  }

  public isHintAvailable(): boolean {
    if(isUndefined(this.hint)){
      return false;
    } else {
      return true;
    }
  }

  public getName(): string {
    return this.name;
  }

  public getImage(): any {

  }
}

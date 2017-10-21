export class Question {
  constructor(private type: string, private hint?: string) {}

  public getType(): string {
    return this.type;
  }

  public getHint(): string {
    if(this.hint.length > 0){
      return this.hint;
    } else {
      return 'Sorry but there is no Hint for this Question';
    }
  }
}

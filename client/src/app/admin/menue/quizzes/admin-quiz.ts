export class AdminQuiz {
  constructor(public description: string,
              public hint: string,
              public name: string,
              public _id: string,
              public location: string,
              public isActive: boolean) {
  }
}

export class AdminQuizSingleAnswer extends AdminQuiz{
  constructor(public answer: string,
              public description: string,
              public hint: string,
              public name: string,
              public _id: string,
              public location: string,
              public isActive: boolean) {
    super(description,hint,name,_id,location,isActive);
  }
}

export class AdminQuizMultipleChoice extends AdminQuiz{
  constructor(public answer: string[],
              public description: string,
              public hint: string,
              public name: string,
              public _id: string,
              public location: string,
              public isActive: boolean) {
    super(description,hint,name,_id,location,isActive);
  }
}

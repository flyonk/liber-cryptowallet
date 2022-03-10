export interface IStatement {
  statement: File; // .pdf
}

export default {
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  deserialize(input: any): IStatement {
    return {
      statement: input.statement,
    };
  },
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  requestSerialize(input: IStatement): any {
    return {
      statement: input.statement,
    };
  },
};

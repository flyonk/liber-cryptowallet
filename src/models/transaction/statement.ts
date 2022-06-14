export interface IStatementDto {
  statement: File; // .pdf
}

export interface IStatement {
  statement: File; // .pdf
}

export default {
  deserialize(input: IStatementDto): IStatement {
    return {
      statement: input.statement,
    };
  },

  requestSerialize(input: IStatement): IStatementDto {
    return {
      statement: input.statement,
    };
  },
};

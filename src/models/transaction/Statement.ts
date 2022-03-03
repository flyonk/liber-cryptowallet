export interface IStatement {
    statement: File // .pdf
}

export default {
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
    deserialize(input: any): IStatement {
        const { statement } = input

        return {
            statement
        };
    },
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
    requestSerialize(input: IStatement): any {
        const { statement } = input

        return {
            statement
        };
    },
};
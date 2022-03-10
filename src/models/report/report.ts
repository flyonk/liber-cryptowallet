export interface IReport {
  type: string;
  text: string;
}

export default {
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  deserialize(input: any): IReport {
    return {
      type: input.type || '',
      text: input.text || '',
    };
  },
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  requestSerialize(input: IReport): any {
    return {
      type: input.type,
      text: input.text,
    };
  },
};

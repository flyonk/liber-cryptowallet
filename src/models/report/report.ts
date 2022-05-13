export interface IReportDto {
  type?: string;
  text?: string;
}

export interface IReport {
  type: string;
  text: string;
}

export default {
  deserialize(input: IReportDto): IReport {
    return {
      type: input.type || '',
      text: input.text || '',
    };
  },
  requestSerialize(input: IReport): IReportDto {
    return {
      type: input.type,
      text: input.text,
    };
  },
};

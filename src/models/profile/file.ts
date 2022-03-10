export interface IFile {
  file: File;
}

export default {
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  deserialize(input: any): IFile {
    return {
      file: input.file,
    };
  },
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  requestSerialize(input: IFile): any {
    return {
      file: input.file,
    };
  },
};

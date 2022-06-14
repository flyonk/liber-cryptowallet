export interface IFileDto {
  file: File;
}

export interface IFile {
  file: File;
}

export default {
  deserialize(input: IFileDto): IFile {
    return {
      file: input.file,
    };
  },
  requestSerialize(input: IFile): IFileDto {
    return {
      file: input.file,
    };
  },
};

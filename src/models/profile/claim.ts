import ClaimFile, {
  IClaimFile,
  IClaimFileDto,
} from '@/models/profile/claimFile';

export interface IClaimDto {
  id: string;
  user_id: string;
  status: number;
  file_list: IClaimFileDto[] | null;
}

export interface IClaim {
  id: string;
  userId: string;
  status: number;
  fileList: IClaimFile[] | null;
}

export default {
  deserialize(input: IClaimDto): IClaim {
    return {
      id: input.id,
      userId: input.user_id,
      status: input.status,
      fileList: input.file_list
        ? input.file_list.map(ClaimFile.deserialize)
        : null,
    };
  },
  requestSerialize(input: IClaim): IClaimDto {
    return {
      id: input.id,
      user_id: input.userId,
      status: input.status,
      file_list: input.fileList
        ? input.fileList.map(ClaimFile.requestSerialize)
        : null,
    };
  },
};

import ClaimFile, {
  IClaimFile,
  IClaimFileDto,
} from '@/models/profile/claimFile';

export interface IClaimDto {
  id: number;
  user_id: string;
  status: number;
  file_list: IClaimFileDto[];
}

export interface IClaim {
  id: number;
  userId: string;
  status: number;
  fileList: IClaimFile[];
}

export default {
  deserialize(input: IClaimDto): IClaim {
    return {
      id: input.id,
      userId: input.user_id,
      status: input.status,
      fileList: input.file_list.map(ClaimFile.deserialize),
    };
  },
  requestSerialize(input: IClaim): IClaimDto {
    return {
      id: input.id,
      user_id: input.userId,
      status: input.status,
      file_list: input.fileList.map(ClaimFile.requestSerialize),
    };
  },
};

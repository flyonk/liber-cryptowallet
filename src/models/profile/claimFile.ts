export interface IClaimFileDto {
  id: number;
  claim_id: number;
  type?: number;
  name?: string;
  extension?: string;
  link?: string;
  size?: number;
  created_at: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface IClaimFile {
  id: number;
  claimId: number;
  type: number;
  name?: string;
  extension: string;
  link?: string;
  size: number;
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string;
}

export default {
  deserialize(input: IClaimFileDto): IClaimFile {
    return {
      id: input.id,
      claimId: input.claim_id,
      type: input.type || 0,
      name: input.name || '',
      extension: input.extension || '',
      link: input.link || '',
      size: input.size || 0,
      createdAt: input.created_at || '',
      updatedAt: input.updated_at || '',
      deletedAt: input.deleted_at || '',
    };
  },
  requestSerialize(input: IClaimFile): IClaimFileDto {
    return {
      id: input.id,
      claim_id: input.claimId,
      type: input.type,
      name: input.name,
      extension: input.extension,
      link: input.link,
      size: input.size,
      created_at: input.createdAt,
      updated_at: input.updatedAt,
      deleted_at: input.deletedAt,
    };
  },
};

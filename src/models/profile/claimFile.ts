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
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  deserialize(input: any): IClaimFile {
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

  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  requestSerialize(input: IClaimFile): any {
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

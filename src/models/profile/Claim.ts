export interface IClaim {
    id: number,
    userId: string,
    status: number,
    fileList: IClaimFile[]
}

interface IClaimFile {
    id: number,
    claimId: number,
    type: number,
    name: string,
    extension: string,
    link: string,
    size: number,
    createdAt: string,
    updatedAt: string,
    deletedAt: string
}

export default {
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
    deserialize(input: any): IClaim {

        return {
            id: input.number,
            userId: input.user_id,
            status: input.status,
            fileList: deserializeFileListAdaptor(input.file_list)
        };
    },

    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
    requestSerialize(input: IClaim): any {
        return {
            id: input.id,
            user_id: input.userId,
            status: input.status,
            file_list: requestSerializeFileListAdaptor(input.fileList)
        };
    },
};


const deserializeFileListAdaptor = (input: any): IClaimFile[] => {
    return input.fileList.map((e: any) => {
        return {
            id: e.id,
            claimId: e.claim_id,
            type: e.type,
            name: e.name,
            extension: e.extension,
            link: e.link,
            size: e.size,
            createdAt: e.created_at,
            updatedAt: e.updated_at,
            deletedAt: e.deleted_at
        }
    })
}

const requestSerializeFileListAdaptor = (input: IClaimFile[]) => {
    return input.map((e: any) => {
        return {
            id: e.id,
            claim_id: e.claim_id,
            type: e.type,
            name: e.name,
            extension: e.extension,
            link: e.link,
            size: e.size,
            created_at: e.createdAt,
            updated_at: e.updatedAt,
            deleted_at: e.deletedAt
        }
    })
}
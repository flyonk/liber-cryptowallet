import ClaimFile, { IClaimFile } from '@/models/profile/ClaimFile'


export interface IClaim {
    id: number,
    userId: string,
    status: number,
    fileList: IClaimFile[]
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
        return ClaimFile.deserialize(e)
    })
}

const requestSerializeFileListAdaptor = (input: IClaimFile[]) => {
    return input.map((e: any) => {
        return ClaimFile.requestSerialize(e)
    })
}
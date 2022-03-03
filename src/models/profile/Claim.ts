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
        const { id, userId, status, fileList } = input

        return {
            id, userId, status, fileList
        };
    },

    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
    requestSerialize(input: IClaim): any {
        const { id, userId, status, fileList } = input

        return {
            id, userId, status, fileList
        };
    },
};
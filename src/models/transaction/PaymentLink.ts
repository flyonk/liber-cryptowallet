export interface IPaymentLink {
    id: string
    link: string,
    expire: string
}

export default {
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
    deserialize(input: any): IPaymentLink {
        const { id, link, expire } = input

        return {
            id, link, expire
        };
    },
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
    requestSerialize(input: IPaymentLink): any {
        const { id, link, expire } = input

        return {
            id, link, expire
        };
    },
};
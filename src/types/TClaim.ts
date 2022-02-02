export type TClaim = {
    "id": number,
    "claim_id": number,
    "type": number,
    "name": string,
    "extension": string,
    "link": string,
    "created_at": string,
    "updated_at": string,
    "deleted_at": string
}

export type TClaimFileList = {
    "file_list": TClaim[],
    "user_id": string,
    "id": number,
    "status": number,
    "created_at": string,
    "updated_at": string,
    "deleted_at": string
}
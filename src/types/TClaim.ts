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

export type TClaimCreateSuccess = {
    "file_list": TClaim[]
}
export interface Comment {
    id: number
    parentCommentId: number | string | null
    ownerId: number
    txt: string
    createdAt: string | Date
    deletedAt: number | string | null
    replies?: Array<Comment>
}


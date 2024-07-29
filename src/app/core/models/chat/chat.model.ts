export interface ChatResponse {
    createdAt: string;
    isQuestion: boolean;
    text: string;
    updatedAt: string;
    user: string;
}

export interface ConversationsRequest{
    name:string;
    description:string;
    messages:any[];
    mail:string;
}

export interface ConversationResponse{
    name:string;
    description:string;
    id:string;
}
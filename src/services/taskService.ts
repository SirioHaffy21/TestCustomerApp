export interface Transaction {
    TRANSACTION_ID?: number;
    TRANSACTION_NAME:string;
    TRANSACTION_DESCRIPTION:string;
    transaction_user: string;
    priority: number,
    status: number,
    transaction_type_id: number
}
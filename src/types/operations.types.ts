export type OperationResult = {
    success?: OperationSuccess
    error?: OperationError
}

export type OperationSuccess = {
    message: string
    data?: unknown
}

export type OperationError = {
    message: string,
    status: number
}

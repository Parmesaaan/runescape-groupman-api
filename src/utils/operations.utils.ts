import {OperationResult} from "../types";

export const opSuccess = (data: unknown, message = 'ok'): OperationResult => {
    return {
        success: {
            message,
            data,
        },
    }
}

export const opFailure = (status = 500, message = 'something went wrong'): OperationResult => {
    return {
        error: {
            message,
            status,
        },
    }
}

export const isOpSuccess = (result: OperationResult): boolean => {
    return 'success' in result
}

export const isOpFailure = (result: OperationResult): boolean => {
    return 'error' in result
}
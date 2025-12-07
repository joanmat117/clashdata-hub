class AppError extends Error {

    statusCode:number
    isOperational:boolean

    constructor(message:string, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true; // Indica que es un error esperado
        Error.captureStackTrace(this, this.constructor);
    }
}

class ValidationError extends AppError {
    constructor(message:string) {
        super(message, 400);
        this.name = 'ValidationError';
    }
}

class NotFoundError extends AppError {
    constructor(message:string) {
        super(message, 404);
        this.name = 'NotFoundError';
    }
}

class DatabaseError extends AppError {

    originalError:any  

    constructor(message:string, originalError:any) {
        super(message, 500);
        this.name = 'DatabaseError';
        this.originalError = originalError;
    }
}

export {
    AppError,
    ValidationError,
    NotFoundError,
    DatabaseError
};

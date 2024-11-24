import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error("Unhandled error:", {
        message: err.message,
        stack: err.stack,
    });

    res.status(500).json({ error: 'An error occurred, please try again.' });
};

export default errorHandler;

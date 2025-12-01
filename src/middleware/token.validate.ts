import type { NextFunction, Request, Response } from "express";

export const tokenValidator = (excludedPaths: ExcludedPath[]) => (req: Request, res: Response, next: NextFunction) => {
    try {
        if (excludedPaths.some(e => req.url.includes(e.url) && req.method === e.method)) return next();
        // we will validate token here of the user
        next();
            // next({message: "Token is invalid", statusCode: 401});
    } catch (error) {
        next(error);
    }
}


export class ExcludedPath {
    url:string;
    method:string;
    excludeFromExcludePath:string[];
    constructor(url:string, method:string, ...excludeFromExcludePath:string[]) {
        this.url = url;
        this.method = method;
        this.excludeFromExcludePath = excludeFromExcludePath;
    }
}
import { Request } from "express";
export declare class MongoChangeStreamService {
    private readonly request;
    private readonly client;
    private changeStream;
    constructor(request: Request);
    initChangeStream(): Promise<void>;
    closeConnection(): void;
    getAuthenticatedUserId(): any;
}

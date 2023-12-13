import { User } from "src/models/user.model";
import { Model } from "mongoose";
export declare class TaskService {
    private userModel;
    constructor(userModel: Model<User>);
    removeInactiveUser: () => void;
}

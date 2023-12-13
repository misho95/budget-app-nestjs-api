"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoChangeStreamService = void 0;
const common_1 = require("@nestjs/common");
const mongodb_1 = require("mongodb");
let MongoChangeStreamService = class MongoChangeStreamService {
    constructor(request) {
        this.request = request;
        this.client = new mongodb_1.MongoClient("your_mongodb_connection_string");
        this.initChangeStream();
    }
    async initChangeStream() {
        await this.client.connect();
        const db = this.client.db("your_database_name");
        const collection = db.collection("chat");
        const userId = this.getAuthenticatedUserId();
        const filter = [{ $match: { "fullDocument.sendTo": userId } }];
        this.changeStream = collection.watch(filter);
        this.changeStream.on("change", (change) => {
            console.log("Change occurred:", change);
        });
    }
    closeConnection() {
        this.client.close();
    }
    getAuthenticatedUserId() {
        return this.request.userId;
    }
};
exports.MongoChangeStreamService = MongoChangeStreamService;
exports.MongoChangeStreamService = MongoChangeStreamService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(common_1.REQUEST)),
    __metadata("design:paramtypes", [Object])
], MongoChangeStreamService);
//# sourceMappingURL=listen.mongodb.change.js.map
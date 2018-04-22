"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const mongodb_1 = require("mongodb");
class DbConnect {
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            const MONGO_URI = 'mongodb://localhost:27017/doit_db';
            try {
                this.db = yield mongodb_1.MongoClient.connect(MONGO_URI || process.env.MONGODB_URI, (err, res) => {
                    if (err)
                        throw err;
                    console.log('Connected to db');
                    return res;
                });
            }
            catch (error) {
                console.log('Unable to connect to db, error -> ', error);
            }
        });
    }
}
module.exports = new DbConnect();

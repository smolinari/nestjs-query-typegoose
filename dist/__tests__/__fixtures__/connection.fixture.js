"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeDbConnection = exports.prepareDb = exports.dropDatabase = exports.getConnectionUri = void 0;
const mongoose_1 = require("mongoose");
const mongodb_memory_server_1 = require("mongodb-memory-server");
const seeds_1 = require("./seeds");
const mongoServer = new mongodb_memory_server_1.MongoMemoryServer();
function getConnectionUri() {
    return mongoServer.getUri();
}
exports.getConnectionUri = getConnectionUri;
exports.dropDatabase = async () => {
    await mongoose_1.connections[mongoose_1.connections.length - 1].dropDatabase();
};
exports.prepareDb = async () => {
    await seeds_1.seed(mongoose_1.connections[mongoose_1.connections.length - 1]);
};
exports.closeDbConnection = async () => {
    await mongoose_1.connections[mongoose_1.connections.length - 1].close();
    await mongoServer.stop();
};
//# sourceMappingURL=connection.fixture.js.map
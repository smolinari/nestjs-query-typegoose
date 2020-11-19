"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTypegooseQueryServiceProviders = void 0;
const core_1 = require("@nestjs-query/core");
const typegoose_query_service_1 = require("./services/typegoose-query-service");
function createTypegooseQueryServiceProvider(model) {
    return {
        provide: core_1.getQueryServiceToken(model),
        useFactory(ModelClass) {
            // initialize default serializer for documents, this is the type that mongoose returns from queries
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            core_1.AssemblerSerializer((obj) => obj.toObject({ virtuals: true }))(ModelClass);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            core_1.AssemblerDeserializer((obj) => new ModelClass(obj))(model);
            return new typegoose_query_service_1.TypegooseQueryService(ModelClass);
        },
        inject: [`${model.name}Model`],
    };
}
exports.createTypegooseQueryServiceProviders = (models) => {
    return models.map((model) => createTypegooseQueryServiceProvider(model));
};
//# sourceMappingURL=providers.js.map
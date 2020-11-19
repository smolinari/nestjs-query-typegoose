"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestjsQueryTypegooseModule = void 0;
const nestjs_typegoose_1 = require("nestjs-typegoose");
const providers_1 = require("./providers");
class NestjsQueryTypegooseModule {
    static forFeature(models, connectionName) {
        const queryServiceProviders = providers_1.createTypegooseQueryServiceProviders(models);
        const typegooseModule = nestjs_typegoose_1.TypegooseModule.forFeature(models, connectionName);
        return {
            imports: [typegooseModule],
            module: NestjsQueryTypegooseModule,
            providers: [...queryServiceProviders],
            exports: [...queryServiceProviders, typegooseModule],
        };
    }
}
exports.NestjsQueryTypegooseModule = NestjsQueryTypegooseModule;
//# sourceMappingURL=module.js.map
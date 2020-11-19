"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs-query/core");
const ts_mockito_1 = require("ts-mockito");
const mongoose_1 = require("mongoose");
const services_1 = require("../src/services");
const providers_1 = require("../src/providers");
describe('createTypegooseQueryServiceProviders', () => {
    it('should create a provider for the entity', () => {
        class TestEntity extends mongoose_1.Document {
        }
        const providers = providers_1.createTypegooseQueryServiceProviders([TestEntity]);
        expect(providers).toHaveLength(1);
        expect(providers[0].provide).toBe(core_1.getQueryServiceToken(TestEntity));
        expect(providers[0].inject).toEqual([`${TestEntity.name}Model`]);
        expect(providers[0].useFactory(ts_mockito_1.instance(() => { }))).toBeInstanceOf(services_1.TypegooseQueryService);
    });
});
//# sourceMappingURL=providers.spec.js.map
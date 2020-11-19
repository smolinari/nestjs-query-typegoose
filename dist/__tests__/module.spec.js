"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
const __fixtures__1 = require("./__fixtures__");
describe('NestjsQueryTypegooseModule', () => {
    it('should create a module', () => {
        const typegooseModule = src_1.NestjsQueryTypegooseModule.forFeature([__fixtures__1.TestEntity]);
        expect(typegooseModule.imports).toHaveLength(1);
        expect(typegooseModule.module).toBe(src_1.NestjsQueryTypegooseModule);
        expect(typegooseModule.providers).toHaveLength(1);
        expect(typegooseModule.exports).toHaveLength(2);
    });
});
//# sourceMappingURL=module.spec.js.map
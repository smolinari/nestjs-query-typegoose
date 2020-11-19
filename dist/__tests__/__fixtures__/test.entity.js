"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEntity = void 0;
const tslib_1 = require("tslib");
const defaultClasses_1 = require("@typegoose/typegoose/lib/defaultClasses");
const typegoose_1 = require("@typegoose/typegoose");
const test_reference_entity_1 = require("./test-reference.entity");
let TestEntity = class TestEntity extends defaultClasses_1.Base {
    get id() {
        // eslint-disable-next-line no-underscore-dangle
        return this._id.toHexString();
    }
};
tslib_1.__decorate([
    typegoose_1.prop({ required: true }),
    tslib_1.__metadata("design:type", String)
], TestEntity.prototype, "stringType", void 0);
tslib_1.__decorate([
    typegoose_1.prop({ required: true }),
    tslib_1.__metadata("design:type", Boolean)
], TestEntity.prototype, "boolType", void 0);
tslib_1.__decorate([
    typegoose_1.prop({ required: true }),
    tslib_1.__metadata("design:type", Number)
], TestEntity.prototype, "numberType", void 0);
tslib_1.__decorate([
    typegoose_1.prop({ required: true }),
    tslib_1.__metadata("design:type", Date)
], TestEntity.prototype, "dateType", void 0);
tslib_1.__decorate([
    typegoose_1.prop({ ref: test_reference_entity_1.TestReference, required: false }),
    tslib_1.__metadata("design:type", Object)
], TestEntity.prototype, "testReference", void 0);
tslib_1.__decorate([
    typegoose_1.prop({ ref: test_reference_entity_1.TestReference, required: false }),
    tslib_1.__metadata("design:type", Array)
], TestEntity.prototype, "testReferences", void 0);
tslib_1.__decorate([
    typegoose_1.prop({
        ref: 'TestReference',
        localField: '_id',
        foreignField: 'testEntity',
    }),
    tslib_1.__metadata("design:type", Array)
], TestEntity.prototype, "virtualTestReferences", void 0);
TestEntity = tslib_1.__decorate([
    typegoose_1.modelOptions({
        schemaOptions: {
            toObject: { virtuals: true },
        },
    })
], TestEntity);
exports.TestEntity = TestEntity;
//# sourceMappingURL=test.entity.js.map
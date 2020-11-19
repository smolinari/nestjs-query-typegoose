"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestReference = void 0;
const tslib_1 = require("tslib");
const typegoose_1 = require("@typegoose/typegoose");
const defaultClasses_1 = require("@typegoose/typegoose/lib/defaultClasses");
const test_entity_1 = require("./test.entity");
let TestReference = class TestReference extends defaultClasses_1.Base {
    get id() {
        // eslint-disable-next-line no-underscore-dangle
        return this._id.toHexString();
    }
};
tslib_1.__decorate([
    typegoose_1.prop({ required: true }),
    tslib_1.__metadata("design:type", String)
], TestReference.prototype, "referenceName", void 0);
tslib_1.__decorate([
    typegoose_1.prop({ ref: () => test_entity_1.TestEntity, required: false }),
    tslib_1.__metadata("design:type", Object)
], TestReference.prototype, "testEntity", void 0);
tslib_1.__decorate([
    typegoose_1.prop({
        ref: 'TestEntity',
        localField: 'testEntity',
        foreignField: '_id',
        justOne: true,
    }),
    tslib_1.__metadata("design:type", Object)
], TestReference.prototype, "virtualTestEntity", void 0);
TestReference = tslib_1.__decorate([
    typegoose_1.modelOptions({
        schemaOptions: {
            toObject: { virtuals: true },
        },
    })
], TestReference);
exports.TestReference = TestReference;
//# sourceMappingURL=test-reference.entity.js.map
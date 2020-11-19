"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = exports.TEST_REFERENCES = exports.TEST_ENTITIES = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const test_entity_1 = require("./test.entity");
const test_reference_entity_1 = require("./test-reference.entity");
exports.TEST_ENTITIES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => {
    return {
        boolType: i % 2 === 0,
        dateType: new Date(`2020-02-${i}`),
        numberType: i,
        stringType: `foo${i}`,
    };
});
exports.TEST_REFERENCES = exports.TEST_ENTITIES.reduce((relations, te) => {
    return [
        ...relations,
        {
            referenceName: `${te.stringType}-test-reference-1-one`,
        },
        {
            referenceName: `${te.stringType}-test-reference-2-two`,
        },
        {
            referenceName: `${te.stringType}-test-reference-3-three`,
        },
    ];
}, []);
exports.seed = async (connection) => {
    const TestEntityModel = typegoose_1.getModelForClass(test_entity_1.TestEntity);
    const TestReferencesModel = typegoose_1.getModelForClass(test_reference_entity_1.TestReference);
    const testEntities = await TestEntityModel.create(exports.TEST_ENTITIES);
    const testReferences = await TestReferencesModel.create(exports.TEST_REFERENCES);
    testEntities.forEach((te, index) => Object.assign(exports.TEST_ENTITIES[index], te.toObject({ virtuals: true })));
    testReferences.forEach((tr, index) => Object.assign(exports.TEST_REFERENCES[index], tr.toObject({ virtuals: true })));
    await Promise.all(testEntities.map(async (te, index) => {
        const references = testReferences.filter((tr) => tr.referenceName.includes(`${te.stringType}-`));
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        exports.TEST_ENTITIES[index].testReference = references[0]._id;
        exports.TEST_ENTITIES[index].testReferences = references.map((r) => r._id);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        await te.update({ $set: { testReferences: references.map((r) => r._id), testReference: references[0]._id } });
        await Promise.all(references.map((r) => {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
            exports.TEST_REFERENCES.find((tr) => tr._id.toString() === r._id.toString()).testEntity = te._id;
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            return r.update({ $set: { testEntity: te._id } });
        }));
    }));
};
//# sourceMappingURL=seeds.js.map
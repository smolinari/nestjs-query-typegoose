"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../src/query");
describe('WhereBuilder', () => {
    const createWhereBuilder = () => new query_1.WhereBuilder();
    const assertFilterQuery = (filter, expectedFilterQuery) => {
        const actual = createWhereBuilder().build(filter);
        expect(actual).toEqual(expectedFilterQuery);
    };
    it('should accept a empty filter', () => {
        assertFilterQuery({}, {});
    });
    it('or multiple operators for a single field together', () => {
        assertFilterQuery({
            numberType: { gt: 10, lt: 20, gte: 21, lte: 31 },
        }, {
            $and: [
                {
                    $or: [
                        { numberType: { $gt: 10 } },
                        { numberType: { $lt: 20 } },
                        { numberType: { $gte: 21 } },
                        { numberType: { $lte: 31 } },
                    ],
                },
            ],
        });
    });
    it('and multiple field comparisons together', () => {
        assertFilterQuery({
            numberType: { eq: 1 },
            stringType: { like: 'foo%' },
            boolType: { is: true },
        }, {
            $and: [
                {
                    $and: [{ numberType: { $eq: 1 } }, { stringType: { $regex: /foo.*/ } }, { boolType: { $eq: true } }],
                },
            ],
        });
    });
    describe('and', () => {
        it('and multiple expressions together', () => {
            assertFilterQuery({
                and: [
                    { numberType: { gt: 10 } },
                    { numberType: { lt: 20 } },
                    { numberType: { gte: 30 } },
                    { numberType: { lte: 40 } },
                ],
            }, {
                $and: [
                    { $and: [{ numberType: { $gt: 10 } }] },
                    { $and: [{ numberType: { $lt: 20 } }] },
                    { $and: [{ numberType: { $gte: 30 } }] },
                    { $and: [{ numberType: { $lte: 40 } }] },
                ],
            });
        });
        it('and multiple filters together with multiple fields', () => {
            assertFilterQuery({
                and: [
                    { numberType: { gt: 10 }, stringType: { like: 'foo%' } },
                    { numberType: { lt: 20 }, stringType: { like: '%bar' } },
                ],
            }, {
                $and: [
                    { $and: [{ $and: [{ numberType: { $gt: 10 } }, { stringType: { $regex: /foo.*/ } }] }] },
                    { $and: [{ $and: [{ numberType: { $lt: 20 } }, { stringType: { $regex: /.*bar/ } }] }] },
                ],
            });
        });
        it('should support nested ors', () => {
            assertFilterQuery({
                and: [
                    { or: [{ numberType: { gt: 10 } }, { numberType: { lt: 20 } }] },
                    { or: [{ numberType: { gte: 30 } }, { numberType: { lte: 40 } }] },
                ],
            }, {
                $and: [
                    {
                        $or: [{ $and: [{ numberType: { $gt: 10 } }] }, { $and: [{ numberType: { $lt: 20 } }] }],
                    },
                    {
                        $or: [{ $and: [{ numberType: { $gte: 30 } }] }, { $and: [{ numberType: { $lte: 40 } }] }],
                    },
                ],
            });
        });
    });
    describe('or', () => {
        it('or multiple expressions together', () => {
            assertFilterQuery({
                or: [
                    { numberType: { gt: 10 } },
                    { numberType: { lt: 20 } },
                    { numberType: { gte: 30 } },
                    { numberType: { lte: 40 } },
                ],
            }, {
                $or: [
                    { $and: [{ numberType: { $gt: 10 } }] },
                    { $and: [{ numberType: { $lt: 20 } }] },
                    { $and: [{ numberType: { $gte: 30 } }] },
                    { $and: [{ numberType: { $lte: 40 } }] },
                ],
            });
        });
        it('and multiple and filters together', () => {
            assertFilterQuery({
                or: [
                    { numberType: { gt: 10 }, stringType: { like: 'foo%' } },
                    { numberType: { lt: 20 }, stringType: { like: '%bar' } },
                ],
            }, {
                $or: [
                    {
                        $and: [
                            {
                                $and: [{ numberType: { $gt: 10 } }, { stringType: { $regex: /foo.*/ } }],
                            },
                        ],
                    },
                    {
                        $and: [
                            {
                                $and: [{ numberType: { $lt: 20 } }, { stringType: { $regex: /.*bar/ } }],
                            },
                        ],
                    },
                ],
            });
        });
        it('should support nested ands', () => {
            assertFilterQuery({
                or: [
                    { and: [{ numberType: { gt: 10 } }, { numberType: { lt: 20 } }] },
                    { and: [{ numberType: { gte: 30 } }, { numberType: { lte: 40 } }] },
                ],
            }, {
                $or: [
                    {
                        $and: [{ $and: [{ numberType: { $gt: 10 } }] }, { $and: [{ numberType: { $lt: 20 } }] }],
                    },
                    {
                        $and: [{ $and: [{ numberType: { $gte: 30 } }] }, { $and: [{ numberType: { $lte: 40 } }] }],
                    },
                ],
            });
        });
    });
});
//# sourceMappingURL=where.builder.spec.js.map
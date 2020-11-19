"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregateBuilder = void 0;
const common_1 = require("@nestjs/common");
const helpers_1 = require("./helpers");
var AggregateFuncs;
(function (AggregateFuncs) {
    AggregateFuncs["AVG"] = "avg";
    AggregateFuncs["SUM"] = "sum";
    AggregateFuncs["COUNT"] = "count";
    AggregateFuncs["MAX"] = "max";
    AggregateFuncs["MIN"] = "min";
})(AggregateFuncs || (AggregateFuncs = {}));
const AGG_REGEXP = /(avg|sum|count|max|min)_(.*)/;
/**
 * @internal
 * Builds a WHERE clause from a Filter.
 */
class AggregateBuilder {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    static convertToAggregateResponse({ _id, ...response }) {
        return Object.keys(response).reduce((agg, resultField) => {
            const matchResult = AGG_REGEXP.exec(resultField);
            if (!matchResult) {
                throw new Error('Unknown aggregate column encountered.');
            }
            const [matchedFunc, matchedFieldName] = matchResult.slice(1);
            const aggFunc = matchedFunc.toLowerCase();
            const fieldName = matchedFieldName;
            const aggResult = agg[aggFunc] || {};
            return {
                ...agg,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                [aggFunc]: { ...aggResult, [fieldName]: response[resultField] },
            };
        }, {});
    }
    /**
     * Builds a aggregate SELECT clause from a aggregate.
     * @param aggregate - the aggregates to select.
     */
    build(aggregate) {
        const query = {
            ...this.createAggSelect(AggregateFuncs.COUNT, aggregate.count),
            ...this.createAggSelect(AggregateFuncs.SUM, aggregate.sum),
            ...this.createAggSelect(AggregateFuncs.AVG, aggregate.avg),
            ...this.createAggSelect(AggregateFuncs.MAX, aggregate.max),
            ...this.createAggSelect(AggregateFuncs.MIN, aggregate.min),
        };
        if (!Object.keys(query).length) {
            throw new common_1.BadRequestException('No aggregate fields found.');
        }
        return query;
    }
    createAggSelect(func, fields) {
        if (!fields) {
            return {};
        }
        return fields.reduce((agg, field) => {
            const aggAlias = `${func}_${field}`;
            const fieldAlias = `$${helpers_1.getSchemaKey(String(field))}`;
            if (func === 'count') {
                return {
                    ...agg,
                    [aggAlias]: {
                        $sum: {
                            $cond: {
                                if: { $in: [{ $type: fieldAlias }, ['missing', 'null']] },
                                then: 0,
                                else: 1,
                            },
                        },
                    },
                };
            }
            return { ...agg, [aggAlias]: { [`$${func}`]: fieldAlias } };
        }, {});
    }
}
exports.AggregateBuilder = AggregateBuilder;
//# sourceMappingURL=aggregate.builder.js.map
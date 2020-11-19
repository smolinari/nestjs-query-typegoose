"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComparisonBuilder = void 0;
const tslib_1 = require("tslib");
const lodash_escaperegexp_1 = tslib_1.__importDefault(require("lodash.escaperegexp"));
const helpers_1 = require("./helpers");
/**
 * @internal
 * Builder to create SQL Comparisons. (=, !=, \>, etc...)
 */
class ComparisonBuilder {
    constructor(comparisonMap = ComparisonBuilder.DEFAULT_COMPARISON_MAP) {
        this.comparisonMap = comparisonMap;
    }
    /**
     * Creates a valid SQL fragment with parameters.
     *
     * @param field - the property in Entity to create the comparison for.
     * @param cmp - the FilterComparisonOperator (eq, neq, gt, etc...)
     * @param val - the value to compare to.
     */
    build(field, cmp, val) {
        const schemaKey = helpers_1.getSchemaKey(`${String(field)}`);
        const normalizedCmp = cmp.toLowerCase();
        let querySelector;
        if (this.comparisonMap[normalizedCmp]) {
            // comparison operator (e.b. =, !=, >, <)
            querySelector = { [this.comparisonMap[normalizedCmp]]: val };
        }
        if (normalizedCmp.includes('like')) {
            querySelector = this.likeComparison(normalizedCmp, val);
        }
        if (normalizedCmp === 'between') {
            // between comparison (field BETWEEN x AND y)
            querySelector = this.betweenComparison(val);
        }
        if (normalizedCmp === 'notbetween') {
            // notBetween comparison (field NOT BETWEEN x AND y)
            querySelector = this.notBetweenComparison(val);
        }
        if (!querySelector) {
            throw new Error(`unknown operator ${JSON.stringify(cmp)}`);
        }
        return { [schemaKey]: querySelector };
    }
    betweenComparison(val) {
        if (this.isBetweenVal(val)) {
            return { $gte: val.lower, $lte: val.upper };
        }
        throw new Error(`Invalid value for between expected {lower: val, upper: val} got ${JSON.stringify(val)}`);
    }
    notBetweenComparison(val) {
        if (this.isBetweenVal(val)) {
            return { $lt: val.lower, $gt: val.upper };
        }
        throw new Error(`Invalid value for not between expected {lower: val, upper: val} got ${JSON.stringify(val)}`);
    }
    isBetweenVal(val) {
        return val !== null && typeof val === 'object' && 'lower' in val && 'upper' in val;
    }
    likeComparison(cmp, val) {
        const regExpStr = lodash_escaperegexp_1.default(`${String(val)}`).replace(/%/g, '.*');
        const regExp = new RegExp(regExpStr, cmp.includes('ilike') ? 'i' : undefined);
        if (cmp.startsWith('not')) {
            return { $not: { $regex: regExp } };
        }
        return { $regex: regExp };
    }
}
exports.ComparisonBuilder = ComparisonBuilder;
ComparisonBuilder.DEFAULT_COMPARISON_MAP = {
    eq: '$eq',
    neq: '$ne',
    gt: '$gt',
    gte: '$gte',
    lt: '$lt',
    lte: '$lte',
    in: '$in',
    notin: '$nin',
    is: '$eq',
    isnot: '$ne',
};
//# sourceMappingURL=comparison.builder.js.map
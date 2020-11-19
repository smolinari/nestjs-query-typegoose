import { AggregateQuery, AggregateResponse } from '@nestjs-query/core';
import { DocumentType } from '@typegoose/typegoose';
export declare type TypegooseAggregate = {
    [k: string]: {
        [o: string]: unknown;
    };
};
/**
 * @internal
 * Builds a WHERE clause from a Filter.
 */
export declare class AggregateBuilder<Entity> {
    static convertToAggregateResponse<Entity>({ _id, ...response }: Record<string, unknown>): AggregateResponse<Entity>;
    /**
     * Builds a aggregate SELECT clause from a aggregate.
     * @param aggregate - the aggregates to select.
     */
    build(aggregate: AggregateQuery<DocumentType<Entity>>): TypegooseAggregate;
    private createAggSelect;
}

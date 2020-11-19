import { AggregateQuery, Filter, Query, SortField } from '@nestjs-query/core';
import { FilterQuery } from 'mongoose';
import { DocumentType } from '@typegoose/typegoose';
import { AggregateBuilder, TypegooseAggregate } from './aggregate.builder';
import { WhereBuilder } from './where.builder';
declare type TypegooseSort = Record<string, 'asc' | 'desc'>;
declare type TypegooseQuery<Entity> = {
    filterQuery: FilterQuery<new () => Entity>;
    options: {
        limit?: number;
        skip?: number;
        sort?: TypegooseSort[];
    };
};
declare type TypegooseAggregateQuery<Entity> = {
    filterQuery: FilterQuery<Entity>;
    aggregate: TypegooseAggregate;
};
/**
 * @internal
 *
 * Class that will convert a Query into a `typeorm` Query Builder.
 */
export declare class FilterQueryBuilder<Entity> {
    readonly whereBuilder: WhereBuilder<Entity>;
    readonly aggregateBuilder: AggregateBuilder<Entity>;
    constructor(whereBuilder?: WhereBuilder<Entity>, aggregateBuilder?: AggregateBuilder<Entity>);
    buildQuery({ filter, paging, sorting }: Query<Entity>): TypegooseQuery<Entity>;
    buildAggregateQuery(aggregate: AggregateQuery<DocumentType<Entity>>, filter?: Filter<Entity>): TypegooseAggregateQuery<Entity>;
    buildIdAggregateQuery(id: unknown | unknown[], filter: Filter<Entity>, aggregate: AggregateQuery<Entity>): TypegooseAggregateQuery<Entity>;
    buildIdFilterQuery(id: unknown | unknown[], filter?: Filter<Entity>): FilterQuery<new () => Entity>;
    /**
     * Applies the filter from a Query to a `typeorm` QueryBuilder.
     *
     * @param filter - the filter.
     */
    buildFilterQuery(filter?: Filter<Entity>): FilterQuery<new () => Entity>;
    /**
     * Applies the ORDER BY clause to a `typeorm` QueryBuilder.
     * @param sorts - an array of SortFields to create the ORDER BY clause.
     */
    buildSorting(sorts?: SortField<Entity>[]): TypegooseSort[];
}
export {};

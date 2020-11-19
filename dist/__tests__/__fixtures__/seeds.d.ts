import { Connection } from 'mongoose';
import { DocumentType } from '@typegoose/typegoose';
import { TestEntity } from './test.entity';
import { TestReference } from './test-reference.entity';
export declare const TEST_ENTITIES: DocumentType<TestEntity>[];
export declare const TEST_REFERENCES: DocumentType<TestReference>[];
export declare const seed: (connection: Connection) => Promise<void>;

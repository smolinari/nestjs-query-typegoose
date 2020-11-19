import { Base } from '@typegoose/typegoose/lib/defaultClasses';
import { Ref } from '@typegoose/typegoose';
import { TestReference } from './test-reference.entity';
export declare class TestEntity extends Base {
    stringType: string;
    boolType: boolean;
    numberType: number;
    dateType: Date;
    testReference?: Ref<TestReference>;
    testReferences?: Ref<TestReference>[];
    virtualTestReferences?: Ref<TestReference>[];
    get id(): string;
}

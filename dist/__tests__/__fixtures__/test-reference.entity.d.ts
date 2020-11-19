import { Ref } from '@typegoose/typegoose';
import { Base } from '@typegoose/typegoose/lib/defaultClasses';
import { TestEntity } from './test.entity';
export declare class TestReference extends Base {
    referenceName: string;
    testEntity?: Ref<TestEntity>;
    virtualTestEntity?: Ref<TestEntity>;
    get id(): string;
}

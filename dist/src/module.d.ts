import { DynamicModule } from '@nestjs/common';
import { TypegooseClass } from 'nestjs-typegoose/dist/typegoose-class.interface';
export declare class NestjsQueryTypegooseModule {
    static forFeature(models: TypegooseClass[], connectionName?: string): DynamicModule;
}

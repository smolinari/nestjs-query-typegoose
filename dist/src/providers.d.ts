import { FactoryProvider } from '@nestjs/common';
import { TypegooseClass } from 'nestjs-typegoose/dist/typegoose-class.interface';
export declare const createTypegooseQueryServiceProviders: (models: TypegooseClass[]) => FactoryProvider[];

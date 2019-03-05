import { prop, Typegoose, instanceMethod } from 'typegoose';
import { ApplicationKeys } from './exported.types';

/* ---------------------------------------------------------------------------------------------------------------
   KeyPair
   ---------------------------------------------------------------------------------------------------------------*/
export class KeyPairModel extends Typegoose {
    @prop()
    application: string;
    @prop()
    privateKey: string;
    @prop()
    publicKey: string;
    @prop()
    dateGenerated: string;

    @instanceMethod
    public asExportedType(): ApplicationKeys {
        return new ApplicationKeys(
            this.application,
            this.privateKey,
            this.publicKey,
            this.dateGenerated,
            ''
        );
    }
}
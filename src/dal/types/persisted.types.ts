import { prop, Typegoose, instanceMethod } from 'typegoose';
import { KeyPair } from './exported.types';

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
    public asExportedType(): KeyPair {
        return new KeyPair(
            this.application,
            this.privateKey,
            this.publicKey,
            this.dateGenerated
        );
    }
}
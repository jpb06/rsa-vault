import * as mongoose from 'mongoose';

import { KeyPairModel } from './../types/persisted.types';
import { KeyPair } from './../types/exported.types';
import { DalConfiguration } from './../configuration/dal.configuration';

export abstract class KeyPairStore {
    public static async Save(
        data: KeyPair
    ): Promise<boolean> {
        await mongoose.connect(DalConfiguration.GetURI(), {
            useNewUrlParser: true
        });
        let db = mongoose.connection;

        try {
            const Model = new KeyPairModel().getModelForClass(KeyPairModel);

            let keyPair = new Model({
                application: data.application,
                dateGenerated: data.dateGenerated,
                publicKey: data.publicKey,
                privateKey: data.privateKey
            });

            await keyPair.save();

            return true;
        } finally {
            db.close();
        }
    }

    public static async GetAll(
        application: string
    ): Promise<Array<KeyPair>>  {
        await mongoose.connect(DalConfiguration.GetURI(), {
            useNewUrlParser: true
        });
        let db = mongoose.connection;

        try {
            const Model = new KeyPairModel().getModelForClass(KeyPairModel);

            let data = await Model
                .find({ 'application': application })
                .select('application privateKey publicKey dateGenerated')
                .sort('-dateGenerated')
                .exec();

            return data.map(el => el.asExportedType());

        } finally {
            db.close();
        }
    }

    public static async RemoveOldest(
        application: string
    ): Promise<boolean> {
        await mongoose.connect(DalConfiguration.GetURI(), {
            useNewUrlParser: true
        });
        let db = mongoose.connection;

        try {
            const Model = new KeyPairModel().getModelForClass(KeyPairModel);

            let data = await Model
                .findOne()
                .sort('-dateGenerated')
                .remove()
                .exec();
    
            return true;
        } finally {
            db.close();
        }
    }
}
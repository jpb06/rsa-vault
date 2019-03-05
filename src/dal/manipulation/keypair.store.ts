import * as mongoose from 'mongoose';

import { KeyPairModel } from './../types/persisted.types';
import { ApplicationKeys } from './../types/exported.types';
import { DalConfiguration } from './../configuration/dal.configuration';
import { ObjectId } from 'bson';

export abstract class KeyPairStore {

    public static async Save(
        data: ApplicationKeys
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
    ): Promise<Array<ApplicationKeys>>  {
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
                .findOne({ application: application })
                .sort('-dateGenerated')
                .remove()
                .exec();
    
            return true;
        } finally {
            db.close();
        }
    }

    public static async RemoveAllButRecent(
        application: string,
        recentEntriesToKeepCount: number
    ): Promise<boolean> {
        await mongoose.connect(DalConfiguration.GetURI(), {
            useNewUrlParser: true
        });
        let db = mongoose.connection;

        try {
            const Model = new KeyPairModel().getModelForClass(KeyPairModel);

            let entriesToKeep = await Model
                .find({ application: application })
                .sort('-dateGenerated')
                .skip(recentEntriesToKeepCount)
                .select('_id')
                .lean()
                .exec() as Array<ObjectId>;

            let result = await Model.deleteMany({ application: application, _id: { $in: entriesToKeep } });

            return result.ok === 1;
        } finally {
            db.close();
        }
    }
}
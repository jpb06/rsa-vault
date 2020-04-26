import * as mongoose from "mongoose";

import { KeyPairModel } from "./../types/persisted.types";
import { ApplicationKeys } from "./../types/exported.types";
import { DalConfiguration } from "./../configuration/dal.configuration";
import { ObjectId } from "bson";
import { getModelForClass } from "@typegoose/typegoose";

export abstract class KeyPairStore {
  public static async Save(data: ApplicationKeys): Promise<boolean> {
    await mongoose.connect(DalConfiguration.GetURI(), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    try {
      const Model = getModelForClass(KeyPairModel);

      const keyPair = new Model({
        application: data.application,
        dateGenerated: data.dateGenerated,
        publicKey: data.publicKey,
        privateKey: data.privateKey,
      });

      await keyPair.save();

      return true;
    } catch (err) {
      return false;
    } finally {
      await mongoose.disconnect();
    }
  }

  public static async GetAll(
    application: string
  ): Promise<Array<ApplicationKeys>> {
    await mongoose.connect(DalConfiguration.GetURI(), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    try {
      const Model = getModelForClass(KeyPairModel);

      const data = await Model.find({ application: application })
        .select("application privateKey publicKey dateGenerated")
        .sort("-dateGenerated")
        .exec();

      return data.map((el) => el.asExportedType());
    } catch (err) {
      return [];
    } finally {
      await mongoose.disconnect();
    }
  }

  public static async RemoveAllButRecent(
    application: string,
    recentEntriesToKeepCount: number
  ): Promise<boolean> {
    await mongoose.connect(DalConfiguration.GetURI(), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    try {
      const Model = getModelForClass(KeyPairModel);

      const entriesToKeep = ((await Model.find({ application: application })
        .sort("-dateGenerated")
        .skip(recentEntriesToKeepCount)
        .select("_id")
        .lean()
        .exec()) as unknown) as Array<ObjectId>;

      const result = await Model.deleteMany({
        application: application,
        _id: { $in: entriesToKeep },
      });

      return result.ok === 1;
    } catch (err) {
      return false;
    } finally {
      await mongoose.disconnect();
    }
  }

  public static async RemoveAll(application: string): Promise<boolean> {
    await mongoose.connect(DalConfiguration.GetURI(), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    try {
      const Model = getModelForClass(KeyPairModel);

      const result = await Model.deleteMany({ application: application });

      return result.ok === 1;
    } catch (err) {
      return false;
    } finally {
      await mongoose.disconnect();
    }
  }
}

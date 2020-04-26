import * as moment from "moment";
import { ApplicationKeys } from "../types.export";
import { CacheService } from "./cache.service";
import { generateRSAKeys } from "./crypto.service";
import { KeyPairStore } from "../dal/manipulation/keypair.store";

const isNewPairRequired = (keys: Array<ApplicationKeys>) => {
  if (keys.length === 0) return true;

  const now = moment();
  const lastGenerated = moment(keys[0].dateGenerated);

  if (lastGenerated.add(15, "d").isBefore(now)) return true;

  return false;
};

export abstract class VaultService {
  public static async GetKeyPair(
    application: string
  ): Promise<ApplicationKeys> {
    const keys = await CacheService.GetKeyPairs(application);

    const newPairRequired = isNewPairRequired(keys);
    if (newPairRequired) {
      const keyPair = generateRSAKeys().forApplication(application);

      await KeyPairStore.Save(keyPair);
      await KeyPairStore.RemoveAllButRecent(application, 2);

      CacheService.AddKeyPair(application, keyPair);
    }

    if (keys.length > 1) {
      keys[0].previousPublicKey = keys[1].publicKey;
    }

    return keys[0];
  }
}

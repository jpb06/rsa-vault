import * as moment from 'moment';

import { ApplicationKeys } from "../types.export";
import { CacheService } from "./cache.service";
import { generateRSAKeys } from './crypto.service';
import { KeyPairStore } from '../dal/manipulation/keypair.store';

export abstract class VaultService {

    public static async GetKeyPair(
        application: string
    ): Promise<ApplicationKeys> {

        let keys = await CacheService.GetKeyPairs(application);

        let newPairRequired = false;
        if (keys.length > 0) {
            let now = moment();
            let lastGenerated = moment(keys[0].dateGenerated);

            if (lastGenerated.add(15, 'd').isBefore(now)) {
                newPairRequired = true;
            }
        } else if (keys.length === 0) {
            newPairRequired = true;
        }

        if (newPairRequired) {
            let keyPair = generateRSAKeys().forApplication(application);

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
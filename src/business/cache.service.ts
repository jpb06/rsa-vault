import * as moment from 'moment';

import { ApplicationKeys } from '../dal/types/exported.types';
import { KeyPairStore } from '../dal/manipulation/keypair.store';

interface Dictionary<T> {
    [Key: string]: T;
}

export abstract class CacheService {

    private static data: Dictionary<Array<ApplicationKeys>> = { };

    public static async GetKeyPairs(
        application: string
    ): Promise<Array<ApplicationKeys>> {

        let keys = this.data[application];
        if (keys === undefined) {
            keys = await KeyPairStore.GetAll(application);

            this.data[application] = keys;
        }
        
        return keys;
    }

    public static async AddKeyPair(
        application: string,
        applicationKeys: ApplicationKeys
    ): Promise<void> {
        
        let keys = this.data[application];
        if (keys === undefined) {
            this.data[application] = [applicationKeys];
        } else {
            this.data[application].unshift(applicationKeys);
        }
    }
}
import * as moment from 'moment';
import * as NodeRSA from 'node-rsa';

import { KeyPair } from './../dal/types/exported.types';
import { KeyPairStore } from './../dal/manipulation/keypair.store';

export abstract class CryptoService {
    public static async GetKeyPair(
        application: string
    ): Promise<KeyPair> {
        let keys = await KeyPairStore.GetAll(application);

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
            let keyPair = this.GenerateRSAKeys().forApplication(application);
            await KeyPairStore.Save(keyPair);
            keys.push(keyPair);
        }

        return keys[0];
    }

    private static GenerateRSAKeys(): KeyPair {
        const key = new NodeRSA();

        key.generateKeyPair(2048, 65537);
    
        const publicKey = key.exportKey('pkcs1-public-pem');
        const privatekey = key.exportKey('pkcs1-private-pem');

        return new KeyPair(
            '',
            privatekey,
            publicKey,
            moment().format()
        );
    }
}
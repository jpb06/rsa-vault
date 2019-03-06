import * as moment from 'moment';

import { KeyPairStore } from '../dal/manipulation/keypair.store';
import { ApplicationKeys } from '../dal/types/exported.types';
import { DalConfiguration } from '../dal/configuration/dal.configuration';
import { VaultService } from '../vault';

export async function liveTest() {
    DalConfiguration.Setup({
        srvIPAddress: 'localhost:27017',
        mongodbPort: 27017,
        rsaVaultDb: 'test',
        rsaVaultDbUsername: 'testusr',
        rsaVaultDbPassword: 'testo',
        mongoAuthDb: 'admin'
    });
    (async () => {
        try {
            
            //await KeyPairStore.Save(new KeyPair(
            //    'test', '1', '6', moment().add(5, 'd').format()
            //));
            //await KeyPairStore.Save(new KeyPair(
            //    'test', '2', '2', moment().add(1, 'y').format()
            //));
            //await KeyPairStore.Save(new KeyPair(
            //    'test', '3', '4', moment().add(15, 'd').format()
            //));
            //await KeyPairStore.Save(new KeyPair(
            //    'test', '4', '5', moment().add(10, 'd').format()
            //));
            //await KeyPairStore.Save(new KeyPair(
            //    'test', '5', '1', moment().add(2, 'y').format()
            //));
            //await KeyPairStore.Save(new KeyPair(
            //    'test', '6', '3', moment().add(25, 'd').format()
            //));
            //await KeyPairStore.Save(new KeyPair(
            //    'test1', 'nope', 'nope', moment().format()
            //));

          //  let all = await KeyPairStore.GetAll('test');

          //  let b = await KeyPairStore.RemoveAllButRecent('test', 2);

            let key = await VaultService.GetKeyPair('test');

            let stop = 0;
        } catch (err) {
            console.log(err);
        }
    })();
}
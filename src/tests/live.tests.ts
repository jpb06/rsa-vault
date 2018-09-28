import * as moment from 'moment';

import { KeyPairStore } from './../dal/manipulation/keypair.store';
import { KeyPair } from './../dal/types/exported.types';
import { DalConfiguration } from './../dal/configuration/dal.configuration';

export async function liveTest() {
    DalConfiguration.Setup('127.0.0.1:27017', 'test');
    (async () => {
        try {
            await KeyPairStore.Save(new KeyPair(
                'test', '1', '1', moment().add(5, 'd').format()
            ));
            await KeyPairStore.Save(new KeyPair(
                'test', '2', '2', moment().add(1, 'y').format()
            ));
            await KeyPairStore.Save(new KeyPair(
                'test', '3', '3', moment().add(15, 'd').format()
            ));

            let all = await KeyPairStore.GetAll('test');

            let a = 0;
        } catch (err) {
            console.log(err);
        }
    })();
}
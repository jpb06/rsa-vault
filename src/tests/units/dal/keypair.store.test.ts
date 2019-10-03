import { initAndClear, getMeAPreGeneratedKeyPair, verifyKeys } from '../../util/tests.helpers';
import { KeyPairStore } from '../../../dal/manipulation/keypair.store';
import * as moment from 'moment';

describe('keypair store', () => {
    it('should remove all entries', async () => {
        jest.setTimeout(10000);
        const app = 'RemoveAll';
        await initAndClear(app);

        const result = await KeyPairStore.RemoveAll(app);

        expect(result).toBe(true);

        const entries = await KeyPairStore.GetAll(app);
        expect(entries.length).toBe(0);
    });

    it('should save a keypair and get all entries', async () => {
        jest.setTimeout(20000);
        const app = 'Save & GetAll';
        await initAndClear(app);

        const keys = getMeAPreGeneratedKeyPair(app);

        const result = await KeyPairStore.Save(keys);

        const all = await KeyPairStore.GetAll(app);

        expect(result).toBe(true);
        expect(all.length).toBe(1);
        verifyKeys(all[0], keys);
    });

    test('should remove all but two most recent entries', async () => {
        jest.setTimeout(30000);
        const app = 'RemoveAllButRecent';
        await initAndClear(app);

        const keys1 = getMeAPreGeneratedKeyPair(app);
        const result1 = await KeyPairStore.Save(keys1);

        const keys2 = getMeAPreGeneratedKeyPair(app);
        keys2.dateGenerated = moment().add(-15, 'years').format();
        const result2 = await KeyPairStore.Save(keys2);

        const keys3 = getMeAPreGeneratedKeyPair(app);
        keys3.dateGenerated = moment().add(-10, 'years').format();
        const result3 = await KeyPairStore.Save(keys3);

        const removalResult = await KeyPairStore.RemoveAllButRecent(app, 2);

        const all = await KeyPairStore.GetAll(app);

        expect(result1).toBe(true);
        expect(result2).toBe(true);
        expect(result3).toBe(true);
        expect(removalResult).toBe(true);
        expect(all.length).toBe(2);
        expect(all[0].dateGenerated).toBe(keys1.dateGenerated);
        expect(all[1].dateGenerated).toBe(keys3.dateGenerated);
    });
});
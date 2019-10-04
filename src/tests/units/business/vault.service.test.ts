import { initAndClear, verifyEncryptionDecryption, verifyKeys } from "../../util/tests.helpers";
import { CacheService } from "../../../business/cache.service";
import { VaultService } from "../../../vault";
import { KeyPairStore } from "../../../dal/manipulation/keypair.store";
import { generateRSAKeys } from "../../../business/crypto.service";
import moment = require("moment");


describe('Vault service', () => {
    it('should get me a key pair when there is nothing in cache and dbase', async () => {
        jest.setTimeout(20000);
        const app = 'vault';

        await initAndClear(app);
        CacheService.Clear();

        const keys = await VaultService.GetKeyPair(app);

        verifyEncryptionDecryption(keys.privateKey);

        const persistedKeys = await KeyPairStore.GetAll(app);
        expect(persistedKeys.length).toBe(1);
        verifyKeys(persistedKeys[0], keys);
    });

    it('should get me a key pair from dbase when it is recent enough', async () => {
        jest.setTimeout(20000);
        const app = 'vaultdbaserecent';

        await initAndClear(app);
        CacheService.Clear();

        let keys = generateRSAKeys().forApplication(app);
        keys.dateGenerated = moment().add(-14, 'd').format();
        let result = await KeyPairStore.Save(keys);
        expect(result).toBe(true);

        const fetchedKeys = await VaultService.GetKeyPair(app);

        verifyEncryptionDecryption(fetchedKeys.privateKey);
        verifyKeys(fetchedKeys, keys);
    });

    it('should get me a new key pair when dbase has only outdated ones', async () => {
        jest.setTimeout(30000);
        const app = 'vaultdbaseoutdated';

        await initAndClear(app);
        CacheService.Clear();

        let keys = generateRSAKeys().forApplication(app);
        keys.dateGenerated = moment().add(-16, 'd').format();
        let result = await KeyPairStore.Save(keys);
        expect(result).toBe(true);

        const fetchedKeys = await VaultService.GetKeyPair(app);

        verifyEncryptionDecryption(fetchedKeys.privateKey);
        expect(moment(fetchedKeys.dateGenerated).isSame(new Date(), "day")).toBe(true);

        const persistedKeys = await KeyPairStore.GetAll(app);
        expect(persistedKeys.length).toBe(2);
    });

    it('should get me a key pair from cache', async () => {
        jest.setTimeout(30000);
        const app = 'vaultfromcache';

        await initAndClear(app);
        CacheService.Clear();

        let keys = generateRSAKeys().forApplication(app);
        keys.dateGenerated = moment().add(-10, 'd').format();
        let result1 = await KeyPairStore.Save(keys);
        expect(result1).toBe(true);

        let fetchedKeys = await VaultService.GetKeyPair(app);

        verifyEncryptionDecryption(fetchedKeys.privateKey);

        const result2 = await KeyPairStore.RemoveAll(app);
        expect(result2).toBe(true);

        let keys2 = generateRSAKeys().forApplication(app);
        keys.dateGenerated = moment().add(-5, 'd').format();
        let result3 = await KeyPairStore.Save(keys2);
        expect(result3).toBe(true);

        fetchedKeys = await VaultService.GetKeyPair(app);

        verifyEncryptionDecryption(fetchedKeys.privateKey);
        verifyKeys(fetchedKeys, keys);

        const persistedKeys = await KeyPairStore.GetAll(app);
        expect(persistedKeys.length).toBe(1);

        const cachedKeys = await CacheService.GetKeyPairs(app);
        expect(persistedKeys.length).toBe(1);
        verifyKeys(cachedKeys[0], keys);
    });
});
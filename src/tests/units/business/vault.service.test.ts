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
        jest.setTimeout(20000);
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
});
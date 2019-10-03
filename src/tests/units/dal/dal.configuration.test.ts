import { DalConfiguration } from "../../../dal/configuration/dal.configuration";

describe('Setup & verify', () => {
    it('should verify with no errors', async () => {
        DalConfiguration.Setup({
            srvIPAddress: 'localhost:27017',
            mongodbPort: 27017,
            rsaVaultDb: 'test',
            rsaVaultDbUsername: 'testusr',
            rsaVaultDbPassword: 'testo',
            mongoAuthDb: 'admin'
        });

        expect(DalConfiguration.Verify()).toBeUndefined();
    });

    it('should warn about missing url', async () => {
        DalConfiguration.Setup({
            srvIPAddress: '',
            mongodbPort: 27017,
            rsaVaultDb: 'test',
            rsaVaultDbUsername: 'testusr',
            rsaVaultDbPassword: 'testo',
            mongoAuthDb: 'admin'
        });

        expect(() => DalConfiguration.Verify()).toThrow('No url specified to access mongodb instance');
    });

    it('should warn about missing dbase', async () => {
        DalConfiguration.Setup({
            srvIPAddress: 'localhost:27017',
            mongodbPort: 27017,
            rsaVaultDb: '',
            rsaVaultDbUsername: 'testusr',
            rsaVaultDbPassword: 'testo',
            mongoAuthDb: 'admin'
        });

        expect(() => DalConfiguration.Verify()).toThrow('No database specified');
    });
});





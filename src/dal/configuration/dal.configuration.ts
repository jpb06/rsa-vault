export interface Config {
    "srvIPAddress": string,
    "mongodbPort": number,
    "rsaVaultDb": string,
    "rsaVaultDbUsername": string,
    "rsaVaultDbPassword": string,
    "mongoAuthDb": string
}

export abstract class DalConfiguration {
    private static url: string;
    private static database: string;

    private static username: string;
    private static password: string;
    private static authDb: string;

    public static Setup(
        config: Config
    ): void {
        this.url = config.srvIPAddress;
        this.database = config.rsaVaultDb;
        this.username = config.rsaVaultDbUsername;
        this.password = config.rsaVaultDbPassword;
        this.authDb = config.mongoAuthDb;
    }

    public static Verify(): void {
        if (this.url === undefined || this.url.length === 0) {
            throw new Error('No url specified to access mongodb instance');
        }

        if (this.database === undefined || this.url.length === 0) {
            throw new Error('No database specified');
        }
    }

    public static GetURI(): string {
        this.Verify();

        return `mongodb://${this.username}:${this.password}@${this.url}/${this.database}?authSource=${this.authDb}`;
    }
}
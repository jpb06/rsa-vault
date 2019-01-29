export abstract class DalConfiguration {
    private static url: string;
    private static database: string;

    private static username: string;
    private static password: string;
    private static authDb: string;

    public static Setup(
        url: string,
        database: string,
        username: string,
        password: string,
        authDb: string
    ): void {
        this.url = url;
        this.database = database;
        this.username = username;
        this.password = password;
        this.authDb = authDb;
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
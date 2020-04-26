export interface Config {
  srvIPAddress: string;
  mongodbPort: number;
  rsaVaultDb: string;
  rsaVaultDbUsername: string;
  rsaVaultDbPassword: string;
  mongoAuthDb: string;
}

export abstract class DalConfiguration {
  private static url: string;
  private static database: string;

  private static username: string;
  private static password: string;
  private static authDb: string;

  public static Setup(config: Config): void {
    DalConfiguration.url = config.srvIPAddress;
    DalConfiguration.database = config.rsaVaultDb;
    DalConfiguration.username = config.rsaVaultDbUsername;
    DalConfiguration.password = config.rsaVaultDbPassword;
    DalConfiguration.authDb = config.mongoAuthDb;
  }

  public static Verify(): void {
    if (!this.url || this.url.length === 0) {
      throw new Error("No url specified to access mongodb instance");
    }

    if (!this.database || this.database.length === 0) {
      throw new Error("No database specified");
    }
  }

  public static GetURI(): string {
    this.Verify();

    return `mongodb://${this.username}:${this.password}@${this.url}/${this.database}?authSource=${this.authDb}`;
  }
}

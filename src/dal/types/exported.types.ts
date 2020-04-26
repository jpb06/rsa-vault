/* ---------------------------------------------------------------------------------------------------------------
   Application keys
   ---------------------------------------------------------------------------------------------------------------*/
export class ApplicationKeys {
  application: string;

  privateKey: string;
  publicKey: string;
  dateGenerated: string;

  previousPublicKey: string;

  constructor(
    application: string,
    privateKey: string,
    publicKey: string,
    dateGenerated: string,
    previousPublicKey: string
  ) {
    this.application = application;
    this.privateKey = privateKey;
    this.publicKey = publicKey;
    this.dateGenerated = dateGenerated;
    this.previousPublicKey = previousPublicKey;
  }

  public forApplication(application: string): ApplicationKeys {
    this.application = application;

    return this;
  }
}

/* ---------------------------------------------------------------------------------------------------------------
   KeyPair
   ---------------------------------------------------------------------------------------------------------------*/
export class KeyPair {
    application: string;
    privateKey: string;
    publicKey: string;
    dateGenerated: string;

    constructor(
        application: string,
        privateKey: string,
        publicKey: string,
        dateGenerated: string
    ) {
        this.application = application;
        this.privateKey = privateKey;
        this.publicKey = publicKey;
        this.dateGenerated = dateGenerated;
    }

    public forApplication(
        application: string
    ): KeyPair {
        this.application = application;

        return this;
    }
}
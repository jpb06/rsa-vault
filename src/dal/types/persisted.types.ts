import { prop } from "@typegoose/typegoose";
import { ApplicationKeys } from "./exported.types";

/* ---------------------------------------------------------------------------------------------------------------
   KeyPair
   ---------------------------------------------------------------------------------------------------------------*/
export class KeyPairModel {
  @prop()
  application: string;
  @prop()
  privateKey: string;
  @prop()
  publicKey: string;
  @prop()
  dateGenerated: string;

  public asExportedType(): ApplicationKeys {
    return new ApplicationKeys(
      this.application,
      this.privateKey,
      this.publicKey,
      this.dateGenerated,
      ""
    );
  }
}

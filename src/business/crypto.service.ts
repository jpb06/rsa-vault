import * as moment from "moment";
import * as NodeRSA from "node-rsa";

import { ApplicationKeys } from "../dal/types/exported.types";

export function generateRSAKeys(): ApplicationKeys {
  const key = new NodeRSA();

  key.generateKeyPair(2048, 65537);

  const publicKey = key.exportKey("pkcs1-public-pem");
  const privatekey = key.exportKey("pkcs1-private-pem");

  return new ApplicationKeys("", privatekey, publicKey, moment().format(), "");
}

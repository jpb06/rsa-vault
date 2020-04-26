import { generateRSAKeys } from "../../../business/crypto.service";
import { verifyEncryptionDecryption } from "../../util/tests.helpers";

describe("Crypto service", () => {
  it("should generate a key pair", async () => {
    jest.setTimeout(10000);

    const keys = generateRSAKeys();

    expect(keys.privateKey).toContain("-----BEGIN RSA PRIVATE KEY-----");
    expect(keys.privateKey).toContain("-----END RSA PRIVATE KEY-----");

    expect(keys.publicKey).toContain("-----BEGIN RSA PUBLIC KEY-----");
    expect(keys.publicKey).toContain("-----END RSA PUBLIC KEY-----");

    verifyEncryptionDecryption(keys.privateKey);
  });
});

import { DalConfiguration } from "../../dal/configuration/dal.configuration";
import { KeyPairStore } from "../../dal/manipulation/keypair.store";
import * as moment from "moment";
import { ApplicationKeys } from "../../types.export";
import * as NodeRSA from "node-rsa";

const initAndClear = async (application: string) => {
  DalConfiguration.Setup({
    srvIPAddress: "localhost:27017",
    mongodbPort: 27017,
    rsaVaultDb: "test",
    rsaVaultDbUsername: "testusr",
    rsaVaultDbPassword: "testo",
    mongoAuthDb: "admin",
  });
  await KeyPairStore.RemoveAll(application);
};

const getMeAPreGeneratedKeyPair = (application: string) => {
  return new ApplicationKeys(
    application,
    "-----BEGIN RSA PRIVATE KEY-----MIIEpAIBAAKCAQEAtc9mokhLOSUhNEV8YQn67Qy72WT5AuHPWwtUleHdpRkGu0+zNutviihxpi/JphGrl1BUkmKTy5XMlOBU0JlntMOyx5XMaCyc6bz2o5zude/z17WwPcNKpDHmz1dAglrrZX1IH9oW2vfSyJbRDy+Km1u1VeSRq/QTFvK1AD21VBrNtnORUdFG5KYAbJGaQDX2DHXntpnWbDx1fplyH3zfqu/Qk7brVZ+G2jbmU0dkI/Rn6w6oJMwnPywAxyMsc7vOsneg/wlUNGfrgor1fIPmfPSP6tOE2UmjDNb5dLr6ClWP6BhLd1Jg6z2o2hOMJpsoX848YOoEBkdj8EvQktje/wIDAQABAoIBAQCpbdhFj32aiYGCBuc8P2K6Gk3M8A4mo2zreYmgC9bUDph5YnKu0YUmiT4wEwSmYH06C8Bkkr0M0lLOwqgHpY5BpMYsvOq6gijQoipumsaW3cCt20GcrSwYC/D+dF9Hm5cXA0N9e24lLSIfkHzO3A0dbr90hgdC6bgIgLIwwVEESEvypiJAB1Yapt0Ek1j4MW+W2/khN1Uke3ClLsGnCXj2kqtrtsp6kgRFCLmnA8OH2xsSxpoY1kND/dnFyd1tXMcfnkr3PgDwLG6ky3eg6E3oweiPKOaHyyWxw40JJkPyKvlmjEn3UEwZFWWhIgKnz8IC7WzV37FUxK+uJqIntnQhAoGBAN6172VTrQqs2NBBOMQOSkvRsQex9ej+SGdyqkVX4xZg0+F8S6q8TNHuMDAOjTLAk06ZlsV4Rp2NcQzRZq1lON+j2P5ydkRF1t4Cc4nfi7LyIZ6z/wVvD1pBibPCWIqB/Vi5yInHuS3eSEVqbPaCtFOys4UTOPp6EUwRwtEjuRIXAoGBAND8ZlckCSGtNIe324aDkEV8je5fqfqKrizx2z6PvP778ezm3ttbV+0NTbtxKT5tACjCvpPy7mU52EUv2+uMQFXGk4ZQ8tT9BaKvFnAQJ+6pLjsGQFMdZXXZtRzM3sWTogyA8DofJ06Gc3hIeimWx7Z6DXaLrwMKVEVpfrXRsTNZAoGAFoNrxOF1j6uzazH8rA0Jw6pZ6/44bqot5Y842TOuOBfns1aeS48ncN1UL7d43JWNDpgGHsYu1UR0Fiig6Yxe+HSWvfoSLIqm0uCKj3hypc9GSMXHVORKOASCCBLwYmgLlUmKlSsEdDeRNLsycqT517Ar55ru2ps2Xms5N20WC1cCgYEAobO6KBDc8+7F54FuXZ1swydF1ry0lAQ8EtCsmLK1RQKCxZA5vbbmyKfzjmZXyFKkveU5etaMeUyRt675Vj92BCibO2FlE0IX2zHohZsqmrLS7569pNHpEI/8YCVw9aVuzIfz2LUEP/EuZVKHG6jsLJgx1JjuOMcEP5UKEvsGRjkCgYAB++izjE+ChUBnbbIb4a6wcvvNG+wp0QcTNYQO7AgqdbfJkIwg45EtUGQwKcBBlPashpu5H+9SSNGRmj3Xb5HkIL2inFjvhuYvox/yNJV/bHhRJSFioscKMhdwoGaJbmPVfWyThK9M7p4kQdZpYr4vpUyU+M5/fd2KADfpKUAEcw==-----END RSA PRIVATE KEY-----",
    "-----BEGIN RSA PUBLIC KEY-----MIIBCgKCAQEAtc9mokhLOSUhNEV8YQn67Qy72WT5AuHPWwtUleHdpRkGu0+zNutviihxpi/JphGrl1BUkmKTy5XMlOBU0JlntMOyx5XMaCyc6bz2o5zude/z17WwPcNKpDHmz1dAglrrZX1IH9oW2vfSyJbRDy+Km1u1VeSRq/QTFvK1AD21VBrNtnORUdFG5KYAbJGaQDX2DHXntpnWbDx1fplyH3zfqu/Qk7brVZ+G2jbmU0dkI/Rn6w6oJMwnPywAxyMsc7vOsneg/wlUNGfrgor1fIPmfPSP6tOE2UmjDNb5dLr6ClWP6BhLd1Jg6z2o2hOMJpsoX848YOoEBkdj8EvQktje/wIDAQAB-----END RSA PUBLIC KEY-----",
    moment().format(),
    ""
  );
};

const verifyKeys = (actual: ApplicationKeys, expected: ApplicationKeys) => {
  expect(actual.privateKey).toBe(expected.privateKey);
  expect(actual.publicKey).toBe(expected.publicKey);
  expect(actual.application).toBe(expected.application);

  const generated = moment(actual.dateGenerated);

  expect(generated.isValid()).toBeTruthy();
  expect(generated.isSame(expected.dateGenerated));
};

const verifyEncryptionDecryption = (privateKey: string) => {
  const kp = new NodeRSA(privateKey);

  expect(kp.getKeySize()).toBe(2048);

  const enc = kp.encrypt("yolo");
  const dec = kp.decrypt(enc);

  expect(dec.toString()).toBe("yolo");
};

export {
  initAndClear,
  getMeAPreGeneratedKeyPair,
  verifyKeys,
  verifyEncryptionDecryption,
};

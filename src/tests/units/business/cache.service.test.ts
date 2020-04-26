import {
  initAndClear,
  getMeAPreGeneratedKeyPair,
  verifyKeys,
} from "../../util/tests.helpers";
import { CacheService } from "../../../business/cache.service";
import { KeyPairStore } from "../../../dal/manipulation/keypair.store";

describe("Cache", () => {
  it("should fetch from dbase when empty", async () => {
    jest.setTimeout(10000);
    const app = "cache";
    await initAndClear(app);

    CacheService.Clear();

    const keys = getMeAPreGeneratedKeyPair(app);
    const result1 = await KeyPairStore.Save(keys);

    expect(result1).toBe(true);

    const cachedKeys = await CacheService.GetKeyPairs(app);

    expect(cachedKeys.length).toBe(1);
    verifyKeys(cachedKeys[0], keys);
  });

  it("should add a keypair when app is not in cache", async () => {
    const app = "cachenew";
    await initAndClear(app);

    CacheService.Clear();

    const keys = getMeAPreGeneratedKeyPair(app);

    await CacheService.AddKeyPair(app, keys);

    const cachedKeys = await CacheService.GetKeyPairs(app);

    expect(cachedKeys.length).toBe(1);
    verifyKeys(cachedKeys[0], keys);
  });

  it("should add a keypair when app is in cache", async () => {
    jest.setTimeout(10000);
    const app = "cacheexisting";
    await initAndClear(app);

    CacheService.Clear();

    const keys = getMeAPreGeneratedKeyPair(app);
    const result1 = await KeyPairStore.Save(keys);

    expect(result1).toBe(true);

    let cachedKeys = await CacheService.GetKeyPairs(app);

    expect(cachedKeys.length).toBe(1);
    verifyKeys(cachedKeys[0], keys);

    const keys2 = getMeAPreGeneratedKeyPair(app);
    await CacheService.AddKeyPair(app, keys2);

    cachedKeys = await CacheService.GetKeyPairs(app);
    expect(cachedKeys.length).toBe(2);
    verifyKeys(cachedKeys[0], keys2);
    verifyKeys(cachedKeys[1], keys);
  });

  it("should not fetch in dbase when a keypair is in cache", async () => {
    jest.setTimeout(20000);
    const app = "cachenotindbase";

    await initAndClear(app);
    CacheService.Clear();

    const keys = getMeAPreGeneratedKeyPair(app);
    const result1 = await KeyPairStore.Save(keys);

    expect(result1).toBe(true);

    let cachedKeys = await CacheService.GetKeyPairs(app);

    expect(cachedKeys.length).toBe(1);
    verifyKeys(cachedKeys[0], keys);

    const result2 = await KeyPairStore.RemoveAll(app);

    expect(result2).toBe(true);

    cachedKeys = await CacheService.GetKeyPairs(app);

    expect(cachedKeys.length).toBe(1);

    CacheService.Clear();

    cachedKeys = await CacheService.GetKeyPairs(app);

    expect(cachedKeys.length).toBe(0);
  });
});

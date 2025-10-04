import type { IPaymentProcessor } from ".";
import { fakeAsyncOperation } from "../utils";

export type CryptoPaymentParams = {
  walletNumber: string;
  coin: "bitcoin" | "ethereum";
  value: number;
  userId: string;
};

export class CryptoProcessor implements IPaymentProcessor<CryptoPaymentParams> {
  private _processor: ICrypto | undefined;

  async process(params: CryptoPaymentParams) {
    this._setProcessor(params.coin);

    await this._processor!.pay(params);
  }

  private _setProcessor(coin: CryptoPaymentParams["coin"]) {
    switch (coin) {
      case "bitcoin":
        return (this._processor = new CryptoBitcoin());
      case "ethereum":
        return (this._processor = new CryptoEthereum());
      default:
        throw new Error(`Crypto currency "${coin}" is not supported.`);
    }
  }
}

interface ICrypto {
  pay: (params: CryptoPaymentParams) => Promise<void>;
  validate: (walletNumber: string) => Promise<void>;
  notify: (userId: string) => Promise<void>;
}

abstract class Crypto implements ICrypto {
  private _coin: string;
  constructor(coin: string) {
    this._coin = coin;
  }

  async pay(params: CryptoPaymentParams): Promise<void> {
    if (
      !params.walletNumber ||
      !params.coin ||
      !params.value ||
      !params.userId
    ) {
      throw new Error("Validation Error");
    }

    await fakeAsyncOperation(1000);
    await this.validate(params.walletNumber);

    console.log("Start processing payment...");
    await fakeAsyncOperation(1000);
    console.log(
      `Payment with value "${params.value}" approved by integrator...`
    );

    await this.notify(params.userId);
  }

  async validate(walletNumber: string): Promise<void> {
    await fakeAsyncOperation(1000);
    console.log(
      `Validating Wallet Number "${walletNumber}" for coin "${this._coin}"...`
    );
    console.log("Crypto wallet validated successfully.");
  }

  async notify(userId: string): Promise<void> {
    console.log(`Notifying user "${userId}"...`);
    await fakeAsyncOperation(1000);
    console.log("User successfully notified.");
  }
}

export class CryptoBitcoin extends Crypto {
  constructor() {
    super("bitcoin");
  }
}

export class CryptoEthereum extends Crypto {
  constructor() {
    super("ethereum");
  }
}

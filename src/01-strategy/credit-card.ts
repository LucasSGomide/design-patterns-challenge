import type { IPaymentProcessor } from ".";
import { fakeAsyncOperation } from "../utils";

export type CreditCardPaymentParams = {
  cardNumber: string;
  cardFlag: "visa" | "master" | "amex";
  value: number;
  userId: string;
};

export class CreditCardProcessor
  implements IPaymentProcessor<CreditCardPaymentParams>
{
  private _processor: ICreditCard | undefined;

  async process(params: CreditCardPaymentParams) {
    this._setProcessor(params.cardFlag);

    await this._processor!.pay(params);
  }

  private _setProcessor(flag: CreditCardPaymentParams["cardFlag"]) {
    switch (flag) {
      case "amex":
        return (this._processor = new CreditCardAmex());
      case "master":
        return (this._processor = new CreditCardMaster());
      case "visa":
        return (this._processor = new CreditCardVisa());
      default:
        throw new Error(`Flag "${flag}" is not supported.`);
    }
  }
}

interface ICreditCard {
  pay: (params: CreditCardPaymentParams) => Promise<void>;
  validate: (cardNumber: string, holder: string) => Promise<void>;
  notify: (userId: string) => Promise<void>;
}

abstract class CreditCard implements ICreditCard {
  private _flag: string;
  constructor(flag: string) {
    this._flag = flag;
  }

  async pay(params: CreditCardPaymentParams): Promise<void> {
    if (
      !params.cardNumber ||
      !params.cardFlag ||
      !params.value ||
      !params.userId
    ) {
      throw new Error("Validation Error");
    }

    await fakeAsyncOperation(1000);
    console.log(
      `Requesting card holder information for user "${params.userId}".`
    );
    await this.validate(params.cardNumber, "fake_card_holder_info");

    console.log("Start processing payment...");
    await fakeAsyncOperation(1000);
    console.log(
      `Payment with value "${params.value}" approved by integrator...`
    );

    await this.notify(params.userId);
  }

  async validate(cardNumber: string, holder: string): Promise<void> {
    await fakeAsyncOperation(1000);
    console.log(
      `Validating Credit Card number "${cardNumber}" for flag "${this._flag}"...`
    );
    console.log("Credit Card validated successfully.");
  }

  async notify(userId: string): Promise<void> {
    console.log(`Notifying user "${userId}"...`);
    await fakeAsyncOperation(1000);
    console.log("User successfully notified.");
  }
}

export class CreditCardVisa extends CreditCard {
  constructor() {
    super("visa");
  }
}

export class CreditCardMaster extends CreditCard {
  constructor() {
    super("master");
  }
}

export class CreditCardAmex extends CreditCard {
  constructor() {
    super("amex");
  }
}

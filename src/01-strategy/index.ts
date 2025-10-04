import { randomUUIDv7 } from "bun";
import {
  CreditCardProcessor,
  type CreditCardPaymentParams,
} from "./credit-card";
import { CryptoProcessor, type CryptoPaymentParams } from "./crypto";
import { faker } from "@faker-js/faker";

export interface IPaymentProcessor<T> {
  process: (params: T) => Promise<void>;
}

type PaymentProcessors =
  | IPaymentProcessor<CreditCardPaymentParams>
  | IPaymentProcessor<CryptoPaymentParams>;

type ExecutePaymentRequestParams = {
  body: {
    cardInfo?: CreditCardPaymentParams;
    cryptoInfo?: CryptoPaymentParams;
  };
};

class PaymentController {
  constructor(private paymentService: PaymentService) {}

  async post(request: ExecutePaymentRequestParams) {
    if (
      (request.body.cardInfo && request.body.cryptoInfo) ||
      (!request.body.cardInfo && !request.body.cryptoInfo)
    ) {
      throw new Error("BadRequest");
    }

    if (request.body.cardInfo) {
      this.paymentService.setPaymentProcessor(new CreditCardProcessor());
      return await this.paymentService.processPayment(request.body.cardInfo);
    }

    if (request.body.cryptoInfo) {
      this.paymentService.setPaymentProcessor(new CryptoProcessor());
      return await this.paymentService.processPayment(request.body.cryptoInfo);
    }
  }
}

class PaymentService {
  private _paymentProcessor?: PaymentProcessors;

  constructor() {}

  async processPayment(params: any) {
    if (!this._paymentProcessor) {
      throw new Error("Payment Type must be set.");
    }

    return await this._paymentProcessor.process(params);
  }

  setPaymentProcessor(paymentMethod: PaymentProcessors) {
    this._paymentProcessor = paymentMethod;
    return this;
  }
}

const controller = new PaymentController(new PaymentService());

const validRequests: Array<ExecutePaymentRequestParams> = [
  {
    body: {
      cardInfo: {
        cardFlag: "master",
        cardNumber: faker.finance.creditCardNumber(),
        userId: randomUUIDv7(),
        value: faker.number.float({ min: 300, max: 10000, fractionDigits: 2 }),
      },
    },
  },
  {
    body: {
      cardInfo: {
        cardFlag: "amex",
        cardNumber: faker.finance.creditCardNumber(),
        userId: randomUUIDv7(),
        value: faker.number.float({ min: 300, max: 10000, fractionDigits: 2 }),
      },
    },
  },
  {
    body: {
      cardInfo: {
        cardFlag: "visa",
        cardNumber: faker.finance.creditCardNumber(),
        userId: randomUUIDv7(),
        value: faker.number.float({ min: 300, max: 10000, fractionDigits: 2 }),
      },
    },
  },
  {
    body: {
      cryptoInfo: {
        coin: "bitcoin",
        walletNumber: faker.finance.bitcoinAddress(),
        userId: randomUUIDv7(),
        value: faker.number.float({ min: 300, max: 10000, fractionDigits: 2 }),
      },
    },
  },
  {
    body: {
      cryptoInfo: {
        coin: "ethereum",
        walletNumber: faker.finance.litecoinAddress(),
        userId: randomUUIDv7(),
        value: faker.number.float({ min: 300, max: 10000, fractionDigits: 2 }),
      },
    },
  },
];

for (const validRequest of validRequests) {
  console.log("------------ SENDING PAYMENT REQUESTS -----------");
  await controller.post(validRequest);
  console.log("------------ PAYMENT REQUEST PROCESSED ----------\n\n");
}

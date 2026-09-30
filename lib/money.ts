import Decimal from "decimal.js";
import mongoose from "mongoose";

Decimal.set({
  precision: 28,
  rounding: Decimal.ROUND_HALF_EVEN,
  toExpNeg: -9,
  toExpPos: 21,
});

export type MoneyInput =
  | string
  | number
  | Decimal
  | mongoose.Types.Decimal128
  | { toString(): string };

export function money(value: MoneyInput = "0"): Decimal {
  if (value instanceof Decimal) return value;
  if (value instanceof mongoose.Types.Decimal128) {
    return new Decimal(value.toString());
  }
  if (typeof value === "number") {
    if (!Number.isFinite(value)) {
      throw new Error("Invalid money value.");
    }
    return new Decimal(value.toString());
  }
  return new Decimal(value.toString());
}

export function moneyToDecimal128(value: MoneyInput): mongoose.Types.Decimal128 {
  return mongoose.Types.Decimal128.fromString(money(value).toFixed(4));
}

export function moneyToString(value: MoneyInput, scale = 2): string {
  return money(value).toFixed(scale);
}

export function addMoney(left: MoneyInput, right: MoneyInput): Decimal {
  return money(left).plus(money(right));
}

export function subtractMoney(left: MoneyInput, right: MoneyInput): Decimal {
  return money(left).minus(money(right));
}

export function multiplyMoney(left: MoneyInput, right: MoneyInput): Decimal {
  return money(left).times(money(right));
}

export function isMoneyEqual(left: MoneyInput, right: MoneyInput): boolean {
  return money(left).eq(money(right));
}

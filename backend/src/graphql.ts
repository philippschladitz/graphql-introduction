
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export class StockInput {
    symbol?: string;
}

export abstract class IQuery {
    abstract allStocks(): Stock[] | Promise<Stock[]>;

    abstract stock(input: StockInput): Stock | Promise<Stock>;
}

export class Stock {
    symbol?: string;
    name?: string;
    price?: number;
}

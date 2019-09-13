import { Resolver, Query, Args } from '@nestjs/graphql';

@Resolver('Stock')
export class StockResolver {
    private readonly stocks = [
        {
            symbol: 'SBUX',
            name: 'Starbucks',
            price: 83,
        },
        {
            symbol: 'MSF',
            name: 'Microsoft',
            price: 124,
        },
        {
            symbol: 'APC',
            name: 'Apple',
            price: 199.86,
        },
    ];

    @Query()
    allStocks() {
        return this.stocks;
    }

    @Query()
    stock(@Args('input') input: { symbol: string }) {
        return this.stocks.find(stock => stock.symbol === input.symbol);
    }
}

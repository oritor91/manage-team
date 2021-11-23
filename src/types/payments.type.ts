enum Currency {
    IL = "IL",
    USD = "USD"
}

type Price = {
    amount: Number,
    currency: Currency.IL
}

type ExtraExpenses = {
    price: Price,
    name: string,
    info: string
}

export type Payments = {
    field: {
        price: Price,
        contractTimePeriodInMonths: Number
    },
    extraExpenses: ExtraExpenses[]
}
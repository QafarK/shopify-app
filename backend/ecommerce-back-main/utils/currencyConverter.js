import axios from "axios";

let cachedRates = null;
let lastFetchTime = 0;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

// Fetch latest exchange rates (base: USD)
export async function getExchangeRates() {
    const now = Date.now();
    if (cachedRates && now - lastFetchTime < CACHE_DURATION) {
        return cachedRates;
    }

    try {
        const response = await axios.get("https://open.er-api.com/v6/latest/USD");
        cachedRates = response.data.rates;
        lastFetchTime = now;
        return cachedRates;
    } catch (error) {
        console.error("Error fetching exchange rates:", error.message);
        return {
            USD: 1,
            EUR: 0.94,
            GBP: 0.82,
            AZN: 1.7,
            RUB: 96,
            JPY: 149,
        };
    }
}

// Map symbols to currency codes
const symbolMap = {
    "$": "USD",
    "€": "EUR",
    "£": "GBP",
    "₼": "AZN",
    "₽": "RUB",
    "¥": "JPY",
};

// Convert between any two currencies
export async function convertCurrency(amount, fromSymbol, toSymbol) {
  if (amount == null) return 0;

  const rates = await getExchangeRates();
  const from = symbolMap[fromSymbol] || fromSymbol || "USD";
  const to = symbolMap[toSymbol] || toSymbol || "USD";

  const fromRate = rates[from];
  const toRate = rates[to];
  if (!fromRate || !toRate) {
    console.warn(`Missing rate for ${from} or ${to}`);
    return amount;
  }

  // Convert through USD
  const amountInUSD = amount / fromRate;
  const converted = amountInUSD * toRate;

  // Round UP to 2 decimal places
  const rounded = Math.ceil(converted * 100) / 100;

  return Number(rounded.toFixed(2));
}
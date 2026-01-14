import { OfferSaving, Product } from "../types/productTypes";

export function applyOffers(
  items: Record<string, number>,
  products: Product[]
) {
  const savings: OfferSaving[] = [];
  let totalSavings = 0;

  const getPrice = (id: string) =>
    products.find((p) => p.id === id)?.price || 0;

  const cheeseCount = items.cheese || 0;
  if (cheeseCount >= 2) {
    const free = Math.floor(cheeseCount / 2);
    const amount = free * getPrice("cheese");
    savings.push({
      description: "Buy 1 Get 1 Free Cheese",
      amount,
    });
    totalSavings += amount;
  }

  const soupCount = items.soup || 0;
  const breadCount = items.bread || 0;
  const eligibleBread = Math.min(soupCount, breadCount);
  if (eligibleBread > 0) {
    const amount = eligibleBread * getPrice("bread") * 0.5;
    savings.push({
      description: "Half price Bread with Soup",
      amount,
    });
    totalSavings += amount;
  }

  const butterCount = items.butter || 0;
  if (butterCount > 0) {
    const amount = butterCount * getPrice("butter") * (1 / 3);
    savings.push({
      description: "⅓ off Butter",
      amount,
    });
    totalSavings += amount;
  }

  return { savings, totalSavings };
}

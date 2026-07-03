export function formatPKR(amount) {
  if (amount === null || amount === undefined || isNaN(amount)) return "PKR 0";
  const num = parseFloat(amount);
  return `PKR ${num.toLocaleString("en-PK")}`;
}

export function getDiscountedPrice(price, discount) {
  if (!discount || discount <= 0) return price;
  return Math.round(price - (price * discount) / 100);
}

export function getStockBadge(quantity, low_stock_threshold) {
  if (quantity === null || quantity === undefined)
    return { text: "Unknown", color: "bg-gray-200 text-gray-600" };
  if (quantity <= 0)
    return { text: "Out of Stock", color: "bg-red-100 text-red-700" };
  const threshold = low_stock_threshold || 5;
  if (quantity <= threshold)
    return {
      text: `Low Stock (${quantity})`,
      color: "bg-yellow-100 text-yellow-700",
    };
  return { text: "In Stock", color: "bg-green-100 text-green-700" };
}

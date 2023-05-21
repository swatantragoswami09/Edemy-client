//  data { currency: "", amount: '' }
export const currencyFormatter = (data) => {
  console.log("data=>", data);
  return (data.amount / 100).toLocaleString(data.currency, {
    style: "currency",
    currency: data.currency,
  });
};

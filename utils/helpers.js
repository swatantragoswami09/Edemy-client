//  data { currency: "", amount: '' }
export const currencyFormatter = (data) => {
  console.log("data=>", data);
  return data.amount.toLocaleString(data.currency, {
    style: "currency",
    currency: data.currency,
  });
};

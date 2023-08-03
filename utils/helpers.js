//  data { currency: "", amount: '' }
export const currencyFormatter = (data) => {
  let res = data.amount.toLocaleString(data.currency);
  console.log("res=>", res);
  res = res / 100; // convert into inr
  return "₹ " + res;
};

export const dateFormater = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

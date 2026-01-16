import moment from "moment";

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
};

export const getInitials = (name) => {
  if (!name) return "";

  const words = name.split(" ");
  let initials = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }
  return initials.toUpperCase();
};

export const addThousandsSaperator = (num) => {
  if (num == null || isNaN(num)) return "";
  const [integerPart, , fractionalPart] = num.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
};


export const prepareExpenseBarChartData = (data = []) => {
  const grouped = {};

  data.forEach((item) => {
    const day = moment(item.date).format("DD MMM");

    if (!grouped[day]) {
      grouped[day] = 0;
    }

    grouped[day] += item.amount;
  });

  return Object.keys(grouped).map((day) => ({
    day,
    amount: grouped[day],
  }));
};




export const prepareIncomeBarChartData = (data = []) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return sortedData.map((item) => ({
    day: moment(item?.date).format("Do MMM"), // match XAxis
    amount: item?.amount,
    source: item?.source,
  }));
};

export const prepareExpenseLineChartData=(data=[])=>{
const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
 return sortedData.map((item) => ({
    day: moment(item?.date).format("Do MMM"), // match XAxis
    amount: item?.amount,
    category: item?.category,
  }));
}
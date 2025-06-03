export function convertKeyToName(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
}

export function calculateNutrient(
  valueInput: string,
  valueNutrient: number
): string {
  let covertedNumber = "";
  const inputNumber = Number(valueInput);
  const valueCalculated = inputNumber * valueNutrient;
  inputNumber === 0 || valueCalculated < 0.01
    ? (covertedNumber = valueCalculated.toFixed())
    : (covertedNumber = valueCalculated.toFixed(2));
  return covertedNumber;
}

export function convertDateToTime(date: string): string {
  const convertedDate = new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return convertedDate;
}

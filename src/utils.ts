export function convertKeyToName(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
}

export function calculateNutrient(
  valueInput: string,
  valueNutrient: number
): string {
  const inputNumber = Number(valueInput);
  const valueCalculated = inputNumber * valueNutrient;
  return inputNumber === 0 || valueCalculated < 0.01
    ? valueCalculated.toFixed()
    : valueCalculated.toFixed(2);
}

export function convertDateToTime(date: string): string {
  const convertedDate = new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return convertedDate;
}

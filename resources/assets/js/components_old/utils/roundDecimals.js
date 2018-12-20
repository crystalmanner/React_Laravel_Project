export default function roundToPlace(number, place) {
  if (!place || !number) {
    return number;
  }

  const multiple = Math.pow(10, place);

  return Math.round(number * multiple) / multiple;
}

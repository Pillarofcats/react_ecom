export default function setInitalStarFilter(currentStars: string) {
  const initalStarFilter = [false, false, false, false, false];

  if (
    currentStars.length > 5 ||
    /!([\s]?[1]?[2]?[3]?[4]?[5]?)/.test(currentStars)
  )
    return initalStarFilter;

  const parsedStarFilterURLParam = currentStars?.split("");

  if (!parsedStarFilterURLParam) return initalStarFilter;

  for (let i = 0; i < parsedStarFilterURLParam.length; i++) {
    const zeroBaseIndex = Number(parsedStarFilterURLParam[i]) - 1;
    initalStarFilter[zeroBaseIndex] = true;
  }

  return initalStarFilter;
}

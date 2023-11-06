export default function setInitalStarFilter(currentStars:string) {
  
    const parsedStarFilterURLParam = currentStars?.split("")
    const initalStarFilter = [false, false, false, false, false]

    if(!parsedStarFilterURLParam) return initalStarFilter

    for(let i=0; i < parsedStarFilterURLParam.length; i++) {
      const zeroBaseIndex = Number(parsedStarFilterURLParam[i])-1
      initalStarFilter[zeroBaseIndex] = true
    }
    return initalStarFilter
  }
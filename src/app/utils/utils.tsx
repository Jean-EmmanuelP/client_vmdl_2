export const divideContentInThree = (content: string): string[] => {
    const totalLength = content.length;
    const partLength = Math.floor(totalLength / 3);
  
    const firstBreak = content.indexOf(".", partLength);
    const secondBreak = content.indexOf(".", partLength * 2);
  
    const firstPart = content.substring(0, firstBreak + 1);
    const secondPart = content.substring(firstBreak + 1, secondBreak + 1);
    const thirdPart = content.substring(secondBreak + 1);
  
    return [firstPart, secondPart, thirdPart];
  };
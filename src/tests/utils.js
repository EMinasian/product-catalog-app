const isSorted = (arr, direction) => {
  for (let i = 0; i < arr.length - 1; i++) {
    if (direction === "asc") {
      if (arr[i] > arr[i + 1]) {
        return false;
      }
    } else {
      if (arr[i] < arr[i + 1]) {
        return false;
      }
    }
  }
  return true;
};

export { isSorted }
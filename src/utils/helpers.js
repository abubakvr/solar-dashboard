export function findNearestIndex(sortedArray, targetNumber) {
  // Check if the array is empty
  if (sortedArray.length === 0) {
    return -1; // Return -1 to indicate that the array is empty
  }

  let low = 0;
  let high = sortedArray.length - 1;
  let nearestIndex = -1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    if (sortedArray[mid] === targetNumber) {
      return mid; // Exact match found
    }

    if (sortedArray[mid] < targetNumber) {
      nearestIndex = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return nearestIndex;
}

export function createTimestamps(interval, stamps) {
  const timestamps = [];
  const intervalInSeconds = interval * 24 * 60 * 60;

  // Get the current date and time in local time
  const currentDate = new Date();

  // Set the current time to the current date
  const currentTimestamp = Math.floor(currentDate.getTime() / 1000);

  for (let i = stamps - 1; i >= 0; i--) {
    const timestamp = currentTimestamp - i * intervalInSeconds;
    timestamps.push(timestamp);
  }

  return timestamps;
}

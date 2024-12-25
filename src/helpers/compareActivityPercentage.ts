function compareActivityPercentage(previous: number, current: number) {
  let diff;
  if (previous === 0) {
    diff = Math.round((current - previous) * 100);
  } else {
    diff = Math.round(((current - previous) * 100) / previous);
  }
  return diff;
}

export default compareActivityPercentage;

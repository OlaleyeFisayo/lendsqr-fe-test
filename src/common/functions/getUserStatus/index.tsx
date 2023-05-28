export default function getUserStatus(lastActiveDate: string): string {
  const currentDate = new Date();
  const activityDate = new Date(lastActiveDate);
  const timeDifference = currentDate.getTime() - activityDate.getTime();
  const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

  if (daysDifference < 30) {
    return 'Active';
  } else if (daysDifference >= 30 && daysDifference < 365) {
    return 'Not Active';
  } else if (daysDifference >= 365 && daysDifference < 1095) {
    return 'Pending';
  } else {
    return 'Blacklisted';
  }
}


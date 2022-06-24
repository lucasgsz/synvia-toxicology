export function getTokenExpirationDate(): Date {
  const expiresInDays = 90;

  const expiresAt = addDaysFromNow(expiresInDays);

  return expiresAt;
}

function addDaysFromNow(days: number): Date {
  const result = new Date();
  result.setDate(result.getDate() + days);
  return result;
}

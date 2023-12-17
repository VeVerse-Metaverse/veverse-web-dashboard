export const getExpirationTime = (ttlMinutes: number) => {
  const now = new Date();
  const ttl = ttlMinutes * 60 * 1000;

  return now.getTime() + ttl;
};

export const generateReceipt = () => {
  return Math.random().toString(36).substring(7);
};

export const generateTeamId = (eventName: string) => {
  return `${eventName}-${Math.random().toString(36).substring(7)}`;
};
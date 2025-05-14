export const generateReceipt = () => {
  return Math.random().toString(36).substring(7);
};

export const generateTeamId = (eventName: string) => {
  return `${eventName}-${Math.random().toString(36).substring(7)}`;
};

export function generatePassword(length: number = 8): string {
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";

  const allChars = lowercase + uppercase + numbers + symbols;
  const getRandomChar = (chars: string) =>
    chars.charAt(Math.floor(Math.random() * chars.length));

  const passwordChars: string[] = [
    getRandomChar(lowercase),
    getRandomChar(uppercase),
    getRandomChar(numbers),
    getRandomChar(symbols),
  ];

  while (passwordChars.length < length) {
    passwordChars.push(getRandomChar(allChars));
  }

  for (let i = passwordChars.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [passwordChars[i], passwordChars[j]] = [passwordChars[j], passwordChars[i]];
  }

  return passwordChars.join("");
}

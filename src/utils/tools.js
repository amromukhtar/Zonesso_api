export function generateId(length) {
  const numbers = '0123456789';
  let randomId = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * numbers.length);
    randomId += numbers.charAt(randomIndex);
  }

  return randomId;
}

export function getUnixTime() {
  return Math.floor(Date.now() / 1000);
}

export const generateRandomEgyptianPhoneNumber = () =>  {
  const countryCode = "+20";
  const mobilePrefixes = ["10", "11", "12", "15"];

  const prefix = mobilePrefixes[Math.floor(Math.random() * mobilePrefixes.length)];
  const subscriberNumber = Math.floor(Math.random() * 100000000).toString().padStart(8, '0');
  const phoneNumber = `${countryCode}${prefix}${subscriberNumber}`;

  return phoneNumber;
}
export default function formatPhoneNumber(phoneNumber: string): string {
  // Remove non-digit characters
  const digitsOnly: string = phoneNumber.replace(/\D/g, "");

  // Extract the phone number components
  const areaCode: string = digitsOnly.slice(0, 3);
  const firstPart: string = digitsOnly.slice(3, 6);
  const secondPart: string = digitsOnly.slice(6, 10);

  // Format the phone number
  return `(${areaCode}) ${firstPart}-${secondPart}`;
}

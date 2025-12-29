export function generateSouthAfricanID(): string {
  const year = Math.floor(1950 + Math.random() * 50);
  const month = Math.floor(1 + Math.random() * 12)
    .toString()
    .padStart(2, "0");
  const day = Math.floor(1 + Math.random() * 28)
    .toString()
    .padStart(2, "0");
  const birthDate = `${year.toString().slice(-2)}${month}${day}`;

  const sequence = Math.floor(1000 + Math.random() * 9000).toString();
  const citizenship = "0";
  const A = "8";

  const idWithoutChecksum = `${birthDate}${sequence}${citizenship}${A}`;

  const digits = idWithoutChecksum.split("").map(Number);
  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    let digit = digits[i];
    if (i % 2 === 1) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }

  const checksum = (10 - (sum % 10)) % 10;
  return `${idWithoutChecksum}${checksum}`;
}

const surnames = [
  "Mokoena",
  "Naidoo",
  "Botha",
  "Pillay",
  "Ngubane",
  "DeLange",
  "Moodley",
  "VanDyk",
  "Khumalo",
  "VanZyl",
  "Chetty",
  "Nkosi",
  "Govender",
  "Dlamini",
  "Coetzee",
  "Sithole",
  "VanNiekerk",
  "Radebe",
  "Jacobs",
  "Majola",
  "Molefe",
  "Abrahams",
  "Mathebula",
  "Singh",
  "Mbatha",
  "Visser",
  "Maphumulo",
  "Daniels",
  "Pretorius",
  "Zungu",
];

const firstNames = [
  "Liam",
  "Emma",
  "Noah",
  "Olivia",
  "Aiden",
  "Ava",
  "Ethan",
  "Mia",
  "Lucas",
  "Sophia",
  "Mason",
  "Isabella",
  "Logan",
  "Amelia",
  "James",
  "Harper",
  "Leo",
  "Ella",
  "Jayden",
  "Zoey",
  "Caleb",
  "Chloe",
  "Nathan",
  "Layla",
  "Joshua",
  "Grace",
  "Daniel",
  "Hannah",
  "Matthew",
  "Riley",
];

export function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateRandomStudentInfo() {
  const timestamp = Date.now();
  const idNumber = generateSouthAfricanID();
  const firstName = "autoN" + getRandomElement(firstNames);
  const surname = getRandomElement(surnames);
  const rawemail = `${firstName}${surname}${timestamp}@maildrop.cc`;
  const email = rawemail.toLowerCase();
  const passport = `A${Math.floor(10000000 + Math.random() * 90000000)}`;

  return { idNumber, firstName, surname, email, passport };
}

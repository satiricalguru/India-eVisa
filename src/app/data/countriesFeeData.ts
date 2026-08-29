export interface CountryFeeConfig {
  country: string;
  tier: "Standard" | "Reduced" | "Gratis (Zero Fee)" | "USA/UK Special" | "Japan/Singapore Special";
  tourist30D: number;
  tourist1Y: number;
  tourist5Y: number;
  business: number;
  medical: number;
  conference: number;
  notes?: string;
}

// 174 Countries list officially eligible for Indian e-Visa
export const eligibleCountriesList: string[] = [
  "Albania", "Andorra", "Angola", "Anguilla", "Antigua & Barbuda", "Argentina", "Armenia", "Aruba",
  "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Barbados", "Belarus", "Belgium",
  "Belize", "Benin", "Bolivia", "Bosnia & Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria",
  "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Island", "Chile", "Colombia",
  "Comoros", "Cook Islands", "Costa Rica", "Cote d'Ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic",
  "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "El Salvador",
  "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Fiji", "Finland", "France", "Gabon", "Gambia",
  "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guyana", "Haiti",
  "Honduras", "Hungary", "Iceland", "Indonesia", "Ireland", "Israel", "Italy", "Jamaica", "Japan",
  "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kyrgyzstan", "Laos", "Latvia", "Lesotho", "Liberia",
  "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Mali", "Malta",
  "Marshall Islands", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro",
  "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Netherlands", "New Zealand",
  "Nicaragua", "Niger", "Niue Island", "North Macedonia", "Norway", "Oman", "Palau", "Palestine",
  "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar",
  "Republic of Korea", "Romania", "Russia", "Rwanda", "Saint Christopher and Nevis", "Saint Lucia",
  "Saint Vincent & the Grenadines", "Samoa", "San Marino", "Saudi Arabia", "Senegal", "Serbia",
  "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "South Africa",
  "Spain", "Sri Lanka", "Suriname", "Sweden", "Switzerland", "Taiwan", "Tajikistan", "Tanzania",
  "Thailand", "Togo", "Tonga", "Trinidad & Tobago", "Turks & Caicos Island", "Tuvalu", "UAE", "Uganda",
  "Ukraine", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City",
  "Venezuela", "Vietnam", "Zambia", "Zimbabwe"
];

// Special reciprocal fee groups as per Ministry of Home Affairs Gazette
export const zeroFeeCountries = [
  "Argentina", "Fiji", "Jamaica", "Kiribati", "Marshall Islands", "Mauritius", "Micronesia",
  "Nauru", "Niue Island", "Palau", "Papua New Guinea", "Samoa", "Seychelles", "Solomon Islands",
  "South Africa", "Tonga", "Tuvalu", "Uruguay", "Vanuatu"
];

export const specialReducedFeeCountries = [
  "Japan", "Singapore", "Sri Lanka"
];

export function getCountryFeeConfig(countryName: string): CountryFeeConfig {
  const isZeroFee = zeroFeeCountries.includes(countryName);
  if (isZeroFee) {
    return {
      country: countryName,
      tier: "Gratis (Zero Fee)",
      tourist30D: 0,
      tourist1Y: 0,
      tourist5Y: 0,
      business: 0,
      medical: 0,
      conference: 0,
      notes: "Bilateral agreement · Government of India reciprocal fee waiver applicable."
    };
  }

  if (specialReducedFeeCountries.includes(countryName)) {
    return {
      country: countryName,
      tier: "Japan/Singapore Special",
      tourist30D: 1800,
      tourist1Y: 2100,
      tourist5Y: 2100,
      business: 2100,
      medical: 2100,
      conference: 2100,
      notes: "Bilateral preferential reciprocal rate applicable."
    };
  }

  if (countryName === "United States" || countryName === "United Kingdom") {
    return {
      country: countryName,
      tier: "USA/UK Special",
      tourist30D: 2100,
      tourist1Y: 3400,
      tourist5Y: 6800,
      business: 7200,
      medical: 6400,
      conference: 7200,
      notes: "Standard reciprocal e-Visa fee for US & UK passport holders."
    };
  }

  // Standard Tier
  return {
    country: countryName,
    tier: "Standard",
    tourist30D: 2100,
    tourist1Y: 3400,
    tourist5Y: 6800,
    business: 6800,
    medical: 6400,
    conference: 6800,
    notes: "Standard international e-Visa rate."
  };
}

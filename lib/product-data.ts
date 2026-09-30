export interface Category {
  id: string;
  name: string;
  subcategories: string[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  sku: string;
  category: string;
  subcategory: string;
  price: number;
  stock: number;
}

export const categories: Category[] = [
  {
    id: "devices",
    name: "Devices",
    subcategories: ["CBC", "Chemistry", "POCT", "Chemiluminescence"],
  },
  {
    id: "spare-parts",
    name: "Spare Parts",
    subcategories: ["CBC", "Chemistry"],
  },
];

export const products: Product[] = [
  // Devices - CBC
  {
    id: "1",
    name: "CBC Analyzer Pro X2000",
    description: "Automated CBC analyzer with advanced quality control",
    sku: "CBC-PRO-X2000",
    category: "devices",
    subcategory: "CBC",
    price: 45000,
    stock: 8,
  },
  {
    id: "2",
    name: "CBC Counter 3000",
    description: "High-throughput complete blood count analyzer",
    sku: "CBC-CNT-3000",
    category: "devices",
    subcategory: "CBC",
    price: 38000,
    stock: 12,
  },
  {
    id: "3",
    name: "CompactCBC Mini",
    description: "Compact CBC analyzer for point-of-care testing",
    sku: "CBC-CPT-MINI",
    category: "devices",
    subcategory: "CBC",
    price: 22000,
    stock: 15,
  },

  // Devices - Chemistry
  {
    id: "4",
    name: "Chemistry Analyzer CA5000",
    description: "Fully automated chemistry analyzer with 50-test menu",
    sku: "CHEM-CA-5000",
    category: "devices",
    subcategory: "Chemistry",
    price: 52000,
    stock: 6,
  },
  {
    id: "5",
    name: "Clinical Chemistry System CCS-200",
    description: "Mid-range chemistry analyzer for labs",
    sku: "CHEM-CCS-200",
    category: "devices",
    subcategory: "Chemistry",
    price: 35000,
    stock: 9,
  },
  {
    id: "6",
    name: "Biochemistry Module 1000",
    description: "Modular chemistry testing system",
    sku: "CHEM-BIO-1000",
    category: "devices",
    subcategory: "Chemistry",
    price: 28000,
    stock: 11,
  },

  // Devices - POCT
  {
    id: "7",
    name: "POCT Express 500",
    description: "Portable point-of-care testing device",
    sku: "POCT-EXP-500",
    category: "devices",
    subcategory: "POCT",
    price: 8500,
    stock: 25,
  },
  {
    id: "8",
    name: "Bedside Analyzer BTA-2",
    description: "Compact POCT analyzer for critical values",
    sku: "POCT-BTA-2",
    category: "devices",
    subcategory: "POCT",
    price: 12000,
    stock: 18,
  },
  {
    id: "9",
    name: "Mobile POCT Unit Pro",
    description: "Mobile POCT solution with wireless connectivity",
    sku: "POCT-MOB-PRO",
    category: "devices",
    subcategory: "POCT",
    price: 15500,
    stock: 7,
  },

  // Devices - Chemiluminescence
  {
    id: "10",
    name: "Chemiluminescence Analyzer CLA-3000",
    description: "Advanced immunoassay analyzer with chemiluminescence",
    sku: "CHEM-CLA-3000",
    category: "devices",
    subcategory: "Chemiluminescence",
    price: 65000,
    stock: 4,
  },
  {
    id: "11",
    name: "Luminescence Testing System LTS-500",
    description: "High-sensitivity chemiluminescence platform",
    sku: "CHEM-LTS-500",
    category: "devices",
    subcategory: "Chemiluminescence",
    price: 58000,
    stock: 5,
  },
  {
    id: "12",
    name: "Automated Immunoassay AI-1000",
    description: "Automated chemiluminescence immunoassay system",
    sku: "CHEM-AI-1000",
    category: "devices",
    subcategory: "Chemiluminescence",
    price: 72000,
    stock: 3,
  },

  // Spare Parts - CBC
  {
    id: "13",
    name: "CBC Sample Rotor Assembly",
    description: "Replacement rotor for CBC analyzers",
    sku: "SP-CBC-ROTOR",
    category: "spare-parts",
    subcategory: "CBC",
    price: 1200,
    stock: 32,
  },
  {
    id: "14",
    name: "CBC Optical Sensor Module",
    description: "Optical detection module for CBC systems",
    sku: "SP-CBC-OPTIC",
    category: "spare-parts",
    subcategory: "CBC",
    price: 3400,
    stock: 14,
  },
  {
    id: "15",
    name: "CBC Reagent Cartridge Kit (x10)",
    description: "Pack of 10 reagent cartridges for CBC testing",
    sku: "SP-CBC-REAGENT",
    category: "spare-parts",
    subcategory: "CBC",
    price: 850,
    stock: 28,
  },

  // Spare Parts - Chemistry
  {
    id: "16",
    name: "Chemistry Flow Cell Assembly",
    description: "Replacement flow cell for chemistry analyzers",
    sku: "SP-CHEM-FLOW",
    category: "spare-parts",
    subcategory: "Chemistry",
    price: 2800,
    stock: 19,
  },
  {
    id: "17",
    name: "Chemistry Pump Module",
    description: "Peristaltic pump module for chemistry systems",
    sku: "SP-CHEM-PUMP",
    category: "spare-parts",
    subcategory: "Chemistry",
    price: 1950,
    stock: 22,
  },
  {
    id: "18",
    name: "Chemistry Reagent Bottle Assembly",
    description: "Complete reagent bottle and probe assembly",
    sku: "SP-CHEM-BOTTLE",
    category: "spare-parts",
    subcategory: "Chemistry",
    price: 680,
    stock: 41,
  },
];

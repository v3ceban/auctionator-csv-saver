import { readdirSync, readFileSync, mkdirSync } from "fs";
import { createObjectCsvWriter as csvWriter } from "csv-writer";

// List of names to search for
const namesToSearch = [
  "Аметрин",
  "Багровый рубин",
  "Величественный циркон",
  "Алмаз землеправителя",
  "Алмаз небесного сияния",
  "Око Зула",
  "Страхолит",
  "Царский янтарь",
  "Императорский топаз",
  "Алый рубин",
  "Небесный сапфир",
  "Лесной изумруд",
  "Сумеречный опал",
  "Сияние осени",
  "Извечная вода",
  "Извечная жизнь",
  "Извечная земля",
  "Извечная тьма",
  "Извечный воздух",
  "Извечный огонь",
  "Ледяной шар",
  "Кальцедоний",
  "Кровавый камень",
  "Огромный цитрин",
  "Темный нефрит",
  "Изначальная мощь",
  "Изначальная земля",
  "Изначальная вода",
  "Изначальный воздух",
  "Изначальный огонь",
  "Изначальная мана",
];

// Function to create a directory if it doesn't exist
function createDirectoryIfNotExists(directory) {
  if (!exists(directory)) {
    mkdirSync(directory);
  }
}

// Function to check if a directory exists
function exists(directory) {
  try {
    readdirSync(directory);
    return true;
  } catch (error) {
    return false;
  }
}

// Function to read Lua files in the "./lua_files" directory
function readLuaFiles() {
  const outputFolder = "./csv_files"; // Folder to store CSV files
  createDirectoryIfNotExists(outputFolder); // Create the folder if it doesn't exist
  const luaFiles = readdirSync("./lua_files");
  luaFiles.forEach((file) => {
    if (file.endsWith(".lua")) {
      const foundItems = scanLuaFile(`./lua_files/${file}`);
      writeToCSV(file, foundItems, outputFolder);
    }
  });
}

// Function to scan Lua file for items
function scanLuaFile(filename) {
  const content = readFileSync(filename, "utf8");
  const lines = content.split("\n");

  const foundItems = [];

  let foundItem = false;
  let itemName = "";

  lines.forEach((line) => {
    namesToSearch.forEach((name) => {
      if (line.includes(`"${name}"`)) {
        foundItem = true;
        itemName = name;
      }
    });

    if (foundItem && line.includes('"price"')) {
      const price = parseInt(line.match(/\d+/)[0]);
      foundItems.push({ name: itemName, price: price });
      foundItem = false;
      itemName = "";
    }
  });

  return foundItems;
}

// Function to write found items to CSV file
function writeToCSV(filename, foundItems, outputFolder) {
  const csvWriterInstance = csvWriter({
    path: `${outputFolder}/${filename}.csv`,
    header: [
      { id: "name", title: "name" },
      { id: "price", title: "price" },
    ],
  });

  csvWriterInstance
    .writeRecords(foundItems)
    .then(() =>
      console.log(`CSV file ${filename}.csv has been written successfully`),
    );
}

// Main function
function main() {
  readLuaFiles();
}

// Start the script
main();

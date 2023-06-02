const fs = require("fs");

let items = [];
let categories = [];

module.exports.initialise = function () {
  return new Promise((resolve, reject) => {
    fs.readFile("./data/items.json", "utf8", (err, data) => {
      if (err) {
        console.error("Error reading items file:", err);
        reject("Unable to read items file");
      } else {
        try {
          items = JSON.parse(data);
          console.log("Items file parsed successfully");
        } catch (error) {
          console.error("Error parsing items file:", error);
          reject("Unable to parse items file");
        }
      }
    });

    fs.readFile("./data/categories.json", "utf8", (err, data) => {
      if (err) {
        console.error("Error reading categories file:", err);
        reject("Unable to read categories file");
      } else {
        try {
          categories = JSON.parse(data);
          console.log("Categories file parsed successfully");
          resolve();
        } catch (error) {
          console.error("Error parsing categories file:", error);
          reject("Unable to parse categories file");
        }
      }
    });
  });
};

module.exports.getallitems = () => {
  return new Promise((resolve, reject) => {
    if (items.length === 0) {
      reject("No items available.");
    } else {
      resolve(items);
    }
  });
};

module.exports.getPublishedItems = () => {
  return new Promise((resolve, reject) => {
    const publishedItems = categories.filter((item) => categories.published === true);

    if (publishedItems.length === 0) {
      reject("No published items available.");
    } else {
      resolve(publishedItems);
    }
  });
};

module.exports.getCategories = () => {
  return new Promise((resolve, reject) => {
    if (categories.length === 0) {
      reject("No categories available.");
    } else {
      resolve(categories);
    }
  });
};

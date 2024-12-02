const fs = require('fs');
const path = require('path');

class FileHandler {
    constructor(filePath) {
        this.filePath = path.join(__dirname, '..', '/Models/', filePath);  // The path to the file you want to handle
    }

    // Initialize the file and load data into memory
    InitializeFile() {
        // Check if the file exists
        if (!fs.existsSync(this.filePath)) {
            // If the file doesn't exist, create it with an empty array
            fs.writeFileSync(this.filePath, JSON.stringify([], null, 2), 'utf-8');  // Create an empty array
        }

        // Read and parse the content of the file
        try {
            const fileContent = fs.readFileSync(this.filePath, 'utf-8');
            return JSON.parse(fileContent); // Return the parsed JSON data
        } catch (err) {
            console.error('Error reading the file:', err);
            return []; // In case of error, return an empty array
        }
    }

    // Write data to the file
    WriteToFile(data) {
        try {
            // Convert the data to a JSON string with indentation for readability
            fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
            console.log('Data successfully written to file.');
        } catch (err) {
            console.error('Error writing to file:', err);
        }
    }
}


module.exports = FileHandler; // Export FileHandler class for use in other files

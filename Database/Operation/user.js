const FileHandler = require('./FileHandeler'); // Import the FileHandler class

class User {
    constructor(dataPath = 'user.json', countPath = 'count.json') {
        this.userFileHandler = new FileHandler(dataPath); // User data file handler
        this.countFileHandler = new FileHandler(countPath); // Count file handler
        this.dataPath = dataPath;
        this.countPath = countPath;
        
        // Initialize files
        this.data = this.userFileHandler.InitializeFile(); // This should return an array
        this.userCount = this.countFileHandler.InitializeFile().userCount || 0; // Initialize userCount from count.json
    }

    // Add new data to the file with unique ID
    CreateData(newData) {
        if (!newData || typeof newData !== 'object') {
            console.error('Invalid data format');
            return { res: false };
        }

        // Increment userCount and assign as user ID
        this.userCount += 1;
        const newUser = {
            id: this.userCount, // Set a unique ID for the user
            ...newData
        };

        // Make sure `this.data` is an array and push the new user object
        this.data.push(newUser);

        // Update user count in count.json
        this.countFileHandler.WriteToFile({ userCount: this.userCount });

        // Write the updated user data (as an array) to user.json
        this.userFileHandler.WriteToFile(this.data);
        return { res: true, newUser };
    }

    // Retrieve all user data
    GetData() {
        return this.data || []; // Return the list of users, which should be an array
    }

    // Update specific data by ID
    UpdateData(id, newData) {
        const index = this.data.findIndex((item) => item.id === id);
        if (index !== -1) {
            this.data[index] = { ...this.data[index], ...newData };
            this.userFileHandler.WriteToFile(this.data); // Write the updated data to user.json
        } else {
            console.log(`ID ${id} not found.`);
        }
    }

    // Delete data by ID
    DeleteData(id) {
        const index = this.data.findIndex((item) => item.id === id);
        if (index !== -1) {
            this.data.splice(index, 1); // Remove item from array
            this.userFileHandler.WriteToFile(this.data); // Write the updated data to user.json
        } else {
            console.log(`ID ${id} not found.`);
        }
    }
}


module.exports = User;

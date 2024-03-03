// Class for guitar players, including their name and the type of guitar they play
class GuitarPlayer {
    constructor(name, guitarType) {
      this.name = name;
      this.guitarType = guitarType; // e.g., "Electric" or "Acoustic"
    }
  
    // Method to describe a guitar player's specialty
    describe() {
      return `${this.name} plays the ${this.guitarType} guitar.`;
    }
  }
  
  // Class for bands, including the band's name and a list of guitar players
  class Band {
    constructor(name) {
      this.name = name;
      this.guitarPlayers = []; // Array to store guitar players
    }
  
    // Method to add a guitar player to the band
    addGuitarPlayer(guitarPlayer) {
      if (guitarPlayer instanceof GuitarPlayer) {
        this.guitarPlayers.push(guitarPlayer);
      } else {
        throw new Error(`You can only add an instance of GuitarPlayer. Argument is not a guitar player: ${guitarPlayer}`);
      }
    }
  
    // Method to describe a band, including its name and number of guitar players
    describe() {
      return `${this.name} has ${this.guitarPlayers.length} guitar players.`;
    }
  }
  
  // Main menu class to manage the application flow
  class Menu {
    constructor() {
      this.bands = []; // Array to store bands
      this.selectedBand = null; // Track the currently selected band
    }
  
    // Main entry point to the application; shows the main menu and handles user input
    start() {
      let selection = this.showMainMenuOptions();
      while (selection != 0) {
        switch(selection) {
          case '1':
            this.createBand();
            break;
          case '2':
            this.viewBand();
            break;
          case '3':
            this.deleteBand();
            break;
          case '4':
            this.displayBands();
            break;
          default:
            selection = 0;
        }
        selection = this.showMainMenuOptions();
      }
      alert('Goodbye!');
    }
  
    // Shows the main menu and returns the user's selection
    showMainMenuOptions() {
      return prompt(`
  0) exit
  1) create a new band
  2) view a band
  3) delete a band
  4) display all bands
  `);
    }
  
    // Shows the band menu for adding or deleting guitar players, and returns the user's selection
    showBandMenuOptions(bandInfo) {
      return prompt(`
  0) back
  1) add a new guitar player
  2) delete a guitar player
  -----------------
  ${bandInfo}
  `);
    }
  
    // Displays a list of all bands
    displayBands() {
      let bandString = '';
      for (let i = 0; i < this.bands.length; i++) {
        bandString += i + ') ' + this.bands[i].name + '\n';
      }
      alert(bandString);
    }
  
    // Handles band creation
    createBand() {
      let name = prompt('Enter name for new band: ');
      this.bands.push(new Band(name));
    }
  
    // View details of a specific band, including its guitar players
    viewBand() {
      let index = prompt("Enter the index of the band that you want to view:");
      if (index > -1 && index < this.bands.length) {
        this.selectedBand = this.bands[index];
        let description = 'Band Name: ' + this.selectedBand.name + '\n' + this.selectedBand.describe() + '\n';
        for (let i = 0; i < this.selectedBand.guitarPlayers.length; i++) {
          description += i + ') ' + this.selectedBand.guitarPlayers[i].describe() + '\n';
        }
        let selection = this.showBandMenuOptions(description);
        switch (selection) {
          case '1':
            this.createGuitarPlayer();
            break;
          case '2':
            this.deleteGuitarPlayer();
        }
      }
    }
  
    // Handles band deletion
    deleteBand() {
      let index = prompt('Enter the index of the band that you wish to delete: ');
      if (index > -1 && index < this.bands.length) {
        this.bands.splice(index, 1);
      }
    }

  // Completes the creation of a guitar player for the selected band
  createGuitarPlayer() {
    let name = prompt('Enter name for new guitar player: ');
    let guitarType = prompt('Enter type of guitar (Electric/Acoustic): ');
    this.selectedBand.addGuitarPlayer(new GuitarPlayer(name, guitarType));
  }

  // Handles guitar player deletion from the selected band
  deleteGuitarPlayer() {
    let index = prompt('Enter the index of the guitar player that you wish to delete: ');
    if (index > -1 && index < this.selectedBand.guitarPlayers.length) {
      this.selectedBand.guitarPlayers.splice(index, 1);
    }
  }
}

// Instantiate the menu and start the application
let menu = new Menu();
menu.start();
const express = require('express');
const readline = require('readline');
const mongoose = require('mongoose');
const Glasses = require('../Mudoles/glasses');
const Table = require('cli-table3'); 
const router = express.Router();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function showData() {
  try {
    const data = await Glasses.find();

    const table = new Table({
      head: ['Index', 'Color', 'Price', 'Is Fragile', 'Material', 'Volume'],
      colWidths: [10, 20, 10, 15, 20, 10],
      style: {
        head: ['yellow'],  
        border: ['grey'],  
      }, 
    });

    data.forEach((glass, index) => {
      table.push([
        index + 1, 
        glass.Color,
        glass.Price,
        glass.IsFragile ? 'Yes' : 'No',
        glass.Material,
        glass.Volume,
      ]);
    });

    console.log(table.toString());
    return data; 
  } catch (err) {
    console.error('Error fetching data:', err.message);
  }
}
async function newData() {
  rl.question('Enter Glasses Color: ', (Color) => {
    rl.question('Enter Glasses Price: ', (Price) => {
      rl.question('Enter Is Fragile (y/n): ', (IsFragile) => {
        rl.question('Enter Material: ', (Material) => {
          rl.question('Enter Volume: ', async (Volume) => {
            try {
              const priceNumber = parseFloat(Price);
              const volumeNumber = parseInt(Volume, 10);
              const isFragileBoolean = IsFragile.toLowerCase() === 'y'; 
              const newGlasses = new Glasses({
                Color,
                Price: priceNumber,
                IsFragile: isFragileBoolean,
                Material,
                Volume: volumeNumber,
              });
              await newGlasses.save();
              console.log('Saved Glasses:');
              showData().then(() => {
                startSwitch();
              });
            } catch (error) {
              console.error('Error adding Glasses:', error.message);
            }
          });
        });2
      });
    });
  });
}
async function updateData() {
  try {
    const data = await showData(); 
    rl.question('Enter the Index of the Glass to update: ', async (indexInput) => {
      const index = parseInt(indexInput, 10) - 1;
      const glass = data[index];

      if (!glass) {
        console.log('Invalid index. Please try again.');
        showData().then(() => {
          startSwitch();
        });
        return;
      }

      rl.question(`Enter new Color (current: ${glass.Color}, or type 'n' to keep): `, (Color) => {
        Color = Color.toLowerCase() === 'n' ? glass.Color : Color;

        rl.question(`Enter new Price (current: ${glass.Price}, or type 'n' to keep): `, (Price) => {
          Price = Price.toLowerCase() === 'n' ? glass.Price : parseFloat(Price);

          rl.question(`Enter Is Fragile (current: ${glass.IsFragile}, or type 'n' to keep): `, (IsFragile) => {
            IsFragile = IsFragile.toLowerCase() === 'n' ? glass.IsFragile : IsFragile.toLowerCase() === 'y';

            rl.question(`Enter new Material (current: ${glass.Material}, or type 'n' to keep): `, (Material) => {
              Material = Material.toLowerCase() === 'n' ? glass.Material : Material;

              rl.question(`Enter new Volume (current: ${glass.Volume}, or type 'n' to keep): `, async (Volume) => {
                Volume = Volume.toLowerCase() === 'n' ? glass.Volume : parseInt(Volume, 10);

                const updates = {
                  Color,
                  Price,
                  IsFragile,
                  Material,
                  Volume,
                };

                try {
                  const updatedGlass = await Glasses.findByIdAndUpdate(glass._id, updates, { new: true });
                  console.log('\nUpdated Glass:');
                  showData().then(() => {
                    startSwitch();
                  });
                } catch (err) {
                  console.error('Error updating Glass:', err.message);
                  showData().then(() => {
                    startSwitch();
                  });
                }
              });
            });
          });
        });
      });
    });
  } catch (err) {
    console.error('Error showing data:', err.message);
  }
}

async function deleteData() {
  try {
    const data = await showData(); 
    rl.question('Enter the Index of the Glass to delete: ', async (indexInput) => {
      const index = parseInt(indexInput, 10) - 1; 
      const glass = data[index];

      if (!glass) {
        console.log('Invalid index. Please try again.');
        showData().then(() => {
          startSwitch();
        });
        return;
      }

      try {
        const deletedGlass = await Glasses.findByIdAndDelete(glass._id);
        if (deletedGlass) {
          console.log('\nDeleted Glass:');
        } else {
          console.log('No Glass found with the given index.');
        }
        showData().then(() => {
          startSwitch();
        });
      } catch (err) {
        console.error('Error deleting Glass:', err.message);
        showData().then(() => {
          startSwitch();
        });
      }
    });
  } catch (err) {
    console.error('Error showing data:', err.message);
  }
}


function startSwitch() {
  rl.question('\nChoose an operation:\n1. Show Data\n2. Add New Data\n3. Update Data\n4. Delete Data\nYour choice: ',
    (choice) => {
      switch (choice) {
        case '1':
          showData(); 
          break;
        case '2':
          newData();
          break;
        case '3':
          updateData();
          break;
        case '4':
          deleteData();
          break;
        default:
          console.log('Invalid choice, please try again.');
          startSwitch();
      }
    }
  );
}

showData().then(() => {
  startSwitch();
});

module.exports = router;


import { Given, When, Then } from '@cucumber/cucumber';
import { registerVehicle } from '../../src/App/commands/AddVehicleCommand';
import assert from 'assert';


let fleetId: string;
let vehicleId: string;
let result: string;


//1
Given('a fleet with ID {string}', function (id: string) {
  fleetId = id;
});

Given('a vehicle with ID {string}', function (id: string) {
  vehicleId = id;
});

When('I register the vehicle in the fleet', async function () {
  try {
    result = await registerVehicle(fleetId, vehicleId);
  } catch (error) {
    throw new Error('Failed to register the vehicle: ' + vehicleId + ' ' + error);
  }
});

Then('the vehicle should be added to the fleet', function () {
  if (result !== fleetId) {
    throw new Error('Failed to add the vehicle to the fleet');
  }
});

//2
Given('a non-existing vehicle with ID {string}', function (id:string) {
  vehicleId = id;
});


When('I register the non-existing vehicle in the fleet', async function () {
  
    this.result = async () => {
      await registerVehicle(fleetId, vehicleId);
    } 
});

Then('the registration of non-existing vehicle should fail', async function () {
  try {
    await this.result();
    // Si aucune erreur n'est levée, nous lançons une AssertionError
    assert.fail('Expected an error to be thrown');
  } catch (error) {
    // Vérifier que l'erreur est bien de type Error
    assert.ok(error instanceof Error);
  }
   
});


//3
Given('a non-existing fleet with ID {string}', function (id:string) {
  fleetId = id;
});

Given('a existing vehicle with ID {string}', function (id: string) {
  vehicleId = id;
});

When('I register the vehicle in the non-existing fleet', async function () {
  
    this.result = async () => {
      await registerVehicle(fleetId, vehicleId);
    } 
});

Then('the registration in non-existing fleet should fail', async function () {
  try {
    await this.result();
    // Si aucune erreur n'est levée, nous lançons une AssertionError
    assert.fail('Expected an error to be thrown');
  } catch (error) {
    // Vérifier que l'erreur est bien de type Error
    assert.ok(error instanceof Error);
  }
});


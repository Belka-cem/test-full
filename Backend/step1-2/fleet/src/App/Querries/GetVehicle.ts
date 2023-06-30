import MongoDB from "../../Infra/MongoDb";
import VehicleServiceBDD from "../../Infra/services/vehicle";

// Localiser un véhicule par son id 
export async function localizeVehicle(vehicleId: string){
    const db = await new MongoDB().getDb();
    const vehicleServiceBdd = new VehicleServiceBDD(db);
    let vehicleDto = await vehicleServiceBdd.getVehicle(vehicleId);

    if (!vehicleDto) throw new Error("getVehicle empty")
    return vehicleDto.currentLocations
}
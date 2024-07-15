import { BasicWorld } from "./BasicWorld";
import { Planet } from "./PlanetGen/Planet";

let world = new BasicWorld();
let myPlanet = new Planet(world.scene);

import { BasicWorld } from "./BasicWorld";
import { Planet } from "./PlanetGen/Planet";

const world = new BasicWorld();
const myPlanet = new Planet(world.scene);

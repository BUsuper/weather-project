import { DIRECTIONS } from '../constants/'

export function convertWindDirection (degrees) {
    const position = Math.floor(((degrees + 11.25) % 360) / 22.5)
    return DIRECTIONS[position];
}

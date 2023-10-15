import { IMAGES } from "./imgs";

enum GameType {
  DOUBLE = 'double',
  SINGER = 'singer',
  MILUTY = 'mulity'
}
export interface GameDetails {
  name: string,
  img: string,
  urlPath: string,
  type: GameType[] | GameType,
  description: string,
}
export const gameDetailsList: GameDetails[] = [{
  name: 'TSET',
  img: IMAGES.GAME_COVERAGE.KLEE_CATCH_NAHIDA,
  urlPath: '',
  type: GameType.SINGER,
  description: 'TEST.'
}, {
  name: 'Snack Game',
  img: IMAGES.GAME_COVERAGE.SNACK_GAME,
  urlPath: 'http://124.220.108.199:5500/SnackGame/',
  type: GameType.SINGER,
  description: 'Classical Snack Game.'
}, {
  name: 'Klee Catch Nahida',
  img: IMAGES.GAME_COVERAGE.KLEE_CATCH_NAHIDA,
  urlPath: 'http://124.220.108.199:5500/KleeCatchNahida/',
  type: GameType.DOUBLE,
  description: 'Klee trys to catch Nahida, while Nahida trys to get out of the way.'
}, {
  name: 'Snack Game 1',
  img: IMAGES.GAME_COVERAGE.SNACK_GAME,
  urlPath: 'http://124.220.108.199:5500/SnackGame/',
  type: GameType.SINGER,
  description: 'Classical Snack Game.'
}, {
  name: 'Klee Catch Nahida 1',
  img: IMAGES.GAME_COVERAGE.KLEE_CATCH_NAHIDA,
  urlPath: 'http://124.220.108.199:5500/KleeCatchNahida/',
  type: GameType.DOUBLE,
  description: 'Klee trys to catch Nahida, while Nahida trys to get out of the way.'
}, {
  name: 'Snack Game 2',
  img: IMAGES.GAME_COVERAGE.SNACK_GAME,
  urlPath: 'http://124.220.108.199:5500/SnackGame/',
  type: GameType.SINGER,
  description: 'Classical Snack Game.'
}, {
  name: 'Klee Catch Nahida 2',
  img: IMAGES.GAME_COVERAGE.KLEE_CATCH_NAHIDA,
  urlPath: 'http://124.220.108.199:5500/KleeCatchNahida/',
  type: GameType.DOUBLE,
  description: 'Klee trys to catch Nahida, while Nahida trys to get out of the way.'
}, {
  name: 'Snack Game 3',
  img: IMAGES.GAME_COVERAGE.SNACK_GAME,
  urlPath: 'http://124.220.108.199:5500/SnackGame/',
  type: GameType.SINGER,
  description: 'Classical Snack Game.'
}, {
  name: 'Snack Game 4',
  img: IMAGES.GAME_COVERAGE.SNACK_GAME,
  urlPath: 'http://124.220.108.199:5500/SnackGame/',
  type: GameType.SINGER,
  description: 'Classical Snack Game.'
}, {
  name: 'Snack Game 5',
  img: IMAGES.GAME_COVERAGE.SNACK_GAME,
  urlPath: 'http://124.220.108.199:5500/SnackGame/',
  type: GameType.SINGER,
  description: 'Classical Snack Game.'
}, {
  name: 'Snack Game 6',
  img: IMAGES.GAME_COVERAGE.SNACK_GAME,
  urlPath: 'http://124.220.108.199:5500/SnackGame/',
  type: GameType.SINGER,
  description: 'Classical Snack Game.'
}, {
  name: 'Snack Game 7',
  img: IMAGES.GAME_COVERAGE.SNACK_GAME,
  urlPath: 'http://124.220.108.199:5500/SnackGame/',
  type: GameType.SINGER,
  description: 'Classical Snack Game.'
}];
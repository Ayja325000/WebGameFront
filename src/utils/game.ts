import { IMAGES } from "./imgs";

export enum GameType {
  DOUBLE = 'double',
  SINGER = 'singer',
  MILUTY = 'mulity',
  LOCAL = 'local',
  TEST = 'test'
}
export interface GameDetails {
  gid: string,
  name: string,
  img: string,
  urlPath: string,
  type: GameType,
  tags: string[]
  description: string,
  maxPlayerNumber?: number
}
export const gameDetailsList: GameDetails[] = [{
  gid: 'klee_catch_nahida_0',
  name: 'Klee Catch Nahida',
  img: IMAGES.GAME_COVERAGE.KLEE_CATCH_NAHIDA,
  urlPath: 'http://124.220.108.199:5500/KleeCatchNahida/',
  type: GameType.DOUBLE,
  tags: ['Double', 'OnLine', 'Klee'],
  description: 'Klee trys to catch Nahida, while Nahida trys to get out of the way.'
}, {
  gid: 'snack_game_0',
  name: 'Snack Game',
  img: IMAGES.GAME_COVERAGE.SNACK_GAME,
  urlPath: 'http://124.220.108.199:5500/SnackGame/',
  type: GameType.LOCAL,
  tags: ['Local', 'Snack', 'NotOnline', 'Classical'],
  description: '[Not Online] Classical Snack Game.'
}, {
  gid: 'turn_over_chess',
  name: 'Turn Over Chess (Local)',
  img: IMAGES.GAME_COVERAGE.TURN_OVER_CHESS,
  urlPath: 'http://124.220.108.199:5500/Chesses/FanChesses/',
  type: GameType.LOCAL,
  tags: ['Local', 'Chess', 'NotOnline'],
  description: 'Classical Snack Game.'
}, {
  gid: 'test_0',
  name: 'TSET  (Cannot)',
  img: IMAGES.GAME_COVERAGE.KLEE_CATCH_NAHIDA,
  urlPath: '',
  type: GameType.TEST,
  tags: ['TSET', 'Tag2', 'Tag3'],
  description: 'TEST.'
}, {
  gid: 'live2d_demo',
  name: 'Live2D DEMO',
  img: IMAGES.GAME_COVERAGE.NAHIDA_LIVE2D,
  urlPath: 'http://124.220.108.199:5501/Samples/TypeScript/Demo/index.html',
  type: GameType.LOCAL,
  tags: ['Live2D', 'View', 'Nahida'],
  description: 'A Live2D test demo. Use model of Nahida.'
}, {
  gid: 'test_2',
  name: 'test_2 (Cannot)',
  img: IMAGES.GAME_COVERAGE.KLEE_CATCH_NAHIDA,
  urlPath: 'http://124.220.108.199:5500/KleeCatchNahida/',
  type: GameType.TEST,
  tags: ['Tag1', 'TSET'],
  description: 'Klee trys to catch Nahida, while Nahida trys to get out of the way.'
}, {
  gid: 'test_3',
  name: 'test_3_HELLO (Cannot)',
  img: IMAGES.GAME_COVERAGE.SNACK_GAME,
  urlPath: 'http://124.220.108.199:5500/SnackGame/',
  type: GameType.TEST,
  tags: ['TSET', 'Tag2'],
  description: 'Classical Snack Game.'
}, {
  gid: 'test_4',
  name: 'test_4_QWERT (Cannot)',
  img: IMAGES.GAME_COVERAGE.KLEE_CATCH_NAHIDA,
  urlPath: 'http://124.220.108.199:5500/KleeCatchNahida/',
  type: GameType.TEST,
  tags: ['Tag1', 'TSET'],
  description: 'Klee trys to catch Nahida, while Nahida trys to get out of the way.'
}, {
  gid: 'test_5',
  name: 'test_5_kbfawf (Cannot)',
  img: IMAGES.GAME_COVERAGE.SNACK_GAME,
  urlPath: 'http://124.220.108.199:5500/SnackGame/',
  type: GameType.TEST,
  tags: ['TSET'],
  description: 'Classical Snack Game.'
}, {
  gid: 'test_6',
  name: 'test_6 (Cannot)',
  img: IMAGES.GAME_COVERAGE.SNACK_GAME,
  urlPath: 'http://124.220.108.199:5500/SnackGame/',
  type: GameType.TEST,
  tags: ['TSET'],
  description: 'Classical Snack Game.'
}, {
  gid: 'test_7',
  name: 'test_7 (Cannot)',
  img: IMAGES.GAME_COVERAGE.SNACK_GAME,
  urlPath: 'http://124.220.108.199:5500/SnackGame/',
  type: GameType.TEST,
  tags: [],
  description: 'Classical Snack Game.'
}, {
  gid: 'test_8',
  name: 'test_8 (Cannot)',
  img: IMAGES.GAME_COVERAGE.SNACK_GAME,
  urlPath: 'http://124.220.108.199:5500/SnackGame/',
  type: GameType.TEST,
  tags: [],
  description: 'Classical Snack Game.'
}, {
  gid: 'test_9',
  name: 'test_9 (Cannot)',
  img: IMAGES.GAME_COVERAGE.SNACK_GAME,
  urlPath: 'http://124.220.108.199:5500/SnackGame/',
  type: GameType.TEST,
  tags: [],
  description: 'Classical Snack Game.'
}];

export const getGameInfo = (gameId: string) => {
  return gameDetailsList.find(item => item.gid == gameId);
}
import { IMAGES } from "./imgs";

enum GameType {
  DOUBLE = 'double',
  SINGER = 'singer',
  MILUTY = 'mulity'
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
  gid: 'test_0',
  name: 'TSET  (Cannot)',
  img: IMAGES.GAME_COVERAGE.KLEE_CATCH_NAHIDA,
  urlPath: '',
  type: GameType.SINGER,
  tags: ['TSET', 'Tag2', 'Tag3'],
  description: 'TEST.'
}, {
  gid: 'snack_game_0',
  name: 'Snack Game (Cannot)',
  img: IMAGES.GAME_COVERAGE.SNACK_GAME,
  urlPath: 'http://124.220.108.199:5500/SnackGame/',
  type: GameType.SINGER,
  tags: ['TSET', 'Tag2', 'Tag3', 'Tag1', 'Tag2', 'Tag3', 'Tag1', 'Tag2', 'Tag3'],
  description: 'Classical Snack Game.'
}, {
  gid: 'test_1',
  name: 'test_1 (Cannot)',
  img: '',
  urlPath: 'http://124.220.108.199:5500/SnackGame/',
  type: GameType.SINGER,
  tags: ['Tag1', 'Tag2', 'TSET'],
  description: 'Classical Snack Game.'
}, {
  gid: 'test_2',
  name: 'test_2 (Cannot)',
  img: IMAGES.GAME_COVERAGE.KLEE_CATCH_NAHIDA,
  urlPath: 'http://124.220.108.199:5500/KleeCatchNahida/',
  type: GameType.DOUBLE,
  tags: ['Tag1', 'TSET'],
  description: 'Klee trys to catch Nahida, while Nahida trys to get out of the way.'
}, {
  gid: 'test_3',
  name: 'test_3_HELLO (Cannot)',
  img: IMAGES.GAME_COVERAGE.SNACK_GAME,
  urlPath: 'http://124.220.108.199:5500/SnackGame/',
  type: GameType.SINGER,
  tags: ['TSET', 'Tag2'],
  description: 'Classical Snack Game.'
}, {
  gid: 'test_4',
  name: 'test_4_QWERT (Cannot)',
  img: IMAGES.GAME_COVERAGE.KLEE_CATCH_NAHIDA,
  urlPath: 'http://124.220.108.199:5500/KleeCatchNahida/',
  type: GameType.DOUBLE,
  tags: ['Tag1', 'TSET'],
  description: 'Klee trys to catch Nahida, while Nahida trys to get out of the way.'
}, {
  gid: 'test_5',
  name: 'test_5_kbfawf (Cannot)',
  img: IMAGES.GAME_COVERAGE.SNACK_GAME,
  urlPath: 'http://124.220.108.199:5500/SnackGame/',
  type: GameType.SINGER,
  tags: ['TSET'],
  description: 'Classical Snack Game.'
}, {
  gid: 'test_6',
  name: 'test_6 (Cannot)',
  img: IMAGES.GAME_COVERAGE.SNACK_GAME,
  urlPath: 'http://124.220.108.199:5500/SnackGame/',
  type: GameType.SINGER,
  tags: ['TSET'],
  description: 'Classical Snack Game.'
}, {
  gid: 'test_7',
  name: 'test_7 (Cannot)',
  img: IMAGES.GAME_COVERAGE.SNACK_GAME,
  urlPath: 'http://124.220.108.199:5500/SnackGame/',
  type: GameType.SINGER,
  tags: [],
  description: 'Classical Snack Game.'
}, {
  gid: 'test_8',
  name: 'test_8 (Cannot)',
  img: IMAGES.GAME_COVERAGE.SNACK_GAME,
  urlPath: 'http://124.220.108.199:5500/SnackGame/',
  type: GameType.SINGER,
  tags: [],
  description: 'Classical Snack Game.'
}, {
  gid: 'test_9',
  name: 'test_9 (Cannot)',
  img: IMAGES.GAME_COVERAGE.SNACK_GAME,
  urlPath: 'http://124.220.108.199:5500/SnackGame/',
  type: GameType.SINGER,
  tags: [],
  description: 'Classical Snack Game.'
}];

export const getGameInfo = (gameId: string) => {
  return gameDetailsList.find(item => item.gid == gameId);
}
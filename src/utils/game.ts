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
}
export const gameDetailsList: GameDetails[] = [{
  gid: 'test_0',
  name: 'TSET',
  img: IMAGES.GAME_COVERAGE.KLEE_CATCH_NAHIDA,
  urlPath: '',
  type: GameType.SINGER,
  tags: ['Tag1', 'Tag2', 'Tag3'],
  description: 'TEST.'
}, {
  gid: 'snack_game_0',
  name: 'Snack Game',
  img: IMAGES.GAME_COVERAGE.SNACK_GAME,
  urlPath: 'http://124.220.108.199:5500/SnackGame/',
  type: GameType.SINGER,
  tags: ['Tag1', 'Tag2', 'Tag3', 'Tag1', 'Tag2', 'Tag3', 'Tag1', 'Tag2', 'Tag3'],
  description: 'Classical Snack Game.'
}, {
  gid: 'klee_catch_nahida_0',
  name: 'Klee Catch Nahida',
  img: IMAGES.GAME_COVERAGE.KLEE_CATCH_NAHIDA,
  urlPath: 'http://124.220.108.199:5500/KleeCatchNahida/',
  type: GameType.DOUBLE,
  tags: ['Tag1', 'Tag2', 'Tag3'],
  description: 'Klee trys to catch Nahida, while Nahida trys to get out of the way.'
}, {
  gid: 'snack_game_1',
  name: 'Snack Game 1',
  img: IMAGES.GAME_COVERAGE.SNACK_GAME,
  urlPath: 'http://124.220.108.199:5500/SnackGame/',
  type: GameType.SINGER,
  tags: ['Tag1', 'Tag2', 'Tag3'],
  description: 'Classical Snack Game.'
}, {
  gid: 'klee_catch_nahida_1',
  name: 'Klee Catch Nahida 1',
  img: IMAGES.GAME_COVERAGE.KLEE_CATCH_NAHIDA,
  urlPath: 'http://124.220.108.199:5500/KleeCatchNahida/',
  type: GameType.DOUBLE,
  tags: ['Tag1', 'Tag2'],
  description: 'Klee trys to catch Nahida, while Nahida trys to get out of the way.'
}, {
  gid: 'snack_game_2',
  name: 'Snack Game 2',
  img: IMAGES.GAME_COVERAGE.SNACK_GAME,
  urlPath: 'http://124.220.108.199:5500/SnackGame/',
  type: GameType.SINGER,
  tags: ['Tag1', 'Tag2'],
  description: 'Classical Snack Game.'
}, {
  gid: 'klee_catch_nahida_2',
  name: 'Klee Catch Nahida 2',
  img: IMAGES.GAME_COVERAGE.KLEE_CATCH_NAHIDA,
  urlPath: 'http://124.220.108.199:5500/KleeCatchNahida/',
  type: GameType.DOUBLE,
  tags: ['Tag1', 'Tag2'],
  description: 'Klee trys to catch Nahida, while Nahida trys to get out of the way.'
}, {
  gid: 'snack_game_3',
  name: 'Snack Game 3',
  img: IMAGES.GAME_COVERAGE.SNACK_GAME,
  urlPath: 'http://124.220.108.199:5500/SnackGame/',
  type: GameType.SINGER,
  tags: ['Tag1'],
  description: 'Classical Snack Game.'
}, {
  gid: 'snack_game_4',
  name: 'Snack Game 4',
  img: IMAGES.GAME_COVERAGE.SNACK_GAME,
  urlPath: 'http://124.220.108.199:5500/SnackGame/',
  type: GameType.SINGER,
  tags: ['Tag1'],
  description: 'Classical Snack Game.'
}, {
  gid: 'snack_game_5',
  name: 'Snack Game 5',
  img: IMAGES.GAME_COVERAGE.SNACK_GAME,
  urlPath: 'http://124.220.108.199:5500/SnackGame/',
  type: GameType.SINGER,
  tags: [],
  description: 'Classical Snack Game.'
}, {
  gid: 'snack_game_6',
  name: 'Snack Game 6',
  img: IMAGES.GAME_COVERAGE.SNACK_GAME,
  urlPath: 'http://124.220.108.199:5500/SnackGame/',
  type: GameType.SINGER,
  tags: [],
  description: 'Classical Snack Game.'
}, {
  gid: 'snack_game_7',
  name: 'Snack Game 7',
  img: IMAGES.GAME_COVERAGE.SNACK_GAME,
  urlPath: 'http://124.220.108.199:5500/SnackGame/',
  type: GameType.SINGER,
  tags: [],
  description: 'Classical Snack Game.'
}];

export const getGameInfo = (gameId: string) => {
  return gameDetailsList.find(item => item.gid == gameId);
}
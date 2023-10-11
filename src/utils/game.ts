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
  name: 'Snack Game',
  img: '',
  urlPath: 'http://124.220.108.199:5500/SnackGame/',
  type: GameType.SINGER,
  description: 'Classical Snack Game.'
}];
import { Track } from './track'
export interface Album {
  name: String,
  releaseDate: string,
  coverImage: string,
  tracks: Track[]
}

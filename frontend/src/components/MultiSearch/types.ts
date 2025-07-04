export enum ContentType {
  TV_SHOW = 'TV Show',
  MOVIE = 'Movie',
  ANIME = 'Anime',
  MANGA = 'Manga',
  BOOK = 'Book',
  AUDIOBOOK = 'Audiobook'
}

export interface SearchResult {
  id: string;
  title: string;
  type: ContentType;
  voteAverage?: number;
}

export interface MultiSearchProps {
  onSearchComplete?: (results: SearchResult[]) => void;
  isDarkMode?: boolean;
} 
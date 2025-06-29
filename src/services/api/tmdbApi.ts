import { SearchResult, ContentType } from '../../components/MultiSearch/types';
import { config } from '../../config/env';
import { secureStorage } from '../storage/secureStorage';

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export const tmdbApi = {
  async initialize(): Promise<void> {
    await secureStorage.initialize(config.TMDB_API_KEY);
  },

  async searchTVShows(query: string): Promise<SearchResult[]> {
    try {
      const apiKey = await secureStorage.getApiKey();
      const response = await fetch(
        `${config.TMDB_BASE_URL}/search/tv?api_key=${apiKey}&query=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        throw new ApiError(response.status, `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      return data.results.map((show: any) => ({
        id: show.id.toString(),
        title: show.name || '',
        type: ContentType.TV_SHOW,
        voteAverage: show.vote_average || 0,
      }));
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'Failed to fetch results. Please try again.');
    }
  }
}; 
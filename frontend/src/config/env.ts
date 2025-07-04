interface EnvConfig {
  TMDB_API_KEY: string;
  TMDB_BASE_URL: string;
  ENV: 'development' | 'production' | 'test';
}

// Default development values - these should be overridden by environment variables
const defaultConfig: EnvConfig = {
  TMDB_API_KEY: '',
  TMDB_BASE_URL: 'https://api.themoviedb.org/3',
  ENV: 'development'
};

// Load environment variables
const envConfig: EnvConfig = {
  TMDB_API_KEY: process.env.TMDB_API_KEY || defaultConfig.TMDB_API_KEY,
  TMDB_BASE_URL: process.env.TMDB_BASE_URL || defaultConfig.TMDB_BASE_URL,
  ENV: (process.env.NODE_ENV as EnvConfig['ENV']) || defaultConfig.ENV
};

// Validate required environment variables
const validateEnvConfig = () => {
  const requiredVars: (keyof EnvConfig)[] = ['TMDB_API_KEY'];
  const missingVars = requiredVars.filter(key => !envConfig[key]);

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}. ` +
      'Please check your .env file and environment configuration.'
    );
  }
};

// Only validate in production
if (envConfig.ENV === 'production') {
  validateEnvConfig();
}

export const config = envConfig; 
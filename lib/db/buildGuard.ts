/**
 * Build-time database guard to prevent connection failures during static generation
 */

export const shouldSkipDatabase = (): boolean => {
  return process.env.BUILD_TIME === 'true' ||
         process.env.NEXT_PHASE === 'phase-production-build';
};

export const withBuildGuard = <T>(
  operation: () => Promise<T>,
  fallback: T
): Promise<T> => {
  if (shouldSkipDatabase()) {
    console.log('Skipping database operation during build');
    return Promise.resolve(fallback);
  }
  return operation();
};

interface RetryOptions {
  maxRetries?: number;
  baseDelay?: number;
  maxDelay?: number;
  timeout?: number;
}

/**
 * Wraps database operations with retry logic and timeout for cold start resilience
 */
export async function withRetry<T>(
  operation: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    maxRetries = 3,
    baseDelay = 1000,
    maxDelay = 10000,
    timeout = 15000
  } = options;

  let lastError: Error;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      // Add timeout to prevent hanging
      const result = await Promise.race([
        operation(),
        new Promise<never>((_, reject) => 
          setTimeout(() => reject(new Error('Database operation timeout')), timeout)
        )
      ]);
      return result;
    } catch (error) {
      lastError = error as Error;
      
      // Don't retry on certain errors
      if (error instanceof Error && (
        error.message.includes('validation') ||
        error.message.includes('duplicate key') ||
        error.message.includes('cast')
      )) {
        throw error;
      }

      if (attempt === maxRetries) {
        console.error(`Operation failed after ${maxRetries} retries:`, error);
        break;
      }

      // Exponential backoff with jitter
      const delay = Math.min(
        baseDelay * Math.pow(2, attempt) + Math.random() * 1000,
        maxDelay
      );
      
      console.warn(`Attempt ${attempt + 1} failed, retrying in ${delay}ms:`, error);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError!;
}

/**
 * Safe database operation with fallback
 */
export async function safeDbOperation<T>(
  operation: () => Promise<T>,
  fallback: T,
  options?: RetryOptions
): Promise<T> {
  try {
    return await withRetry(operation, options);
  } catch (error) {
    console.error('Database operation failed, using fallback:', error);
    return fallback;
  }
}

/**
 * Shared server utilities
 */

/**
 * Build pagination metadata from total count and current page/limit.
 */
export function buildPagination(total: number, page: number, limit: number) {
  return {
    page,
    limit,
    total,
    total_pages: Math.ceil(total / limit),
  };
}

/**
 * Calculate SQL offset from page and limit.
 */
export function getOffset(page: number, limit: number): number {
  return (page - 1) * limit;
}

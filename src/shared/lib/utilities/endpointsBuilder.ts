export const endpointsBuilder = {
  withQueryParams: <T extends object>(endpoint: string, queryParameters: T) => {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(queryParameters)) {
      if (value !== null && value !== undefined) {
        const transformedValue = String(value);
        params.append(key, transformedValue);
      }
    }

    const queryString = params.toString();
    return `${endpoint}${queryString ? `?${queryString}` : ''}`;
  },

  rest: (endpoint: string, target?: string | number) => {
    if (!target) {
      return endpoint;
    }
    return `${endpoint}/${target}`;
  },
};

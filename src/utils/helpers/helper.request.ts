
export const toQueryString = (obj: Record<string, string | number>): string => {
  const params = new URLSearchParams();

  Object.entries(obj).forEach(([key, value]) => {
    params.append(key, String(value));
  });

  return params.toString();
}
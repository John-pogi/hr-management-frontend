export async function fetchData<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`An error occured: ${response.statusText}`);
  }

  const data: T = await response.json();
  return data;

}

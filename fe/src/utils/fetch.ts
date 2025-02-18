import { shallowRef } from "vue";
import type { ShallowRef } from "vue";

export function useFetch<T>(
  url: string,
  params?: any
): { data: ShallowRef<T | undefined>; error: ShallowRef<Error | undefined> } {
  const data = shallowRef<T>();
  const error = shallowRef<Error>();

  fetch(url, params)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((json: T) => {
      data.value = json;
    })
    .catch((err: Error) => {
      error.value = err;
    });

  return { data, error };
}

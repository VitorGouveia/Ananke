type Nullable<T> = T | null;

export const promise = async <ReturnValue>(
  promise: Promise<ReturnValue>
): Promise<[Nullable<ReturnValue>, Nullable<Error>]> => {
  try {
    const data = await promise;

    return [data, null];
  } catch (error) {
    return [null, error as Error];
  }
};

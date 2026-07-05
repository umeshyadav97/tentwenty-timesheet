type RequestOptions = Omit<RequestInit, "body"> & {
  body?: BodyInit | object | null;
};

function resolveBody(body: RequestOptions["body"]) {
  if (!body || body instanceof FormData || body instanceof URLSearchParams) {
    return body;
  }

  return JSON.stringify(body);
}

export async function apiRequest<TResponse>(
  endpoint: string,
  options: RequestOptions = {},
) {
  const response = await fetch(endpoint, {
    ...options,
    body: resolveBody(options.body),
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error("Unable to complete request");
  }

  return (await response.json()) as TResponse;
}

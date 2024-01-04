if (!process.env.WORDPRESS_API_URL) {
  throw new Error("Missing API URL, please add it to your environment variables");
}

const API_URL = process.env.WORDPRESS_API_URL;

export async function fetchAPI(query = "", { variables }: Record<string, any> = {}) {
  const headers = { "Content-Type": "application/json" };
  const requestBody = JSON.stringify({ query, variables });

  try {
    const response = await fetch(API_URL, {
      headers,
      method: "POST",
      body: requestBody,
      cache: "no-store",
    });

    const jsonResponse = await response.json();
    if (jsonResponse.errors) {
      throw new Error(`Failed to fetch API: ${jsonResponse.errors}`);
    }
    return jsonResponse.data;
  } catch (error) {
    throw new Error(`Failed to fetch API: ${error}`);
  }
}

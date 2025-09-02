export async function fetchData(content?: any) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const url =
      'https://corsproxy.io/?' +
      'https://ai-travel-agent-worker.ajkendal-openai.workers.dev/';

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
      body: JSON.stringify(content),
    });

    clearTimeout(timeoutId);

    const data = await response.json();

    return data;
  } catch (error) {
    clearTimeout(timeoutId);
    console.error('Error fetching data:', error);
    return { error: 'Error fetching data' };
  }
}

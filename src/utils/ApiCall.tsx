export async function fetchData(content?: any) {
  try {
    const url = 'https://ai-travel-agent-worker.ajkendal-openai.workers.dev/';

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(content),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return { error: 'Error fetching data' };
  }
}

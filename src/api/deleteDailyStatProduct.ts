export async function deleteDailyStatProduct(tgId: number, id: string) {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const url = `http://localhost:3001/statistic/${tgId}/${id}`;

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error deleting daily statistic:", error);
    throw error;
  }
}

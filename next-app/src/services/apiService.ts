class ApiService {
  async loginUser(username: string, password: string) {
    const response = await fetch(`${process.env.NEXT_API_URL}/api/auth/local`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + process.env.STRAPI_API_KEY,
      },
      body: JSON.stringify({
        identifier: username,
        password,
      }),
    });
    return await response.json();
  }
}

export const apiService = new ApiService();

//* API.JS SCRIPT
export async function getWeather(city) {
  try {
    const response = await fetch(
      `https://weather-proxy.freecodecamp.rocks/api/city/${city}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

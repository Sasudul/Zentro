export async function geocodeAddress(address: string, city: string): Promise<{ lat: number; lng: number } | null> {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    console.warn('GOOGLE_MAPS_API_KEY is not configured. Geocoding will be skipped.');
    return null;
  }

  const query = encodeURIComponent(`${address}, ${city}`);
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error('Geocoding API error', response.status, response.statusText);
      return null;
    }

    const data = await response.json();
    if (data.status === 'OK' && data.results && data.results.length > 0) {
      const location = data.results[0].geometry.location;
      return {
        lat: location.lat,
        lng: location.lng
      };
    } else {
      console.warn('Geocoding failed for', query, 'Status:', data.status);
      return null;
    }
  } catch (error) {
    console.error('Error calling Geocoding API', error);
    return null;
  }
}

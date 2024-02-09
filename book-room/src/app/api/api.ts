

export default async function fetchAvailability() {

    const res = await fetch("https://rzssj8nj3c.execute-api.eu-central-1.amazonaws.com");
    const data = await res.json();
    const availability = data.availability;

    return availability;
}
export async function GET() {
  return new Response(
`# Trip Mitra Go

Website: https://tripmitrago.in

Trip Mitra Go provides reliable taxi and car rental services across Central India.

Services

- Airport Transfer
- One Way Taxi
- Round Trip
- Wedding Cars
- Corporate Travel
- Tempo Traveller
- Innova Crysta

Cities

- Balaghat
- Nagpur
- Jabalpur
- Raipur
- Gondia
- Kanha
- Pench
`,
    {
      headers: {
        "Content-Type": "text/plain",
      },
    }
  );
}
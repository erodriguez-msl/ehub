export async function POST(req: Request) {
    const body = await req.json();

    const res = await fetch('https://api.on24.com/v2/client/45733/event/' + body.eventId + '/registrant', {
        method: 'POST',
        headers: {
            accessTokenKey: process.env.ON24_KEY!,
            accessTokenSecret: process.env.ON24_SECRET!,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    const data = await res.json();

    return Response.json(data);
}

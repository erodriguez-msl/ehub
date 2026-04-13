import { NextResponse } from 'next/server';

// const EVENT_IDS = [5230781, 5315463];
const EVENT_IDS = [4696119, 5306042, 5231341, 5231351, 5291816, 5291819, 5261761];

function getEventStatus(event: any) {
    const now = new Date();
    const start = new Date(event.livestart);
    const end = new Date(event.liveend);

    if (now < start) return 'upcoming';
    if (now >= start && now <= end) return 'live';
    return 'ondemand';
}

function normalizeEvent(event: any) {
    return {
        id: event.eventid,
        name: event.description,
        // description: event.description,
        startDate: event.livestart,
        endDate: event.liveend,
        tz: event.displaytimezonecd,
        // thumbnail: event.thumbnailUrl || '/placeholder.jpg',
        status: getEventStatus(event),
        type: event.eventtype,
        contentType: event.contenttype,
        duration: event.eventduration,
        isActive: event.isactive,
        tags: event.tags,
        body: event.promotionalsummary,
    };
}

function groupEvents(events: any[]) {
    return {
        upcoming: events.filter(e => e.status === 'upcoming'),
        live: events.filter(e => e.status === 'live'),
        ondemand: events.filter(e => e.status === 'ondemand'),
    };
}

export async function GET() {
    try {
        const events = await Promise.all(
            EVENT_IDS.map(async id => {
                const res = await fetch(`https://api.on24.com/v2/client/45733/event/${id}`, {
                    headers: {
                        accessTokenKey: process.env.ON24_KEY!,
                        accessTokenSecret: process.env.ON24_SECRET!,
                    },
                    cache: 'no-store',
                });

                const data = await res.json();

                return normalizeEvent(data);
            }),
        );

        return NextResponse.json(groupEvents(events));
    } catch (err) {
        return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
    }
}

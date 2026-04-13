'use client';

import { use, useEffect, useState } from 'react';

import Link from 'next/link';
import EventCard from '../../../components/EventCard';

export default function EventPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [event, setEvent] = useState(null);
    const [recommended, setRecommended] = useState([]);

    useEffect(() => {
        if (!id) return;

        async function getEvent() {
            const data = await fetch(`/api/events/${id}`).then(res => res.json());

            setEvent(data);
        }

        async function listRecommended() {
            const data = await fetch(`/api/events`)
                .then(res => res.json())
                .then(data => [...(data.upcoming || []), ...(data.ondemand || [])].slice(0, 3));

            setRecommended(data);
        }

        getEvent();
        listRecommended();
    }, [id]);

    return (
        <div className='bg-gray-50 min-h-screen'>
            <div className='max-w-7xl mx-auto px-6 pt-6'>
                <Link href='/' className='text-sm text-gray-600 hover:text-black transition'>
                    ← Back to events
                </Link>
            </div>

            <div className='max-w-7xl mx-auto px-6 py-8 grid lg:grid-cols-3 gap-10'>
                <div className='lg:col-span-2 space-y-6'>
                    <div>
                        <h1 className='text-3xl md:text-4xl font-bold text-gray-900'>{event?.name}</h1>

                        <div className='mt-3 flex flex-wrap gap-3 text-sm text-gray-500'>
                            <span>{formatDate(event?.startDate)}</span>
                            <span>•</span>
                            <span className='capitalize'>{event?.status}</span>
                            <span>•</span>
                            <span>{event?.duration} min</span>
                        </div>
                    </div>

                    <div className='prose max-w-none prose-gray' dangerouslySetInnerHTML={{ __html: event?.body }} />
                </div>

                <div className='lg:col-span-1'>
                    <div className='sticky top-6 bg-white border rounded-2xl p-6 shadow-sm'>
                        <h2 className='text-lg font-semibold mb-4'>Register for this event</h2>

                        <form action='/api/register' method='POST' className='space-y-3'>
                            <input name='firstName' placeholder='First Name' className='w-full border rounded-lg px-3 py-2 text-sm' />

                            <input name='lastName' placeholder='Last Name' className='w-full border rounded-lg px-3 py-2 text-sm' />

                            <input name='email' placeholder='Email' className='w-full border rounded-lg px-3 py-2 text-sm' />

                            <input type='hidden' name='eventId' value={event?.id} />

                            <button className='w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition'>Register Now</button>
                        </form>

                        <p className='text-xs text-gray-500 mt-3'>You’ll receive a confirmation email after registering.</p>
                    </div>
                </div>
            </div>

            <div className='max-w-7xl mx-auto px-6 pb-16 mt-10'>
                <h2 className='text-2xl font-bold mb-6'>Explore</h2>

                <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {recommended.map(e => (
                        <EventCard key={e.id} event={e} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function formatDate(dateString) {
    if (!dateString) return '';

    return new Date(dateString).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
    });
}

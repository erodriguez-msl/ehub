import Hero from '../components/Hero';
import EventCard from '../components/EventCard';

export default async function Home() {
    const events = await fetch('http://localhost:3000/api/events', {
        cache: 'no-store',
    }).then(res => res.json());

    return (
        <main className='min-h-screen bg-gray-50'>
            <div className='max-w-7xl mx-auto px-6 pt-10'>
                <Hero />
            </div>

            <div className='max-w-7xl mx-auto px-6 py-12 space-y-16'>
                <section>
                    <div className='flex items-center justify-between mb-6'>
                        <h2 className='text-2xl md:text-3xl font-bold text-gray-900'>Upcoming Events</h2>
                        <span className='text-sm text-gray-500'>{events.upcoming?.length || 0} events</span>
                    </div>

                    {events.upcoming?.length ? (
                        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                            {events.upcoming.map(e => (
                                <EventCard key={e.id} event={e} />
                            ))}
                        </div>
                    ) : (
                        <EmptyState label='No upcoming events' />
                    )}
                </section>

                <section>
                    <div className='flex items-center justify-between mb-6'>
                        <h2 className='text-2xl md:text-3xl font-bold text-gray-900'>On-Demand</h2>
                        <span className='text-sm text-gray-500'>{events.ondemand?.length || 0} videos</span>
                    </div>

                    {events.ondemand?.length ? (
                        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                            {events.ondemand.map(e => (
                                <EventCard key={e.id} event={e} />
                            ))}
                        </div>
                    ) : (
                        <EmptyState label='No on-demand content yet' />
                    )}
                </section>
            </div>
        </main>
    );
}

/* 🔹 Simple empty state */
function EmptyState({ label }: { label: string }) {
    return <div className='border border-dashed border-gray-300 rounded-xl p-10 text-center text-gray-500'>{label}</div>;
}

import Link from 'next/link';

export default function EventCard({ event }) {
    const formattedDate = formatDate(event.startDate);

    return (
        <Link href={`/event/${event.id}`}>
            <div className='group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full flex flex-col'>
                {/* Thumbnail */}
                <div className='relative h-44 shrink-0 bg-gradient-to-br from-indigo-500 to-blue-600'>
                    {/* Status badge */}
                    <span className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full text-white ${getBadgeColor(event.status)}`}>{event.status}</span>

                    {/* Optional overlay */}
                    {event.status === 'ondemand' && (
                        <div className='absolute inset-0 flex items-center justify-center bg-black/20'>
                            <span className='text-white text-sm font-medium'>▶ Watch</span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className='p-5 space-y-3 h-full flex flex-col justify-between'>
                    <div>
                        <h3 className='text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition'>{event.name}</h3>

                        <p className='text-sm text-gray-500'>{formattedDate}</p>
                    </div>

                    {/* CTA */}
                    <div className='pt-2'>
                        <span className='text-blue-600 font-medium text-sm group-hover:underline'>{event.status === 'ondemand' ? 'Watch Now' : 'View Details'}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

/* 🎨 Badge color logic */
function getBadgeColor(status: string) {
    switch (status) {
        case 'live':
            return 'bg-red-500';
        case 'upcoming':
            return 'bg-green-600';
        case 'ondemand':
            return 'bg-gray-700';
        default:
            return 'bg-gray-400';
    }
}

/* 🧠 Better date formatting */
function formatDate(dateString: string) {
    if (!dateString) return '';

    const date = new Date(dateString);

    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
    });
}

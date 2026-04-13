import Link from 'next/link';

export default function Footer() {
    return (
        <footer className='bg-white'>
            <div className='max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6'>
                <div>
                    <h3 className='text-sm font-semibold text-gray-900'>DermEdge Hub</h3>
                    <p className='text-xs text-gray-500 mt-1'>Webinars & on-demand learning</p>
                </div>

                <div className='flex flex-wrap gap-4 text-xs text-gray-600'>
                    <Link href='/' className='hover:text-black transition'>
                        Home
                    </Link>
                    <Link href='/' className='hover:text-black transition'>
                        Events
                    </Link>
                    <Link href='/' className='hover:text-black transition'>
                        On-Demand
                    </Link>
                    <Link href='/' className='hover:text-black transition'>
                        Support
                    </Link>
                </div>

                <div className='text-xs text-gray-500'>© {new Date().getFullYear()} DermEdge</div>
            </div>
        </footer>
    );
}

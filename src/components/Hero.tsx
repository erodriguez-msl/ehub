import Link from 'next/link';

export default function Hero() {
    return (
        <section className='relative w-full h-[320px] rounded-2xl overflow-hidden'>
            <div
                className='absolute inset-0 bg-center bg-cover'
                style={{
                    backgroundImage: "url('https://orion.akamaized.net/media/cv/video_library/client/45/73/3/rt/18/48/26/8/rt/DermEdge_ON24EHubBanner_1500x500_REV4226_WyhMl_resized_large.png')",
                }}
            />

            {/* <div className='absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent' /> */}

            {/* <div className='relative h-full flex items-center'>
                <div className='max-w-2xl px-8 md:px-12'>
                    <h1 className='text-3xl md:text-5xl font-bold text-white leading-tight'>DermEdge Webinar Hub</h1>

                    <p className='mt-4 text-white/80 text-sm md:text-base max-w-lg'>Explore upcoming and on-demand webinars, expert sessions, and clinical insights.</p>

                    <div className='mt-6 flex gap-3'>
                        <Link href='#events' className='bg-white text-black px-5 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 transition'>
                            Browse Events
                        </Link>

                        <Link href='/event/4990210' className='border border-white/40 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-white/10 transition'>
                            Featured Session
                        </Link>
                    </div>
                </div>
            </div> */}
        </section>
    );
}

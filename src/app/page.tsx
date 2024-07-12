import { Button } from '@/components/ui/button';
import { UserButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';

export default function Example() {
    const { userId } = auth();

    return (
        <section>
            <header className='container z-[100] mx-auto border-b bg-white/30 shadow-sm backdrop-blur-sm dark:bg-slate-800/30'>
                <div className='z-[100] flex w-full items-center justify-between py-4'>
                    <Link href={'/'} className='flex items-center justify-center gap-2'>
                        <h1 className='text-xl font-bold'>MrBrain</h1>
                    </Link>
                    <div>
                        {userId ? (
                            <UserButton afterSignOutUrl='/' />
                        ) : (
                            <Button aria-label='get-start' asChild>
                                <Link href='/sign-in'>Signin</Link>
                            </Button>
                        )}
                    </div>
                </div>
            </header>

            <div className='relative'>
                <div className='relative px-6 lg:px-8'>
                    <div
                        className='absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'
                        aria-hidden='true'
                    >
                        <div
                            className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                        />
                    </div>
                    <div className='mx-auto flex h-[90vh] max-w-2xl flex-col justify-center'>
                        <div className='mb-6 flex justify-center'>
                            <div className='relative rounded-full px-3 py-1 text-[12px] leading-6 ring-1 ring-gray-900/10 hover:ring-gray-200 hover:ring-gray-900/20 dark:ring-gray-500 sm:text-sm'>
                                Enhance and Edit your image with
                                <Link href='/rooms' className='font-semibold text-indigo-600'>
                                    <span className='absolute inset-0' aria-hidden='true' />{' '}
                                    Mrbrain <span aria-hidden='true'>{'->'}</span>
                                </Link>
                            </div>
                        </div>
                        <div className='text-center'>
                            <h1 className='text-4xl font-bold tracking-tight sm:text-6xl'>
                                Lets edit and enhance your images
                            </h1>
                            <p className='mt-6 text-lg leading-8 text-gray-600'>
                                This platform is for sharing your screen and working with other
                                random developers online so that you can work together
                            </p>
                            <div className='mt-10 flex items-center justify-center gap-x-6'>
                                <Button aria-label='get-start' asChild>
                                    <Link href='/sign-in'>Get started</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex !flex-col items-center justify-between space-y-[15px] border-t px-5 py-[20px] md:!flex-row md:space-y-0 lg:px-28'>
                <Link href={'/'} className='flex-1'>
                    <h1 className='text-xl font-bold'>MrBrain.</h1>
                </Link>
                <p className='flex-2 text-center text-sm text-gray-500'>
                    &copy; {new Date().getFullYear()} MrBrain. All rights reserved.
                </p>
                <p className='flex-1 text-end text-sm'>
                    This app is createdy by{' '}
                    <a className='underline' href='https://github.com/Kaungmyatkyaw2'>
                        Kaung Myat Kyaw
                    </a>
                </p>
            </div>
        </section>
    );
}

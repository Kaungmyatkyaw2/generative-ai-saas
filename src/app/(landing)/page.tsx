import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const LandingPage = () => {
    return (
        <div>
            <div className='flex items-center justify-center gap-3'>
                <Button asChild>
                    <Link href={'/sign-in'}>Sig in</Link>
                </Button>
                <Button asChild>
                    <Link href={'/sign-up'}>Sig up</Link>
                </Button>
            </div>
        </div>
    );
};

export default LandingPage;

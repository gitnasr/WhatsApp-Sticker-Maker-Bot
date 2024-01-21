import * as React from 'react';

import Layout from '@/components/layout/Layout';
import ArrowLink from '@/components/links/ArrowLink';
import ButtonLink from '@/components/links/ButtonLink';
import UnderlineLink from '@/components/links/UnderlineLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import Seo from '@/components/Seo';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */
import Vercel from '~/svg/Vercel.svg';
import NextImage from '@/components/NextImage';
import Button from '@/components/buttons/Button';

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <section className='bg-black text-white'>
          <div className='layout flex min-h-screen flex-col items-center justify-center text-center'>
            <div className='  text-center '>
              <NextImage
                alt={'WhatsApp Sticker Maker Bot'}
                src={'/images/WASticker.png'}
                width={180}
                height={180}
              />
            </div>
            <h1 className='mt-4 bg-gradient-to-r from-green-400 to-blue-600 bg-clip-text text-3xl font-extrabold text-transparent lg:text-8xl '>
              WhatsApp Sticker Maker Bot
            </h1>
            <h3 className='mt-2 max-w-lg text-gray-200'>
              Simple WhatsApp Bot to create your own WhatsApp stickers by
              sending or forward images to the bot number.
            </h3>
            <NextImage
              alt={'QR of WhatsApp Sticker Maker Bot'}
              src={'/images/qr-code.png'}
              width={286}
              height={286}
              className={'my-3'}
            />

            <Button
              onClick={() =>
                window.open('https://wa.me/+201272340825', '_blank')
              }
              className='my-6  text-center'
              variant='light'
            >
              <span className='text-center text-lg'>
                Open WhatsApp Sticker Maker Bot
              </span>
            </Button>
            <video
              src={'/videos/promo.mp4'}
              autoPlay={true}
              className={'w-full'}
              loop
              muted
            />

            <footer className='my-2 text-gray-700'>
              © {new Date().getFullYear()} By{' '}
              <UnderlineLink href='https://gitnasr.com'>
                Mahmoud Nasr
              </UnderlineLink>
            </footer>
          </div>
        </section>
      </main>
    </Layout>
  );
}

<<<<<<< Updated upstream
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

function HeroSection() {
  return (
    <section className="relative mx-auto flex flex-col z-0 items-center justify-center py-16 sm:py-20 lg:pb-28 transition-all animate-in lg:px-12 max-w-7xl">
      <div className="flex">
        <div className="relative p-[1px] overflow-hidden rounded-full bg-linear-to-r from-rose-200 via-rose-500 to-rose-800 animate-gradient-x group">
          <Badge
            variant="secondary"
            className="relative px-6 py-2 text-base font-medium rounded-full bg-white group-hover:bg-rose-200 transition-colors duration-200"
          >
            <Sparkles className="w-6 h-6 mr-2 text-rose-600 animate-pulse" />
            <p className=" text-base text-rose-600">Powered By AI</p>
          </Badge>
        </div>
      </div>
      <h1 className="font-bold py-6 text-center">
        Transform PDFs into{' '}
        <span className="relative inline-block">
          <span className="relative z-10 px-2">concise</span>
          <span
            className="absolute inset-0 bg-rose-200/50 -skew-y-1 -rotate-2 rounded-lg -skew-3 z-0"
            aria-hidden="true"
          ></span>
        </span>{' '}
        summaries
      </h1>
      <h2 className="text-lg sm:text-xl lg:text-2xl text-center px-4 lg:px-0 lg:max-w-4xl text-gray-600">
        Get a beautiful summary reel of the document in seconds.
      </h2>
      <Button
        variant={'link'}
        className="text-white mt-6 text-base sm:text-lg lg:text-xl transition-all duration-300 rounded-full px-8 sm:px-10 lg:px-12 py-6 sm:py-7 lg:py-8 lgmt-16 bg-linear-to-r from-slate-900 to-rose-500 hover:bg-linear-to-l hover:no-underline font-bold"
      >
        <Link href={'/#pricing'} className="flex gap-2 items-center">
          <span>Try Summafy</span>
          <ArrowRight className="animate-pulse" />
        </Link>
      </Button>
    </section>
  );
}

export default HeroSection;
=======
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
    const { userId } = await auth()

    const destination = userId ? '/upload' : '/sign-in'
    return (
        <section className="relative mx-auto flex flex-col justify-center items-center z-0 py-16 sm:py-20 lg:pb-28 transition-all animate-in lg:px-12 max-w-7xl">

            <div className="relative p-[1px] overflow-hidden rounded-full bg-linear-to-r from-teal-200 via-teal-500 to-teal-800 animate-gradient-x">
                <Badge variant={"secondary"}
                    className="relative px-6 py-2 text-base font-medium bg-white rounded-full group-hover:bg-blue-50 transition-colors duration-200 hover:bg-teal-200">
                    <Sparkles style={{ height: '25px', width: '25px' }} className="mr-2 text-teal-600 animate-pulse" />
                    <p className="text-base text-teal-600">Powered by AI</p>
                </Badge>
            </div>
            <h1 className="font-bold py-6 text-center">
                Transform PDFs into{' '}
                <span className="relative inline-block">
                    <span className="relative z-10 px-2">concise</span>
                    <span className=" absolute inset-0 bg-teal-200/50 rounded-lg transform -skew-y-0 transition-transform duration-2 animate-spin-once " aria-hidden="true"></span>
                </span> {'  '}
                summaries
            </h1>
            <h2 className="text-center text-lg sm:text-xl lg:text-2xl px-4 lg:px-0 lg:max-w-4xl text-gray-600">Get a beautiful summary reel of the document in seconds.</h2>
            <Link href={destination} className="cursor-default">
                <Button variant={'link'} className="transform hover:scale-105 transition hover:no-underline flex gap-2 text-base items-center bg-teal-500 hover:bg-blue-600 text-white mt-6 sm:text-lg lg:text-xl rounded-full px-12 sm:px-14 py-7 lg:px-16 sm:py-7 lg:py-8 lg:mt-16  duration-320 ease-in-out ">
                    <span className="pl-2">Try Summafy</span>
                    <ArrowRight className="animate-pulse" />
                </Button>
            </Link>
        </section>
    )
}
>>>>>>> Stashed changes

"use client";
import React from "react";
import { Dumbbell, Clock, Award } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
export default function Home() {
  const { data: session } = useSession();
  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-gray-100">
      {/* Hero Sekcija */}
      <section className=" w-full bg-slate-500 text-white py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Summer Kick Duga Resa
          </h1>
          <Image
            src="/images/summerkicklogo.png"
            width={300}
            height={300}
            alt="SummerKick Duga Resa logo"
            className="mx-auto"
          />
          <p className="text-xl md:text-2xl mb-8">
            Budite u formi, naučite samoobranu i zabavite se ovog ljeta!
          </p>

          {!session ? (
            <Link
              href="/register"
              className="bg-white text-red-500 font-bold py-3 px-6 rounded-full hover:bg-gray-200 transition duration-300 border-slate-900 border"
            >
              Prijavite se odmah
            </Link>
          ) : (
            <Link
              href="/reservation"
              className="bg-white text-red-500 font-bold py-3 px-6 rounded-full hover:bg-gray-200 transition duration-300 border-slate-900 border"
            >
              Rezerviraj termin
            </Link>
          )}
        </div>
      </section>
      {/* O programu Sekcija */}
      <section className="w-full bg-gray-200 py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-black">
            O našem ljetnom programu
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Naši ljetni treninzi kickboxinga dizajnirani su da vam pomognu
            postići vaše fitness ciljeve dok učite vrijedne vještine samoobrane.
            Program traje cijelo ljeto, pružajući vam priliku da kontinuirano
            napredujete i poboljšate svoju snagu, fleksibilnost i
            kardiovaskularnu izdržljivost.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            Treninzi se održavaju na stadionu NK Duga Resa, na otvorenom
            prostoru koji omogućuje ugodne treninge čak i tijekom vrućih ljetnih
            dana. Za početak, potrebno je da donesete svoje rukavice i bandaže.
          </p>
          <p className="text-lg text-gray-700">
            Pridružite nam se ovog ljeta pod vodstvom trenera Matije Brckovića i
            transformirajte svoje tijelo i um! Bez obzira jeste li početnik ili
            iskusni borac, naš program je prilagođen svim razinama.
          </p>
        </div>
      </section>
      {/* Značajke Sekcija */}
      <section className="w-full py-16 px-4 md:px-8 text-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Zašto odabrati naše treninge?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <Dumbbell size={48} className="text-red-700 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Stručni instruktor</h3>
              <p className="text-gray-600">
                Učite od Matije Brckovića, trener sa godinama iskustva u
                borilačkim sportovima.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Clock size={48} className="text-red-700 mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Fleksibilan raspored
              </h3>
              <p className="text-gray-600">
                Dvije grupe: za početnike i napredne. Odaberite termin koji vam
                najbolje odgovara.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Award size={48} className="text-red-700 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Za sve razine</h3>
              <p className="text-gray-600">
                Bez obzira jeste li početnik ili napredni, imamo grupe
                prilagođene vašoj razini.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

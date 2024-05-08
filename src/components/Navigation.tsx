"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo.png";
import { usePathname, useRouter } from "next/navigation";
import { qrState, useQr } from "@/lib/store/Qr";
import { useEffect } from "react";
import { browserSessionPersistence, onAuthStateChanged, setPersistence } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";

export default function Navigation() {
    const pathName = usePathname();
    const route = useRouter();
    const { setResult } = useQr() as qrState;

    const handleGoBack = () => {
        setResult("");
        route.back();
    };

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setPersistence(auth, browserSessionPersistence);
            } else {
                console.log("user is logged out");
            }
        });
    }, []);

    return (
        <nav className="sticky top-0 z-20 w-full shadow-md bg-white h-24 ">
            <div className="flex h-full max-w-6xl items-center justify-start">
                {pathName !== "/" && (
                    <button onClick={handleGoBack}>
                        <img
                            src="/BackIcon.svg"
                            alt="Volver al menu"
                            className="size-10 -rotate-90 cursor-pointer hover:scale-125 transform transition-transform ease-in-out duration-300"
                        />
                    </button>
                )}
                <Link
                    href="/"
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                >
                    <Image
                        priority={true}
                        width={750}
                        height={300}
                        className="size-24 object-contain w-auto sm:h-20 sm:w-auto"
                        src={logo}
                        alt="Logo de 101Patitas"
                    />
                </Link>
            </div>
        </nav>
    );
}

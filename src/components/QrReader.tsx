"use client";

import QrScanner from "qr-scanner";
import { useRef, useEffect, useState } from "react";
import { useQr, qrState } from "@/lib/store/Qr";

import QrFrame from "@/assets/qr-frame.svg";
import { useRouter } from "next/navigation";

export default function QrReader() {
  const scanner = useRef<QrScanner>();
  const videoEl = useRef<HTMLVideoElement>(null);
  const qrBoxEl = useRef<HTMLDivElement>(null);
  const [qrOn, setQrOn] = useState<boolean>(false);

  const { setResult } = useQr() as qrState;

  const router = useRouter();

  const onScanSuccess = (result: QrScanner.ScanResult) => {
    setResult(result.data);
    router.push("/puntos/cargar");
  };

  const onScanFail = (err: string | Error) => {
    console.log(err);
  };

  const toggleQrScanner = () => {
    if (qrOn) {
      scanner?.current?.stop();
      setQrOn(false);
    } else {
      scanner?.current?.start();
      setQrOn(true);
    }
  };

  useEffect(() => {
    if (videoEl?.current && !scanner.current) {
      scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
        onDecodeError: onScanFail,
        preferredCamera: "environment",
        highlightScanRegion: true,
        highlightCodeOutline: true,
        overlay: qrBoxEl?.current || undefined,
      });

      scanner?.current
        ?.start()
        .then(() => setQrOn(true))
        .catch((err) => {
          if (err) setQrOn(false);
        });
    }

    return () => {
      if (!videoEl?.current) {
        scanner?.current?.stop();
      }
    };
  }, []);

  return (
    <div className="max-w-lg h-full relative aspect-square">
      <button
        onClick={toggleQrScanner}
        className="py-2 px-4 bg-secondary-500 rounded-xl text-white hover:bg-secondary-600"
      >
        {qrOn ? "Stop" : "Start"} QR Scanner
      </button>
      <video className="w-full h-full object-cover" ref={videoEl}></video>
      <div ref={qrBoxEl}>
        <img
          src={QrFrame}
          alt="Qr Frame"
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      </div>
    </div>
  );
}

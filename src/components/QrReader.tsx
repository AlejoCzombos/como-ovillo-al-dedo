"use client";

import QrScanner from "qr-scanner";
import { useRef, useEffect, useState } from "react";
import { useQr, qrState } from "@/lib/store/Qr";

import { useRouter } from "next/navigation";

export default function QrReader() {
  const scanner = useRef<QrScanner>();
  const videoEl = useRef<HTMLVideoElement>(null);
  const qrBoxEl = useRef<HTMLDivElement>(null);
  const [qrOn, setQrOn] = useState<boolean>(false);

  const { setResult, setIsOpen } = useQr() as qrState;

  const router = useRouter();

  const onScanSuccess = (result: QrScanner.ScanResult) => {
    setResult(result.data);
    setIsOpen(false);
  };

  const onScanFail = (err: string | Error) => {
    console.log(err);
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
      <video className="w-full h-full object-cover" ref={videoEl}></video>
      <div ref={qrBoxEl}>
        <img
          src="/qr-frame.svg"
          alt="Qr Frame"
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      </div>
    </div>
  );
}

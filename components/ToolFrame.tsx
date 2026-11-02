"use client";

import { useEffect, useRef, useState } from "react";

// Shows a same-origin single-file tool and grows the frame to fit its content,
// so the page scrolls naturally instead of the frame.
export default function ToolFrame({ src, title }: { src: string; title: string }) {
  const ref = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(1600);

  useEffect(() => {
    const frame = ref.current;
    if (!frame) return;
    let ro: ResizeObserver | undefined;
    const attach = () => {
      const doc = frame.contentDocument;
      if (!doc?.body) return;
      const fit = () => setHeight(Math.max(doc.documentElement.scrollHeight, doc.body.scrollHeight));
      fit();
      ro?.disconnect();
      ro = new ResizeObserver(fit);
      ro.observe(doc.body);
    };
    frame.addEventListener("load", attach);
    attach();
    return () => {
      frame.removeEventListener("load", attach);
      ro?.disconnect();
    };
  }, []);

  return <iframe ref={ref} src={src} title={title} className="block w-full border-0 bg-ink" style={{ height }} />;
}

"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";
const DOMAIN = "www.institutonexxa.com";

/** Rotas do funil TikTok (slug terminado em "2") — não carregar Meta Pixel aqui */
function isTikTokFunnelRoute(pathname: string | null): boolean {
  if (!pathname) return false;
  return /\/[^/]*2$/.test(pathname);
}

export function MetaPixelGate() {
  const pathname = usePathname();
  const hideMeta = isTikTokFunnelRoute(pathname);

  if (!META_PIXEL_ID || hideMeta) return null;

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');
          `.trim(),
        }}
      />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
      <Script
        src={`https://connect.facebook.net/signals/config/${META_PIXEL_ID}?v=2.9.94&r=stable&domain=${DOMAIN}`}
        strategy="afterInteractive"
      />
    </>
  );
}

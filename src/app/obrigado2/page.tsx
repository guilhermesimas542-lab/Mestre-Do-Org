"use client";
/* LP Mestre do Orgasmo — Página de Obrigado 2 (cópia independente do /obrigado) */
import { useEffect, useRef } from "react";

const MEMBERS_URL = "https://acesso.institutonexxa.com/";

const IMG = {
  logoBanner: "https://www.figma.com/api/mcp/asset/4a9f9f0b-c84a-4319-a9e0-77535333eb3b",
  laptop:     "https://www.figma.com/api/mcp/asset/5785ba52-b866-498c-bfcc-4c67bf088610",
  phone:      "https://www.figma.com/api/mcp/asset/975694b4-1537-4fe5-bd71-9b4032effdd6",
  ellipse:    "https://www.figma.com/api/mcp/asset/994428c3-19db-4a46-abab-574e9ad92e25",
  nexxa:      "https://www.figma.com/api/mcp/asset/6639bb3e-e6ee-4bad-b639-bb42f0622fe3",
};

export default function Obrigado2Page() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!document.getElementById("tiktok-pixel")) {
      const s = document.createElement("script");
      s.id = "tiktok-pixel";
      s.textContent = `!function (w, d, t) {
        w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
        var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
        ;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
        ttq.load('D6LKD6JC77UBOQFNO1E0');
        ttq.page();
      }(window, document, 'ttq');`;
      document.head.appendChild(s);
    }
  }, []);

  useEffect(() => {
    function firePurchase() {
      if (typeof window !== "undefined" && (window as unknown as { ttq?: { track: (e: string, p: object) => void } }).ttq) {
        (window as unknown as { ttq: { track: (e: string, p: object) => void } }).ttq.track("Purchase", {
          value: 167.0,
          currency: "BRL",
        });
      }
    }
    firePurchase();
    const t = setTimeout(firePurchase, 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const inner = innerRef.current;
    const outer = outerRef.current;
    if (!inner || !outer) return;

    function applyScale() {
      if (!inner || !outer) return;
      inner.style.transform = "none";
      const naturalHeight = inner.scrollHeight;
      const scale = window.innerWidth / 390;
      inner.style.transformOrigin = "top left";
      inner.style.transform = `scale(${scale})`;
      outer.style.height = naturalHeight * scale + "px";
    }

    applyScale();
    window.addEventListener("resize", applyScale);
    window.addEventListener("load", applyScale);

    return () => {
      window.removeEventListener("resize", applyScale);
      window.removeEventListener("load", applyScale);
    };
  }, []);

  return (
    <div ref={outerRef} style={{ width: "100%", position: "relative" }}>
    <div ref={innerRef} style={{ width: 390, position: "absolute", top: 0, left: 0 }}>
    <main className="w-[390px] bg-black text-white overflow-hidden">

      {/* ═══ HERO ═══ */}
      <section className="relative w-full flex flex-col items-center px-[19.5px] pt-[59px] pb-10">

        <div className="absolute pointer-events-none" style={{ left: 266, top: 14, width: 296, height: 296, overflow: "hidden", opacity: 0.5 }}>
          <img src={IMG.ellipse} alt="" className="absolute size-full" />
        </div>
        <div className="absolute pointer-events-none" style={{ left: -172, top: 384, width: 296, height: 296, overflow: "hidden", opacity: 0.5 }}>
          <img src={IMG.ellipse} alt="" className="absolute size-full" />
        </div>

        <div className="w-[177px] h-[108px] overflow-hidden rounded-[4px]">
          <img src={IMG.logoBanner} alt="Mestre do Orgasmo" className="w-full h-full object-cover" />
        </div>

        <div className="mt-5 w-[334px] text-center">
          <p className="text-[28px] font-bold text-[#58e400] leading-[30.42px]">Parabéns, Mestre!</p>
          <p className="mt-1 text-[20px] font-normal text-white leading-[22.4px]">
            Sua inscrição no Mestre do Orgasmo foi confirmada com sucesso!
          </p>
        </div>

        <div
          className="mt-5 w-[309px] h-px"
          style={{ background: "linear-gradient(to right, rgba(0,0,0,0), #ff3838 52.885%, rgba(0,0,0,0))" }}
        />

        <p className="mt-4 text-[16px] font-normal text-white text-center leading-[21.4px] w-[315px]">
          Para acessar o treinamento, clique no botão abaixo e faça login na Área de Membros:
        </p>

        <div className="relative mt-4 w-full flex justify-center" style={{ height: 160 }}>
          <div className="absolute" style={{ left: 82, top: 0, width: 203, height: 160, overflow: "hidden" }}>
            <img src={IMG.laptop} alt="Área de Membros - Laptop" className="w-full h-full object-cover" />
          </div>
          <div className="absolute" style={{ left: 72, top: 3, width: 72, height: 124, overflow: "hidden" }}>
            <img src={IMG.phone} alt="Área de Membros - Mobile" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <a
            href={MEMBERS_URL}
            className="flex items-center justify-center rounded-[120px] bg-[#3fbf42] text-center font-bold text-[12px] text-white tracking-[0.7px]"
            style={{ width: 286, height: 52, boxShadow: "0px 0px 20px 0px #3fbf42" }}
          >
            ACESSE SUA ÁREA DE MEMBROS AGORA
          </a>
        </div>

        <div
          className="mt-6 flex items-center justify-center px-6 py-5 rounded-[20px] w-[340px]"
          style={{ border: "1px solid #2a2a2a", background: "linear-gradient(to top, rgba(0,0,0,0.32), rgba(0,0,0,0))" }}
        >
          <p className="text-[14px] font-normal text-white text-center leading-[20px]">
            Para acessar sua área de membros use seu{" "}
            <strong className="text-[#58e400]">email de compra</strong> com a senha{" "}
            <strong className="text-[#58e400]">123456</strong>
          </p>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="w-full flex flex-col items-center justify-center border-t border-[rgba(255,255,255,0.13)] bg-[#181818] px-5 py-[10px] h-[94px]">
        <div className="flex items-center justify-center">
          <img src={IMG.nexxa} alt="Instituto Nexxa" className="h-[11.1px] w-[54px] object-cover" />
          <span className="text-[11px] font-normal text-[rgba(255,255,255,0.8)] text-center tracking-[0.2px] leading-[18px]">
            {" "}| Todos os direitos reservados
          </span>
        </div>
        <p className="mt-1 text-[5px] font-normal text-white text-center tracking-[0.2px] leading-[1.2] max-w-[350px]">
          Este conteúdo é voltado para educação e desenvolvimento pessoal, e não tem a intenção de diagnosticar ou tratar condições médicas. Para qualquer questão relacionada à saúde, recomendamos consultar um profissional especializado. As informações fornecidas são baseadas em técnicas e abordagens comprovadas, sem substituir orientações médicas. Toda história e personagens apresentados são fictícios e visam ilustrar situações de maneira geral, sem qualquer vínculo com casos reais.
        </p>
      </footer>

    </main>
    </div>
    </div>
  );
}

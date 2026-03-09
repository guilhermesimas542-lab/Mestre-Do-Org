"use client";
/* LP Mestre do Orgasmo — Backend Front 2 (cópia independente do /bd_front) */
import type { ReactNode } from "react";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { openCheckoutWithTracking } from "@/lib/checkout-helper";

const CHECKOUT_URL = "https://go.perfectpay.com.br/PPU38CQ8ME4";

const IMG = {
  heroBg:       "https://www.figma.com/api/mcp/asset/ad5cad2d-167d-4aff-aae2-34661281e481",
  lightning:    "https://www.figma.com/api/mcp/asset/a14fda7d-f13e-4b16-ba54-6ed3559fd0ad",
  heroPriceBg:  "https://www.figma.com/api/mcp/asset/d2c15688-7121-4e5b-a36e-e6a5f1e4e542",
  heroBadge:    "https://www.figma.com/api/mcp/asset/7cf918f2-3bc0-4590-8753-1297d6546b14",
  benefitsList: "https://www.figma.com/api/mcp/asset/5643135d-c04a-4612-996b-6f29bd5b726b",
  separator:    "https://www.figma.com/api/mcp/asset/ea79421a-3a63-42be-9fcf-76f5f1385b04",
  instrutoraBg: "https://www.figma.com/api/mcp/asset/1e6e0687-eeec-47fd-88be-374c850ff230",
  nexxa:        "https://www.figma.com/api/mcp/asset/f61b94cb-7d38-42cb-9f60-f6fed16a9dd2",
  camada5:      "https://www.figma.com/api/mcp/asset/7101b070-0072-4d04-af65-7c4075e279cb",
  checkCircle:  "https://www.figma.com/api/mcp/asset/5e35174f-92a3-45b8-8bf5-081c22396cd6",
  checkCircle2: "https://www.figma.com/api/mcp/asset/55a0794f-33bc-49eb-a7ff-762f951b1b61",
  userCircle:   "https://www.figma.com/api/mcp/asset/12de0fc6-c814-4f6a-b6d1-630784d8d823",
  checkMark:    "https://www.figma.com/api/mcp/asset/a5fab113-7f92-4e0d-bf94-2b0b848d9e32",
  ellipse:      "https://www.figma.com/api/mcp/asset/234e1acf-f840-4ccf-bcfa-e421cb5b677d",
};

const paraQuem = [
  "Aqueles que desejam aprender técnicas práticas e eficazes para dar prazer intenso e fazê-la atingir orgasmos múltiplos.",
  "Para casados que querem quebrar a rotina e inovar na cama. Com técnicas práticas, você vai transformar sua relação e fazer com que ela volte a olhar para você como no início do relacionamento - ou até melhor!",
  "Para solteiros que querem dominar o jogo do prazer. Você vai aprender como deixar qualquer mulher pedindo bis, criando experiências tão intensas que ela vai ficar ansiosa pelo próximo encontro.",
  "Homens que querem dominar um método que funciona com qualquer mulher.",
  "Não importa se você é tímido ou confiante, magro ou musculoso, rico ou com orçamento apertado. Este treinamento é para todo homem que quer resultados reais na cama.",
  "Homens que estão dispostos a satisfazer uma mulher de verdade e levá-la ao ápice do prazer.",
];

const bonus = [
  { title: "Orgasmo esguichando (Squirt)", desc: "Técnica para provocar orgasmo com ejaculação feminina.", price: "R$ 197" },
  { title: "12 Posições excitantes", desc: "Para aumentar a intensidade e duração do sexo.", price: "R$ 197" },
  { title: "Energia sexual", desc: "Estratégias para aumentar o desejo da parceira.", price: "R$ 97" },
  { title: "Técnica do beijo lésbico", desc: "Beijo com efeito afrodisíaco imediato.", price: "R$ 97" },
  { title: "Pensamentos eróticos de +112 milhões de mulheres", desc: "Guia para descobrir e realizar fantasias.", price: "R$ 127" },
  { title: "Presentinho surpresa", desc: "", price: "R$ 300" },
];

const pricingRows = [
  { label: "Treinamento Homem Bom de Cama Completo", price: "R$ 697", gradient: true },
  { label: "Acesso Vitalício", price: "R$ 89", gradient: false },
  { label: "BÔNUS 1 | Orgasmo esguichando (Squirt)", price: "R$ 197", gradient: false },
  { label: "BÔNUS 2 | 12 Posições excitante", price: "R$ 197", gradient: false },
  { label: "BÔNUS 3 | Energia sexual", price: "R$ 97", gradient: false },
  { label: "BÔNUS 4 | Técnica do beijo lésbico", price: "R$ 127", gradient: false },
  { label: "BÔNUS 5 | Pensamentos eróticos de +112 milhões de mulheres", price: "R$ 127", gradient: false },
  { label: "BÔNUS 6 | Presentinho surpresa", price: "R$ 300", gradient: false },
];

const conteudo = [
  "Sequência de preliminares que mexem com a mente e o corpo dela",
  "Como fazer uma mulher gozar só com o toque",
  "As 10 zonas de prazer do corpo feminino",
  "Aulas práticas de posições sexuais",
  "Como proporcionar múltiplos orgasmos",
  "O jeito certo de fazê-la ter um squirting",
  "Como inovar na cama",
];

function Inner({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[390px] ${className}`}>{children}</div>;
}

function CtaButton({ children, onClick }: { children: ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex cursor-pointer items-center justify-center rounded-[120px] bg-[#3fbf42] text-center font-bold text-[16px] text-white tracking-[0.7px] w-full max-w-[327px] mx-auto"
      style={{ height: 62, boxShadow: "0px 0px 20px 0px rgba(127,255,76,0.5)" }}
    >
      {children}
    </button>
  );
}

function Selo() {
  return (
    <div className="inline-flex items-center gap-[6px] rounded-[6px] border border-[#3a3a3a] bg-[#1a1a1a] px-4 py-[6px]">
      <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
        <rect x="1" y="6" width="12" height="9" rx="2" stroke="#4d4d4d" strokeWidth="1.5"/>
        <path d="M4 6V4.5a3 3 0 0 1 6 0V6" stroke="#4d4d4d" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="7" cy="10.5" r="1.5" fill="#4d4d4d"/>
      </svg>
      <span className="text-[11px] font-normal text-[#888] tracking-[0.5px]">Compra 100% Segura</span>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z" stroke="#4d4d4d" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M9 12l2 2 4-4" stroke="#4d4d4d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

function Tag({ children, icon }: { children: ReactNode; icon?: string }) {
  return (
    <div className="inline-flex items-center justify-center gap-[5px] rounded-[200px] border border-[#ff3838] bg-[rgba(242,41,91,0.25)] px-5 py-[5px]">
      {icon && <img src={icon} alt="" className="size-[14px]" />}
      <span className="text-[11px] font-normal text-white tracking-[1px] leading-[11px]">{children}</span>
    </div>
  );
}

export default function BdFront2Page() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [logoImageLoaded, setLogoImageLoaded] = useState(false);

  const handleCheckout = () => {
    if (typeof window !== "undefined" && (window as unknown as { ttq?: { track: (e: string, p: object) => void } }).ttq) {
      (window as unknown as { ttq: { track: (e: string, p: object) => void } }).ttq.track("InitiateCheckout", {
        contents: [
          { content_id: "curso_001", content_type: "product", content_name: "Mestre do Orgasmo" },
        ],
        value: 127,
        currency: "BRL",
      });
    }
    void openCheckoutWithTracking(CHECKOUT_URL, "bd_front2", 127, false);
  };

  const handleHeroBadgeLoad = () => setLogoImageLoaded(true);

  useEffect(() => {
    if (!document.getElementById("tiktok-pixel")) {
      const s = document.createElement("script");
      s.id = "tiktok-pixel";
      s.textContent = `!function (w, d, t) {
        w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
        var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
        ;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
        ttq.load('D6N0AQJC77UFILRRAFGG');
        ttq.page();
      }(window, document, 'ttq');`;
      document.head.appendChild(s);
    }
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
  }, [logoImageLoaded]);

  return (
    <div ref={outerRef} style={{ width: "100%", position: "relative" }}>
    <div ref={innerRef} style={{ width: 390, position: "absolute", top: 0, left: 0 }}>
    <main className="w-[390px] bg-black text-white">

      {/* ═══ HERO ═══ */}
      <section className="relative w-full overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMG.heroBg} alt="" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <Inner className="relative flex flex-col items-center px-[19.5px] pb-10">

          <div className="mt-[27px] flex flex-col items-center gap-2 w-full">
            <div className="rotate-3">
              <div className="flex items-center justify-center rounded-[5px] bg-gradient-to-b from-[#38ff4c] to-[#bcf60d] opacity-80 blur-[4px] w-[315px] h-[39px] px-5">
                <p className="text-[16px] font-normal text-black text-center tracking-[0.2px] leading-[17px]">O verdadeiro segredo das lésbicas.</p>
              </div>
            </div>
            <div className="-rotate-2">
              <div className="flex items-center justify-center gap-[6px] rounded-[5px] bg-gradient-to-b from-[#38ff4c] to-[#bcf60d] w-[315px] h-[39px] px-5">
                <img src={IMG.lightning} alt="" className="size-[19.5px]" />
                <p className="text-[12px] font-bold text-black text-center tracking-[0.15px] leading-[13px]">DESCONTO EXCLUSIVO SOMENTE NESSA PÁGINA</p>
                <img src={IMG.lightning} alt="" className="size-[19.5px]" />
              </div>
            </div>
          </div>

          <h1 className="mt-8 w-full max-w-[334px] text-[24px] font-bold text-white tracking-[0.7px] leading-[30px] text-center">
            O segredo para{" "}
            <span className="bg-gradient-to-t from-[#ff3838] to-[#f2295b] bg-clip-text text-transparent">
              dominar os múltiplos orgasmos
            </span>
            , agora com um SUPER DESCONTO{" "}
            <span className="bg-gradient-to-t from-[#ff3838] to-[#f2295b] bg-clip-text text-transparent">
              para transformar sua vida sexual para sempre!
            </span>
          </h1>

          <p className="mt-6 text-[11px] font-normal text-white tracking-[0.5px] uppercase">BY INSTITUTO NEXXA</p>

          <div className="w-full flex justify-center items-center pt-6 pb-2 px-4">
            <img
              src={IMG.heroBadge}
              alt="Mestre do Orgasmo"
              className="w-full max-w-[300px] h-auto"
              onLoad={handleHeroBadgeLoad}
            />
          </div>

          <div className="w-full text-center px-4 pb-4 pt-4">
            <p className="text-[32px] font-normal text-[#6c6c6c] text-center leading-none line-through tracking-[0.2px]">DE R$297</p>
            <p className="mt-2 text-[64px] font-bold text-center leading-none tracking-[0.2px] bg-gradient-to-b from-[#38ff4c] to-[#bcf60d] bg-clip-text text-transparent">POR R$127</p>
          </div>

          <p className="mt-2 text-[16px] font-normal text-white text-center tracking-[0.1px] leading-[20px]">
            Economize <strong>R$200</strong> agora e tenha <strong>acesso imediato ao Mestre do Orgasmo!</strong>
          </p>

          <div className="mt-8 w-full px-6">
            <CtaButton onClick={handleCheckout}>LIBERAR ACESSO AO CURSO</CtaButton>
          </div>
          <div className="mt-5 flex justify-center">
            <Selo />
          </div>
        </Inner>
      </section>

      {/* ═══ BENEFÍCIOS ═══ */}
      <section className="w-full pt-10 pb-10">
        <Inner className="flex flex-col items-center">
          <Tag icon={IMG.checkCircle}>BENEFÍCIOS</Tag>
          <h2 className="mt-4 text-center text-[24px] font-bold tracking-[0.7px] leading-[30.42px]">
            <span className="text-white">Com o treinamento</span>
            <br />
            <span className="bg-gradient-to-t from-[#ff3838] to-[#f2295b] bg-clip-text text-transparent">você terá:</span>
          </h2>
          <img src={IMG.benefitsList} alt="Lista de benefícios" className="mt-4 w-[287px] object-contain" />
          <div className="mt-6 w-full px-6">
            <CtaButton onClick={handleCheckout}>LIBERAR ACESSO AO CURSO</CtaButton>
          </div>
        </Inner>
      </section>

      {/* ═══ PARA QUEM É ═══ */}
      <section className="w-full pt-10 pb-10">
        <Inner className="flex flex-col items-center px-[19.5px]">
          <Tag icon={IMG.checkCircle}>PARA QUEM É</Tag>
          <h2 className="mt-4 text-center text-[24px] font-bold tracking-[0.7px] leading-[30.42px]">
            <span className="text-white">Para </span>
            <span className="bg-gradient-to-t from-[#ff3838] to-[#f2295b] bg-clip-text text-transparent">quem</span>
            <span className="text-white"> é esse</span>
            <br />
            <span className="text-white">treinamento?</span>
          </h2>
          <div className="mt-6 flex flex-col gap-[10px] w-full max-w-[323px]">
            {paraQuem.map((text, i) => (
              <div key={i} className="rounded-[10px] border-[0.3px] border-[#cacaca] bg-[rgba(0,0,0,0.78)] px-[21px] pt-[15px] pb-[12px]">
                <div className="h-[17px] w-[54px] rounded-[8px] bg-gradient-to-t from-[#ff3838] to-[#f2295b] flex items-center justify-center">
                  <span className="text-[12px] font-normal text-white leading-normal">/ / {String(i + 1).padStart(2, "0")}</span>
                </div>
                <p className="mt-2 text-[12px] font-normal text-white leading-normal">{text}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 w-full px-6">
            <CtaButton onClick={handleCheckout}>QUERO PARTICIPAR DO TREINAMENTO</CtaButton>
          </div>
          <img src={IMG.camada5} alt="" className="mt-6 w-[339px] h-[46px] object-cover" />
        </Inner>
      </section>

      {/* ═══ BÔNUS ═══ */}
      <section className="w-full">
        <div className="relative w-full h-[79px] overflow-hidden">
          <img src={IMG.separator} alt="" className="absolute inset-0 w-full h-[300%] -top-[156%] object-cover" />
        </div>
        <div className="w-full bg-[#d7d7d7] px-4 pt-[41px] pb-[50px]">
          <div className="flex flex-col gap-[40px] items-center text-center w-[290px] mx-auto">
            {bonus.map((b, i) => (
              <div key={i} className="bg-white w-full px-[30px] py-[20px] flex flex-col items-center">
                <p className="text-[16px] font-bold bg-gradient-to-t from-[#ff3838] to-[#f2295b] bg-clip-text text-transparent leading-[16px]">BÔNUS {i + 1}</p>
                <p className="text-[16px] font-bold text-black leading-[24px] w-[230px]">{b.title}</p>
                {b.desc && <p className="text-[12px] font-normal text-black leading-[16px] w-[230px]">{b.desc}</p>}
                <p className="text-[18.655px] font-bold text-black">
                  <span className="bg-gradient-to-t from-[#ff3838] to-[#f2295b] bg-clip-text text-transparent line-through leading-[41.973px]">{b.price}</span>
                  <span className="leading-[41.973px]"> = GRATUITO</span>
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10 px-6 flex justify-center">
            <CtaButton onClick={handleCheckout}>QUERO MEU BÔNUS</CtaButton>
          </div>
        </div>
        <div className="relative w-full h-[75px] overflow-hidden rotate-180">
          <img src={IMG.separator} alt="" className="absolute inset-0 w-full h-[400%] -top-[164%] object-cover" />
        </div>
      </section>

      {/* ═══ PREÇO ═══ */}
      <section className="w-full pt-10 pb-10 flex justify-center">
        <div className="w-[348px] rounded-[20px] border border-[#4d4d4d] bg-[#202020] px-[9px] pt-[9px] pb-[20px]">
          {pricingRows.map((row, i) => (
            <div key={i}>
              <div className="flex items-center justify-between gap-2 px-[1px] py-[9px]">
                <span className={`text-[10px] font-bold tracking-[0.2px] leading-[12px] ${row.gradient ? "bg-gradient-to-t from-[#ff3838] to-[#f2295b] bg-clip-text text-transparent" : "text-white"}`}>
                  {row.label}
                </span>
                <span className="text-[10px] font-normal text-[#4d4d4d] text-right tracking-[0.2px] leading-[12px] line-through whitespace-nowrap shrink-0">
                  {row.price}
                </span>
              </div>
              <div className="h-px bg-[#4d4d4d]" />
            </div>
          ))}
          <div className="mt-4 flex justify-center">
            <div className="inline-flex items-center gap-[5px] rounded-[5px] border border-[#4d4d4d] bg-[#171717] px-5 py-[5px]">
              <img src={IMG.checkCircle2} alt="" className="size-[14px]" />
              <span className="text-[11px] font-bold bg-gradient-to-t from-[#ff3838] to-[#f2295b] bg-clip-text text-transparent tracking-[1px] leading-[11px]">POR APENAS</span>
            </div>
          </div>
          <p className="mt-2 text-center text-[96px] font-bold text-white leading-none tracking-[0.2px]">R$ 127</p>
          <div className="mt-6 px-4">
            <CtaButton onClick={handleCheckout}>LIBERAR ACESSO AO CURSO</CtaButton>
          </div>
          <div className="mt-4 flex justify-center">
            <Selo />
          </div>
        </div>
      </section>

      {/* ═══ CONTEÚDO / TIMELINE ═══ */}
      <section className="w-full pt-10 pb-10 flex flex-col items-center">
        <div className="text-center">
          <p className="text-[16px] font-bold text-white leading-[23.4px]">Dentro do treinamento</p>
          <p className="text-[24px] font-bold bg-gradient-to-t from-[#ff3838] to-[#f2295b] bg-clip-text text-transparent leading-[23.4px]">Eu vou te mostrar</p>
        </div>
        <div className="relative mt-10" style={{ width: 262, height: 494 }}>
          <div className="absolute z-0 bg-[#272727]" style={{ left: 8, top: 38, width: 4, height: 431 }} />
          {conteudo.map((item, i) => {
            const y = i * 72;
            return (
              <div key={i}>
                <div className="absolute z-10" style={{ left: 0, top: y + 25, width: 20, height: 20 }}>
                  <img src={IMG.ellipse} alt="" className="size-full" />
                </div>
                <div className="absolute z-10 flex items-center" style={{ left: 46, top: y + 8, width: 216, minHeight: 54, background: "rgba(0,0,0,0.78)", border: "0.3px solid #cacaca", borderRadius: 7, padding: "10px 18px" }}>
                  <p className="text-[11px] font-normal text-white leading-[14px]">{item}</p>
                </div>
                <div className="absolute z-20 flex items-center justify-center" style={{ left: 64, top: y, width: 21, height: 21, background: "#181818", borderRadius: 2 }}>
                  <img src={IMG.checkMark} alt="" className="size-[11.375px]" />
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-6 w-full px-8">
          <CtaButton onClick={handleCheckout}>QUERO PARTICIPAR DO TREINAMENTO</CtaButton>
        </div>
      </section>

      {/* ═══ INSTRUTORA ═══ */}
      <section className="w-full pt-10 pb-10 flex justify-center">
        <div className="relative w-[348px]" style={{ height: 734 }}>
          <div className="absolute rounded-[10px] border border-[#4d4d4d] bg-[#171717]" style={{ left: 0, top: 194, width: 348, height: 540 }} />
          <div
            className="absolute rounded-[10px] overflow-hidden"
            style={{
              left: 0, top: 0, width: 348, height: 472,
              backgroundImage: "url('" + IMG.instrutoraBg + "')",
              backgroundSize: "cover",
              backgroundPosition: "top center",
            }}
          />
          <div className="absolute inline-flex items-center gap-[5px] rounded-[200px] border border-[#ff3838] bg-[rgba(242,41,91,0.25)] px-5 py-[5px]" style={{ left: 24, top: 496 }}>
            <img src={IMG.userCircle} alt="" className="size-[20px]" />
            <span className="text-[11px] font-normal text-white tracking-[1px] leading-[11px]">Raje Belmont</span>
          </div>
          <h3 className="absolute text-[20px] font-bold text-white leading-[24px]" style={{ left: 24, top: 536 }}>
            Especialista em Sexologia
          </h3>
          <p className="absolute text-[11px] font-normal text-white leading-[14px]" style={{ left: 24, top: 570, width: 300 }}>
            Especialista certificada em Sexologia e pompoarismo masculino, através dos meus cursos e mentorias já ajudei mais de 30 mil homens a mudarem sua vida sexual e seus relacionamentos, recuperando toda potência e vigor masculino tendo um relacionamento mais prazeroso e podendo fazer verdadeiras loucuras entre quatro paredes.
          </p>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="w-full flex flex-col items-center justify-center border-t border-[rgba(255,255,255,0.13)] bg-[#181818] px-5 py-[10px] h-[94px]">
        <div className="flex items-center justify-center">
          <img src={IMG.nexxa} alt="Instituto Nexxa" className="h-[11.1px] w-[54px] object-cover" />
          <span className="text-[11px] font-normal text-[rgba(255,255,255,0.8)] text-center tracking-[0.2px] leading-[18px]">{" "}| Todos os direitos reservados</span>
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

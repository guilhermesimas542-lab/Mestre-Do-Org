"use client";
/* LP Mestre do Orgasmo — Front2 (cópia independente do /front) */
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import Script from "next/script";
import { openCheckoutWithTracking } from "@/lib/checkout-helper";

const CHECKOUT_URL = "https://go.perfectpay.com.br/PPU38CQ8NI8";

const IMG = {
  heroBg:       "https://www.figma.com/api/mcp/asset/42cf4038-1e96-4e2b-912a-7f31925e01ad",
  benefitsList: "https://www.figma.com/api/mcp/asset/dfe492c3-5f75-4826-8951-e0c345d1f79e",
  separator:    "https://www.figma.com/api/mcp/asset/9f16145d-b599-4474-b884-d14d861c02a9",
  instrutora:   "https://www.figma.com/api/mcp/asset/1b9c8722-03fb-4f04-8a83-4afe2129ce31",
  nexxa:        "https://www.figma.com/api/mcp/asset/a3ae3da8-5227-43c4-9afe-b54e36272a54",
  camada5:      "https://www.figma.com/api/mcp/asset/25b5a8c2-ab6b-4f11-9ff7-eee25b7c8117",
  selo:         "https://www.figma.com/api/mcp/asset/83e00b3f-a5e0-4327-bf5e-735e3a3361d4",
  checkCircle:  "https://www.figma.com/api/mcp/asset/bf769c9d-13da-4fa6-823e-f5e99aa31264",
  checkCircle2: "https://www.figma.com/api/mcp/asset/b4ad2555-9745-4d5c-8ca5-a43611ff67ed",
  userCircle:   "https://www.figma.com/api/mcp/asset/6a694585-7c65-4fc0-a781-75e91a2aa4fb",
  checkRed:     "https://www.figma.com/api/mcp/asset/d938f64b-5b0e-4f6d-9eb4-2a9d9099bda7",
  checkRed2:    "https://www.figma.com/api/mcp/asset/ac1e213d-90c3-401e-9ccb-ebb14d9739e8",
  ellipse:      "https://www.figma.com/api/mcp/asset/59e09d34-9506-479b-8c64-3880433fd3fd",
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

/* Centraliza conteúdo em 390px, fundo da seção vai de borda a borda */
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
      <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="6" width="12" height="9" rx="2" stroke="#4d4d4d" strokeWidth="1.5"/>
        <path d="M4 6V4.5a3 3 0 0 1 6 0V6" stroke="#4d4d4d" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="7" cy="10.5" r="1.5" fill="#4d4d4d"/>
      </svg>
      <span className="text-[11px] font-normal text-[#888] tracking-[0.5px]">Compra 100% Segura</span>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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

export default function Front2Page() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const handleCheckout = () => {
    if (typeof window !== "undefined" && (window as unknown as { ttq?: { track: (e: string, p: object) => void } }).ttq) {
      (window as unknown as { ttq: { track: (e: string, p: object) => void } }).ttq.track("InitiateCheckout", {
        contents: [
          { content_id: "curso_001", content_type: "product", content_name: "Mestre do Orgasmo" },
        ],
        value: 167,
        currency: "BRL",
      });
    }
    void openCheckoutWithTracking(CHECKOUT_URL, "front2", 167, false);
  };

  useEffect(() => {

    // TikTok Pixel — injetado no <head>
    if (!document.getElementById("tiktok-pixel")) {
      const s = document.createElement("script");
      s.id = "tiktok-pixel";
      s.textContent = `!function (w, d, t) {
        w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
        var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
        ;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
        ttq.load('D6O6LD3C77UET383RI40');
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
  }, []);

  useEffect(() => {
    const s = document.createElement("script");
    s.src = "https://scripts.converteai.net/af053167-2542-4323-9c93-d010e7938eb5/players/69b0d8e78b255839d12a8994/v4/player.js";
    s.async = true;
    document.head.appendChild(s);

    const delaySeconds = 1286;
    const player = document.querySelector("vturb-smartplayer") as any;
    if (player) {
      player.addEventListener("player:ready", function () {
        player.displayHiddenElements(delaySeconds, [".esconder"], { persist: true });
      });
    }
  }, []);

  return (
    <div ref={outerRef} style={{ width: "100%", position: "relative" }}>
    <div ref={innerRef} style={{ width: 390, position: "absolute", top: 0, left: 0 }}>
    <style>{`.esconder { display: none; }`}</style>
    <main className="w-[390px] bg-black text-white">

      {/* ═══ HERO ═══ */}
      <section className="relative w-full overflow-hidden">
        {/* Imagem de fundo cobre 100% da largura */}
        <div className="absolute inset-0">
          <img src={IMG.heroBg} alt="" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        <Inner className="relative flex flex-col items-center px-[19.5px] pb-10">
          {/* Ribbons */}
          <div className="mt-[27px] flex flex-col items-center w-full">
            <div className="flex justify-center w-full h-[55.6px] mb-[-26.28px]">
              <div className="rotate-3">
                <div className="flex items-center justify-center rounded-[5px] bg-gradient-to-t from-[#ff3838] to-[#f2295b] opacity-80 blur-[4px] w-[315px] h-[39.15px] px-5">
                  <p className="text-[16.125px] font-normal text-white text-center tracking-[0.2px] leading-[17.16px]">O verdadeiro segredo das lésbicas.</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center w-full h-[50.12px] mb-[-26.28px]">
              <div className="-rotate-2">
                <div className="flex items-center justify-center rounded-[5px] bg-gradient-to-t from-[#ff3838] to-[#f2295b] w-[315px] h-[39.15px] px-5">
                  <p className="text-[16.125px] font-normal text-white text-center tracking-[0.2px] leading-[17.16px]">O verdadeiro segredo das lésbicas.</p>
                </div>
              </div>
            </div>
          </div>
          {/* Heading */}
          <div className="mt-[56px] w-full text-center">
            <h1 className="text-[24px] font-bold text-white tracking-[0.7px] leading-[30.42px]">
              O estímulo para fazer a sua mulher CHEGAR LÁ sem muito esforço e{" "}
              <span className="bg-gradient-to-t from-[#ff3838] to-[#f2295b] bg-clip-text text-transparent">
                VICIAR em você entre 4 paredes…
              </span>
            </h1>
            <p className="mt-[9px] text-[16px] font-normal text-white text-center tracking-[0.1px] leading-[25.16px]">
              (não importa se você tem p*u pequeno ou não tem mais condicionamento fisico)
            </p>
          </div>

          {/* ═══ VSL ═══ */}
          <div className="mt-6 w-full">
            {/* @ts-ignore */}
            <vturb-smartplayer
              id="vid-69b0d8e78b255839d12a8994"
              style={{ display: "block", margin: "0 auto", width: "100%" }}
            />
          </div>

          <div className="esconder mt-8 w-full px-6">
            <CtaButton onClick={handleCheckout}>LIBERAR ACESSO AO CURSO</CtaButton>
          </div>
          <div className="esconder mt-5 flex justify-center">
            <Selo />
          </div>
        </Inner>
      </section>

      {/* ═══ BENEFÍCIOS ═══ */}
      <section className="esconder w-full pt-10 pb-10">
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
      <section className="esconder w-full pt-10 pb-10">
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

      {/* ═══ BÔNUS — fundo #d7d7d7 cobre 100% ═══ */}
      <section className="esconder w-full">
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
      <section className="esconder w-full pt-10 pb-10 flex justify-center">
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
          <p className="mt-2 text-center text-[96px] font-bold text-white leading-none tracking-[0.2px]">R$ 167</p>
          <div className="mt-6 px-4">
            <CtaButton onClick={handleCheckout}>LIBERAR ACESSO AO CURSO</CtaButton>
          </div>
          <div className="mt-4 flex justify-center">
            <Selo />
          </div>
        </div>
      </section>

      {/* ═══ CONTEÚDO / TIMELINE ═══ */}
      <section className="esconder w-full pt-10 pb-10 flex flex-col items-center">
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
                  <img src={i === 0 ? IMG.checkRed : IMG.checkRed2} alt="" className="size-[11.375px]" />
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
      <section className="esconder w-full pt-10 pb-10 flex justify-center">
        <div className="relative w-[348px]" style={{ height: 734 }}>
          <div className="absolute rounded-[10px] border border-[#4d4d4d] bg-[#171717]" style={{ left: 0, top: 194, width: 348, height: 540 }} />
          <div className="absolute rounded-[10px] overflow-hidden" style={{ left: 0, top: 0, width: 348, height: 472 }}>
            <img src={IMG.instrutora} alt="Raje Belmont" className="size-full object-cover object-top" />
          </div>
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
      <footer className="esconder w-full flex flex-col items-center justify-center border-t border-[rgba(255,255,255,0.13)] bg-[#181818] px-5 py-[10px] h-[94px]">
        <div className="flex items-center justify-center">
          <img src={IMG.nexxa} alt="Instituto Nexxa" className="h-[11.1px] w-[54px] object-cover" />
          <span className="text-[11px] font-normal text-[rgba(255,255,255,0.8)] text-center tracking-[0.2px] leading-[18px]">{" "}| Todos os direitos reservados</span>
        </div>
        <p className="mt-1 text-[5px] font-normal text-white text-center tracking-[0.2px] leading-[1.2] max-w-[350px]">
          Este conteúdo é voltado para educação e desenvolvimento pessoal, e não tem a intenção de diagnosticar ou tratar condições médicas. Para qualquer questão relacionada à saúde, recomendamos consultar um profissional especializado. As informações fornecidas são baseadas em técnicas e abordagens comprovadas, sem substituir orientações médicas. Toda história e personagens apresentados são fictícios e visam ilustrar situações de maneira geral, sem qualquer vínculo com casos reais.
        </p>
      </footer>
      {/* Back redirect: ao clicar em "voltar", lead é enviado para a página com desconto (bd_front) */}
      <Script id="back-redirect" strategy="afterInteractive">
        {`
          var urlBackRedirect = 'https://www.institutonexxa.com/bd_front2';
          urlBackRedirect = urlBackRedirect.trim() + (urlBackRedirect.indexOf("?") > 0 ? '&' : '?') + document.location.search.replace('?', '').toString();
          history.pushState({}, "", location.href);
          history.pushState({}, "", location.href);
          window.onpopstate = function () {
            setTimeout(function () {
              location.href = urlBackRedirect;
            }, 1);
          };
        `}
      </Script>
    </main>
    </div>
    </div>
  );
}

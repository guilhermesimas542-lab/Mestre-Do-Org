"use client";
/* LP Mestre do Orgasmo — Downsell 2 / Mestre da Potência (cópia independente do /downsell) */
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { openCheckoutWithTracking } from "@/lib/checkout-helper";

const CHECKOUT_URL = "https://go.perfectpay.com.br/PPU38CQ8ME6?upsell=true";
const DECLINE_URL = "https://www.institutonexxa.com/obrigado2";

const IMG = {
  background: "https://www.figma.com/api/mcp/asset/3067dc9d-3643-4db1-929d-94a0b0ba7bd8",
  mpp:        "https://www.figma.com/api/mcp/asset/906c5a59-3ae4-4a62-98ab-096b9460e6c9",
  badge:      "https://www.figma.com/api/mcp/asset/8ab874fc-01fe-4144-bb07-a36043703a6e",
  excluir:    "https://www.figma.com/api/mcp/asset/09c43a98-4469-4ebc-8ba6-022a374a899c",
  check:      "https://www.figma.com/api/mcp/asset/ca4a3990-0be5-4ca9-a266-8a36373c7f0d",
  nexxa:      "https://www.figma.com/api/mcp/asset/a10c41c0-3da7-4415-b6d4-a27f8ff2de29",
};

const problemItems = [
  "Goza antes dela",
  "Perde a ereção no meio",
  ["Demora pra voltar", "depois da primeira"],
  ["Se sente inseguro, mesmo", "sabendo o que fazer"],
];

const benefitItems = [
  "Segurar o gozo",
  ["Manter a ereção firme", "até o final"],
  ["Voltar mais rápido para a", "segunda (e terceira)"],
  ["Aumentar sua testosterona,", "disposição e autoconfiança"],
];

function CtaGreen({ children, onClick }: { children: ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex cursor-pointer items-center justify-center rounded-[120px] bg-[#00e304] text-center font-bold text-[16px] text-white tracking-[0.7px] w-full max-w-[307px] mx-auto"
      style={{ height: 62, boxShadow: "0px 0px 20px 0px rgba(127,255,76,0.5)" }}
    >
      {children}
    </button>
  );
}

function CtaRed() {
  return (
    <a
      href={DECLINE_URL}
      className="flex items-center justify-center rounded-[120px] bg-[#ac0000] text-center font-bold text-[12px] text-white w-full max-w-[297px] mx-auto"
      style={{ height: 48 }}
    >
      NÃO, PREFIRO CONTINUAR SEM CONTROLE
    </a>
  );
}

function Selo() {
  return (
    <div className="inline-flex items-center gap-[6px] rounded-[6px] border border-[#3a3a3a] bg-[#1a1a1a] px-4 py-[6px]">
      <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
        <rect x="1" y="6" width="12" height="9" rx="2" stroke="#4d4d4d" strokeWidth="1.5" />
        <path d="M4 6V4.5a3 3 0 0 1 6 0V6" stroke="#4d4d4d" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="7" cy="10.5" r="1.5" fill="#4d4d4d" />
      </svg>
      <span className="text-[11px] font-normal text-[#888] tracking-[0.5px]">Compra 100% Segura</span>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z" stroke="#4d4d4d" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" stroke="#4d4d4d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function ProblemCard({ text }: { text: string | string[] }) {
  const lines = Array.isArray(text) ? text : [text];
  return (
    <div
      className="flex items-center gap-3 rounded-[12px] border border-[rgba(255,56,56,0.5)] bg-[rgba(255,0,4,0.18)] px-[22px] py-[5px]"
      style={{ width: 313, height: 62, boxShadow: "0px 0px 13px 0px rgba(255,56,56,0.31)" }}
    >
      <img src={IMG.excluir} alt="" className="size-[31px] shrink-0 object-cover" />
      <div className="text-[16px] font-normal text-[#ff3837] tracking-[1px] leading-[18px]">
        {lines.map((l, i) => (
          <p key={i} className="m-0">{l}</p>
        ))}
      </div>
    </div>
  );
}

function BenefitCard({ text }: { text: string | string[] }) {
  const lines = Array.isArray(text) ? text : [text];
  return (
    <div
      className="flex items-center gap-3 rounded-[12px] border border-[rgba(255,121,0,0.5)] bg-[rgba(255,121,0,0.05)] px-[22px] py-[5px]"
      style={{ width: 313, height: 62, boxShadow: "0px 0px 13px 0px rgba(255,56,56,0.31)" }}
    >
      <img src={IMG.check} alt="" className="size-[31px] shrink-0" />
      <div className="text-[16px] font-normal text-white tracking-[1px] leading-[18px]">
        {lines.map((l, i) => (
          <p key={i} className="m-0">{l}</p>
        ))}
      </div>
    </div>
  );
}

export default function Downsell2Page() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const handleCheckout = () =>
    void openCheckoutWithTracking(CHECKOUT_URL, "downsell2", 97, false);

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
  }, []);

  return (
    <div ref={outerRef} style={{ width: "100%", position: "relative" }}>
    <div ref={innerRef} style={{ width: 390, position: "absolute", top: 0, left: 0 }}>
    <main className="w-[390px] bg-black text-white overflow-hidden">

      {/* ═══ HERO — fundo com imagem ═══ */}
      <section className="relative flex flex-col items-center pt-[25px] pb-10" style={{ minHeight: 710 }}>
        <img src={IMG.background} alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center w-full px-5">
          <div className="flex flex-col items-center gap-1 mt-2">
            <div className="rotate-3 rounded-[5px] bg-gradient-to-b from-[#38ff4c] to-[#bcf60d] px-5 py-[6px] opacity-80 blur-[0px]">
              <p className="text-[16px] font-normal text-black text-center tracking-[0.2px] leading-[17px]">
                O verdadeiro segredo das lésbicas.
              </p>
            </div>
            <div className="-rotate-2 rounded-[5px] bg-gradient-to-b from-[#38ff4c] to-[#bcf60d] px-5 py-[6px] flex items-center justify-center gap-1">
              <span className="text-[12px] font-bold text-black text-center tracking-[0.15px] leading-[13px]">
                DESCONTO EXCLUSIVO SOMENTE NESSA PÁGINA
              </span>
            </div>
          </div>

          <p className="mt-4 text-[16px] font-normal text-white text-center tracking-[0.7px] leading-[20px]">
            Mestre do Orgasmo
          </p>

          <div className="mt-3 text-center w-[313px]">
            <p className="text-[24px] font-bold leading-[26px]">
              <span className="text-white">O segredo para dominar a potência sexual e se tornar um </span>
              <span className="text-[#fe6f00]">macho alfa</span>
              <span className="text-white"> na cama, agora com um</span>
            </p>
            <p className="text-[24px] font-bold text-[#fe6f00] leading-[26px]">SUPER DESCONTO</p>
          </div>

          <div className="relative mt-4 w-full flex items-start justify-center" style={{ height: 190 }}>
            <img src={IMG.badge} alt="" className="absolute left-[25px] top-[-10px] size-[76px] object-cover" />
            <img src={IMG.mpp} alt="Mestre da Potência" className="w-[328px] h-[190px] object-cover" />
          </div>

          <p className="mt-4 text-[32px] font-normal text-[#6c6c6c] line-through tracking-[0.2px]">DE R$197</p>
          <p className="text-[64px] font-bold bg-gradient-to-b from-[#38ff4c] to-[#bcf60d] bg-clip-text text-transparent tracking-[0.2px] leading-none">
            POR R$97
          </p>

          <p className="mt-2 text-[16px] font-normal text-white text-center leading-[20px] w-[313px]">
            Economize <strong>R$100,00</strong> agora e tenha <strong>acesso imediato ao Mestre do Orgasmo!</strong>
          </p>
        </div>
      </section>

      {/* ═══ CTAs + SELO (1ª vez) ═══ */}
      <section className="w-full flex flex-col items-center gap-3 pb-6 px-8">
        <CtaGreen onClick={handleCheckout}>SIM, QUERO TER POTÊNCIA TOTAL</CtaGreen>
        <CtaRed />
        <div className="mt-1">
          <Selo />
        </div>
      </section>

      {/* ═══ SEÇÃO: PROBLEMAS ═══ */}
      <section className="w-full flex flex-col items-center pt-16 pb-10 px-5">
        <p className="text-[16px] font-normal text-white text-center leading-[16.4px] tracking-[0.7px]">
          Você acabou de aprender como dar<br />prazer para uma mulher.
        </p>

        <div className="mt-8 text-center">
          <p className="text-[28px] font-bold text-[#fe6f00] leading-[28.4px] tracking-[0.7px]">
            Mas deixa eu te<br />perguntar com toda<br />sinceridade...
          </p>
        </div>

        <p className="mt-6 text-[20px] font-bold text-white text-center leading-[23.4px] tracking-[0.7px]">
          Você realmente tem o<br />controle do seu corpo?
        </p>

        <div className="mt-6 flex flex-col items-center gap-[10px]">
          {problemItems.map((item, i) => (
            <ProblemCard key={i} text={item} />
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center rounded-none border border-dashed border-red-600 bg-[rgba(255,0,4,0.18)] px-5 py-5" style={{ width: 310, minHeight: 124 }}>
          <div className="text-center">
            <p className="text-[12px] font-normal text-white">Se isso acontece com você,</p>
            <p className="text-[21px] font-bold text-white leading-[24px]">
              Você ainda não tá<br />pronto pra ser o<br />melhor da vida dela.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ SEÇÃO: BENEFÍCIOS (fundo escuro) ═══ */}
      <section className="w-full bg-[#141414] flex flex-col items-center pt-14 pb-10 px-5">
        <div className="text-center tracking-[0.7px]">
          <p className="text-[28px] font-bold leading-[28.4px]">
            <span className="text-white">O </span>
            <span className="text-[#ff7900]">Homem de Potência</span>
            <span className="text-white"> é</span>
          </p>
          <p className="text-[28px] font-bold text-white leading-[28.4px]">meu treinamento prático</p>
          <p className="text-[28px] font-bold text-white leading-[28.4px]">e 100% natural</p>
          <p className="text-[28px] font-bold text-white leading-[28.4px]">pra te ajudar a:</p>
        </div>

        <div className="mt-8 flex flex-col items-center gap-[10px]">
          {benefitItems.map((item, i) => (
            <BenefitCard key={i} text={item} />
          ))}
        </div>

        <p className="mt-8 text-[16px] font-normal text-[#ff7900] text-center tracking-[0.7px] leading-[28.4px]">
          Ela vai sentir a diferença.
        </p>

        <p className="mt-1 text-[25px] font-bold text-white text-center leading-[24.4px] tracking-[0.7px]">
          E você vai se sentir uma<br />máquina na cama.
        </p>
      </section>

      {/* ═══ CARD BRANCO: OFERTA EXCLUSIVA ═══ */}
      <section className="w-full bg-[#141414] flex justify-center pb-10 px-5">
        <div className="w-[346px] rounded-[26px] bg-white flex flex-col items-center px-6 pt-6 pb-8">
          <p className="text-[18px] font-bold text-black text-center leading-[21px] tracking-[0.7px]">
            Apenas agora e nessa<br />página você tem a<br />oportunidade de ter acesso<br />a uma oferta exclusiva
          </p>
          <p className="mt-2 text-[16px] font-normal text-black text-center leading-[17.4px] tracking-[0.7px]">
            Para você que já é meu aluno o<br />curso está apenas:
          </p>

          <div className="mt-4 h-[2px] w-[300px] rounded-[1.5px] bg-[#e9e9e9]" />

          <p className="mt-4 text-[22px] font-bold text-black text-center tracking-[0.7px]">por apenas</p>
          <p className="text-[62px] font-bold text-[#fe6f00] text-center leading-[60px]">R$97,00</p>

          <div className="mt-4 h-[2px] w-[300px] rounded-[1.5px] bg-[#e9e9e9]" />

          <p className="mt-4 text-[16px] font-normal text-black text-center leading-[21px] tracking-[0.7px]">
            Só aqui. Só agora.
          </p>
          <p className="mt-2 text-[24px] font-bold text-black text-center leading-[26px] tracking-[0.7px]">
            ESSA OFERTA NÃO<br />APARECE DE NOVO.
          </p>
          <p className="mt-3 text-[16px] font-normal text-black text-center leading-[21px] tracking-[0.7px]">
            Clique no botão abaixo e sua<br />compra já será concluída sem precisar<br />preencher nada
          </p>

          <div className="mt-6 flex flex-col items-center gap-3 w-full px-2">
            <CtaGreen onClick={handleCheckout}>SIM, QUERO TER POTÊNCIA TOTAL</CtaGreen>
            <CtaRed />
          </div>
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

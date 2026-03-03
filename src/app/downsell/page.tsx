"use client";
/* LP Mestre do Orgasmo — Downsell (node 373:12) */
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

const CHECKOUT_URL = "#checkout";
const DECLINE_URL  = "#decline";

const IMG = {
  heroBg:      "https://www.figma.com/api/mcp/asset/aa2c2a0f-1466-440f-81a6-1c1dd0de8788",
  lightning:   "https://www.figma.com/api/mcp/asset/d11d9e10-86ab-43b9-9528-0af1cb81f5d2",
  heroBanner:  "https://www.figma.com/api/mcp/asset/e52ab326-c63e-46e6-883b-08974aeea7fc",
  heroBadge:   "https://www.figma.com/api/mcp/asset/21be5d29-a9ac-4f02-8f8e-645e08602d59",
  excluir:     "https://www.figma.com/api/mcp/asset/c2db770c-70c5-4b09-ae17-c661dc8f1391",
  checkCircle: "https://www.figma.com/api/mcp/asset/9de4bada-e54f-48a9-b2df-13ef58934df9",
  nexxa:       "https://www.figma.com/api/mcp/asset/0f8d1735-5a13-497e-b450-93d890d70ec1",
};

const problemItems = [
  "Goza antes dela",
  "Perde a ereção no meio",
  { line1: "Demora pra voltar", line2: "depois da primeira" },
  { line1: "Se sente inseguro, mesmo", line2: "sabendo o que fazer" },
];

const benefitItems = [
  "Segurar o gozo",
  { line1: "Manter a ereção firme", line2: "até o final" },
  { line1: "Voltar mais rápido para a", line2: "segunda (e terceira)" },
  { line1: "Aumentar sua testosterona,", line2: "disposição e autoconfiança" },
];

function CtaGreen({ children, width = 307 }: { children: ReactNode; width?: number }) {
  return (
    <a
      href={CHECKOUT_URL}
      className="flex items-center justify-center rounded-[120px] bg-[#00e304] text-center font-bold text-[16px] text-white tracking-[0.7px]"
      style={{ width, height: 62, boxShadow: "0px 0px 20px 0px rgba(127,255,76,0.5)" }}
    >
      {children}
    </a>
  );
}

function CtaDecline({ children, width = 297 }: { children: ReactNode; width?: number }) {
  return (
    <a
      href={DECLINE_URL}
      className="flex items-center justify-center rounded-[120px] bg-[#ac0000] text-center font-bold text-[12px] text-white"
      style={{ width, height: 48 }}
    >
      {children}
    </a>
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

export default function DownsellPage() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

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
    <main className="w-[390px] bg-black text-white">

      {/* ═══ HERO ═══ */}
      <section className="relative w-full overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMG.heroBg} alt="" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="relative flex flex-col items-center px-[19.5px] pb-10 max-w-[390px] mx-auto">

          {/* Ribbons — verde igual ao bd_front */}
          <div className="mt-[27px] flex flex-col items-center w-full">
            <div className="flex justify-center w-full h-[55.6px] mb-[-26.28px]">
              <div className="rotate-3">
                <div className="flex items-center justify-center rounded-[5px] bg-gradient-to-b from-[#38ff4c] to-[#bcf60d] opacity-80 blur-[4px] w-[315px] h-[39.15px] px-5">
                  <p className="text-[16.125px] font-normal text-black text-center tracking-[0.2px] leading-[17.16px]">O verdadeiro segredo das lésbicas.</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center w-full h-[50.12px] mb-[-26.28px]">
              <div className="-rotate-2">
                <div className="flex items-center justify-center gap-[6px] rounded-[5px] bg-gradient-to-b from-[#38ff4c] to-[#bcf60d] w-[315px] h-[39.15px] px-5">
                  <img src={IMG.lightning} alt="" className="size-[19.5px]" />
                  <p className="text-[12.164px] font-bold text-black text-center tracking-[0.15px] leading-[12.94px]">DESCONTO EXCLUSIVO SOMENTE NESSA PÁGINA</p>
                  <img src={IMG.lightning} alt="" className="size-[19.5px]" />
                </div>
              </div>
            </div>
          </div>

          {/* Badge + Heading */}
          <div className="mt-[56px] w-full flex flex-col items-center gap-4">
            <img src={IMG.heroBadge} alt="Mestre da Potência" className="size-[76px] object-cover" />
            <h1 className="text-[24px] font-bold text-white tracking-[0.7px] leading-[26px] text-center">
              O segredo para dominar a potência sexual e se tornar um{" "}
              <span className="text-[#fe6f00]">macho alfa</span>
              {" "}na cama, agora com um{" "}
              <span className="text-[#fe6f00]">SUPER DESCONTO</span>
            </h1>
          </div>

          {/* Banner image */}
          <div className="mt-5 w-[328px] h-[190px] overflow-hidden rounded-[6px]">
            <img src={IMG.heroBanner} alt="Mestre da Potência" className="w-full h-full object-cover" />
          </div>

          {/* Price display */}
          <div className="mt-5 flex flex-col items-center">
            <p className="text-[32px] font-normal text-[#6c6c6c] text-center leading-none line-through tracking-[0.2px]">DE R$197</p>
            <p className="text-[64px] font-bold text-center leading-none tracking-[0.2px] bg-gradient-to-b from-[#38ff4c] to-[#bcf60d] bg-clip-text text-transparent">POR R$97</p>
          </div>

          {/* Sub text */}
          <p className="mt-4 text-[16px] font-normal text-white text-center tracking-[0.1px] leading-[20px]">
            Economize <strong>R$100,00</strong> agora e tenha <strong>acesso imediato ao Mestre do Orgasmo!</strong>
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col items-center gap-[17px]">
            <CtaGreen>SIM, QUERO TER POTÊNCIA TOTAL</CtaGreen>
            <CtaDecline>NÃO, PREFIRO CONTINUAR SEM CONTROLE</CtaDecline>
          </div>

          {/* Selo */}
          <div className="mt-5 flex justify-center">
            <Selo />
          </div>
        </div>
      </section>

      {/* ═══ PERGUNTAS ═══ */}
      <section className="w-full bg-black pt-10 pb-10">
        <div className="flex flex-col items-center px-[19.5px] max-w-[390px] mx-auto">

          <p className="text-[16px] font-normal text-white text-center tracking-[0.7px] leading-[16.4px]">
            Você acabou de aprender como dar<br />prazer para uma mulher.
          </p>

          {/* "Mas deixa eu te perguntar..." — laranja no downsell */}
          <h2 className="mt-6 text-[28px] font-bold text-[#fe6f00] text-center tracking-[0.7px] leading-[28.4px]">
            Mas deixa eu te<br />perguntar com toda<br />sinceridade...
          </h2>

          <h3 className="mt-6 text-[20px] font-bold text-white text-center tracking-[0.7px] leading-[23.4px]">
            Você realmente tem o<br />controle do seu corpo?
          </h3>

          {/* Problem cards */}
          <div className="mt-6 flex flex-col gap-[10px] w-full max-w-[313px]">
            {problemItems.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-[22px] py-[5px] rounded-[12px] border border-[rgba(255,56,56,0.5)] bg-[rgba(255,0,4,0.18)] h-[62px]"
                style={{ boxShadow: "0px 0px 13px 0px rgba(255,56,56,0.31)" }}
              >
                <img src={IMG.excluir} alt="" className="size-[31px] shrink-0 object-cover" />
                <span className="text-[16px] font-normal text-[#ff3837] tracking-[1px] leading-[18px]">
                  {typeof item === "string" ? item : <>{item.line1}<br />{item.line2}</>}
                </span>
              </div>
            ))}
          </div>

          {/* Warning box */}
          <div className="mt-8 w-full max-w-[310px] border border-dashed border-red-500 bg-[rgba(255,0,4,0.1)] rounded-[4px] px-4 py-4 text-center">
            <p className="text-[12px] font-normal text-white leading-normal">Se isso acontece com você,</p>
            <p className="text-[21px] font-bold text-white leading-normal">Você ainda não tá<br />pronto pra ser o<br />melhor da vida dela.</p>
          </div>
        </div>
      </section>

      {/* ═══ BENEFÍCIOS — bg #141414, tema laranja ═══ */}
      <section className="w-full bg-[#141414] pt-10 pb-10">
        <div className="flex flex-col items-center px-[19.5px] max-w-[390px] mx-auto">

          <h2 className="text-[28px] font-bold text-white text-center tracking-[0.7px] leading-[28.4px]">
            O{" "}
            <span className="text-[#ff7900]">Homem de Potência</span>
            {" "}é<br />meu treinamento prático<br />e 100% natural<br />pra te ajudar a:
          </h2>

          {/* Benefit cards — borda laranja */}
          <div className="mt-8 flex flex-col gap-[10px] w-full max-w-[313px]">
            {benefitItems.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-[22px] py-[5px] rounded-[12px] border border-[rgba(255,121,0,0.5)] bg-[rgba(255,121,0,0.05)] h-[62px]"
                style={{ boxShadow: "0px 0px 13px 0px rgba(255,56,56,0.31)" }}
              >
                <img src={IMG.checkCircle} alt="" className="size-[31px] shrink-0" />
                <span className="text-[16px] font-normal text-white tracking-[1px] leading-[18px]">
                  {typeof item === "string" ? item : <>{item.line1}<br />{item.line2}</>}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-8 text-[16px] font-normal text-[#ff7900] text-center leading-[28.4px]">
            Ela vai sentir a diferença.
          </p>
          <p className="mt-2 text-[25px] font-bold text-white text-center leading-[24.4px]">
            E você vai se sentir uma<br />máquina na cama.
          </p>
        </div>
      </section>

      {/* ═══ OFERTA — card branco, preço laranja ═══ */}
      <section className="w-full bg-black pt-10 pb-10 flex justify-center">
        <div className="w-[346px] bg-white rounded-[26px] px-[23px] py-[25px] flex flex-col items-center text-black text-center">

          {/* Top divider */}
          <div className="w-[300px] h-[2px] bg-[#e9e9e9] rounded-[1.5px] mb-5" />

          <p className="text-[18px] font-bold leading-[21px] tracking-[0.7px]">
            Apenas agora e nessa<br />página você tem a<br />oportunidade de ter acesso<br />a uma oferta exclusiva
          </p>
          <p className="mt-3 text-[16px] font-normal leading-[17.4px]">
            Para você que já é meu aluno o<br />curso está apenas:
          </p>

          {/* Price — laranja no downsell */}
          <div className="mt-4 flex flex-col items-center">
            <p className="text-[22px] font-bold leading-[60px] tracking-[0.7px]">por apenas</p>
            <p className="text-[62px] font-bold leading-[60px] tracking-[0.7px] text-[#fe6f00]">R$97,00</p>
          </div>

          {/* Bottom divider */}
          <div className="mt-4 w-[300px] h-[2px] bg-[#e9e9e9] rounded-[1.5px]" />

          <p className="mt-4 text-[16px] font-normal leading-[21px]">Só aqui. Só agora.</p>
          <p className="mt-3 text-[24px] font-bold leading-[26px] tracking-[0.7px]">
            ESSA OFERTA NÃO<br />APARECE DE NOVO.
          </p>
          <p className="mt-3 text-[16px] font-normal leading-[21px]">
            Clique no botão abaixo e sua<br />compra já será concluída sem precisar<br />preencher nada
          </p>

          {/* CTAs */}
          <div className="mt-6 flex flex-col items-center gap-[17px]">
            <CtaGreen>SIM, QUERO TER POTÊNCIA TOTAL</CtaGreen>
            <CtaDecline>NÃO, PREFIRO CONTINUAR SEM CONTROLE</CtaDecline>
          </div>
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

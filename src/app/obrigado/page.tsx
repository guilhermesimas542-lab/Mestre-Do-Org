"use client";
/* LP Mestre do Orgasmo — Obrigado (node 308:157) */
import { useEffect, useRef } from "react";

const MEMBERS_URL = "#membros";
const WHATSAPP_URL = "https://wa.me/5500000000000";

const IMG = {
  logoBanner:  "https://www.figma.com/api/mcp/asset/4a9f9f0b-c84a-4319-a9e0-77535333eb3b",
  laptop:      "https://www.figma.com/api/mcp/asset/5785ba52-b866-498c-bfcc-4c67bf088610",
  phone:       "https://www.figma.com/api/mcp/asset/975694b4-1537-4fe5-bd71-9b4032effdd6",
  spinach:     "https://www.figma.com/api/mcp/asset/293b4241-1ec8-4989-9d7e-3b7458b392b2",
  whatsapp:    "https://www.figma.com/api/mcp/asset/bb9a1639-4ea8-4e17-8b6c-df1cbe5bd267",
  ellipse:     "https://www.figma.com/api/mcp/asset/994428c3-19db-4a46-abab-574e9ad92e25",
  nexxa:       "https://www.figma.com/api/mcp/asset/6639bb3e-e6ee-4bad-b639-bb42f0622fe3",
};

export default function ObrigadoPage() {
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
    <main className="w-[390px] bg-black text-white overflow-hidden">

      {/* ═══ HERO ═══ */}
      <section className="relative w-full flex flex-col items-center px-[19.5px] pt-[59px] pb-10">

        {/* Glowing ellipses decorativas */}
        <div className="absolute pointer-events-none" style={{ left: 219 + 195 - 148, top: 14, width: 296, height: 296, overflow: "hidden" }}>
          <img src={IMG.ellipse} alt="" className="absolute size-full" style={{ margin: "-118.24%" }} />
        </div>
        <div className="absolute pointer-events-none" style={{ left: 195 - 205 - 148, top: 384, width: 296, height: 296, overflow: "hidden" }}>
          <img src={IMG.ellipse} alt="" className="absolute size-full" style={{ margin: "-118.24%" }} />
        </div>
        <div className="absolute pointer-events-none" style={{ left: 195 + 141 - 148, top: 970, width: 296, height: 296, overflow: "hidden" }}>
          <img src={IMG.ellipse} alt="" className="absolute size-full" style={{ margin: "-118.24%" }} />
        </div>

        {/* Logo banner */}
        <div className="w-[177px] h-[108px] overflow-hidden rounded-[4px]">
          <img src={IMG.logoBanner} alt="Mestre do Orgasmo" className="w-full h-full object-cover" />
        </div>

        {/* Heading */}
        <div className="mt-5 w-[334px] text-center">
          <p className="text-[28px] font-bold text-[#58e400] leading-[30.42px]">Parabéns, Mestre!</p>
          <p className="text-[20px] font-normal text-white leading-[22.4px]">Sua inscrição no Mestre do Orgasmo foi confirmada com sucesso!</p>
        </div>

        {/* Divider linha vermelha */}
        <div className="mt-5 w-[309px] h-px" style={{ background: "linear-gradient(to right, rgba(0,0,0,0), #ff3838 52.885%, rgba(0,0,0,0))" }} />

        {/* Sub texto */}
        <p className="mt-4 text-[16px] font-normal text-white text-center leading-[21.4px] w-[315px]">
          Para acessar o treinamento, clique no botão abaixo e faça login na Área de Membros:
        </p>

        {/* Mockup images */}
        <div className="relative mt-4 w-full flex justify-center" style={{ height: 160 }}>
          <div className="absolute" style={{ left: 102 - 19.5, top: 0, width: 203, height: 160, overflow: "hidden" }}>
            <img src={IMG.laptop} alt="Área de Membros - Laptop" className="w-full h-full object-cover" />
          </div>
          <div className="absolute" style={{ left: 92 - 19.5, top: 3, width: 72, height: 124, overflow: "hidden" }}>
            <img src={IMG.phone} alt="Área de Membros - Mobile" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* CTA acesso membros */}
        <div className="mt-6 flex justify-center">
          <a
            href={MEMBERS_URL}
            className="flex items-center justify-center rounded-[120px] bg-[#3fbf42] text-center font-bold text-[12px] text-white"
            style={{ width: 286, height: 52, boxShadow: "0px 0px 20px 0px #3fbf42" }}
          >
            ACESSE SUA ÁREA DE MEMBROS AGORA
          </a>
        </div>

        {/* Info spam */}
        <div
          className="mt-4 flex items-center justify-center px-[20px] py-[15px] rounded-[20px] w-[319px]"
          style={{ border: "1px solid #2a2a2a", background: "linear-gradient(to top, rgba(0,0,0,0.32), rgba(0,0,0,0))", height: 56 }}
        >
          <p className="text-[12px] font-normal text-white text-center leading-[16px] w-[285px]">
            Caso não encontre o e-mail com o login, verifique o spam ou a lixeira na sua caixa de entrada.
          </p>
        </div>
      </section>

      {/* ═══ EDP SECTION ═══ */}
      <section className="w-full pb-10 flex flex-col items-center px-[19.5px]">

        {/* Badge pill */}
        <div
          className="flex items-center justify-center px-5 py-[5px] rounded-[35px] border border-[#ff3838]"
          style={{ height: 57, background: "linear-gradient(to top, #ff3838, #f2295b)" }}
        >
          <div className="text-[12px] font-normal text-white text-center tracking-[1px] leading-[14px]">
            <p className="font-bold mb-0">SEU POTE DO EDP</p>
            <p>PRÓXIMOS PASSOS ATÉ A ENTREGA</p>
          </div>
        </div>

        {/* Card EDP */}
        <div
          className="relative mt-4 w-[358px] rounded-[16px] border border-[#6b1515] bg-[rgba(242,41,91,0.1)] px-[22px] py-6 flex flex-col items-center"
        >
          {/* Spinach decorativas */}
          <div className="relative flex justify-center w-full mb-4" style={{ height: 135 }}>
            <div className="absolute blur-[1px]" style={{ left: "50%", marginLeft: -37.5 + 39, top: 0, width: 69, height: 126 }}>
              <img src={IMG.spinach} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="absolute blur-[1px]" style={{ left: "50%", marginLeft: -37.5 - 34, top: 0, width: 69, height: 126 }}>
              <img src={IMG.spinach} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="absolute blur-[0.4px]" style={{ left: "50%", marginLeft: -35.5 + 21, top: 0, width: 71, height: 130 }}>
              <img src={IMG.spinach} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="absolute blur-[0.4px]" style={{ left: "50%", marginLeft: -35.5 - 17, top: 0, width: 71, height: 130 }}>
              <img src={IMG.spinach} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="absolute" style={{ left: "50%", marginLeft: -37, top: 0, width: 74, height: 135 }}>
              <img src={IMG.spinach} alt="" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Texto EDP */}
          <div className="text-[16px] text-white text-center w-[315px] leading-[21.4px]">
            <p className="mb-0">O produto EDP será postado em</p>
            <p className="font-bold text-[29px] leading-[29.4px] bg-gradient-to-t from-[#ff3838] to-[#f2295b] bg-clip-text text-transparent mb-0">3 a 5 dias úteis.</p>
            <p className="mb-0">
              Assim que for enviado, você receberá um código de rastreio no seu e-mail para acompanhar o status da entrega.
            </p>
            <p className="mt-3">Fique tranquilo, estamos cuidando de tudo com o máximo de atenção para que você receba o seu produto o mais rápido possível.</p>
          </div>

          {/* WhatsApp link */}
          <div className="mt-4 flex items-center gap-[6px]">
            <a href={WHATSAPP_URL} className="text-[12px] font-bold text-[#00b2ff] underline text-center leading-[16px]">
              Qualquer dúvida sobre o EDP ou o curso,<br />fale com a gente pelo WhatsApp.
            </a>
            <img src={IMG.whatsapp} alt="WhatsApp" className="size-[11px] shrink-0 object-cover" />
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

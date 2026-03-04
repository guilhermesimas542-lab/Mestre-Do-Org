"use client";
/* LP Mestre do Orgasmo — Downsell — Página de Obrigado (node 308:157) */
import { useEffect, useRef } from "react";

const MEMBERS_URL = "#membros";
const DECLINE_URL = "https://www.institutonexxa.com/obrigado";

const IMG = {
  ellipse:   "https://www.figma.com/api/mcp/asset/76fa53aa-769b-4a26-8ec2-3e7ee1564e60",
  logo:      "https://www.figma.com/api/mcp/asset/bf3d6464-567b-4e72-86f3-3191afca45ef",
  laptop:    "https://www.figma.com/api/mcp/asset/eaa4ae6c-f9ae-454d-a42b-f47174fa15cf",
  phone:     "https://www.figma.com/api/mcp/asset/ed4e5bff-9c2a-43fc-a5cb-2b9181330b1f",
  edp:       "https://www.figma.com/api/mcp/asset/807759db-b51f-47f3-b4b4-455c51ed94bc",
  whatsapp:  "https://www.figma.com/api/mcp/asset/015a0a1b-fe1b-4bba-b124-69141a8b3cd9",
  nexxa:     "https://www.figma.com/api/mcp/asset/370a50ff-0786-4278-b3e0-83ac94db0c00",
};

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
    <main className="w-[390px] bg-black text-white overflow-hidden">

      {/* ═══ DECORATIVE ELLIPSES ═══ */}
      <div className="pointer-events-none">
        <div className="absolute" style={{ left: 219 + 195 - 148, top: 14, width: 296, height: 296, opacity: 0.5 }}>
          <img src={IMG.ellipse} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute" style={{ left: 195 - 205 - 148, top: 384, width: 296, height: 296, opacity: 0.5 }}>
          <img src={IMG.ellipse} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute" style={{ left: 141 + 195 - 148, top: 970, width: 296, height: 296, opacity: 0.5 }}>
          <img src={IMG.ellipse} alt="" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* ═══ HERO — LOGO + TÍTULO ═══ */}
      <section className="relative flex flex-col items-center pt-[59px] pb-10">

        {/* Logo */}
        <div className="relative w-[177px] h-[108px] overflow-hidden">
          <img src={IMG.logo} alt="Mestre do Orgasmo" className="absolute w-full h-[163%] object-cover -top-[31%]" />
        </div>

        {/* Divider */}
        <div className="mt-6 w-[309px] h-px bg-gradient-to-r from-transparent via-[#ff3838] to-transparent" />

        {/* Título */}
        <div className="mt-6 text-center w-[334px]">
          <p className="text-[28px] font-bold leading-[30.42px] text-[#58e400]">Parabéns, Mestre!</p>
          <p className="mt-1 text-[20px] font-normal leading-[22.4px] text-white">
            Sua inscrição no Mestre do Orgasmo foi confirmada com sucesso!
          </p>
        </div>

        {/* Subtítulo */}
        <p className="mt-4 text-[16px] font-normal leading-[21.4px] text-white text-center w-[315px]">
          Para acessar o treinamento, clique no botão abaixo e faça login na Área de Membros:
        </p>

        {/* Device mockups */}
        <div className="relative mt-6 w-full flex justify-center" style={{ height: 170 }}>
          <div className="absolute" style={{ left: 102, top: 0, width: 203, height: 160, overflow: "hidden" }}>
            <img src={IMG.laptop} alt="" className="absolute w-[166%] h-[140%] object-cover" style={{ left: "-32%", top: "-21%" }} />
          </div>
          <div className="absolute" style={{ left: 92, top: 3, width: 72, height: 124 }}>
            <img src={IMG.phone} alt="" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* CTA principal */}
        <a
          href={MEMBERS_URL}
          className="mt-6 flex items-center justify-center rounded-[120px] bg-[#3fbf42] text-center font-bold text-[12px] text-white tracking-[0.7px] leading-[30.42px]"
          style={{ width: 286, height: 52, boxShadow: "0px 0px 20px 0px #3fbf42" }}
        >
          ACESSE SUA ÁREA DE MEMBROS AGORA
        </a>

        {/* Aviso spam */}
        <div
          className="mt-4 flex items-center justify-center rounded-[20px] border border-[#2a2a2a] px-[20px] py-[10px] text-center text-[12px] text-white leading-[16px]"
          style={{ width: 319, background: "linear-gradient(to top, rgba(0,0,0,0.32), rgba(0,0,0,0))" }}
        >
          Caso não encontre o e-mail com o login, verifique o spam ou a lixeira na sua caixa de entrada.
        </div>

        {/* Botão Não */}
        <a
          href={DECLINE_URL}
          className="mt-4 text-[11px] font-normal text-[rgba(255,255,255,0.4)] underline text-center"
        >
          Não, obrigado
        </a>
      </section>

      {/* ═══ EDP SECTION ═══ */}
      <section className="relative flex flex-col items-center pb-10">

        {/* Badge */}
        <div
          className="flex items-center justify-center rounded-[35px] border border-[#ff3838] px-[20px] py-[5px]"
          style={{ height: 57, background: "linear-gradient(to top, #ff3838, #f2295b)" }}
        >
          <div className="text-center text-white tracking-[1px]">
            <p className="text-[12px] font-bold leading-[14px]">SEU POTE DO EDP</p>
            <p className="text-[12px] font-normal leading-[14px]">PRÓXIMOS PASSOS ATÉ A ENTREGA</p>
          </div>
        </div>

        {/* Card vermelho */}
        <div
          className="mt-4 relative rounded-[16px] border border-[#6b1515] flex flex-col items-center px-6 pt-[50px] pb-8"
          style={{ width: 358, background: "rgba(242,41,91,0.1)" }}
        >
          {/* EDP product image */}
          <div className="relative flex justify-center" style={{ height: 140 }}>
            <img src={IMG.edp} alt="" className="blur-[1px] absolute" style={{ left: 0, top: 0, width: 69, height: 126, objectFit: "cover" }} />
            <img src={IMG.edp} alt="" className="blur-[1px] absolute" style={{ left: 38, top: 0, width: 69, height: 126, objectFit: "cover" }} />
            <img src={IMG.edp} alt="" className="absolute" style={{ left: 19, top: 0, width: 74, height: 135, objectFit: "cover" }} />
          </div>

          {/* Delivery text */}
          <div className="mt-4 text-center text-white w-[315px]">
            <p className="text-[16px] font-normal leading-[21.4px]">O produto EDP será postado em</p>
            <p className="text-[29px] font-bold leading-[29.4px] bg-gradient-to-t from-[#ff3838] to-[#f2295b] bg-clip-text text-transparent">3 a 5 dias úteis.</p>
            <p className="mt-2 text-[16px] font-normal leading-[21.4px]">
              Assim que for enviado, você receberá um código de rastreio no seu e-mail para acompanhar o status da entrega.
            </p>
            <p className="mt-2 text-[16px] font-normal leading-[21.4px]">
              Fique tranquilo, estamos cuidando de tudo com o máximo de atenção para que você receba o seu produto o mais rápido possível.
            </p>
          </div>
        </div>

        {/* WhatsApp */}
        <div className="mt-6 flex items-center gap-1 text-center">
          <p className="text-[12px] font-bold text-[#00b2ff] underline leading-[16px]">
            Qualquer dúvida sobre o EDP ou o curso,{" "}
            <span>fale com a gente pelo WhatsApp.</span>
          </p>
          <img src={IMG.whatsapp} alt="" className="w-[11px] h-[11px]" />
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

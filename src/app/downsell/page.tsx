"use client";
/* LP Mestre do Orgasmo — Downsell (node 308:157) */
import { useEffect, useRef } from "react";

const MEMBERS_URL = "#membros";
const DECLINE_URL = "https://www.institutonexxa.com/obrigado";

const IMG = {
  ellipse: "https://www.figma.com/api/mcp/asset/1e2b65d5-96eb-4ffa-8109-97ae142bccb7",
  logo:    "https://www.figma.com/api/mcp/asset/d3636e5d-70e1-4dbc-bba2-296edc0542cb",
  laptop:  "https://www.figma.com/api/mcp/asset/4572dcde-b4f9-42db-a90d-a4deea532295",
  phone:   "https://www.figma.com/api/mcp/asset/13dbb054-8c99-4f93-8c69-8ed0ea6dae34",
  nexxa:   "https://www.figma.com/api/mcp/asset/32fca869-7b64-4b6c-8445-93bdbb7a3ff7",
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

      {/* ═══ ELLIPSES DECORATIVAS ═══ */}
      <div className="pointer-events-none select-none">
        <div className="absolute overflow-hidden" style={{ left: 266, top: 14, width: 296, height: 296, opacity: 0.5 }}>
          <img src={IMG.ellipse} alt="" className="block w-full h-full" />
        </div>
        <div className="absolute overflow-hidden" style={{ left: -172, top: 384, width: 296, height: 296, opacity: 0.5 }}>
          <img src={IMG.ellipse} alt="" className="block w-full h-full" />
        </div>
      </div>

      {/* ═══ CONTEÚDO PRINCIPAL ═══ */}
      <section className="relative flex flex-col items-center px-5 pt-[59px] pb-10">

        {/* Logo */}
        <div className="relative w-[177px] h-[108px] overflow-hidden">
          <img
            src={IMG.logo}
            alt="Mestre do Orgasmo"
            className="absolute w-full object-cover"
            style={{ height: "163%", top: "-31.45%" }}
          />
        </div>

        {/* Divider */}
        <div
          className="mt-6 h-px w-[309px]"
          style={{ background: "linear-gradient(to right, rgba(0,0,0,0), #ff3838 52.885%, rgba(0,0,0,0))" }}
        />

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

        {/* Mockups */}
        <div className="relative mt-6 w-full" style={{ height: 170 }}>
          {/* Laptop */}
          <div
            className="absolute overflow-hidden"
            style={{ left: 102, top: 0, width: 203, height: 160 }}
          >
            <img
              src={IMG.laptop}
              alt=""
              className="absolute max-w-none"
              style={{ width: "166.01%", height: "140.43%", left: "-32.02%", top: "-20.84%" }}
            />
          </div>
          {/* Phone */}
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

        {/* Box spam */}
        <div
          className="mt-4 flex items-center justify-center rounded-[20px] border border-[#2a2a2a] px-5 py-3 text-center text-[12px] text-white leading-[16px]"
          style={{ width: 319, background: "linear-gradient(to top, rgba(0,0,0,0.32), rgba(0,0,0,0))" }}
        >
          Caso não encontre o e-mail com o login, verifique o spam ou a lixeira na sua caixa de entrada.
        </div>

        {/* Botão Não */}
        <a
          href={DECLINE_URL}
          className="mt-5 text-[11px] font-normal text-[rgba(255,255,255,0.35)] underline text-center"
        >
          Não, obrigado
        </a>
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

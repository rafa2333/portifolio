import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Github, ExternalLink, ImageOff } from "lucide-react";
import { projects } from "../projects";
import { useState } from "react";

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === id);
  const [activeImg, setActiveImg] = useState(0);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#08060f] flex items-center justify-center text-purple-400">
        Projeto não encontrado.
      </div>
    );
  }

  const hasImages = project.images && project.images.length > 0;

  return (
    <div className="min-h-screen bg-[#08060f] text-purple-100 relative overflow-x-hidden">
      {/* Ambient blobs */}
      <div className="fixed -top-32 -left-32 w-96 h-96 rounded-full bg-purple-700 opacity-10 blur-3xl pointer-events-none z-0" />
      <div className="fixed -bottom-40 -right-24 w-125 h-125 rounded-full bg-violet-900 opacity-10 blur-3xl pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto px-6 py-16 relative z-10">
        {/* Botão voltar */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-purple-400 hover:text-purple-200 transition-colors mb-12 group"
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="text-sm font-medium">Voltar</span>
        </button>

        {/* Header do projeto */}
        <div className="mb-10 fles justify-center">
          <p className="text-[11px] tracking-[3px] uppercase text-violet-600 font-semibold mb-3">
            Projeto
          </p>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <h1 className="text-5xl font-extrabold bg-linear-to-br from-purple-100 via-purple-200 to-purple-500 bg-clip-text text-transparent tracking-tight">
              {project.title}
            </h1>
            <div className="flex gap-3">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-violet-700 to-purple-500 text-white rounded-xl text-sm font-medium shadow-lg shadow-purple-900/40 hover:shadow-purple-700/50 transition-shadow"
                >
                  <ExternalLink size={16} /> Ver site
                </a>
              )}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full bg-purple-900/40 text-purple-400 border border-purple-800/30"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Galeria de imagens */}
        <div className="mb-10">
          {hasImages ? (
            <>
              {/* Imagem principal */}
              <div className="w-full aspect-video rounded-2xl overflow-hidden border border-purple-900/30 mb-4 bg-purple-950/20">
                <img
                  src={project.images[activeImg]}
                  alt={`${project.title} - imagem ${activeImg + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Thumbnails */}
              {project.images.length > 1 && (
                <div className="flex gap-3 flex-wrap">
                  {project.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`w-20 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                        activeImg === i
                          ? "border-purple-500 opacity-100"
                          : "border-purple-900/30 opacity-50 hover:opacity-75"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`thumb ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            /* Placeholder quando não há imagens */
            <div className="w-full aspect-video rounded-2xl border border-purple-900/30 bg-purple-950/20 flex flex-col items-center justify-center gap-3 text-purple-700">
              <ImageOff size={40} />
              <p className="text-sm">
                Adicione imagens do projeto em{" "}
                <code className="text-purple-600">projects.js</code>
              </p>
            </div>
          )}
        </div>

        {/* Descrição completa */}
        <div className="bg-purple-950/10 border border-purple-900/30 rounded-2xl p-8 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-purple-300 mb-5 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-purple-500 inline-block" />
            Sobre o projeto
          </h2>
          <div className="text-purple-300/70 text-sm leading-relaxed flex flex-col gap-4">
            {project.fullDescription.split("\n\n").map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

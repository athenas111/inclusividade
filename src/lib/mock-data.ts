export type Module = {
  id: string;
  title: string;
  duration: string;
  summary: string;
  transcript: string;
  topics: string[];
};

export const MODULES: Module[] = [
  {
    id: "boas-vindas",
    title: "Boas-vindas à empresa",
    duration: "4 min",
    summary: "Conheça quem somos, nossa missão e como você se encaixa na equipe.",
    transcript:
      "Olá! Que bom ter você aqui. Nesta primeira pílula vamos te apresentar a empresa, nossos valores e a forma como trabalhamos. Você vai conhecer nossa CEO, ouvir histórias de colegas e descobrir o que esperamos do seu primeiro mês.",
    topics: ["Quem somos", "Valores", "Sua jornada"],
  },
  {
    id: "cultura",
    title: "Cultura e diversidade",
    duration: "5 min",
    summary: "Como respeitamos diferenças e construímos um ambiente seguro para todos.",
    transcript:
      "Nossa cultura é construída todos os dias por cada pessoa da equipe. Aqui falamos sobre respeito, escuta ativa, e como denunciar comportamentos inadequados sem medo. Diversidade não é meta — é prática diária.",
    topics: ["Respeito", "Escuta ativa", "Canais de denúncia"],
  },
  {
    id: "conduta",
    title: "Código de conduta",
    duration: "3 min",
    summary: "As regras claras que protegem você e seus colegas.",
    transcript:
      "Nosso código de conduta existe para garantir que todos tenham um ambiente justo. Vamos passar pelos pontos principais: comunicação respeitosa, conflito de interesses e uso de informações da empresa.",
    topics: ["Comunicação", "Conflitos", "Informação"],
  },
  {
    id: "seguranca",
    title: "Segurança da informação",
    duration: "4 min",
    summary: "Como proteger dados sensíveis e usar bem as ferramentas internas.",
    transcript:
      "A segurança da informação começa em pequenos hábitos: senhas fortes, autenticação em dois fatores e cuidado com phishing. Vamos te mostrar como ativar tudo isso no seu primeiro dia.",
    topics: ["Senhas", "2FA", "Phishing"],
  },
  {
    id: "beneficios",
    title: "Benefícios e bem-estar",
    duration: "3 min",
    summary: "Tudo o que está disponível para você cuidar de si mesmo.",
    transcript:
      "Plano de saúde, apoio psicológico, vale-cultura e horários flexíveis. Aqui você descobre como usar cada benefício e onde encontrar ajuda quando precisar.",
    topics: ["Saúde", "Apoio psicológico", "Flexibilidade"],
  },
  {
    id: "quiz",
    title: "Quiz final",
    duration: "5 min",
    summary: "Uma revisão leve para fixar o que você aprendeu.",
    transcript:
      "Cinco perguntas curtas para revisar o conteúdo. Sem pegadinhas, sem ranking, só para garantir que tudo ficou claro. Você pode refazer quantas vezes quiser.",
    topics: ["Revisão", "Sem pressão", "Refazer livre"],
  },
];

export type Barrier = {
  id: string;
  tool: string;
  description: string;
  responsible: "RH" | "TI";
  status: "Aberto" | "Em análise" | "Resolvido";
  reportedAt: string;
};

export const INITIAL_BARRIERS: Barrier[] = [
  {
    id: "b1",
    tool: "Sistema de ponto",
    description: "Botão de bater ponto não tem rótulo acessível — leitor de tela não anuncia a ação.",
    responsible: "TI",
    status: "Em análise",
    reportedAt: "2025-06-10",
  },
  {
    id: "b2",
    tool: "Wiki interna",
    description: "Vídeos institucionais sem legenda fechada.",
    responsible: "RH",
    status: "Aberto",
    reportedAt: "2025-06-12",
  },
];
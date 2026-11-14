// Endereço do back-end Django. Em produção, troque pelo domínio da API.
export const API_URL = "http://localhost:8000/api/landing/";

// Usado se a API estiver fora do ar, para a página nunca ficar vazia.
export const FALLBACK = {
  ano: 2027,
  titulo: "Sua vez de ser aluno em 2027",
  mensagem: "A Palavra de Deus transforma vidas. Venha estudar, crescer e ser treinado no Rhema.",
  link_pre_matricula: "",
  link_contato: "",
  testemunhos: [],
};

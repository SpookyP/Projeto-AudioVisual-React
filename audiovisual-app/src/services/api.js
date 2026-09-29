const API_URL = 'http://localhost:3001/audiovisual';

/**
 * GET /itens
 * Devuelve a lista completa de equipamentos
 */
export const getEquipamentos = async () => {
  const response = await fetch(`${API_URL}/itens`);
  if (!response.ok) {
    throw new Error('Erro ao carregar a lista de equipamentos.');
  }
  return await response.json();
};

/**
 * GET /itens/{id}
 * Devolve os detalhes de um equipamento específico
 */
export const getEquipamentoPorId = async (id) => {
  const response = await fetch(`${API_URL}/itens/${id}`);
  if (!response.ok) {
    throw new Error('Erro ao obter os detalhes do equipamento.');
  }
  return await response.json();
};

/**
 * GET /itens/{id}/disponibilidade?inicio=...&fim=...&quantidade=...
 * Verifica a disponibilidade diretamente na API
 */
export const verificarDisponibilidadeAPI = async (id, inicio, fim, quantidade) => {
  const url = `${API_URL}/itens/${id}/disponibilidade?inicio=${inicio}&fim=${fim}&quantidade=${quantidade}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Erro ao verificar disponibilidade.');
  }

  // Devolve { disponivel: true } ou { disponivel: false }
  return await response.json();
};

/**
 * GET /reservas
 * Listar todas as reservas
 */
export const getReservas = async () => {
  const response = await fetch(`${API_URL}/reservas`);
  if (!response.ok) {
    throw new Error('Erro ao carregar a lista de reservas.');
  }
  return await response.json();
};

/**
 * POST /reservas
 * Criar uma nova reserva na API
 */
export const criarReserva = async (dadosReserva) => {
  const response = await fetch(`${API_URL}/reservas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dadosReserva),
  });

  if (!response.ok) {
    throw new Error('Erro ao submeter a reserva.');
  }

  return await response.json();
};

/**
 * DELETE /reservas/{id}
 * Cancelar/Eliminar uma reserva pelo ID
 */
export const cancelarReserva = async (idReserva) => {
  const response = await fetch(`${API_URL}/reservas/${idReserva}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Erro ao cancelar a reserva.');
  }

  // Resposta 204 não tem corpo (sem json)
  return true;
};

/**
 * PATCH /{tema}/itens/{id}
 * Adicionar ou alterar a imagem de um equipamento
 */
export const atualizarImagemEquipamento = async (id, novaImagemUrl) => {
  const response = await fetch(`${API_URL}/${TEMA}/itens/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ imagem: novaImagemUrl }),
  });

  if (!response.ok) {
    throw new Error('Erro ao atualizar a imagem do equipamento.');
  }

  return await response.json();
};
import { apiConfig } from "./api-config";

export async function scheduleCancel({ id }) {
  try {
    const response = await fetch(`${apiConfig.baseURL}/schedules/${id}`, {
      method: "DELETE",
    });

    // O fetch não dá erro quando a API responde 404, então verificamos aqui.
    if (!response.ok) {
      throw new Error(`Erro ${response.status} ao cancelar o agendamento.`);
    }

    alert("Agendamento cancelado com sucesso!");
  } catch (error) {
    console.log(error);
    alert("Não foi possível cancelar o agendamento.");
  }
}

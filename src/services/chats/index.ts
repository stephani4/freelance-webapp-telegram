import http from "../../plugins/http";

export const create = async (participantId: number) => {
  const response = await http.post('/chats/create', {
      participant_id: participantId
  });

  return response.data;
};
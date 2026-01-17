export interface Media {
  uuid: string;
  titulo: string;
  des?: string;
  tipo: "VIDEO";
  url_thumb: string;
  url_player?: string;
  status?: string;
  eh_premium: boolean;
  duracao_segundos: number | null;
  borrar: boolean;
}

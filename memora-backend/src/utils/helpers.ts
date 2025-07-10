import axios from "axios";
import { config } from "../config";
import { GWmmseScoreDto } from "./guessWhatUtils";
import { StpMMSEScoreDto } from "./stroopUtils";

const ai_server_url = config.aiServer!.baseUrl!

export const requestMMSEScore = async (data: GWmmseScoreDto | StpMMSEScoreDto, key: string) => {
  const res = await axios.post(`${ai_server_url}/game/predict-mmse/${key}`, data);
  if (res.status !== 200){
    throw new Error("Couldn't make request to ai server")
  }

  return res.data.predicted_mmse
}
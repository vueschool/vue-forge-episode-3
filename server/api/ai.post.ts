import { Configuration, OpenAIApi } from "openai";
import * as agents from "@/agents";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { OPENAI_API_KEY } = useRuntimeConfig();

  const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  if (!Object.keys(agents).includes(`${body.agent}Agent`)) {
    throw new Error(`${body.agent} Agent does not exist`);
  }

  const { data } = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [],
    temperature: body.temperature || 1,
    // @ts-expect-error checking above if agent exists
    ...agents[`${body.agent}Agent`](body),
  });
  return data;
});

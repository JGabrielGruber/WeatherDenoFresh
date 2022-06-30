import { HandlerContext } from "$fresh/server.ts";
import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";

const { IPINFO_TOKEN } = config();

export const handler = async (
  _req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  const address = _ctx.remoteAddr.hostname;
  const resp = await fetch(
    `https://ipinfo.io/${address}?token=${IPINFO_TOKEN}`,
    {
      headers: {
        accept: "application/json",
      },
    },
  );
  return new Response(resp.body, {
    status: resp.status,
    headers: {
      "content-type": "application/json",
    },
  });
};

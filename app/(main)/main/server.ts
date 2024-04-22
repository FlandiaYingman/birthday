"use server";

import { kv } from "@vercel/kv";

export async function submitWish(uuid: string, wish: string[]) {
  return kv.set(`wish__${uuid}`, JSON.stringify(wish));
}

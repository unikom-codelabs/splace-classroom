"use client";
import { mutate } from "swr";

export function mutateSWRPartialKey({
  key,
  cache,
}: {
  key: string;
  cache: any;
}) {
  cache
    .keys()
    .filter((k: any) => k.includes(key))
    .forEach((k: any) => mutate(k));
}

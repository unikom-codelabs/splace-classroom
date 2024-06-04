"use client";
import { mutate } from "swr";

export function mutateSWRPartialKey({ key, cache }: { key: any; cache: any }) {
  // cache
  //   .keys()
  //   .filter((k: any) => k.includes(key))
  //   .forEach((k: any) => mutate(k));
  key.forEach((k: any) => {
    cache
      .keys()
      .filter((key: any) => key.includes(k))
      .forEach((k: any) => {
        mutate(k);
      });
  });
}

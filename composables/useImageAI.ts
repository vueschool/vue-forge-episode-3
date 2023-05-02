import type { AsyncState } from "types";
export const useImageAi = () => {
  const image = useState<string>("social-image", () => "");
  const title = useState<string>("social-image-title", () => "");
  const state = useState<AsyncState>("social-image-state");
  async function generate(url: string) {
    image.value = "";
    state.value = "loading";
    const res = await Promise.all([
      $fetch<string>(`/api/image`, {
        method: "POST",
        body: { url },
      }),
      $fetch<Record<string, any>>(`/api/scrape`, {
        method: "POST",
        body: { url },
      }),
    ]);

    image.value = res[0];
    title.value = res[1].title;
    state.value = "complete";
    return image.value;
  }

  return {
    generate,
    image,
    state,
    title,
  };
};

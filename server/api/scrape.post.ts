export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const url = body.url; // the article URL

  const html = await $fetch<string>(url);

  return {
    title: getTitle(html),
  };
});

function getTitle(html: string) {
  const regex = /<h1[^>]*>([^<]*)<\/h1>/i;
  const match = regex.exec(html);
  return match ? match[1] : "";
}

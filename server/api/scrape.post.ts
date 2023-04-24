export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const url = body.url; // the article URL

  // scrape the provided article URL here

  return {
    title: "The scraped title here",
  };
});

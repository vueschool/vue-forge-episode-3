export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // scrape the provided article URL here

  return {
    title: "return the title here",
  };
});

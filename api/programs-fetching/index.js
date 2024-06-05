export async function getPrograms() {
  const query = `
    {
      posts {
        nodes {
          uri
          title
          programFields {
            programPrice
            programDescription {
              __typename
              programDescriptionItem
            }
          }
        }
      }
    }
  `;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}?query=${encodeURIComponent(
      query
    )}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 0,
      },
    }
  );

  const { data } = await res.json();

  return data.posts.nodes;
}

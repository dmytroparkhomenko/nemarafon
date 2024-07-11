export async function getPrograms() {
  const query = `
    {
      posts  {
        nodes {
          uri
          title
          programFields {
            programPrice
            programCardBackground {
              node {
                sourceUrl
              }
            }
            programShortDescription
            programDescription {
              __typename
              programDescriptionItem
            }
            programContent {
              __typename
              programVideoLink
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

  return data.posts.nodes.reverse();
}

export async function getProgramByURI(uri) {
  const query = `
    {
      post (id: "${uri}", idType:URI) {
        uri
        title
        programFields {
          programPrice
          programShortDescription
          programDescription {
            __typename
            programDescriptionItem
          }
          programContent {
            __typename
            programVideoLink
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

  return data.post;
}

export async function getPostDataForPayment(uri) {
  const query = `
    {
      post (id: "${uri}", idType:URI) {
        title
        programFields {
          programPrice
          programShortDescription
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

  return data.post;
}

export async function getResults() {
  const query = `
    {
      results {
        resultsFields {
          studioResultsCollection {
            resultImage {
              node {
                altText
                sourceUrl
              }
            }
          }
          homeResultsCollection {
            resultImage {
              node {
                altText
                sourceUrl
              }
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

  return data.results.resultsFields;
}

export async function getReviews() {
  const query = `
    {
      reviews {
        reviewFields {
          review {
            reviewCustomerName
            reviewCustomerProgram
            reviewCustomerRate
            reviewCustomerReview
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

  return data.reviews.reviewFields;
}

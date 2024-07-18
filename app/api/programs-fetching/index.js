async function fetchGraphQL(query) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}?query=${encodeURIComponent(
        query
      )}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (!response.ok) {
      throw new Error(`GraphQL error: ${response.status}`);
    }

    const json = await response.json();
    if (json.errors) {
      console.error("GraphQL operation failed:", json.errors);
      throw new Error("GraphQL operation failed");
    }

    return json.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

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
  const data = await fetchGraphQL(query);
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
  const data = await fetchGraphQL(query);
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
  const data = await fetchGraphQL(query);
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
  const data = await fetchGraphQL(query);
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
  const data = await fetchGraphQL(query);
  return data.reviews.reviewFields;
}

export async function getWhyMeSection() {
  const query = `
    {
      whyMeSectionRoot {
        whyMeSection {
          whymesectionRepeater {
            whymesectionRepeaterItem {
              whymesectionRepeaterItemTitle
              whymesectionRepeaterItemContent
            }
          }
        }
      }
    }`;

  const data = await fetchGraphQL(query);
  return data.whyMeSectionRoot.whyMeSection.whymesectionRepeater;
}

export async function getAboutMeSection() {
  const query = `
    {
      whyMeSectionRoot {
        whyMeSection {
          whymesectionRepeater {
            whymesectionRepeaterItem {
              whymesectionRepeaterItemTitle
              whymesectionRepeaterItemContent
            }
          }
        }
      }
    }`;

  const data = await fetchGraphQL(query);
  return data.whyMeSectionRoot.whyMeSection.whymesectionRepeater;
}

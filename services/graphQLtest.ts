// Define the response type for better type safety
type FetchGraphQLResponse = {
  data?: any;
  errors?: any;
};

// Function to fetch and execute the GraphQL mutation
async function fetchGraphQL(
  operationsDoc: string,
  operationName: string,
  variables: Record<string, any>
): Promise<FetchGraphQLResponse> {
  const result = await fetch(
    "https://nameless-brook-650088.eu-central-1.aws.cloud.dgraph.io/graphql",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJzL3Byb3h5IiwiZHVpZCI6IjB4ODJhZTY3ODVhIiwiZXhwIjoxNzI3OTAxMDg2LCJpc3MiOiJzL2FwaSJ9.CUxDqcND4MU1zAbv9FWEm0_MR8-pIb0cJ4rTm0O__Vw",
      },
      body: JSON.stringify({
        query: operationsDoc,
        variables: variables,
        operationName: operationName,
      }),
    }
  );

  return result.json();
}

// Define the mutation query as a string
const operationsDoc = `
  mutation MyMutation($username: String!, $dateCreated: DateTime!, $title: String!) {
    addProgram(input: {user: {username: $username}, active: true, dateCreated: $dateCreated, title: $title}) {
      numUids
    }
  }
`;

// Function to execute the mutation with provided variables
function executeMyMutation(username: string, dateCreated: string, title: string) {
  return fetchGraphQL(operationsDoc, "MyMutation", {
    username: username,
    dateCreated: dateCreated,
    title: title,
  });
}

// Main function to be exported, to execute the mutation and handle the response
export async function startExecuteMyMutation(
  username: string,
  dateCreated: string,
  title: string
): Promise<void> {
  const { errors, data } = await executeMyMutation(username, dateCreated, title);

  if (errors) {
    // Handle errors if any
    console.error(errors);
    return;
  }

  // Handle the response data
  console.log(data);
}

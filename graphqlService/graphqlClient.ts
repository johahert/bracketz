export type FetchGraphQLResponse = {
    data?: any;
    errors?: any;
}

export async function fetchGraphQL(
    url:string,
    operationsDoc: string,
    operationName: string,
    variables: Record<string, any> = {}
):Promise<FetchGraphQLResponse> {

    const result = await fetch(url
        
    )



    return {}
}
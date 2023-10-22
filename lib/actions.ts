import { ProjectForm } from "@/common.types";
import {
    createProjectMutation,
    createUserMutation,
    getUserQuery,
} from "@/graphql";
import { GraphQLClient } from "graphql-request";

const isProduction = process.env.NODE_ENV === "production";

// if production then public url else localhost
const apiUrl = isProduction
    ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || ""
    : "http://localhost:4000/graphql";
const apiKey = isProduction
    ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || ""
    : "1234";
// if production then public frontend server url else localhost
const serverUrl = isProduction
    ? process.env.NEXT_PUBLIC_SERVER_URL || ""
    : "http://localhost:3000";

// CONNECT TO GRAPHQL API
const client = new GraphQLClient(apiUrl);

// MAKE GRAPHQL REQUEST
const makeGraphQLRequest = async (query: string, variables = {}) => {
    try {
        return await client.request(query, variables);
    } catch (error: any) {
        throw error;
    }
};

// GRAPHQL UTIL FUNCTIONS
export const getUser = (email: string) => {
    client.setHeader("x-api-key", apiKey);
    return makeGraphQLRequest(getUserQuery, { email });
};

export const createUser = (name: string, email: string, avatarUrl: string) => {
    client.setHeader("x-api-key", apiKey);
    const variables = {
        input: {
            name,
            email,
            avatarUrl,
        },
    };
    return makeGraphQLRequest(createUserMutation, variables);
};

export const fetchToken = async () => {
    try {
        const response = await fetch(`${serverUrl}/api/auth/token`);
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const uploadImage = async (imagePath: string) => {
    try {
        const response = await fetch(`${serverUrl}/api/upload`, {
            method: "POST",
            body: JSON.stringify({ path: imagePath }),
        });
        return await response.json();
    } catch (error) {
        throw error;
    }
};
export const createNewProject = async (
    form: ProjectForm,
    creatorId: string,
    token: string
) => {
    const imageUrl = await uploadImage(form.image);
    if (imageUrl.url) {
        client.setHeader("x-api-key", apiKey);
        const variables = {
            input: {
                ...form,
                image: imageUrl.url,
                createdBy: {
                    link: creatorId,
                },
            },
        };
        console.log(token);
        return makeGraphQLRequest(createProjectMutation, variables);
    }
};

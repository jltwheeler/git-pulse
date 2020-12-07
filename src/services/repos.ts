/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { gql } from "graphql-request";
import client from "../client";

const tester = async (queries: string): Promise<string> => {
  const query = gql`
    query {
     ${queries}
    }
  `;
  return await client.request(query);
};

export default {
  tester,
};

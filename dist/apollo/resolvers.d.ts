declare const resolvers: {
    Query: {
        lastSelectedHouse: () => {
            __typename: string;
            value: string | null;
            label: string | null;
        };
        auth: () => {
            __typename: string;
            isLogIn: string | null;
        };
    };
    Mutation: {
        LogUserIn: (_: any, { token }: any, { cache }: any) => null;
        LogUserOut: (_: any, __: any, { cache }: any) => null;
        selectHouse: (_: any, args: any, { cache }: any) => {
            __typename: string;
            ok: boolean;
            erorr: null;
            error?: undefined;
        } | {
            __typename: string;
            ok: boolean;
            error: any;
            erorr?: undefined;
        };
    };
};
export default resolvers;

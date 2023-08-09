const handler = async (req: Request): Promise<Response> => {
    return new Response(JSON.stringify({}), { status: 200 });
};

export default handler;

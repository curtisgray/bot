import { useFetch } from "@/hooks/useFetch";
import { useCallback } from "react";

export interface GetModelsRequestProps {
    key: string;
}

const useOpenSourceService = () => {
    const getModels = useCallback(
        (params: GetModelsRequestProps, signal?: AbortSignal) => {
            return [
                {
                    id: 1,
                    name: "LLaMA 2 7B",
                    description: "LLaMA 2 7B is a 7B model of the LLaMA 2 series.",
                    created: new Date(),
                    updated: new Date(),
                },
            ]
        },
        []
    );

    return {
        getModels,
    };
};

export default useOpenSourceService;

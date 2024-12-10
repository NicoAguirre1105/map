import { useCallback, useState } from "react";

export type Any = any;
export type AnyAsyncFunction = (...args: any[]) => Promise<any>;

// Определим интерфейс для возвращаемого значение
interface UseMutationResult<T> {
    mutate: (...args: Parameters<AnyAsyncFunction>) => Promise<void>;
    isLoading: boolean;
    isError: boolean;
    data: T | null;
}

// Реализация самого хука
export const useMutation = <T>(
    asyncFunction: AnyAsyncFunction
): UseMutationResult<T> => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState<T | null>(null);

    const mutate = useCallback(
        async (...args: Parameters<AnyAsyncFunction>) => {
            setIsLoading(true);
            setIsError(false);
            try {
                const result = await asyncFunction(...args);
                setData(result); // Сохраняем данные результата запроса
                setIsLoading(false);
            } catch (err: Any) {
                setIsError(true);
                setIsLoading(false);
            }
        },
        [asyncFunction]
    );

    return { mutate, isLoading, isError, data };
};

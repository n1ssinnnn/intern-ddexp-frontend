"use client";

import useSWR, { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";
import { apiRequest, type ApiError } from "@/lib/api";
import type {
    CreateUserInput,
    EditUserInput,
    UserListItem,
    UserListResponse,
} from "@/types/user";

const USER_LIST_KEY = "/api/v1/user/";

function useUserMutation<TArg>(
    key: string | null,
    method: "POST" | "PUT" | "DELETE"
) {
    const { mutate: mutateCache } = useSWRConfig();
    const mutation = useSWRMutation<unknown, ApiError, string | null, unknown>(
        key,
        (url, { arg }) => {
            if (!url) throw new Error("A user ID is required for this request.");
            return apiRequest(url, {
                method,
                body: method === "DELETE" ? undefined : arg,
            });
        }
    );

    const trigger = async (arg: TArg) => {
        const result = await mutation.trigger(arg, { throwOnError: true });
        await mutateCache(USER_LIST_KEY);
        if (method !== "POST" && key) await mutateCache(key);
        return result;
    };

    return {
        trigger,
        data: mutation.data,
        error: mutation.error,
        isMutating: mutation.isMutating,
        reset: mutation.reset,
    };
}

export function useUser() {
    const { data, error, isLoading } = useSWR<UserListResponse, ApiError>(USER_LIST_KEY);

    return {
        users: data?.data,
        page: data?.page,
        perPage: data?.perPage,
        total: data?.total,
        totalPages: data?.totalPages,
        isLoading,
        error
    }
}

export function useUserById(id?: string) {
    const { data, error, isLoading } = useSWR<UserListItem, ApiError>(
        id ? `/api/v1/user/${id}` : null
    );

    return {
        user: data,
        isLoading,
        error,
    };
}

export function useCreateUser() {
    const { trigger, ...state } = useUserMutation<CreateUserInput>(USER_LIST_KEY, "POST");
    return { createUser: trigger, ...state };
}

export function useEditUser(id?: string | number) {
    const key = id == null ? null : `${USER_LIST_KEY}${id}`;
    const { trigger, ...state } = useUserMutation<EditUserInput>(key, "PUT");
    return { editUser: trigger, ...state };
}

export function useDeleteUser(id?: string | number) {
    const key = id == null ? null : `${USER_LIST_KEY}${id}`;
    const { trigger, ...state } = useUserMutation<void>(key, "DELETE");
    return { deleteUser: () => trigger(undefined), ...state };
}
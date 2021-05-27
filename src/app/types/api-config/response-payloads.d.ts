import { ICar } from "@app-types/car";

export interface CarDataResponsePayload {
    data: {
        rows: Array<ICar>;
        offset: number;
        limit: number;
        total_size: number;
    };
    message: number;
}

export interface CarDeleteResponsePayload {
    deletedCount: number;
    n: number;
    ok: number;
}
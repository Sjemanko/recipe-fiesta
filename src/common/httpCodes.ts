const SUCCESS = {
    CREATED: 201,
    OK: 200
} as const;

const FAILED = {
    UNAUTHROZIED: 401,
    BAD_REQUEST: 400,
    INTERNAL_SERVER_ERROR: 500
} as const;

export const HTTP_CODES = {
    SUCCESS,
    FAILED
}
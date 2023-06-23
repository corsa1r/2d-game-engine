export function to<T, U = Error>(
    promise: Promise<T>,
): Promise<[U | null, T | undefined]> {
    return promise
        .then<[null, T]>((data: T) => [null, data])
        .catch<[U, undefined]>((error: U) => {
            return [error, undefined]
        })
}

export function frame(ms: number = 0): Promise<unknown> {
    return new Promise((resolve) => {
        setTimeout(resolve, ms)
    })
}

export default to

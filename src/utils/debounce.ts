/**
 * Debounce function to limit the rate at which a function can fire
 * @param func - The function to debounce
 * @param wait - The number of milliseconds to delay
 * @returns A debounced version of the function
 */
export function debounce<F extends (...args: never[]) => void>(
    func: F,
    wait: number,
): (...args: Parameters<F>) => void {
    let timeout: ReturnType<typeof setTimeout> | null = null

    return function (...args: Parameters<F>) {
        if (timeout) {
            clearTimeout(timeout)
        }

        timeout = setTimeout(() => {
            func(...args)
        }, wait)
    }
}

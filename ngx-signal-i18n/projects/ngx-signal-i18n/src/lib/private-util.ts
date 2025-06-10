export function stringify(obj: any): string {
    return JSON.stringify(obj, (_, value) => {
        if (typeof value === "function") {
            return (value as Function).toString()
        }
        return value
    })
}
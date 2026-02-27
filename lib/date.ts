export const isoToLocal = (iso: Date | string) => iso.toLocaleString();

export const dateFormat = (createdAt: string, updatedAt: string) => {
    let date = createdAt
    if (createdAt != updatedAt) date += ` (last edit: ${updatedAt})`
    return date
}

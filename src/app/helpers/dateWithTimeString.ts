export const dateWithTimeString = (date: Date): string => {
    return (
        new Date (date).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        }) +
        ' ' + new Date(date).toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        })
    )
}
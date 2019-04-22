export function debounce(fn, dur = 200) {
    let timer = null
    return () => {
        clearTimeout(timer)
        timer = setTimeout(fn, dur)
    }
}
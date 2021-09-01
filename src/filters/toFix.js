export default function toFix(value) {
    value = parseFloat(value);
    return value.toFixed(2) + "$";
}
// после , оставляем 2 цифры

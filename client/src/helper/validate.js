export default function numberValidate(values) {
    if (!values.number) return "Can't leave empty";
    else if (values.number.length !== 10) {
        return "Invalid Number";
    } else if (!/^\d+$/.test(values.number))
        return "Input must contain only numbers";
}

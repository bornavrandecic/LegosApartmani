import { NumericFormat } from "react-number-format"

// isti format cijene na svim mjestima u aplikaciji
export default function Cijena({ iznos }) {
    return (
        <NumericFormat
            value={iznos}
            displayType="text"
            decimalSeparator=","
            thousandSeparator="."
            decimalScale={2}
            fixedDecimalScale
            suffix=" €"
        />
    )
}

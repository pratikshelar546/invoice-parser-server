import mongoose from "mongoose";
const { Schema } = mongoose;

const valueWithConfidenceSchema = new Schema(
    {
        value: {
            type: Schema.Types.Mixed,
            required: true,
        },
        confidence: {
            type: Number,
        },
        tag: {
            type: String,
        },
    },
    { _id: false }
);

const invoiceParserSchema = new Schema({
    invoiceNumber: {
        type: valueWithConfidenceSchema,
        required: true,
    },
    invoiceDate: {
        type: valueWithConfidenceSchema,
        required: true,
    },
    supplierName: {
        type: valueWithConfidenceSchema,
        required: true,
    },
    taxableAmount: {
        type: valueWithConfidenceSchema,
    },
    gstAmount: {
        type: valueWithConfidenceSchema,
    },
    totalAmount: {
        type: valueWithConfidenceSchema,
    },
    items: {
        type: Array,
    },
    extraDetails: {
        type: Array,
    }
})

export const InvoiceParser = mongoose.model("InvoiceParser", invoiceParserSchema);

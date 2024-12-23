import mongoose, { Schema, Document, Types } from "mongoose";

interface incidents {
    gname: string,
    total_incidents: number
}

const IncidentsSchema = new Schema<incidents>({
    gname: {
        type: String,
        required: true
    },
    total_incidents: {
        type: Number,
        required: true,
        default:0
    }
})

interface month {
    arr_incidents : incidents[],
    total_incidents: number
}

const MmonthSchema = new Schema<month>({
    arr_incidents: {
        type: [IncidentsSchema],
        default: []
    },
    total_incidents: {
        type: Number,
        required: true,
        default:0
    }
})

export interface IYear extends Document {
    year: number,
    m1?: month,
    m2?: month,
    m3?: month,
    m4?: month,
    m5?: month,
    m6?: month,
    m7?: month,
    m8?: month,
    m9?: month,
    m10?: month,
    m11?: month,
    m12?: month,
    total_incidents: number
}

export const YearSchema = new Schema<IYear>({
    year: {
        type: Number,
        unique: true,
        required: true
    },
    m1: {

        type: MmonthSchema,
        //default: MmonthSchema
    },
    m2: {

          type: MmonthSchema,
        //default: MmonthSchema
    },
    m3: {

          type: MmonthSchema,
        //default: MmonthSchema
    },
    m4: {

          type: MmonthSchema,
        //default: MmonthSchema
    },
    m5: {

          type: MmonthSchema,
        //default: MmonthSchema
    },
    m6: {

          type: MmonthSchema,
        //default: MmonthSchema
    },
    m7: {

          type: MmonthSchema,
        //default: MmonthSchema
    },
    m8: {

          type: MmonthSchema,
        //default: MmonthSchema
    },
    m9: {

          type: MmonthSchema,
        //default: MmonthSchema
    },
    m10: {

          type: MmonthSchema,
        //default: MmonthSchema
    },
    m11: {

          type: MmonthSchema,
        //default: MmonthSchema
    },
    m12: {

          type: MmonthSchema,
        //default: MmonthSchema
    },
    total_incidents: {
        type: Number,
        required: true,
        default:0
    }
})

export default mongoose.model<IYear>("Year", YearSchema);

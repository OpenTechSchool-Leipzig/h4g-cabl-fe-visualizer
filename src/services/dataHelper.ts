export type FieldNames =
    "Datum" |
    "volljährig?" |
    "Geschlecht" |
    "Wohnsituation" |
    "Aufenthaltsstatus" |
    "Krankenversicherungsschutz" |
    "NotfallV" |
    "MediVers" |
    "Fachbereich"

export interface Data {
    "Datum": Date;
    "volljährig?": string;
    "Geschlecht": string;
    "Wohnsituation": string;
    "Aufenthaltsstatus": string;
    "Krankenversicherungsschutz": string;
    "NotfallV": string;
    "MediVers": string;
    "Fachbereich": string
}

export default function groupBy(name: FieldNames, jsonData: Record<FieldNames, string>[], startDate?: Date, endDate?: Date) {

    let entries: Data[] = jsonData.map(e => {
        let foo = e as unknown as Data
        foo.Datum = new Date(e.Datum)
        return foo
    })

    if (startDate) {
        entries = entries.filter(it => it.Datum > startDate)
    }
    if (endDate) {
        entries = entries.filter(it => it.Datum < endDate)
    }

    // @ts-ignore
    return entries.reduce(function (r, a) {
        // @ts-ignore
        r[a[name]] = r[a[name]] || 0;
        // @ts-ignore
        r[a[name]] = r[a[name]] + 1;
        return r;
    }, {});
}


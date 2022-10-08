type FieldNames = "Datum" | "volljährig?" |
    "Geschlecht" |
    "Wohnsituation" |
    "Aufenthaltsstatus" |
    "Krankenversicherungsschutz" |
    "NotfallV" |
    "MediVers" |
    "Fachbereich"

export default function groupBy(name: FieldNames, data: any) {
    // @ts-ignore
    return data.reduce(function (r, a) {
        // @ts-ignore
        r[a[name]] = r[a[name]] || 0;
        // @ts-ignore
        r[a[name]] = r[a[name]] + 1;
        return r;
    }, {});
}


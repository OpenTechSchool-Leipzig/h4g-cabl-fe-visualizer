export default function groupBy(name: string, data: any) {
    // @ts-ignore
    return data.reduce(function (r, a) {
        // @ts-ignore
        r[a[name]] = r[a[name]] || 0;
        // @ts-ignore
        r[a[name]] = r[a[name]] + 1;
        return r;
    }, {});


}
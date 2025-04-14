module.exports = {

"[project]/.next-internal/server/app/api/analyze/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
}}),
"[externals]/next/dist/compiled/next-server/app-route.runtime.dev.js [external] (next/dist/compiled/next-server/app-route.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page.runtime.dev.js [external] (next/dist/compiled/next-server/app-page.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[project]/src/app/api/analyze/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "GET": (()=>GET)
});
async function GET(req) {
    console.log(req);
// const id = req.nextUrl.searchParams.get('id');
// const apiKey = process.env.API_KEY;
// if (!id) {
//   return NextResponse.json(
//     { error: 'Missing "id" parameter', details: 'No ID provided in query.' },
//     { status: 400 }
//   );
// }
// try {
//   const html = getTempPage(id);
//   if (!html) {
//     return NextResponse.json(
//       { error: 'Page not found', details: 'No HTML found for the given ID.' },
//       { status: 404 }
//     );
//   }
//   const urlToAnalyze = `https://seuapp.vercel.app/api/preview/${id}`;
//   const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
//     urlToAnalyze,
//   )}&category=ACCESSIBILITY&category=SEO&strategy=desktop&key=${apiKey}`;
//   console.log('URL to analyze:', apiUrl)
//   const res = await fetch(apiUrl);
//   console.log(res)
//   const data = await res.json();
//   if (!res.ok) {
//     return NextResponse.json(
//       { error: 'Lighthouse API error', details: JSON.stringify(data) },
//       { status: 500 }
//     );
//   }
//   return NextResponse.json({ results: data }, { status: 200 });
// } catch (err: any) {
//   return NextResponse.json(
//     { error: 'Unexpected error', details: err.message },
//     { status: 500 }
//   );
// }
}
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__1cab43a7._.js.map
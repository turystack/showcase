import{j as e}from"./index-B7Ig6kNO.js";import{C as a}from"./CodeBlock-jMISp3qZ.js";import{P as t}from"./PropsTable-r9MRwph6.js";import"./highlight-XlOl9cwO.js";import"./copy-DmxgNTfX.js";function c(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"Dates and time"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"A calendar date is not an instant. Keeping the two apart is what removes the off-by-one-day bug for good."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"The day that moves"}),e.jsxs("p",{className:"text-muted-foreground",children:[e.jsx("code",{children:"z.coerce.date()"})," turns ",e.jsx("code",{children:"'2026-01-01'"})," into midnight UTC, which is 31 December in São Paulo. The birth date the user typed comes back a day earlier the moment it is formatted."]}),e.jsx(a,{code:`import { DateOnlySchema } from '@turystack/fields'

new Date('2026-01-01').toLocaleDateString('en-CA', {
  timeZone: 'America/Sao_Paulo',
})                                        // '2025-12-31'

DateOnlySchema().parse('2026-01-01')      // '2026-01-01'
DateOnlySchema().parse('28/02/2026')      // '2026-02-28'
DateOnlySchema().safeParse('2026-02-30')  // invalidDate`,filename:"date-only.ts",language:"ts"}),e.jsxs("p",{className:"text-muted-foreground",children:["The last line matters on its own: ",e.jsx("code",{children:"new Date('2026-02-30')"})," ","does not throw, it rolls over to 2 March."]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Schemas"}),e.jsx(t,{props:[{description:"Calendar date held as YYYY-MM-DD, never as a Date. Accepts ISO, DD/MM/YYYY and Date, and rejects dates the calendar does not have.",name:"DateOnlySchema",type:"(options?: DateOnlyOptions) => ZodType<string>"},{description:"Birth date with an age range measured in full years, so a birthday later this year does not count.",name:"BirthDateSchema",type:"(options?: BirthDateOptions) => ZodType<string>"},{description:"Instant returned as a Date. Refuses an ISO string with no offset, which means a different moment in every zone.",name:"DateTimeSchema",type:"(options?: DateTimeOptions) => ZodType<Date>"},{description:"Time of day as HH:mm with real hour and minute ranges — a loose regex accepts 25:99.",name:"TimeSchema",type:"(options?: TimeOptions) => ZodType<string>"}]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"The clock is injectable"}),e.jsxs("p",{className:"text-muted-foreground",children:["Every relative rule reads ",e.jsx("code",{children:"now"})," and ",e.jsx("code",{children:"timeZone"})," ","from options. Without that, a test written against"," ",e.jsx("code",{children:"new Date()"})," starts failing on a birthday."]}),e.jsx(a,{code:`import { BirthDateSchema, DateTimeSchema } from '@turystack/fields'

const now = () => new Date('2026-08-18T12:00:00Z')

BirthDateSchema({ minAge: 18, now }).safeParse('2008-08-19')  // ageTooLow
BirthDateSchema({ minAge: 18, now }).parse('2008-08-18')      // exactly 18 today

DateTimeSchema().safeParse('2026-01-01T10:00:00')       // missingTimezone
DateTimeSchema().parse('2026-01-01T10:00:00-03:00')     // Date`,filename:"clock.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Civil date helpers"}),e.jsx("p",{className:"text-muted-foreground",children:"The date arithmetic is exported on its own, for the places a schema is not what you need."}),e.jsx(a,{code:`import {
  civilOf,
  compareCivil,
  formatCivil,
  fullYearsBetween,
  isRealDate,
  parseCivil,
} from '@turystack/fields'

civilOf(new Date('2026-01-01T00:00:00Z'), 'America/Sao_Paulo')
// { year: 2025, month: 12, day: 31 }`,filename:"civil.ts",language:"ts"})]})]})}export{c as component};

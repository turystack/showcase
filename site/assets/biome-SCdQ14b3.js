import{j as e}from"./index-CQ2_D3U_.js";import{C as s}from"./CodeBlock-ftRQod4w.js";import"./highlight-C4-SKK4T.js";import"./copy-uXspHRur.js";function i(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"Biome preset"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"The backend lint + format ruleset — extend it from an app's biome.json and every API and handler formats the same way, NestJS decorators included."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Extending it"}),e.jsx(s,{code:`{
  "extends": ["@turystack/backend-config/biome"]
}`,filename:"biome.json",language:"json"}),e.jsxs("p",{className:"text-muted-foreground text-sm",children:["The package exports ./biome straight to its biome.json. The preset also sets"," ",e.jsx("code",{className:"text-lib",children:'"unsafeParameterDecoratorsEnabled": true'})," ","in the javascript parser — NestJS constructor injection parses without it erroring."]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Import organization"}),e.jsx("p",{className:"text-muted-foreground",children:"organizeImports runs with fixed groups, each separated by a blank line — external code first, then the app's own layers in dependency order:"}),e.jsx(s,{code:`"organizeImports": {
  "level": "on",
  "options": {
    "groups": [
      [":NODE:"],
      ":BLANK_LINE:",
      [":PACKAGE:", "!@turystack/**", "!@repo/**"],
      ":BLANK_LINE:",
      ["@turystack/**"],
      ":BLANK_LINE:",
      ["@repo/**"],
      ":BLANK_LINE:",
      ["@/database/**"],
      ":BLANK_LINE:",
      ["@/support/**"],
      ":BLANK_LINE:",
      ["@/adapters/**"],
      ":BLANK_LINE:",
      ["@/domains/**"],
      ":BLANK_LINE:",
      ["@/controllers/**"],
      ":BLANK_LINE:",
      ["@/exceptions", "@/env.schema"],
      ":BLANK_LINE:",
      [":PATH:"]
    ]
  }
}`,filename:"biome.json (preset)",language:"json"}),e.jsxs("p",{className:"text-muted-foreground text-sm",children:["Node builtins, external packages (with"," ",e.jsx("code",{className:"text-lib",children:"!@turystack/**"})," and"," ",e.jsx("code",{className:"text-lib",children:"!@repo/**"})," carved out into their own groups), then the internal layers:"," ",e.jsx("code",{className:"text-lib",children:"@/database"})," →"," ",e.jsx("code",{className:"text-lib",children:"@/support"})," →"," ",e.jsx("code",{className:"text-lib",children:"@/adapters"})," →"," ",e.jsx("code",{className:"text-lib",children:"@/domains"})," →"," ",e.jsx("code",{className:"text-lib",children:"@/controllers"})," →"," ",e.jsx("code",{className:"text-lib",children:"@/exceptions"})," +"," ",e.jsx("code",{className:"text-lib",children:"@/env.schema"}),", and relative paths last."]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Sorted keys — with exceptions"}),e.jsxs("p",{className:"text-muted-foreground",children:[e.jsx("code",{className:"text-lib",children:"useSortedKeys"})," and"," ",e.jsx("code",{className:"text-lib",children:"useSortedProperties"})," are"," ",e.jsx("code",{className:"text-lib",children:'"level": "on"'})," globally, then switched off where declaration order carries meaning:"]}),e.jsx(s,{code:`"overrides": [
  {
    "includes": ["**/*.json"],
    "assist": {
      "actions": {
        "source": {
          "useSortedKeys": { "level": "off", "options": {} },
          "useSortedProperties": { "level": "off", "options": {} }
        }
      }
    }
  },
  {
    "includes": [
      "**/*.schema.ts",
      "**/*.schemas.ts",
      "**/*.entity.ts",
      "**/*.types.ts"
    ],
    "assist": {
      "actions": {
        "source": {
          "useSortedKeys": { "level": "off", "options": {} },
          "useSortedProperties": { "level": "off", "options": {} }
        }
      }
    }
  }
]`,filename:"biome.json (preset)",language:"json"}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"Drizzle schemas mirror column order, entities mirror table shape, and type files read top-down — alphabetizing those would destroy information. Everywhere else, sorted keys kill diff noise."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Lint rules"}),e.jsxs("p",{className:"text-muted-foreground",children:["Biome's ",e.jsx("code",{className:"text-lib",children:"recommended"})," set, tuned for NestJS:"]}),e.jsx(s,{code:`"style": {
  "useBlockStatements": "error",
  "noNonNullAssertion": "warn"
},
"complexity": {
  "noStaticOnlyClass": "off",
  "noBannedTypes": "off"
},
"correctness": {
  "noUnusedFunctionParameters": "warn"
}`,filename:"biome.json (preset)",language:"json"}),e.jsxs("ul",{className:"space-y-2 text-muted-foreground",children:[e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsxs("span",{children:[e.jsx("code",{className:"text-lib",children:"noStaticOnlyClass"})," off — the DynamicModule register() pattern is a static-only class by design"]})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsxs("span",{children:[e.jsx("code",{className:"text-lib",children:"noNonNullAssertion"})," and"," ",e.jsx("code",{className:"text-lib",children:"noUnusedFunctionParameters"})," ","downgraded to warn — visible, not blocking"]})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsxs("span",{children:[e.jsx("code",{className:"text-lib",children:"useBlockStatements"})," as error — no braceless if/else"]})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"What it covers — and skips"}),e.jsx(s,{code:`"files": {
  "ignoreUnknown": false,
  "includes": [
    "**/src/**/*",
    "**/scripts/**/*",
    "**/vitest.config.ts",
    "**/vitest.e2e.config.ts",
    "**/drizzle.config.ts",
    "!**/dist",
    "!**/coverage*",
    "!**/drizzle"
  ]
}`,filename:"biome.json (preset)",language:"json"}),e.jsxs("p",{className:"text-muted-foreground text-sm",children:["src/, scripts/, the vitest configs, and drizzle.config.ts are checked; build output (",e.jsx("code",{className:"text-lib",children:"dist"}),"), coverage reports, and generated drizzle migrations (",e.jsx("code",{className:"text-lib",children:"drizzle/"}),") are excluded. Formatting matches the frontend preset: 2-space indent,"," ",e.jsx("code",{className:"text-lib",children:'"lineWidth": 80'}),","," ",e.jsx("code",{className:"text-lib",children:'"quoteStyle": "single"'}),","," ",e.jsx("code",{className:"text-lib",children:'"semicolons": "asNeeded"'}),","," ",e.jsx("code",{className:"text-lib",children:'"trailingCommas": "all"'}),", and"," ",e.jsx("code",{className:"text-lib",children:'"expand": "always"'}),"."]})]})]})}export{i as component};

# bdutfb

CLI tool that parses supplier beer invoices (PDF) and pushes pricing to Untappd for Business automatically.

## Why

Kegs during service had to be changed quite often for new ones. We then had to find the corresponding invoice, calculate the selling price based on the buying price (per liter), apply our margin and add it to our Untappd menu.
All this steps while serving clients led to slower service and pricing mistakes.

## How it works

1. Parses invoice PDF using `pdfdataextract.js`
2. Extracts draft beer lines via regex (name, brewery, price per liter)
3. Calculates half-pint/pint pricing with margin applied
4. Get items information from Untapdd API to get their IDs based on the name + brewery
5. Pushes items to Untappd for Business via their API (hidden "on deck" status, ready to activate)
6. Add brewery country flags along the beer's name

## Example

[Invoice PDF example](/docs/invoice_example.pdf)
![Console output](/docs/console.gif)

## Stack

Node.js, pdfdataextract.js, Untappd for Business API, Regex

## Usage

```
node index.js --file path/to/invoice.pdf
```

## Context

Used in production for 18+ months at CHILL N BEER / Beer District Libération (Nice).

# MediaBuyer Toolkit

A practical, open-source workspace for media buyers and performance marketers.

**Live app:** https://mediabuyer-toolkit-5f66sz.v2.appdeploy.ai/

MediaBuyer Toolkit brings everyday campaign calculations and planning utilities into one responsive browser-based interface. The current release is designed for manual campaign-data entry and does not require access to advertising accounts.

## Features

- **Campaign metrics calculator** — calculate CTR, CPC, CPM, CPA and ROAS from spend, impressions, clicks, conversions and revenue.
- **Budget planner** — allocate a monthly budget across Meta Ads, Google Ads and TikTok Ads, with estimated daily pacing.
- **Profit calculator** — estimate contribution per order, break-even CPA, actual CPA, net profit and profit margin.
- **UTM builder** — create campaign URLs with source, medium, campaign and content parameters.
- **Campaign analyzer** — view directional performance signals based on the entered campaign metrics.
- **Responsive interface** — desktop and mobile layouts, with dark and light themes.

## Getting started

### Requirements

- Node.js 20 or later
- npm

### Install and run locally

```bash
git clone https://github.com/Mohammad-ui-lab/mediabuyer-toolkit.git
cd mediabuyer-toolkit
npm install
npm run dev
```

Vite prints the local development URL in the terminal.

### Production build

```bash
npm run build
npm run preview
```

The production build is generated in the `dist/` directory.

## Metric definitions

| Metric | Formula |
| --- | --- |
| CTR | Link clicks ÷ impressions × 100 |
| CPC | Ad spend ÷ link clicks |
| CPM | Ad spend ÷ impressions × 1,000 |
| CPA | Ad spend ÷ conversions |
| ROAS | Conversion revenue ÷ ad spend |

The profit calculator uses selling price minus product and other per-order costs to estimate contribution per order. Estimated net profit is contribution per order multiplied by conversions, minus ad spend.

## Important notes

- All calculations run in the browser. The current app has no backend, database, account login or advertising-platform connection.
- Campaign values are entered manually; Meta Ads, Google Ads and TikTok Ads API integrations are not included in this release.
- The analyzer uses simple directional thresholds, not universal industry benchmarks. Interpret its signals in the context of campaign objective, attribution settings, industry and funnel.
- Budget daily pacing is estimated using a 30-day month.
- The UTM builder starts with an example URL. Replace it with the actual landing page before using the generated link.

## Project structure

```text
.
├── index.html
├── src/
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── tests/
│   └── tests.json
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Contributing

Contributions, bug reports and practical feature ideas are welcome.

1. Fork the repository.
2. Create a focused branch for your change.
3. Run `npm run build` and check the affected tool manually.
4. Open a pull request describing the problem and the proposed change.

Please avoid including real client names, customer data, advertising account identifiers or API secrets in issues, pull requests or screenshots.

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.

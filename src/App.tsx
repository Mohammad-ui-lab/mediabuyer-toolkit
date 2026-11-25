import { useMemo, useState } from 'react';
import {
  Activity,
  BarChart3,
  Calculator,
  Check,
  ChevronRight,
  Clipboard,
  DollarSign,
  Globe,
  LayoutDashboard,
  Menu,
  Moon,
  Sun,
  Target,
  TrendingUp,
  Wallet,
} from 'lucide-react';

type Tab = 'overview' | 'metrics' | 'budget' | 'profit' | 'utm' | 'analyzer';

const amount = (n: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(Number.isFinite(n) ? n : 0);

const numeric = (value: string) => Math.max(0, Number(value) || 0);

function App() {
  const [tab, setTab] = useState<Tab>('overview');
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const [spend, setSpend] = useState('1200');
  const [impressions, setImpressions] = useState('85000');
  const [clicks, setClicks] = useState('2100');
  const [conversions, setConversions] = useState('42');
  const [revenue, setRevenue] = useState('4800');

  const [monthlyBudget, setMonthlyBudget] = useState('3000');
  const [metaShare, setMetaShare] = useState('60');
  const [googleShare, setGoogleShare] = useState('30');
  const [tiktokShare, setTiktokShare] = useState('10');

  const [sellingPrice, setSellingPrice] = useState('120');
  const [productCost, setProductCost] = useState('45');
  const [otherCost, setOtherCost] = useState('8');

  const [landingPage, setLandingPage] = useState('https://example.com/');
  const [utmSource, setUtmSource] = useState('facebook');
  const [utmMedium, setUtmMedium] = useState('paid_social');
  const [utmCampaign, setUtmCampaign] = useState('summer_sale');
  const [utmContent, setUtmContent] = useState('video_a');
  const [copyMessage, setCopyMessage] = useState('');

  const spendValue = numeric(spend);
  const impressionsValue = numeric(impressions);
  const clicksValue = numeric(clicks);
  const conversionsValue = numeric(conversions);
  const revenueValue = numeric(revenue);

  const ctr = impressionsValue ? (clicksValue / impressionsValue) * 100 : 0;
  const cpc = clicksValue ? spendValue / clicksValue : 0;
  const cpm = impressionsValue ? (spendValue / impressionsValue) * 1000 : 0;
  const cpa = conversionsValue ? spendValue / conversionsValue : 0;
  const roas = spendValue ? revenueValue / spendValue : 0;

  const contribution =
    numeric(sellingPrice) - numeric(productCost) - numeric(otherCost);
  const netProfit = contribution * conversionsValue - spendValue;
  const profitMargin = revenueValue ? (netProfit / revenueValue) * 100 : 0;

  const generatedUrl = useMemo(() => {
    const base = landingPage.trim() || 'https://example.com/';
    try {
      const url = new URL(base);
      const values: Record<string, string> = {
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
        utm_content: utmContent,
      };
      Object.entries(values).forEach(([key, value]) => {
        if (value.trim()) url.searchParams.set(key, value.trim());
      });
      return url.toString();
    } catch {
      return 'Enter a valid website URL to generate a tracking link.';
    }
  }, [landingPage, utmSource, utmMedium, utmCampaign, utmContent]);

  const navigation = [
    {
      id: 'overview' as Tab,
      label: 'Overview',
      icon: LayoutDashboard,
      group: 'WORKSPACE',
    },
    {
      id: 'metrics' as Tab,
      label: 'Metrics calculator',
      icon: Calculator,
      group: 'WORKSPACE',
    },
    {
      id: 'budget' as Tab,
      label: 'Budget planner',
      icon: Wallet,
      group: 'PLANNING',
    },
    {
      id: 'profit' as Tab,
      label: 'Profit calculator',
      icon: DollarSign,
      group: 'PLANNING',
    },
    { id: 'utm' as Tab, label: 'UTM builder', icon: Globe, group: 'TOOLS' },
    {
      id: 'analyzer' as Tab,
      label: 'Campaign analyzer',
      icon: Activity,
      group: 'TOOLS',
    },
  ];

  const activeLabel =
    navigation.find(item => item.id === tab)?.label || 'Overview';

  const navigate = (nextTab: Tab) => {
    setTab(nextTab);
    setMenuOpen(false);
    setCopyMessage('');
  };

  const Field = ({
    label,
    value,
    onChange,
    prefix,
    suffix,
    type = 'number',
  }: {
    label: string;
    value: string;
    onChange: (next: string) => void;
    prefix?: string;
    suffix?: string;
    type?: string;
  }) => (
    <label className="field">
      <span>{label}</span>
      <div className="field-control">
        {prefix && <b>{prefix}</b>}
        <input
          type={type}
          min={type === 'number' ? '0' : undefined}
          value={value}
          onChange={event => onChange(event.target.value)}
        />
        {suffix && <b>{suffix}</b>}
      </div>
    </label>
  );

  const Panel = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <section className="panel">
      <div className="panel-heading">
        <h3>{title}</h3>
      </div>
      {children}
    </section>
  );

  const MetricRow = ({
    label,
    value,
    formula,
  }: {
    label: string;
    value: string;
    formula: string;
  }) => (
    <div className="metric-row">
      <div>
        <b>{label}</b>
        <small>{formula}</small>
      </div>
      <strong>{value}</strong>
    </div>
  );

  const copyUrl = async () => {    if (!generatedUrl.startsWith('http')) {
      setCopyMessage('Enter a valid website URL first.');
      return;
    }
    try {
      await navigator.clipboard.writeText(generatedUrl);
      setCopyMessage('Copied to clipboard');
    } catch {
      setCopyMessage('Clipboard access is unavailable in this browser.');
    }
  };

  return (
    <div className={dark ? 'app-shell dark' : 'app-shell light'}>
      <aside className={menuOpen ? 'sidebar sidebar-open' : 'sidebar'}>
        <div className="brand">
          <div className="brand-mark">
            <Target size={21} />
          </div>
          <div>
            <b>MediaBuyer</b>
            <small>TOOLKIT · OPEN SOURCE</small>
          </div>
        </div>

        {['WORKSPACE', 'PLANNING', 'TOOLS'].map(group => (
          <div className="nav-group" key={group}>
            <small className="nav-label">{group}</small>
            {navigation
              .filter(item => item.group === group)
              .map(item => (
                <button
                  key={item.id}
                  className={
                    tab === item.id ? 'nav-item nav-active' : 'nav-item'
                  }
                  onClick={() => navigate(item.id)}
                >
                  <item.icon size={17} />
                  <span>{item.label}</span>
                  {tab === item.id && (
                    <ChevronRight className="nav-chevron" size={15} />
                  )}
                </button>
              ))}
          </div>
        ))}

        <div className="sidebar-footer">
          <b>Built for marketers</b>
          <small>Free · Open · Community-led</small>
          <span>VERSION 1.0.0</span>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <button
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <Menu size={19} />
          </button>
          <div className="breadcrumb">
            Toolkit <span>/</span> <b>{activeLabel}</b>
          </div>
          <div className="topbar-actions">
            <small>
              <i /> Calculations run locally
            </small>
            <button
              className="theme-button"
              onClick={() => setDark(!dark)}
              aria-label="Toggle theme"
            >
              {dark ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <div className="avatar">MB</div>
          </div>
        </header>

        <div className="content">
          <div className="page-heading">
            <div>
              <small>PERFORMANCE WORKSPACE / 2026</small>
              <h1>
                {tab === 'overview' ? 'Make every click count.' : activeLabel}
              </h1>
              <p>
                {tab === 'overview'
                  ? 'Your practical workspace for smarter media buying decisions.'
                  : 'Calculate, plan and optimize your advertising performance.'}
              </p>
            </div>
            <span className="workspace-badge">
              <i /> LIVE WORKSPACE
            </span>
          </div>

          {tab === 'overview' && (
            <>
              <section className="hero">
                <div className="hero-copy">
                  <small>✦ THE MEDIA BUYER'S EDGE</small>
                  <h2>
                    Less guesswork.
                    <br />
                    <em>More growth.</em>
                  </h2>
                  <p>
                    From campaign metrics to budget allocation, get the numbers
                    you need to make confident decisions.
                  </p>
                  <button
                    className="primary-button"
                    onClick={() => navigate('metrics')}
                  >
                    Calculate campaign metrics <ChevronRight size={16} />
                  </button>
                </div>
                <div className="hero-art">
                  <div className="hero-orbit">
                    <TrendingUp size={43} />
                  </div>
                  <div className="floating-card card-one">
                    <small>ROAS</small>
                    <b>4.2x</b>
                    <i>↗ +18.4%</i>
                  </div>
                  <div className="floating-card card-two">
                    <small>CPA</small>
                    <b>$12.40</b>
                    <i>↘ -8.2%</i>
                  </div>
                </div>
              </section>

              <div className="section-heading">
                <div>
                  <h3>Quick tools</h3>
                  <p>Everything you need, one workspace.</p>
                </div>
                <small>6 TOOLS AVAILABLE</small>
              </div>

              <div className="tool-grid">
                {navigation
                  .filter(item => item.id !== 'overview')
                  .map((item, index) => (
                    <button
                      className="tool-card"
                      key={item.id}
                      onClick={() => navigate(item.id)}
                    >
                      <div className={'tool-icon icon-' + index}>
                        <item.icon size={20} />
                      </div>
                      <div className="tool-copy">
                        <b>{item.label}</b>
                        <p>
                          {
                            [
                              'CTR, CPC, CPM, CPA and ROAS',
                              'Split spend across ad platforms',
                              'Understand unit economics and net profit',
                              'Create consistent tracking URLs',
                              'Turn campaign data into actionable signals',
                            ][index]
                          }
                        </p>
                      </div>
                      <ChevronRight size={16} />
                    </button>
                  ))}
              </div>

              <div className="privacy-note">
                <Check size={18} />
                <div>
                  <b>Your data stays yours.</b>
                  <p>
                    Calculations run in your browser. No ad account connection,
                    no tracking, and no data sent to a server.
                  </p>
                </div>
              </div>
            </>
          )}

          {tab === 'metrics' && (
            <>
              <div className="intro">
                <h2>Know your numbers.</h2>
                <p>Enter campaign data to calculate the metrics that matter.</p>
              </div>
              <div className="two-columns">
                <Panel title="Campaign inputs">
                  <div className="field-grid">
                    <Field                      label="Amount spent"
                      value={spend}
                      onChange={setSpend}
                      prefix="$"
                    />
                    <Field
                      label="Impressions"
                      value={impressions}
                      onChange={setImpressions}
                    />
                    <Field
                      label="Link clicks"
                      value={clicks}
                      onChange={setClicks}
                    />
                    <Field
                      label="Conversions"
                      value={conversions}
                      onChange={setConversions}
                    />
                    <Field
                      label="Revenue"
                      value={revenue}
                      onChange={setRevenue}
                      prefix="$"
                    />
                  </div>
                </Panel>
                <Panel title="Calculated metrics">
                  <MetricRow
                    label="CTR"
                    value={ctr.toFixed(2) + '%'}
                    formula="Clicks ÷ impressions"
                  />
                  <MetricRow
                    label="CPC"
                    value={amount(cpc)}
                    formula="Spend ÷ clicks"
                  />
                  <MetricRow
                    label="CPM"
                    value={amount(cpm)}
                    formula="Spend ÷ impressions × 1,000"
                  />
                  <MetricRow
                    label="CPA"
                    value={amount(cpa)}
                    formula="Spend ÷ conversions"
                  />
                  <MetricRow
                    label="ROAS"
                    value={roas.toFixed(2) + 'x'}
                    formula="Revenue ÷ spend"
                  />
                  <p className="helper-text">
                    Metrics update automatically as you edit inputs. Zero values
                    are handled safely.
                  </p>
                </Panel>
              </div>
            </>
          )}

          {tab === 'budget' && (
            <>
              <div className="intro">
                <h2>Put your budget to work.</h2>
                <p>
                  Allocate spend across platforms and review monthly and daily
                  pacing.
                </p>
              </div>
              <div className="two-columns">
                <Panel title="Monthly budget">
                  <Field
                    label="Total monthly budget"
                    value={monthlyBudget}
                    onChange={setMonthlyBudget}
                    prefix="$"
                  />
                  <div className="slider-list">
                    {[
                      {
                        label: 'Meta Ads',
                        value: metaShare,
                        set: setMetaShare,
                      },
                      {
                        label: 'Google Ads',
                        value: googleShare,
                        set: setGoogleShare,
                      },
                      {
                        label: 'TikTok Ads',
                        value: tiktokShare,
                        set: setTiktokShare,
                      },
                    ].map(item => (
                      <label className="slider-field" key={item.label}>
                        <span>
                          {item.label}
                          <b>{item.value}%</b>
                        </span>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={item.value}
                          onChange={event => item.set(event.target.value)}
                        />
                      </label>
                    ))}
                  </div>
                </Panel>
                <Panel title="Allocation breakdown">
                  <div className="budget-total">
                    <small>Planned monthly spend</small>
                    <strong>{amount(numeric(monthlyBudget))}</strong>
                    <small>
                      {numeric(metaShare) +
                        numeric(googleShare) +
                        numeric(tiktokShare)}
                      % allocated
                    </small>
                  </div>
                  {[
                    { label: 'Meta Ads', share: metaShare },
                    { label: 'Google Ads', share: googleShare },
                    { label: 'TikTok Ads', share: tiktokShare },
                  ].map(item => {
                    const allocation =
                      (numeric(monthlyBudget) * numeric(item.share)) / 100;
                    return (
                      <div className="allocation-row" key={item.label}>
                        <div>
                          <b>{item.label}</b>
                          <strong>{amount(allocation)}</strong>
                        </div>
                        <div className="progress-track">
                          <i
                            style={{
                              width: Math.min(100, numeric(item.share)) + '%',
                            }}
                          />
                        </div>
                        <small>{amount(allocation / 30)} / day</small>
                      </div>
                    );
                  })}
                  <p className="helper-text">
                    {numeric(metaShare) +
                      numeric(googleShare) +
                      numeric(tiktokShare) ===
                    100
                      ? '✓ Your budget is fully allocated.'
                      : Math.abs(
                          100 -
                            numeric(metaShare) -
                            numeric(googleShare) -
                            numeric(tiktokShare)
                        ) +
                        '% ' +
                        (numeric(metaShare) +
                          numeric(googleShare) +
                          numeric(tiktokShare) >
                        100
                          ? 'overallocated.'
                          : 'unallocated.')}
                  </p>
                </Panel>
              </div>
            </>
          )}

          {tab === 'profit' && (
            <>
              <div className="intro">
                <h2>Profit beyond ROAS.</h2>
                <p>
                  Understand contribution margin and the real cost of acquiring
                  a customer.
                </p>
              </div>
              <div className="two-columns">
                <Panel title="Product economics">
                  <div className="field-grid">
                    <Field
                      label="Selling price"
                      value={sellingPrice}
                      onChange={setSellingPrice}
                      prefix="$"
                    />
                    <Field
                      label="Product cost"
                      value={productCost}
                      onChange={setProductCost}
                      prefix="$"
                    />
                    <Field
                      label="Fulfillment / other cost"                      value={otherCost}
                      onChange={setOtherCost}
                      prefix="$"
                    />
                    <Field
                      label="Number of conversions"
                      value={conversions}
                      onChange={setConversions}
                    />
                    <Field
                      label="Total ad spend"
                      value={spend}
                      onChange={setSpend}
                      prefix="$"
                    />
                  </div>
                </Panel>
                <Panel title="Profit snapshot">
                  <div className="profit-highlight">
                    <small>Net profit after ad spend</small>
                    <strong
                      className={netProfit >= 0 ? 'positive' : 'negative'}
                    >
                      {amount(netProfit)}
                    </strong>
                    <small>Based on {conversionsValue} conversions</small>
                  </div>
                  <MetricRow
                    label="Contribution / order"
                    value={amount(contribution)}
                    formula="Price − product − other costs"
                  />
                  <MetricRow
                    label="Break-even CPA"
                    value={amount(contribution)}
                    formula="Maximum acquisition cost before ad spend"
                  />
                  <MetricRow
                    label="Actual CPA"
                    value={amount(cpa)}
                    formula="Ad spend ÷ conversions"
                  />
                  <MetricRow
                    label="Profit margin"
                    value={profitMargin.toFixed(1) + '%'}
                    formula="Net profit ÷ revenue"
                  />
                </Panel>
              </div>
            </>
          )}

          {tab === 'utm' && (
            <>
              <div className="intro">
                <h2>Every click has a source.</h2>
                <p>Build clean, consistent UTM links for your campaigns.</p>
              </div>
              <Panel title="Campaign URL builder">
                <div className="field-grid">
                  <Field
                    label="Website URL"
                    value={landingPage}
                    onChange={setLandingPage}
                    type="url"
                  />
                  <Field
                    label="Campaign source · utm_source"
                    value={utmSource}
                    onChange={setUtmSource}
                    type="text"
                  />
                  <Field
                    label="Campaign medium · utm_medium"
                    value={utmMedium}
                    onChange={setUtmMedium}
                    type="text"
                  />
                  <Field
                    label="Campaign name · utm_campaign"
                    value={utmCampaign}
                    onChange={setUtmCampaign}
                    type="text"
                  />
                  <Field
                    label="Ad content · utm_content"
                    value={utmContent}
                    onChange={setUtmContent}
                    type="text"
                  />
                </div>
                <div className="url-output">
                  <small>GENERATED URL</small>
                  <p>{generatedUrl}</p>
                  <button className="primary-button" onClick={copyUrl}>
                    <Clipboard size={16} /> Copy URL
                  </button>
                </div>
                {copyMessage && <p className="helper-text">{copyMessage}</p>}
              </Panel>
            </>
          )}

          {tab === 'analyzer' && (
            <>
              <div className="intro">
                <h2>Read between the metrics.</h2>
                <p>A quick diagnostic based on the campaign inputs below.</p>
              </div>
              <div className="two-columns">
                <Panel title="Campaign data">
                  <div className="field-grid">
                    <Field
                      label="Amount spent"
                      value={spend}
                      onChange={setSpend}
                      prefix="$"
                    />
                    <Field
                      label="Impressions"
                      value={impressions}
                      onChange={setImpressions}
                    />
                    <Field
                      label="Link clicks"
                      value={clicks}
                      onChange={setClicks}
                    />
                    <Field
                      label="Conversions"
                      value={conversions}
                      onChange={setConversions}
                    />
                    <Field
                      label="Revenue"
                      value={revenue}
                      onChange={setRevenue}
                      prefix="$"
                    />
                  </div>
                </Panel>
                <Panel title="Performance signals">
                  {impressionsValue === 0 || clicksValue === 0 ? (
                    <div className="signal">
                      <b>Campaign data needed</b>
                      <p>Enter impressions and clicks to start the analysis.</p>
                    </div>
                  ) : (
                    <>
                      <div className="signal">
                        <b>
                          {ctr >= 1.5
                            ? 'Healthy click-through rate'
                            : 'Review creative or audience'}
                        </b>
                        <p>
                          CTR is {ctr.toFixed(2)}%.{' '}
                          {ctr >= 1.5
                            ? 'Your ad is generating engagement.'
                            : 'Test new hooks, creatives and audience-message fit.'}
                        </p>
                      </div>
                      <div className="signal">
                        <b>
                          {roas >= 3
                            ? 'Strong return'
                            : 'Review conversion economics'}
                        </b>
                        <p>
                          ROAS is {roas.toFixed(2)}x.{' '}
                          {roas >= 3
                            ? 'Revenue is at least three times ad spend.'
                            : 'Compare with break-even ROAS and improve conversion value.'}
                        </p>
                      </div>
                      <div className="signal">
                        <b>Acquisition cost</b>
                        <p>
                          {conversionsValue
                            ? 'CPA is ' +
                              amount(cpa) +
                              '. Compare it with your allowable CPA.'
                            : 'Add conversions to calculate CPA.'}
                        </p>
                      </div>
                    </>
                  )}
                  <p className="helper-text">
                    Directional signals only. Benchmarks vary by industry,
                    objective, attribution window and campaign maturity.
                  </p>
                </Panel>
              </div>
            </>
          )}

          <footer>
            MEDIABUYER TOOLKIT · VERSION 1.0.0{' '}
            <span>OPEN SOURCE · BUILT FOR PERFORMANCE MARKETERS</span>
          </footer>        </div>
      </main>
    </div>
  );
}

export default App;

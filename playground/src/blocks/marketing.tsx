import { Button, Card, Input, Statistic, Tag, Typography, Avatar, Space } from '@arco-design/web-react';
import {
  IconArrowRight,
  IconThunderbolt,
  IconSafe,
  IconSync,
  IconDashboard,
  IconUserGroup,
  IconCommon,
  IconCheckCircleFill,
} from '@arco-design/web-react/icon';

const { Title, Paragraph, Text } = Typography;

export function Navbar() {
  return (
    <header className="pg-nav">
      <div className="pg-container pg-nav-inner">
        <a className="pg-brand" href="#top">
          <span className="pg-brand-mark">H</span>
          Halden
        </a>
        <nav className="pg-nav-links">
          <a href="#features">Features</a>
          <a href="#product">Product</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
        </nav>
        <Space>
          <Button type="text">Sign in</Button>
          <Button type="primary">Start free</Button>
        </Space>
      </div>
    </header>
  );
}

export function Hero() {
  return (
    <section className="pg-hero" id="top">
      <div className="pg-container pg-hero-inner">
        <Tag className="pg-pill" bordered>
          <IconThunderbolt /> New: recurring invoices in 30 currencies
        </Tag>
        <Title heading={1} className="pg-hero-title">
          Get paid on time, every time
        </Title>
        <Paragraph className="pg-hero-lead" type="secondary">
          Halden sends the invoice, chases the late ones and reconciles the payment, so a five-person studio
          spends Friday on the work instead of the bank feed.
        </Paragraph>
        <div className="pg-hero-form">
          <Input size="large" placeholder="you@studio.com" aria-label="Work email" />
          <Button type="primary" size="large">
            Start free <IconArrowRight />
          </Button>
        </div>
        <Space size={20} className="pg-hero-checks" wrap>
          {['14 days free', 'No card needed', 'Cancel any time'].map((t) => (
            <Text key={t} type="secondary">
              <IconCheckCircleFill className="pg-check" /> {t}
            </Text>
          ))}
        </Space>
        <div className="pg-hero-proof">
          <Avatar.Group size={32} maxCount={4}>
            {['#f97316', '#0ea5e9', '#8b5cf6', '#10b981', '#ef4444'].map((c, i) => (
              <Avatar key={c} style={{ backgroundColor: c }}>
                {'MKJAL'[i]}
              </Avatar>
            ))}
          </Avatar.Group>
          <Text type="secondary">Trusted by 2,400 studios in 41 countries</Text>
        </div>
      </div>
    </section>
  );
}

export function Logos() {
  return (
    <section className="pg-logos">
      <div className="pg-container">
        <Text type="secondary" className="pg-logos-label">
          Studios that send their invoices with Halden
        </Text>
        <div className="pg-logos-row">
          {['Fieldwork', 'Oak & Ivy', 'North Pier', 'Saltmarsh', 'Kiln', 'Paper Moon'].map((n) => (
            <span key={n} className="pg-logo">
              {n}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

const features = [
  { icon: <IconThunderbolt />, title: 'Invoices in a minute', body: 'Start from the last one, change the hours, send. Halden fills the rest.' },
  { icon: <IconSync />, title: 'Reminders that sound like you', body: 'Polite on day one, firmer on day ten, written in your words, never sent twice.' },
  { icon: <IconSafe />, title: 'Paid by card or transfer', body: 'Every invoice carries a payment link; the money lands and the invoice closes itself.' },
  { icon: <IconDashboard />, title: 'Cash flow you can read', body: 'What is owed, what is late and what next month looks like, on one page.' },
  { icon: <IconUserGroup />, title: 'The whole team, one ledger', body: 'Producers draft, the founder approves, the accountant sees everything.' },
  { icon: <IconCommon />, title: '30 currencies, local tax', body: 'VAT, GST and sales tax worked out per client, at the rate on the day.' },
];

export function Features() {
  return (
    <section className="pg-section" id="features">
      <div className="pg-container">
        <div className="pg-heading">
          <Tag color="arcoblue">Features</Tag>
          <Title heading={2}>Everything between the work and the money</Title>
          <Paragraph type="secondary">Six things Halden does so you do not have to.</Paragraph>
        </div>
        <div className="pg-grid-3">
          {features.map((f) => (
            <Card key={f.title} bordered hoverable className="pg-feature">
              <div className="pg-feature-icon">{f.icon}</div>
              <Title heading={6}>{f.title}</Title>
              <Paragraph type="secondary" className="pg-tight">
                {f.body}
              </Paragraph>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Stats() {
  return (
    <section className="pg-section pg-section-tight">
      <div className="pg-container">
        <Card bordered className="pg-stats">
          <Statistic title="Invoices sent" value={1284000} groupSeparator />
          <Statistic title="Paid within 14 days" value={92} suffix="%" />
          <Statistic title="Hours saved a month" value={11.5} precision={1} />
          <Statistic title="Average rating" value={4.9} precision={1} suffix="/ 5" />
        </Card>
      </div>
    </section>
  );
}

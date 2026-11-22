import { useState } from 'react';
import { Avatar, Button, Card, Collapse, Divider, Input, Rate, Switch, Tag, Typography } from '@arco-design/web-react';
import { IconCheck } from '@arco-design/web-react/icon';

const { Title, Paragraph, Text } = Typography;

const plans = [
  { name: 'Solo', monthly: 9, blurb: 'For one person and a handful of clients.', items: ['20 invoices a month', 'Card and bank payments', 'Email reminders'] },
  { name: 'Studio', monthly: 29, blurb: 'For a small team that bills every week.', items: ['Unlimited invoices', 'Recurring invoices', '5 team seats', 'Cash-flow forecast'], popular: true },
  { name: 'Agency', monthly: 79, blurb: 'For several teams and an accountant.', items: ['Everything in Studio', 'Unlimited seats', 'Approvals', 'Priority support'] },
];

export function Pricing() {
  const [yearly, setYearly] = useState(true);
  return (
    <section className="pg-section" id="pricing">
      <div className="pg-container">
        <div className="pg-heading">
          <Title heading={2}>Simple pricing</Title>
          <Paragraph type="secondary">Every plan has every payment method. Pay yearly and get two months free.</Paragraph>
          <div className="pg-billing">
            <Text type={yearly ? 'secondary' : undefined}>Monthly</Text>
            <Switch checked={yearly} onChange={setYearly} aria-label="Bill yearly" />
            <Text type={yearly ? undefined : 'secondary'}>Yearly</Text>
            <Tag color="green" size="small">
              Save 17%
            </Tag>
          </div>
        </div>
        <div className="pg-grid-3 pg-pricing">
          {plans.map((p) => {
            const price = yearly ? Math.round((p.monthly * 10) / 12) : p.monthly;
            return (
              <Card key={p.name} bordered className={p.popular ? 'pg-plan pg-plan-popular' : 'pg-plan'}>
                <div className="pg-plan-head">
                  <Title heading={5} className="pg-tight">
                    {p.name}
                  </Title>
                  {p.popular && <Tag color="arcoblue">Most popular</Tag>}
                </div>
                <Paragraph type="secondary">{p.blurb}</Paragraph>
                <div className="pg-price">
                  <span className="pg-price-value">${price}</span>
                  <Text type="secondary">/ month</Text>
                </div>
                <Button long type={p.popular ? 'primary' : 'outline'} size="large">
                  Choose {p.name}
                </Button>
                <Divider />
                <ul className="pg-list">
                  {p.items.map((i) => (
                    <li key={i}>
                      <IconCheck className="pg-check" /> {i}
                    </li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const quotes = [
  { name: 'Maya Lindqvist', role: 'Founder, Fieldwork', color: '#f97316', text: 'Late invoices went from a third to almost none. The reminders do the awkward part for us.' },
  { name: 'Kofi Mensah', role: 'Producer, North Pier', color: '#0ea5e9', text: 'I draft, Ana approves from her phone, the client pays from the email. That used to be a week.' },
  { name: 'Jun Watanabe', role: 'Partner, Kiln', color: '#8b5cf6', text: 'Our accountant logs in and finds everything reconciled. She asked what we had changed.' },
];

export function Testimonials() {
  return (
    <section className="pg-section pg-muted">
      <div className="pg-container">
        <div className="pg-heading">
          <Title heading={2}>Studios that stopped chasing</Title>
        </div>
        <div className="pg-grid-3">
          {quotes.map((q) => (
            <Card key={q.name} bordered>
              <Rate readonly defaultValue={5} className="pg-rate" />
              <Paragraph className="pg-quote">“{q.text}”</Paragraph>
              <div className="pg-person">
                <Avatar size={36} style={{ backgroundColor: q.color }}>
                  {q.name[0]}
                </Avatar>
                <div>
                  <Text bold>{q.name}</Text>
                  <br />
                  <Text type="secondary" className="pg-small">
                    {q.role}
                  </Text>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

const faqs = [
  ['Can my clients pay without an account?', 'Yes. Every invoice has a payment page; they pay by card, Apple Pay or bank transfer without signing up.'],
  ['What happens when a payment arrives?', 'Halden matches it to the invoice, marks it paid, thanks the client and stops the reminders.'],
  ['Do you handle VAT and sales tax?', 'Halden works out the rate per client and country, shows it on the invoice and totals it for your return.'],
  ['Can I bring my old invoices?', 'Import a CSV from your current tool and keep your numbering; your clients see no gap.'],
];

export function Faq() {
  return (
    <section className="pg-section" id="faq">
      <div className="pg-container pg-narrow">
        <div className="pg-heading">
          <Title heading={2}>Questions</Title>
        </div>
        <Collapse defaultActiveKey={['0']} expandIconPosition="right" bordered>
          {faqs.map(([q, a], i) => (
            <Collapse.Item key={i} name={String(i)} header={q}>
              <Paragraph type="secondary" className="pg-tight">
                {a}
              </Paragraph>
            </Collapse.Item>
          ))}
        </Collapse>
      </div>
    </section>
  );
}

export function Cta() {
  return (
    <section className="pg-section pg-section-tight">
      <div className="pg-container">
        <div className="pg-cta">
          <div>
            <Title heading={3} className="pg-tight">
              Send your next invoice with Halden
            </Title>
            <Paragraph type="secondary" className="pg-tight">
              Fourteen days free. Bring your clients; we bring the reminders.
            </Paragraph>
          </div>
          <div className="pg-cta-form">
            <Input placeholder="you@studio.com" aria-label="Work email" />
            <Button type="primary">Start free</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const cols = {
    Product: ['Invoices', 'Reminders', 'Payments', 'Forecast'],
    Company: ['About', 'Careers', 'Press'],
    Help: ['Guides', 'Status', 'Contact'],
  };
  return (
    <footer className="pg-footer">
      <div className="pg-container pg-footer-inner">
        <div>
          <a className="pg-brand" href="#top">
            <span className="pg-brand-mark">H</span>
            Halden
          </a>
          <Paragraph type="secondary" className="pg-small pg-footer-blurb">
            Invoicing and cash flow for small studios.
          </Paragraph>
        </div>
        {Object.entries(cols).map(([title, links]) => (
          <div key={title}>
            <Text bold>{title}</Text>
            <ul className="pg-footer-links">
              {links.map((l) => (
                <li key={l}>
                  <a href="#top">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="pg-container">
        <Divider />
        <Text type="secondary" className="pg-small">
          A demo page for the Arco presets. Halden and its customers are made up.
        </Text>
      </div>
    </footer>
  );
}

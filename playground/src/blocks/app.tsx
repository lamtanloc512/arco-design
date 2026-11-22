import { useState } from 'react';
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  DatePicker,
  Divider,
  Dropdown,
  Form,
  Input,
  InputNumber,
  InputTag,
  Menu,
  Message,
  Modal,
  Notification,
  Popconfirm,
  Progress,
  Radio,
  Select,
  Slider,
  Space,
  Switch,
  Table,
  Tabs,
  Tag,
  Tooltip,
  Typography,
} from '@arco-design/web-react';
import {
  IconPlus,
  IconSearch,
  IconDownload,
  IconMore,
  IconArrowRise,
  IconArrowFall,
  IconGithub,
  IconGoogle,
  IconDelete,
} from '@arco-design/web-react/icon';

const { Title, Text, Paragraph } = Typography;

const kpis = [
  { label: 'Outstanding', value: '$48,210', delta: '+12.4%', up: true, hint: 'across 37 invoices' },
  { label: 'Paid this month', value: '$126,900', delta: '+8.1%', up: true, hint: 'vs. October' },
  { label: 'Overdue', value: '$6,340', delta: '-21.0%', up: false, hint: '5 invoices, 2 clients' },
  { label: 'Days to get paid', value: '9.2', delta: '-1.6 d', up: false, hint: 'median, last 90 days' },
];

const statusColor: Record<string, string> = { Paid: 'green', Sent: 'arcoblue', Overdue: 'red', Draft: 'gray' };

const rows = [
  { key: '1', no: 'INV-2041', client: 'Fieldwork', color: '#f97316', due: 'Nov 28', amount: 4200, status: 'Sent' },
  { key: '2', no: 'INV-2040', client: 'North Pier', color: '#0ea5e9', due: 'Nov 20', amount: 12800, status: 'Paid' },
  { key: '3', no: 'INV-2039', client: 'Oak & Ivy', color: '#10b981', due: 'Nov 12', amount: 2350, status: 'Overdue' },
  { key: '4', no: 'INV-2038', client: 'Saltmarsh', color: '#8b5cf6', due: 'Dec 02', amount: 7600, status: 'Draft' },
  { key: '5', no: 'INV-2037', client: 'Kiln', color: '#ef4444', due: 'Nov 09', amount: 9150, status: 'Paid' },
];

const columns = [
  { title: 'Invoice', dataIndex: 'no', render: (v: string) => <Text bold>{v}</Text> },
  {
    title: 'Client',
    dataIndex: 'client',
    render: (v: string, r: (typeof rows)[number]) => (
      <Space>
        <Avatar size={24} style={{ backgroundColor: r.color }}>
          {v[0]}
        </Avatar>
        {v}
      </Space>
    ),
  },
  { title: 'Due', dataIndex: 'due' },
  { title: 'Status', dataIndex: 'status', render: (v: string) => <Tag color={statusColor[v]}>{v}</Tag> },
  {
    title: 'Amount',
    dataIndex: 'amount',
    align: 'right' as const,
    render: (v: number) => <span className="pg-num">${v.toLocaleString('en-US')}</span>,
  },
  {
    title: '',
    dataIndex: 'op',
    width: 48,
    render: () => (
      <Dropdown
        droplist={
          <Menu>
            <Menu.Item key="v">View</Menu.Item>
            <Menu.Item key="d">Duplicate</Menu.Item>
            <Menu.Item key="r">Send reminder</Menu.Item>
          </Menu>
        }
        position="br"
      >
        <Button type="text" size="mini" icon={<IconMore />} aria-label="More" />
      </Dropdown>
    ),
  },
];

export function Dashboard() {
  return (
    <div className="pg-stack">
      <div className="pg-grid-4">
        {kpis.map((k) => (
          <Card key={k.label} bordered className="pg-kpi">
            <Text type="secondary" className="pg-small">
              {k.label}
            </Text>
            <div className="pg-kpi-value">{k.value}</div>
            <Space size={6}>
              <Tag size="small" color="green">
                {k.up ? <IconArrowRise /> : <IconArrowFall />} {k.delta}
              </Tag>
              <Text type="secondary" className="pg-small">
                {k.hint}
              </Text>
            </Space>
          </Card>
        ))}
      </div>

      <Card bordered className="pg-flush">
        <div className="pg-table-head">
          <div>
            <Title heading={6} className="pg-tight">
              Invoices
            </Title>
            <Text type="secondary" className="pg-small">
              37 open, 5 overdue
            </Text>
          </div>
          <Space wrap>
            <Input prefix={<IconSearch />} placeholder="Search invoices" className="pg-search" allowClear />
            <Select
              placeholder="Status"
              className="pg-select"
              options={['All', 'Paid', 'Sent', 'Overdue', 'Draft']}
              defaultValue="All"
            />
            <Button icon={<IconDownload />}>Export</Button>
            <Button type="primary" icon={<IconPlus />}>
              New invoice
            </Button>
          </Space>
        </div>
        <Tabs defaultActiveTab="all" className="pg-tabs">
          <Tabs.TabPane key="all" title="All" />
          <Tabs.TabPane
            key="overdue"
            title={
              <span>
                Overdue <Badge count={5} className="pg-badge" />
              </span>
            }
          />
          <Tabs.TabPane key="draft" title="Drafts" />
          <Tabs.TabPane key="recurring" title="Recurring" />
        </Tabs>
        <Table columns={columns} data={rows} pagination={false} border={false} rowSelection={{ type: 'checkbox' }} />
      </Card>

      <div className="pg-grid-3">
        <Card bordered title="Collected this quarter">
          <Progress percent={72} />
          <Paragraph type="secondary" className="pg-small pg-mt-s">
            $318,400 of a $442,000 target
          </Paragraph>
        </Card>
        <Card bordered title="Reminder sequence">
          <Space direction="vertical" size={10} className="pg-full">
            <Progress percent={100} size="small" status="success" formatText={() => 'Day 1'} />
            <Progress percent={60} size="small" formatText={() => 'Day 7'} />
            <Progress percent={20} size="small" status="warning" formatText={() => 'Day 14'} />
          </Space>
        </Card>
        <Card bordered title="Team">
          <Space direction="vertical" size={10} className="pg-full">
            {[
              ['Ana Duarte', 'Owner', '#f97316'],
              ['Kofi Mensah', 'Producer', '#0ea5e9'],
              ['Lena Park', 'Accountant', '#10b981'],
            ].map(([n, r, c]) => (
              <div key={n} className="pg-person">
                <span className="pg-presence">
                  <Avatar size={32} style={{ backgroundColor: c }}>
                    {n[0]}
                  </Avatar>
                  <span className="pg-presence-dot" role="img" aria-label="Online" />
                </span>
                <div className="pg-grow">
                  <Text bold>{n}</Text>
                  <br />
                  <Text type="secondary" className="pg-small">
                    {r}
                  </Text>
                </div>
              </div>
            ))}
          </Space>
        </Card>
      </div>
    </div>
  );
}

export function FormShowcase() {
  return (
    <Card bordered title="New client" extra={<Tag color="orange">Unsaved</Tag>}>
      <Form layout="vertical" initialValues={{ currency: 'EUR', terms: 14, method: 'card', fee: 2, tags: ['retainer', 'design'] }}>
        <div className="pg-grid-2 pg-gap-s">
          <Form.Item label="Company" field="company" rules={[{ required: true }]}>
            <Input placeholder="Fieldwork Ltd" />
          </Form.Item>
          <Form.Item label="Billing email" field="email">
            <Input placeholder="accounts@fieldwork.co" />
          </Form.Item>
          <Form.Item label="Currency" field="currency">
            <Select options={['EUR', 'GBP', 'USD', 'SEK', 'JPY']} />
          </Form.Item>
          <Form.Item label="Payment terms (days)" field="terms">
            <InputNumber min={0} max={90} />
          </Form.Item>
          <Form.Item label="First invoice" field="date">
            <DatePicker className="pg-full" />
          </Form.Item>
          <Form.Item label="Tags" field="tags">
            <InputTag placeholder="Add a tag" allowClear />
          </Form.Item>
        </div>
        <Form.Item label="Pays by" field="method">
          <Radio.Group>
            <Radio value="card">Card</Radio>
            <Radio value="transfer">Bank transfer</Radio>
            <Radio value="either">Either</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Late fee" field="fee">
          <Slider max={10} marks={{ 0: '0%', 5: '5%', 10: '10%' }} />
        </Form.Item>
        <Form.Item label="Notes" field="notes">
          <Input.TextArea placeholder="Anything the invoice should say" autoSize={{ minRows: 2 }} />
        </Form.Item>
        <Form.Item>
          <Space size={10}>
            <Switch defaultChecked />
            <Text>Send reminders automatically</Text>
          </Space>
        </Form.Item>
        <Alert type="info" content="Halden will email this client from billing@halden.app on your behalf." />
        <Divider />
        <Space className="pg-end">
          <Checkbox defaultChecked>Add another</Checkbox>
          <Button>Cancel</Button>
          <Button type="primary" htmlType="submit">
            Save client
          </Button>
        </Space>
      </Form>
    </Card>
  );
}

export function Login() {
  return (
    <Card bordered className="pg-login">
      <Title heading={5} className="pg-tight">
        Sign in to Halden
      </Title>
      <Paragraph type="secondary">Welcome back. Use your work email.</Paragraph>
      <div className="pg-grid-2 pg-gap-s">
        <Button long icon={<IconGoogle />}>
          Google
        </Button>
        <Button long icon={<IconGithub />}>
          GitHub
        </Button>
      </div>
      <Divider orientation="center">
        <Text type="secondary" className="pg-small">
          or
        </Text>
      </Divider>
      <Form layout="vertical">
        <Form.Item label="Email">
          <Input placeholder="you@studio.com" />
        </Form.Item>
        <Form.Item label="Password">
          <Input.Password placeholder="••••••••" />
        </Form.Item>
        <div className="pg-between">
          <Checkbox>Remember me</Checkbox>
          <Typography.Text className="pg-link">Forgot password?</Typography.Text>
        </div>
        <Button type="primary" long size="large" className="pg-mt">
          Sign in
        </Button>
      </Form>
    </Card>
  );
}

export function Overlays() {
  const [open, setOpen] = useState(false);
  return (
    <Card bordered title="Buttons and overlays">
      <Space wrap>
        <Button type="primary">Primary</Button>
        <Button>Secondary</Button>
        <Button type="outline">Outline</Button>
        <Button type="dashed">Dashed</Button>
        <Button type="text">Text</Button>
        <Button type="primary" status="danger" icon={<IconDelete />}>
          Delete
        </Button>
        <Button type="primary" disabled>
          Disabled
        </Button>
      </Space>
      <Divider />
      <Space wrap>
        <Button onClick={() => setOpen(true)}>Modal</Button>
        <Button onClick={() => Message.success('Invoice INV-2041 sent to Fieldwork')}>Message</Button>
        <Button
          onClick={() =>
            Notification.info({ title: 'Payment received', content: 'North Pier paid INV-2040: $12,800.' })
          }
        >
          Notification
        </Button>
        <Popconfirm title="Void this invoice?" content="The client will be told it is cancelled.">
          <Button>Popconfirm</Button>
        </Popconfirm>
        <Tooltip content="Sends a reminder now">
          <Button>Tooltip</Button>
        </Tooltip>
      </Space>
      <Modal
        title="Send INV-2041"
        visible={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        okText="Send invoice"
      >
        <Paragraph type="secondary">Fieldwork will get the invoice and a payment link at accounts@fieldwork.co.</Paragraph>
        <Checkbox defaultChecked>Attach a PDF copy</Checkbox>
      </Modal>
    </Card>
  );
}

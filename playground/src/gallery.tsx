// Every Arco component, one frame each, grouped the way Arco's docs group them. Rendered on the
// server too, so anything here that cannot run under renderToString shows up in the SSR check.
// Dates are fixed (not "today") so the server and the browser draw the same calendar.
import { useState, type ReactNode } from 'react';
import dayjs from 'dayjs';
import {
  Affix,
  Alert,
  Anchor,
  AutoComplete,
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Calendar,
  Card,
  Carousel,
  Cascader,
  Checkbox,
  Collapse,
  ColorPicker,
  Comment,
  DatePicker,
  Descriptions,
  Divider,
  Drawer,
  Dropdown,
  Empty,
  Grid,
  Image,
  Input,
  InputNumber,
  InputTag,
  Layout,
  Link,
  List,
  Mentions,
  Menu,
  Message,
  Modal,
  Notification,
  PageHeader,
  Pagination,
  Popconfirm,
  Popover,
  Progress,
  Radio,
  Rate,
  ResizeBox,
  Result,
  Select,
  Skeleton,
  Slider,
  Space,
  Spin,
  Statistic,
  Steps,
  Switch,
  Table,
  Tabs,
  Tag,
  TimePicker,
  Timeline,
  Tooltip,
  Transfer,
  Tree,
  TreeSelect,
  Trigger,
  Typography,
  Upload,
  VerificationCode,
  Watermark,
} from '@arco-design/web-react';
import {
  IconHome,
  IconSettings,
  IconUser,
  IconStar,
  IconHeart,
  IconMessage,
  IconPlus,
  IconSearch,
  IconDown,
  IconFile,
  IconCalendar,
  IconCheckCircle,
  IconExclamationCircle,
  IconCloseCircle,
  IconInfoCircle,
  IconEdit,
  IconDelete,
  IconShareAlt,
  IconApps,
} from '@arco-design/web-react/icon';

const { Title, Paragraph, Text } = Typography;
const { Row, Col } = Grid;
const FIXED_DAY = dayjs('2026-11-18');

function Demo({ title, children, wide }: { title: string; children: ReactNode; wide?: boolean }) {
  return (
    <section className={wide ? 'gl-demo gl-wide' : 'gl-demo'} id={`c-${title.toLowerCase().replace(/[^a-z]+/g, '-')}`}>
      <div className="gl-demo-head">
        <Text bold>{title}</Text>
      </div>
      <div className="gl-demo-body">{children}</div>
    </section>
  );
}

function Group({ id, title, note, children }: { id: string; title: string; note: string; children: ReactNode }) {
  return (
    <div className="gl-group" id={id}>
      <div className="gl-group-head">
        <Title heading={4} className="pg-tight">
          {title}
        </Title>
        <Text type="secondary">{note}</Text>
      </div>
      <div className="gl-grid">{children}</div>
    </div>
  );
}

const groups = [
  ['general', 'General'],
  ['layout', 'Layout'],
  ['navigation', 'Navigation'],
  ['entry', 'Data entry'],
  ['display', 'Data display'],
  ['feedback', 'Feedback'],
  ['other', 'Other'],
];

export function Gallery() {
  return (
    <div className="pg-container gl">
      <header className="gl-intro">
        <Title heading={2} className="pg-tight">
          Every component
        </Title>
        <Paragraph type="secondary" className="pg-tight">
          All of Arco, from the fork's source, under the preset you pick above. This page is rendered on the server
          with renderToString and hydrated in the browser.
        </Paragraph>
        <nav className="gl-jump" aria-label="Groups">
          {groups.map(([id, label]) => (
            <a key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
        </nav>
      </header>
      <General />
      <LayoutGroup />
      <Navigation />
      <Entry />
      <Display />
      <Feedback />
      <Other />
    </div>
  );
}

function General() {
  return (
    <Group id="general" title="General" note="Buttons, type, links and icons.">
      <Demo title="Button" wide>
        <Space wrap>
          <Button type="primary">Primary</Button>
          <Button type="secondary">Secondary</Button>
          <Button type="outline">Outline</Button>
          <Button type="dashed">Dashed</Button>
          <Button type="text">Text</Button>
          <Button type="primary" status="danger">
            Danger
          </Button>
          <Button type="primary" status="success">
            Success
          </Button>
          <Button type="primary" status="warning">
            Warning
          </Button>
          <Button type="primary" loading>
            Loading
          </Button>
          <Button type="primary" disabled>
            Disabled
          </Button>
        </Space>
        <Space wrap className="gl-row">
          <Button size="mini">Mini</Button>
          <Button size="small">Small</Button>
          <Button size="default">Default</Button>
          <Button size="large">Large</Button>
          <Button type="primary" icon={<IconPlus />} aria-label="Add" />
          <Button shape="circle" icon={<IconSearch />} aria-label="Search" />
          <Button.Group>
            <Button>Left</Button>
            <Button>Middle</Button>
            <Button>Right</Button>
          </Button.Group>
        </Space>
      </Demo>
      <Demo title="Typography">
        <Title heading={5} className="pg-tight">
          Quarterly report
        </Title>
        <Paragraph>
          Revenue grew <Text bold>18%</Text>, with <Text mark>recurring invoices</Text> doing most of the work.{' '}
          <Text code>INV-2041</Text> is the largest open invoice.
        </Paragraph>
        <Space wrap>
          <Text type="secondary">Secondary</Text>
          <Text type="success">Success</Text>
          <Text type="warning">Warning</Text>
          <Text type="error">Error</Text>
          <Text underline>Underline</Text>
          <Text delete>Deleted</Text>
          <Text copyable>Copy me</Text>
        </Space>
        <Paragraph ellipsis={{ rows: 1, expandable: true }} className="gl-row">
          A long paragraph is cut to one line with an ellipsis and a link to read the rest of it, which is what a
          table cell or a card description usually needs when the text runs longer than the space it has.
        </Paragraph>
      </Demo>
      <Demo title="Link and Icon">
        <Space wrap size="large">
          <Link href="#general">Link</Link>
          <Link href="#general" icon>
            With icon
          </Link>
          <Link status="error">Error</Link>
          <Link disabled>Disabled</Link>
        </Space>
        <Space wrap size="large" className="gl-row gl-icons">
          <IconHome />
          <IconSettings />
          <IconUser />
          <IconStar />
          <IconHeart />
          <IconMessage />
          <IconFile />
          <IconCalendar />
          <IconApps />
          <IconShareAlt />
        </Space>
      </Demo>
    </Group>
  );
}

function LayoutGroup() {
  return (
    <Group id="layout" title="Layout" note="Grid, space, dividers and page frames.">
      <Demo title="Grid">
        <Row gutter={8}>
          {[8, 8, 8].map((n, i) => (
            <Col key={i} span={n}>
              <div className="gl-cell">col-{n}</div>
            </Col>
          ))}
        </Row>
        <Row gutter={8} className="gl-row">
          <Col span={6}>
            <div className="gl-cell">6</div>
          </Col>
          <Col span={12}>
            <div className="gl-cell">12</div>
          </Col>
          <Col span={6}>
            <div className="gl-cell">6</div>
          </Col>
        </Row>
      </Demo>
      <Demo title="Space and Divider">
        <Space split={<Divider type="vertical" />}>
          <Link>Invoices</Link>
          <Link>Clients</Link>
          <Link>Reports</Link>
        </Space>
        <Divider orientation="left">Section</Divider>
        <Space direction="vertical" className="pg-full">
          <Text type="secondary">Vertical space, 8px between rows.</Text>
          <Text type="secondary">Dividers can carry a label.</Text>
        </Space>
      </Demo>
      <Demo title="Layout" wide>
        <Layout className="gl-layout">
          <Layout.Header className="gl-layout-header">Header</Layout.Header>
          <Layout>
            <Layout.Sider width={140} className="gl-layout-sider">
              Sider
            </Layout.Sider>
            <Layout.Content className="gl-layout-content">Content</Layout.Content>
          </Layout>
          <Layout.Footer className="gl-layout-footer">Footer</Layout.Footer>
        </Layout>
      </Demo>
      <Demo title="ResizeBox" wide>
        <ResizeBox.Split
          className="gl-split"
          size={0.35}
          max={0.7}
          min={0.2}
          panes={[
            <div key="a" className="gl-pane">
              Drag the bar
            </div>,
            <div key="b" className="gl-pane">
              Right pane
            </div>,
          ]}
        />
      </Demo>
    </Group>
  );
}

function Navigation() {
  const [current, setCurrent] = useState(3);
  return (
    <Group id="navigation" title="Navigation" note="Menus, tabs, steps and pagination.">
      <Demo title="Menu" wide>
        <Menu mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">Dashboard</Menu.Item>
          <Menu.Item key="2">Invoices</Menu.Item>
          <Menu.SubMenu key="3" title="Clients">
            <Menu.Item key="3_1">All clients</Menu.Item>
            <Menu.Item key="3_2">Groups</Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="4">Reports</Menu.Item>
        </Menu>
        <div className="gl-menu-side">
          <Menu defaultOpenKeys={['s']} defaultSelectedKeys={['s1']} className="gl-menu-v">
            <Menu.Item key="h">
              <IconHome /> Home
            </Menu.Item>
            <Menu.SubMenu
              key="s"
              title={
                <span>
                  <IconSettings /> Settings
                </span>
              }
            >
              <Menu.Item key="s1">Profile</Menu.Item>
              <Menu.Item key="s2">Billing</Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </div>
      </Demo>
      <Demo title="Tabs">
        <Tabs defaultActiveTab="1">
          <Tabs.TabPane key="1" title="Overview">
            <Text type="secondary">Line tabs, the default.</Text>
          </Tabs.TabPane>
          <Tabs.TabPane key="2" title="Activity">
            <Text type="secondary">Second tab.</Text>
          </Tabs.TabPane>
          <Tabs.TabPane key="3" title="Settings" disabled />
        </Tabs>
        <Tabs type="capsule" defaultActiveTab="a" className="gl-row">
          <Tabs.TabPane key="a" title="Day" />
          <Tabs.TabPane key="b" title="Week" />
          <Tabs.TabPane key="c" title="Month" />
        </Tabs>
      </Demo>
      <Demo title="Breadcrumb and Dropdown">
        <Breadcrumb>
          <Breadcrumb.Item>
            <IconHome />
          </Breadcrumb.Item>
          <Breadcrumb.Item>Clients</Breadcrumb.Item>
          <Breadcrumb.Item>Fieldwork</Breadcrumb.Item>
        </Breadcrumb>
        <Space className="gl-row">
          <Dropdown
            droplist={
              <Menu>
                <Menu.Item key="e">
                  <IconEdit /> Edit
                </Menu.Item>
                <Menu.Item key="s">
                  <IconShareAlt /> Share
                </Menu.Item>
                <Menu.Item key="d">
                  <IconDelete /> Delete
                </Menu.Item>
              </Menu>
            }
          >
            <Button>
              Actions <IconDown />
            </Button>
          </Dropdown>
          <Dropdown.Button
            type="primary"
            droplist={
              <Menu>
                <Menu.Item key="1">Save as draft</Menu.Item>
                <Menu.Item key="2">Schedule</Menu.Item>
              </Menu>
            }
          >
            Send
          </Dropdown.Button>
        </Space>
      </Demo>
      <Demo title="Steps" wide>
        <Steps current={2}>
          <Steps.Step title="Details" description="Client and items" />
          <Steps.Step title="Review" description="Totals and tax" />
          <Steps.Step title="Send" description="Email and link" />
          <Steps.Step title="Paid" />
        </Steps>
        <Steps type="dot" current={1} className="gl-row" size="small">
          <Steps.Step title="Draft" />
          <Steps.Step title="Sent" />
          <Steps.Step title="Paid" />
        </Steps>
      </Demo>
      <Demo title="Pagination" wide>
        <Pagination total={240} current={current} onChange={setCurrent} showTotal sizeCanChange />
        <Pagination simple total={50} size="small" className="gl-row" />
      </Demo>
      <Demo title="PageHeader and Anchor">
        <PageHeader title="Invoices" subTitle="37 open" extra={<Button type="primary">New</Button>} />
        <Anchor affix={false} lineless className="gl-row">
          <Anchor.Link href="#general" title="General" />
          <Anchor.Link href="#entry" title="Data entry" />
          <Anchor.Link href="#feedback" title="Feedback" />
        </Anchor>
      </Demo>
      <Demo title="Affix">
        <Affix offsetTop={64}>
          <Tag color="arcoblue">I stick 64px from the top while this frame is in view</Tag>
        </Affix>
      </Demo>
    </Group>
  );
}

const cascaderOptions = [
  {
    value: 'eu',
    label: 'Europe',
    children: [
      { value: 'se', label: 'Sweden', children: [{ value: 'sto', label: 'Stockholm' }] },
      { value: 'pt', label: 'Portugal', children: [{ value: 'lis', label: 'Lisbon' }] },
    ],
  },
  { value: 'as', label: 'Asia', children: [{ value: 'jp', label: 'Japan', children: [{ value: 'tyo', label: 'Tokyo' }] }] },
];

const treeData = [
  {
    key: 'clients',
    title: 'Clients',
    children: [
      { key: 'fieldwork', title: 'Fieldwork', children: [{ key: 'f1', title: 'INV-2041' }, { key: 'f2', title: 'INV-2030' }] },
      { key: 'pier', title: 'North Pier', children: [{ key: 'p1', title: 'INV-2040' }] },
    ],
  },
  { key: 'drafts', title: 'Drafts', children: [{ key: 'd1', title: 'INV-2038' }] },
];

function Entry() {
  const [code, setCode] = useState('');
  return (
    <Group id="entry" title="Data entry" note="Every input, picker and selector.">
      <Demo title="Input">
        <Space direction="vertical" className="pg-full">
          <Input placeholder="Plain input" allowClear />
          <Input prefix={<IconUser />} suffix={<IconInfoCircle />} placeholder="With prefix and suffix" />
          <Input addBefore="https://" addAfter=".com" placeholder="halden" />
          <Input.Search placeholder="Search" searchButton />
          <Input.Password defaultValue="secret-pass" />
          <Input.TextArea placeholder="Up to 120 characters" maxLength={120} showWordLimit />
          <Input status="error" placeholder="Error state" />
          <Input disabled placeholder="Disabled" />
        </Space>
      </Demo>
      <Demo title="Select, AutoComplete, Cascader">
        <Space direction="vertical" className="pg-full">
          <Select placeholder="Single" options={['EUR', 'GBP', 'USD', 'SEK']} allowClear />
          <Select
            mode="multiple"
            placeholder="Multiple"
            defaultValue={['design', 'retainer']}
            options={['design', 'retainer', 'research', 'workshop']}
            allowClear
          />
          <AutoComplete placeholder="AutoComplete: type a client" data={['Fieldwork', 'North Pier', 'Oak & Ivy', 'Kiln']} />
          <Cascader placeholder="Cascader" options={cascaderOptions} allowClear />
          <TreeSelect placeholder="TreeSelect" treeData={treeData} allowClear />
        </Space>
      </Demo>
      <Demo title="Date and time">
        <Space direction="vertical" className="pg-full">
          <DatePicker className="pg-full" defaultPickerValue={FIXED_DAY} />
          <DatePicker.RangePicker className="pg-full" defaultPickerValue={[FIXED_DAY, FIXED_DAY.add(1, 'month')]} />
          <DatePicker.MonthPicker className="pg-full" />
          <TimePicker className="pg-full" />
        </Space>
      </Demo>
      <Demo title="Numbers, tags, mentions">
        <Space direction="vertical" className="pg-full">
          <InputNumber defaultValue={14} min={0} max={90} suffix="days" />
          <InputNumber mode="button" defaultValue={3} />
          <InputTag defaultValue={['retainer', 'design']} placeholder="Add a tag" allowClear />
          <Mentions placeholder="Mention someone with @" options={['Ana', 'Kofi', 'Lena']} />
          <VerificationCode value={code} onChange={setCode} length={6} />
        </Space>
      </Demo>
      <Demo title="Choices">
        <Space direction="vertical" size="medium">
          <Checkbox.Group defaultValue={['card']} options={[
            { label: 'Card', value: 'card' },
            { label: 'Transfer', value: 'transfer' },
            { label: 'Cash', value: 'cash', disabled: true },
          ]} />
          <Checkbox indeterminate>Indeterminate</Checkbox>
          <Radio.Group defaultValue="m" options={[
            { label: 'Monthly', value: 'm' },
            { label: 'Yearly', value: 'y' },
          ]} />
          <Radio.Group type="button" defaultValue="w" options={[
            { label: 'Day', value: 'd' },
            { label: 'Week', value: 'w' },
            { label: 'Month', value: 'mo' },
          ]} />
          <Space>
            <Switch defaultChecked />
            <Switch />
            <Switch size="small" defaultChecked />
            <Switch loading defaultChecked />
            <Switch disabled />
          </Space>
          <Rate defaultValue={3.5} allowHalf />
        </Space>
      </Demo>
      <Demo title="Slider and ColorPicker">
        <Slider defaultValue={40} />
        <Slider range defaultValue={[20, 70]} className="gl-row" />
        <Slider defaultValue={2} max={10} step={1} showTicks marks={{ 0: '0', 5: '5', 10: '10' }} className="gl-row" />
        <Space className="gl-row gl-pad-top">
          <ColorPicker defaultValue="#7c3aed" />
          <ColorPicker defaultValue="#ea580c" showText />
        </Space>
      </Demo>
      <Demo title="Transfer" wide>
        <Transfer
          dataSource={['Fieldwork', 'North Pier', 'Oak & Ivy', 'Saltmarsh', 'Kiln', 'Paper Moon'].map((v, i) => ({
            key: String(i),
            value: v,
          }))}
          defaultTargetKeys={['1', '4']}
          titleTexts={['All clients', 'On this invoice run']}
        />
      </Demo>
      <Demo title="Upload">
        <Upload
          action="/"
          autoUpload={false}
          defaultFileList={[
            { uid: '1', name: 'invoice-2041.pdf', status: 'done' },
            { uid: '2', name: 'contract.docx', status: 'error' },
            { uid: '3', name: 'logo.png', status: 'uploading', percent: 60 },
          ]}
        />
        <Upload drag action="/" autoUpload={false} className="gl-row" tip="PDF or PNG, up to 10 MB" />
      </Demo>
    </Group>
  );
}

const tableData = [
  { key: '1', client: 'Fieldwork', amount: 4200, status: 'Sent' },
  { key: '2', client: 'North Pier', amount: 12800, status: 'Paid' },
  { key: '3', client: 'Oak & Ivy', amount: 2350, status: 'Overdue' },
  { key: '4', client: 'Saltmarsh', amount: 7600, status: 'Draft' },
  { key: '5', client: 'Kiln', amount: 9150, status: 'Paid' },
  { key: '6', client: 'Paper Moon', amount: 1980, status: 'Sent' },
];

function Display() {
  return (
    <Group id="display" title="Data display" note="Tables, lists, cards and everything that shows data.">
      <Demo title="Table" wide>
        <Table
          rowSelection={{ type: 'checkbox' }}
          data={tableData}
          pagination={{ pageSize: 4, size: 'small' }}
          columns={[
            { title: 'Client', dataIndex: 'client', sorter: (a, b) => a.client.localeCompare(b.client) },
            {
              title: 'Status',
              dataIndex: 'status',
              filters: ['Paid', 'Sent', 'Overdue', 'Draft'].map((s) => ({ text: s, value: s })),
              onFilter: (v, r) => r.status === v,
              render: (s: string) => (
                <Tag color={{ Paid: 'green', Sent: 'arcoblue', Overdue: 'red', Draft: 'gray' }[s]}>{s}</Tag>
              ),
            },
            {
              title: 'Amount',
              dataIndex: 'amount',
              align: 'right',
              sorter: (a, b) => a.amount - b.amount,
              render: (v: number) => `$${v.toLocaleString('en-US')}`,
            },
          ]}
        />
      </Demo>
      <Demo title="Card">
        <Card
          title="Fieldwork"
          extra={<Link>Open</Link>}
          actions={[<IconEdit key="e" />, <IconShareAlt key="s" />, <IconDelete key="d" />]}
        >
          <Card.Meta
            avatar={<Avatar size={28} style={{ backgroundColor: '#f97316' }}>F</Avatar>}
            title="Design retainer"
            description="Monthly, €4,200, next invoice on 1 December."
          />
        </Card>
      </Demo>
      <Demo title="Descriptions">
        <Descriptions
          column={2}
          border
          data={[
            { label: 'Client', value: 'Fieldwork' },
            { label: 'Currency', value: 'EUR' },
            { label: 'Terms', value: '14 days' },
            { label: 'Tax', value: 'VAT 25%' },
          ]}
        />
      </Demo>
      <Demo title="Avatar, Badge, Tag">
        <Space size="large" wrap>
          <Avatar>A</Avatar>
          <Avatar shape="square" style={{ backgroundColor: '#0ea5e9' }}>
            K
          </Avatar>
          <Badge count={9}>
            <Avatar>
              <IconUser />
            </Avatar>
          </Badge>
          <Badge dot>
            <IconMessage className="gl-big-icon" />
          </Badge>
          <Avatar.Group size={28}>
            {['#f97316', '#0ea5e9', '#10b981'].map((c, i) => (
              <Avatar key={c} style={{ backgroundColor: c }}>
                {'AKL'[i]}
              </Avatar>
            ))}
          </Avatar.Group>
        </Space>
        <Space wrap className="gl-row">
          <Tag>Default</Tag>
          <Tag color="arcoblue">Blue</Tag>
          <Tag color="green">Green</Tag>
          <Tag color="orange">Orange</Tag>
          <Tag color="red">Red</Tag>
          <Tag color="purple" bordered>
            Bordered
          </Tag>
          <Tag closable>Closable</Tag>
          <Tag checkable>Checkable</Tag>
          <Tag icon={<IconStar />}>Icon</Tag>
        </Space>
        <Space wrap className="gl-row">
          <Badge status="success" text="Paid" />
          <Badge status="processing" text="Sending" />
          <Badge status="warning" text="Due soon" />
          <Badge status="error" text="Overdue" />
          <Badge status="default" text="Draft" />
        </Space>
      </Demo>
      <Demo title="List">
        <List
          size="small"
          dataSource={['Fieldwork paid INV-2040', 'Reminder sent to Oak & Ivy', 'Kiln opened INV-2037']}
          render={(item, i) => (
            <List.Item key={i} actions={[<Link key="v">View</Link>]}>
              <List.Item.Meta avatar={<Avatar size={24}>{item[0]}</Avatar>} title={item} description="2 hours ago" />
            </List.Item>
          )}
        />
      </Demo>
      <Demo title="Collapse">
        <Collapse defaultActiveKey={['1']}>
          <Collapse.Item name="1" header="Payment terms">
            Net 14 unless the client's contract says otherwise.
          </Collapse.Item>
          <Collapse.Item name="2" header="Late fees">
            2% a month after the due date.
          </Collapse.Item>
          <Collapse.Item name="3" header="Disabled" disabled>
            Hidden.
          </Collapse.Item>
        </Collapse>
      </Demo>
      <Demo title="Statistic">
        <Space size={40} wrap>
          <Statistic title="Paid this month" value={126900} prefix="$" groupSeparator />
          <Statistic title="On-time rate" value={92.4} precision={1} suffix="%" />
          <Statistic.Countdown title="Next run" value={FIXED_DAY.add(2, 'hour').valueOf()} now={FIXED_DAY.valueOf()} start={false} />
        </Space>
      </Demo>
      <Demo title="Timeline">
        <Timeline>
          <Timeline.Item label="09:12">Invoice created</Timeline.Item>
          <Timeline.Item label="09:15">Sent to accounts@fieldwork.co</Timeline.Item>
          <Timeline.Item label="14:40" dotColor="#00b42a">
            Paid by card
          </Timeline.Item>
        </Timeline>
      </Demo>
      <Demo title="Tree">
        <Tree treeData={treeData} defaultExpandedKeys={['clients', 'fieldwork']} checkable showLine />
      </Demo>
      <Demo title="Calendar" wide>
        <Calendar panel defaultValue={FIXED_DAY} panelWidth={300} />
      </Demo>
      <Demo title="Carousel">
        <Carousel className="gl-carousel" autoPlay={false} indicatorType="line" showArrow="hover">
          {['Invoices', 'Reminders', 'Payments'].map((t, i) => (
            <div key={t} className={`gl-slide gl-slide-${i}`}>
              {t}
            </div>
          ))}
        </Carousel>
      </Demo>
      <Demo title="Image and Empty">
        <Space align="start" size="large" wrap>
          <Image
            width={140}
            height={96}
            alt="A desk with a laptop"
            src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='96'><rect width='140' height='96' fill='%23cbd5e1'/><rect x='30' y='26' width='80' height='44' rx='4' fill='%2394a3b8'/></svg>"
          />
          <Empty description="No invoices yet" />
        </Space>
      </Demo>
      <Demo title="Comment">
        <Comment
          author="Kofi Mensah"
          avatar={<Avatar size={32} style={{ backgroundColor: '#0ea5e9' }}>K</Avatar>}
          content="Can we move Fieldwork to net 30 from January?"
          datetime="2 hours ago"
          actions={[<Link key="r">Reply</Link>, <Link key="l">Like</Link>]}
        />
      </Demo>
      <Demo title="Popover and Tooltip">
        <Space wrap>
          <Popover title="Fieldwork" content="3 open invoices, €9,800 outstanding.">
            <Button>Popover</Button>
          </Popover>
          <Tooltip content="Sends a reminder now">
            <Button>Tooltip</Button>
          </Tooltip>
          <Tooltip content="Mini tooltip" mini>
            <Button>Mini</Button>
          </Tooltip>
        </Space>
      </Demo>
      <Demo title="Skeleton">
        <Skeleton animation text={{ rows: 3 }} image />
      </Demo>
    </Group>
  );
}

function Feedback() {
  const [modal, setModal] = useState(false);
  const [drawer, setDrawer] = useState(false);
  return (
    <Group id="feedback" title="Feedback" note="Alerts, dialogs, messages and progress.">
      <Demo title="Alert" wide>
        <Space direction="vertical" className="pg-full">
          <Alert type="info" content="Halden emails this client on your behalf." />
          <Alert type="success" content="INV-2040 was paid." closable />
          <Alert type="warning" title="Two invoices due tomorrow" content="Fieldwork and Kiln." />
          <Alert type="error" content="The card on file was declined." showIcon />
        </Space>
      </Demo>
      <Demo title="Modal, Drawer, Message, Notification">
        <Space wrap>
          <Button onClick={() => setModal(true)}>Modal</Button>
          <Button
            onClick={() =>
              Modal.confirm({ title: 'Void INV-2041?', content: 'The client will be told it is cancelled.' })
            }
          >
            Confirm
          </Button>
          <Button onClick={() => setDrawer(true)}>Drawer</Button>
          <Button onClick={() => Message.success('Invoice sent')}>Message</Button>
          <Button onClick={() => Notification.info({ title: 'Payment received', content: 'North Pier paid $12,800.' })}>
            Notification
          </Button>
          <Popconfirm title="Delete this draft?">
            <Button status="danger">Popconfirm</Button>
          </Popconfirm>
        </Space>
        <Modal title="Send INV-2041" visible={modal} onOk={() => setModal(false)} onCancel={() => setModal(false)}>
          Fieldwork gets the invoice and a payment link.
        </Modal>
        <Drawer title="Fieldwork" visible={drawer} width={360} onOk={() => setDrawer(false)} onCancel={() => setDrawer(false)}>
          <Descriptions column={1} data={[{ label: 'Open', value: '3 invoices' }, { label: 'Owed', value: '€9,800' }]} />
        </Drawer>
      </Demo>
      <Demo title="Progress">
        <Progress percent={72} />
        <Progress percent={100} status="success" className="gl-row" />
        <Progress percent={40} status="error" className="gl-row" />
        <Space size="large" className="gl-row">
          <Progress type="circle" percent={72} size="small" />
          <Progress type="circle" percent={100} status="success" size="small" />
          <Progress steps={5} percent={60} />
        </Space>
      </Demo>
      <Demo title="Spin">
        <Space size={40}>
          <Spin />
          <Spin dot />
          <Spin tip="Loading invoices" />
        </Space>
        <Spin loading className="gl-row pg-full">
          <Card>Content behind a loading layer</Card>
        </Spin>
      </Demo>
      <Demo title="Result" wide>
        <div className="gl-results">
          <Result status="success" title="Invoice sent" subTitle="Fieldwork will get it in a minute." extra={<Button type="primary">Back</Button>} />
          <Result status="404" title="Not found" subTitle="This invoice was deleted." />
        </div>
      </Demo>
    </Group>
  );
}

function Other() {
  return (
    <Group id="other" title="Other" note="Lower-level pieces the components above are made of.">
      <Demo title="Trigger">
        <Trigger
          popup={() => <div className="gl-trigger">A popup positioned by Trigger, the base of every overlay.</div>}
          trigger="click"
          position="bottom"
        >
          <Button>Click for Trigger</Button>
        </Trigger>
      </Demo>
      <Demo title="Watermark">
        <Watermark content="Halden · draft">
          <div className="gl-watermark">A draft invoice carries a watermark.</div>
        </Watermark>
      </Demo>
      <Demo title="Status icons">
        <Space size="large" className="gl-icons">
          <IconCheckCircle className="gl-ok" />
          <IconExclamationCircle className="gl-warn" />
          <IconCloseCircle className="gl-err" />
          <IconInfoCircle className="gl-info" />
        </Space>
      </Demo>
    </Group>
  );
}

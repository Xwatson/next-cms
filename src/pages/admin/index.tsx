import { Card, Row, Col, Statistic } from 'antd';
import {
  UserOutlined,
  FileTextOutlined,
  EyeOutlined,
  CommentOutlined,
} from '@ant-design/icons';
import AdminLayout from '@/components/layouts/AdminLayout';

export default function Dashboard() {
  return (
    <AdminLayout>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="用户总数"
              value={112893}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="文章总数"
              value={93}
              prefix={<FileTextOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="浏览量"
              value={1128}
              prefix={<EyeOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="评论数"
              value={93}
              prefix={<CommentOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </AdminLayout>
  );
}

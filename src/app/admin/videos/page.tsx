'use client';

import { useCallback, useEffect, useState } from "react";
import {
  Button,
  Card,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Table,
  message,
  Image,
  InputNumber,
  Rate,
  TreeSelect,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { Video } from "@/types/video";
import dayjs from 'dayjs';
import { createVideo, getVideos, updateVideo, deleteVideo } from "@/services/video";
import { getCategoryList } from "@/services/category";

const { TextArea } = Input;

export default function VideosPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("新增视频");
  const [videos, setVideos] = useState<Video[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const columns: ColumnsType<Video> = [
    {
      title: "封面",
      dataIndex: "pic",
      key: "pic",
      width: 100,
      render: (pic) => pic ? <Image src={pic} width={80} height={120} alt="封面" /> : "-",
    },
    {
      title: "名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "副标题",
      dataIndex: "subTitle",
      key: "subTitle",
    },
    {
      title: "分类",
      dataIndex: "category",
      key: "category",
      render: (category) => category?.name,
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: (status) => status === 1 ? "上线" : "下线",
    },
    {
      title: "播放量",
      dataIndex: "hits",
      key: "hits",
      sorter: (a, b) => a.hits - b.hits,
    },
    {
      title: "评分",
      dataIndex: "score",
      key: "score",
      render: (score) => <Rate disabled defaultValue={score} />,
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>编辑</a>
          <a onClick={() => handleDelete(record.id)}>删除</a>
        </Space>
      ),
    },
  ];

  const fetchVideos = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getVideos({
        page: pagination.current,
        pageSize: pagination.pageSize,
      });
      setVideos(res.data?.list || []);
      setPagination({
        ...pagination,
        total: res.data?.total || 0,
      });
    } catch (error) {
      message.error("获取视频列表失败");
    } finally {
      setLoading(false);
    }
  }, [pagination.current, pagination.pageSize]);

  const fetchCategories = useCallback(async () => {
    try {
      const res = await getCategoryList();
      setCategories(res.data || []);
    } catch (error) {
      message.error("获取分类列表失败");
    }
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleTableChange = (pagination: any) => {
    setPagination(pagination);
  };

  const handleAdd = () => {
    setModalTitle("新增视频");
    setEditingId(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (record: Video) => {
    setModalTitle("编辑视频");
    setEditingId(record.id);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    Modal.confirm({
      title: "确认删除",
      content: "确定要删除这个视频吗？",
      onOk: async () => {
        try {
          await deleteVideo(id);
          message.success("删除成功");
          fetchVideos();
        } catch (error) {
          message.error("删除失败");
        }
      },
    });
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingId) {
        await updateVideo({ ...values, id: editingId });
        message.success("更新成功");
      } else {
        await createVideo(values);
        message.success("创建成功");
      }
      setModalVisible(false);
      fetchVideos();
    } catch (error) {
      message.error("操作失败");
    }
  };

  return (
    <Card>
      <div className="mb-4">
        <Button type="primary" onClick={handleAdd}>
          新增视频
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={videos}
        rowKey="id"
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
      />

      <Modal
        title={modalTitle}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="视频名称"
            rules={[{ required: true, message: "请输入视频名称" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="subTitle"
            label="副标题"
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="categoryId"
            label="分类"
            rules={[{ required: true, message: "请选择分类" }]}
          >
            <TreeSelect
              treeData={categories.map(item => ({
                title: item.name,
                value: item.id,
                children: item.children?.map((child: any) => ({
                  title: child.name,
                  value: child.id,
                  children: child.children?.map((subChild: any) => ({
                    title: subChild.name,
                    value: subChild.id
                  }))
                }))
              }))}
              placeholder="请选择分类"
              treeDefaultExpandAll
            />
          </Form.Item>

          <Form.Item
            name="pic"
            label="封面图"
          >
            <Input placeholder="请输入图片URL" />
          </Form.Item>

          <Form.Item
            name="status"
            label="状态"
            initialValue={0}
          >
            <Select>
              <Select.Option value={1}>上线</Select.Option>
              <Select.Option value={0}>下线</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="content"
            label="内容"
            rules={[{ required: true, message: "请输入视频内容" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="playUrl"
            label="播放地址"
            rules={[{ required: true, message: "请输入播放地址" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="subTitle"
            label="视频简介"
          >
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}

'use client';

import { useCallback, useEffect, useState } from "react";
import {
  Card,
  Form,
  Input,
  Modal,
  Space,
  Table,
  TreeSelect,
  InputNumber,
  Popconfirm,
  message,
  Button,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { Category } from "@/types/category";
import { createCategory, deleteCategory, getCategoryList, updateCategory } from "@/services/category";

export default function CategoriesPage() {
  const [form] = Form.useForm();
  const [modalTitle, setModalTitle] = useState("新增分类");
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const columns: ColumnsType<Category> = [
    {
      title: "分类名称",
      dataIndex: "name",
      key: "name",
      width: '15%',
    },
    {
      title: "分类标识",
      dataIndex: "code",
      key: "code",
      width: '15%',
    },
    {
      title: "排序",
      dataIndex: "sort",
      key: "sort",
      width: '10%',
    },
    {
      title: "描述",
      dataIndex: "description",
      key: "description",
      width: '20%',
    },
    {
      title: "SEO",
      key: "seo",
      width: '20%',
      render: (_, record: Category) => (
        <div>
          {record.seoTitle && <div><strong>标题：</strong>{record.seoTitle}</div>}
          {record.seoKeywords && <div><strong>关键词：</strong>{record.seoKeywords}</div>}
          {record.seoDesc && <div><strong>描述：</strong>{record.seoDesc}</div>}
        </div>
      ),
    },
    {
      title: "操作",
      key: "action",
      width: '20%',
      render: (_, record: Category) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>编辑</a>
          <Popconfirm
            title="确定要删除这个分类吗？"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="link" danger>删除</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getCategoryList();
      if (res.code === 0) {
        setCategories(res.data || []);
      }
    } catch (error) {
      console.error("获取分类列表失败:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleAdd = () => {
    form.resetFields();
    setModalTitle("新增分类");
    setModalVisible(true);
  };

  const handleEdit = (record: Category) => {
    form.setFieldsValue(record);
    setModalTitle("编辑分类");
    setModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    const res = await deleteCategory(id);
    if (res.code === 0) {
      message.success("删除成功");
      fetchCategories();
    }
  };

  const handleModalOk = async () => {
    const values = await form.validateFields();
    const id = form.getFieldValue("id");
    const res = id
      ? await updateCategory(id, values)
      : await createCategory(values);

    if (res.code === 0) {
      message.success(id ? "更新成功" : "创建成功");
      setModalVisible(false);
      fetchCategories();
    }
  };

  return (
    <Card
      title="分类管理"
      extra={
        <Space>
          <a onClick={handleAdd}>新增分类</a>
        </Space>
      }
    >
      <Table
        columns={columns}
        dataSource={categories}
        rowKey="id"
        loading={loading}
        pagination={false}
        expandable={{
          defaultExpandAllRows: true
        }}
      />
      <Modal
        title={modalTitle}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
        width={800}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            label="分类名称"
            rules={[{ required: true, message: "请输入分类名称" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="code"
            label="分类标识"
            rules={[{ required: true, message: "请输入分类标识" }]}
          >
            <Input placeholder="请输入分类标识，如：news" />
          </Form.Item>
          <Form.Item name="parentId" label="父级分类">
            <TreeSelect
              treeData={categories.map(item => ({
                title: item.name,
                value: item.id,
                children: item.children?.map(child => ({
                  title: child.name,
                  value: child.id
                }))
              }))}
              placeholder="请选择父级分类"
              allowClear
              treeDefaultExpandAll
              disabled={form.getFieldValue("id") === 1}
            />
          </Form.Item>
          <Form.Item name="sort" label="排序" initialValue={0}>
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="description" label="描述">
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item name="seoTitle" label="SEO 标题">
            <Input.TextArea rows={2} />
          </Form.Item>
          <Form.Item name="seoKeywords" label="SEO 关键词">
            <Input.TextArea rows={2} placeholder="多个关键词用英文逗号分隔" />
          </Form.Item>
          <Form.Item name="seoDesc" label="SEO 描述">
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}

import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Modal, Drawer } from 'antd';
import React, { useState, useRef } from 'react';
import { useRequest } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import OperationModal from './components/OperationModal';
import type { AuthItemProps, BindRoleProps, PageParams } from './data';
import { addItem, queryList, removeItem, updateItem } from './service';

const TableList: React.FC = () => {
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<AuthItemProps>();
  const [done, setDone] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  const handleDone = () => {
    setDone(false);
    setVisible(false);
    setCurrentRow(undefined);
  };

  const deleteAction = (roleId: string) => {
    Modal.confirm({
      title: '删除权限',
      content: '确定删除该权限吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        await postRun('remove', roleId);
        message.success('刪除成功');
      },
    });
  };

  const columns: ProColumns<AuthItemProps>[] = [
    {
      title: '驾校名称',
      dataIndex: 'placeName',
      hideInSearch: true,
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: '管理员姓名',
      dataIndex: 'adminName',
      hideInSearch: true,
    },
    {
      title: '管理员手机号',
      hideInForm: true,
      dataIndex: 'adminPhone',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      hideInForm: true,
      sorter: true,
      hideInSearch: true,
      valueType: 'dateTime',
    },
    {
      title: '过期时间',
      dataIndex: 'perioOfValidity',
      hideInForm: true,
      sorter: true,
      hideInSearch: true,
      valueType: 'dateTime',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            setVisible(true);
            setCurrentRow(record);
          }}
        >
          編輯
        </a>,
        <a
          key="subscribeAlert"
          className="text-danger"
          onClick={() => deleteAction(record.id as string)}
        >
          刪除
        </a>,
      ],
    },
  ];

  const res = useRequest(
    (method, params) => {
      if (method === 'remove') {
        return removeItem(params);
      }
      if (method === 'update') {
        return updateItem(params);
      }
      return addItem(params);
    },
    {
      manual: true,
      onSuccess: (...arg) => {
        console.log('result', arg);
        actionRef.current?.reload();
      },
    },
  );
  const { run: postRun, loading } = res;
  const handleSubmit = async (values: AuthItemProps) => {
    try {
      const method = values?.id ? 'update' : 'add';
      await postRun(method, values);
      setDone(true);
    } catch (e) {
      console.log('e', e);
    }
  };

  return (
    <PageContainer>
      <ProTable<AuthItemProps, PageParams>
        headerTitle={'查询表格'}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setVisible(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={queryList}
        columns={columns}
      />
      <OperationModal
        done={done}
        visible={visible}
        current={currentRow}
        onDone={handleDone}
        loading={loading}
        onSubmit={handleSubmit}
      />

      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.id && (
          <ProDescriptions<AuthItemProps>
            column={2}
            title={currentRow?.placeName}
            request={async () => ({
              data: currentRow || {},
            })}
            columns={columns as ProDescriptionsItemProps<AuthItemProps>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;

import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Modal, Drawer } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { useRequest } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import OperationModal from './components/OperationModal';
import type { RoleItemProps } from './data';
import {
  rule,
  addRule,
  updateRule,
  removeRule,
} from '@/services/ant-design-pro/api';
import { addItem, queryList, removeItem, updateItem } from './service';

const TableList: React.FC = () => {
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<RoleItemProps>();
  const [done, setDone] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */

  const handleDone = () => {
    setDone(false);
    setVisible(false);
    setCurrentRow(undefined);
  };

  const deleteAction = (roleId: string) => {
    Modal.confirm({
      title: '删除任务',
      content: '确定删除该任务吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => postRun('remove', roleId),
    });
  };

  const columns: ProColumns<RoleItemProps>[] = [
    {
      title: '角色名称',
      dataIndex: 'roleName',
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
      title: '角色編碼',
      dataIndex: 'roleCode',
    },
    {
      title: '是否掃描',
      dataIndex: 'checkVirusFlag',
      hideInSearch: true,
      valueType: 'select',
      valueEnum: {
        Y: {
          text: '掃描',
          status: 'Success',
        },
        N: {
          text: '不掃描',
          status: 'Error',
        },
      },
    },
    {
      title: '角色描述',
      dataIndex: 'description',
      valueType: 'textarea',
      hideInSearch: true,
    },
    {
      title: '創建時間',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
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
          onClick={() => deleteAction(record.roleId as string)}
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
      onSuccess: (result) => {
        console.log('result', result);
        actionRef.current?.reload();
      },
    },
  );
  const { run: postRun, loading } = res;
  const handleSubmit = async (values: RoleItemProps) => {
    try {
      const method = values?.roleId ? 'update' : 'add';
      const res = await postRun(method, values);
      console.log('re', res);
      setDone(true);
    } catch (e) {
      console.log('e', e);
    }
  };
  return (
    <PageContainer>
      <ProTable<RoleItemProps, API.PageParams>
        headerTitle={'查询表格'}
        actionRef={actionRef}
        rowKey="roleId"
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
        {currentRow?.roleId && (
          <ProDescriptions<RoleItemProps>
            column={2}
            title={currentRow?.roleName}
            request={async () => ({
              data: currentRow || {},
            })}
            columns={columns as ProDescriptionsItemProps<RoleItemProps>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;

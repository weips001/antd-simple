import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Modal, Drawer, Tag } from 'antd';
import React, { useState, useRef } from 'react';
import { useRequest } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import OperationModal from './components/OperationModal';
import BindModal from './components/BindModal';
import type { RoleItemProps, BindRoleProps } from './data';
import {
  addItem,
  queryList,
  removeItem,
  updateItem,
  getAllScanRole,
  queryClientSystemRole,
  assignClientSystemRole,
} from './service';

const userStatusList = {
  0: {
    text: <Tag color="success">在职</Tag>,
    status: 'Success',
  },
  1: {
    text: <Tag color="error">离职</Tag>,
    status: 'Error',
  },
};

const TableList: React.FC = () => {
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<RoleItemProps>();
  const [done, setDone] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [bindDone, setBindDone] = useState<boolean>(false);
  const [bindVisible, setBindVisible] = useState<boolean>(false);
  const [roleId, setRoleId] = useState<string[]>([]);
  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const { loading: bindLoading, run: bindSysRole } = useRequest(
    assignClientSystemRole,
    {
      manual: true,
    },
  );
  const { loading: detailLoading, run: getCurrentRole } = useRequest(
    queryClientSystemRole,
    {
      manual: true,
      onSuccess(roleIds) {
        setRoleId(roleIds);
      },
    },
  );
  const { data: allRoleList } = useRequest(getAllScanRole);

  const handleDone = () => {
    setDone(false);
    setVisible(false);
    setCurrentRow(undefined);
  };

  const handleBindDone = () => {
    setBindDone(false);
    setBindVisible(false);
    setCurrentRow(undefined);
  };

  const deleteAction = (roleId: string) => {
    Modal.confirm({
      title: '删除角色',
      content: '确定删除该角色吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        await postRun('remove', roleId);
        message.success('刪除成功');
      },
    });
  };

  const columns: ProColumns<RoleItemProps>[] = [
    {
      title: '姓名',
      dataIndex: 'name',
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
      title: '联系方式',
      hideInForm: true,
      dataIndex: 'phone',
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
      title: '人员状态',
      dataIndex: 'status',
      valueEnum: userStatusList,
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
          key="bind"
          onClick={() => {
            setBindVisible(true);
            setCurrentRow(record);
            getCurrentRole(record.id);
          }}
        >
          權限綁定
        </a>,
        // <a
        //   key="subscribeAlert"
        //   className="text-danger"
        //   onClick={() => deleteAction(record.id as string)}
        // >
        //   刪除
        // </a>,
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
  const handleSubmit = async (values: RoleItemProps) => {
    try {
      const method = values?.id ? 'update' : 'add';
      await postRun(method, values);
      setDone(true);
    } catch (e) {
      console.log('e', e);
    }
  };
  const handleBindSubmit = async (values: BindRoleProps) => {
    try {
      await bindSysRole(values);
      setBindDone(true);
    } catch (e) {
      console.log('handleBindSubmit', e);
    }
  };
  return (
    <PageContainer>
      <ProTable<RoleItemProps, API.PageParams>
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
      <BindModal
        done={bindDone}
        visible={bindVisible}
        current={currentRow}
        onDone={handleBindDone}
        allRoleList={allRoleList}
        loading={bindLoading}
        detailLoading={detailLoading}
        role={roleId}
        onSubmit={handleBindSubmit}
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

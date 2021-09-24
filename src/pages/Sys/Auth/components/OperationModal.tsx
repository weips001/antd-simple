import type { FC } from 'react';
import {
  ModalForm,
  ProFormSelect,
  ProFormDateTimePicker,
  ProFormText,
  ProFormRadio,
  ProFormTextArea,
} from '@ant-design/pro-form';
import type { AuthItemProps } from '../data.d';
import styles from '../style.less';
import { Button, Result } from 'antd';

type OperationModalProps = {
  done: boolean;
  visible: boolean;
  loading?: boolean;
  current: Partial<AuthItemProps> | undefined;
  onDone: () => void;
  onSubmit: (values: AuthItemProps) => void;
};

const OperationModal: FC<OperationModalProps> = (props) => {
  const { done, visible, loading, current, onDone, onSubmit, children } = props;
  if (!visible) {
    return null;
  }
  return (
    <ModalForm<AuthItemProps>
      visible={visible}
      title={done ? null : `权限${current ? '编辑' : '添加'}`}
      className={styles.standardListForm}
      width={540}
      onFinish={async (values) => {
        if (current) {
          values.id = current.id;
        }
        onSubmit(values);
      }}
      initialValues={current}
      submitter={{
        render: (_, dom) => (done ? null : dom),
        submitButtonProps: {
          loading,
        },
      }}
      trigger={<>{children}</>}
      modalProps={{
        onCancel: () => onDone(),
        destroyOnClose: true,
        bodyStyle: done ? { padding: '72px 0' } : {},
      }}
    >
      {!done ? (
        <>
          <ProFormText
            rules={[
              {
                required: true,
                message: '权限名称为必填项',
              },
            ]}
            label="权限名称"
            width="md"
            name="authName"
          />
          <ProFormText
            rules={[
              {
                required: true,
                message: '权限编码为必填项',
              },
            ]}
            label="权限编码"
            width="md"
            name="authCode"
          />
          <ProFormSelect
            name="authFlag"
            width="md"
            label="分配范围"
            valueEnum={{
              '-1': '所有用户',
              '-2': '仅超级管理员',
            }}
            placeholder="请选择分配范围"
            rules={[{ required: true, message: '请选择分配范围!' }]}
          />
          <ProFormTextArea
            name="desc"
            label="权限描述"
            rules={[
              {
                required: true,
                message: '权限描述为必填项',
              },
            ]}
            placeholder="请输入权限描述"
          />
        </>
      ) : (
        <Result
          status="success"
          title="操作成功"
          extra={
            <Button type="primary" onClick={onDone}>
              知道了
            </Button>
          }
          className={styles.formResult}
        />
      )}
    </ModalForm>
  );
};

export default OperationModal;

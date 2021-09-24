import type { FC } from 'react';
import {
  ModalForm,
  ProFormSelect,
  ProFormDateTimePicker,
  ProFormText,
  ProFormRadio,
  ProFormTextArea,
} from '@ant-design/pro-form';
import type { RoleItemProps } from '../data.d';
import styles from '../style.less';
import { Button, Result } from 'antd';

type OperationModalProps = {
  done: boolean;
  visible: boolean;
  loading?: boolean;
  current: Partial<RoleItemProps> | undefined;
  onDone: () => void;
  onSubmit: (values: RoleItemProps) => void;
};

const OperationModal: FC<OperationModalProps> = (props) => {
  const { done, visible, loading, current, onDone, onSubmit, children } = props;
  if (!visible) {
    return null;
  }
  return (
    <ModalForm<RoleItemProps>
      visible={visible}
      title={done ? null : `角色${current ? '编辑' : '添加'}`}
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
            name="roleName"
            label="角色名称"
            rules={[{ required: true, message: '请输入角色名称' }]}
            placeholder="请输入"
          />
          <ProFormText
            name="roleCode"
            label="角色編碼"
            rules={[{ required: true, message: '请输入角色編碼' }]}
            placeholder="请输入"
          />

          <ProFormTextArea
            name="desc"
            rules={[
              {
                required: true,
                message: '角色描述为必填项',
              },
            ]}
            label="角色描述"
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

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
      title={done ? null : `人员${current ? '编辑' : '添加'}`}
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
                message: '姓名为必填项',
              },
            ]}
            label="姓名"
            width="md"
            name="name"
          />
          <ProFormText
            name="phone"
            label="联系方式"
            width="md"
            placeholder="请输入联系方式"
            rules={[
              {
                required: true,
                message: '联系方式为必填项',
              },
              {
                pattern: /^1\d{10}$/,
                message: '不合法的手机号格式!',
              },
            ]}
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

import type { FC } from 'react';
import {
  ModalForm,
  ProFormText,
  ProFormRadio,
  ProFormTextArea,
} from '@ant-design/pro-form';
import type { SysUserProps } from '../data.d';
import styles from '../style.less';
import { Button, Result } from 'antd';

type OperationModalProps = {
  done: boolean;
  visible: boolean;
  loading?: boolean;
  current: Partial<SysUserProps> | undefined;
  onDone: () => void;
  onSubmit: (values: SysUserProps) => void;
};

const OperationModal: FC<OperationModalProps> = (props) => {
  const { done, visible, loading, current, onDone, onSubmit, children } = props;
  if (!visible) {
    return null;
  }

  return (
    <ModalForm<SysUserProps>
      visible={visible}
      title={done ? null : `系統人員 ${current ? '编辑' : '添加'}`}
      className={styles.standardListForm}
      width={640}
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
            name="account"
            label="人員工號"
            rules={[{ required: true, message: '请输入人員工號' }]}
            placeholder="请输入"
          />
          <ProFormText
            name="name"
            label="姓名"
            rules={[{ required: true, message: '请输入姓名' }]}
            placeholder="请输入"
          />
          <ProFormText
            name="email"
            label="郵箱"
            rules={[{ required: true, message: '请输入郵箱' }]}
            placeholder="请输入"
          />
          <ProFormText
            name="level"
            label="資位"
            rules={[{ required: true, message: '请输入MIME類型' }]}
            placeholder="请输入"
          />
          <ProFormText
            name="headShip"
            label="職位"
            rules={[{ required: true, message: '请输入職位' }]}
            placeholder="请输入"
          />
        </>
      ) : (
        <Result
          status="success"
          title="操作成功"
          subTitle="一系列的信息描述，很短同样也可以带标点。"
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
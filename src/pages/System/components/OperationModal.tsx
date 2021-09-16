import type { FC } from 'react';
import {
  ModalForm,
  ProFormText,
  ProFormRadio,
  ProFormTextArea,
} from '@ant-design/pro-form';
import type { SysItemProps } from '../data.d';
import styles from '../style.less';
import { Button, Result } from 'antd';

type OperationModalProps = {
  done: boolean;
  visible: boolean;
  loading?: boolean;
  current: Partial<SysItemProps> | undefined;
  onDone: () => void;
  onSubmit: (values: SysItemProps) => void;
};

const OperationModal: FC<OperationModalProps> = (props) => {
  const { done, visible, loading, current, onDone, onSubmit, children } = props;
  if (!visible) {
    return null;
  }

  return (
    <ModalForm<SysItemProps>
      visible={visible}
      title={done ? null : `系統配置 ${current ? '编辑' : '添加'}`}
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
            name="systemName"
            label="系統名称"
            rules={[{ required: true, message: '请输入系統名称' }]}
            placeholder="请输入"
          />
          <ProFormText
            name="systemCode"
            label="系統編碼"
            tooltip="系統編碼唯一"
            rules={[{ required: true, message: '请输入系統編碼' }]}
            placeholder="请输入"
          />
          <ProFormText
            name="principal"
            label="系統負責人（工號）"
            rules={[{ required: true, message: '请输入系統負責人' }]}
            placeholder="请输入"
          />

          <ProFormTextArea
            name="description"
            label="系統描述"
            placeholder="请输入系統描述"
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

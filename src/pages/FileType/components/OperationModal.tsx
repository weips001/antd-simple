import type { FC } from 'react';
import {
  ModalForm,
  ProFormText,
  ProFormRadio,
  ProFormTextArea,
} from '@ant-design/pro-form';
import type { FileTypeProps } from '../data.d';
import styles from '../style.less';
import { Button, Result } from 'antd';

type OperationModalProps = {
  done: boolean;
  visible: boolean;
  loading?: boolean;
  current: Partial<FileTypeProps> | undefined;
  onDone: () => void;
  onSubmit: (values: FileTypeProps) => void;
};

const OperationModal: FC<OperationModalProps> = (props) => {
  const { done, visible, loading, current, onDone, onSubmit, children } = props;
  if (!visible) {
    return null;
  }

  return (
    <ModalForm<FileTypeProps>
      visible={visible}
      title={done ? null : `文件類型 ${current ? '编辑' : '添加'}`}
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
            name="fileSuffix"
            label="文件後綴"
            rules={[{ required: true, message: '请输入文件後綴' }]}
            placeholder="请输入"
          />
          <ProFormText
            name="fileTypeCode"
            label="文件類型編碼"
            rules={[{ required: true, message: '请输入文件類型編碼' }]}
            placeholder="请输入"
          />
          <ProFormText
            name="fileType"
            label="MIME類型"
            rules={[{ required: true, message: '请输入MIME類型' }]}
            placeholder="请输入"
          />

          <ProFormTextArea
            name="description"
            label="文件類型描述"
            placeholder="请输入文件類型描述"
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

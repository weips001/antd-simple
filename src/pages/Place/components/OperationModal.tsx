import type { FC } from 'react';
import ProForm, {
  ModalForm,
  ProFormSelect,
  ProFormDateTimePicker,
  ProFormText,
  ProFormDatePicker,
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
      title={done ? null : `驾校${current ? '编辑' : '添加'}`}
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
          <ProForm.Group>
            <ProFormText
              rules={[
                {
                  required: true,
                  message: '场地名称为必填项',
                },
              ]}
              label="场地名称"
              width="sm"
              name="placeName"
            />
            <ProFormText
              rules={[
                {
                  required: true,
                  message: '场地位置为必填项',
                },
              ]}
              label="场地位置"
              width="sm"
              name="placeLoaction"
            />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormText
              name="adminName"
              label="管理员姓名"
              width="sm"
              placeholder="请输入管理员姓名"
              rules={[
                {
                  required: true,
                  message: '管理员姓名为必填项',
                },
              ]}
            />
            <ProFormText
              name="adminPhone"
              label="管理员手机"
              width="sm"
              placeholder="请输入管理员手机"
              rules={[
                {
                  required: true,
                  message: '管理员手机为必填项',
                },
                {
                  pattern: /^1\d{10}$/,
                  message: '不合法的手机号格式!',
                },
              ]}
            />
          </ProForm.Group>
          <ProFormDatePicker
            name="perioOfValidity"
            label="过期日期"
            width="sm"
            rules={[
              {
                required: true,
                message: '过期日期为必填项',
              },
            ]}
          />
          <ProFormTextArea name="desc" label="描述" placeholder="请输入描述" />
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

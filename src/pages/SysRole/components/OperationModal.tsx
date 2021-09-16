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
  let initialValues = {
    checkVirusFlag: 'Y',
  };
  if (current) {
    initialValues = {
      ...initialValues,
      ...current,
      checkVirusFlag: current.checkVirusFlag === 'Y' ? 'Y' : 'N',
    };
  }
  return (
    <ModalForm<RoleItemProps>
      visible={visible}
      title={done ? null : `角色${current ? '编辑' : '添加'}`}
      className={styles.standardListForm}
      width={640}
      onFinish={async (values) => {
        if (current) {
          values.roleId = current.roleId;
        }
        onSubmit(values);
      }}
      initialValues={initialValues}
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
          <ProFormRadio.Group
            name="checkVirusFlag"
            label="是否掃描病毒"
            radioType="button"
            rules={[{ required: true, message: '请選擇是否掃描病毒' }]}
            fieldProps={{
              buttonStyle: 'solid',
            }}
            options={[
              {
                label: '掃描',
                value: 'Y',
              },
              {
                label: '不掃描',
                value: 'N',
              },
            ]}
          />
          <ProFormTextArea
            name="description"
            label="角色描述"
            placeholder="请输入角色描述"
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

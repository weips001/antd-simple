import { FC, useEffect, useRef } from 'react';
import { ModalForm, ProFormText, ProFormCheckbox } from '@ant-design/pro-form';
import type {
  RoleItemProps,
  SelectProps,
  BindRoleProps,
  BindRoleModalProps,
} from '../data.d';
import styles from '../style.less';
import { Button, FormInstance, Result, Spin } from 'antd';

type OperationModalProps = {
  done: boolean;
  visible: boolean;
  loading?: boolean;
  detailLoading?: boolean;
  current: Partial<RoleItemProps> | undefined;
  onDone: () => void;
  onSubmit: (values: BindRoleProps) => void;
  allRoleList?: SelectProps[];
  auth: string[];
};

const OperationModal: FC<OperationModalProps> = (props) => {
  const {
    done,
    visible,
    loading,
    current,
    onDone,
    onSubmit,
    children,
    allRoleList,
    detailLoading,
    auth,
  } = props;
  const bindModalRef = useRef<FormInstance>();
  useEffect(() => {
    if (auth && auth.length) {
      bindModalRef.current?.setFieldsValue({
        auth,
      });
    }
  }, [auth]);
  if (!visible) {
    return null;
  }
  return (
    <ModalForm<BindRoleModalProps>
      visible={visible}
      title={done ? null : '角色綁定'}
      className={styles.standardListForm}
      width={640}
      formRef={bindModalRef}
      onFinish={async (values) => {
        const params = {
          ...values,
          roleId: current?.id,
        };

        onSubmit(params);
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
        <Spin size="large" spinning={detailLoading}>
          <ProFormText name="roleName" label="角色名称" readonly />
          <ProFormText
            name="roleCode"
            label="角色編碼"
            readonly
            tooltip="角色編碼唯一"
          />
          <ProFormCheckbox.Group
            name="auth"
            layout="vertical"
            label="綁定的權限"
            options={allRoleList}
          />
        </Spin>
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

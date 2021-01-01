import React from 'react';
import moment from 'moment';
import { Popconfirm } from 'antd';
import { useStandTableList } from 'stand-admin-antdpro';

export default (props) => {
  const { config, context, showRecordForm, tableListStyles, standRender } = useStandTableList(
    props,
  );

  const { deleteRecord, idFieldName, getRecordId, getRecordName } = context;

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      fixed: 'left',
      width: 80,
    },
    {
      title: '规则名称',
      dataIndex: 'name',
    },
    {
      title: '描述',
      dataIndex: 'desc',
    },
    {
      title: '服务调用次数',
      dataIndex: 'callNo',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (val) => config.statusMap[val] || val,
    },
    {
      title: '上次调度时间',
      dataIndex: 'updatedAt',
      render: (val) => moment(val).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 150,
      render: (text, record) => {
        return (
          <ul className={tableListStyles.actionList}>
            <li>
              <a
                onClick={() => {
                  showRecordForm(record);
                }}
              >
                编辑
              </a>
            </li>
            <li>
              <Popconfirm
                // tipTitle="删除"
                placement="topRight"
                title={`确认要删除 [${getRecordName(record)}] ？`}
                onConfirm={() => {
                  deleteRecord({ [idFieldName]: getRecordId(record) });
                }}
                // onCancel={cancel}
                okText="删除"
                okType="danger"
                cancelText="取消"
              >
                <a>删除</a>
              </Popconfirm>
            </li>
          </ul>
        );
      },
    },
  ];

  return standRender({ autoScrollX: { defaultWidth: 200 }, columns });
};
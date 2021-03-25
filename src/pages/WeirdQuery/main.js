import React, { Fragment } from 'react';
import { StandRecordsHoc, getDynamicModelPkg, buildStandRecordModelPkg } from 'stand-admin-antdpro';

import { configModel, recordModel } from '../BaseDemo/main';

import List from '../BaseDemo/List';
import RecordForm from '../BaseDemo/RecordForm';
import SearchForm from './SearchForm';

const myFilterList = [
  { label: '条件A', value: 'a', params: { status: 2, name: '2' } },
  { label: '条件B', value: 'b', params: { status: 1, name: '1' } },
  { label: '条件C', value: 'c', params: { status: 3, name: '3' } },
];

function MainComp(props) {
  // const { config } = useStandContext();

  return (
    <>
      <p>
        异形查询指的是查询界面和接口参数差异巨大，此种场景推荐的做法是：对查询接口做一个转换包装
      </p>
      {/* 查询 */}
      <SearchForm {...props} {...{ myFilterList }} />

      {/* 结果列表 */}
      <List {...props} />

      {/* 新建/编辑 */}
      <RecordForm {...props} />
    </>
  );
}

const hocParams = {
  recordModel: getDynamicModelPkg(
    buildStandRecordModelPkg({
      ...recordModel.modelOpts,
      searchRecords: (params) => {
        const origSearchRecords = recordModel.modelOpts.searchRecords;

        const { myFilter } = params;

        const matchFilterItem = myFilterList.find((item) => item.value === myFilter);

        return origSearchRecords(matchFilterItem ? matchFilterItem.params : {});
      },
    }),
    'weird-query',
  ),
  configModel,
  defaultSearchParams: {},
};

export default StandRecordsHoc(hocParams)(MainComp);
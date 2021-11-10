import './dashboardPanelRight.less';
import Icon from '@ant-design/icons';
import { Button, Col, Row, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as depositIcon } from '../../assets/images/deposit-green.svg';
import { FEE_DEPOSIT_ROUTE, FEE_WITHDRAW_ROUTE } from '../../routes/constants';
import { useGetFeeBalanceQuery } from '../operator/operator.api';

export const DashboardPanelRight = (): JSX.Element => {
  const { Title } = Typography;
  const navigate = useNavigate();
  const { data: feeBalance } = useGetFeeBalanceQuery();

  return (
    <div id="dashboard-panel-right-container" className="panel w-100 h-100">
      <Row>
        <Title className="dm-sans dm-sans__x dm-sans__bold dm-sans__grey" level={3}>
          Fee Account Balance
        </Title>
        <Col className="dm-mono dm-mono__xxxxxx" span={24}>
          {feeBalance?.totalBalance ?? 'N/A'}
        </Col>
      </Row>
      <Row gutter={{ xs: 8, sm: 12, md: 16 }}>
        <Col span={12}>
          <Button
            onClick={() => navigate(FEE_WITHDRAW_ROUTE)}
            className="rotate-icon w-100 justify-center"
            icon={<Icon component={depositIcon} />}
          >
            WITHDRAW
          </Button>
        </Col>
        <Col span={12}>
          <Button
            onClick={() => navigate(FEE_DEPOSIT_ROUTE)}
            className="w-100 justify-center"
            icon={<Icon component={depositIcon} />}
          >
            DEPOSIT
          </Button>
        </Col>
      </Row>
    </div>
  );
};
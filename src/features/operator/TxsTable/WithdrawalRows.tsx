import Icon, { RightOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import React from 'react';

import type { Withdrawal, MarketInfo } from '../../../api-spec/generated/js/operator_pb';
import { ReactComponent as depositIcon } from '../../../assets/images/deposit.svg';
import type { Asset } from '../../../domain/asset';
import { assetIdToTicker, timeAgo } from '../../../utils';
import { useGetTransactionByIdQuery } from '../../liquid.api';

interface WithdrawalRowsProps {
  marketInfo: MarketInfo.AsObject;
  savedAssets: Asset[];
  withdrawals?: Withdrawal.AsObject[];
}

interface WithdrawRowProps {
  balance: Withdrawal.AsObject['balance'];
  baseAssetTicker: string;
  quoteAssetTicker: string;
  txId: string;
}

const WithdrawRow = ({ balance, baseAssetTicker, quoteAssetTicker, txId }: WithdrawRowProps) => {
  const { data: tx } = useGetTransactionByIdQuery(txId);
  return (
    <>
      <tr
        onClick={(ev) => {
          ev.currentTarget.classList.toggle('opened');
          ev.currentTarget.nextElementSibling?.classList.toggle('opened');
        }}
      >
        <td>
          <Icon component={depositIcon} className="rotate-icon tx-icon" />
          {`Withdraw ${baseAssetTicker}`}
        </td>
        <td>{balance?.baseAmount}</td>
        <td>{`${balance?.baseAmount} ${baseAssetTicker}`}</td>
        <td>{`${balance?.quoteAmount} ${quoteAssetTicker}`}</td>
        <td data-time={tx?.status.block_time}>{timeAgo(tx?.status.block_time)}</td>
        <td>
          <RightOutlined />
        </td>
      </tr>
      <tr
        className="details"
        data-time={tx?.status.block_time}
        onClick={(ev) => {
          ev.currentTarget.classList.toggle('opened');
          ev.currentTarget.previousElementSibling?.classList.toggle('opened');
        }}
      >
        <td />
        <td colSpan={5}>
          <div className="d-flex details-content-container">
            <div className="d-flex details-content">
              <span className="dm-mono dm-mono__bold">Status</span>
              <span
                className={classNames('status', {
                  status__confirmed: tx?.status?.confirmed,
                  status__pending: !tx?.status?.confirmed,
                })}
              >
                {tx?.status?.confirmed ? 'Confirmed' : 'Pending'}
              </span>
            </div>
            <div className="d-flex details-content">
              <span className="dm-mono dm-mono__bold">Transaction Id</span>
              <span>{tx?.txid}</span>
            </div>
          </div>
        </td>
      </tr>
    </>
  );
};
export const WithdrawalRows = ({
  withdrawals,
  savedAssets,
  marketInfo,
}: WithdrawalRowsProps): JSX.Element => {
  const baseAssetId = marketInfo?.market?.baseAsset || '';
  const quoteAssetId = marketInfo?.market?.quoteAsset || '';
  const baseAssetTicker = assetIdToTicker(baseAssetId, savedAssets);
  const quoteAssetTicker = assetIdToTicker(quoteAssetId, savedAssets);

  return (
    <>
      {withdrawals?.map(({ balance, txId }) => (
        <WithdrawRow
          key={txId}
          balance={balance}
          baseAssetTicker={baseAssetTicker}
          quoteAssetTicker={quoteAssetTicker}
          txId={txId}
        />
      ))}
    </>
  );
};